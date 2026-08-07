"use client";

import * as React from "react";
import { Play, Terminal } from "lucide-react";
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

const DEFAULT_CODE = `function topKFrequent(nums, k) {
  const freq = new Map();
  for (const n of nums) {
    freq.set(n, (freq.get(n) ?? 0) + 1);
  }

  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([num]) => num);
}`;

export function CodeEditorPanel() {
  const [code, setCode] = React.useState(DEFAULT_CODE);
  const [language, setLanguage] = React.useState("javascript");

  return (
    <Card className="flex h-full flex-col overflow-hidden p-0">
      <div className="flex items-center justify-between border-b border-border bg-muted/40 px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-destructive/60" />
          <span className="size-2.5 rounded-full bg-warning/60" />
          <span className="size-2.5 rounded-full bg-success/60" />
        </div>
        <Select
          value={language}
          onValueChange={(value) => {
            if (value) {
              setLanguage(value);
            }
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
          <Terminal className="size-3" /> Runtime ready
        </Badge>
        <Button size="sm">
          <Play className="size-3.5" /> Run tests
        </Button>
      </div>
    </Card>
  );
}
