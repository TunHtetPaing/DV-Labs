import { expect, test } from "@playwright/test";

test("homepage shows work and the studio CTA", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: "Featured Work" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: /open 3d viewer/i }),
  ).toBeVisible();
});

test("studio page waits to load models", async ({ page }) => {
  await page.goto("/studio");
  await expect(
    page.getByRole("heading", { name: "Studio Viewer" }),
  ).toBeVisible();
  await expect(page.getByText("Load 3D scene")).toBeVisible();
});

test("login form is reachable", async ({ page }) => {
  await page.goto("/login");
  await expect(page.getByRole("heading", { name: /log in/i })).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
});

test("forgot-password is marked in development", async ({ page }) => {
  await page.goto("/forgot-password");
  await expect(page.getByText(/still in development/i)).toBeVisible();
});
