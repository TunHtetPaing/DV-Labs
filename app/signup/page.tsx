import Link from "next/link";
import { redirect } from "next/navigation";
import AuthCard from "@/app/auth/auth-card";
import SignupForm from "@/app/signup/signup-form";
import { createOptionalClient } from "@/lib/supabase/server";

export default async function SignupPage() {
  const supabase = await createOptionalClient();
  const { data } = supabase
    ? await supabase.auth.getClaims()
    : { data: { claims: null } };

  if (data?.claims) {
    redirect("/");
  }

  return (
    <AuthCard
      title="Create an account"
      subtitle="Create a profile with your username, date of birth, and email."
      footer={
        <>
          Already have an account?{" "}
          <Link
            href="/login"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Log in
          </Link>
        </>
      }
    >
      <SignupForm />
    </AuthCard>
  );
}
