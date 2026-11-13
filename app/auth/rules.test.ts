import { describe, expect, it } from "vitest";
import {
  fallbackUsernameSuggestions,
  isUsernameTakenError,
  signupFieldError,
} from "@/app/auth/rules";

const now = new Date("2026-11-14T00:00:00.000Z");

const valid = {
  username: "tun_labs",
  dateOfBirth: "1998-05-01",
  email: "tun@example.com",
  password: "Studio1!",
  confirmPassword: "Studio1!",
};

describe("signupFieldError", () => {
  it("accepts a valid payload", () => {
    expect(signupFieldError(valid, now)).toBeNull();
  });

  it("requires the core fields", () => {
    expect(signupFieldError({ ...valid, email: "" }, now)).toMatch(/required/i);
  });

  it("rejects a bad username", () => {
    expect(signupFieldError({ ...valid, username: "1lead" }, now)).toMatch(
      /username/i,
    );
  });

  it("rejects under-13 signups", () => {
    expect(
      signupFieldError({ ...valid, dateOfBirth: "2018-01-01" }, now),
    ).toMatch(/13/);
  });

  it("rejects a weak password", () => {
    expect(
      signupFieldError({ ...valid, password: "password", confirmPassword: "password" }, now),
    ).toMatch(/password/i);
  });

  it("rejects mismatched confirmation", () => {
    expect(
      signupFieldError({ ...valid, confirmPassword: "Studio2!" }, now),
    ).toMatch(/match/i);
  });
});

describe("username helpers", () => {
  it("detects taken-username errors", () => {
    expect(isUsernameTakenError("duplicate key")).toBe(true);
    expect(isUsernameTakenError("Invalid login")).toBe(false);
  });

  it("suggests numbered usernames", () => {
    expect(fallbackUsernameSuggestions("tun")).toEqual(["tun1", "tun2", "tun3"]);
  });
});
