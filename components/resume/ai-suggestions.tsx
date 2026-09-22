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

const SUGGESTIONS = [
  {
    title: "Quantify your impact in bullet points",
    detail:
      'Replace generic statements like "improved app performance" with measurable outcomes, e.g. "reduced initial load time by 42% by code-splitting routes." Recruiters and ATS parsers both weight quantified impact more heavily.',
    priority: "High",
  },
  {
    title: "Add a targeted skills section",
    detail:
      "Group your technical skills (languages, frameworks, tools) into a dedicated section near the top. This significantly improves ATS keyword parsing accuracy for roles like Senior Frontend Engineer.",
    priority: "High",
  },
  {
    title: "Tighten your summary to 2–3 lines",
    detail:
      "Your current summary runs long and buries the role you're targeting. Lead with your title, years of experience, and one standout achievement.",
    priority: "Medium",
  },
  {
    title: "Use consistent action verbs",
    detail:
      "Mix of past/present tense verbs across bullet points can confuse parsers. Standardize on past tense for previous roles and present tense only for your current role.",
    priority: "Low",
  },
];

export function AISuggestions() {
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
          <Sparkles className="size-3" /> 4 insights
        </Badge>
      </CardHeader>
      <CardContent>
        <Accordion className="w-full">
          {SUGGESTIONS.map((s) => (
            <AccordionItem key={s.title} value={s.title}>
              <AccordionTrigger>
                <span className="flex items-center gap-2.5">
                  <Badge
                    variant={
                      s.priority === "High"
                        ? "destructive"
                        : s.priority === "Medium"
                          ? "warning"
                          : "secondary"
                    }
                    className="text-[10px]"
                  >
                    {s.priority}
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
