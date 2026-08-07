"use client";

import { FileSearch, Flame, Mic, TrendingUp } from "lucide-react";
import { Card } from "@/components/ui/card";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

const STATS = [
  {
    icon: Mic,
    label: "Interviews completed",
    value: "24",
    delta: "+4 this week",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Average score",
    value: "84%",
    delta: "+6% vs last month",
    positive: true,
  },
  {
    icon: FileSearch,
    label: "Resume score",
    value: "82/100",
    delta: "ATS optimized",
    positive: true,
  },
  {
    icon: Flame,
    label: "Current streak",
    value: "5 days",
    delta: "Best: 12 days",
    positive: true,
  },
];

export function StatsRow() {
  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((stat) => (
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
            <p className="mt-1 text-xs font-medium text-success">
              {stat.delta}
            </p>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
