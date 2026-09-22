import { z } from "zod";

const questionSchema = z.object({
  category: z.string().optional(),
  question: z.string(),
  expectedAnswer: z.string().optional(),
  hints: z.array(z.string()).optional(),
  followUps: z.array(z.string()).optional(),
});

const generatedInterviewSchema = z.object({
  title: z.string(),
  questions: z.array(questionSchema).min(3).max(12),
});

export type GeneratedInterview = z.infer<typeof generatedInterviewSchema>;

type GenerateInterviewInput = {
  jobTitle: string;
  company?: string;
  jobDescription?: string;
  experienceLevel: string;
  type: string;
  durationMinutes: number;
  focusAreas: string[];
  resumeText?: string;
};

const questionCountFor = (minutes: number) =>
  Math.max(3, Math.min(12, Math.round(minutes / 6)));

async function fetchWithRetry(
  url: string,
  options: RequestInit,
  maxRetries = 4,
): Promise<Response> {
  let lastError: unknown;

  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    const response = await fetch(url, options);

    if (response.ok || ![429, 500, 502, 503].includes(response.status)) {
      return response;
    }

    lastError = new Error(`AI request failed (${response.status})`);

    if (attempt < maxRetries) {
      const delayMs = 1000 * 2 ** attempt; // 1s, 2s, 4s, 8s
      await new Promise((resolve) => setTimeout(resolve, delayMs));
    } else {
      return response;
    }
  }

  throw lastError;
}

export async function generateInterview(
  input: GenerateInterviewInput,
): Promise<GeneratedInterview> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL ?? "gemini-3.6-flash";

  if (!apiKey) {
    throw new Error("AI_API_KEY is not configured.");
  }

  const questionCount = questionCountFor(input.durationMinutes);

  const systemPrompt = `You are an expert technical interviewer. Generate a realistic ${input.type.toLowerCase()} mock interview for a ${input.experienceLevel.toLowerCase()} ${input.jobTitle} role${
    input.company ? ` at ${input.company}` : ""
  }. Return exactly ${questionCount} questions.

For each question include:
- category: a short label (e.g. "System Design", "Leadership")
- question: the interview question itself
- expectedAnswer: a strong sample answer or key points an interviewer would look for
- hints: 1-3 short hints to nudge a stuck candidate
- followUps: 1-2 natural follow-up questions

Respond with ONLY valid JSON matching this shape:
{
  "title": string,
  "questions": [
    { "category": string, "question": string, "expectedAnswer": string, "hints": string[], "followUps": string[] }
  ]
}`;

  const userPrompt = [
    input.jobDescription && `Job description:\n${input.jobDescription}`,
    input.focusAreas.length && `Focus areas: ${input.focusAreas.join(", ")}`,
    input.resumeText && `Candidate resume:\n${input.resumeText.slice(0, 6000)}`,
  ]
    .filter(Boolean)
    .join("\n\n");

  const response = await fetchWithRetry(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-goog-api-key": apiKey,
      },
      body: JSON.stringify({
        systemInstruction: {
          parts: [{ text: systemPrompt }],
        },
        contents: [
          {
            role: "user",
            parts: [{ text: userPrompt || "Generate the interview." }],
          },
        ],
        generationConfig: {
          temperature: 0.7,
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI request failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const raw = data.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!raw) {
    throw new Error("AI returned an empty response.");
  }

  const parsed = generatedInterviewSchema.safeParse(JSON.parse(raw));

  if (!parsed.success) {
    throw new Error(`AI returned an unexpected shape: ${parsed.error.message}`);
  }

  return parsed.data;
}
