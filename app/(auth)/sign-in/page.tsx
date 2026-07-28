// "use client";

// import * as React from "react";
// import Link from "next/link";
// import { useRouter } from "next/navigation";
// import { ArrowRight, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
// import { toast } from "sonner";

// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { Separator } from "@/components/ui/separator";

// import { AuthFooterLink } from "@/components/auth/auth-footer-link";
// import { SocialLoginRow } from "@/components/auth/social-login-row";

// export default function SignInPage() {
//   const router = useRouter();

//   const [showPassword, setShowPassword] = React.useState(false);
//   const [loading, setLoading] = React.useState(false);

//   const [email, setEmail] = React.useState("");
//   const [password, setPassword] = React.useState("");
//   const [rememberMe, setRememberMe] = React.useState(false);

//   async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
//     e.preventDefault();

//     if (loading) return;

//     setLoading(true);

//     try {
//       // =====================================
//       // TODO:
//       // Replace with your authentication logic
//       //
//       // Example:
//       // await signIn("credentials", {
//       //   email,
//       //   password,
//       //   redirect: false,
//       // });
//       // =====================================

//       await new Promise((resolve) => setTimeout(resolve, 900));

//       toast.success("Welcome back!");

//       router.push("/dashboard");
//     } catch (error) {
//       console.error(error);

//       toast.error("Unable to sign in. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div>
//       {/* Header */}
//       <div className="mb-8">
//         <h1 className="font-display text-2xl font-semibold tracking-tight">
//           Welcome back
//         </h1>

//         <p className="mt-2 text-sm text-muted-foreground">
//           Sign in to continue your interview preparation.
//         </p>
//       </div>

//       {/* Social Login */}
//       <SocialLoginRow />

//       {/* Divider */}
//       <div className="my-6 flex items-center gap-3">
//         <Separator className="flex-1" />

//         <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
//           Or continue with email
//         </span>

//         <Separator className="flex-1" />
//       </div>

//       {/* Form */}
//       <form onSubmit={handleSubmit} className="space-y-5" noValidate>
//         {/* Email */}
//         <div className="space-y-2">
//           <Label htmlFor="email">Email</Label>

//           <div className="relative">
//             <Mail className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               id="email"
//               type="email"
//               autoComplete="email"
//               placeholder="you@example.com"
//               className="pl-10"
//               required
//               disabled={loading}
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//             />
//           </div>
//         </div>

//         {/* Password */}
//         <div className="space-y-2">
//           <div className="flex items-center justify-between">
//             <Label htmlFor="password">Password</Label>

//             <Link
//               href="/forgot-password"
//               className="text-xs font-medium text-primary hover:underline"
//             >
//               Forgot password?
//             </Link>
//           </div>

//           <div className="relative">
//             <Lock className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

//             <Input
//               id="password"
//               type={showPassword ? "text" : "password"}
//               autoComplete="current-password"
//               placeholder="••••••••"
//               className="pl-10 pr-10"
//               required
//               disabled={loading}
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <button
//               type="button"
//               onClick={() => setShowPassword((prev) => !prev)}
//               aria-label={showPassword ? "Hide password" : "Show password"}
//               className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
//             >
//               {showPassword ? (
//                 <EyeOff className="size-4" />
//               ) : (
//                 <Eye className="size-4" />
//               )}
//             </button>
//           </div>
//         </div>

//         {/* Remember Me */}
//         <div className="flex items-center gap-3">
//           <Checkbox
//             id="remember"
//             checked={rememberMe}
//             onCheckedChange={(checked) => setRememberMe(Boolean(checked))}
//           />

//           <Label
//             htmlFor="remember"
//             className="cursor-pointer text-sm font-normal text-muted-foreground"
//           >
//             Remember me for 30 days
//           </Label>
//         </div>

//         {/* Submit */}
//         <Button type="submit" size="lg" className="w-full" disabled={loading}>
//           {loading ? (
//             <>
//               <Loader2 className="mr-2 size-4 animate-spin" />
//               Signing in...
//             </>
//           ) : (
//             <>
//               Sign in
//               <ArrowRight className="ml-2 size-4" />
//             </>
//           )}
//         </Button>
//       </form>

//       {/* Footer */}
//       <AuthFooterLink
//         question="Don't have an account?"
//         linkLabel="Sign up free"
//         href="/sign-up"
//       />
//     </div>
//   );
// }
"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { SocialLoginRow } from "@/components/auth/social-login-row";
import { AuthFooterLink } from "@/components/auth/auth-footer-link";

export default function SignInPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("Welcome back! Redirecting to your dashboard...");
      router.push("/dashboard");
    }, 900);
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold tracking-tight">
          Welcome back
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Sign in to continue your interview prep.
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
          <Label htmlFor="email">Email</Label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              required
              className="pl-10"
            />
          </div>
        </div>

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
              placeholder="••••••••"
              required
              className="pl-10 pr-10"
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
        </div>

        <div className="flex items-center gap-2.5 pt-1">
          <Checkbox id="remember" />
          <Label
            htmlFor="remember"
            className="text-sm font-normal text-muted-foreground"
          >
            Remember me for 30 days
          </Label>
        </div>

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading ? "Signing in..." : "Sign in"}
          {!loading && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <AuthFooterLink
        question="Don't have an account?"
        linkLabel="Sign up free"
        href="/sign-up"
      />
    </div>
  );
}
