import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        The confirmation link may be invalid or expired. Try logging in, or
        request a new reset email.
      </p>
      <div className="flex flex-col items-center gap-2">
        <Link
          href="/login"
          className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
        >
          Back to log in
        </Link>
        <Link
          href="/forgot-password"
          className="text-sm font-medium text-zinc-600 underline-offset-4 hover:text-zinc-950 hover:underline dark:text-zinc-400 dark:hover:text-zinc-50"
        >
          Forgot password?
        </Link>
      </div>
    </div>
  );
}
