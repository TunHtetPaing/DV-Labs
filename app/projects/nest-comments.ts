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

export type CommentRow = {
  id: string;
  parent_id: string | null;
  username: string;
  body: string;
  created_at: string;
};

export const PROJECT_PATHS: Record<string, string> = {
  project1: "/projects/project1",
  project2: "/projects/project2",
  project3: "/projects/project3",
  project4: "/projects/project4",
};

export function commentBodyError(body: string): string | null {
  const trimmed = body.trim();
  if (!trimmed) {
    return "Write a comment before posting.";
  }
  if (trimmed.length > 2000) {
    return "Comments must be 2000 characters or fewer.";
  }
  return null;
}

export function nestComments(rows: CommentRow[]): Comment[] {
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
