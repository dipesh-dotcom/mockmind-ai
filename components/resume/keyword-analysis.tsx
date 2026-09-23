"use client";

import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

export function KeywordAnalysis({
  matchedKeywords,
  missingKeywords,
}: {
  matchedKeywords: string[];
  missingKeywords: string[];
}) {
  const total = matchedKeywords.length + missingKeywords.length;
  const matchPct =
    total > 0 ? Math.round((matchedKeywords.length / total) * 100) : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword match</CardTitle>
        <CardDescription>
          How well your resume aligns with the target job description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Match rate</span>
            <span className="font-medium">{matchPct}%</span>
          </div>
          <Progress value={matchPct} />
        </div>

        {matchedKeywords.length > 0 && (
          <div>
            <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium">
              <CheckCircle2 className="size-4 text-success" /> Matched keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {matchedKeywords.map((k) => (
                <Badge key={k} variant="success">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {missingKeywords.length > 0 && (
          <div>
            <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium">
              <AlertTriangle className="size-4 text-warning" /> Missing keywords
            </p>
            <div className="flex flex-wrap gap-2">
              {missingKeywords.map((k) => (
                <Badge key={k} variant="warning">
                  {k}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

const IMPORTANCE_LABEL: Record<string, string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export function MissingSkills({
  skillGaps,
}: {
  skillGaps: { skill: string; importance: string; note?: string | null }[];
}) {
  if (skillGaps.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill gaps to address</CardTitle>
        <CardDescription>
          Skills that could strengthen your candidacy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {skillGaps.map((item) => (
          <div
            key={item.skill}
            className="flex items-start gap-3 rounded-xl border border-border p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{item.skill}</p>
                <Badge
                  variant={
                    item.importance === "HIGH" ? "destructive" : "warning"
                  }
                  className="text-xs"
                >
                  {IMPORTANCE_LABEL[item.importance] ?? item.importance}{" "}
                  priority
                </Badge>
              </div>
              {item.note && (
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.note}
                </p>
              )}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
