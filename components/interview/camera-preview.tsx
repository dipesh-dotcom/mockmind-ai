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
          <div className="flex flex-col items-center gap-2.5 text-zinc-500">
            <Video className="size-10" />
            <p className="text-sm">Camera preview</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2.5 text-zinc-600">
            <CameraOff className="size-10" />
            <p className="text-sm">Camera is off</p>
          </div>
        )}
        <span className="absolute left-3 top-3 rounded-md bg-black/50 px-2.5 py-1 text-xs font-medium text-white">
          You
        </span>
      </div>
      <div className="flex items-center justify-center gap-2 p-4">
        <Button
          variant={cameraOn ? "outline" : "destructive"}
          onClick={() => setCameraOn((c) => !c)}
          aria-label="Toggle camera"
          className="size-11 rounded-full p-0"
        >
          {cameraOn ? (
            <Camera className="size-5" />
          ) : (
            <CameraOff className="size-5" />
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
