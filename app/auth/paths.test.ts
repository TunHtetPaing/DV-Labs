import { describe, expect, it } from "vitest";
import { safeNextPath } from "@/app/auth/paths";

describe("safeNextPath", () => {
  it("keeps a same-origin path", () => {
    expect(safeNextPath("/studio")).toBe("/studio");
    expect(safeNextPath("/projects/project1")).toBe("/projects/project1");
  });

  it("rejects open redirects and junk", () => {
    expect(safeNextPath("//evil.example")).toBe("/");
    expect(safeNextPath("/login?next=https://evil.example")).toBe("/");
    expect(safeNextPath("/reset-password#token")).toBe("/");
    expect(safeNextPath("https://evil.example")).toBe("/");
    expect(safeNextPath("\\windows")).toBe("/");
  });

  it("uses the given fallback when the value is empty", () => {
    expect(safeNextPath(null, "/login")).toBe("/login");
    expect(safeNextPath(undefined, "/studio")).toBe("/studio");
  });
});
