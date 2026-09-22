"use client";

import { SearchX } from "lucide-react";
import { EmptyState } from "@/components/shared/empty-state";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { InterviewCard } from "@/components/practice/interview-card";
import type { InterviewSummary } from "@/types/interview";

export function InterviewGrid({
  interviews,
  loading,
  onDeleted,
}: {
  interviews: InterviewSummary[];
  loading: boolean;
  onDeleted?: (id: string) => void;
}) {
  if (loading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="h-48 animate-pulse rounded-2xl border border-border bg-muted/40"
          />
        ))}
      </div>
    );
  }

  if (interviews.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No interviews match your filters"
        description="Try a different search term, format, or experience level — or generate a new interview to get started."
      />
    );
  }

  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {interviews.map((interview) => (
        <RevealItem key={interview.id}>
          <InterviewCard interview={interview} onDeleted={onDeleted} />
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
