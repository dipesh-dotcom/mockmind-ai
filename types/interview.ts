export type InterviewType = "BEHAVIORAL" | "TEXT" | "VOICE" | "CODING";
export type ExperienceLevel = "ENTRY" | "JUNIOR" | "MID" | "SENIOR" | "STAFF";
export type InterviewStatus = "DRAFT" | "GENERATING" | "READY" | "FAILED";

export type InterviewSummary = {
  id: string;
  title: string;
  jobTitle: string;
  type: InterviewType;
  experienceLevel: ExperienceLevel;
  durationMinutes: number;
  focusAreas: string[];
  status: InterviewStatus;
  questionCount: number;
  createdAt: string;
};
