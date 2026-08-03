"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { SocialLoginRow } from "@/components/auth/social-login-row";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { SignUpForm } from "@/components/auth/sign-up-form";

function getStrength(password: string) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

const STRENGTH_LABELS = ["Weak", "Fair", "Good", "Strong"];

const STRENGTH_COLORS = [
  "bg-destructive",
  "bg-warning",
  "bg-secondary",
  "bg-success",
];

export default function SignUpPage() {
  const router = useRouter();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const strength = getStrength(password);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data = (await response.json()) as {
        error?: string;
      };

      if (!response.ok) {
        toast.error(data.error ?? "Registration failed.");
        return;
      }

      toast.success("Account created successfully!");

      setName("");
      setEmail("");
      setPassword("");

      router.replace("/sign-in");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Create your account
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Start practicing for free — no credit card required.
        </p>
      </div>

      <SocialLoginRow />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs text-muted-foreground">
          OR CONTINUE WITH EMAIL
        </span>

        <Separator className="flex-1" />
      </div>

      <SignUpForm />

      <AuthFooterLink
        question="Already have an account?"
        linkLabel="Sign in"
        href="/sign-in"
      />
    </div>
  );
}
