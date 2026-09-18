"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  PlayCircle,
  Sparkles,
  Mic,
  Code2,
  CheckCircle2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      {/* Subtle background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-primary/[0.045] blur-3xl" />

        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container-page">
        {/* Hero copy */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="outline"
              className="gap-1.5 border-teal-200 bg-teal-50 px-3.5 py-1.5 text-xs font-medium text-teal-700 dark:border-teal-900 dark:bg-teal-950/40 dark:text-teal-300"
            >
              <Sparkles className="size-3.5" />
              AI-powered interview practice
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-7 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
          >
            Practice the interview
            <br />
            <span className="gradient-text">before it actually matters.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            MockMind gives you realistic mock interviews, follow-up questions,
            and focused feedback on how you communicate, solve problems, and
            handle pressure.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.24 }}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row"
          >
            <Link href="/sign-up">
              <Button size="lg" className="w-full sm:w-auto">
                Start practicing free
                <ArrowRight className="size-4" />
              </Button>
            </Link>

            <a href="#demo">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <PlayCircle className="size-4" />
                See how it works
              </Button>
            </a>
          </motion.div>

          {/* Social proof */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.35 }}
            className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
          >
            <div className="flex -space-x-2.5">
              {["AK", "SM", "RP", "JL"].map((initials) => (
                <Avatar
                  key={initials}
                  className="size-8 border-2 border-background"
                >
                  <AvatarFallback className="bg-muted text-[11px] font-medium">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <span>
              Join thousands of candidates practicing for their next interview
            </span>
          </motion.div>
        </div>

        {/* Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto mt-16 max-w-5xl sm:mt-20"
        >
          <div className="glow-ring relative rounded-2xl border border-border bg-card p-3 sm:p-4">
            {/* Browser chrome */}
            <div className="flex items-center gap-1.5 px-2 pb-3">
              <span className="size-2.5 rounded-full bg-destructive/50" />
              <span className="size-2.5 rounded-full bg-warning/50" />
              <span className="size-2.5 rounded-full bg-success/50" />

              <div className="ml-3 flex h-7 flex-1 items-center rounded-md border border-border bg-muted/50 px-3">
                <span className="truncate text-[11px] text-muted-foreground">
                  mockmind.ai/interview/senior-frontend-engineer
                </span>
              </div>
            </div>

            {/* Application */}
            <div className="grid gap-3 rounded-xl bg-surface p-3 sm:grid-cols-[1.35fr_1fr] sm:p-4">
              {/* Interview panel */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                      <Mic className="size-4" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold">
                        MockMind Interviewer
                      </p>

                      <p className="text-xs text-muted-foreground">
                        Senior Frontend Engineer
                      </p>
                    </div>
                  </div>

                  <Badge
                    variant="outline"
                    className="gap-1 border-success/30 bg-success/5 text-success"
                  >
                    <span className="size-1.5 animate-pulse rounded-full bg-success" />
                    Recording
                  </Badge>
                </div>

                {/* Conversation */}
                <div className="mt-5 space-y-2.5">
                  <div className="max-w-[90%] rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm leading-relaxed">
                    Tell me about a time you optimized a slow-rendering React
                    application.
                  </div>

                  <div className="ml-auto max-w-[88%] rounded-xl rounded-tr-sm bg-primary px-3.5 py-2.5 text-sm leading-relaxed text-primary-foreground">
                    Sure — on our dashboard, list re-renders were reducing FPS,
                    so I memoized selectors and virtualized the table...
                  </div>
                </div>

                {/* Audio */}
                <div className="mt-5 flex items-center gap-2 rounded-xl border border-border bg-background p-2.5">
                  <div className="flex size-7 items-center justify-center rounded-lg bg-primary/10">
                    <Mic className="size-4 text-primary" />
                  </div>

                  <div className="flex h-6 flex-1 items-center gap-0.5">
                    {[6, 14, 9, 20, 12, 18, 8, 16, 10, 15, 7].map(
                      (height, index) => (
                        <span
                          key={index}
                          className="w-1 rounded-full bg-primary/70"
                          style={{ height: `${height}px` }}
                        />
                      ),
                    )}
                  </div>

                  <span className="text-xs font-medium tabular-nums text-muted-foreground">
                    02:14
                  </span>
                </div>
              </div>

              {/* Right column */}
              <div className="flex flex-col gap-3">
                {/* Score */}
                <div className="rounded-xl border border-border bg-card p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-xs font-medium text-muted-foreground">
                        Interview score
                      </p>

                      <p className="mt-1 font-display text-3xl font-semibold text-primary">
                        87%
                      </p>
                    </div>

                    <div className="flex size-9 items-center justify-center rounded-lg bg-primary/10">
                      <CheckCircle2 className="size-4 text-primary" />
                    </div>
                  </div>

                  <div className="mt-4 space-y-3">
                    {[
                      { label: "Clarity", value: 90 },
                      { label: "Technical depth", value: 82 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1.5 flex justify-between text-[11px] text-muted-foreground">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>

                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-primary"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Coding round */}
                <div className="flex-1 rounded-xl border border-border bg-card p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                      <Code2 className="size-3.5" />
                      Coding round
                    </p>

                    <span className="text-[10px] font-medium text-muted-foreground">
                      2 / 3
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-2">
                      <span className="text-[11px] text-muted-foreground">
                        Two Sum
                      </span>

                      <CheckCircle2 className="size-3.5 text-success" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg bg-muted/60 px-2.5 py-2">
                      <span className="text-[11px] text-muted-foreground">
                        Complexity explained
                      </span>

                      <CheckCircle2 className="size-3.5 text-success" />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border border-border px-2.5 py-2">
                      <span className="text-[11px] text-muted-foreground">
                        Follow-up question
                      </span>

                      <span className="text-[10px] font-medium text-amber-600">
                        Next
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Small caption */}
          <p className="mt-4 text-center text-xs text-muted-foreground">
            A realistic interview experience with feedback as you practice.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
