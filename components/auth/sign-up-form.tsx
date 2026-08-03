"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

import { ArrowRight, Check, Eye, EyeOff, Lock, Mail, User } from "lucide-react";

import { toast } from "sonner";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { registerSchema, type RegisterInput } from "@/schemas/register.schema";

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

export function SignUpForm() {
  const router = useRouter();

  const [loading, setLoading] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors },
  } = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const password = watch("password");

  const strength = getStrength(password);

  async function onSubmit(values: RegisterInput) {
    if (loading) return;

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.field === "email") {
          setError("email", {
            type: "server",
            message: data.error,
          });

          return;
        }

        toast.error(data.error ?? "Registration failed.");

        return;
      }

      toast.success("Account created successfully!");

      router.replace("/sign-in");
    } catch {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Full Name */}

        <div className="space-y-2">
          <Label htmlFor="name">Full name</Label>

          <div className="relative">
            <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="name"
              autoComplete="name"
              placeholder="Jordan Lee"
              disabled={loading}
              className={cn(
                "h-12 rounded-xl pl-10",
                errors.name &&
                  "border-destructive focus-visible:ring-destructive/20",
              )}
              {...register("name")}
            />
          </div>

          {errors.name && (
            <p className="text-sm text-destructive">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              disabled={loading}
              className={cn(
                "h-12 rounded-xl pl-10",
                errors.email &&
                  "border-destructive focus-visible:ring-destructive/20",
              )}
              {...register("email")}
            />
          </div>

          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}
        </div>

        {/* Password */}

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="new-password"
              placeholder="Create a strong password"
              disabled={loading}
              className={cn(
                "h-12 rounded-xl pl-10 pr-10",
                errors.password &&
                  "border-destructive focus-visible:ring-destructive/20",
              )}
              {...register("password")}
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

          {errors.password ? (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          ) : (
            password.length > 0 && (
              <>
                <div className="mt-2 flex gap-1.5">
                  {Array.from({ length: 4 }).map((_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "h-1 flex-1 rounded-full bg-muted transition-colors",
                        index < strength && STRENGTH_COLORS[strength - 1],
                      )}
                    />
                  ))}
                </div>

                <p className="text-xs text-muted-foreground">
                  {strength === 0 ? "Too short" : STRENGTH_LABELS[strength - 1]}
                </p>
              </>
            )
          )}
        </div>

        {/* Submit */}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 w-full rounded-xl"
        >
          {loading ? (
            "Creating account..."
          ) : (
            <>
              Create free account
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>

      {/* Benefits */}

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
    </>
  );
}
