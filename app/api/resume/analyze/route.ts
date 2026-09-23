import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { extractResumeText } from "@/lib/resume/extract-text";
import { analyzeResume } from "@/lib/ai/analyze-resume";

export const runtime = "nodejs";

const MAX_FILE_SIZE = 10 * 1024 * 1024;
const MIN_JOB_DESCRIPTION_LENGTH = 20;

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const formData = await req.formData();
  const file = formData.get("file");
  const jobDescription = formData.get("jobDescription");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No resume file provided." },
      { status: 400 },
    );
  }
  if (
    typeof jobDescription !== "string" ||
    jobDescription.trim().length < MIN_JOB_DESCRIPTION_LENGTH
  ) {
    return NextResponse.json(
      {
        error: `Please provide a target job description (at least ${MIN_JOB_DESCRIPTION_LENGTH} characters).`,
      },
      { status: 400 },
    );
  }
  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "File is too large. Max 10MB." },
      { status: 400 },
    );
  }

  let resumeText: string;
  try {
    resumeText = await extractResumeText(file);
  } catch (err) {
    console.error("Resume text extraction failed:", err);
    return NextResponse.json(
      {
        error: err instanceof Error ? err.message : "Couldn't read this file.",
      },
      { status: 400 },
    );
  }

  if (resumeText.length < 50) {
    return NextResponse.json(
      {
        error:
          "Couldn't extract readable text from this file. Try a different format.",
      },
      { status: 400 },
    );
  }

  try {
    const analysis = await analyzeResume(resumeText, jobDescription.trim());

    const resume = await prisma.$transaction(async (tx) => {
      await tx.resume.updateMany({
        where: { userId: session.user!.id, isActive: true },
        data: { isActive: false },
      });

      return tx.resume.create({
        data: {
          userId: session.user!.id,
          fileName: file.name,
          fileUrl: "",
          rawText: resumeText,
          isActive: true,
          atsScore: analysis.atsScore,
          resumeScore: analysis.resumeScore,
          keywords: {
            createMany: {
              data: analysis.keywords.map((k) => ({
                keyword: k.keyword,
                matched: k.matched,
              })),
            },
          },
          skillGaps: {
            createMany: {
              data: analysis.skillGaps.map((s) => ({
                skill: s.skill,
                importance: s.importance,
                note: s.note ?? null,
              })),
            },
          },
          suggestions: {
            createMany: {
              data: analysis.suggestions.map((s) => ({
                title: s.title,
                detail: s.detail,
                priority: s.priority,
              })),
            },
          },
        },
        include: { keywords: true, skillGaps: true, suggestions: true },
      });
    });

    return NextResponse.json({ resume }, { status: 201 });
  } catch (err) {
    console.error("Resume analysis failed:", err);
    return NextResponse.json(
      { error: "We couldn't analyze your resume. Please try again." },
      { status: 502 },
    );
  }
}
