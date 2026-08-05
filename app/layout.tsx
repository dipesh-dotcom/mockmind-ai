import type { Metadata, Viewport } from "next";
import "./globals.css";
// NOTE: This build environment has no network access to Google Fonts, so we use a
// system font stack ("Inter"/"Lexend" with OS fallbacks) defined in globals.css.
// In a real deployment, swap back to `next/font/google` for self-hosted, zero-layout-shift
// Inter + Lexend by restoring the `Inter`/`Lexend` imports here.
import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: {
    default: "MockMind AI — Ace Every Interview with AI",
    template: "%s · MockMind AI",
  },
  description:
    "MockMind AI is a premium AI-powered interview preparation platform. Practice voice, text, coding, and behavioral interviews, analyze your resume, and land your dream job.",
  keywords: [
    "AI interview preparation",
    "mock interview",
    "resume analyzer",
    "coding interview practice",
    "behavioral interview",
    "job interview AI",
  ],
  metadataBase: new URL("https://mockmind.ai"),
  openGraph: {
    title: "MockMind AI — Ace Every Interview with AI",
    description:
      "Practice voice, text, coding, and behavioral interviews with a realistic AI interviewer. Get instant feedback and land your dream job.",
    url: "https://mockmind.ai",
    siteName: "MockMind AI",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "MockMind AI — Ace Every Interview with AI",
    description:
      "Practice voice, text, coding, and behavioral interviews with a realistic AI interviewer.",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#09090b" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen antialiased font-sans">
        <SessionProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster richColors position="top-right" closeButton />
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
