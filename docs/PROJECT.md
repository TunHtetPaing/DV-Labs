# DV Labs — project documentation

This file describes how the site is built. For clone and deploy steps, see the [README](../README.md).

## What it is

A studio portfolio: homepage with featured work and a real-time 3D viewer, four case-study pages, a services/pricing page, and Supabase email/password auth so logged-in visitors can comment on projects.

## Stack

| Layer       | Choice                                                    |
| ----------- | --------------------------------------------------------- |
| Framework   | Next.js 16.3, App Router                                  |
| UI          | React 19, Tailwind CSS 4, Geist fonts                     |
| Auth / data | Supabase (`@supabase/ssr`, `@supabase/supabase-js`)       |
| 3D          | Three.js 0.186, `@react-three/fiber`, `@react-three/drei` |
| Hosting     | Vercel                                                    |

Next.js 16 uses `proxy.ts` at the repo root instead of `middleware.ts`. Session refresh lives there.

## Repository layout

```
app/
  page.tsx                 Homepage (server: session + profile name)
  featured-work.tsx        Filterable work grid; video on hover
  hero-videos.tsx          Hero MP4s (second clip delayed)
  studio-viewer.tsx        Lazy-mounts the 3D canvas
  studio-viewer-scene.tsx  R3F scene (GLB + HDRI)
  services/page.tsx        Pricing, process, FAQ
  login/  signup/  forgot-password/  reset-password/
  auth/
    actions.ts             login, signup, password reset, logout
    callback/route.ts      OAuth / PKCE code exchange
    confirm/route.ts       Email confirm / recovery (token_hash)
    reset/route.ts         Password-reset email callback
    paths.ts               Safe post-auth redirect paths
  projects/
    comments.ts            Load / post comments
    viewer.ts              Current username
    project-comments.tsx   Comment UI
    project1–4/            Server page + client case study
lib/supabase/
  env.ts                   Reads URL + key at runtime
  server.ts                Cookie-based server client
  proxy.ts                 Session refresh for the request proxy
  client.ts                Browser client (unused by current forms)
proxy.ts                   Next.js request proxy
public/assets/             Videos, stills, GLBs, HDRI
```

The homepage is a server component. Filters, hero video, and Three.js are client islands. Case studies load comments and the viewer name on the server, then render a client page.

## Routes

| Path                 | Purpose                                                   |
| -------------------- | --------------------------------------------------------- |
| `/`                  | Hero, featured work, studio viewer, capabilities, contact |
| `/services`          | Pricing, process, FAQ                                     |
| `/projects/project1` | ASUS product viz (YouTube embed)                          |
| `/projects/project2` | Beverage commercial (local MP4)                           |
| `/projects/project3` | Workspace interior (local MP4)                            |
| `/projects/project4` | Bedroom interior (local MP4)                              |
| `/login`             | Email + password                                          |
| `/signup`            | Username, date of birth, email, password                  |
| `/forgot-password`   | Request a password reset email                            |
| `/reset-password`    | Set a new password after the email link                   |
| `/auth/callback`     | Session exchange from `?code=`                            |
| `/auth/reset`        | Password-reset email → `/reset-password`                  |
| `/auth/confirm`      | Email confirm from `token_hash` + `type`                  |
| `/error`             | Invalid or expired confirm / reset link                   |

## Environment

