"use client";

import * as React from "react";
import { FileText, Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function ResumeDropzone({
  fileName,
  onUpload,
  onClear,
  analyzing,
  disabled,
}: {
  fileName: string | null;
  onUpload: (file: File) => void;
  onClear: () => void;
  analyzing: boolean;
  disabled?: boolean;
}) {
  const [dragging, setDragging] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    if (disabled) return;
    const file = e.dataTransfer.files?.[0];
    if (file) onUpload(file);
  }

  if (fileName) {
    return (
      <Card className="flex items-center gap-4 p-5">
        <span className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
          <FileText className="size-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">{fileName}</p>
          <p className="text-xs text-muted-foreground">
            {analyzing ? "Analyzing your resume..." : "Analysis complete"}
          </p>
        </div>
        {!analyzing && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClear}
            aria-label="Remove resume"
          >
            <X className="size-4" />
          </Button>
        )}
      </Card>
    );
  }

  return (
    <Card
      onDragOver={(e) => {
        e.preventDefault();
        if (!disabled) setDragging(true);
      }}
      onDragLeave={() => setDragging(false)}
      onDrop={handleDrop}
      onClick={() => !disabled && inputRef.current?.click()}
      className={cn(
        "flex flex-col items-center justify-center gap-3 border-2 border-dashed p-12 text-center transition-colors",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        dragging
          ? "border-primary bg-primary/5"
          : "border-border hover:border-primary/40 hover:bg-muted/40",
      )}
    >
      <span className="flex size-14 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Upload className="size-6" />
      </span>
      <div>
        <p className="font-display text-sm font-semibold">
          Drag & drop your resume, or click to browse
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {disabled
            ? "Add a target job description first"
            : "Supports PDF, DOCX, TXT — up to 10MB"}
        </p>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept=".pdf,.doc,.docx,.txt"
        className="hidden"
        disabled={disabled}
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) onUpload(file);
        }}
      />
    </Card>
  );
}
