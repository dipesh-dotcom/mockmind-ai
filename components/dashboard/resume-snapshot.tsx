"use client";

import Link from "next/link";
import { FileText, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

type LatestResume = {
  fileName: string;
  atsScore: number | null;
  resumeScore: number | null;
  uploadedAt: string;
} | null;

export function ResumeSnapshot({ resume }: { resume: LatestResume }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Resume</CardTitle>
      </CardHeader>
      <CardContent>
        {!resume ? (
          <div className="flex flex-col items-center gap-3 py-6 text-center">
            <FileText className="size-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              You haven't analyzed a resume yet.
            </p>
            <Button size="sm">
              <Link href="/resume-analyzer">
                Analyze resume <ArrowRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <p className="truncate text-sm font-medium">{resume.fileName}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">ATS score</p>
                <p className="mt-1 text-xl font-semibold">
                  {resume.atsScore ?? "—"}
                </p>
              </div>
              <div className="rounded-xl border border-border p-3 text-center">
                <p className="text-xs text-muted-foreground">Resume score</p>
                <p className="mt-1 text-xl font-semibold">
                  {resume.resumeScore ?? "—"}
                </p>
              </div>
            </div>
            <Button size="sm" variant="outline" className="w-full">
              <Link href="/resume-analyzer">Re-analyze</Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
