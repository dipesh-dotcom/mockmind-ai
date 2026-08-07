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

export async function generateInterview(
  input: GenerateInterviewInput,
): Promise<GeneratedInterview> {
  const apiKey = process.env.AI_API_KEY;
  const model = process.env.AI_MODEL ?? "gpt-4o-mini";

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

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model,
      response_format: { type: "json_object" },
      temperature: 0.7,
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt || "Generate the interview." },
      ],
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`AI request failed (${response.status}): ${text}`);
  }

  const data = await response.json();
  const raw = data.choices?.[0]?.message?.content;

  if (!raw) {
    throw new Error("AI returned an empty response.");
  }

  const parsed = generatedInterviewSchema.safeParse(JSON.parse(raw));

  if (!parsed.success) {
    throw new Error(`AI returned an unexpected shape: ${parsed.error.message}`);
  }

  return parsed.data;
}
