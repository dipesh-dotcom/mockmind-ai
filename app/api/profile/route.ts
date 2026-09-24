import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      avatarUrl: true,
      passwordHash: true,
      accounts: { select: { provider: true } },
      _count: { select: { interviews: true, resumes: true } },
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found." }, { status: 404 });
  }

  const [completedInterviews, scoreAgg] = await Promise.all([
    prisma.interview.count({
      where: { userId: user.id, completedAt: { not: null } },
    }),
    prisma.interview.aggregate({
      where: { userId: user.id, score: { not: null } },
      _avg: { score: true },
    }),
  ]);

  return NextResponse.json({
    profile: {
      id: user.id,
      name: user.name,
      email: user.email,
      avatarUrl: user.avatarUrl,
      hasPassword: !!user.passwordHash,
      connectedProviders: user.accounts.map((a) => a.provider),
      stats: {
        totalInterviews: user._count.interviews,
        completedInterviews,
        averageScore:
          scoreAgg._avg.score != null ? Math.round(scoreAgg._avg.score) : null,
        resumesAnalyzed: user._count.resumes,
      },
    },
  });
}

const updateProfileSchema = z.object({
  name: z.string().trim().min(1, "Name is required.").max(100),
});

export async function PATCH(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const result = updateProfileSchema.safeParse(body);
  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid name.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const user = await prisma.user.update({
    where: { id: session.user.id },
    data: { name: result.data.name },
    select: { id: true, name: true, email: true, avatarUrl: true },
  });

  return NextResponse.json({ profile: user });
}
