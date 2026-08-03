"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { ChevronsLeft, Sparkles, X } from "lucide-react";
import { Logo } from "@/components/shared/logo";
import { useSidebar } from "@/components/dashboard/sidebar-context";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import { NAV_FOOTER_ITEMS, NAV_ITEMS } from "@/lib/nav-config";

function NavLink({
  item,
  collapsed,
  active,
  onNavigate,
}: {
  item: (typeof NAV_ITEMS)[number];
  collapsed: boolean;
  active: boolean;
  onNavigate?: () => void;
}) {
  const link = (
    <Link
      href={item.href}
      onClick={onNavigate}
      className={cn(
        "group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
        active
          ? "bg-primary/10 text-primary"
          : "text-muted-foreground hover:bg-muted hover:text-foreground",
        collapsed && "justify-center px-0",
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full gradient-brand" />
      )}
      <item.icon className="size-[18px] shrink-0" />
      {!collapsed && <span className="truncate">{item.label}</span>}
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger>{link}</TooltipTrigger>
        <TooltipContent side="right">{item.label}</TooltipContent>
      </Tooltip>
    );
  }
  return link;
}

export function DashboardSidebar() {
  const pathname = usePathname();
  const { collapsed, toggle, mobileOpen, setMobileOpen } = useSidebar();

  const content = (isCollapsed: boolean, onNavigate?: () => void) => (
    <>
      <div
        className={cn(
          "flex items-center px-4 py-5",
          isCollapsed && "justify-center px-0",
        )}
      >
        {!isCollapsed && <Logo className="[&_span:last-child]:text-base" />}
        {isCollapsed && (
          <span className="flex size-9 items-center justify-center rounded-xl gradient-brand text-white shadow-md shadow-primary/30">
            <Sparkles className="size-4" />
          </span>
        )}
      </div>

      <nav
        className={cn("flex flex-1 flex-col gap-1 px-3", isCollapsed && "px-2")}
      >
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.href}
            item={item}
            collapsed={isCollapsed}
            active={
              pathname === item.href || pathname.startsWith(item.href + "/")
            }
            onNavigate={onNavigate}
          />
        ))}
      </nav>

      <div
        className={cn(
          "flex flex-col gap-1 border-t border-border px-3 py-4",
          isCollapsed && "px-2",
        )}
      >
        {NAV_FOOTER_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            item={item}
            collapsed={isCollapsed}
            active={false}
            onNavigate={onNavigate}
          />
        ))}
      </div>
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <TooltipProvider>
        <motion.aside
          animate={{ width: collapsed ? 76 : 264 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="relative hidden shrink-0 flex-col border-r border-border bg-card lg:flex"
        >
          <div className="flex h-full flex-col">{content(collapsed)}</div>
          <button
            onClick={toggle}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="absolute -right-3.5 top-8 flex size-7 items-center justify-center rounded-full border border-border bg-card text-muted-foreground shadow-sm transition-colors hover:text-foreground"
          >
            <ChevronsLeft
              className={cn(
                "size-3.5 transition-transform",
                collapsed && "rotate-180",
              )}
            />
          </button>
        </motion.aside>
      </TooltipProvider>

      {/* Mobile drawer sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
          />
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-full w-72 flex-col bg-card"
          >
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-4 flex size-8 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted"
              aria-label="Close menu"
            >
              <X className="size-4" />
            </button>
            {content(false, () => setMobileOpen(false))}
          </motion.aside>
        </div>
      )}
    </>
  );
}
