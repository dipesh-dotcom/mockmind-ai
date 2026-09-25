import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

function dayKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

// Streak = consecutive calendar days with at least one completed interview.
// "Current" stays alive if the most recent completion was today or yesterday
// (a one-day grace period), same convention apps like Duolingo use.
function computeStreaks(dates: Date[]): { current: number; best: number } {
  if (dates.length === 0) return { current: 0, best: 0 };

  const days = Array.from(new Set(dates.map(dayKey))).sort();

  let best = 1;
  let run = 1;
  for (let i = 1; i < days.length; i++) {
    const diff = Math.round(
      (new Date(days[i]).getTime() - new Date(days[i - 1]).getTime()) /
        86400000,
    );
    if (diff === 1) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }

  const todayStr = dayKey(new Date());
  const mostRecent = days[days.length - 1];
  const gap = Math.round(
    (new Date(todayStr).getTime() - new Date(mostRecent).getTime()) / 86400000,
  );

  let current = 0;
  if (gap <= 1) {
    let expected = new Date(mostRecent).getTime();
    for (let i = days.length - 1; i >= 0; i--) {
      if (new Date(days[i]).getTime() === expected) {
        current += 1;
        expected -= 86400000;
      } else {
        break;
      }
    }
  }

  return { current, best };
}

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const userId = session.user.id;

  const now = new Date();
  const weekAgo = new Date(now.getTime() - 7 * 86400000);
  const day30Ago = new Date(now.getTime() - 30 * 86400000);
  const day60Ago = new Date(now.getTime() - 60 * 86400000);
  const todayStart = new Date(now);
  todayStart.setHours(0, 0, 0, 0);

  const [
    completedInterviews,
    completedThisWeek,
    avgAgg,
    recentPeriodAgg,
    priorPeriodAgg,
    latestResume,
    completedDatesRaw,
    todayInterviews,
    recentInterviewsRaw,
    upcomingInterviewsRaw,
    upcomingCount,
  ] = await Promise.all([
    prisma.interview.count({ where: { userId, completedAt: { not: null } } }),
    prisma.interview.count({
      where: { userId, completedAt: { gte: weekAgo } },
    }),
    prisma.interview.aggregate({
      where: { userId, score: { not: null } },
      _avg: { score: true },
    }),
    prisma.interview.aggregate({
      where: { userId, score: { not: null }, completedAt: { gte: day30Ago } },
      _avg: { score: true },
    }),
    prisma.interview.aggregate({
      where: {
        userId,
        score: { not: null },
        completedAt: { gte: day60Ago, lt: day30Ago },
      },
      _avg: { score: true },
    }),
    prisma.resume.findFirst({
      where: { userId, isActive: true },
      orderBy: { uploadedAt: "desc" },
      select: { resumeScore: true, atsScore: true },
    }),
    prisma.interview.findMany({
      where: { userId, completedAt: { not: null } },
      select: { completedAt: true },
    }),
    prisma.interview.findMany({
      where: { userId, completedAt: { gte: todayStart } },
      select: { durationMinutes: true },
    }),
    prisma.interview.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      take: 5,
      select: {
        id: true,
        title: true,
        jobTitle: true,
        type: true,
        status: true,
        score: true,
        completedAt: true,
        createdAt: true,
        _count: { select: { questions: true } },
      },
    }),
    prisma.interview.findMany({
      where: { userId, status: "READY", completedAt: null },
      orderBy: { createdAt: "asc" },
      take: 4,
      select: {
        id: true,
        title: true,
        jobTitle: true,
        type: true,
        _count: { select: { questions: true } },
      },
    }),
    prisma.interview.count({
      where: { userId, status: "READY", completedAt: null },
    }),
  ]);

  const { current, best } = computeStreaks(
    completedDatesRaw.map((r) => r.completedAt!).filter(Boolean),
  );

  const todayMinutes = todayInterviews.reduce(
    (sum, i) => sum + i.durationMinutes,
    0,
  );

  // Delta compares the trailing 30 days against the 30 days before that —
  // a reasonable proxy given there's no fixed benchmark to compare against.
  let scoreDeltaLabel: string | null = null;
  if (recentPeriodAgg._avg.score != null && priorPeriodAgg._avg.score != null) {
    const diff = Math.round(
      recentPeriodAgg._avg.score - priorPeriodAgg._avg.score,
    );
    scoreDeltaLabel =
      diff === 0
        ? "Flat vs prior month"
        : `${diff > 0 ? "+" : ""}${diff}% vs prior month`;
  }

  const recentInterviews = recentInterviewsRaw.map(
    ({ _count, completedAt, createdAt, ...rest }) => ({
      ...rest,
      questionCount: _count.questions,
      completedAt: completedAt ? completedAt.toISOString() : null,
      createdAt: createdAt.toISOString(),
    }),
  );

  const upcomingInterviews = upcomingInterviewsRaw.map(
    ({ _count, ...rest }) => ({
      ...rest,
      questionCount: _count.questions,
    }),
  );

  return NextResponse.json({
    stats: {
      completedInterviews,
      completedThisWeek,
      averageScore:
        avgAgg._avg.score != null ? Math.round(avgAgg._avg.score) : null,
      scoreDeltaLabel,
      latestResumeScore: latestResume?.resumeScore ?? null,
      latestAtsScore: latestResume?.atsScore ?? null,
      currentStreak: current,
      bestStreak: best,
    },
    upcomingCount,
    todayMinutes,
    recentInterviews,
    upcomingInterviews,
  });
}
