import Link from "next/link";
import ProjectComments from "@/app/projects/project-comments";
import { type Comment } from "@/app/projects/comments";

export default function ProjectFourClient({
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
                Modern Sanctuary
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                A bedroom visual identity developed as architectural
                visualization, with emphasis on material warmth, rest, and a
                quiet evening atmosphere.
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
                poster="/assets/project4/project4.jpg"
                className="h-full w-full object-cover"
              >
                <source src="/assets/project_videos/v4.mp4" type="video/mp4" />
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
                Building a bedroom that feels private on camera.
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                This project treats the bedroom as a complete interior identity:
                bed, textiles, storage, and the way light falls after sunset.
                The brief was comfort without visual clutter.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                Modeling, material painting, and lighting were developed as one
                look. Soft surfaces were given enough break-up to stay
                believable in close-up, while the wider shots stay simple.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                ArchViz here is used as a design tool: testing palette, lamp
                placement, and camera height before a physical space exists.
              </p>
            </div>

            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Concept
                  </p>
                  <p className="mt-2 text-sm">Bedroom</p>
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
                    ArchViz, Substance Painter, Lighting & Animation
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
              01 — Modeling
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shaping the room around rest.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Geometry was built from the bed outward: headboard, side tables,
              wardrobe, and window reveal. Proportions were checked so the room
              feels generous without becoming a hotel suite.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Soft furnishings were modeled with enough fold and thickness to
              catch light, especially along the bedding and curtains.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              02 — Materials
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Painting warmth into fabric and wood.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Substance Painter was used to break up linen, wood, and plaster so
              surfaces don&apos;t read as flat shaders. Color stays muted, with
              small shifts in roughness across the bed and floor.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The material story is warmth and touch: nothing high-gloss except
              a few lamp and metal details.
            </p>
          </div>
        </section>

        <section className="border-y border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              03 — Lighting
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Evening light as the identity.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Practical lamps and a low sun angle set the mood. Highlights were
              kept soft so the space feels restful instead of product-lit.
              Window light is secondary, used as a cool edge.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Multiple lighting states were compared to find a look that still
              photographs well without losing the sanctuary feeling.
            </p>
          </div>
        </section>

        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              04 — Camera
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Slow moves that stay at human height.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The camera stays close to how someone would enter the room: across
              the bed, past the lamp, then a wider settle. Movement is slow so
              materials and lighting can be read.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The finished sequence works as a visual identity piece for the
              interior, not only as a single hero still.
            </p>
          </div>
        </section>

        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Final Result
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              An interior identity built for rest.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Modeling, painted materials, and evening lighting form one bedroom
              look. The aim was a space that feels private, warm, and finished
              enough to present as a design direction.
            </p>
          </div>
        </section>

        <ProjectComments
          projectSlug="project4"
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
              href="/projects/project1"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              First Project →
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
