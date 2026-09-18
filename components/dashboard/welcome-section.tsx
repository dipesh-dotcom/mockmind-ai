"use client";

import { Flame, Target } from "lucide-react";
import { useSession } from "next-auth/react";

import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Reveal } from "@/components/shared/reveal";

export function WelcomeSection() {
  const { data: session } = useSession();

  const goalMinutes = 45;
  const doneMinutes = 28;

  const pct = Math.min(100, Math.round((doneMinutes / goalMinutes) * 100));

  const userName =
    session?.user?.name?.trim() ||
    session?.user?.email?.split("@")[0] ||
    "there";

  return (
    <Reveal>
      <section className="relative overflow-hidden rounded-2xl border border-border bg-card">
        {/* Subtle brand accent */}
        <div className="absolute left-0 top-0 h-full w-1 bg-primary" />

        <div className="flex flex-col gap-7 p-6 pl-7 sm:p-7 sm:pl-8 lg:flex-row lg:items-center lg:justify-between">
          {/* ─────────────────────────
              Welcome
          ───────────────────────── */}

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <p className="text-sm font-medium text-muted-foreground">
                Good morning, {userName}
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
              You have{" "}
              <span className="font-medium text-foreground">
                1 upcoming interview
              </span>{" "}
              and{" "}
              <span className="font-medium text-foreground">
                2 recommended sessions
              </span>{" "}
              waiting for you today.
            </p>
          </div>

          {/* ─────────────────────────
              Daily Goal
          ───────────────────────── */}

          <Card className="w-full shrink-0 border-border bg-muted/40 p-4 shadow-none sm:w-[310px]">
            <div className="flex items-center gap-4">
              {/* Progress Ring */}
              <div className="relative flex size-[68px] shrink-0 items-center justify-center">
                <svg
                  viewBox="0 0 68 68"
                  className="size-[68px] -rotate-90"
                  aria-label={`${pct}% of daily goal completed`}
                >
                  {/* Background */}
                  <circle
                    cx="34"
                    cy="34"
                    r="29"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="5"
                  />

                  {/* Progress */}
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

              {/* Goal Information */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Daily goal
                  </p>

                  <span className="text-xs font-medium text-primary">
                    {pct}%
                  </span>
                </div>

                <p className="mt-1 font-display text-lg font-semibold tracking-tight text-foreground">
                  {doneMinutes}
                  <span className="font-normal text-muted-foreground">
                    {" "}
                    / {goalMinutes} min
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

/* =========================================================
   STREAK
   ========================================================= */

export function StreakBadge() {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-warning/20 bg-warning/5 px-3 py-1.5 text-sm font-medium text-warning">
      <span className="flex size-5 items-center justify-center rounded-full bg-warning/10">
        <Flame className="size-3.5 fill-current" />
      </span>

      <span>5-day streak</span>
    </div>
  );
}
