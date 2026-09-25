"use client";

import { Flame, Target } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/shared/reveal";

// No per-user goal setting exists yet — fixed default until that's built.
const DAILY_GOAL_MINUTES = 30;

export function WelcomeSection({
  upcomingCount,
  todayMinutes,
}: {
  upcomingCount: number;
  todayMinutes: number;
}) {
  const { data: session } = useSession();

  const pct = Math.min(
    100,
    Math.round((todayMinutes / DAILY_GOAL_MINUTES) * 100),
  );

  const userName =
    session?.user?.name?.trim() ||
    session?.user?.email?.split("@")[0] ||
    "there";

  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

        <div className="flex flex-col gap-7 p-6 pl-7 sm:p-7 sm:pl-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                Good to see you, {userName}
              </p>
              <span className="text-base" aria-hidden="true">
                👋
              </span>
            </div>

            <h1 className="mt-1.5 font-display text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              Ready to sharpen your
              <span className="text-primary"> interview edge?</span>
            </h1>

            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
              {upcomingCount > 0 ? (
                <>
                  You have{" "}
                  <span className="font-medium text-foreground">
                    {upcomingCount} interview{upcomingCount === 1 ? "" : "s"}
                  </span>{" "}
                  ready to start whenever you are.
                </>
              ) : (
                "You're all caught up — generate a new interview to keep practicing."
              )}
            </p>
          </div>

          <Card className="w-full shrink-0 border-border bg-muted/40 p-4 shadow-none sm:w-[310px]">
            <div className="flex items-center gap-4">
              <div className="relative flex size-[68px] shrink-0 items-center justify-center">
                <svg
                  viewBox="0 0 68 68"
                  className="size-[68px] -rotate-90"
                  aria-label={`${pct}% of daily goal completed`}
                >
                  <circle
                    cx="34"
                    cy="34"
                    r="29"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="5"
                  />
                  <circle
                    cx="34"
                    cy="34"
                    r="29"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="5"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 29}
                    strokeDashoffset={2 * Math.PI * 29 * (1 - pct / 100)}
                    className="transition-all duration-700"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Target className="size-5 text-primary" />
                </div>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Today's practice
                  </p>
                  <span className="text-xs font-medium text-primary">
                    {pct}%
                  </span>
                </div>
                <p className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                  {todayMinutes}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    / {DAILY_GOAL_MINUTES} min
                  </span>
                </p>
                <Progress value={pct} className="mt-2 h-1.5" />
              </div>
            </div>
          </Card>
        </div>
      </section>
    </Reveal>
  );
}

export function StreakBadge({ days }: { days: number }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-warning/20 bg-warning/5 px-3 py-1.5 text-sm font-medium text-warning">
      <span className="flex size-5 items-center justify-center rounded-full bg-warning/10">
        <Flame className="size-3.5 fill-current" />
      </span>
      <span>{days}-day streak</span>
    </div>
  );
}
