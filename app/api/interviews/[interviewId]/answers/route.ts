import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { submitAnswerSchema } from "@/schemas/answer.schema";
import { scoreAnswer } from "@/lib/ai/score-answer";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ interviewId: string }> },
) {
  const session = await auth();

  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { interviewId } = await params;

  const body = await req.json();
  const result = submitAnswerSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: "Invalid answer.", issues: result.error.flatten() },
      { status: 400 },
    );
  }

  const { questionId, transcript } = result.data;

  const question = await prisma.interviewQuestion.findFirst({
    where: {
      id: questionId,
      interviewId: interviewId,
      interview: { userId: session.user.id },
    },
  });

  if (!question) {
    return NextResponse.json({ error: "Question not found." }, { status: 404 });
  }

  try {
    const scored = await scoreAnswer({
      question: question.question,
      expectedAnswer:
        question.expectedAnswer ??
        "No reference answer provided; judge on general quality.",
      transcript,
    });

    const answer = await prisma.interviewAnswer.upsert({
      where: { questionId },
      create: {
        questionId,
        transcript,
        score: scored.score,
        feedback: scored.feedback,
        strengths: scored.strengths,
        improvements: scored.improvements,
      },
      update: {
        transcript,
        score: scored.score,
        feedback: scored.feedback,
        strengths: scored.strengths,
        improvements: scored.improvements,
      },
    });

    const [totalQuestions, answeredQuestions] = await Promise.all([
      prisma.interviewQuestion.count({
        where: { interviewId: interviewId },
      }),
      prisma.interviewQuestion.count({
        where: { interviewId: interviewId, answer: { isNot: null } },
      }),
    ]);

    let completed = false;

    if (totalQuestions > 0 && answeredQuestions === totalQuestions) {
      const allAnswers = await prisma.interviewAnswer.findMany({
        where: { question: { interviewId: interviewId } },
        select: { score: true },
      });

      const validScores = allAnswers
        .map((a) => a.score)
        .filter((s): s is number => typeof s === "number");

      const averageScore =
        validScores.length > 0
          ? Math.round(
              validScores.reduce((sum, s) => sum + s, 0) / validScores.length,
            )
          : null;

      await prisma.interview.update({
        where: { id: interviewId },
        data: { completedAt: new Date(), score: averageScore },
      });

      completed = true;
    }

    return NextResponse.json(
      { answer, semanticSimilarity: scored.semanticSimilarity, completed },
      { status: 200 },
    );
  } catch (error) {
    console.error("Answer scoring failed:", error);
    return NextResponse.json(
      { error: "We couldn't score your answer. Please try again." },
      { status: 502 },
    );
  }
}
