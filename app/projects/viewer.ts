import { createClient } from "@/lib/supabase/server";

export async function getProjectViewer(): Promise<{ username: string | null }> {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;
  const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  const metadata = data?.claims?.user_metadata;
  const metadataUsername =
    metadata &&
    typeof metadata === "object" &&
    "username" in metadata &&
    typeof metadata.username === "string"
      ? metadata.username
      : null;

  const { data: profile } = userId
    ? await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .maybeSingle()
    : { data: null };

  return {
    username:
      profile?.username ??
      metadataUsername ??
      (email ? email.split("@")[0] : null),
  };
}
