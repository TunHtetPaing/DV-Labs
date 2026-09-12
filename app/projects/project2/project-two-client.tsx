import Link from "next/link";
import ProjectComments from "@/app/projects/project-comments";
import { type Comment } from "@/app/projects/comments";

export default function ProjectTwoClient({
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
                CGI Commercial
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                Coca-Cola Refresh
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                A cinematic beverage commercial built in CGI to capture the
                energy, liquid motion, and brand character of Coca-Cola through
                hyper-real fluid simulation and lighting.
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
                poster="/assets/project2/project2.jpg"
                className="h-full w-full object-cover"
              >
                <source src="/assets/project_videos/v2.mp4" type="video/mp4" />
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
                Building a commercial that feels poured, not rendered.
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                This project explores Coca-Cola as a fully digital hero asset.
                The goal was to recreate the physical behavior of liquid,
                condensation, and glass while keeping the brand&apos;s color and
                pacing instantly recognizable.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                The commercial combines fluid simulation, look development,
                lighting, and editorial camera work. Each pass was designed to
                support a single idea: refreshment in motion.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                CGI made it possible to control splash timing, camera paths, and
                lighting setups that would be expensive or unpredictable on a
                practical shoot.
              </p>
            </div>

            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Brand
                  </p>
                  <p className="mt-2 text-sm">Coca-Cola</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Category
                  </p>
                  <p className="mt-2 text-sm">Beverage Commercial</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Services
                  </p>
                  <p className="mt-2 text-sm">
                    Houdini FX, Fluid Sim, Lookdev, Lighting & Animation
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
              01 — Simulation
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Directing liquid as a performance.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The first stage focused on fluid behavior: pour, splash, foam, and
              droplets. Simulations were art-directed so the liquid reads as
              carbonated and heavy, not like generic water.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Timing was treated like animation. Each burst and settle was
              shaped to hit the edit and keep the logo readable through the
              motion.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              02 — Materials
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Glass, syrup, and condensation.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Look development separated the bottle, liquid volume, bubbles, and
              ice. Subtle differences in absorption and roughness keep the drink
              from looking like colored glass.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Condensation and micro-bubbles were added to sell temperature and
              freshness, especially in close-up hero frames.
            </p>
          </div>
        </section>

        <section className="border-y border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              03 — Lighting & Rendering
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Lighting the red so it stays iconic.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Lighting was built to protect the brand red while revealing
              caustics, highlights, and the shape of the bottle. Specular hits
              were controlled so the liquid stays appetizing, not noisy.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The render approach mixed product-commercial lighting with faster,
              more graphic beats for digital playback.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              04 — Animation
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Editing motion into a refresh moment.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Camera and simulation were paced together: a slow pour, a sharp
              splash, then a settle on the product. The sequence is meant to
              feel like a commercial beat, not a tech demo.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The result is a flexible CGI spot that can be recut for longer
              case-study playback or shorter social formats.
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Final Result
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A commercial built entirely in CGI.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Simulation, materials, lighting, and editorial camera come
              together as one brand film. The aim was photoreal liquid with
              enough graphic punch to still read as Coca-Cola in a few seconds.
            </p>
          </div>
        </section>

        <ProjectComments
          projectSlug="project2"
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
              href="/projects/project3"
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
