"use client";

import { Search } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const EXPERIENCE_LEVELS = [
  { value: "ENTRY", label: "Entry" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID", label: "Mid-level" },
  { value: "SENIOR", label: "Senior" },
  { value: "STAFF", label: "Staff" },
];

export function PracticeFilters({
  search,
  onSearchChange,
  experienceLevel,
  onExperienceLevelChange,
}: {
  search: string;
  onSearchChange: (v: string) => void;
  experienceLevel: string;
  onExperienceLevelChange: (v: string) => void;
}) {
  return (
    <Card className="sticky top-24 h-fit">
      <CardHeader>
        <CardTitle className="text-base">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="role-search">Search</Label>
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

        <div className="space-y-2.5">
          <Label>Experience level</Label>
          <div className="flex flex-wrap gap-2">
            {EXPERIENCE_LEVELS.map((lvl) => (
              <button
                key={lvl.value}
                onClick={() =>
                  onExperienceLevelChange(
                    experienceLevel === lvl.value ? "" : lvl.value,
                  )
                }
                type="button"
              >
                <Badge
                  variant={
                    experienceLevel === lvl.value ? "gradient" : "outline"
                  }
                  className={cn(
                    "cursor-pointer px-3 py-1.5 text-xs",
                    experienceLevel === lvl.value && "border-0",
                  )}
                >
                  {lvl.label}
                </Badge>
              </button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
