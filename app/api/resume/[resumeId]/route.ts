import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function DELETE(
  _req: NextRequest,
  { params }: { params: Promise<{ resumeId: string }> },
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { resumeId } = await params;

  const { count } = await prisma.resume.updateMany({
    where: { id: resumeId, userId: session.user.id },
    data: { isActive: false },
  });

  if (count === 0) {
    return NextResponse.json({ error: "Resume not found." }, { status: 404 });
  }

  return NextResponse.json({ cleared: true });
}
