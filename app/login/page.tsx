import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/app/auth/auth-card";
import LoginForm from "@/app/login/login-form";
import { createOptionalClient } from "@/lib/supabase/server";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ reset?: string | string[] }>;
}) {
  const resetParam = (await searchParams).reset;
  const justReset =
    resetParam === "1" || (Array.isArray(resetParam) && resetParam[0] === "1");
  const supabase = await createOptionalClient();
  const { data } = supabase
    ? await supabase.auth.getClaims()
    : { data: { claims: null } };

  if (data?.claims) {
    redirect("/");
  }

  return (
    <AuthCard
      title="Log in"
      subtitle="Sign in with your email and password."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link
            href="/signup"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Sign up
          </Link>
        </>
      }
    >
      {justReset ? (
        <p
          className="mb-6 rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
          role="status"
        >
          Password updated. Log in with your new password.
        </p>
      ) : null}
      <LoginForm />
    </AuthCard>
  );
}
