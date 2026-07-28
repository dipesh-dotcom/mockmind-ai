import { UserPlus, Target, PlayCircle, TrendingUp } from "lucide-react";

import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Tell us your target role, experience level, preferred companies, and interview goals.",
  },
  {
    icon: Target,
    title: "Get a personalized roadmap",
    description:
      "MockMind AI generates a preparation plan tailored to your role with behavioral, technical, voice, and coding rounds.",
  },
  {
    icon: PlayCircle,
    title: "Practice with AI",
    description:
      "Take realistic mock interviews, receive instant feedback, and improve after every session.",
  },
  {
    icon: TrendingUp,
    title: "Measure your progress",
    description:
      "Track your scores, identify weak areas, and build confidence before your real interview.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="From first practice session to your dream offer"
          description="A simple AI-powered workflow that helps you improve with every interview."
        />

        <RevealGroup className="relative mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Connecting line */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-border lg:block"
          />

          {STEPS.map((step, index) => {
            const Icon = step.icon;

            return (
              <RevealItem key={step.title} className="group relative">
                <div className="glass relative flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/30 hover:shadow-xl">
                  <div className="relative flex size-16 items-center justify-center rounded-2xl border border-border bg-background">
                    <Icon className="size-6 text-primary transition-transform duration-300 group-hover:scale-110" />

                    <span className="gradient-brand absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full text-[11px] font-semibold text-white shadow-md">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="mt-6 font-display text-lg font-semibold">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-muted-foreground">
                    {step.description}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>
      </div>
    </section>
  );
}
