"use client";

import * as React from "react";
import { Loader2, User, ShieldCheck, Activity } from "lucide-react";
import { cn } from "@/lib/utils";
import { AccountTab } from "./account-tab";
import { SecurityTab } from "./security-tab";
import { ActivityTab } from "./activity-tab";

export type ProfileData = {
  id: string;
  name: string | null;
  email: string | null;
  avatarUrl: string | null;
  hasPassword: boolean;
  connectedProviders: string[];
  stats: {
    totalInterviews: number;
    completedInterviews: number;
    averageScore: number | null;
    resumesAnalyzed: number;
  };
};

const TABS = [
  { key: "account", label: "Account", icon: User },
  { key: "security", label: "Security", icon: ShieldCheck },
  { key: "activity", label: "Activity", icon: Activity },
] as const;

type TabKey = (typeof TABS)[number]["key"];

export function ProfileClient() {
  const [profile, setProfile] = React.useState<ProfileData | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [tab, setTab] = React.useState<TabKey>("account");

  const loadProfile = React.useCallback(async () => {
    const res = await fetch("/api/profile", { cache: "no-store" });
    if (!res.ok) throw new Error("Failed to load profile");
    const data = (await res.json()) as { profile: ProfileData };
    setProfile(data.profile);
    return data.profile;
  }, []);

  React.useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        await loadProfile();
      } catch {
        // handled by loading state staying resolved with profile null
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [loadProfile]);

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <Loader2 className="size-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-sm text-muted-foreground">
        Couldn't load your profile. Try refreshing.
      </div>
    );
  }

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6">
      <div>
        <h1 className="font-display text-2xl font-semibold tracking-tight sm:text-3xl">
          Profile
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Manage your account, security, and activity.
        </p>
      </div>

      <div className="flex gap-2 border-b border-border">
        {TABS.map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={cn(
              "flex items-center gap-2 border-b-2 px-3 py-2.5 text-sm font-medium transition-colors",
              tab === t.key
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <t.icon className="size-4" />
            {t.label}
          </button>
        ))}
      </div>

      {tab === "account" && (
        <AccountTab profile={profile} onUpdated={loadProfile} />
      )}
      {tab === "security" && <SecurityTab profile={profile} />}
      {tab === "activity" && <ActivityTab stats={profile.stats} />}
    </div>
  );
}
