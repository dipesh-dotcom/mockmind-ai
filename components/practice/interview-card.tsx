"use client";

import { useRouter } from "next/navigation";
import { Clock, ListChecks, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { InterviewSummary } from "@/types/interview";

const EXPERIENCE_STYLE: Record<string, "success" | "warning" | "destructive"> =
  {
    ENTRY: "success",
    JUNIOR: "success",
    MID: "warning",
    SENIOR: "warning",
    STAFF: "destructive",
  };

export function InterviewCard({ interview }: { interview: InterviewSummary }) {
  const router = useRouter();

  return (
    <Card className="flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="font-display text-sm font-semibold leading-snug">
            {interview.title}
          </h3>
          <p className="mt-0.5 text-xs text-muted-foreground">
            {interview.jobTitle}
          </p>
        </div>
        <Badge
          variant={EXPERIENCE_STYLE[interview.experienceLevel] ?? "secondary"}
          className="shrink-0 capitalize"
        >
          {interview.experienceLevel.toLowerCase()}
        </Badge>
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {interview.focusAreas.map((tag) => (
          <Badge key={tag} variant="secondary" className="text-[10px]">
            {tag}
          </Badge>
        ))}
      </div>

      <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" /> {interview.durationMinutes} min
        </span>
        <span className="flex items-center gap-1">
          <ListChecks className="size-3.5" /> {interview.questionCount}{" "}
          questions
        </span>
      </div>

      <Button
        size="sm"
        className="mt-4 w-full"
        onClick={() => router.push(`/practice/${interview.id}`)}
      >
        <Play className="size-3.5" /> Start interview
      </Button>
    </Card>
  );
}
