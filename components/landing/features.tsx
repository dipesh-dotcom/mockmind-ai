"use client";

import {
  Mic,
  Code2,
  MessagesSquare,
  FileSearch,
  LineChart,
  ShieldCheck,
  Timer,
  Users,
} from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";
import { Card } from "@/components/ui/card";

const FEATURES = [
  {
    icon: Mic,
    title: "Realistic voice interviews",
    description:
      "Speak naturally with an AI interviewer that listens, follows up, and adapts to your answers in real time.",
  },
  {
    icon: Code2,
    title: "Live coding rounds",
    description:
      "Solve real DSA and system design problems in a full code editor with instant complexity feedback.",
  },
  {
    icon: MessagesSquare,
    title: "Behavioral deep dives",
    description:
      "Practice STAR-format answers for leadership, conflict, and ownership questions used at top companies.",
  },
  {
    icon: FileSearch,
    title: "AI resume analyzer",
    description:
      "Get an ATS compatibility score, keyword gaps, and line-by-line rewrite suggestions in seconds.",
  },
  {
    icon: LineChart,
    title: "Progress you can see",
    description:
      "Track clarity, confidence, and technical depth over time with clean, exportable analytics.",
  },
  {
    icon: Timer,
    title: "Timed, pressure-tested",
    description:
      "Practice under real interview time constraints so the real thing feels familiar, not stressful.",
  },
  {
    icon: Users,
    title: "Company-specific tracks",
    description:
      "Curated question banks modeled on real interview loops from 200+ companies.",
  },
  {
    icon: ShieldCheck,
    title: "Private by design",
    description:
      "Your recordings, transcripts, and resume stay encrypted and are never used to train external models.",
  },
];

export function Features() {
  return (
    <section id="features" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Platform"
          title="Everything you need to prepare, in one focused workspace"
          description="No tab-switching, no guesswork. MockMind AI brings practice, feedback, and tracking into a single clean experience."
        />

        <RevealGroup className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => (
            <RevealItem key={feature.title}>
              <Card className="group h-full p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/5 hover:border-primary/30">
                <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:gradient-brand group-hover:text-white">
                  <feature.icon className="size-5" />
                </div>
                <h3 className="mt-4 font-display text-base font-semibold">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </Card>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
