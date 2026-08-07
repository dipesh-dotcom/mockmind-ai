"use client";

import { Flame, Target } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/shared/reveal";

export function WelcomeSection() {
  const goalMinutes = 45;
  const doneMinutes = 28;
  const pct = Math.round((doneMinutes / goalMinutes) * 100);

  return (
    <Reveal>
      <div className="flex flex-col gap-5 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
        <div>
          <p className="text-sm text-muted-foreground">
            Good morning, Jordan 👋
          </p>
          <h1 className="mt-1 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Ready to sharpen your interview edge?
          </h1>
          <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
            You have 1 upcoming interview and 2 AI-recommended sessions today.
          </p>
        </div>

        <Card className="flex flex-row shadow-sm w-full shrink-0 items-center gap-4 border-primary/20 bg-primary/5 p-4 sm:w-72">
          <div className="relative flex size-16 shrink-0 items-center justify-center">
            <svg viewBox="0 0 64 64" className="size-16 -rotate-90">
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke="var(--muted)"
                strokeWidth="6"
              />
              <circle
                cx="32"
                cy="32"
                r="27"
                fill="none"
                stroke="url(#goalGradient)"
                strokeWidth="6"
                strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 27}
                strokeDashoffset={2 * Math.PI * 27 * (1 - pct / 100)}
              />
              <defs>
                <linearGradient id="goalGradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#2563EB" />
                  <stop offset="100%" stopColor="#06B6D4" />
                </linearGradient>
              </defs>
            </svg>
            <Target className="absolute size-5 text-primary" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Daily goal
            </p>
            <p className="mt-0.5 font-display text-lg font-semibold">
              {doneMinutes} / {goalMinutes} min
            </p>
            <Progress value={pct} className="mt-2 h-1.5" />
          </div>
        </Card>
      </div>
    </Reveal>
  );
}

export function StreakBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-warning/30 bg-warning/10 px-3.5 py-1.5 text-sm font-medium text-warning">
      <Flame className="size-4 fill-warning" />
      5-day streak
    </div>
  );
}
