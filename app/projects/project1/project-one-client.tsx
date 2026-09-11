import Link from "next/link";
import ProjectComments from "@/app/projects/project-comments";
import { type Comment } from "@/app/projects/comments";

export default function ProjectOneClient({
  username,
  comments,
}: {
  username: string | null;
  comments: Comment[];
}) {
  return (
    <div className="min-h-screen bg-white text-zinc-950 dark:bg-zinc-950 dark:text-zinc-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex h-16 w-full items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            DV Labs
          </Link>

          <nav>
            <Link
              href="/#projects"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Projects
            </Link>
          </nav>
        </div>
      </header>

      <main>
        {/* Project Header */}
        <section className="px-6 pb-16 pt-20 sm:pb-20 sm:pt-28">
          <div className="mx-auto max-w-6xl">
            <div className="max-w-4xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                3D Product Visualization
              </p>

              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                ASUS Zenbook Pro 14 OLED
              </h1>

              <p className="mt-6 max-w-3xl text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                A photorealistic 3D product visualization created to showcase
                the design, materials, and premium character of the ASUS Zenbook
                Pro 14 OLED through cinematic product animation.
              </p>
            </div>
          </div>
        </section>

        {/* Main Video */}
        <section className="px-6">
          <div className="mx-auto max-w-6xl">
            <div className="aspect-video overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
              <iframe
                className="h-full w-full"
                src="https://www.youtube.com/embed/PeWQjcL1w3A?si=isg5HnRaAqNSOX3j"
                title="ASUS Zenbook Pro 14 OLED Visualization"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </section>

        {/* Project Overview */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[1fr_280px]">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
                Overview
              </p>

              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                Translating a physical product into a digital experience.
              </h2>

              <p className="mt-6 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                This project explores the ASUS Zenbook Pro 14 OLED as a fully
                digital 3D product asset. The focus was not only on reproducing
                the physical appearance of the laptop, but also on creating a
                visual presentation that communicates its premium design.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                The visualization combines detailed 3D modeling, realistic
                materials, controlled lighting, camera composition, and
                animation. Each element was developed to work together as part
                of a cohesive product presentation.
              </p>

              <p className="mt-5 text-base leading-8 text-zinc-600 dark:text-zinc-400">
                Product visualization provides the flexibility to explore
                perspectives, lighting conditions, and camera movements that
                would be difficult or expensive to achieve with traditional
                product photography.
              </p>
            </div>

            {/* Details */}
            <div className="border-t border-zinc-200 pt-6 dark:border-zinc-800 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
              <div className="space-y-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Brand
                  </p>
                  <p className="mt-2 text-sm">ASUS</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Category
                  </p>
                  <p className="mt-2 text-sm">Product Visualization</p>
                </div>

                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                    Services
                  </p>
                  <p className="mt-2 text-sm">
                    3D Modeling, Materials, Lighting, Rendering & Animation
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

        {/* Section 01 */}
        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              01 — Modeling
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Building the product from the ground up.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The first stage focused on creating a clean and accurate digital
              representation of the laptop. The geometry was developed around
              the product&apos;s proportions, distinctive silhouette, and
              individual components.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Particular attention was given to the transitions between surfaces
              and the small details that become important when a product is
              presented through close-up camera shots.
            </p>
          </div>
        </section>

        {/* Section 02 */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              02 — Materials
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Creating believable surfaces.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Material development was an important part of establishing the
              realism of the visualization. Different surface properties were
              considered for the chassis, display, keyboard, glass, and other
              components.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              Rather than relying on a single generic material, subtle
              differences in roughness, reflection, and surface response help
              each component react naturally to the lighting environment.
            </p>
          </div>
        </section>

        {/* Section 03 */}
        <section className="border-y border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              03 — Lighting & Rendering
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Shaping the product with light.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              Lighting was designed to emphasize the laptop&apos;s form while
              maintaining a clean and premium visual style. Reflections and
              highlights were carefully controlled to reveal the geometry
              without distracting from the product.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The final composition combines product-photography principles with
              cinematic camera movement, creating a presentation that feels
              polished while keeping the product as the central focus.
            </p>
          </div>
        </section>

        {/* Section 04 */}
        <section className="px-6 py-20 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              04 — Animation
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Turning the visualization into a story.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The animation was created to progressively reveal the product
              rather than simply rotate it in space. Camera movement, pacing,
              composition, and transitions work together to guide attention
              through the design.
            </p>

            <p className="mt-5 leading-8 text-zinc-600 dark:text-zinc-400">
              The result is a flexible digital product presentation that can
              communicate the physical qualities of the device without relying
              entirely on traditional photography.
            </p>
          </div>
        </section>

        {/* Closing */}
        <section className="border-t border-zinc-200 px-6 py-20 dark:border-zinc-800 sm:py-28">
          <div className="mx-auto max-w-3xl">
            <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Final Result
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              A product built for the digital world.
            </h2>

            <p className="mt-6 leading-8 text-zinc-600 dark:text-zinc-400">
              The completed visualization brings modeling, material design,
              lighting, rendering, and animation into one cohesive product
              experience. The goal was to create imagery that feels physically
              believable while taking advantage of the creative freedom offered
              by a fully digital workflow.
            </p>
          </div>
        </section>

        <ProjectComments
          projectSlug="project1"
          username={username}
          comments={comments}
        />

        {/* Project Navigation */}
        <section className="border-t border-zinc-200 px-6 py-12 dark:border-zinc-800">
          <div className="mx-auto flex max-w-6xl items-center justify-between">
            <Link
              href="/#projects"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              ← All Projects
            </Link>

            <Link
              href="/projects/project2"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Next Project →
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} DV Labs. All rights reserved.
          </p>

          <div className="flex gap-6">
            <Link
              href="#"
              className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              Twitter
            </Link>

            <Link
              href="#"
              className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              GitHub
            </Link>

            <Link
              href="#"
              className="text-sm text-zinc-500 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
            >
              LinkedIn
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
