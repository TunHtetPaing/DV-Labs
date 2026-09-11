"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";

export type Reply = {
  id: string;
  name: string;
  text: string;
};

export type Comment = {
  id: string;
  name: string;
  text: string;
  replies: Reply[];
};

type CommentRow = {
  id: string;
  parent_id: string | null;
  username: string;
  body: string;
  created_at: string;
};

const PROJECT_PATHS: Record<string, string> = {
  project1: "/projects/project1",
  project2: "/projects/project2",
  project3: "/projects/project3",
  project4: "/projects/project4",
};

export async function getProjectComments(
  projectSlug: string,
): Promise<Comment[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("comments")
    .select("id, parent_id, username, body, created_at")
    .eq("project_slug", projectSlug)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return nestComments(data as CommentRow[]);
}

export async function postProjectComment(input: {
  projectSlug: string;
  body: string;
  parentId?: string | null;
}): Promise<{ error: string | null }> {
  const projectPath = PROJECT_PATHS[input.projectSlug];
  if (!projectPath) {
    return { error: "Unknown project." };
  }

  const body = input.body.trim();
  if (!body) {
    return { error: "Write a comment before posting." };
  }

  if (body.length > 2000) {
    return { error: "Comments must be 2000 characters or fewer." };
  }

  const supabase = await createClient();
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData.user) {
    return { error: "You must be logged in to comment." };
  }

  const { error } = await supabase.from("comments").insert({
    project_slug: input.projectSlug,
    parent_id: input.parentId ?? null,
    body,
  });

  if (error) {
    return { error: error.message };
  }

  revalidatePath(projectPath);
  return { error: null };
}

function nestComments(rows: CommentRow[]): Comment[] {
  const comments: Comment[] = [];
  const repliesByParent = new Map<string, Reply[]>();

  for (const row of rows) {
    if (row.parent_id) {
      const replies = repliesByParent.get(row.parent_id) ?? [];
      replies.push({
        id: row.id,
        name: row.username,
        text: row.body,
      });
      repliesByParent.set(row.parent_id, replies);
      continue;
    }

    comments.push({
      id: row.id,
      name: row.username,
      text: row.body,
      replies: [],
    });
  }

  return comments.map((comment) => ({
    ...comment,
    replies: repliesByParent.get(comment.id) ?? [],
  }));
}
