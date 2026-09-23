import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const resume = await prisma.resume.findFirst({
    where: { userId: session.user.id, isActive: true },
    orderBy: { uploadedAt: "desc" },
    include: { keywords: true, skillGaps: true, suggestions: true },
  });

  return NextResponse.json({ resume });
}
