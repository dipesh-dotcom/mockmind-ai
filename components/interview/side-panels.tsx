"use client";

import { NotesPanel } from "@/components/interview/notes-panel";
import { CameraPreview, VoiceControls } from "./camera-preview";

export function SidePanels({
  type,
  recording,
  onToggleRecording,
}: {
  type: string;
  recording?: boolean;
  onToggleRecording?: () => void;
}) {
  return (
    <div className="flex h-full flex-col gap-4">
      {type === "VOICE" && (
        <>
          <CameraPreview />
          <VoiceControls
            recording={!!recording}
            onToggle={onToggleRecording ?? (() => {})}
          />
        </>
      )}
      <div className="min-h-0 flex-1">
        <NotesPanel />
      </div>
    </div>
  );
}
