import { CheckCircle2, FileSearch, Flame, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const NOTIFICATIONS = [
  {
    icon: Sparkles,
    title: "Your interview feedback is ready",
    time: "10 min ago",
    unread: true,
  },
  {
    icon: Flame,
    title: "You're on a 5-day streak! Keep it going.",
    time: "2 hours ago",
    unread: true,
  },
  {
    icon: FileSearch,
    title: "Resume analysis complete — score 82/100",
    time: "Yesterday",
    unread: false,
  },
  {
    icon: CheckCircle2,
    title: "New coding challenges added to Learning Hub",
    time: "2 days ago",
    unread: false,
  },
];

export function NotificationsPanel() {
  return (
    <div>
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <p className="text-sm font-semibold">Notifications</p>
        <button className="text-xs font-medium text-primary hover:underline">
          Mark all read
        </button>
      </div>
      <div className="max-h-80 overflow-y-auto">
        {NOTIFICATIONS.map((n) => (
          <div
            key={n.title}
            className={cn(
              "flex gap-3 border-b border-border px-4 py-3 last:border-b-0 hover:bg-muted/60",
              n.unread && "bg-primary/5",
            )}
          >
            <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <n.icon className="size-4" />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug">{n.title}</p>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.time}</p>
            </div>
            {n.unread && (
              <span className="ml-auto mt-1.5 size-2 shrink-0 rounded-full bg-accent" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
