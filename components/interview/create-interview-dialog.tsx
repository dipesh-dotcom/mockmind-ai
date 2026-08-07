"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  Briefcase,
  Check,
  FileText,
  Loader2,
  Settings2,
  Sparkles,
  Upload,
} from "lucide-react";
import { z } from "zod";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createInterviewSchema } from "@/schemas/interview.schema";

type CreateInterviewInput = z.infer<typeof createInterviewSchema>;

const STEPS = [
  { key: "job", label: "Job details", icon: Briefcase },
  { key: "settings", label: "Interview settings", icon: Settings2 },
  { key: "resume", label: "Resume", icon: FileText },
] as const;

const EXPERIENCE_LEVELS = [
  { value: "ENTRY", label: "Entry level" },
  { value: "JUNIOR", label: "Junior" },
  { value: "MID", label: "Mid-level" },
  { value: "SENIOR", label: "Senior" },
  { value: "STAFF", label: "Staff / Principal" },
] as const;

const INTERVIEW_TYPES = [
  { value: "BEHAVIORAL", label: "Behavioral" },
  { value: "TEXT", label: "Text" },
  { value: "VOICE", label: "Voice" },
  { value: "CODING", label: "Coding" },
] as const;

const FOCUS_AREA_OPTIONS = [
  "System design",
  "Data structures",
  "Leadership",
  "Communication",
  "Product sense",
  "Conflict resolution",
];

const FIELDS_BY_STEP: Record<number, (keyof CreateInterviewInput)[]> = {
  0: ["jobTitle", "jobDescription", "experienceLevel"],
  1: ["type", "durationMinutes", "focusAreas"],
  2: ["resumeText", "fileName", "fileUrl"],
};

