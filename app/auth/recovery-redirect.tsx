"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { getSupabasePublicEnv } from "@/lib/supabase/env";

const HANDLED_PATHS = new Set([
  "/auth/reset",
  "/auth/callback",
  "/auth/confirm",
]);

export default function RecoveryRedirect() {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (!getSupabasePublicEnv() || HANDLED_PATHS.has(pathname)) {
      return;
    }

    const search = new URLSearchParams(window.location.search);
    const hash = new URLSearchParams(window.location.hash.replace(/^#/, ""));
    const code = search.get("code");
    const tokenHash = search.get("token_hash");
    const isRecovery =
      search.get("type") === "recovery" || hash.get("type") === "recovery";

    if (code) {
      const next = new URL("/auth/reset", window.location.origin);
      search.forEach((value, key) => next.searchParams.set(key, value));
      window.location.replace(next.toString());
      return;
    }

    if (tokenHash) {
      const next = new URL("/auth/confirm", window.location.origin);
      search.forEach((value, key) => next.searchParams.set(key, value));
      if (!next.searchParams.get("type")) {
        next.searchParams.set("type", "recovery");
      }
      window.location.replace(next.toString());
      return;
    }

    if (!isRecovery && !hash.get("access_token")) {
      return;
    }

    const supabase = createClient();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" && pathname !== "/reset-password") {
        window.location.replace("/reset-password");
      }
    });

    void supabase.auth.getSession().then(({ data }) => {
      if (data.session && pathname !== "/reset-password") {
        router.replace("/reset-password");
      }
    });

    return () => subscription.unsubscribe();
  }, [pathname, router]);

  return null;
}
