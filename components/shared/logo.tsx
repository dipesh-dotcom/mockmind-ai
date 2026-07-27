import Link from "next/link";
import { cn } from "@/lib/utils";

export function Logo({ className, href = "/" }: { className?: string; href?: string }) {
  return (
    <Link href={href} className={cn("flex items-center gap-2.5 group", className)}>
      <span className="relative flex size-9 items-center justify-center rounded-xl gradient-brand shadow-md shadow-primary/30 transition-transform group-hover:scale-105">
        <svg viewBox="0 0 24 24" fill="none" className="size-5 text-white">
          <path
            d="M12 2L4 6.5V12c0 5.2 3.4 9.7 8 10.9 4.6-1.2 8-5.7 8-10.9V6.5L12 2z"
            fill="currentColor"
            fillOpacity="0.18"
          />
          <path
            d="M12 2L4 6.5V12c0 5.2 3.4 9.7 8 10.9 4.6-1.2 8-5.7 8-10.9V6.5L12 2z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinejoin="round"
          />
          <circle cx="12" cy="11.5" r="2.4" fill="currentColor" />
          <path d="M9 16.2c.7-1.3 1.8-2 3-2s2.3.7 3 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
      <span className="font-display text-lg font-semibold tracking-tight">
        MockMind <span className="gradient-text">AI</span>
      </span>
    </Link>
  );
}
