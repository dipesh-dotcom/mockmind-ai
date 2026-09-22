"use client";

import * as React from "react";
import { ChevronDown, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import { NotesPanel } from "@/components/interview/notes-panel";
import { VoiceControls } from "./camera-preview";
import { cn } from "@/lib/utils";

export function SidePanels({
  type,
  recording,
  onToggleRecording,
  expectedAnswer,
  hints,
}: {
  type: string;
  recording?: boolean;
  onToggleRecording?: () => void;
  expectedAnswer?: string | null;
  hints?: string[];
}) {
  const [showAnswer, setShowAnswer] = React.useState(false);

  return (
    <div className="flex h-full flex-col gap-4">
      {type === "VOICE" && (
        <>
          <VoiceControls
            recording={!!recording}
            onToggle={onToggleRecording ?? (() => {})}
          />
        </>
      )}

      {expectedAnswer && (
        <Card className="shrink-0 overflow-hidden p-0">
          <button
            type="button"
            onClick={() => setShowAnswer((s) => !s)}
            className="flex w-full items-center justify-between gap-2 px-4 py-3 text-left transition-colors hover:bg-muted/40"
          >
            <span className="flex items-center gap-2 text-sm font-medium">
              <Lightbulb className="size-4 text-primary" />
              Recommended answer
            </span>
            <ChevronDown
              className={cn(
                "size-4 shrink-0 text-muted-foreground transition-transform",
                showAnswer && "rotate-180",
              )}
            />
          </button>

          {showAnswer && (
            <div className="space-y-3 border-t border-border px-4 py-3.5">
              <p className="text-sm leading-relaxed text-muted-foreground">
                {expectedAnswer}
              </p>

              {hints && hints.length > 0 && (
                <div className="space-y-1.5 border-t border-border pt-3">
                  <p className="text-xs font-medium text-foreground">Hints</p>
                  <ul className="space-y-1.5">
                    {hints.map((hint, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-1.5 text-xs text-muted-foreground"
                      >
                        <span className="mt-1.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                        {hint}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </Card>
      )}

      <div className="min-h-0 flex-1">
        <NotesPanel />
      </div>
    </div>
  );
}
