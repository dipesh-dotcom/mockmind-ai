"use client";

import Link from "next/link";
import { ArrowUpRight, ListChecks } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type UpcomingInterview = {
  id: string;
  title: string;
  jobTitle: string;
  type: string;
  questionCount: number;
};

export function UpcomingInterviews({
  interviews,
}: {
  interviews: UpcomingInterview[];
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Ready to start</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {interviews.length === 0 ? (
          <p className="py-4 text-center text-sm text-muted-foreground">
            Nothing waiting — generate a new interview to get going.
          </p>
        ) : (
          interviews.map((interview) => (
            <div
              key={interview.id}
              className="flex items-center justify-between gap-3 rounded-xl border border-border p-3"
            >
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">
                  {interview.title || interview.jobTitle}
                </p>
                <p className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                  <ListChecks className="size-3" /> {interview.questionCount}{" "}
                  questions
                </p>
              </div>
              <Button size="icon" variant="ghost">
                <Link
                  href={`/practice/${interview.id}`}
                  aria-label="Start interview"
                >
                  <ArrowUpRight className="size-4" />
                </Link>
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
