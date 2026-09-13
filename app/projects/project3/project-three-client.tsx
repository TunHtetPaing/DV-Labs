import Link from "next/link";
import ProjectComments from "@/app/projects/project-comments";
import { type Comment } from "@/app/projects/comments";

export default function ProjectThreeClient({
  username,
  comments,
}: {
  username: string | null;
  comments: Comment[];
}) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex h-16 w-full items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            DV Labs
          </Link>

          <nav>
            <Link
              href="/#work"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Projects
            </Link>
          </nav>
        </div>
      </header>

      <main>
        <section className="px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Interior Design
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Minimalist Workspace
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                A home office architectural concept visualized in Unreal Engine
                to study daylight, material quietness, and a focused working
                atmosphere.
              </p>
            </div>
          </div>
        </section>

        <section className="px-6">
          <div className="mx-auto max-w-6xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              <video
                controls
                playsInline
                preload="metadata"
                poster="/assets/project3/project3.jpg"
                className="h-full w-full object-cover"
              >
                <source src="/assets/project_videos/v3.mp4" type="video/mp4" />
              </video>
            </div>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Overview
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Designing a room that stays out of the way.
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                This project explores a compact home office as a fully digital
                interior. The emphasis was on proportion, daylight, and a
                restrained material palette that supports concentration.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                Layout, furniture scale, and camera height were developed
                together so the space reads as usable, not as a showroom still.
                Lighting studies were used to test morning and late afternoon
                conditions.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                Real-time visualization made it possible to iterate on finishes
                and window treatment without rebuilding the entire scene for
                each option.
              </p>
            </div>

            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Concept
                  </p>
                  <p className="mt-2 text-sm">Home Office</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Category
                  </p>
                  <p className="mt-2 text-sm">Interior Design</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Services
                  </p>
                  <p className="mt-2 text-sm">
                    Spatial Design, Lighting, Unreal Engine & Lookdev
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Year
                  </p>
                  <p className="mt-2 text-sm">2026</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              01 — Spatial Layout
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Planning circulation around the desk.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The plan starts with the work surface and window. Storage,
              seating, and walking paths were arranged so the room stays open
              while still feeling complete.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Camera studies checked whether the layout still reads clearly from
              standing and seated eye height.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              02 — Materials
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Quiet surfaces, not empty ones.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Finishes were kept limited: pale plaster, light wood, matte metal,
              and a single darker accent for the desk. Grain and roughness were
              tuned so close-ups still feel tactile.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The palette is meant to recede, leaving daylight and the
              silhouette of the furniture as the main composition.
            </p>
          </div>
        </section>

        <section className="border-y border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              03 — Lighting
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Letting the window do the work.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Natural light is the primary source. Soft fill was added only
              where the desk would otherwise fall into silhouette. Shadows were
              kept long enough to describe volume without going muddy.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Real-time exposure and color temperature were used to compare cool
              morning light against a warmer late-day look.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              04 — Camera
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Moving through the room, not around a render.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The sequence is paced like a walkthrough: arrive at the window,
              settle on the desk, then pull back to show the full volume. Slow
              camera moves keep the architecture readable.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The result is a compact interior film that can be used as a
              concept presentation or a longer case-study loop.
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Final Result
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A workspace defined by light and restraint.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Layout, materials, and daylight come together as one calm
              interior. The aim was a room that feels designed for work, not
              staged for a still image.
            </p>
          </div>
        </section>

        <ProjectComments
          projectSlug="project3"
          username={username}
          comments={comments}
        />

        <section className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/#work"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← All Projects
            </Link>

            <Link
              href="/projects/project4"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Next Project →
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} DV Labs. All rights reserved.
          </p>

          <a
            href="mailto:contact.dvlabs@gmail.com"
            className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            contact.dvlabs@gmail.com
          </a>
        </div>
      </footer>
    </div>
  );
}
