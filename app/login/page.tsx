import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/app/auth/auth-card";
import LoginForm from "@/app/login/login-form";
import { createOptionalClient } from "@/lib/supabase/server";

export default async function LoginPage() {
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
      <LoginForm />
    </AuthCard>
  );
}
