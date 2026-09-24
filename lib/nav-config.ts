import {
  LayoutDashboard,
  Mic,
  FileSearch,
  GraduationCap,
  User,
  Settings,
  HelpCircle,
} from "lucide-react";

export const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
  { label: "Interview Practice", href: "/practice", icon: Mic },
  { label: "Resume Analyzer", href: "/resume-analyzer", icon: FileSearch },
  { label: "Profile", href: "/profile", icon: User },
];

export const NAV_FOOTER_ITEMS = [
  { label: "Settings", href: "/profile?tab=settings", icon: Settings },
  { label: "Help & Support", href: "#", icon: HelpCircle },
];
