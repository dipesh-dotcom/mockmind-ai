import { Sparkles, ShieldCheck, Star } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Branding panel */}
      <div className="relative hidden overflow-hidden bg-[#09090b] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-primary/30 blur-[120px]" />
          <div className="absolute bottom-[-15%] right-[-5%] h-[380px] w-[380px] rounded-full bg-accent/25 blur-[110px] animate-float" />
        </div>

        <div className="relative z-10">
          <Logo className="[&_span]:text-white" />
        </div>

        <div className="relative z-10 max-w-md">
          <div className="flex gap-0.5 text-warning">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} className="size-4 fill-current" />
            ))}
          </div>
          <blockquote className="mt-5 text-balance font-display text-2xl font-medium leading-snug text-white">
            &ldquo;MockMind AI is the closest thing to a real onsite interview
            I&apos;ve found — the feedback alone was worth it.&rdquo;
          </blockquote>
          <p className="mt-5 text-sm text-white/60">
            Aditi Kapoor · SWE II, hired at a fintech scale-up
          </p>

          <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-8">
            <div className="flex items-center gap-2.5 text-sm text-white/80">
              <Sparkles className="size-4 text-accent" />
              Trained on 50,000+ real interview transcripts
            </div>
            <div className="flex items-center gap-2.5 text-sm text-white/80">
              <ShieldCheck className="size-4 text-accent" />
              Your data is encrypted and never sold
            </div>
          </div>
        </div>

        <p className="relative z-10 text-xs text-white/40">
          © {new Date().getFullYear()} MockMind AI. All rights reserved.
        </p>
      </div>

      {/* Form panel */}
      <div className="flex flex-col p-6 sm:p-10">
        <div className="flex items-center justify-between lg:justify-end">
          <div className="lg:hidden">
            <Logo />
          </div>
          <ThemeToggle />
        </div>
        <div className="flex flex-1 items-center justify-center py-10">
          <div className="w-full max-w-sm">{children}</div>
        </div>
        <p className="text-center text-xs text-muted-foreground lg:hidden">
          © {new Date().getFullYear()} MockMind AI
        </p>
      </div>
    </div>
  );
}
