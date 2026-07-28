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
      "Solve real coding, DSA, and system design challenges with instant AI-powered feedback.",
  },
  {
    icon: MessagesSquare,
    title: "Behavioral interview coaching",
    description:
      "Master STAR-format answers for leadership, teamwork, conflict resolution, and ownership questions.",
  },
  {
    icon: FileSearch,
    title: "AI resume analyzer",
    description:
      "Receive ATS scores, keyword suggestions, and personalized improvements within seconds.",
  },
  {
    icon: LineChart,
    title: "Track your progress",
    description:
      "Monitor clarity, confidence, technical skills, and overall interview readiness over time.",
  },
  {
    icon: Timer,
    title: "Timed mock interviews",
    description:
      "Practice under realistic interview time limits so every session feels like the real thing.",
  },
  {
    icon: Users,
    title: "Company-specific preparation",
    description:
      "Practice interview questions inspired by real hiring processes from top tech companies.",
  },
  {
    icon: ShieldCheck,
    title: "Privacy first",
    description:
      "Your recordings, transcripts, resumes, and interview history remain encrypted and secure.",
  },
];

export function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="Platform"
          title="Everything you need to ace your interviews"
          description="MockMind AI combines realistic practice, AI feedback, and progress tracking into one modern workspace."
        />

        <RevealGroup className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;

            return (
              <RevealItem key={feature.title}>
                <Card className="glass group h-full rounded-2xl border border-border p-6 transition-all duration-300 hover:-translate-y-2 hover:border-primary/30 hover:shadow-2xl">
                  <div className="flex size-12 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary group-hover:text-white">
                    <Icon className="size-5 transition-transform duration-300 group-hover:scale-110" />
                  </div>

                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {feature.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
