import { UserPlus, Target, PlayCircle, TrendingUp } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { RevealGroup, RevealItem } from "@/components/shared/reveal";

const STEPS = [
  {
    icon: UserPlus,
    title: "Create your profile",
    description:
      "Tell us your target role, seniority, and companies you're interviewing with.",
  },
  {
    icon: Target,
    title: "Get a tailored plan",
    description:
      "MockMind AI builds a prep track mixing voice, coding, and behavioral rounds.",
  },
  {
    icon: PlayCircle,
    title: "Practice with AI",
    description:
      "Run realistic mock interviews and receive feedback the moment you finish.",
  },
  {
    icon: TrendingUp,
    title: "Track your growth",
    description:
      "Watch your scores climb across sessions and walk in fully prepared.",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 sm:py-32">
      <div className="container-page">
        <SectionHeading
          eyebrow="How it works"
          title="From first practice run to offer letter"
          description="A simple, guided loop that gets sharper every time you use it."
        />

        <RevealGroup className="relative mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="pointer-events-none absolute top-8 left-0 right-0 hidden h-px bg-border lg:block" />
          {STEPS.map((step, i) => (
            <RevealItem
              key={step.title}
              className="relative flex flex-col items-start"
            >
              <div className="relative z-10 flex size-16 items-center justify-center rounded-2xl border border-border bg-card shadow-sm">
                <step.icon className="size-6 text-primary" />
                <span className="absolute -right-2 -top-2 flex size-6 items-center justify-center rounded-full gradient-brand text-[11px] font-semibold text-white shadow-md">
                  {i + 1}
                </span>
              </div>
              <h3 className="mt-5 font-display text-base font-semibold">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
