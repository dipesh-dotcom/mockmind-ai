"use client";

import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

function CircularGauge({
  value,
  label,
  id,
}: {
  value: number;
  label: string;
  id: string;
}) {
  const radius = 42;
  const circumference = 2 * Math.PI * radius;
  const color = value >= 80 ? "#10B981" : value >= 60 ? "#F59E0B" : "#EF4444";

  return (
    <Card className="flex flex-col items-center gap-3 p-6">
      <div className="relative flex size-28 items-center justify-center">
        <svg viewBox="0 0 100 100" className="size-28 -rotate-90">
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke="var(--muted)"
            strokeWidth="9"
          />
          <circle
            cx="50"
            cy="50"
            r={radius}
            fill="none"
            stroke={`url(#${id})`}
            strokeWidth="9"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference * (1 - value / 100)}
            className="transition-all duration-1000 ease-out"
          />
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#2563EB" />
              <stop offset="100%" stopColor={color} />
            </linearGradient>
          </defs>
        </svg>
        <div className="absolute flex flex-col items-center">
          <span className="font-display text-2xl font-bold">{value}</span>
          <span className="text-[10px] text-muted-foreground">/100</span>
        </div>
      </div>
      <p className="text-sm font-medium">{label}</p>
    </Card>
  );
}

export function ScoreGauges({
  atsScore,
  resumeScore,
}: {
  atsScore: number;
  resumeScore: number;
}) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <CircularGauge
        value={atsScore}
        label="ATS Compatibility"
        id="atsGradient"
      />
      <CircularGauge
        value={resumeScore}
        label="Overall Resume Score"
        id="resumeGradient"
      />
    </div>
  );
}

export function ScorePill({ value }: { value: number }) {
  const tone =
    value >= 80
      ? "text-success bg-success/10"
      : value >= 60
        ? "text-warning bg-warning/10"
        : "text-destructive bg-destructive/10";
  return (
    <span
      className={cn("rounded-full px-2.5 py-1 text-xs font-semibold", tone)}
    >
      {value}%
    </span>
  );
}
