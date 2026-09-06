import { createClient } from "@/lib/supabase/server";
import { getProjectComments } from "@/app/projects/comments";
import ProjectOneClient from "./project-one-client";

export default async function ProjectOnePage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;
  const userId =
    typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  const metadata = data?.claims?.user_metadata;
  const metadataUsername =
    metadata &&
    typeof metadata === "object" &&
    "username" in metadata &&
    typeof metadata.username === "string"
      ? metadata.username
      : null;

  const [{ data: profile }, comments] = await Promise.all([
    userId
      ? supabase
          .from("profiles")
          .select("username")
          .eq("id", userId)
          .maybeSingle()
      : Promise.resolve({ data: null }),
    getProjectComments("project1"),
  ]);

  const username =
    profile?.username ??
    metadataUsername ??
    (email ? email.split("@")[0] : null);

  return <ProjectOneClient username={username} comments={comments} />;
}
