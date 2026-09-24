"use client";

import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { FaGithub, FaGoogle } from "react-icons/fa6";

export function SocialLoginRow() {
  return (
    <div className="grid grid-cols-2 gap-3">
      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-xl px-4"
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
      >
        <FaGoogle className="size-4" />
        Google
      </Button>

      <Button
        type="button"
        variant="outline"
        className="h-12 w-full rounded-xl px-4"
        onClick={() => signIn("github", { callbackUrl: "/dashboard" })}
      >
        <FaGithub className="size-4" />
        GitHub
      </Button>
    </div>
  );
}
