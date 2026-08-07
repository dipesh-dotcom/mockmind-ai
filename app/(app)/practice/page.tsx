import type { Metadata } from "next";
import { PracticeClient } from "@/components/practice/practice-client";

export const metadata: Metadata = { title: "Interview Practice" };

export default function PracticePage() {
  return <PracticeClient />;
}
