"use client";

import * as React from "react";
import { toast } from "sonner";
import { FileSearch } from "lucide-react";
import { AISuggestions } from "@/components/resume/ai-suggestions";
import { Skeleton } from "@/components/ui/skeleton";
import { Reveal } from "@/components/shared/reveal";
import { EmptyState } from "@/components/shared/empty-state";
import { ResumeDropzone } from "./resume-dropzone";
import { ScoreGauges } from "./score-gauges";
import { KeywordAnalysis, MissingSkills } from "./keyword-analysis";

export function ResumeAnalyzerClient() {
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [analyzing, setAnalyzing] = React.useState(false);
  const [analyzed, setAnalyzed] = React.useState(false);

  function handleUpload(name: string) {
    setFileName(name);
    setAnalyzing(true);
    setAnalyzed(false);
    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
      toast.success("Resume analysis complete!");
    }, 1800);
  }

  function handleClear() {
    setFileName(null);
    setAnalyzed(false);
  }

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Resume Analyzer
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Upload your resume to get an instant ATS score, keyword analysis,
            and rewrite suggestions.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <ResumeDropzone
          fileName={fileName}
          onUpload={handleUpload}
          onClear={handleClear}
          analyzing={analyzing}
        />
      </Reveal>

      {analyzing && (
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
          <Skeleton className="h-64 rounded-2xl" />
          <div className="space-y-4">
            <Skeleton className="h-40 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        </div>
      )}

      {!analyzing && !analyzed && (
        <EmptyState
          icon={FileSearch}
          title="No resume analyzed yet"
          description="Upload a PDF or DOCX resume above to see your ATS score, keyword gaps, and AI-powered suggestions."
        />
      )}

      {analyzed && (
        <Reveal delay={0.1}>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[320px_1fr]">
            <div className="flex flex-col gap-6">
              <ScoreGauges atsScore={78} resumeScore={82} />
              <MissingSkills />
            </div>
            <div className="flex flex-col gap-6">
              <KeywordAnalysis />
              <AISuggestions />
            </div>
          </div>
        </Reveal>
      )}
    </div>
  );
}
