"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { postProjectComment, type Comment } from "@/app/projects/comments";

export default function ProjectComments({
  projectSlug,
  username,
  comments: initialComments,
}: {
  projectSlug: string;
  username: string | null;
  comments: Comment[];
}) {
  const [comments, setComments] = useState(initialComments);
  const [commentText, setCommentText] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyText, setReplyText] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setComments(initialComments);
  }, [initialComments]);

  async function submitComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!username || !commentText.trim() || pending) return;

    setPending(true);
    setError(null);

    const result = await postProjectComment({
      projectSlug,
      body: commentText,
    });

    setPending(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setCommentText("");
    router.refresh();
  }

  async function submitReply(
    event: FormEvent<HTMLFormElement>,
    commentId: string,
  ) {
    event.preventDefault();

    if (!username || !replyText.trim() || pending) return;

    setPending(true);
    setError(null);

    const result = await postProjectComment({
      projectSlug,
      body: replyText,
      parentId: commentId,
    });

    setPending(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setReplyText("");
    setReplyingTo(null);
    router.refresh();
  }

  return (
    <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
      <div className="mx-auto max-w-4xl">
        <div className="mb-10">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
            Discussion
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Comments
          </h2>

          <p className="mt-4 text-zinc-600 dark:text-zinc-400">
            Have feedback or thoughts about the project?
          </p>
        </div>

        {username ? (
          <form onSubmit={submitComment} className="mb-14">
            <div className="grid gap-4">
              <p className="text-sm text-zinc-600 dark:text-zinc-400">
                Commenting as{" "}
                <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                  {username}
                </span>
              </p>

              <textarea
                value={commentText}
                onChange={(event) => setCommentText(event.target.value)}
                placeholder="Write a comment..."
                rows={4}
                className="w-full resize-none rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-900 dark:focus:border-zinc-500"
              />

              {error && !replyingTo ? (
                <p
                  className="text-sm text-red-600 dark:text-red-400"
                  role="alert"
                >
                  {error}
                </p>
              ) : null}

              <div>
                <button
                  type="submit"
                  disabled={pending}
                  className="rounded-full bg-zinc-950 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  {pending && !replyingTo ? "Posting..." : "Post Comment"}
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p className="mb-14 text-sm text-zinc-600 dark:text-zinc-400">
            <Link
              href="/login"
              className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
            >
              Log in
            </Link>{" "}
            to leave a comment.
          </p>
        )}

        <div className="space-y-10">
          {comments.length === 0 ? (
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              No comments yet.
            </p>
          ) : null}
          {comments.map((comment) => (
            <div key={comment.id}>
              <div className="border-b border-zinc-200 pb-8 dark:border-zinc-800">
                <div className="flex items-center justify-between gap-4">
                  <p className="font-semibold">{comment.name}</p>

                  <button
                    type="button"
                    onClick={() => {
                      setReplyingTo(
                        replyingTo === comment.id ? null : comment.id,
                      );
                      setReplyText("");
                    }}
                    className="text-sm font-medium text-zinc-500 transition hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                  >
                    {replyingTo === comment.id ? "Cancel" : "Reply"}
                  </button>
                </div>

                <p className="mt-3 leading-7 text-zinc-600 dark:text-zinc-400">
                  {comment.text}
                </p>

                {replyingTo === comment.id && (
                  <form
                    onSubmit={(event) => submitReply(event, comment.id)}
                    className="mt-6 rounded-xl bg-zinc-50 p-5 dark:bg-zinc-900"
                  >
                    <p className="mb-4 text-sm font-semibold">
                      Reply to {comment.name}
                    </p>

                    <div className="grid gap-3">
                      {username ? (
                        <>
                          <p className="text-sm text-zinc-600 dark:text-zinc-400">
                            Replying as{" "}
                            <span className="font-semibold text-zinc-950 dark:text-zinc-50">
                              {username}
                            </span>
                          </p>

                          <textarea
                            value={replyText}
                            onChange={(event) =>
                              setReplyText(event.target.value)
                            }
                            placeholder="Write a reply..."
                            rows={3}
                            className="w-full resize-none rounded-lg border border-zinc-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-zinc-500 dark:border-zinc-800 dark:bg-zinc-950 dark:focus:border-zinc-500"
                          />

                          {error && replyingTo === comment.id ? (
                            <p
                              className="text-sm text-red-600 dark:text-red-400"
                              role="alert"
                            >
                              {error}
                            </p>
                          ) : null}

                          <div>
                            <button
                              type="submit"
                              disabled={pending}
                              className="rounded-full bg-zinc-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-zinc-700 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                            >
                              {pending ? "Posting..." : "Post Reply"}
                            </button>
                          </div>
                        </>
                      ) : (
                        <p className="text-sm text-zinc-600 dark:text-zinc-400">
                          <Link
                            href="/login"
                            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
                          >
                            Log in
                          </Link>{" "}
                          to reply.
                        </p>
                      )}
                    </div>
                  </form>
                )}

                {comment.replies.length > 0 && (
                  <div className="mt-6 ml-5 border-l border-zinc-200 pl-5 dark:border-zinc-800">
                    <div className="space-y-6">
                      {comment.replies.map((reply) => (
                        <div key={reply.id}>
                          <p className="text-sm font-semibold">{reply.name}</p>

                          <p className="mt-2 text-sm leading-6 text-zinc-600 dark:text-zinc-400">
                            {reply.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
