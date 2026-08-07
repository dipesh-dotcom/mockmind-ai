"use client";

import * as React from "react";
import { NotebookPen } from "lucide-react";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

export function NotesPanel() {
  const [notes, setNotes] = React.useState("");

  return (
    <Card className="flex h-full flex-col p-0">
      <CardHeader className="flex-row items-center gap-2 space-y-0 pb-3">
        <NotebookPen className="size-4 text-muted-foreground" />
        <CardTitle className="text-sm">Your notes</CardTitle>
      </CardHeader>
      <div className="flex-1 px-6 pb-6">
        <Textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Jot down key points, structure your answer, or track follow-ups..."
          className="h-full min-h-[180px] resize-none"
        />
      </div>
    </Card>
  );
}
