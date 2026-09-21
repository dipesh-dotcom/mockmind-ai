import { LiveInterviewClient } from "@/components/interview/live-interview-client";

export default async function InterviewSessionPage({
  params,
}: {
  params: Promise<{ interviewId: string }>;
}) {
  const { interviewId } = await params;
  return <LiveInterviewClient interviewId={interviewId} />;
}
