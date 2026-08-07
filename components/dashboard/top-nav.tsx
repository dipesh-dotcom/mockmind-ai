"use client";

import Link from "next/link";
import { Bell, Menu, Plus, Search } from "lucide-react";
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

export function DashboardTopNav({ title }: { title?: string }) {
  const { setMobileOpen } = useSidebar();

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
          <DropdownMenuTrigger className="ml-1 rounded-full outline-none ring-offset-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring">
            <Avatar>
              <AvatarFallback>JL</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>
              <p className="text-sm font-medium text-foreground">Jordan Lee</p>
              <p className="text-xs font-normal text-muted-foreground">
                jordan@example.com
              </p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/profile">Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile?tab=settings">Settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/profile?tab=billing">Billing</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link href="/">Sign out</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
