"use client";

import * as React from "react";
import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const COMPANIES = [
  "Any company",
  "Google",
  "Amazon",
  "Stripe",
  "Meta",
  "Nimbus Inc.",
  "Vertex Labs",
];
const DIFFICULTIES = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

export function PracticeFilters({
  search,
  onSearchChange,
  company,
  onCompanyChange,
  difficulty,
  onDifficultyChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  company: string;
  onCompanyChange: (v: string) => void;
  difficulty: string;
  onDifficultyChange: (v: string) => void;
}) {
  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="role-search">Search role</Label>
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="role-search"
              placeholder="e.g. Frontend Engineer"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Company</Label>
          <Select
            value={company}
            onValueChange={(value) => {
              if (value) onCompanyChange(value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Any company" />
            </SelectTrigger>
            <SelectContent>
              {COMPANIES.map((c) => (
                <SelectItem key={c} value={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2.5">
          <Label>Difficulty</Label>
          <div className="flex flex-wrap gap-2">
            {DIFFICULTIES.map((d) => (
              <button
                key={d.value}
                onClick={() =>
                  onDifficultyChange(difficulty === d.value ? "" : d.value)
                }
                type="button"
              >
                <Badge
                  variant={difficulty === d.value ? "gradient" : "outline"}
                  className={cn(
                    "cursor-pointer px-3 py-1.5 text-xs",
                    difficulty === d.value && "border-0",
                  )}
                >
                  {d.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
