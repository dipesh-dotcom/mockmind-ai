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

      <form noValidate onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              autoComplete="name"
              placeholder="Jordan Lee"
              value={name}
              disabled={loading}
              onChange={(e) => setName(e.target.value)}
              className="h-12 rounded-xl pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={email}
              disabled={loading}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 rounded-xl pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              value={password}
              disabled={loading}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl pl-10 pr-10"
            />

            <button
              type="button"
              disabled={loading}
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {password.length > 0 && (
            <div className="space-y-1.5">
              <div className="flex gap-1.5">
                {Array.from({ length: 4 }).map((_, i) => (
                  <span
                    key={i}
                    className={cn(
                      "h-1 flex-1 rounded-full bg-muted transition-colors",
                      i < strength && STRENGTH_COLORS[strength - 1],
                    )}
                  />
                ))}
              </div>

              <p className="text-xs text-muted-foreground">
                {strength === 0 ? "Too short" : STRENGTH_LABELS[strength - 1]}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox id="terms" required disabled={loading} className="mt-0.5" />

          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-snug text-muted-foreground"
          >
            I agree to the Terms of Service and Privacy Policy.
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 w-full rounded-xl"
        >
          {loading ? "Creating account..." : "Create free account"}

          {!loading && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <ul className="mt-6 space-y-2">
        {[
          "3 free mock interviews / month",
          "AI resume analysis",
          "No credit card required",
        ].map((item) => (
          <li
            key={item}
            className="flex items-center gap-2 text-xs text-muted-foreground"
          >
            <Check className="size-3.5 text-success" />
            {item}
          </li>
        ))}
      </ul>

      <AuthFooterLink
        question="Already have an account?"
        linkLabel="Sign in"
        href="/sign-in"
      />
    </div>
  );
}
