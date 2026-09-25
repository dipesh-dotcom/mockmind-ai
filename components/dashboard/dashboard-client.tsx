"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import {
  StatsRow,
  type DashboardStats,
} from "@/components/dashboard/stats-row";
import { RecentInterviews } from "@/components/dashboard/recent-interviews";
import { UpcomingInterviews } from "@/components/dashboard/upcoming-interviews";
import { QuickActions } from "@/components/dashboard/quick-actions";

type DashboardData = {
  stats: DashboardStats;
  upcomingCount: number;
  todayMinutes: number;
  recentInterviews: {
    id: string;
    title: string;
    jobTitle: string;
    type: string;
    status: "DRAFT" | "GENERATING" | "READY" | "FAILED";
    score: number | null;
    completedAt: string | null;
    createdAt: string;
    questionCount: number;
  }[];
  upcomingInterviews: {
    id: string;
    title: string;
    jobTitle: string;
    type: string;
    questionCount: number;
  }[];
};

export function DashboardClient() {
  const [data, setData] = React.useState<DashboardData | null>(null);
  const [loading, setLoading] = React.useState(true);

  const load = React.useCallback(async () => {
    const res = await fetch("/api/dashboard", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load dashboard");
    const json = (await res.json()) as DashboardData;
    setData(json);
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await load();
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [load]);

  React.useEffect(() => {
    function handleCreated() {
      load();
    }
    window.addEventListener("interview-created", handleCreated);
    return () => window.removeEventListener("interview-created", handleCreated);
  }, [load]);

  if (loading || !data) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <WelcomeSection
        upcomingCount={data.upcomingCount}
        todayMinutes={data.todayMinutes}
      />
      <StatsRow stats={data.stats} />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <RecentInterviews interviews={data.recentInterviews} />
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingInterviews interviews={data.upcomingInterviews} />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
