"use client";

import Link from "next/link";
import {
  ChevronRight,
  FileSearch,
  History,
  Sparkles,
  UserRound,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CreateInterviewDialog } from "@/components/interview/create-interview-dialog";
import { cn } from "@/lib/utils";

const ACTIONS = [
  {
    key: "resume",
    href: "/resume-analyzer",
    icon: FileSearch,
    label: "Analyze resume",
    description: "Check ATS score & keyword match",
  },
  {
    key: "history",
    href: "/practice",
    icon: History,
    label: "Practice history",
    description: "Revisit past interviews",
  },
  {
    key: "profile",
    href: "/profile",
    icon: UserRound,
    label: "View profile",
    description: "Account, security & activity",
  },
] as const;

function ActionRow({
  icon: Icon,
  label,
  description,
  className,
}: {
  icon: React.ElementType;
  label: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex items-center gap-3 rounded-xl border border-border p-3 transition-colors hover:border-primary/30 hover:bg-muted/40",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
        <Icon className="size-[18px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{label}</p>
        <p className="truncate text-xs text-muted-foreground">{description}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" />
    </div>
  );
}

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Quick actions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        <CreateInterviewDialog
          trigger={
            <button type="button" className="block w-full text-left">
              <ActionRow
                icon={Sparkles}
                label="New interview"
                description="Generate a tailored mock interview"
                className="border-primary/20 bg-primary/5 hover:border-primary/40 hover:bg-primary/10"
              />
            </button>
          }
        />

        {ACTIONS.map((action) => (
          <Link key={action.key} href={action.href} className="block">
            <ActionRow
              icon={action.icon}
              label={action.label}
              description={action.description}
            />
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}
