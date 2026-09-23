"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import {
  CheckCircle2,
  ChevronDown,
  MessageSquareText,
  Target,
  TrendingUp,
  TriangleAlert,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

type QuestionWithAnswer = {
  id: string;
  order: number;
  category: string | null;
  question: string;
  expectedAnswer: string | null;
  hints: string[];
  followUps: string[];
  answer: {
    transcript: string | null;
    score: number | null;
    feedback: string | null;
    strengths: string[];
    improvements: string[];
  } | null;
};

type InterviewDetail = {
  id: string;
  title: string;
  jobTitle: string;
  type: "BEHAVIORAL" | "TEXT" | "VOICE" | "CODING";
  experienceLevel: string;
  durationMinutes: number;
  focusAreas: string[];
  completedAt: string | null;
  score: number | null;
  questions: QuestionWithAnswer[];
};

interface InterviewResultsProps {
  interview: InterviewDetail;
}

export function InterviewResults({ interview }: InterviewResultsProps) {
  const router = useRouter();

  const answeredQuestions = interview.questions.filter(
    (q) => q.answer?.score != null,
  );

  const scores = answeredQuestions
    .map((q) => q.answer?.score ?? 0)
    .filter((score) => score >= 0);

  const averageScore =
    scores.length > 0
      ? Math.round(
          scores.reduce((total, score) => total + score, 0) / scores.length,
        )
      : 0;

  const strongAnswers = scores.filter((score) => score >= 80).length;
  const needsImprovement = scores.filter((score) => score < 70).length;
  const excellentAnswers = scores.filter((score) => score >= 90).length;

  const goodAnswers = scores.filter(
    (score) => score >= 70 && score < 90,
  ).length;

  const allStrengths = Array.from(
    new Set(
      answeredQuestions.flatMap((question) => question.answer?.strengths ?? []),
    ),
  );

  const allImprovements = Array.from(
    new Set(
      answeredQuestions.flatMap(
        (question) => question.answer?.improvements ?? [],
      ),
    ),
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:py-12">
      {/* HEADER */}
      <div className="mb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <div className="mb-3 flex items-center gap-2">
              <span className="flex size-7 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="size-4 text-primary" />
              </span>

              <span className="text-sm font-medium text-muted-foreground">
                Interview completed
              </span>
            </div>

            <h1 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
              Your interview results
            </h1>

            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Review your performance, understand where you performed well, and
              identify the areas that need more practice.
            </p>
          </div>

          <div className="text-left sm:text-right">
            <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {interview.title}
            </p>

            <p className="mt-1 text-sm font-medium">{interview.jobTitle}</p>
          </div>
        </div>
      </div>

      {/* SCORE HERO */}
      <div className="grid gap-4 lg:grid-cols-[280px_1fr]">
        <Card className="overflow-hidden">
          <CardContent className="flex h-full flex-col items-center justify-center p-7 text-center">
            <div className="mb-4 flex size-12 items-center justify-center rounded-full border bg-muted/40">
              <Target className="size-5 text-muted-foreground" />
            </div>

            <p className="text-sm font-medium text-muted-foreground">
              Overall score
            </p>

            <div className="mt-2 flex items-baseline">
              <span className="text-6xl font-bold tracking-tight">
                {interview.score ?? averageScore}
              </span>

              <span className="ml-1 text-base text-muted-foreground">/100</span>
            </div>

            <div className="mt-5 w-full">
              <Progress
                value={interview.score ?? averageScore}
                className="h-2"
              />
            </div>

            <p className="mt-4 text-xs text-muted-foreground">
              Based on {answeredQuestions.length} evaluated{" "}
              {answeredQuestions.length === 1 ? "answer" : "answers"}
            </p>
          </CardContent>
        </Card>

        {/* PERFORMANCE OVERVIEW */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Performance overview</CardTitle>
          </CardHeader>

          <CardContent>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Average answer
                  </p>

                  <TrendingUp className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {averageScore}
                  <span className="text-sm font-normal text-muted-foreground">
                    /100
                  </span>
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Strong answers
                  </p>

                  <CheckCircle2 className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-3 text-2xl font-semibold">{strongAnswers}</p>

                <p className="mt-1 text-xs text-muted-foreground">Score ≥ 80</p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Needs improvement
                  </p>

                  <TriangleAlert className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {needsImprovement}
                </p>

                <p className="mt-1 text-xs text-muted-foreground">
                  Score &lt; 70
                </p>
              </div>

              <div className="rounded-xl border bg-muted/20 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-muted-foreground">
                    Questions
                  </p>

                  <MessageSquareText className="size-4 text-muted-foreground" />
                </div>

                <p className="mt-3 text-2xl font-semibold">
                  {answeredQuestions.length}
                  <span className="text-sm font-normal text-muted-foreground">
                    /{interview.questions.length}
                  </span>
                </p>

                <p className="mt-1 text-xs text-muted-foreground">Evaluated</p>
              </div>
            </div>

            {/* SCORE DISTRIBUTION */}
            <div className="mt-7">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-sm font-medium">Score distribution</p>

                <p className="text-xs text-muted-foreground">
                  {excellentAnswers} excellent · {goodAnswers} good ·{" "}
                  {needsImprovement} needs work
                </p>
              </div>

              <div className="flex h-2 overflow-hidden rounded-full bg-muted">
                {scores.length > 0 && (
                  <>
                    <div
                      className="bg-foreground"
                      style={{
                        width: `${(excellentAnswers / scores.length) * 100}%`,
                      }}
                    />

                    <div
                      className="bg-foreground/50"
                      style={{
                        width: `${(goodAnswers / scores.length) * 100}%`,
                      }}
                    />

                    <div
                      className="bg-muted-foreground/30"
                      style={{
                        width: `${(needsImprovement / scores.length) * 100}%`,
                      }}
                    />
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* STRENGTHS / IMPROVEMENTS */}
      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <CheckCircle2 className="size-4" />
              </div>

              <div>
                <CardTitle className="text-base">Your strengths</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Patterns identified across your answers
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {allStrengths.length > 0 ? (
              <div className="space-y-3">
                {allStrengths.map((strength, index) => (
                  <div
                    key={`${strength}-${index}`}
                    className="flex gap-3 rounded-lg border bg-muted/20 p-3"
                  >
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <p className="text-sm leading-5">{strength}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No specific strengths were recorded for this interview.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="flex size-8 items-center justify-center rounded-lg bg-muted">
                <TriangleAlert className="size-4" />
              </div>

              <div>
                <CardTitle className="text-base">Areas to improve</CardTitle>

                <p className="mt-1 text-xs text-muted-foreground">
                  Focus areas based on your evaluated answers
                </p>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {allImprovements.length > 0 ? (
              <div className="space-y-3">
                {allImprovements.map((improvement, index) => (
                  <div
                    key={`${improvement}-${index}`}
                    className="flex gap-3 rounded-lg border bg-muted/20 p-3"
                  >
                    <TriangleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                    <p className="text-sm leading-5">{improvement}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                No improvement areas were recorded for this interview.
              </p>
            )}
          </CardContent>
        </Card>
      </div>

      {/* QUESTION RESULTS */}
      <Card className="mt-4 overflow-hidden">
        <CardHeader>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <CardTitle className="text-base">
                Question-by-question analysis
              </CardTitle>

              <p className="mt-1 text-sm text-muted-foreground">
                Review your score and feedback for every question.
              </p>
            </div>

            <span className="text-xs font-medium text-muted-foreground">
              {answeredQuestions.length} of {interview.questions.length}{" "}
              evaluated
            </span>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          <div className="divide-y">
            {interview.questions.map((question) => {
              const score = question.answer?.score;

              const scoreLabel =
                score == null
                  ? "Not evaluated"
                  : score >= 90
                    ? "Excellent"
                    : score >= 80
                      ? "Strong"
                      : score >= 70
                        ? "Good"
                        : "Needs work";

              return (
                <details key={question.id} className="group">
                  <summary className="flex cursor-pointer list-none items-center gap-4 px-6 py-5 transition-colors hover:bg-muted/30 [&::-webkit-details-marker]:hidden">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-semibold">
                      {question.order}
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium">
                          {question.question}
                        </p>

                        {question.category && (
                          <span className="rounded-full border px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                            {question.category}
                          </span>
                        )}
                      </div>

                      <p className="mt-1 text-xs text-muted-foreground">
                        {score == null
                          ? "Not evaluated"
                          : `Feedback available · ${scoreLabel}`}
                      </p>
                    </div>

                    <div className="flex shrink-0 items-center gap-4">
                      {score != null && (
                        <div className="text-right">
                          <p className="text-sm font-semibold">
                            {score}
                            <span className="font-normal text-muted-foreground">
                              /100
                            </span>
                          </p>

                          <p className="text-[10px] text-muted-foreground">
                            {scoreLabel}
                          </p>
                        </div>
                      )}

                      <ChevronDown className="size-4 text-muted-foreground transition-transform group-open:rotate-180" />
                    </div>
                  </summary>

                  <div className="border-t bg-muted/10 px-6 py-6">
                    <div className="grid gap-6 lg:grid-cols-2">
                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Your answer
                        </p>

                        <div className="rounded-xl border bg-background p-4">
                          <p className="whitespace-pre-wrap text-sm leading-6">
                            {question.answer?.transcript ||
                              "No answer transcript available."}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          AI feedback
                        </p>

                        <div className="rounded-xl border bg-background p-4">
                          <p className="text-sm leading-6">
                            {question.answer?.feedback ||
                              "No feedback available."}
                          </p>
                        </div>
                      </div>
                    </div>

                    {question.answer?.strengths?.length ? (
                      <div className="mt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          What went well
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {question.answer.strengths.map((strength, index) => (
                            <div
                              key={`${question.id}-strength-${index}`}
                              className="flex gap-2 rounded-lg border bg-background p-3"
                            >
                              <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                              <span className="text-sm leading-5">
                                {strength}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}

                    {question.answer?.improvements?.length ? (
                      <div className="mt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          How to improve
                        </p>

                        <div className="grid gap-2 sm:grid-cols-2">
                          {question.answer.improvements.map(
                            (improvement, index) => (
                              <div
                                key={`${question.id}-improvement-${index}`}
                                className="flex gap-2 rounded-lg border bg-background p-3"
                              >
                                <TriangleAlert className="mt-0.5 size-4 shrink-0 text-muted-foreground" />

                                <span className="text-sm leading-5">
                                  {improvement}
                                </span>
                              </div>
                            ),
                          )}
                        </div>
                      </div>
                    ) : null}

                    {question.expectedAnswer ? (
                      <div className="mt-6">
                        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                          Expected direction
                        </p>

                        <div className="rounded-xl border bg-background p-4">
                          <p className="text-sm leading-6 text-muted-foreground">
                            {question.expectedAnswer}
                          </p>
                        </div>
                      </div>
                    ) : null}
                  </div>
                </details>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* FOOTER ACTIONS */}
      <div className="mt-8 flex flex-col gap-3 border-t pt-8 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium">Ready for another round?</p>

          <p className="mt-1 text-xs text-muted-foreground">
            Use this feedback to focus your next practice session.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => router.push("/practice")}
            className="rounded-full border bg-background px-5 py-2.5 text-sm font-medium transition hover:bg-muted"
          >
            Back to practice
          </button>

          <button
            onClick={() => router.push("/practice")}
            className="rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm transition hover:opacity-90"
          >
            Practice again
          </button>
        </div>
      </div>
    </div>
  );
}
