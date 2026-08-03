"use client";

import Link from "next/link";
import { ArrowUpRight, Code2, Mic, MessagesSquare, Type } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/shared/reveal";

const RECENT = [
  {
    role: "Senior Frontend Engineer",
    company: "Nimbus Inc.",
    type: "Voice",
    icon: Mic,
    score: 88,
    date: "Today, 9:40 AM",
  },
  {
    role: "Product Manager",
    company: "Vertex Labs",
    type: "Behavioral",
    icon: MessagesSquare,
    score: 76,
    date: "Yesterday",
  },
  {
    role: "Backend Engineer",
    company: "Orbital",
    type: "Coding",
    icon: Code2,
    score: 91,
    date: "2 days ago",
  },
  {
    role: "UX Researcher",
    company: "Fenwick",
    type: "Text",
    icon: Type,
    score: 69,
    date: "4 days ago",
  },
];

function scoreVariant(score: number) {
  if (score >= 85) return "success" as const;
  if (score >= 70) return "warning" as const;
  return "destructive" as const;
}

export function RecentInterviews() {
  return (
    <Reveal>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <div>
            <CardTitle>Recent interviews</CardTitle>
            <CardDescription>
              Your latest mock interview sessions
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm">
            <Link href="/practice">
              View all <ArrowUpRight className="size-3.5" />
            </Link>
          </Button>
        </CardHeader>
        <CardContent className="space-y-1">
          {RECENT.map((item) => (
            <div
              key={item.role + item.date}
              className="flex items-center gap-3.5 rounded-xl px-2 py-3 transition-colors hover:bg-muted/60"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
                <item.icon className="size-4.5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.role}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {item.company} · {item.date}
                </p>
              </div>
              <Badge
                variant="gradient"
                className="hidden shrink-0 sm:inline-flex"
              >
                {item.type}
              </Badge>
              <Badge variant={scoreVariant(item.score)} className="shrink-0">
                {item.score}%
              </Badge>
            </div>
          ))}
        </CardContent>
      </Card>
    </Reveal>
  );
}
