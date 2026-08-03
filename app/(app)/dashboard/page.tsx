import type { Metadata } from "next";
import { WelcomeSection } from "@/components/dashboard/welcome-section";
import { StatsRow } from "@/components/dashboard/stats-row";
import { RecommendationCards } from "@/components/dashboard/recommendation-cards";
import { ProgressChart } from "@/components/dashboard/progress-chart";
import { RecentInterviews } from "@/components/dashboard/recent-interviews";
import {
  UpcomingInterviews,
  QuickActions,
} from "@/components/dashboard/side-widgets";

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <WelcomeSection />
      <StatsRow />
      <RecommendationCards />

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="flex flex-col gap-6 lg:col-span-2">
          <ProgressChart />
          <RecentInterviews />
        </div>
        <div className="flex flex-col gap-6">
          <UpcomingInterviews />
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
