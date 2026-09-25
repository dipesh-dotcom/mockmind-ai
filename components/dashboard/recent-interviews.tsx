"use client";

import Link from "next/link";
import { ArrowRight, Loader2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type RecentInterview = {
  id: string;
  title: string;
  jobTitle: string;
  type: string;
  status: "DRAFT" | "GENERATING" | "READY" | "FAILED";
  score: number | null;
  completedAt: string | null;
  createdAt: string;
  questionCount: number;
};

function statusMeta(interview: RecentInterview) {
  if (interview.status === "FAILED") {
    return { label: "Failed", variant: "destructive" as const };
  }
  if (interview.status === "GENERATING") {
    return { label: "Generating", variant: "warning" as const };
  }
  if (interview.completedAt) {
    return { label: "Completed", variant: "success" as const };
  }
  return { label: "Ready", variant: "secondary" as const };
}

export function RecentInterviews({
  interviews,
}: {
  interviews: RecentInterview[];
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Recent interviews</CardTitle>
        <Link
          href="/practice"
          className="flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all <ArrowRight className="size-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {interviews.length === 0 ? (
          <p className="py-6 text-center text-sm text-muted-foreground">
            No interviews yet.
          </p>
        ) : (
          interviews.map((interview) => {
            const meta = statusMeta(interview);
            const clickable =
              interview.status === "READY" || interview.status === "FAILED";

            return (
              <div
                key={interview.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border p-3.5"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">
                    {interview.title || interview.jobTitle}
                  </p>
                  <p className="mt-0.5 truncate text-xs text-muted-foreground">
                    {interview.jobTitle} · {interview.questionCount} questions
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-3">
                  {interview.score != null && (
                    <span className="text-sm font-semibold">
                      {interview.score}
                      <span className="font-normal text-muted-foreground">
                        /100
                      </span>
                    </span>
                  )}
                  <Badge variant={meta.variant} className="gap-1">
                    {interview.status === "GENERATING" && (
                      <Loader2 className="size-3 animate-spin" />
                    )}
                    {meta.label}
                  </Badge>
                  {clickable && interview.status !== "FAILED" && (
                    <Button size="sm" variant="outline">
                      <Link href={`/practice/${interview.id}`}>
                        {interview.completedAt ? "View" : "Continue"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </CardContent>
    </Card>
  );
}
