# DV Labs — project documentation

How the site is built. Clone and deploy steps: [README](../README.md).

**Live:** [https://dv-labs.vercel.app](https://dv-labs.vercel.app)  
**Repo:** [https://github.com/TunHtetPaing/DV-Labs](https://github.com/TunHtetPaing/DV-Labs)  
Share the production URL, not a `*-git-main-*` Vercel alias.

## What it is

A 3D / motion studio portfolio: homepage (hero, featured work, studio CTA, capabilities, contact), a dedicated real-time 3D viewer at `/studio`, four case studies with comments, a services / pricing page, and Supabase email/password auth.

`main` is the live site. `feature/client-account` is an older branch and is **not** merged (no client portal or payment on production).

## Stack

| Layer       | Choice                                                    |
| ----------- | --------------------------------------------------------- |
| Framework   | Next.js 16.3, App Router, TypeScript                      |
| UI          | React 19, Tailwind CSS 4, Geist fonts                     |
| Auth / data | Supabase (`@supabase/ssr`, `@supabase/supabase-js`)       |
| 3D          | Three.js 0.186, `@react-three/fiber`, `@react-three/drei` |
| Hosting     | Vercel                                                    |

Next.js 16 uses root `proxy.ts` instead of `middleware.ts`. Session refresh and recovery-token redirects run there.

## Repository layout

```
app/
  page.tsx                 Homepage (server: session + profile name)
  featured-work.tsx        Filterable work grid; hover video on pointer devices
  hero-videos.tsx          Hero MP4s; switch on `ended`
  studio/page.tsx          `/studio` — 3D viewer page
  studio-viewer.tsx        Lazy-mounts the canvas after Load 3D scene
  studio-viewer-scene.tsx  R3F scene (preload + clone GLBs, HDRI)
  services/page.tsx        Pricing, process, FAQ
  login/  signup/  forgot-password/  reset-password/
  auth/
    actions.ts             login, signup, logout (reset action unused by UI)
    recovery-redirect.tsx  Client catch for hash / query recovery tokens
    callback/route.ts      PKCE `?code=`
    confirm/route.ts       Email confirm / recovery (`token_hash`)
    reset/route.ts         Recovery code → `/reset-password`
    paths.ts               Safe post-auth paths
  projects/
    comments.ts            Load / post comments
    viewer.ts              Current username
    project-comments.tsx   Comment UI
    project1–4/            Server page + client case study
lib/supabase/
  env.ts                   URL + key at runtime
  server.ts                Cookie server client
  proxy.ts                 Session refresh
  client.ts                Browser client (recovery + reset-password gate)
proxy.ts                   Next.js request proxy
supabase/recovery-email.html   Paste into Supabase if custom SMTP unlocks templates
public/assets/             Videos, stills, GLBs, HDRI
```

Homepage is a server component. Featured-work filters, hero video, and (on `/studio`) Three.js are client islands. Case studies load comments and the viewer name on the server, then hydrate a client page.

## Routes

| Path                 | Purpose                                                     |
| -------------------- | ----------------------------------------------------------- |
| `/`                  | Hero, featured work, studio CTA card, capabilities, contact |
| `/studio`            | Interactive 3D viewer (GLBs after **Load 3D scene**)        |
| `/services`          | Pricing, process, FAQ                                       |
| `/projects/project1` | ASUS product viz (YouTube)                                  |
| `/projects/project2` | Beverage commercial (local MP4)                             |
| `/projects/project3` | Workspace interior (local MP4)                              |
| `/projects/project4` | Bedroom interior (local MP4)                                |
| `/login`             | Email + password                                            |
| `/signup`            | Username, date of birth, email, password                    |
| `/forgot-password`   | In development — no reset emails                            |
| `/reset-password`    | Set a new password after a recovery link                    |
| `/auth/callback`     | Session from `?code=`                                       |
| `/auth/reset`        | Recovery `code` → `/reset-password`                         |
| `/auth/confirm`      | Confirm / recovery from `token_hash` + `type`               |
| `/error`             | Invalid or expired confirm / reset link                     |

Desktop header on `/`: Work (`#work`), Studio (`/studio`), Services, Contact (`#contact`). The studio block is a highlighted card that links to `/studio`; it does **not** mount WebGL on the homepage.

## User flows

**Browse.** `/` loads stills and the hero. Hover on a pointer device may play one featured-work MP4. **Open 3D Viewer** goes to `/studio`. **Load 3D scene** downloads m1–m3 + HDRI once.

**Comment.** Log in → open a case study → post or reply (max 2000 characters). Guests can read comments.

**Auth.** Signup emails confirm via `/auth/confirm`. Forgot-password is a “still in development” page (no `resetPasswordForEmail`). Reset routes stay in the repo for when Supabase custom SMTP can edit the Reset password template.

## Environment

| Name                                   | Required | Notes                           |
| -------------------------------------- | -------- | ------------------------------- |
| `NEXT_PUBLIC_SUPABASE_URL`             | Yes      | `https://….supabase.co`         |
| `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` | Yes      | Publishable or legacy anon JWT  |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY`        | Fallback | If the publishable key is unset |
| `SUPABASE_URL` / `SUPABASE_ANON_KEY`   | Fallback | Also accepted by `env.ts`       |

Copy `.env.example` → `.env.local`. Do not commit `.env.local`.

`getSupabasePublicEnv()` reads `process.env[name]` dynamically so Next does not inline an empty string at build time. After adding keys on Vercel, **Redeploy**.

Missing env: marketing pages still render. Login and signup show _Auth is not configured on this server._ Comments return empty / unavailable.

## Auth

- Email/password: `signInWithPassword` / `signUp` in `app/auth/actions.ts`.
- Signup metadata: `username`, `date_of_birth`.
- Username: 3–20 characters, starts with a letter, then letters, numbers, or `_`.
- Password: at least 8 characters, including a letter, a number, and a special character.
- Must be at least 13 years old.
- Confirm email: `origin/auth/confirm`.
- Session refresh: `proxy.ts` → `updateSession` → `getClaims()`.
- Logout clears the session and redirects to `/`.

**Password reset (partial).** `/forgot-password` does not send mail. `requestPasswordReset` remains in `actions.ts` but the form was removed. `/auth/reset`, `/auth/confirm` (recovery), `/reset-password`, `RecoveryRedirect`, and `proxy.ts` `redirectRecoveryTokens` still forward `code` / `token_hash` / `type=recovery` if an old email opens `/`. Supabase locks HTML templates behind custom SMTP; `supabase/recovery-email.html` is the intended Reset password body when that is enabled.

Supabase (production):

- **Site URL:** `https://dv-labs.vercel.app`
- **Redirect URLs:** `https://dv-labs.vercel.app/**` and `http://localhost:3000/**`

## Comments and profiles

Tables and triggers live in the Supabase project, not in this repo.

**`profiles`**

- `id` (auth user id), `username`
- Homepage and project pages: profile username, else metadata username, else email local-part.

**`comments`**

- `id`, `project_slug`, `parent_id`, `username`, `body`, `created_at`
- Inserts send `project_slug`, `parent_id`, `body`. `username` is filled by a DB trigger.
- Slugs: `project1` … `project4`.
- Logged in to post. Max 2000 characters. Replies use `parent_id`.

**RPC**

- `suggest_available_usernames(base)` — signup when the username is taken (`profiles_username_lower_idx` or similar).

## 3D studio viewer (`/studio`)

- Files: `/assets/3D_models/m1.glb`, `m2.glb`, `m3.glb`
- Environment: `/assets/HDRI/hdr1.exr`
- Canvas mounts after **Load 3D scene**. That click `useGLTF.preload`s all three GLBs so next/previous is instant.
- One model at a time. Arrows and left/right keys.
- Each display **clones** the cached GLB so reversing 3→2→1 still renders (R3F would otherwise dispose the cached scene).
- `useProgress` overlay only while a download is **active**.
- Scrolling away stops auto-rotate; the canvas stays mounted (no reload overlay).
- Mesh fitted onto `y = 0` with contact shadows.
- Sketchfab: [https://sketchfab.com/Tun.Htet.Paing/models](https://sketchfab.com/Tun.Htet.Paing/models)

## Media and performance

`public/assets/` holds full MP4s, GLBs, and an EXR. They are large and committed without Git LFS.

| Surface       | When it downloads                                                                                                                                                  |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Hero          | `v1.mp4` then `v4.mp4`, swap on `ended`. Pauses off-screen. **Does** autoplay on mobile.                                                                           |
| Featured Work | JPG first. Hover clip after ~150ms on devices with hover; spinner until play. One card at a time. `(hover: none)`, reduced motion, Save-Data, and 2G skip the MP4. |
| `/studio`     | Nothing until **Load 3D scene**, then m1–m3 + HDRI.                                                                                                                |
| Case studies  | Project 1: YouTube. 2–4: local MP4 with `preload="metadata"`.                                                                                                      |

`proxy.ts` matcher skips `mp4`, `webm`, `glb`, `gltf`, `exr`, `hdr`, and common images so the CDN is not blocked by session refresh.

Further gains: short 720p hover clips, Draco/gltfpack GLBs, smaller HDR, and a still/poster hero on mobile (hero still autoplays today).

Contact in the UI: `contact.dvlabs@gmail.com`.

## Adding a case study

1. Add a slug under `app/projects/projectN/` (server `page.tsx` + client).
2. Register the slug in `app/projects/comments.ts` `PROJECT_PATHS`.
3. Add a card to `FEATURED_PROJECTS` in `app/page.tsx` (thumbnail + hover MP4 + href).
4. Add stills/video under `public/assets/`.

## Deploy checklist

1. Push `main` → GitHub. Vercel project **DV-Labs** builds production.
2. Vercel **Settings → Environment Variables**: same names as `.env.example` for **Production**.
3. After any env change: **Redeploy**.
4. Supabase Site URL + Redirect URLs include `https://dv-labs.vercel.app`.
5. Share [https://dv-labs.vercel.app](https://dv-labs.vercel.app).

## Known gaps

- No `not-found.tsx`, About, or legal pages.
- Comment / profile SQL is not in the repo.
- Forgot-password UI does not send email (SMTP / template lock).
- Case-study `dark:` classes never apply (`<html>` has no `dark` class).
- Large media in `public/` (no Git LFS).
- Hero autoplay on mobile still costs bandwidth.
- Console may warn that `PCFSoftShadowMap` was removed in this Three.js build.
- `feature/client-account` (payment / account) is not on `main`.
