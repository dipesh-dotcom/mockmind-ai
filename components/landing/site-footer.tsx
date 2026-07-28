import Link from "next/link";
import { FaGithub, FaLinkedin, FaYoutube } from "react-icons/fa6";
import { FaXTwitter } from "react-icons/fa6";
import { Logo } from "@/components/shared/logo";

const FOOTER_LINKS = {
  Product: [
    { label: "Features", href: "#features" },
    { label: "Categories", href: "#categories" },
    { label: "Pricing", href: "#pricing" },
    { label: "Live Demo", href: "#demo" },
  ],
  Company: [
    { label: "About", href: "/about" },
    { label: "Careers", href: "/careers" },
    { label: "Blog", href: "/blog" },
    { label: "Contact", href: "/contact" },
  ],
  Resources: [
    { label: "Help Center", href: "/help" },
    { label: "Interview Guides", href: "/guides" },
    { label: "Question Bank", href: "/questions" },
    { label: "API Docs", href: "/docs" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Security", href: "/security" },
  ],
} as const;

const SOCIAL_LINKS = [
  {
    label: "GitHub",
    href: "https://github.com/",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/",
    icon: FaLinkedin,
  },
  {
    label: "Twitter",
    href: "https://x.com/",
    icon: FaXTwitter,
  },
  {
    label: "YouTube",
    href: "https://youtube.com/",
    icon: FaYoutube,
  },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface/40">
      <div className="container-page py-16">
        <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 lg:grid-cols-6">
          <div className="col-span-2 lg:col-span-2">
            <Logo />

            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              Premium AI-powered interview preparation. Practice smarter,
              interview with confidence, and land your dream job.
            </p>

            <div className="mt-6 flex items-center gap-2">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <Link
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex size-10 items-center justify-center rounded-lg border border-border text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
                >
                  <Icon className="size-4" />
                </Link>
              ))}
            </div>
          </div>

          {Object.entries(FOOTER_LINKS).map(([heading, links]) => (
            <div key={heading}>
              <h4 className="font-display text-sm font-semibold">{heading}</h4>

              <ul className="mt-4 space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} MockMind AI. All rights reserved.
          </p>

          <p className="text-xs text-muted-foreground">
            Designed and built for candidates who prepare with purpose.
          </p>
        </div>
      </div>
    </footer>
  );
}
