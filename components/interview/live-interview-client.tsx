"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ChatPanel, type ChatMessage } from "@/components/interview/chat-panel";
import { CodeEditorPanel } from "@/components/interview/code-editor-panel";
import { SessionHeader } from "@/components/interview/session-header";
import { SidePanels } from "@/components/interview/side-panels";

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

export function LiveInterviewClient({ interviewId }: { interviewId: string }) {
  const router = useRouter();
  const [interview, setInterview] = React.useState<InterviewDetail | null>(
    null,
  );
  const [loading, setLoading] = React.useState(true);
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [messages, setMessages] = React.useState<ChatMessage[]>([]);
  const [submitting, setSubmitting] = React.useState(false);
  const [finished, setFinished] = React.useState(false);
  const [recording, setRecording] = React.useState(false);
  const recognitionRef = React.useRef<any>(null);

  React.useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        const res = await fetch(`/api/interviews/${interviewId}`);
        if (!res.ok) throw new Error("Failed to load interview");
        const data = (await res.json()) as { interview: InterviewDetail };
        if (cancelled) return;

        setInterview(data.interview);

        const firstUnanswered = data.interview.questions.findIndex(
          (q) => !q.answer,
        );
        const startIndex =
          firstUnanswered === -1
            ? data.interview.questions.length
            : firstUnanswered;
        setCurrentIndex(startIndex);

        if (startIndex >= data.interview.questions.length) {
          setFinished(true);
        }

        if (data.interview.type !== "CODING") {
          const seeded: ChatMessage[] = [];
          const upTo = Math.min(
            startIndex,
            data.interview.questions.length - 1,
          );
          for (let i = 0; i <= upTo; i++) {
            const q = data.interview.questions[i];
            seeded.push({ id: `q-${q.id}`, role: "ai", content: q.question });
            if (q.answer?.transcript) {
              seeded.push({
                id: `a-${q.id}`,
                role: "user",
                content: q.answer.transcript,
              });
              if (q.answer.feedback) {
                seeded.push({
                  id: `f-${q.id}`,
                  role: "ai",
                  content: `Score: ${q.answer.score}/100 — ${q.answer.feedback}`,
                });
              }
            }
          }
          setMessages(seeded);
        }
      } catch {
        if (!cancelled) toast.error("Couldn't load this interview.");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [interviewId]);

  // Speech recognition setup for VOICE interviews
  React.useEffect(() => {
    if (interview?.type !== "VOICE") return;

    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    let accumulated = "";

    recognition.onresult = (event: any) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          accumulated += event.results[i][0].transcript + " ";
        }
      }
    };

    recognition.onend = () => {
      setRecording(false);
      const finalTranscript = accumulated.trim();
      accumulated = "";
      if (finalTranscript) {
        submitAnswer(finalTranscript);
      }
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [interview?.type, currentIndex]);

  function toggleRecording() {
    if (!recognitionRef.current) {
      toast.error("Speech recognition isn't supported in this browser.");
      return;
    }
    if (recording) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
      setRecording(true);
    }
  }

  const currentQuestion = interview?.questions[currentIndex];

  async function submitAnswer(transcript: string) {
    if (!interview || !currentQuestion || submitting) return;
    setSubmitting(true);

    try {
      const res = await fetch(`/api/interviews/${interview.id}/answers`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ questionId: currentQuestion.id, transcript }),
      });

      const data = (await res.json()) as {
        answer?: { score: number | null; feedback: string | null };
        completed?: boolean;
        error?: string;
      };

      if (!res.ok || !data.answer) {
        toast.error(data.error ?? "Couldn't score your answer.");
        return;
      }

      if (interview.type !== "CODING") {
        setMessages((prev) => [
          ...prev,
          { id: `a-${currentQuestion.id}`, role: "user", content: transcript },
          {
            id: `f-${currentQuestion.id}`,
            role: "ai",
            content: `Score: ${data.answer!.score}/100 — ${data.answer!.feedback}`,
          },
        ]);
      } else {
        toast.success(`Scored ${data.answer.score}/100`);
      }

      const nextIndex = currentIndex + 1;

      if (nextIndex >= interview.questions.length) {
        setFinished(true);
      } else {
        setCurrentIndex(nextIndex);
        if (interview.type !== "CODING") {
          const nextQuestion = interview.questions[nextIndex];
          setMessages((prev) => [
            ...prev,
            {
              id: `q-${nextQuestion.id}`,
              role: "ai",
              content: nextQuestion.question,
            },
          ]);
        }
      }
    } catch {
      toast.error("Something went wrong submitting your answer.");
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="flex h-[60vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!interview) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-2 text-center">
        <p className="font-medium">Interview not found.</p>
        <button
          onClick={() => router.push("/practice")}
          className="text-sm text-primary underline"
        >
          Back to practice
        </button>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-4 py-16 text-center">
        <h1 className="font-display text-2xl font-semibold">
          Interview complete 🎉
        </h1>
        {interview.score != null && (
          <p className="text-muted-foreground">
            Your average score:{" "}
            <span className="font-semibold text-foreground">
              {interview.score}/100
            </span>
          </p>
        )}
        <button
          onClick={() => router.push("/practice")}
          className="mt-2 rounded-full bg-primary px-5 py-2 text-sm font-medium text-primary-foreground"
        >
          Back to practice
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-[calc(100vh-6rem)] max-w-7xl flex-col gap-4">
      <SessionHeader
        title={interview.title}
        currentIndex={currentIndex}
        totalQuestions={interview.questions.length}
        type={interview.type}
      />

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 lg:grid-cols-[1fr_320px]">
        <div className="min-h-0 overflow-hidden rounded-2xl border border-border">
          {interview.type === "CODING" && currentQuestion ? (
            <CodeEditorPanel
              question={currentQuestion.question}
              submitting={submitting}
              onSubmit={(code) => submitAnswer(code)}
            />
          ) : (
            <ChatPanel
              messages={messages}
              onSend={submitAnswer}
              disabled={submitting}
            />
          )}
        </div>

        <div className="hidden lg:block">
          <SidePanels
            type={interview.type}
            recording={recording}
            onToggleRecording={toggleRecording}
            expectedAnswer={currentQuestion?.expectedAnswer}
            hints={currentQuestion?.hints}
          />
        </div>
      </div>
    </div>
  );
}
