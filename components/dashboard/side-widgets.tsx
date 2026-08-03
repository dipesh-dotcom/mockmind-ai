"use client";

import Link from "next/link";
import {
  CalendarClock,
  Code2,
  FileSearch,
  GraduationCap,
  Mic,
  Plus,
  MessagesSquare,
} from "lucide-react";
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

const UPCOMING = [
  {
    role: "Onsite loop — Stripe",
    date: "Fri, Aug 1",
    time: "10:00 AM",
    daysLeft: 5,
  },
  {
    role: "Final round — Nimbus Inc.",
    date: "Mon, Aug 4",
    time: "2:30 PM",
    daysLeft: 8,
  },
];

export function UpcomingInterviews() {
  return (
    <Reveal>
      <Card>
        <CardHeader>
          <CardTitle>Upcoming interviews</CardTitle>
          <CardDescription>
            Scheduled interviews you&apos;re preparing for
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-3">
          {UPCOMING.map((item) => (
            <div
              key={item.role}
              className="flex items-start gap-3 rounded-xl border border-border p-3.5"
            >
              <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent">
                <CalendarClock className="size-4" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{item.role}</p>
                <p className="text-xs text-muted-foreground">
                  {item.date} · {item.time}
                </p>
              </div>
              <Badge variant="secondary" className="shrink-0">
                {item.daysLeft}d left
              </Badge>
            </div>
          ))}
          <Button variant="outline" size="sm" className="w-full">
            <Plus className="size-3.5" /> Add interview
          </Button>
        </CardContent>
      </Card>
    </Reveal>
  );
}

const QUICK_ACTIONS = [
  { icon: Mic, label: "Voice interview", href: "/practice" },
  { icon: Code2, label: "Coding round", href: "/practice" },
  { icon: MessagesSquare, label: "Behavioral prep", href: "/practice" },
  { icon: FileSearch, label: "Analyze resume", href: "/resume-analyzer" },
  { icon: GraduationCap, label: "Browse courses", href: "/learning-hub" },
];

export function QuickActions() {
  return (
    <Reveal delay={0.05}>
      <Card>
        <CardHeader>
          <CardTitle>Quick actions</CardTitle>
          <CardDescription>Jump straight into a session</CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-2">
          {QUICK_ACTIONS.map((action) => (
            <Button
              key={action.label}
              variant="outline"
              className="justify-start gap-3 font-normal"
            >
              <Link href={action.href}>
                <action.icon className="size-4 text-primary" />
                {action.label}
              </Link>
            </Button>
          ))}
        </CardContent>
      </Card>
    </Reveal>
  );
}
