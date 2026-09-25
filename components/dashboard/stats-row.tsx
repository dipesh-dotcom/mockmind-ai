"use client";

import { FileSearch, Flame, Mic, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

export type DashboardStats = {
  completedInterviews: number;
  completedThisWeek: number;
  averageScore: number | null;
  scoreDeltaLabel: string | null;
  latestResumeScore: number | null;
  latestAtsScore: number | null;
  currentStreak: number;
  bestStreak: number;
};

function deltaTone(text: string) {
  if (text.startsWith("+")) return "text-success";
  if (text.startsWith("−") || text.startsWith("-")) return "text-destructive";
  return "text-muted-foreground";
}

export function StatsRow({ stats }: { stats: DashboardStats }) {
  const cards = [
    {
      icon: Mic,
      label: "Interviews completed",
      value: String(stats.completedInterviews),
      delta:
        stats.completedThisWeek > 0
          ? `+${stats.completedThisWeek} this week`
          : "No interviews this week",
    },
    {
      icon: TrendingUp,
      label: "Average score",
      value: stats.averageScore != null ? `${stats.averageScore}%` : "—",
      delta: stats.scoreDeltaLabel ?? "Not enough data yet",
    },
    {
      icon: FileSearch,
      label: "Resume score",
      value:
        stats.latestResumeScore != null
          ? `${stats.latestResumeScore}/100`
          : "—",
      delta:
        stats.latestAtsScore != null
          ? `ATS: ${stats.latestAtsScore}/100`
          : "No resume analyzed yet",
    },
    {
      icon: Flame,
      label: "Current streak",
      value: `${stats.currentStreak} ${stats.currentStreak === 1 ? "day" : "days"}`,
      delta: `Best: ${stats.bestStreak} ${stats.bestStreak === 1 ? "day" : "days"}`,
    },
  ];

  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((stat) => (
        <RevealItem key={stat.label}>
          <Card className="p-5">
            <div className="flex items-center justify-between">
              <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                <stat.icon className="size-5" />
              </span>
            </div>
            <p className="mt-2 font-display text-2xl font-semibold tracking-tight">
              {stat.value}
            </p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className={`mt-1 text-xs font-medium ${deltaTone(stat.delta)}`}>
              {stat.delta}
            </p>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
