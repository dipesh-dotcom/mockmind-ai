"use client";

import { Badge } from "@/components/ui/badge";
import { Code2, Mic, MessagesSquare, Type } from "lucide-react";

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
  const TYPE_ICON: Record<string, React.ElementType> = {
    VOICE: Mic,
    TEXT: Type,
    CODING: Code2,
    BEHAVIORAL: MessagesSquare,
  };
  const Icon = TYPE_ICON[type] ?? Type;
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="font-display text-lg font-semibold">{title}</h1>
        <p className="text-xs text-muted-foreground">
          Question {Math.min(currentIndex + 1, totalQuestions)} of{" "}
          {totalQuestions}
        </p>
      </div>
      <Badge
        variant="secondary"
        className="gap-1.5 rounded-full border border-border/60 bg-muted/60 px-3.5 py-1.5 text-sm font-medium capitalize text-muted-foreground"
      >
        <Icon className="size-3.5" />
        {type.toLowerCase()}
      </Badge>
    </div>
  );
}
