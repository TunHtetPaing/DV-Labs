import Link from "next/link";
import { logout } from "@/app/auth/actions";
import FeaturedWork, { type FeaturedProject } from "@/app/featured-work";
import StudioViewer from "@/app/studio-viewer";
import { createOptionalClient } from "@/lib/supabase/server";

// ============================================================================
// TYPES & DATA STRUCTURES
// Extract these to separate data files (e.g., @/data/projects.ts) as the studio grows.
// ============================================================================

const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "project1",
    title: "Product Visualization",
    client: "ASUS Zenbook 14 Pro OLED",
    category: "product",
    tags: ["Product Viz", "Octane Render", "Lookdev"],
    thumbnailImg: "/assets/project1/project1.jpg",
    previewVideo: "/assets/project_videos/v1.mp4",
    href: "/projects/project1",
  },
  {
    id: "project2",
    title: "Beverage Commercial",
    client: "Coca-Cola Refresh",
    category: "commercial",
    tags: ["CGI Commercial", "Houdini FX", "Fluid Sim"],
    thumbnailImg: "/assets/project2/project2.jpg",
    previewVideo: "/assets/project_videos/v2.mp4",
    href: "/projects/project2",
  },
  {
    id: "project3",
    title: "Minimalist Workspace",
    client: "Home Office Architectural Concept",
    category: "interior",
    tags: ["Interior Design", "Lighting", "Unreal Engine"],
    thumbnailImg: "/assets/project3/project3.jpg",
    previewVideo: "/assets/project_videos/v3.mp4",
    href: "/projects/project3",
  },
  {
    id: "project4",
    title: "Modern Sanctuary",
    client: "Bedroom Visual Identity",
    category: "interior",
    tags: ["Interior Design", "ArchViz", "Substance Painter"],
    thumbnailImg: "/assets/project4/project4.jpg",
    previewVideo: "/assets/project_videos/v4.mp4",
    href: "/projects/project4",
  },
];

const STUDIO_CAPABILITIES = [
  {
    number: "01",
    title: "3D Product Visualization",
    description:
      "High-precision CGI renders and hyper-realistic product showcases for hardware, luxury goods, and tech devices.",
  },
  {
    number: "02",
    title: "CGI Commercials & Motion",
    description:
      "Dynamic visual effects, liquid simulations, and broadcast-ready brand films built for digital platforms.",
  },
  {
    number: "03",
    title: "Look Development & R&D",
    description:
      "Custom procedural materials, lighting systems, and cinematic aesthetic direction for ambitious campaigns.",
  },
  {
    number: "04",
    title: "Real-Time & Interactive 3D",
    description:
      "Interactive 3D web experiences, Unreal Engine environments, and immersive VR setups.",
  },
];

