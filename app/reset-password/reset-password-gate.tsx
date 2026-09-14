"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import AuthCard from "@/app/auth/auth-card";
import ResetPasswordForm from "@/app/reset-password/reset-password-form";
import { createClient } from "@/lib/supabase/client";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

export default function ResetPasswordGate() {
  const [state, setState] = useState<"loading" | "ready" | "expired">(
    "loading",
  );

  useEffect(() => {
    if (!getSupabasePublicEnv()) {
      setState("expired");
      return;
    }

    const supabase = createClient();
    const search = window.location.search;
    const hash = window.location.hash;
    const pending =
      hash.includes("access_token") ||
      hash.includes("type=recovery") ||
      search.includes("code=") ||
      search.includes("token_hash=");

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session) {
        setState("ready");
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        setState("ready");
        return;
      }
      if (!pending) {
        setState("expired");
      }
    });

    const timeout = window.setTimeout(() => {
      setState((current) => (current === "loading" ? "expired" : current));
    }, 5000);

    return () => {
      subscription.unsubscribe();
      window.clearTimeout(timeout);
    };
  }, []);

  if (state === "loading") {
    return (
      <AuthCard
        title="Reset password"
        subtitle="Opening your reset link…"
        footer={
          <Link
            href="/forgot-password"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Request a new link
          </Link>
        }
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          This can take a few seconds.
        </p>
      </AuthCard>
    );
  }

  if (state === "expired") {
    return (
      <AuthCard
        title="Reset password"
        subtitle="This reset link is missing or expired."
        footer={
          <Link
            href="/forgot-password"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Request a new link
          </Link>
        }
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          Open the latest email we sent, or request another reset link.
        </p>
      </AuthCard>
    );
  }

  return (
    <AuthCard
      title="Set a new password"
      subtitle="Choose a new password for your account."
      footer={
        <Link
          href="/login"
          className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Cancel
        </Link>
      }
    >
      <ResetPasswordForm />
    </AuthCard>
  );
}
