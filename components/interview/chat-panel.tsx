"use client";

import * as React from "react";
import { Send, Sparkles } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export type ChatMessage = {
  id: string;
  role: "ai" | "user";
  content: string;
};

const MAX_TEXTAREA_HEIGHT = 160;

export function ChatPanel({
  messages,
  onSend,
  disabled,
}: {
  messages: ChatMessage[];
  onSend: (text: string) => void;
  disabled?: boolean;
}) {
  const [draft, setDraft] = React.useState("");
  const endRef = React.useRef<HTMLDivElement>(null);
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);
  const { data: session } = useSession();

  React.useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  React.useEffect(() => {
    const el = textareaRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, MAX_TEXTAREA_HEIGHT)}px`;
  }, [draft]);

  function submitDraft() {
    if (!draft.trim()) return;
    onSend(draft.trim());
    setDraft("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    submitDraft();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submitDraft();
    }
  }

  return (
    <div className="flex h-full flex-col">
      <ScrollArea className="flex-1 px-4 py-5 sm:px-6">
        <div className="flex flex-col gap-5">
          {messages.map((m) => (
            <div
              key={m.id}
              className={cn(
                "flex items-start gap-3",
                m.role === "user" && "flex-row-reverse",
              )}
            >
              <Avatar className="h-9 w-9 shrink-0">
                {m.role === "ai" ? (
                  <AvatarFallback className="gradient-brand text-white">
                    <Sparkles className="size-4.5" />
                  </AvatarFallback>
                ) : (
                  <>
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback className="bg-muted text-xs font-medium text-foreground">
                      {session?.user?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </>
                )}
              </Avatar>
              <div
                className={cn(
                  "max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.role === "ai"
                    ? "rounded-tl-sm bg-muted text-foreground"
                    : "rounded-tr-sm gradient-brand text-white",
                )}
              >
                {m.content}
              </div>
            </div>
          ))}
          <div ref={endRef} />
        </div>
      </ScrollArea>

      <form
        onSubmit={handleSubmit}
        className="flex items-end gap-2.5 border-t border-border p-4 sm:p-5"
      >
        <Textarea
          ref={textareaRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Type your response... (Shift+Enter for a new line)"
          disabled={disabled}
          rows={1}
          className="max-h-40 min-h-12 resize-none overflow-y-auto py-3 text-sm"
        />
        <Button
          type="submit"
          size="icon"
          className="h-12 w-12 shrink-0 rounded-full"
          disabled={disabled || !draft.trim()}
        >
          <Send className="size-4.5" />
        </Button>
      </form>
    </div>
  );
}