const CLIENT_LOGOS = [
  "ASUS",
  "COCA-COLA",
  "NVIDIA",
  "SAMSUNG",
  "LOGITECH",
  "SONY",
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default async function Home() {
  let email: string | null = null;
  let displayName: string | null = null;

  try {
    const supabase = await createOptionalClient();
    if (supabase) {
      const { data } = await supabase.auth.getClaims();
      email =
        typeof data?.claims?.email === "string" ? data.claims.email : null;
      const userId =
        typeof data?.claims?.sub === "string" ? data.claims.sub : null;
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

      displayName =
        profile?.username ??
        metadataUsername ??
        (email ? email.split("@")[0] : null);
    }
  } catch {
    email = null;
    displayName = null;
  }

  return (
    <div className="relative min-h-screen flex flex-col bg-zinc-950 text-zinc-50 overflow-x-hidden selection:bg-cyan-500 selection:text-zinc-950">
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />
        <div className="absolute -bottom-40 -right-40 h-[500px] w-[500px] rounded-full bg-fuchsia-500/20 blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-tr from-cyan-500/10 via-transparent to-fuchsia-500/10 blur-[140px]" />
        <div
          className="absolute inset-0 opacity-[0.2] mix-blend-screen"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent,rgba(9,9,11,0.35)_70%,rgba(9,9,11,0.75)_100%)]" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col">
        {/* 
        ------------------------------------------------------------------------
        1. NAVIGATION HEADER
        ------------------------------------------------------------------------
      */}
        <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
          <div className="flex h-16 w-full items-center justify-between px-6 max-w-7xl mx-auto">
            <Link href="/" className="flex items-center gap-2 group">
              <span className="text-xl font-black tracking-wider uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent">
                DV Labs
              </span>
              <span className="rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 tracking-wide">
                3D STUDIO
              </span>
            </Link>

            <nav className="flex items-center gap-6">
              <Link
                href="#work"
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white hidden sm:block"
              >
                Work
              </Link>
              <Link
                href="/services"
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white hidden sm:block"
              >
                Services
              </Link>
              <Link
                href="#contact"
                className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white hidden sm:block"
              >
                Contact
              </Link>

              <div className="h-4 w-px bg-zinc-800 hidden sm:block"></div>

              {/* Auth navigation */}
              {email ? (
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800 border border-zinc-700">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-3.5 w-3.5 text-zinc-300"
                      >
                        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
                        <circle cx="12" cy="7" r="4" />
                      </svg>
                    </div>
                    <span className="hidden text-xs font-medium text-zinc-300 sm:block">
                      {displayName}
                    </span>
                  </div>
                  <form action={logout}>
                    <button
                      type="submit"
                      className="h-8 rounded border border-zinc-800 px-3 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-white"
                    >
                      Log out
                    </button>
                  </form>
                </div>
              ) : (
                <div className="flex items-center gap-3">
                  <Link
                    href="/login"
                    className="text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white"
                  >
                    Log in
                  </Link>
                  <Link
                    href="#contact"
                    className="inline-flex h-8 items-center rounded bg-white px-3.5 text-xs font-semibold text-zinc-950 transition-transform hover:scale-105"
                  >
                    Start Project
                  </Link>
                </div>
              )}
            </nav>
          </div>
        </header>

        <main className="flex-1">
          {/* 
          ------------------------------------------------------------------------
          2. HERO SECTION
          Cinematic video background with studio positioning copy.
          ------------------------------------------------------------------------
        */}
          <section className="relative flex min-h-[90vh] w-full items-center justify-center overflow-hidden py-24 sm:py-32">
            {/* Keyframe animation inline styles for dual video crossfade */}
            <style
              dangerouslySetInnerHTML={{
                __html: `
                @keyframes fade1 {
                  0%, 45% { opacity: 1; }
                  50%, 95% { opacity: 0; }
                  100% { opacity: 1; }
                }
                @keyframes fade2 {
                  0%, 45% { opacity: 0; }
                  50%, 95% { opacity: 1; }
                  100% { opacity: 0; }
                }
                .video-carousel-1 { animation: fade1 16s infinite; }
                .video-carousel-2 { animation: fade2 16s infinite; }
              `,
              }}
            />

            {/* Background Video Reel Loop */}
            <div className="absolute inset-0 z-0 bg-zinc-950">
              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-carousel-1 absolute inset-0 h-full w-full object-cover scale-105 filter brightness-75"
              >
                <source src="/assets/project_videos/v1.mp4" type="video/mp4" />
              </video>

              <video
                autoPlay
                loop
                muted
                playsInline
                className="video-carousel-2 absolute inset-0 h-full w-full object-cover opacity-0 scale-105 filter brightness-75"
              >
                <source src="/assets/project_videos/v4.mp4" type="video/mp4" />
              </video>
            </div>

            {/* Vignette & Gradients Overlay */}
            <div className="absolute inset-0 z-10 bg-black/60" />
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-zinc-950 via-transparent to-black/40" />

            {/* Hero Content Overlay */}
            <div className="relative z-20 container mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
              {/* Status Indicator */}
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-zinc-700/60 bg-zinc-900/80 px-3.5 py-1 text-xs text-zinc-300 backdrop-blur-md">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for Q3/Q4 Commissions
              </div>

              {/* Primary Headline */}
              <h1 className="text-4xl font-black tracking-tight sm:text-6xl lg:text-7xl uppercase leading-[1.05]">
                Crafting High-Impact <br />
                <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                  3D Visuals & Motion
                </span>
              </h1>

              {/* Subtitle */}
              <p className="mt-6 max-w-2xl text-base text-zinc-300 sm:text-lg leading-relaxed">
                DV Labs is a digital design studio specializing in CGI product
                visualization, cinematic commercial motion, and high-fidelity 3D
                brand experiences.
              </p>

              {/* Call to Actions */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <Link
                  href="#work"
                  className="inline-flex h-12 items-center justify-center rounded bg-white px-8 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105"
                >
                  Explore Selected Work
                </Link>

                <Link
                  href="#contact"
                  className="inline-flex h-12 items-center justify-center rounded border border-zinc-700 bg-zinc-900/80 px-8 text-xs font-bold uppercase tracking-wider text-white backdrop-blur-md transition-all hover:border-zinc-500 hover:bg-zinc-800 hover:scale-105"
                >
                  Get In Touch
                </Link>
              </div>
            </div>
          </section>

          {/* 
          ------------------------------------------------------------------------
          3. CLIENT TRUST / BRAND MARQUEE
          Showcases high-profile clients or agency partners.
          ------------------------------------------------------------------------
        */}
          <section className="border-y border-zinc-800/80 bg-zinc-900/40 py-8 backdrop-blur">
            <div className="mx-auto max-w-6xl px-6">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-500 mb-6">
                Collaborated With Leading Brands & Agencies
              </p>
              <div className="flex flex-wrap items-center justify-between gap-8 opacity-60 grayscale transition-all hover:grayscale-0">
                {CLIENT_LOGOS.map((client) => (
                  <span
                    key={client}
                    className="text-sm font-black tracking-widest text-zinc-400 hover:text-white transition-colors"
                  >
                    {client}
                  </span>
                ))}
              </div>
            </div>
          </section>

          {/* 
          ------------------------------------------------------------------------
          4. FEATURED PROJECTS PORTFOLIO
          Interactive grid with video hover preview functionality.
          ------------------------------------------------------------------------
        */}
          <section id="work" className="w-full py-24 sm:py-32 bg-transparent">
            <FeaturedWork projects={FEATURED_PROJECTS} />
          </section>

          <section
            id="studio"
            className="w-full border-t border-zinc-800/80 bg-transparent py-24 sm:py-32"
          >
            <div className="mx-auto w-full max-w-6xl px-6">
              <div className="mb-12">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Interactive lookdev
                </p>
                <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
                  Studio Viewer
                </h2>
                <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
                  Drag to orbit. Use the arrows to switch assets under studio
                  lighting.
                </p>
              </div>
              <StudioViewer />
              <div className="mt-8 flex justify-center">
                <a
                  href="https://sketchfab.com/Tun.Htet.Paing/models"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-11 items-center justify-center rounded border border-zinc-700 bg-zinc-900 px-6 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
                >
                  More Models on Sketchfab
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* 
          ------------------------------------------------------------------------
          5. CAPABILITIES & SERVICES SECTION
          Details studio technical offerings and pipeline capabilities.
          ------------------------------------------------------------------------
        */}
          <section
            id="capabilities"
            className="w-full border-t border-zinc-800/80 bg-transparent py-24 sm:py-32"
          >
            <div className="mx-auto max-w-6xl px-6">
              <div className="mb-16">
                <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                  Capabilities
                </p>
                <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
                  What We Do
                </h2>
              </div>

              <div className="grid gap-8 sm:grid-cols-2">
                {STUDIO_CAPABILITIES.map((service) => (
                  <Link
                    key={service.number}
                    href="/services"
                    className="flex flex-col justify-between rounded-xl border border-zinc-800/80 bg-zinc-950 p-8 transition-colors hover:border-zinc-700"
                  >
                    <div>
                      <span className="text-xs font-mono font-bold text-zinc-500">
                        {service.number}
                      </span>
                      <h3 className="mt-4 text-xl font-bold tracking-tight text-white">
                        {service.title}
                      </h3>
                      <p className="mt-3 text-sm leading-relaxed text-zinc-400">
                        {service.description}
                      </p>
                    </div>
                    <div className="mt-8 flex items-center gap-2 text-xs font-semibold text-zinc-300">
                      <span>Learn More</span>
                      <svg
                        className="h-3.5 w-3.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>

          {/* 
          ------------------------------------------------------------------------
          6. CONTACT & COMMISSIONS CALL-TO-ACTION
          Replaces standard footer CTA with direct client inquiry block.
          ------------------------------------------------------------------------
        */}
          <section
            id="contact"
            className="relative overflow-hidden border-t border-zinc-800/80 bg-transparent py-24 sm:py-32"
          >
            <div className="mx-auto max-w-4xl px-6 text-center">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500 mb-4">
                Have a Project in Mind?
              </p>
              <h2 className="text-4xl font-black uppercase tracking-tight sm:text-6xl lg:text-7xl">
                Let's Build Something <br />
                <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                  Extraordinary.
                </span>
              </h2>

              <p className="mt-6 text-base text-zinc-400 max-w-xl mx-auto">
                We collaborate with global brands, agencies, and visionary teams
                to produce next-generation visual assets and motion design
                campaigns.
              </p>

              <div className="mt-10 flex items-center justify-center">
                <a
                  href="mailto:contact.dvlabs@gmail.com"
                  className="inline-flex h-12 w-full sm:w-auto items-center justify-center rounded bg-white px-8 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-200 hover:scale-105"
                >
                  Inquire via Email
                </a>
              </div>
            </div>
          </section>
        </main>

        {/* 
        ------------------------------------------------------------------------
        7. FOOTER SECTION
        ------------------------------------------------------------------------
      */}
        <footer className="border-t border-zinc-800/80 bg-transparent py-12">
          <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold tracking-wider uppercase text-white">
                DV Labs
              </span>
              <span className="text-xs text-zinc-600">
                © {new Date().getFullYear()} All rights reserved.
              </span>
            </div>

            <a
              href="mailto:contact.dvlabs@gmail.com"
              className="text-xs text-zinc-400 hover:text-white transition-colors"
            >
              contact.dvlabs@gmail.com
            </a>
          </div>
        </footer>
      </div>
    </div>
  );
}
