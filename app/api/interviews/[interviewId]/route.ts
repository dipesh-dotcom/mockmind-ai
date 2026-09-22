import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interviewId } = await params;

  const interview = await prisma.interview.findFirst({
    where: { id: interviewId, userId: session.user.id },
    include: {
      questions: {
        orderBy: { order: "asc" },
        include: { answer: true },
      },
    },
  });

  if (!interview) {
    return NextResponse.json(
      { error: "Interview not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ interview });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interviewId } = await params;

  const { count } = await prisma.interview.deleteMany({
    where: { id: interviewId, userId: session.user.id },
  });

  if (count === 0) {
    return NextResponse.json(
      { error: "Interview not found." },
      { status: 404 },
    );
  }

  return NextResponse.json({ deleted: true });
}
