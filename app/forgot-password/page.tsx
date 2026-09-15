import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/app/auth/auth-card";
import { createOptionalClient } from "@/lib/supabase/server";

export default async function ForgotPasswordPage() {
  const supabase = await createOptionalClient();
  const { data } = supabase
    ? await supabase.auth.getClaims()
    : { data: { claims: null } };

  if (data?.claims) {
    redirect("/");
  }

  return (
    <AuthCard
      title="Forgot password"
      subtitle="This is still in development."
      footer={
        <>
          Remembered it?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Log in
          </Link>
        </>
      }
    >
      <p className="text-sm text-zinc-600 dark:text-zinc-400">
        Password reset emails are not available yet. If you already have an
        account, log in, or{" "}
        <Link
          href="/signup"
          className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          sign up
        </Link>{" "}
        if you need a new one.
      </p>
    </AuthCard>
  );
}
