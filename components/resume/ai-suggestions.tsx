"use client";

import { Sparkles } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const PRIORITY_LABEL: Record<string, string> = {
  HIGH: "High",
  MEDIUM: "Medium",
  LOW: "Low",
};

export function AISuggestions({
  suggestions,
}: {
  suggestions: { title: string; detail: string; priority: string }[];
}) {
  if (suggestions.length === 0) return null;

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0">
        <div>
          <CardTitle>AI suggestions</CardTitle>
          <CardDescription>
            Actionable rewrites to strengthen your resume
          </CardDescription>
        </div>
        <Badge variant="gradient" className="gap-1">
          <Sparkles className="size-3" /> {suggestions.length} insights
        </Badge>
      </CardHeader>
      <CardContent>
        <Accordion className="w-full">
          {suggestions.map((s) => (
            <AccordionItem key={s.title} value={s.title}>
              <AccordionTrigger>
                <span className="flex items-center gap-2.5">
                  <Badge
                    variant={
                      s.priority === "HIGH"
                        ? "destructive"
                        : s.priority === "MEDIUM"
                          ? "warning"
                          : "secondary"
                    }
                    className="text-xs"
                  >
                    {PRIORITY_LABEL[s.priority] ?? s.priority}
                  </Badge>
                  {s.title}
                </span>
              </AccordionTrigger>
              <AccordionContent>{s.detail}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </CardContent>
    </Card>
  );
}