| Name                                   | Required | Notes                                 |
| -------------------------------------- | -------- | ------------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Yes      | `https://….supabase.co`               |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes      | Publishable or legacy anon JWT        |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | Fallback | Used if the publishable key is unset  |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY`   | Fallback | Alternate names `env.ts` also accepts |

`getSupabasePublicEnv()` reads `process.env[name]` dynamically so Next.js does not inline an empty value at build time. That matters on Vercel: if keys are added after the first deploy, a **Redeploy** is still required, but a cached empty inlined string is less likely to stick.

If env is missing, marketing pages still render. Login and signup return _Auth is not configured on this server._

## Auth

- Email/password via `signInWithPassword` / `signUp` in `app/auth/actions.ts`.
- Signup stores `username` and `date_of_birth` in user metadata.
- Username: 3–20 characters, starts with a letter, then letters, numbers, or `_`.
- Password: at least 8 characters, including a letter, a number, and a special character.
- Must be at least 13 years old.
- Signup confirmation email uses `origin/auth/confirm`.
- Password reset: `/forgot-password` emails a link to `origin/auth/reset`, which starts a session and sends the user to `/reset-password`. If the email still lands on `/` (default Supabase template puts tokens in the URL hash), `RecoveryRedirect` in the root layout sends the user to `/reset-password`. Recovery links that use `token_hash` + `type=recovery` go through `/auth/confirm` to the same page. After a successful update they are signed out and sent to `/login?reset=1`. Same password rules as signup.

  In Supabase → **Authentication → Email Templates → Reset password**, use this link so the server can read the token (optional if the in-app catcher is enough):

  `{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password`

  Redirect URLs must include `http://localhost:3000/**` and `https://dv-labs.vercel.app/**`.

- Session cookies are refreshed on each matched request in `proxy.ts` → `updateSession` → `getClaims()`.
- Logout clears the session and redirects to `/`.

Supabase dashboard (production):

- **Site URL:** `https://dv-labs.vercel.app`
- **Redirect URLs:** that origin (`/**`, `/auth/confirm`, `/auth/callback`) plus `http://localhost:3000/**`

## Comments and profiles

Tables and triggers live in the Supabase project, not in this repo.

**`profiles`**

- `id` (auth user id)
- `username`
- Homepage and project pages read this for the display name (fallback: metadata username, then email local-part).

**`comments`**

- `id`, `project_slug`, `parent_id`, `username`, `body`, `created_at`
- Inserts from the app send `project_slug`, `parent_id`, `body`. `username` is expected to be filled by a database trigger.
- Slugs: `project1`, `project2`, `project3`, `project4`.
- Must be logged in to post. Max 2000 characters. Replies nest under `parent_id`.

**RPC**

- `suggest_available_usernames(base)` — used when signup hits a taken username (`profiles_username_lower_idx` or similar).

## 3D studio viewer

- Files: `/assets/3D_models/m1.glb`, `m2.glb`, `m3.glb`
- Environment: `/assets/HDRI/hdr1.exr`
- The canvas mounts only when the section is near the viewport (`IntersectionObserver`, 240px root margin).
- One model at a time. Previous/next buttons and left/right arrow keys.
- `useProgress` overlay while GLB/HDRI load.
- Mesh is fitted and sat on `y = 0` with contact shadows.
- Sketchfab: [https://sketchfab.com/Tun.Htet.Paing/models](https://sketchfab.com/Tun.Htet.Paing/models)

## Media and performance

`public/assets/` holds full MP4s, GLBs, and an EXR. Those files are large.

Current loading rules:

- `proxy.ts` does **not** run on `mp4`, `webm`, `glb`, `gltf`, `exr`, `hdr`, or common images. Media hits the CDN without a Supabase session check.
- Featured Work shows a still; the preview MP4 is attached only on hover.
- Hero plays `v1.mp4` immediately and starts `v4.mp4` after 4 seconds.
- Unused GLBs are not preloaded.

Further gains require compressing assets (short 720p hover clips, Draco/gltfpack GLBs, smaller HDR).

Contact used in the UI: `contact.dvlabs@gmail.com`.

## Deploy checklist

1. `main` on GitHub is connected to the Vercel project **DV-Labs**.
2. Production env vars match `.env.local` (names above).
3. After any env change: Vercel **Redeploy** (avoid a stale build cache if auth still looks unconfigured).
4. Supabase Site URL + Redirect URLs include `https://dv-labs.vercel.app`.
5. Share [https://dv-labs.vercel.app](https://dv-labs.vercel.app), not a `*-git-main-*` alias.

## Known gaps

- No `not-found.tsx`, About, or legal pages.
- Comment trigger SQL and table definitions are not in the repo.
- `lib/supabase/client.ts` is used by password recovery and the reset-password page.
- Case-study pages use `dark:` classes, but `<html>` has no `dark` class, so they stay light.
- Large media is committed under `public/` (no Git LFS).
- Console may warn that `PCFSoftShadowMap` was removed in the current Three.js build.
