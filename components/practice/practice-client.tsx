"use client";

import * as React from "react";
import { PracticeFilters } from "@/components/practice/practice-filters";
import { InterviewTypeSelector } from "@/components/practice/interview-type-selector";
import { InterviewGrid } from "@/components/practice/interview-grid";
import { Reveal } from "@/components/shared/reveal";
import type { InterviewSummary } from "@/types/interview";

const TYPE_TO_ENUM: Record<string, InterviewSummary["type"]> = {
  voice: "VOICE",
  text: "TEXT",
  coding: "CODING",
  behavioral: "BEHAVIORAL",
};

export function PracticeClient() {
  const [interviews, setInterviews] = React.useState<InterviewSummary[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [search, setSearch] = React.useState("");
  const [experienceLevel, setExperienceLevel] = React.useState("");
  const [type, setType] = React.useState("all");

  React.useEffect(() => {
    let cancelled = false;

    async function loadInterviews() {
      setLoading(true);
      try {
        const res = await fetch("/api/interviews");
        if (!res.ok) throw new Error("Failed to load interviews");
        const data = (await res.json()) as { interviews: InterviewSummary[] };
        if (!cancelled) setInterviews(data.interviews);
      } catch {
        if (!cancelled) setInterviews([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    loadInterviews();
    return () => {
      cancelled = true;
    };
  }, []);

  const filtered = interviews.filter((interview) => {
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      interview.title.toLowerCase().includes(query) ||
      interview.jobTitle.toLowerCase().includes(query);
    const matchesType = type === "all" || interview.type === TYPE_TO_ENUM[type];
    const matchesExperience =
      !experienceLevel || interview.experienceLevel === experienceLevel;
    return matchesSearch && matchesType && matchesExperience;
  });

  return (
    <div className="mx-auto flex max-w-7xl flex-col gap-6">
      <Reveal>
        <div>
          <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
            Interview Practice
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Choose a format, pick a role, and start practicing in seconds.
          </p>
        </div>
      </Reveal>

      <Reveal delay={0.05}>
        <InterviewTypeSelector value={type} onChange={setType} />
      </Reveal>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <PracticeFilters
          search={search}
          onSearchChange={setSearch}
          experienceLevel={experienceLevel}
          onExperienceLevelChange={setExperienceLevel}
        />
        <InterviewGrid interviews={filtered} loading={loading} />
      </div>
    </div>
  );
}
