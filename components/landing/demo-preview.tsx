"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Code2, MessagesSquare, Type, Sparkles, Send } from "lucide-react";
import { SectionHeading } from "@/components/shared/section-heading";
import { Reveal } from "@/components/shared/reveal";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const MODES = [
  {
    value: "voice",
    label: "Voice",
    icon: Mic,
    question:
      "Walk me through a project where you had to make a tough technical trade-off.",
    body: (
      <div className="flex flex-1 flex-col items-center justify-center gap-5 py-6">
        <div className="relative flex size-24 items-center justify-center rounded-full gradient-brand shadow-lg shadow-primary/30">
          <div className="absolute inset-0 rounded-full gradient-brand animate-ping opacity-20" />
          <Mic className="size-9 text-white" />
        </div>
        <div className="flex h-8 items-end gap-1">
          {[10, 20, 14, 26, 16, 22, 12, 18, 9, 24].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full gradient-brand"
              style={{ height: h }}
            />
          ))}
        </div>
        <p className="text-sm text-muted-foreground">Listening — 00:47</p>
      </div>
    ),
  },
  {
    value: "text",
    label: "Text",
    icon: Type,
    question:
      "Describe a time you disagreed with a product decision. What did you do?",
    body: (
      <div className="flex flex-1 flex-col justify-between gap-4 py-2">
        <div className="space-y-3">
          <div className="max-w-[85%] rounded-xl rounded-tl-sm bg-muted px-3.5 py-2.5 text-sm">
            Describe a time you disagreed with a product decision. What did you
            do?
          </div>
          <div className="ml-auto max-w-[85%] rounded-xl rounded-tr-sm gradient-brand px-3.5 py-2.5 text-sm text-white">
            I raised concerns backed by usage data, proposed a smaller test, and
            aligned with the PM before the launch...
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Input placeholder="Type your response..." className="h-11" />
          <Button size="icon" className="shrink-0">
            <Send className="size-4" />
          </Button>
        </div>
      </div>
    ),
  },
  {
    value: "coding",
    label: "Coding",
    icon: Code2,
    question: "Implement a function that returns the k most frequent elements.",
    body: (
      <div className="flex flex-1 flex-col gap-3 py-2">
        <div className="rounded-xl border border-border bg-[#0d1117] p-4 font-mono text-[13px] leading-relaxed text-zinc-200">
          <p>
            <span className="text-purple-400">function</span>{" "}
            <span className="text-blue-400">topKFrequent</span>(nums, k) {"{"}
          </p>
          <p className="pl-4 text-zinc-400">{"// build frequency map"}</p>
          <p className="pl-4">
            const freq = <span className="text-purple-400">new</span> Map();
          </p>
          <p className="pl-4">for (const n of nums) {"{"}</p>
          <p className="pl-8">freq.set(n, (freq.get(n) ?? 0) + 1);</p>
          <p className="pl-4">{"}"}</p>
          <p className="text-zinc-500">▍</p>
        </div>
        <div className="flex items-center justify-between">
          <Badge variant="secondary">Runtime: O(n log k)</Badge>
          <Button size="sm" variant="outline">
            Run tests
          </Button>
        </div>
      </div>
    ),
  },
  {
    value: "behavioral",
    label: "Behavioral",
    icon: MessagesSquare,
    question:
      "Tell me about a time you led a team through a stressful deadline.",
    body: (
      <div className="flex flex-1 flex-col gap-3 py-2">
        <div className="grid grid-cols-4 gap-2 text-center text-[11px] font-medium">
          {["Situation", "Task", "Action", "Result"].map((s, i) => (
            <div
              key={s}
              className={`rounded-lg border px-2 py-2 ${
                i <= 1
                  ? "border-primary/30 bg-primary/10 text-primary"
                  : "border-border text-muted-foreground"
              }`}
            >
              {s}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-border bg-muted/50 p-3.5 text-sm text-muted-foreground">
          Structuring your answer... AI is scoring how clearly you set up the
          <span className="text-foreground font-medium"> Situation </span>
          and define your{" "}
          <span className="text-foreground font-medium">Task</span>.
        </div>
      </div>
    ),
  },
];

export function DemoPreview() {
  const [active, setActive] = React.useState(MODES[0].value);
  const mode = MODES.find((m) => m.value === active)!;

  return (
    <section id="demo" className="py-24 sm:py-32 bg-surface/40">
      <div className="container-page">
        <SectionHeading
          eyebrow="Live Demo"
          title="One platform, four ways to practice"
          description="Switch formats depending on what you're preparing for — the AI adapts its questions and scoring to each one."
        />

        <Reveal className="mt-14" delay={0.1}>
          <Tabs
            value={active}
            onValueChange={setActive}
            className="items-center"
          >
            <TabsList className="mx-auto">
              {MODES.map((m) => (
                <TabsTrigger key={m.value} value={m.value}>
                  <m.icon /> {m.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {MODES.map((m) => (
              <TabsContent key={m.value} value={m.value} className="hidden" />
            ))}
          </Tabs>

          <div className="mx-auto mt-8 max-w-3xl">
            <Card className="glow-ring overflow-hidden p-0">
              <div className="flex items-center justify-between border-b border-border bg-muted/40 px-5 py-3.5">
                <div className="flex items-center gap-2">
                  <span className="flex size-7 items-center justify-center rounded-lg gradient-brand text-white">
                    <Sparkles className="size-3.5" />
                  </span>
                  <span className="text-sm font-medium">
                    MockMind Interviewer
                  </span>
                </div>
                <Badge variant="ghost" className="gap-1">
                  <span className="size-1.5 rounded-full bg-success animate-pulse" />{" "}
                  Live
                </Badge>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="flex min-h-[320px] flex-col p-5 sm:p-6"
                >
                  <p className="text-sm font-medium leading-relaxed">
                    {mode.question}
                  </p>
                  {mode.body}
                </motion.div>
              </AnimatePresence>
            </Card>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
