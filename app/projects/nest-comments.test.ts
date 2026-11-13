import { describe, expect, it } from "vitest";
import {
  commentBodyError,
  nestComments,
  PROJECT_PATHS,
} from "@/app/projects/nest-comments";

describe("commentBodyError", () => {
  it("rejects empty and oversized bodies", () => {
    expect(commentBodyError("   ")).toMatch(/write a comment/i);
    expect(commentBodyError("x".repeat(2001))).toMatch(/2000/);
  });

  it("accepts a normal comment", () => {
    expect(commentBodyError("Looks great.")).toBeNull();
  });
});

describe("nestComments", () => {
  it("attaches replies under the parent", () => {
    const nested = nestComments([
      {
        id: "1",
        parent_id: null,
        username: "tun",
        body: "Top",
        created_at: "2026-01-01T00:00:00.000Z",
      },
      {
        id: "2",
        parent_id: "1",
        username: "guest",
        body: "Reply",
        created_at: "2026-01-01T01:00:00.000Z",
      },
    ]);

    expect(nested).toHaveLength(1);
    expect(nested[0]?.replies).toEqual([
      { id: "2", name: "guest", text: "Reply" },
    ]);
  });

  it("does not drop a reply whose parent is missing", () => {
    const nested = nestComments([
      {
        id: "2",
        parent_id: "missing",
        username: "guest",
        body: "Orphan",
        created_at: "2026-01-01T00:00:00.000Z",
      },
    ]);

    expect(nested).toEqual([]);
  });
});

describe("PROJECT_PATHS", () => {
  it("covers the four case studies", () => {
    expect(Object.keys(PROJECT_PATHS)).toEqual([
      "project1",
      "project2",
      "project3",
      "project4",
    ]);
  });
});
