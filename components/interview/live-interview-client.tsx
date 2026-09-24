"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { ChatPanel, type ChatMessage } from "@/components/interview/chat-panel";
import { SessionHeader } from "@/components/interview/session-header";
import { SidePanels } from "@/components/interview/side-panels";
import { InterviewResults } from "./interview-results";

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

  const loadInterview = React.useCallback(async () => {
    const res = await fetch(`/api/interviews/${interviewId}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to load interview");
    }
    const data = (await res.json()) as {
      interview: InterviewDetail;
    };
    const loadedInterview = data.interview;
    setInterview(loadedInterview);
    const firstUnanswered = loadedInterview.questions.findIndex(
      (question) => !question.answer,
    );
    const startIndex =
      firstUnanswered === -1
        ? loadedInterview.questions.length
        : firstUnanswered;
    setCurrentIndex(startIndex);
    const allAnswered =
      loadedInterview.questions.length > 0 &&
      loadedInterview.questions.every((question) => question.answer != null);
    setFinished(allAnswered);

    if (loadedInterview.type !== "CODING") {
      const seededMessages: ChatMessage[] = [];
      const upperBound = Math.min(
        startIndex,
        loadedInterview.questions.length - 1,
      );

      for (let i = 0; i <= upperBound; i++) {
        const question = loadedInterview.questions[i];
        seededMessages.push({
          id: `q-${question.id}`,
          role: "ai",
          content: question.question,
        });
        if (question.answer?.transcript) {
          seededMessages.push({
            id: `a-${question.id}`,
            role: "user",
            content: question.answer.transcript,
          });
          if (question.answer.feedback) {
            seededMessages.push({
              id: `f-${question.id}`,
              role: "ai",
              content: `Score: ${
                question.answer.score ?? 0
              }/100 — ${question.answer.feedback}`,
            });
          }
        }
      }
      setMessages(seededMessages);
    }
    return loadedInterview;
  }, [interviewId]);

  React.useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        if (cancelled) return;
        await loadInterview();
      } catch (error) {
        console.error("Load interview error:", error);
        if (!cancelled) {
          toast.error("Couldn't load this interview.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }
    load();
    return () => {
      cancelled = true;
    };
  }, [loadInterview]);

  React.useEffect(() => {
    if (interview?.type !== "VOICE") {
      return;
    }
    const SpeechRecognition =
      (window as any).SpeechRecognition ||
      (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      return;
    }
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
      try {
        recognition.stop();
      } catch {
        // Recognition may already be stopped.
      }

      recognitionRef.current = null;
    };
  }, [interview?.type, currentIndex]);

  function toggleRecording() {
    if (!recognitionRef.current) {
      toast.error("Speech recognition isn't supported in this browser.");

      return;
    }
    if (recording) {
      recognitionRef.current.stop();
      setRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setRecording(true);
      } catch (error) {
        console.error("Speech recognition start error:", error);

        toast.error("Couldn't start voice recording.");
      }
    }
  }
  const currentQuestion = interview?.questions[currentIndex];
  async function submitAnswer(transcript: string) {
    if (!interview || !currentQuestion || submitting) {
      return;
    }
    const trimmedTranscript = transcript.trim();
    if (!trimmedTranscript) {
      toast.error("Please provide an answer.");

      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch(`/api/interviews/${interview.id}/answers`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          questionId: currentQuestion.id,
          transcript: trimmedTranscript,
        }),
      });
      const data = (await res.json()) as {
        answer?: {
          score: number | null;
          feedback: string | null;
        };

        completed?: boolean;

        error?: string;
      };
      if (!res.ok || !data.answer) {
        toast.error(data.error ?? "Couldn't score your answer.");

        return;
      }
      const updatedInterview = await loadInterview();
      const allAnswered =
        updatedInterview.questions.length > 0 &&
        updatedInterview.questions.every((question) => question.answer != null);

      if (allAnswered) {
        setFinished(true);
      }
    } catch (error) {
      console.error("Submit answer error:", error);

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
    return <InterviewResults interview={interview} />;
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
          <ChatPanel
            messages={messages}
            onSend={submitAnswer}
            disabled={submitting}
          />
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
