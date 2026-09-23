"use client";

import * as React from "react";
import { NotebookPen } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Textarea } from "@/components/ui/textarea";

export function NotesPanel() {
  const [notes, setNotes] = React.useState("");

  const characterCount = notes.length;

  return (
    <Card className="flex h-full min-h-[300px] flex-col overflow-hidden border-border/60 bg-background shadow-sm">
      {/* Header */}
      <CardHeader className="border-b border-border/50 px-5 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-lg border bg-muted/50">
              <NotebookPen className="size-4 text-foreground/70" />
            </div>

            <div>
              <CardTitle className="text-sm font-semibold tracking-tight">
                Your notes
              </CardTitle>

              <p className="mt-0.5 text-xs text-muted-foreground">
                Capture thoughts and key points
              </p>
            </div>
          </div>

          <span className="text-xs tabular-nums text-muted-foreground">
            {characterCount}
          </span>
        </div>
      </CardHeader>

      {/* Notes area */}
      <CardContent className="flex flex-1 flex-col p-0">
        <div className="flex flex-1 p-4">
          <Textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Write down key points, structure your answer, or track follow-ups..."
            className="min-h-[220px] flex-1 resize-none border-0 bg-transparent px-2 py-2 text-sm leading-6 shadow-none focus-visible:ring-0 focus-visible:ring-offset-0"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-border/50 px-5 py-3">
          <span className="text-[11px] text-muted-foreground">
            Your notes are saved locally
          </span>

          <span className="text-[11px] text-muted-foreground">
            {characterCount} characters
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
