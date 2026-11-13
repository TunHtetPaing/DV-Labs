"use server";

import { revalidatePath } from "next/cache";
import {
  commentBodyError,
  nestComments,
  PROJECT_PATHS,
  type Comment,
  type CommentRow,
} from "@/app/projects/nest-comments";
import { createOptionalClient } from "@/lib/supabase/server";

export type { Comment, Reply } from "@/app/projects/nest-comments";

export async function getProjectComments(
  projectSlug: string,
): Promise<Comment[]> {
  const supabase = await createOptionalClient();
  if (!supabase) {
    return [];
  }

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

  const bodyError = commentBodyError(input.body);
  if (bodyError) {
    return { error: bodyError };
  }

  const body = input.body.trim();

  const supabase = await createOptionalClient();
  if (!supabase) {
    return { error: "Comments are unavailable right now." };
  }

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
