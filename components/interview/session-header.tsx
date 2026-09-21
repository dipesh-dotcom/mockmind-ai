"use client";

import { Badge } from "@/components/ui/badge";

export function SessionHeader({
  title,
  currentIndex,
  totalQuestions,
  type,
}: {
  title: string;
  currentIndex: number;
  totalQuestions: number;
  type: string;
}) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-lg font-semibold">{title}</h1>
        <p className="text-xs text-muted-foreground">
          Question {Math.min(currentIndex + 1, totalQuestions)} of{" "}
          {totalQuestions}
        </p>
      </div>
      <Badge variant="secondary" className="capitalize">
        {type.toLowerCase()}
      </Badge>
    </div>
  );
}
