"use client";

import { Code2, LayoutGrid, Mic, MessagesSquare, Type } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export const INTERVIEW_TYPES = [
  {
    value: "all",
    label: "All Interviews",
    description: "Show every interview you've generated",
    icon: LayoutGrid,
  },
  {
    value: "text",
    label: "Text Interview",
    description: "Type your responses at your own pace",
    icon: Type,
  },
  {
    value: "behavioral",
    label: "Behavioral Interview",
    description: "Practice STAR-format leadership stories",
    icon: MessagesSquare,
  },
];

export function InterviewTypeSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {INTERVIEW_TYPES.map((type) => (
        <button
          key={type.value}
          type="button"
          onClick={() => onChange(type.value)}
          className="text-left"
        >
          <Card
            className={cn(
              "h-full p-4 transition-all duration-200",
              value === type.value
                ? "glow-ring border-primary/40 bg-primary/5"
                : "hover:border-primary/20 hover:-translate-y-0.5",
            )}
          >
            <span
              className={cn(
                "flex size-10 items-center justify-center rounded-xl",
                value === type.value
                  ? "gradient-brand text-white"
                  : "bg-muted text-muted-foreground",
              )}
            >
              <type.icon className="size-5" />
            </span>
            <h3 className="mt-3 font-display text-sm font-semibold">
              {type.label}
            </h3>
            <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
              {type.description}
            </p>
          </Card>
        </button>
      ))}
    </div>
  );
}
