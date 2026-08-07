"use client";

import { useRouter } from "next/navigation";
import { Clock, Play, SearchX, Star } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { EmptyState } from "@/components/shared/empty-state";
import { Role } from "@/types/roles";

const DIFFICULTY_STYLE: Record<
  Role["difficulty"],
  "success" | "warning" | "destructive"
> = {
  beginner: "success",
  intermediate: "warning",
  advanced: "destructive",
};

export function RoleGrid({ roles }: { roles: Role[] }) {
  const router = useRouter();

  if (roles.length === 0) {
    return (
      <EmptyState
        icon={SearchX}
        title="No roles match your filters"
        description="Try a different search term, company, or difficulty level."
      />
    );
  }

  return (
    <RevealGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {roles.map((role) => (
        <RevealItem key={role.id}>
          <Card className="flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
            <div className="flex items-start justify-between gap-2">
              <div>
                <h3 className="font-display text-sm font-semibold leading-snug">
                  {role.title}
                </h3>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {role.company}
                </p>
              </div>
              <Badge
                variant={DIFFICULTY_STYLE[role.difficulty]}
                className="shrink-0 capitalize"
              >
                {role.difficulty}
              </Badge>
            </div>

            <div className="mt-3 flex flex-wrap gap-1.5">
              {role.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-[10px]">
                  {tag}
                </Badge>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-4 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="size-3.5" /> {role.duration}
              </span>
              <span className="flex items-center gap-1">
                <Star className="size-3.5 fill-warning text-warning" />{" "}
                {role.rating.toFixed(1)}
              </span>
            </div>

            <Button
              size="sm"
              className="mt-4 w-full"
              onClick={() => router.push(`/interview/${role.id}`)}
            >
              <Play className="size-3.5" /> Start interview
            </Button>
          </Card>
        </RevealItem>
      ))}
    </RevealGroup>
  );
}
