# DV Labs

Portfolio site for **DV Labs**, a 3D and motion studio. It shows case studies, services and pricing, an in-browser 3D viewer at `/studio`, and optional login for project comments.

**Live site:** [https://dv-labs.vercel.app](https://dv-labs.vercel.app)

Use that URL when sharing the project. Vercel also creates branch URLs such as `dv-labs-git-main-…vercel.app`; those can sit behind a Vercel login wall and should not be sent to clients.

Technical detail (routes, auth, database, 3D, deploy): [docs/PROJECT.md](docs/PROJECT.md).

## Stack

- Next.js 16 (App Router) and React 19
- Tailwind CSS 4
- Supabase Auth and Postgres
- Three.js / React Three Fiber / Drei
- Hosted on Vercel

## Local setup

```bash
git clone https://github.com/TunHtetPaing/DV-Labs.git
cd DV-Labs
npm install
```

Copy `.env.example` to `.env.local` and add your Supabase values:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
```

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

| Script          | Purpose                    |
| --------------- | -------------------------- |
| `npm run dev`   | Local development          |
| `npm run build` | Production build           |
| `npm run start` | Serve the production build |
| `npm run lint`  | ESLint                     |

Do not commit `.env.local`.

## Production

1. Push `main` to GitHub. Vercel builds automatically.
2. In Vercel → **Settings → Environment Variables**, add the same two keys for **Production**.
3. **Redeploy** after adding or changing env vars. Without them, the studio site still loads, but login shows _Auth is not configured on this server._
4. In Supabase → **Authentication → URL configuration**, set Site URL and Redirect URLs to `https://dv-labs.vercel.app` (keep localhost for local work).

Contact: [contact.dvlabs@gmail.com](mailto:contact.dvlabs@gmail.com)
