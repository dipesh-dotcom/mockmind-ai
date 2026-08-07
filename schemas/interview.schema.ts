import { z } from "zod";

export const jobDetailsSchema = z.object({
  jobTitle: z.string().trim().min(2, "Job title is required.").max(100),
  jobDescription: z.string().trim().max(5000).optional().or(z.literal("")),
  experienceLevel: z.enum(["ENTRY", "JUNIOR", "MID", "SENIOR", "STAFF"]),
});

export const interviewSettingsSchema = z.object({
  type: z.enum(["VOICE", "TEXT", "CODING", "BEHAVIORAL"]),
  durationMinutes: z.number().int().min(10).max(90),
  focusAreas: z.array(z.string()).max(6).default([]),
});

export const resumeStepSchema = z.object({
  resumeText: z.string().trim().max(20000).optional().or(z.literal("")),
  fileName: z.string().optional(),
  fileUrl: z.string().url().optional(),
});

export const createInterviewSchema = z.object({
  ...jobDetailsSchema.shape,
  ...interviewSettingsSchema.shape,
  ...resumeStepSchema.shape,
});

export type JobDetailsInput = z.infer<typeof jobDetailsSchema>;
export type InterviewSettingsInput = z.infer<typeof interviewSettingsSchema>;
export type ResumeStepInput = z.infer<typeof resumeStepSchema>;
export type CreateInterviewInput = z.infer<typeof createInterviewSchema>;
