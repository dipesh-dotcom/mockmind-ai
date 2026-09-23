import type { Metadata, Viewport } from "next";

import "./globals.css";

import { ThemeProvider } from "@/components/shared/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  metadataBase: new URL("https://mockmind.ai"),

  title: {
    default: "MockMind AI — AI Interview Preparation",
    template: "%s · MockMind AI",
  },

  description:
    "Prepare for your next interview with MockMind AI. Practice realistic AI-powered interviews, analyze your resume, improve your answers, and get personalized feedback.",

  keywords: [
    "MockMind AI",
    "AI interview preparation",
    "AI mock interview",
    "mock interview",
    "interview practice",
    "technical interview",
    "behavioral interview",
    "coding interview",
    "resume analyzer",
    "resume analysis",
    "interview feedback",
    "job interview preparation",
  ],

  applicationName: "MockMind AI",

  authors: [
    {
      name: "MockMind AI",
      url: "https://mockmind.ai",
    },
  ],

  creator: "MockMind AI",
  publisher: "MockMind AI",

  category: "Education",

  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mockmind.ai",
    siteName: "MockMind AI",

    title: "MockMind AI — AI Interview Preparation",

    description:
      "Practice realistic AI-powered interviews, analyze your resume, and get personalized feedback to improve your interview performance.",

    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "MockMind AI — AI Interview Preparation",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    title: "MockMind AI — AI Interview Preparation",

    description:
      "Practice realistic AI-powered interviews, analyze your resume, and get personalized feedback.",

    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },

  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,

  themeColor: [
    {
      media: "(prefers-color-scheme: light)",
      color: "#ffffff",
    },
    {
      media: "(prefers-color-scheme: dark)",
      color: "#09090b",
    },
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
