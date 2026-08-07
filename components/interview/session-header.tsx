"use client";

import { Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function InterviewSessionHeader({
  roleTitle,
  elapsed,
  totalQuestions,
  currentQuestion,
  onEnd,
}: {
  roleTitle: string;
  elapsed: string;
  totalQuestions: number;
  currentQuestion: number;
  onEnd: () => void;
}) {
  const pct = Math.round((currentQuestion / totalQuestions) * 100);

  return (
    <header className="flex shrink-0 flex-col gap-3 border-b border-border bg-card px-4 py-3.5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
      <div className="flex items-center gap-3">
        <span className="flex size-10 items-center justify-center rounded-xl gradient-brand text-white shadow-md shadow-primary/30">
          <Sparkles className="size-5" />
        </span>
        <div>
          <p className="text-sm font-semibold leading-tight">{roleTitle}</p>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="size-1.5 rounded-full bg-success animate-pulse" />{" "}
            Live session
          </p>
        </div>
      </div>

      <div className="flex flex-1 items-center gap-4 sm:max-w-xs">
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex justify-between text-xs text-muted-foreground">
            <span>
              Question {currentQuestion} of {totalQuestions}
            </span>
            <span>{pct}%</span>
          </div>
          <Progress value={pct} className="h-1.5" />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Badge variant="outline" className="gap-1.5 font-mono text-xs">
          <span className="size-1.5 rounded-full bg-destructive" /> {elapsed}
        </Badge>
        <Button variant="destructive" size="sm" onClick={onEnd}>
          End interview
        </Button>
      </div>
    </header>
  );
}
