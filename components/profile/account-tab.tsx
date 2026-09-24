"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, Save } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import type { ProfileData } from "@/components/profile/profile-client";

export function AccountTab({
  profile,
  onUpdated,
}: {
  profile: ProfileData;
  onUpdated: () => Promise<ProfileData>;
}) {
  const [name, setName] = React.useState(profile.name ?? "");
  const [saving, setSaving] = React.useState(false);

  const dirty = name.trim() !== (profile.name ?? "").trim();

  async function handleSave() {
    if (!dirty || saving) return;
    setSaving(true);
    try {
      const res = await fetch("/api/profile", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim() }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Couldn't update your profile.");
        return;
      }
      toast.success("Profile updated.");
      await onUpdated();
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const initials =
    profile.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() ?? "?";

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Account information</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center gap-4">
          <Avatar className="size-16">
            <AvatarImage
              src={profile.avatarUrl ?? ""}
              alt={profile.name ?? ""}
            />
            <AvatarFallback className="gradient-brand text-lg font-medium text-white">
              {initials}
            </AvatarFallback>
          </Avatar>
          <p className="text-xs text-muted-foreground">
            Your photo is synced from your sign-in provider and can't be changed
            here.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="h-11"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            value={profile.email ?? ""}
            disabled
            className="h-11"
          />
          <p className="text-xs text-muted-foreground">
            Your email is tied to your sign-in method and can't be changed here.
          </p>
        </div>

        <Button onClick={handleSave} disabled={!dirty || saving}>
          {saving ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Save className="size-4" />
          )}
          Save changes
        </Button>
      </CardContent>
    </Card>
  );
}
