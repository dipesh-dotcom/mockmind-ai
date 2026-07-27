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
    <section className="relative overflow-hidden pt-16 pb-24 sm:pt-24 sm:pb-32">
      {/* Ambient gradient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[560px] w-[560px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px] dark:bg-primary/25" />
        <div className="absolute right-[5%] top-[15%] h-[360px] w-[360px] rounded-full bg-accent/20 blur-[110px] [animation:var(--animate-float)]" />
        <div className="absolute left-[2%] top-[35%] h-[300px] w-[300px] rounded-full bg-secondary/20 blur-[100px] [animation:var(--animate-float)] [animation-delay:1.5s]" />
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent,var(--background)_92%)]" />
      </div>

      <div className="container-page">
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Badge
              variant="gradient"
              className="px-4 py-1.5 text-xs shadow-md shadow-primary/20"
            >
              <Sparkles className="size-3.5" />
              Trained on 50,000+ real interviews
            </Badge>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="mt-7 text-balance font-display text-4xl font-semibold leading-[1.08] tracking-tight sm:text-6xl"
          >
            Walk into every interview
            <br />
            like you've{" "}
            <span className="gradient-text">already done it before.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.16 }}
            className="mt-6 text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            MockMind AI runs realistic voice, text, coding and behavioral mock
            interviews, then gives you sharp, actionable feedback—so you walk
            into every interview prepared, not hopeful.
          </motion.p>

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
                Watch it in action
              </Button>
            </a>
          </motion.div>

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
                  <AvatarFallback className="text-[11px]">
                    {initials}
                  </AvatarFallback>
                </Avatar>
              ))}
            </div>

            <span>Joined by 42,000+ candidates preparing this month</span>
          </motion.div>
        </div>

        {/* Product Preview */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="relative mx-auto mt-20 max-w-4xl"
        >
          <div className="glow-ring relative rounded-2xl border border-border bg-card p-3 shadow-2xl sm:p-4">
            <div className="flex items-center gap-1.5 px-2 pb-3">
              <span className="size-2.5 rounded-full bg-destructive/60" />
              <span className="size-2.5 rounded-full bg-warning/60" />
              <span className="size-2.5 rounded-full bg-success/60" />
              <span className="ml-3 text-xs text-muted-foreground">
                mockmind.ai/interview/senior-frontend-engineer
              </span>
            </div>

            <div className="grid gap-3 rounded-xl bg-surface p-4 sm:grid-cols-[1.3fr_1fr] sm:p-5">
              {/* Left Panel */}
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="gradient-brand flex size-8 items-center justify-center rounded-lg text-white">
                      <Sparkles className="size-4" />
                    </span>

                    <div>
                      <p className="text-sm font-semibold">
                        MockMind Interviewer
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Senior Frontend Engineer · Live
                      </p>
                    </div>
                  </div>

                  <Badge variant="success" className="gap-1">
                    <span className="size-1.5 animate-pulse rounded-full bg-success" />
                    Recording
                  </Badge>
                </div>

                <div className="mt-4 space-y-2.5">
                  <div className="rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm">
                    Tell me about a time you optimized a slow-rendering React
                    application.
                  </div>

                  <div className="gradient-brand ml-auto max-w-[85%] rounded-xl rounded-tr-sm px-3.5 py-2.5 text-sm text-white">
                    Sure—on our dashboard, list re-renders were reducing FPS, so
                    I memoized selectors and virtualized the table...
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 rounded-xl border border-border p-2.5">
                  <Mic className="size-4 text-primary" />

                  <div className="flex h-6 flex-1 items-center gap-0.5">
                    {[6, 14, 9, 20, 12, 18, 8, 16, 10].map((height, index) => (
                      <span
                        key={index}
                        className="gradient-brand w-1 rounded-full"
                        style={{ height: `${height}px` }}
                      />
                    ))}
                  </div>

                  <span className="text-xs font-medium text-muted-foreground">
                    02:14
                  </span>
                </div>
              </div>

              {/* Right Panel */}
              <div className="flex flex-col gap-3">
                <div className="rounded-xl border border-border bg-card p-4">
                  <p className="text-xs font-medium text-muted-foreground">
                    Live Score
                  </p>

                  <p className="gradient-text mt-1 font-display text-3xl font-semibold">
                    87%
                  </p>

                  <div className="mt-3 space-y-2">
                    {[
                      { label: "Clarity", value: 90 },
                      { label: "Technical depth", value: 82 },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="mb-1 flex justify-between text-[11px] text-muted-foreground">
                          <span>{item.label}</span>
                          <span>{item.value}%</span>
                        </div>

                        <div className="h-1.5 w-full rounded-full bg-muted">
                          <div
                            className="gradient-brand h-1.5 rounded-full"
                            style={{ width: `${item.value}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex-1 rounded-xl border border-border bg-card p-4">
                  <p className="mb-2.5 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Code2 className="size-3.5" />
                    Coding Round
                  </p>

                  <div className="space-y-1.5 text-[11px] text-muted-foreground">
                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-success" />
                      Two Sum — solved
                    </p>

                    <p className="flex items-center gap-1.5">
                      <CheckCircle2 className="size-3.5 text-success" />
                      Time complexity explained
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
