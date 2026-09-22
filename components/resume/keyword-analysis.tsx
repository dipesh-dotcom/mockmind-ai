import { AlertTriangle, CheckCircle2 } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const MATCHED_KEYWORDS = [
  "React",
  "TypeScript",
  "REST APIs",
  "Agile",
  "Git",
  "CI/CD",
];
const MISSING_KEYWORDS = [
  "GraphQL",
  "Kubernetes",
  "System Design",
  "Testing (Jest)",
];

export function KeywordAnalysis() {
  const total = MATCHED_KEYWORDS.length + MISSING_KEYWORDS.length;
  const matchPct = Math.round((MATCHED_KEYWORDS.length / total) * 100);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Keyword match</CardTitle>
        <CardDescription>
          How well your resume aligns with the target job description
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div>
          <div className="mb-1.5 flex justify-between text-sm">
            <span className="text-muted-foreground">Match rate</span>
            <span className="font-medium">{matchPct}%</span>
          </div>
          <Progress value={matchPct} />
        </div>

        <div>
          <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium">
            <CheckCircle2 className="size-4 text-success" /> Matched keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {MATCHED_KEYWORDS.map((k) => (
              <Badge key={k} variant="success">
                {k}
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <p className="mb-2.5 flex items-center gap-1.5 text-sm font-medium">
            <AlertTriangle className="size-4 text-warning" /> Missing keywords
          </p>
          <div className="flex flex-wrap gap-2">
            {MISSING_KEYWORDS.map((k) => (
              <Badge key={k} variant="warning">
                {k}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

const MISSING_SKILLS = [
  {
    skill: "System Design",
    importance: "High",
    note: "Appears in 4 of 5 similar job postings.",
  },
  {
    skill: "GraphQL",
    importance: "Medium",
    note: "Increasingly requested for this role level.",
  },
  {
    skill: "Kubernetes",
    importance: "Medium",
    note: "Common in infra-adjacent frontend roles.",
  },
];

export function MissingSkills() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skill gaps to address</CardTitle>
        <CardDescription>
          Skills that could strengthen your candidacy
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {MISSING_SKILLS.map((item) => (
          <div
            key={item.skill}
            className="flex items-start gap-3 rounded-xl border border-border p-3.5"
          >
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{item.skill}</p>
                <Badge
                  variant={
                    item.importance === "High" ? "destructive" : "warning"
                  }
                  className="text-[10px]"
                >
                  {item.importance} priority
                </Badge>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{item.note}</p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
