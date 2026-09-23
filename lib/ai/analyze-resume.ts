import { z } from "zod";

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 4,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok || ![500, 502, 503].includes(response.status)) {
      return response;
    }

    lastError = new Error(`AI request failed (${response.status})`);

    if (attempt < maxRetries) {
      const delayMs = 1000 * 2 ** attempt;
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    } else {
      return response;
    }
  }

  throw lastError;
}

function cosineSimilarity(a: number[], b: number[]): number {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

async function embedText(apiKey: string, text: string): Promise<number[]> {
  const response = await fetchWithRetry(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({ content: { parts: [{ text }] } }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(
      `Embedding request failed (${response.status}): ${errText}`,
    );
  }

  const data = await response.json();
  const values = data.embedding?.values;

  if (!Array.isArray(values)) {
    throw new Error("Embedding response missing values.");
  }

  return values;
}

async function embedBatch(
  apiKey: string,
  texts: string[],
): Promise<number[][]> {
  if (texts.length === 0) return [];

  const response = await fetchWithRetry(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:batchEmbedContents",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        requests: texts.map((text) => ({
          model: "models/gemini-embedding-001",
          content: { parts: [{ text }] },
        })),
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`Batch embedding failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const embeddings = data.embeddings;

  if (!Array.isArray(embeddings)) {
    throw new Error("Batch embedding response missing embeddings.");
  }

  return embeddings.map((e: { values: number[] }) => e.values);
}

const keywordListSchema = z.object({
  keywords: z.array(z.string()).min(5).max(15),
});

async function extractKeywords(
  apiKey: string,
  model: string,
  jobDescription: string,
): Promise<string[]> {
  const systemPrompt = `Extract the most important skills, technologies, and qualifications a hiring manager would look for based on this job description. Return 8-15 concise keyword phrases (2-4 words each), ordered by importance.

Respond with ONLY valid JSON: { "keywords": string[] }`;

  const response = await fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: jobDescription }] }],
        generationConfig: {
          temperature: 0.2,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI request failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("AI returned an empty response.");

  const parsed = keywordListSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(`AI returned an unexpected shape: ${parsed.error.message}`);
  }

  return parsed.data.keywords;
}

const analysisSchema = z.object({
  resumeScore: z.number().min(0).max(100),
  suggestions: z
    .array(
      z.object({
        title: z.string(),
        detail: z.string(),
        priority: z.enum(["HIGH", "MEDIUM", "LOW"]),
      }),
    )
    .min(1)
    .max(8),
  skillGaps: z
    .array(
      z.object({
        skill: z.string(),
        importance: z.enum(["HIGH", "MEDIUM", "LOW"]),
        note: z.string().optional(),
      }),
    )
    .max(6),
});

async function generateSuggestions(params: {
  apiKey: string;
  model: string;
  resumeText: string;
  jobDescription: string;
  matchedKeywords: string[];
  missingKeywords: { keyword: string; similarity: number }[];
}): Promise<z.infer<typeof analysisSchema>> {
  const systemPrompt = `You are an expert resume reviewer. Based on the resume, target job description, and a computed keyword match analysis, provide:
1. resumeScore (0-100): overall quality of the resume's writing, structure, and impact — independent of keyword matching.
2. suggestions (3-6 items): specific, actionable rewrites to strengthen the resume, each with a priority.
3. skillGaps (up to 5 items): drawn primarily from the missing keywords, prioritized by importance and how large the semantic gap was.

Respond with ONLY valid JSON:
{
  "resumeScore": number,
  "suggestions": [{ "title": string, "detail": string, "priority": "HIGH"|"MEDIUM"|"LOW" }],
  "skillGaps": [{ "skill": string, "importance": "HIGH"|"MEDIUM"|"LOW", "note": string }]
}`;

  const userPrompt = `Job description:
${params.jobDescription}

Resume:
${params.resumeText.slice(0, 8000)}

Matched keywords: ${params.matchedKeywords.join(", ") || "none"}

Missing keywords (with semantic similarity to resume, 0-100): ${
    params.missingKeywords
      .map((k) => `${k.keyword} (${k.similarity})`)
      .join(", ") || "none"
  }`;

  const response = await fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/${params.model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": params.apiKey,
      },
      body: JSON.stringify({
        systemInstruction: { parts: [{ text: systemPrompt }] },
        contents: [{ role: "user", parts: [{ text: userPrompt }] }],
        generationConfig: {
          temperature: 0.4,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`AI request failed (${response.status}): ${errText}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!raw) throw new Error("AI returned an empty response.");

  const parsed = analysisSchema.safeParse(JSON.parse(raw));
  if (!parsed.success) {
    throw new Error(`AI returned an unexpected shape: ${parsed.error.message}`);
  }

  return parsed.data;
}

export type ResumeAnalysisResult = {
  atsScore: number;
  resumeScore: number;
  keywords: { keyword: string; matched: boolean }[];
  skillGaps: {
    skill: string;
    importance: "HIGH" | "MEDIUM" | "LOW";
    note?: string;
  }[];
  suggestions: {
    title: string;
    detail: string;
    priority: "HIGH" | "MEDIUM" | "LOW";
  }[];
};

const MATCH_THRESHOLD = 0.5;

export async function analyzeResume(
  resumeText: string,
  jobDescription: string,
): Promise<ResumeAnalysisResult> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL ?? "gemini-3.6-flash";

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured.");
  }

  const keywords = await extractKeywords(apiKey, model, jobDescription);

  const [resumeVec, keywordVecs] = await Promise.all([
    embedText(apiKey, resumeText),
    embedBatch(apiKey, keywords),
  ]);

  const resumeLower = resumeText.toLowerCase();
  const keywordResults = keywords.map((keyword, i) => {
    const similarity = cosineSimilarity(resumeVec, keywordVecs[i]);
    const literalMatch = resumeLower.includes(keyword.toLowerCase());
    const matched = literalMatch || similarity >= MATCH_THRESHOLD;
    return { keyword, matched, similarity };
  });

  const matchedKeywords = keywordResults.filter((k) => k.matched);
  const missingKeywords = keywordResults.filter((k) => !k.matched);

  const atsScore =
    keywords.length > 0
      ? Math.round((matchedKeywords.length / keywords.length) * 100)
      : 0;

  const { resumeScore, suggestions, skillGaps } = await generateSuggestions({
    apiKey,
    model,
    resumeText,
    jobDescription,
    matchedKeywords: matchedKeywords.map((k) => k.keyword),
    missingKeywords: missingKeywords.map((k) => ({
      keyword: k.keyword,
      similarity: Math.round(k.similarity * 100),
    })),
  });

  return {
    atsScore,
    resumeScore,
    keywords: keywordResults.map(({ keyword, matched }) => ({
      keyword,
      matched,
    })),
    skillGaps,
    suggestions,
  };
}
