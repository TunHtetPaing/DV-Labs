"use server";

import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export type AuthState = {
  error: string | null;
  message: string | null;
  suggestions?: string[];
};

export async function login(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
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

const USERNAME_PATTERN = /^[A-Za-z][A-Za-z0-9_]{2,19}$/;
const PASSWORD_PATTERN = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;

function isUsernameTakenError(message: string) {
  const normalized = message.toLowerCase();
  return (
    normalized.includes("duplicate") ||
    normalized.includes("already exists") ||
    normalized.includes("profiles_username_lower_idx") ||
    normalized.includes("database error saving new user")
  );
}

function fallbackUsernameSuggestions(username: string) {
  const suggestions: string[] = [];

  for (let n = 1; n <= 99 && suggestions.length < 3; n += 1) {
    const candidate = `${username}${n}`;
    if (USERNAME_PATTERN.test(candidate)) {
      suggestions.push(candidate);
    }
  }

  return suggestions;
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

function yearsAgoUtc(years: number) {
  const today = new Date();
  return Date.UTC(
    today.getUTCFullYear() - years,
    today.getUTCMonth(),
    today.getUTCDate(),
  );
}

export async function signup(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const supabase = await createClient();

  const username = String(formData.get("username") ?? "").trim();
  const dateOfBirth = String(formData.get("dateOfBirth") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const confirmPassword = String(formData.get("confirmPassword") ?? "");

  if (!username || !dateOfBirth || !email || !password) {
    return {
      error: "Username, date of birth, email, and password are required.",
      message: null,
    };
  }

  if (!USERNAME_PATTERN.test(username)) {
    return {
      error:
        "Username must be 3–20 characters, start with a letter, and contain only letters, numbers, and underscores.",
      message: null,
    };
  }

  const dateOfBirthMs = Date.parse(`${dateOfBirth}T00:00:00.000Z`);
  if (Number.isNaN(dateOfBirthMs)) {
    return { error: "Enter a valid date of birth.", message: null };
  }

  if (dateOfBirthMs > yearsAgoUtc(13)) {
    return { error: "You must be at least 13 years old.", message: null };
  }

  if (dateOfBirthMs < yearsAgoUtc(120)) {
    return { error: "Enter a valid date of birth.", message: null };
  }

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

export async function logout() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();

  if (data?.claims) {
    await supabase.auth.signOut();
  }

  revalidatePath("/", "layout");
  redirect("/login");
}
