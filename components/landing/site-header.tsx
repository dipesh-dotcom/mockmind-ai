"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Menu, LayoutDashboard, LogOut, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Logo } from "@/components/shared/logo";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { useSession, signOut } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const NAV_LINKS = [
  { label: "Features", href: "#features" },
  { label: "How it Works", href: "#how-it-works" },
  { label: "Categories", href: "#categories" },
  { label: "Pricing", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export function SiteHeader() {
  const [scrolled, setScrolled] = React.useState(false);
  const { data: session, status } = useSession();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        scrolled ? "glass shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container-page flex h-18 items-center justify-between py-3.5">
        <Logo />

        <nav className="hidden lg:flex items-center gap-1">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-lg px-3.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <ThemeToggle />

          {status === "loading" ? null : session ? (
            <>
              <Link href="/dashboard">
                <Button variant="outline">
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>

              <DropdownMenu>
                <DropdownMenuTrigger className="inline-flex rounded-full ring-offset-2 ring-offset-background transition-shadow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50">
                  <Avatar className="h-10 w-10 ring-2 ring-border transition-colors hover:ring-primary/40">
                    <AvatarImage
                      src={session?.user?.image ?? ""}
                      alt={session?.user?.name ?? ""}
                    />
                    <AvatarFallback className="gradient-brand text-sm font-medium text-white">
                      {session?.user?.name
                        ?.split(" ")
                        .map((word) => word[0])
                        .join("")
                        .slice(0, 2)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-64 rounded-2xl p-2"
                >
                  <div className="flex items-center gap-3 px-2 py-2.5">
                    <Avatar className="h-9 w-9 shrink-0">
                      <AvatarImage
                        src={session?.user?.image ?? ""}
                        alt={session?.user?.name ?? ""}
                      />
                      <AvatarFallback className="gradient-brand text-xs font-medium text-white">
                        {session?.user?.name
                          ?.split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <div className="min-w-0">
                      <p className="truncate font-display text-sm font-semibold leading-tight">
                        {session?.user?.name}
                      </p>
                      <p className="truncate text-xs text-muted-foreground">
                        {session?.user?.email}
                      </p>
                    </div>
                  </div>

                  <DropdownMenuSeparator className="my-1.5" />

                  <DropdownMenuItem className="rounded-lg px-2 py-2 text-sm">
                    <Link href="/profile" className="flex items-center gap-2.5">
                      <User className="size-4 text-muted-foreground" />
                      Profile
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="my-1.5" />

                  <DropdownMenuItem
                    className="gap-2.5 rounded-lg px-2 py-2 text-sm text-destructive focus:bg-destructive/10 focus:text-destructive"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="size-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <>
              <Link href="/sign-in">
                <Button variant="ghost">Sign in</Button>
              </Link>

              <Link href="/sign-up">
                <Button>Get Started Free</Button>
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <Drawer>
            <DrawerTrigger
              className={cn(buttonVariants({ variant: "ghost", size: "icon" }))}
              aria-label="Open menu"
            >
              <Menu className="size-5" />
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Menu</DrawerTitle>
              </DrawerHeader>
              <div className="flex flex-col gap-1 px-6 pb-4">
                {NAV_LINKS.map((link) => (
                  <DrawerClose key={link.href}>
                    <Link
                      href={link.href}
                      className="rounded-lg px-3 py-3 text-base font-medium hover:bg-muted"
                    >
                      {link.label}
                    </Link>
                  </DrawerClose>
                ))}
              </div>
              <div className="flex flex-col gap-2 border-t border-border p-6">
                {status === "loading" ? null : session ? (
                  <Link href="/dashboard">
                    <Button>Dashboard</Button>
                  </Link>
                ) : (
                  <>
                    <Link href="/sign-in">
                      <Button variant="ghost">Sign in</Button>
                    </Link>

                    <Link href="/sign-up">
                      <Button>Get Started Free</Button>
                    </Link>
                  </>
                )}
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
    </header>
  );
}
