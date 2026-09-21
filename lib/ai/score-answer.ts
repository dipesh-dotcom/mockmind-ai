import { z } from "zod";

const feedbackSchema = z.object({
  score: z.number().min(0).max(100),
  feedback: z.string(),
  strengths: z.array(z.string()).default([]),
  improvements: z.array(z.string()).default([]),
});

export type AnswerScore = {
  score: number;
  feedback: string;
  strengths: string[];
  improvements: string[];
  semanticSimilarity: number;
};

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
  const response = await fetch(
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-embedding-001:embedContent",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        content: { parts: [{ text }] },
      }),
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

async function getLLMFeedback(params: {
  apiKey: string;
  model: string;
  question: string;
  expectedAnswer: string;
  transcript: string;
  semanticSimilarity: number;
}): Promise<z.infer<typeof feedbackSchema>> {
  const systemPrompt = `You are an expert interview coach. Score a candidate's answer against the expected answer for an interview question.

You are also given a computed semantic similarity score (0-100) from an embedding model comparing the candidate's answer to the expected answer. Use it as one signal, not the sole basis — a candidate can phrase a correct answer very differently from the expected answer and still deserve a high score.

Respond with ONLY valid JSON in this shape:
{
  "score": number (0-100),
  "feedback": string (2-4 sentences, direct and constructive),
  "strengths": string[] (1-3 specific things done well),
  "improvements": string[] (1-3 specific, actionable suggestions)
}`;

  const userPrompt = `Question: ${params.question}

Expected answer / key points: ${params.expectedAnswer}

Candidate's answer: ${params.transcript}

Computed semantic similarity to expected answer: ${params.semanticSimilarity}/100`;

  const response = await fetch(
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
          temperature: 0.3,
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

  if (!raw) {
    throw new Error("AI returned an empty response.");
  }

  const parsed = feedbackSchema.safeParse(JSON.parse(raw));

  if (!parsed.success) {
    throw new Error(`AI returned an unexpected shape: ${parsed.error.message}`);
  }

  return parsed.data;
}

export async function scoreAnswer(input: {
  question: string;
  expectedAnswer: string;
  transcript: string;
}): Promise<AnswerScore> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL ?? "gemini-3.6-flash";

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured.");
  }

  const [expectedVec, transcriptVec] = await Promise.all([
    embedText(apiKey, input.expectedAnswer),
    embedText(apiKey, input.transcript),
  ]);

  const similarity = cosineSimilarity(expectedVec, transcriptVec);
  const semanticSimilarity = Math.round(
    Math.max(0, Math.min(1, similarity)) * 100,
  );

  const llm = await getLLMFeedback({
    apiKey,
    model,
    question: input.question,
    expectedAnswer: input.expectedAnswer,
    transcript: input.transcript,
    semanticSimilarity,
  });

  const blendedScore = Math.round(0.7 * llm.score + 0.3 * semanticSimilarity);

  return {
    score: blendedScore,
    feedback: llm.feedback,
    strengths: llm.strengths,
    improvements: llm.improvements,
    semanticSimilarity,
  };
}
