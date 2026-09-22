"use client";

import * as React from "react";
import { Mic, MicOff } from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function VoiceControls({
  recording,
  onToggle,
}: {
  recording: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="flex flex-col items-center gap-5 p-6">
      <div className="relative flex size-24 items-center justify-center">
        {recording && (
          <span className="absolute inset-0 rounded-full gradient-brand opacity-20 animate-ping" />
        )}
        <button
          onClick={onToggle}
          className={cn(
            "relative flex size-20 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95",
            recording
              ? "gradient-brand shadow-primary/30"
              : "bg-muted text-muted-foreground shadow-none",
          )}
          aria-label={recording ? "Mute microphone" : "Start recording"}
        >
          {recording ? (
            <Mic className="size-7" />
          ) : (
            <MicOff className="size-7" />
          )}
        </button>
      </div>
      {recording && (
        <div className="flex h-8 items-end gap-1">
          {[8, 18, 12, 26, 16, 24, 10, 20, 14, 8].map((h, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full gradient-brand"
              style={{ height: h }}
            />
          ))}
        </div>
      )}
      <p className="text-sm text-muted-foreground">
        {recording ? "Listening..." : "Tap to speak"}
      </p>
    </Card>
  );
}
