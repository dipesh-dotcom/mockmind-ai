"use client";

import * as React from "react";
import { Send, Terminal } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function CodeEditorPanel({
  question,
  onSubmit,
  submitting,
}: {
  question: string;
  onSubmit: (code: string, language: string) => void;
  submitting?: boolean;
}) {
  const [code, setCode] = React.useState("// Write your solution here\n");
  const [language, setLanguage] = React.useState("javascript");

  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-none border-0 p-0">
      <div className="border-b border-border bg-muted/40 px-4 py-3">
        <p className="text-sm leading-relaxed">{question}</p>
      </div>

      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
        </div>
        <Select
          value={language}
          onValueChange={(value) => {
            if (value) setLanguage(value);
          }}
        >
          <SelectTrigger className="h-8 w-36 text-xs">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="javascript">JavaScript</SelectItem>
            <SelectItem value="python">Python</SelectItem>
            <SelectItem value="typescript">TypeScript</SelectItem>
            <SelectItem value="java">Java</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <textarea
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
        className="min-h-[220px] flex-1 resize-none bg-[#0d1117] p-4 font-mono text-[13px] leading-relaxed text-zinc-200 outline-none"
      />

      <div className="flex items-center justify-between border-t border-border px-4 py-2.5">
        <Badge variant="secondary" className="gap-1.5 text-[11px]">
          <Terminal className="size-3" /> No live runtime — scored by AI review
        </Badge>
        <Button
          size="sm"
          onClick={() => onSubmit(code, language)}
          disabled={submitting || !code.trim()}
        >
          <Send className="size-3.5" />{" "}
          {submitting ? "Scoring..." : "Submit answer"}
        </Button>
      </div>
    </Card>
  );
}
