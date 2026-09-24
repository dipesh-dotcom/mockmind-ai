"use client";

import * as React from "react";
import { toast } from "sonner";
import { Loader2, KeyRound } from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import type { ProfileData } from "@/components/profile/profile-client";

const KNOWN_PROVIDERS = [
  { id: "google", label: "Google" },
  { id: "github", label: "GitHub" },
];

export function SecurityTab({ profile }: { profile: ProfileData }) {
  const [currentPassword, setCurrentPassword] = React.useState("");
  const [newPassword, setNewPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [saving, setSaving] = React.useState(false);

  async function handleChangePassword(e: React.FormEvent) {
    e.preventDefault();
    if (saving) return;

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters.");
      return;
    }
    if (newPassword !== confirmPassword) {
      toast.error("Passwords don't match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/profile/password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          currentPassword: profile.hasPassword ? currentPassword : undefined,
          newPassword,
        }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        toast.error(data.error ?? "Couldn't update your password.");
        return;
      }
      toast.success(
        profile.hasPassword ? "Password updated." : "Password set.",
      );
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-base">
            {profile.hasPassword ? "Change password" : "Set a password"}
          </CardTitle>
          <CardDescription>
            {profile.hasPassword
              ? "Update the password you use to sign in."
              : "You currently sign in with a connected provider. Add a password to also sign in with your email directly."}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleChangePassword} className="space-y-4">
            {profile.hasPassword && (
              <div className="space-y-2">
                <Label htmlFor="currentPassword">Current password</Label>
                <Input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  className="h-11"
                />
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="newPassword">New password</Label>
              <Input
                id="newPassword"
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm new password</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="h-11"
              />
            </div>

            <Button type="submit" disabled={saving}>
              {saving ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <KeyRound className="size-4" />
              )}
              {profile.hasPassword ? "Update password" : "Set password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Connected accounts</CardTitle>
          <CardDescription>Providers linked to your account</CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {KNOWN_PROVIDERS.map((p) => {
            const connected = profile.connectedProviders.includes(p.id);
            return (
              <div
                key={p.id}
                className="flex items-center justify-between rounded-xl border border-border p-3.5"
              >
                <span className="text-sm font-medium">{p.label}</span>
                <Badge variant={connected ? "success" : "outline"}>
                  {connected ? "Connected" : "Not connected"}
                </Badge>
              </div>
            );
          })}
        </CardContent>
      </Card>
    </div>
  );
}
