"use client";

import Link from "next/link";
import { Bell, LogOut, Menu, Plus, Search, User } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { NotificationsPanel } from "./notifications-panel";
import { cn } from "@/lib/utils";
import { CreateInterviewDialog } from "../interview/create-interview-dialog";
import { signOut, useSession } from "next-auth/react";
import { AvatarImage } from "@/components/ui/avatar";

export function DashboardTopNav({ title }: { title?: string }) {
  const { setMobileOpen } = useSidebar();
  const { data: session } = useSession();

  return (
    <header className="sticky top-0 z-30 flex h-16 shrink-0 items-center gap-3 border-b border-border bg-card/80 px-4 backdrop-blur-md sm:px-6">
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

      <div className="relative ml-auto hidden max-w-sm flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search roles, questions, courses..."
          className="h-10 pl-10 shadow-sm"
        />
      </div>

      <div className="ml-auto flex items-center gap-1.5 sm:ml-0">
        <CreateInterviewDialog
          trigger={
            <Button size="sm" className="hidden sm:inline-flex">
              <Plus className="size-4" /> New interview
            </Button>
          }
        />

        <ThemeToggle className="border-0" />

        <Popover>
          <PopoverTrigger
            className={cn(
              buttonVariants({
                variant: "ghost",
                size: "icon",
              }),
              "relative border-0",
            )}
            aria-label="Notifications"
          >
            <Bell className="size-4.5" />
            <span className="absolute right-2 top-2 flex size-2 rounded-full bg-accent" />
          </PopoverTrigger>
          <PopoverContent align="end" className="w-80 p-0">
            <NotificationsPanel />
          </PopoverContent>
        </Popover>

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-accent">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={session?.user?.image ?? ""}
                alt={session?.user?.name ?? ""}
              />

              <AvatarFallback>
                {session?.user?.name
                  ?.split(" ")
                  .map((word) => word[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase()}
              </AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-64">
            <div className="px-3 py-2">
              <p className="font-medium">{session?.user?.name}</p>
              <p className="text-xs text-muted-foreground">
                {session?.user?.email}
              </p>
            </div>

            <DropdownMenuSeparator />

            <DropdownMenuItem>
              <Link href="/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="text-destructive"
              onClick={() =>
                signOut({
                  callbackUrl: "/",
                })
              }
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
