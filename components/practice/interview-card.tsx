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

  const hasTags = interview.focusAreas.length > 0;
  const hasQuestions = interview.questionCount > 0;
  const MAX_VISIBLE_TAGS = 4;
  const visibleTags = interview.focusAreas.slice(0, MAX_VISIBLE_TAGS);
  const remainingTagCount = interview.focusAreas.length - visibleTags.length;

  return (
    <Card className="flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <h3 className="line-clamp-2 font-display text-sm font-semibold leading-snug">
            {interview.title || interview.jobTitle}
          </h3>
          <p className="mt-0.5 truncate text-xs text-muted-foreground">
            {interview.jobTitle}
          </p>
        </div>
        <Badge
          variant={EXPERIENCE_STYLE[interview.experienceLevel] ?? "secondary"}
          className="shrink-0 px-3 py-1 text-xs capitalize"
        >
          {interview.experienceLevel.toLowerCase()}
        </Badge>
      </div>

      {hasTags && (
        <div className="mt-3 flex flex-wrap gap-2">
          {visibleTags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="rounded-full border border-border/60 bg-muted/60 px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              {tag}
            </Badge>
          ))}
          {remainingTagCount > 0 && (
            <Badge
              variant="secondary"
              title={interview.focusAreas.slice(MAX_VISIBLE_TAGS).join(", ")}
              className="rounded-full border border-dashed border-border/60 bg-transparent px-3 py-1 text-xs font-medium text-muted-foreground"
            >
              +{remainingTagCount}
            </Badge>
          )}
        </div>
      )}

      <div className="mt-auto space-y-4 pt-4">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <Clock className="size-3.5" /> {interview.durationMinutes} min
          </span>
          <span className="flex items-center gap-1">
            <ListChecks className="size-3.5" />
            {hasQuestions
              ? `${interview.questionCount} questions`
              : "No questions"}
          </span>
        </div>

        <Button
          size="sm"
          className="w-full"
          disabled={!hasQuestions}
          onClick={() => router.push(`/practice/${interview.id}`)}
        >
          <Play className="size-3.5" />
          {hasQuestions ? "Start interview" : "Unavailable"}
        </Button>
      </div>
    </Card>
  );
}
