import type { Metadata } from "next";
import { ROLES } from "@/lib/mock-data/roles";
import { LiveInterviewClient } from "@/components/interview/live-interview-client";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const role = ROLES.find((r) => r.id === id);
  return { title: role ? `Live Interview · ${role.title}` : "Live Interview" };
}

export default async function LiveInterviewPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const role = ROLES.find((r) => r.id === id);

  return (
    <LiveInterviewClient
      roleTitle={role ? `${role.title} · ${role.company}` : "Mock Interview"}
    />
  );
}
