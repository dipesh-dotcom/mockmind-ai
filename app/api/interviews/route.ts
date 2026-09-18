import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { createInterviewSchema } from "@/schemas/interview.schema";
import { generateInterview } from "@/lib/ai/generate-interview";

export async function POST(req: NextRequest) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const result = createInterviewSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid interview details.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const {
    jobTitle,
    jobDescription,
    experienceLevel,
    type,
    durationMinutes,
    focusAreas,
    resumeText,
    fileName,
    fileUrl,
  } = result.data;

  try {
    let resumeId: string | undefined;

    if (resumeText || fileUrl) {
      const resume = await prisma.resume.create({
        data: {
          userId: session.user.id,
          fileName: fileName ?? "resume.txt",
          fileUrl: fileUrl ?? "",
          rawText: resumeText || null,
        },
      });
      resumeId = resume.id;
    }

    const interview = await prisma.interview.create({
      data: {
        userId: session.user.id,
        title: `${jobTitle}`,
        jobTitle,
        jobDescription: jobDescription || null,
        experienceLevel,
        type,
        durationMinutes,
        focusAreas,
        status: "GENERATING",
        resumeId,
      },
    });

    try {
      const generated = await generateInterview({
        jobTitle,
        jobDescription,
        experienceLevel,
        type,
        durationMinutes,
        focusAreas,
        resumeText,
      });

      await prisma.$transaction([
        prisma.interviewQuestion.createMany({
          data: generated.questions.map((q, index) => ({
            interviewId: interview.id,
            order: index,
            category: q.category ?? null,
            question: q.question,
            expectedAnswer: q.expectedAnswer ?? null,
            hints: q.hints ?? [],
            followUps: q.followUps ?? [],
          })),
        }),
        prisma.interview.update({
          where: { id: interview.id },
          data: { title: generated.title ?? interview.title, status: "READY" },
        }),
      ]);
    } catch (genError) {
      console.error("Interview generation failed:", genError);

      await prisma.interview.update({
        where: { id: interview.id },
        data: { status: "FAILED" },
      });

      return NextResponse.json(
        { error: "We couldn't generate your interview. Please try again." },
        { status: 502 },
      );
    }

    return NextResponse.json({ id: interview.id }, { status: 201 });
  } catch (error) {
    console.error(error);
    console.log(error);
    return NextResponse.json(
      { error: `Something went wrong creating your interview: ${error}` },
      { status: 500 },
    );
  }
}
