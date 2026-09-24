import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interviewId } = await params;

  try {
    await prisma.$transaction(async (tx) => {
      const interview = await tx.interview.findFirst({
        where: { id: interviewId, userId: session.user!.id },
        select: { id: true },
      });

      if (!interview) {
        throw new Error("NOT_FOUND");
      }

      await tx.interviewAnswer.deleteMany({
        where: { question: { interviewId } },
      });

      await tx.interview.update({
        where: { id: interviewId },
        data: { completedAt: null, score: null },
      });
    });
  } catch (err) {
    if (err instanceof Error && err.message === "NOT_FOUND") {
      return NextResponse.json(
        { error: "Interview not found." },
        { status: 404 },
      );
    }
    console.error("Failed to reset interview:", err);
    return NextResponse.json(
      { error: "Couldn't reset this interview. Please try again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ reset: true });
}
