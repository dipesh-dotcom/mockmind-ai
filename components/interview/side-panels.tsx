"use client";

import * as React from "react";
import { Camera, CameraOff, Mic, MicOff, Video } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function CameraPreview() {
  const [cameraOn, setCameraOn] = React.useState(true);

  return (
    <Card className="overflow-hidden p-0">
      <div className="relative flex aspect-video items-center justify-center bg-[#0d1117]">
        {cameraOn ? (
          <div className="flex flex-col items-center gap-2 text-zinc-500">
            <Video className="size-8" />
            <p className="text-xs">Camera preview</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2 text-zinc-600">
            <CameraOff className="size-8" />
            <p className="text-xs">Camera is off</p>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2 py-1 text-[10px] font-medium text-white">
          You
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 p-3">
        <Button
          variant={cameraOn ? "outline" : "destructive"}
          size="icon"
          onClick={() => setCameraOn((c) => !c)}
          aria-label="Toggle camera"
        >
          {cameraOn ? (
            <Camera className="size-4" />
          ) : (
            <CameraOff className="size-4" />
          )}
        </Button>
      </div>
    </Card>
  );
}

export function VoiceControls({
  recording,
  onToggle,
}: {
  recording: boolean;
  onToggle: () => void;
}) {
  return (
    <Card className="flex flex-col items-center gap-4 p-5">
      <div className="relative flex size-20 items-center justify-center">
        {recording && (
          <span className="absolute inset-0 rounded-full gradient-brand opacity-20 animate-ping" />
        )}
        <button
          onClick={onToggle}
          className={cn(
            "relative flex size-16 items-center justify-center rounded-full text-white shadow-lg transition-transform active:scale-95",
            recording
              ? "gradient-brand shadow-primary/30"
              : "bg-muted text-muted-foreground shadow-none",
          )}
          aria-label={recording ? "Mute microphone" : "Start recording"}
        >
          {recording ? (
            <Mic className="size-6" />
          ) : (
            <MicOff className="size-6" />
          )}
        </button>
      </div>
      {recording && (
        <div className="flex h-6 items-end gap-0.5">
          {[6, 14, 9, 20, 12, 18, 8, 16, 10, 6].map((h, i) => (
            <span
              key={i}
              className="w-1 rounded-full gradient-brand"
              style={{ height: h }}
            />
          ))}
        </div>
      )}
      <p className="text-xs text-muted-foreground">
        {recording ? "Listening..." : "Tap to speak"}
      </p>
    </Card>
  );
}
