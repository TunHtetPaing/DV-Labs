import Link from "next/link";

export default function ErrorPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-2xl font-semibold tracking-tight">
        Something went wrong
      </h1>
      <p className="max-w-sm text-sm text-zinc-600 dark:text-zinc-400">
        The confirmation link may be invalid or expired. Try logging in or
        requesting a new email.
      </p>
      <Link
        href="/login"
        className="text-sm font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
      >
        Back to log in
      </Link>
    </div>
  );
}
