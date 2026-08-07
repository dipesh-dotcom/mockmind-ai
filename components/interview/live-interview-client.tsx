"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Code2, MessagesSquare } from "lucide-react";
import { InterviewSessionHeader } from "@/components/interview/session-header";
import { ChatPanel, type ChatMessage } from "@/components/interview/chat-panel";
import {
  CameraPreview,
  VoiceControls,
} from "@/components/interview/side-panels";
import { NotesPanel } from "@/components/interview/notes-panel";

import { CodeEditorPanel } from "@/components/interview/code-editor-panel";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

const QUESTIONS = [
  "Tell me about a time you optimized a slow-rendering React application.",
  "How would you design a rate limiter for a public API?",
  "Describe a disagreement you had with a teammate and how you resolved it.",
  "Implement a function that returns the k most frequent elements in an array.",
  "Where do you see the biggest technical risk in your current project?",
];

function formatTime(totalSeconds: number) {
  const m = Math.floor(totalSeconds / 60)
    .toString()
    .padStart(2, "0");
  const s = (totalSeconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export function LiveInterviewClient({ roleTitle }: { roleTitle: string }) {
  const router = useRouter();
  const [messages, setMessages] = React.useState<ChatMessage[]>([
    { id: "q0", role: "ai", content: QUESTIONS[0] },
  ]);
  const [questionIndex, setQuestionIndex] = React.useState(1);
  const [seconds, setSeconds] = React.useState(0);
  const [recording, setRecording] = React.useState(false);
  const [confirmOpen, setConfirmOpen] = React.useState(false);

  React.useEffect(() => {
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  function handleSend(text: string) {
    setMessages((m) => [
      ...m,
      { id: crypto.randomUUID(), role: "user", content: text },
    ]);

    setTimeout(() => {
      if (questionIndex < QUESTIONS.length) {
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "ai",
            content: QUESTIONS[questionIndex],
          },
        ]);
        setQuestionIndex((i) => i + 1);
      } else {
        setMessages((m) => [
          ...m,
          {
            id: crypto.randomUUID(),
            role: "ai",
            content:
              "That wraps up our questions for today. Great job — I'm generating your feedback report now.",
          },
        ]);
      }
    }, 700);
  }

  function handleEnd() {
    toast.success("Interview complete! Your feedback report is ready.");
    router.push("/dashboard");
  }

  return (
    <div className="-m-4 flex h-[calc(100vh-4rem)] flex-col sm:-m-6 lg:-m-8">
      <InterviewSessionHeader
        roleTitle={roleTitle}
        elapsed={formatTime(seconds)}
        totalQuestions={QUESTIONS.length}
        currentQuestion={Math.min(questionIndex, QUESTIONS.length)}
        onEnd={() => setConfirmOpen(true)}
      />

      <div className="grid flex-1 grid-cols-1 gap-4 overflow-hidden p-4 lg:grid-cols-[1fr_340px] lg:gap-5 lg:p-5">
        <div className="min-h-0 rounded-2xl border border-border bg-card">
          <Tabs
            defaultValue="conversation"
            className="flex h-full flex-col gap-0"
          >
            <div className="border-b border-border px-4 pt-3">
              <TabsList>
                <TabsTrigger value="conversation">
                  <MessagesSquare /> Conversation
                </TabsTrigger>
                <TabsTrigger value="code">
                  <Code2 /> Code editor
                </TabsTrigger>
              </TabsList>
            </div>
            <TabsContent value="conversation" className="min-h-0 flex-1">
              <ChatPanel messages={messages} onSend={handleSend} />
            </TabsContent>
            <TabsContent value="code" className="min-h-0 flex-1 p-4">
              <CodeEditorPanel />
            </TabsContent>
          </Tabs>
        </div>

        <div className="flex min-h-0 flex-col gap-4 overflow-y-auto">
          <CameraPreview />
          <VoiceControls
            recording={recording}
            onToggle={() => setRecording((r) => !r)}
          />
          <div className="min-h-[200px] flex-1">
            <NotesPanel />
          </div>
        </div>
      </div>

      <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>End this interview?</DialogTitle>
            <DialogDescription>
              We&apos;ll generate your feedback report based on your answers so
              far. This can&apos;t be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setConfirmOpen(false)}>
              Keep going
            </Button>
            <Button variant="destructive" onClick={handleEnd}>
              End interview
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
