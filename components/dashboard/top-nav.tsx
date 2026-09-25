"use client";

import Link from "next/link";
import { LogOut, Menu, Plus, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CreateInterviewDialog } from "../interview/create-interview-dialog";
import { signOut, useSession } from "next-auth/react";

export function DashboardTopNav({ title }: { title?: string }) {
  const { setMobileOpen } = useSidebar();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-4 border-b border-border bg-card/80 px-4 backdrop-blur-md sm:gap-6 sm:px-6 lg:px-8">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setMobileOpen(true)}
        aria-label="Open sidebar"
      >
        <Menu className="size-5" />
      </Button>

      {title && (
        <h1 className="hidden font-display text-lg font-semibold sm:block">
          {title}
        </h1>
      )}

      <div className="relative ml-auto hidden max-w-sm flex-1 sm:block lg:max-w-md"></div>

      <div className="ml-auto flex items-center gap-1 sm:ml-0">
        <CreateInterviewDialog
          trigger={
            <Button
              variant="ghost"
              size="icon"
              className="inline-flex items-center justify-center gap-1.5 rounded-full gradient-brand text-white shadow-sm shadow-primary/20 transition-transform hover:-translate-y-0.5 hover:shadow-md hover:shadow-primary/25 sm:h-9 sm:w-auto sm:px-4"
              aria-label="New interview"
            >
              <Plus className="size-4" />
              <span className="hidden sm:inline">New interview</span>
            </Button>
          }
        />

        <div className="mx-1 flex items-center gap-1">
          <ThemeToggle className="border-0" />
        </div>

        <span className="mx-1 hidden h-6 w-px bg-border sm:block" />

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

          <DropdownMenuContent align="end" className="w-64 rounded-2xl p-2">
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
      </div>
    </header>
  );
}
