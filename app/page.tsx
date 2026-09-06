import Link from "next/link";
import { logout } from "@/app/auth/actions";
import { createClient } from "@/lib/supabase/server";

export default async function Home() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const email =
    typeof data?.claims?.email === "string" ? data.claims.email : null;
  const userId = typeof data?.claims?.sub === "string" ? data.claims.sub : null;
  const metadata = data?.claims?.user_metadata;
  const metadataUsername =
    metadata &&
    typeof metadata === "object" &&
    "username" in metadata &&
    typeof metadata.username === "string"
      ? metadata.username
      : null;

  const { data: profile } = userId
    ? await supabase
        .from("profiles")
        .select("username")
        .eq("id", userId)
        .maybeSingle()
    : { data: null };

  const displayName =
    profile?.username ??
    metadataUsername ??
    (email ? email.split("@")[0] : null);

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-zinc-950 text-zinc-950 dark:text-zinc-50">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/80 backdrop-blur dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="flex h-16 w-full items-center justify-between px-6">
          <Link href="/" className="text-lg font-bold tracking-tight">
            DV Labs
          </Link>
          <nav className="flex items-center gap-4">
            {/*  <Link
              href="#projects"
              className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50 hidden sm:block"
            >
              Our Projects
            </Link> */}

            <div className="h-4 w-px bg-zinc-200 dark:bg-zinc-800 hidden sm:block"></div>

            {email ? (
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {/* Profile Icon SVG */}
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-zinc-600 dark:text-zinc-400"
                    >
                      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                      <circle cx="12" cy="7" r="4" />
                    </svg>
                  </div>
                  <span className="hidden text-sm font-medium sm:block">
                    {displayName}
                  </span>
                </div>
                <form action={logout}>
                  <button
                    type="submit"
                    className="h-9 rounded-md border border-zinc-200 px-4 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:text-zinc-50 dark:hover:bg-zinc-900"
                  >
                    Log out
                  </button>
                </form>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link
                  href="/login"
                  className="text-sm font-medium text-zinc-600 transition-colors hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-zinc-50"
                >
                  Log in
                </Link>
                <Link
                  href="/signup"
                  className="inline-flex h-9 items-center rounded-md bg-zinc-950 px-4 text-sm font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
                >
                  Sign up
                </Link>
              </div>
            )}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section with 2-Video Carousel Background */}
        <section className="relative flex min-h-[85vh] w-full items-center justify-center overflow-hidden py-24 sm:py-32 lg:py-40">
          {/* Video carousel animations */}
          <style
            dangerouslySetInnerHTML={{
              __html: `
        @keyframes fade1 {
          0%, 40% { opacity: 1; }
          50%, 90% { opacity: 0; }
          100% { opacity: 1; }
        }

        @keyframes fade2 {
          0%, 40% { opacity: 0; }
          50%, 90% { opacity: 1; }
          100% { opacity: 0; }
        }

        .video-carousel-1 {
          animation: fade1 14s infinite;
        }

        .video-carousel-2 {
          animation: fade2 14s infinite;
        }
      `,
            }}
          />

          {/* Video Background */}
          <div className="absolute inset-0 z-0 bg-zinc-950">
            <video
              autoPlay
              loop
              muted
              playsInline
              className="video-carousel-1 absolute inset-0 h-full w-full object-cover"
            >
              <source src="assets/v_1.mp4" type="video/mp4" />
            </video>

            <video
              autoPlay
              loop
              muted
              playsInline
              className="video-carousel-2 absolute inset-0 h-full w-full object-cover opacity-0"
            >
              <source src="assets/v_4.mp4" type="video/mp4" />
            </video>
          </div>

          {/* Dark overlay */}
          <div className="absolute inset-0 z-10 bg-black/55" />

          {/* Bottom gradient */}
          <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/10 via-transparent to-black/70" />

          {/* Text Overlay */}
          <div className="relative z-20 container mx-auto flex max-w-5xl flex-col items-center px-4 text-center text-white">
            <h1 className="text-4xl font-extrabold tracking-tight drop-shadow-sm sm:text-5xl lg:text-7xl">
              Build your digital presence
              <br className="hidden sm:block" />
              with style and speed.
            </h1>

            <p className="mt-6 max-w-2xl text-lg text-zinc-200 drop-shadow-sm sm:text-xl">
              Showcase your best work, connect with clients, and grow your
              career. Sign up today to create your personalized portfolio and
              access premium features.
            </p>

            <div className="mt-10 flex items-center gap-4">
              <Link
                href="#projects"
                className="inline-flex h-12 items-center justify-center rounded-lg bg-white px-8 text-sm font-semibold text-zinc-950 transition-all hover:scale-105 hover:bg-zinc-200"
              >
                View Our Projects
              </Link>

              <Link
                href="/signup"
                className="inline-flex h-12 items-center justify-center rounded-lg border border-white/30 bg-black/30 px-8 text-sm font-semibold text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/10"
              >
                Get Started
              </Link>
            </div>
          </div>
        </section>
      </main>
      {/* Featured Projects */}
      <section
        id="projects"
        className="w-full border-t border-zinc-200 bg-white py-24 dark:border-zinc-800 dark:bg-zinc-950 sm:py-32"
      >
        <div className="mx-auto w-full max-w-6xl px-6">
          {/* Heading */}
          <div className="mb-12">
            <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-zinc-500 dark:text-zinc-400">
              Featured
            </p>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Our work
            </h2>

            <p className="mt-4 max-w-xl text-zinc-600 dark:text-zinc-400">
              A look at some of the projects we've created.
            </p>
          </div>

          {/* Project cards */}
          <div className="grid gap-6 sm:grid-cols-2">
            <Link
              href="/projects/project1"
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img
                  src="/assets/project1/project1.jpg"
                  alt="Project 1"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  ASUS Zenbook 14 Pro OLED
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Product Visualization
                </h3>
              </div>
            </Link>

            <Link
              href="/projects/project-2"
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img
                  src="/assets/project2/project2.jpg"
                  alt="Project 2"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Cocacola
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Beverage Commercial
                </h3>
              </div>
            </Link>

            <Link
              href="/projects/project3"
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img
                  src="/assets/project3/project3.jpg"
                  alt="Project 3"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Home Office
                </p>

                <h3 className="mt-2 text-xl font-semibold">Interior Design</h3>
              </div>
            </Link>

            <Link
              href="/projects/project-4"
              className="group overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="aspect-[16/10] overflow-hidden bg-zinc-200 dark:bg-zinc-800">
                <img
                  src="/assets/project4/project4.jpg"
                  alt="Project 4"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>

              <div className="p-6">
                <p className="text-xs font-medium uppercase tracking-wider text-zinc-500">
                  Bedroom
                </p>

                <h3 className="mt-2 text-xl font-semibold">Interior Design</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 py-10 dark:border-zinc-800">
        <div className="container mx-auto max-w-5xl px-4 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">
            © {new Date().getFullYear()} Folio. All rights reserved.
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
