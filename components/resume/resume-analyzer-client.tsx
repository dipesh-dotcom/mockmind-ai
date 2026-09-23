"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ResumeDropzone } from "@/components/resume/resume-dropzone";
import { ScoreGauges } from "@/components/resume/score-gauges";
import {
  KeywordAnalysis,
  MissingSkills,
} from "@/components/resume/keyword-analysis";
import { AISuggestions } from "@/components/resume/ai-suggestions";

type ResumeResult = {
  id: string;
  fileName: string;
  atsScore: number | null;
  resumeScore: number | null;
  keywords: { keyword: string; matched: boolean }[];
  skillGaps: { skill: string; importance: string; note: string | null }[];
  suggestions: { title: string; detail: string; priority: string }[];
};

export function ResumeAnalyzerClient() {
  const [jobDescription, setJobDescription] = React.useState("");
  const [resume, setResume] = React.useState<ResumeResult | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [analyzing, setAnalyzing] = React.useState(false);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const res = await fetch("/api/resume");
        if (!res.ok) return;
        const data = (await res.json()) as { resume: ResumeResult | null };
        if (!cancelled) setResume(data.resume);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, []);

  async function handleUpload(file: File) {
    if (jobDescription.trim().length < 20) {
      toast.error(
        "Add a target job description first (at least 20 characters).",
      );
      return;
    }

    setAnalyzing(true);
    setResume({
      id: "pending",
      fileName: file.name,
      atsScore: null,
      resumeScore: null,
      keywords: [],
      skillGaps: [],
      suggestions: [],
    });

    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("jobDescription", jobDescription.trim());

      const res = await fetch("/api/resume/analyze", {
        method: "POST",
        body: formData,
      });
      const data = (await res.json()) as {
        resume?: ResumeResult;
        error?: string;
      };

      if (!res.ok || !data.resume) {
        toast.error(data.error ?? "Couldn't analyze your resume.");
        setResume(null);
        return;
      }

      toast.success("Resume analyzed!");
      setResume(data.resume);
    } catch {
      toast.error("Something went wrong. Please try again.");
      setResume(null);
    } finally {
      setAnalyzing(false);
    }
  }

  async function handleClear() {
    if (resume && resume.id !== "pending") {
      try {
        await fetch(`/api/resume/${resume.id}`, { method: "DELETE" });
      } catch {
        // best-effort; still clear locally
      }
    }
    setResume(null);
  }

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-5xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Resume Analyzer
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Paste a target job description, upload your resume, and get ATS
          scoring, keyword matching, and AI suggestions.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Target job description</CardTitle>
          <CardDescription>
            Used to match keywords and tailor suggestions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label htmlFor="jobDescription" className="sr-only">
            Job description
          </Label>
          <Textarea
            id="jobDescription"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            placeholder="Paste the job description you're targeting..."
            className="min-h-32 max-h-56 overflow-y-auto"
            disabled={analyzing}
          />
        </CardContent>
      </Card>

      <ResumeDropzone
        fileName={resume?.fileName ?? null}
        onUpload={handleUpload}
        onClear={handleClear}
        analyzing={analyzing}
        disabled={jobDescription.trim().length < 20 && !resume}
      />

      {resume && resume.atsScore != null && resume.resumeScore != null && (
        <>
          <ScoreGauges
            atsScore={resume.atsScore}
            resumeScore={resume.resumeScore}
          />
          <KeywordAnalysis
            matchedKeywords={resume.keywords
              .filter((k) => k.matched)
              .map((k) => k.keyword)}
            missingKeywords={resume.keywords
              .filter((k) => !k.matched)
              .map((k) => k.keyword)}
          />
          <MissingSkills skillGaps={resume.skillGaps} />
          <AISuggestions suggestions={resume.suggestions} />
        </>
      )}
    </div>
  );
}
