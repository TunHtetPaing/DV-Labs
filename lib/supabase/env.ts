function readEnv(name: string) {
  return process.env[name]?.trim() || undefined;
}

export function getSupabasePublicEnv() {
  const url =
    readEnv("NEXT_PUBLIC_SUPABASE_URL") || readEnv("SUPABASE_URL");
  const key =
    readEnv("NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY") ||
    readEnv("NEXT_PUBLIC_SUPABASE_ANON_KEY") ||
    readEnv("SUPABASE_PUBLISHABLE_KEY") ||
    readEnv("SUPABASE_ANON_KEY");

  if (!url || !key) {
    return null;
  }

  try {
    new URL(url);
  } catch {
    return null;
  }

  return { url, key };
}
