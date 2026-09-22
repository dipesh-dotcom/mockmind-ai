import type { Metadata } from "next";
import { ResumeAnalyzerClient } from "@/components/resume/resume-analyzer-client";

export const metadata: Metadata = { title: "Resume Analyzer" };

export default function ResumeAnalyzerPage() {
  return <ResumeAnalyzerClient />;
}
