"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, User, ArrowRight, Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SocialLoginRow } from "@/components/auth/social-login-row";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { cn } from "@/lib/utils";

function getStrength(pw: string) {
  let score = 0;
  if (pw.length >= 8) score++;
  if (/[A-Z]/.test(pw)) score++;
  if (/[0-9]/.test(pw)) score++;
  if (/[^A-Za-z0-9]/.test(pw)) score++;
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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Account created! Let's set up your profile.");
      router.push("/dashboard");
    }, 900);
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

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
              placeholder="Jordan Lee"
              required
              className="h-12 rounded-xl px-4 pl-10"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
              required
              className="h-12 rounded-xl px-4 pl-10"
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
              placeholder="Create a strong password"
              autoComplete="new-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 rounded-xl px-4 pl-10 pr-10"
            />
            <button
              type="button"
              onClick={() => setShowPassword((s) => !s)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>
          {password.length > 0 && (
            <div className="space-y-1.5 pt-1">
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
                {strength > 0 ? STRENGTH_LABELS[strength - 1] : "Too short"}
              </p>
            </div>
          )}
        </div>

        <div className="flex items-start gap-2.5 pt-1">
          <Checkbox id="terms" required className="mt-0.5" />
          <Label
            htmlFor="terms"
            className="text-sm font-normal leading-snug text-muted-foreground"
          >
            I agree to the Terms of Service and Privacy Policy
          </Label>
        </div>

        <Button
          type="submit"
          size="lg"
          className="h-12 rounded-xl px-4 w-full"
          disabled={loading}
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
            <Check className="size-3.5 text-success" /> {item}
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
