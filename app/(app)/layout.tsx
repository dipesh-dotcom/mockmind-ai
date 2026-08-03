import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { SidebarProvider } from "@/components/dashboard/sidebar-context";
import { DashboardTopNav } from "@/components/dashboard/top-nav";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen bg-surface/40">
        <DashboardSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <DashboardTopNav />
          <TooltipProvider>
            {" "}
            <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
          </TooltipProvider>
        </div>
      </div>
    </SidebarProvider>
  );
}
