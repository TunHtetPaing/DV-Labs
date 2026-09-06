"use client";

import { useActionState, useState } from "react";
import { signup, type AuthState } from "@/app/auth/actions";
import PasswordField from "@/app/auth/password-field";

const initialState: AuthState = { error: null, message: null, suggestions: [] };

export default function SignupForm() {
  const [state, formAction, pending] = useActionState(signup, initialState);
  const [username, setUsername] = useState("");

  if (state.message) {
    return (
      <p
        className="rounded-lg border border-zinc-200 bg-zinc-50 px-4 py-3 text-sm text-zinc-700 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-300"
        role="status"
      >
        {state.message}
      </p>
    );
  }

  return (
    <form action={formAction} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Username
        <input
          id="username"
          name="username"
          type="text"
          autoComplete="username"
          required
          minLength={3}
          maxLength={20}
          pattern="[A-Za-z][A-Za-z0-9_]{2,19}"
          title="3–20 characters. Start with a letter. Letters, numbers, and underscores only."
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-base font-normal text-zinc-950 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-600"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Date of birth
        <input
          id="dateOfBirth"
          name="dateOfBirth"
          type="date"
          autoComplete="bday"
          required
          className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-base font-normal text-zinc-950 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-600"
        />
      </label>
      <label className="flex flex-col gap-1.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
        Email
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-11 rounded-lg border border-zinc-200 bg-white px-3 text-base font-normal text-zinc-950 outline-none ring-zinc-400 focus:ring-2 dark:border-zinc-800 dark:bg-zinc-950 dark:text-zinc-50 dark:ring-zinc-600"
        />
      </label>
      <PasswordField
        id="password"
        name="password"
        label="Password"
        autoComplete="new-password"
        minLength={8}
        hint="At least 8 characters, with a letter, a number, and a special character."
      />
      <PasswordField
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm password"
        autoComplete="new-password"
        minLength={8}
      />
      {state.error ? (
        <div className="flex flex-col gap-2" role="alert">
          <p className="text-sm text-red-600 dark:text-red-400">
            {state.error}
          </p>
          {state.suggestions && state.suggestions.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {state.suggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => setUsername(suggestion)}
                  className="rounded-full border border-zinc-200 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:border-zinc-400 hover:text-zinc-950 dark:border-zinc-700 dark:text-zinc-300 dark:hover:border-zinc-500 dark:hover:text-zinc-50"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-2 h-11 rounded-lg bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {pending ? "Creating account..." : "Create account"}
      </button>
    </form>
  );
}
