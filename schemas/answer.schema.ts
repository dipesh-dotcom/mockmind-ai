import { z } from "zod";

export const submitAnswerSchema = z.object({
  questionId: z.string().uuid(),
  transcript: z.string().min(1, "Answer cannot be empty."),
});
