"use client";

import { CheckCircle2, ListChecks, Target, FileText } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { ProfileData } from "@/components/profile/profile-client";

export function ActivityTab({ stats }: { stats: ProfileData["stats"] }) {
  const cards = [
    {
      label: "Total interviews",
      value: stats.totalInterviews,
      icon: ListChecks,
    },
    {
      label: "Completed",
      value: stats.completedInterviews,
      icon: CheckCircle2,
    },
    {
      label: "Average score",
      value: stats.averageScore != null ? `${stats.averageScore}/100` : "—",
      icon: Target,
    },
    { label: "Resumes analyzed", value: stats.resumesAnalyzed, icon: FileText },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {cards.map((c) => (
        <Card key={c.label}>
          <CardContent className="flex items-center justify-between p-5">
            <div>
              <p className="text-xs font-medium text-muted-foreground">
                {c.label}
              </p>
              <p className="mt-2 text-2xl font-semibold">{c.value}</p>
            </div>
            <span className="flex size-10 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <c.icon className="size-5" />
            </span>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
