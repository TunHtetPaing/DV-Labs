"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import {
  fallbackUsernameSuggestions,
  isUsernameTakenError,
  PASSWORD_PATTERN,
  signupFieldError,
  USERNAME_PATTERN,
} from "@/app/auth/rules";
import { getSupabasePublicEnv } from "@/lib/supabase/env";
import { createClient } from "@/lib/supabase/server";

const MISSING_SUPABASE = {
  error: "Auth is not configured on this server.",
  message: null,
};

export type AuthState = {
  error: string | null;
  message: string | null;
  suggestions?: string[];
};

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!getSupabasePublicEnv()) {
    return MISSING_SUPABASE;
  }

  const supabase = await createClient();

  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");

  if (!email || !password) {
    return { error: "Email and password are required.", message: null };
  }

  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    return { error: error.message, message: null };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

async function suggestAvailableUsernames(username: string) {
  const supabase = await createClient();
  const { data, error } = await supabase.rpc("suggest_available_usernames", {
    base: username,
  });

  if (error || !Array.isArray(data)) {
    return fallbackUsernameSuggestions(username);
  }

  return data.filter(
    (value): value is string =>
      typeof value === "string" && USERNAME_PATTERN.test(value),
  );
}

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!getSupabasePublicEnv()) {
    return MISSING_SUPABASE;
  }

  const supabase = await createClient();

  const username = String(formData.get("username") ?? "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  const fieldError = signupFieldError({
    username,
    dateOfBirth,
    email,
    password,
    confirmPassword,
  });
  if (fieldError) {
    return { error: fieldError, message: null };
  }

  const origin = (await headers()).get("origin") ?? "http://localhost:3000";
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${origin}/auth/confirm`,
      data: {
        username,
        date_of_birth: dateOfBirth,
      },
    },
  });

  if (error) {
    if (isUsernameTakenError(error.message)) {
      const suggestions = await suggestAvailableUsernames(username);
      return {
        error:
          suggestions.length > 0
            ? "That username is already taken. Try one of these:"
            : "That username is already taken. Try a different one.",
        message: null,
        suggestions,
      };
    }

    return {
      error: error.message,
      message: null,
    };
  }

  if (!data.session) {
    return {
      error: null,
      message: "Check your email for a confirmation link to finish signing up.",
    };
  }

  revalidatePath("/", "layout");
  redirect("/");
}

export async function requestPasswordReset(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!getSupabasePublicEnv()) {
    return MISSING_SUPABASE;
  }

  const email = String(formData.get("email") ?? "").trim();
  if (!email) {
    return { error: "Email is required.", message: null };
  }

  const supabase = await createClient();
  const headerList = await headers();
  const origin =
    headerList.get("origin") ??
    `${headerList.get("x-forwarded-proto") ?? "http"}://${headerList.get("x-forwarded-host") ?? headerList.get("host") ?? "localhost:3000"}`;
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  });

  if (error) {
    const normalized = error.message.toLowerCase();
    if (normalized.includes("rate") || normalized.includes("security")) {
      return { error: error.message, message: null };
    }
  }

  return {
    error: null,
    message:
      "If an account exists for that email, we sent a reset link. Check your inbox.",
  };
}

export async function updatePassword(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  if (!getSupabasePublicEnv()) {
    return MISSING_SUPABASE;
  }

  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!PASSWORD_PATTERN.test(password)) {
    return {
      error:
        "Password must be at least 8 characters and include a letter, a number, and a special character.",
      message: null,
    };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match.", message: null };
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  if (!data?.claims) {
    return {
      error: "This reset link has expired. Request a new one.",
      message: null,
    };
  }

  const { error } = await supabase.auth.updateUser({ password });
  if (error) {
    return { error: error.message, message: null };
  }

  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/login?reset=1");
}

export async function logout() {
  if (!getSupabasePublicEnv()) {
    redirect("/");
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/");
}
