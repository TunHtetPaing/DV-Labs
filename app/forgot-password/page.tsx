import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/app/auth/auth-card";
import ForgotPasswordForm from "@/app/forgot-password/forgot-password-form";
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
      subtitle="Enter the email for your account. We will send a reset link if it is registered."
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
      <ForgotPasswordForm />
    </AuthCard>
  );
}
