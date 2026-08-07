"use client";

import * as React from "react";
import { ROLES } from "@/lib/mock-data/roles";
import { PracticeFilters } from "@/components/practice/practice-filters";
import { InterviewTypeSelector } from "@/components/practice/interview-type-selector";
import { RoleGrid } from "@/components/practice/role-grid";
import { Reveal } from "@/components/shared/reveal";

export function PracticeClient() {
  const [search, setSearch] = React.useState("");
  const [company, setCompany] = React.useState("Any company");
  const [difficulty, setDifficulty] = React.useState("");
  const [type, setType] = React.useState("voice");

  const filtered = ROLES.filter((role) => {
    const matchesSearch = role.title
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchesCompany =
      company === "Any company" || role.company === company;
    const matchesDifficulty = !difficulty || role.difficulty === difficulty;
    return matchesSearch && matchesCompany && matchesDifficulty;
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
          company={company}
          onCompanyChange={setCompany}
          difficulty={difficulty}
          onDifficultyChange={setDifficulty}
        />
        <RoleGrid roles={filtered} />
      </div>
    </div>
  );
}