export function CreateInterviewDialog({
  trigger,
}: {
  trigger: React.ReactElement;
}) {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [step, setStep] = React.useState(0);
  const [submitting, setSubmitting] = React.useState(false);

  const {
    register,
    handleSubmit,
    trigger: validate,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(createInterviewSchema),
    mode: "onBlur",
    defaultValues: {
      jobTitle: "",
      jobDescription: "",
      experienceLevel: "MID",
      type: "BEHAVIORAL",
      durationMinutes: 30,
      focusAreas: [],
      resumeText: "",
    },
  });

  const experienceLevel = watch("experienceLevel");
  const type = watch("type");
  const durationMinutes = watch("durationMinutes");
  const focusAreas = watch("focusAreas") ?? [];
  const fileName = watch("fileName");

  function toggleFocusArea(area: string) {
    const next = focusAreas.includes(area)
      ? focusAreas.filter((a) => a !== area)
      : focusAreas.length >= 6
        ? focusAreas
        : [...focusAreas, area];
    setValue("focusAreas", next, { shouldValidate: true });
  }

  async function handleNext() {
    const fields = FIELDS_BY_STEP[step];
    const valid = await validate(fields);
    if (!valid) return;
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
  }

  function handleBack() {
    setStep((s) => Math.max(s - 1, 0));
  }

  const onSubmit: SubmitHandler<CreateInterviewInput> = async (values) => {
    if (submitting) return;
    setSubmitting(true);

    try {
      const response = await fetch("/api/interviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = (await response.json()) as { id?: string; error?: string };

      if (!response.ok || !data.id) {
        toast.error(data.error ?? "Couldn't generate your interview.");
        return;
      }

      toast.success("Interview generated!");
      setOpen(false);
      reset();
      setStep(0);
      router.push(`/practice/${data.id}`);
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue("fileName", file.name, { shouldValidate: true });

    if (file.type === "text/plain") {
      file.text().then((text) => {
        setValue("resumeText", text.slice(0, 20000), { shouldValidate: true });
      });
    } else {
      toast.info(
        "We'll attach this file to your profile — for the best questions, paste your resume text below too.",
      );
    }
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        setOpen(next);
        if (!next) setStep(0);
      }}
    >
      <DialogTrigger render={trigger} />

      <DialogContent className="max-w-xl">
        <DialogHeader>
          <DialogTitle>Create a mock interview</DialogTitle>
          <DialogDescription>
            Tell us about the role and we&apos;ll generate a tailored interview
            with questions, hints, and follow-ups.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center gap-2">
          {STEPS.map((s, index) => (
            <React.Fragment key={s.key}>
              <div
                className={cn(
                  "flex items-center gap-2 text-xs font-medium",
                  index === step
                    ? "text-primary"
                    : index < step
                      ? "text-foreground"
                      : "text-muted-foreground",
                )}
              >
                <span
                  className={cn(
                    "flex size-6 items-center justify-center rounded-full border text-[11px]",
                    index === step
                      ? "border-primary bg-primary/10 text-primary"
                      : index < step
                        ? "border-success bg-success/10 text-success"
                        : "border-border",
                  )}
                >
                  {index < step ? <Check className="size-3.5" /> : index + 1}
                </span>
                <span className="hidden sm:inline">{s.label}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className="h-px flex-1 bg-border" />
              )}
            </React.Fragment>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {step === 0 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Job title</Label>
                <Input
                  id="jobTitle"
                  placeholder="Senior Frontend Engineer"
                  {...register("jobTitle")}
                />
                {errors.jobTitle && (
                  <p className="text-sm text-destructive">
                    {errors.jobTitle.message}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="jobDescription">
                  Job description (optional)
                </Label>
                <Textarea
                  id="jobDescription"
                  placeholder="Paste the job description for a more tailored interview..."
                  className="min-h-28"
                  {...register("jobDescription")}
                />
              </div>

              <div className="space-y-2">
                <Label>Experience level</Label>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map((lvl) => (
                    <button
                      key={lvl.value}
                      type="button"
                      onClick={() =>
                        setValue("experienceLevel", lvl.value, {
                          shouldValidate: true,
                        })
                      }
                      className={cn(
                        "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors",
                        experienceLevel === lvl.value
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      {lvl.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Interview type</Label>
                <div className="grid grid-cols-2 gap-2">
                  {INTERVIEW_TYPES.map((t) => (
                    <button
                      key={t.value}
                      type="button"
                      onClick={() =>
                        setValue("type", t.value, { shouldValidate: true })
                      }
                      className={cn(
                        "rounded-xl border px-3.5 py-2.5 text-left text-sm font-medium transition-colors",
                        type === t.value
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-border text-muted-foreground hover:border-primary/30 hover:text-foreground",
                      )}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="durationMinutes">Duration (minutes)</Label>
                <Input
                  id="durationMinutes"
                  type="number"
                  min={10}
                  max={90}
                  step={5}
                  value={durationMinutes}
                  onChange={(e) =>
                    setValue("durationMinutes", Number(e.target.value), {
                      shouldValidate: true,
                    })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label>Focus areas (optional, up to 6)</Label>
                <div className="flex flex-wrap gap-2">
                  {FOCUS_AREA_OPTIONS.map((area) => (
                    <button
                      key={area}
                      type="button"
                      onClick={() => toggleFocusArea(area)}
                      className={cn(
                        "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
                        focusAreas.includes(area)
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
                      )}
                    >
                      {area}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="resumeFile">Upload resume (optional)</Label>
                <label
                  htmlFor="resumeFile"
                  className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-border bg-muted/40 px-4 py-6 text-center transition-colors hover:border-primary/40"
                >
                  <Upload className="size-5 text-muted-foreground" />
                  <p className="text-sm font-medium">
                    {fileName ?? "Click to upload a file"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    .txt works best — for PDFs, paste the text below
                  </p>
                  <input
                    id="resumeFile"
                    type="file"
                    accept=".txt,.pdf,.doc,.docx"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                </label>
              </div>

              <div className="space-y-2">
                <Label htmlFor="resumeText">Resume text (recommended)</Label>
                <Textarea
                  id="resumeText"
                  placeholder="Paste your resume text so the AI can tailor questions to your background..."
                  className="min-h-32"
                  {...register("resumeText")}
                />
              </div>

              <div className="flex items-start gap-2 rounded-xl border border-border bg-muted/40 p-3.5 text-xs text-muted-foreground">
                <Sparkles className="mt-0.5 size-3.5 shrink-0 text-primary" />
                Your resume text helps generate more personalized questions.
                It&apos;s optional but recommended.
              </div>
            </div>
          )}

          <div className="flex items-center justify-between pt-2">
            <Button
              type="button"
              variant="ghost"
              onClick={handleBack}
              disabled={step === 0 || submitting}
            >
              <ArrowLeft className="size-4" />
              Back
            </Button>

            {step < STEPS.length - 1 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ArrowRight className="size-4" />
              </Button>
            ) : (
              <Button type="submit" disabled={submitting}>
                {submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="size-4" />
                    Generate interview
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
