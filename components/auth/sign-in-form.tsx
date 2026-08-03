"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";

import { AuthFooterLink } from "@/components/auth/auth-footer-link";
import { SocialLoginRow } from "@/components/auth/social-login-row";
import { signInSchema, type SignInSchema } from "@/schemas/login.schema";

export function SignInForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignInSchema>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    mode: "onBlur",
  });

  const rememberMe = watch("rememberMe");

  async function onSubmit(values: SignInSchema) {
    if (loading) return;

    setLoading(true);

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (!result) {
        toast.error("Unable to sign in.");
        return;
      }

      if (result.error) {
        toast.error("Invalid email or password.");
        return;
      }

      toast.success("Welcome back!");

      router.replace("/dashboard");
      router.refresh();
    } catch (error) {
      console.error(error);

      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      {/* Header */}

      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>

        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue your interview preparation.
        </p>
      </div>

      <SocialLoginRow />

      <div className="my-6 flex items-center gap-3">
        <Separator className="flex-1" />

        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Or continue with email
        </span>

        <Separator className="flex-1" />
      </div>

      <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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
                  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
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
          <div className="flex items-center justify-between">
            <Label htmlFor="password">Password</Label>

            <Link
              href="/forgot-password"
              className="text-xs font-medium text-primary hover:underline"
            >
              Forgot password?
            </Link>
          </div>

          <div className="relative">
            <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="••••••••"
              disabled={loading}
              className={cn(
                "h-12 rounded-xl pl-10 pr-10",
                errors.password &&
                  "border-destructive focus-visible:border-destructive focus-visible:ring-destructive/20",
              )}
              {...register("password")}
            />

            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              disabled={loading}
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:opacity-50"
            >
              {showPassword ? (
                <EyeOff className="size-4" />
              ) : (
                <Eye className="size-4" />
              )}
            </button>
          </div>

          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Remember Me */}

        <div className="flex items-start gap-3">
          <Checkbox
            id="rememberMe"
            checked={rememberMe}
            disabled={loading}
            onCheckedChange={(checked) =>
              setValue("rememberMe", checked === true, {
                shouldValidate: true,
              })
            }
          />

          <Label
            htmlFor="rememberMe"
            className="cursor-pointer text-sm font-normal text-muted-foreground"
          >
            Remember me for 30 days
          </Label>
        </div>

        {/* Submit */}

        <Button
          type="submit"
          size="lg"
          disabled={loading}
          className="h-12 w-full rounded-xl"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Signing in...
            </>
          ) : (
            <>
              Sign in
              <ArrowRight className="ml-2 size-4" />
            </>
          )}
        </Button>
      </form>
      <AuthFooterLink
        question="Don't have an account?"
        linkLabel="Create an account"
        href="/sign-up"
      />
    </div>
  );
}
