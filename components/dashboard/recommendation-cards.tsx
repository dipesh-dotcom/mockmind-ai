"use client";

import Link from "next/link";
import { ArrowRight, Code2, MessagesSquare, Sparkles } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

const RECOMMENDATIONS = [
  {
    icon: Code2,
    tag: "Skill gap",
    title: "System Design: Rate Limiters",
    description:
      "Your last 2 sessions flagged weak trade-off reasoning. 20-min focused drill.",
    href: "/practice",
    accent: "bg-primary/10 text-primary",
  },
  {
    icon: MessagesSquare,
    tag: "Upcoming interview",
    title: "Behavioral prep for Stripe loop",
    description:
      "Practice leadership & conflict stories in the STAR format before Friday.",
    href: "/practice",
    accent: "bg-accent/10 text-accent",
  },
  {
    icon: Sparkles,
    tag: "Quick win",
    title: "Polish your resume summary",
    description:
      "AI suggests 3 rewrites to better match your target job description.",
    href: "/resume-analyzer",
    accent: "bg-secondary/10 text-secondary",
  },
];

export function RecommendationCards() {
  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">
          Recommended for you
        </h2>
        <Badge variant="default" className="gap-1">
          <Sparkles className="size-3" /> AI-curated
        </Badge>
      </div>
      <RevealGroup className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        {RECOMMENDATIONS.map((rec) => (
          <RevealItem key={rec.title}>
            <Card className="flex h-full flex-col p-5 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5">
              <span
                className={`flex size-10 items-center justify-center rounded-xl ${rec.accent}`}
              >
                <rec.icon className="size-5" />
              </span>
              <p className="mt-3.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
                {rec.tag}
              </p>
              <h3 className="mt-1 font-display text-sm font-semibold leading-snug">
                {rec.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {rec.description}
              </p>
              <Button variant="ghost" size="sm" className="mt-3 -ml-2.5 w-fit">
                <Link href={rec.href}>
                  Start now <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </Card>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
