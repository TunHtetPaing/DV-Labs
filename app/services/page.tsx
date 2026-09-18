import Link from "next/link";

// ============================================================================
// DATA STRUCTURES (SOLO STUDIO FRIENDLY)
// ============================================================================

const PRODUCTION_PROCESS = [
  {
    step: "01",
    title: "Discovery & Styleframes",
    description:
      "We establish moodboards, visual styleframes, and lighting concepts to lock in the aesthetic before starting 3D production.",
  },
  {
    step: "02",
    title: "3D Setup & Animation",
    description:
      "CAD/Mesh high-poly 3D modeling, custom texturing, dynamic fluid/cloth simulations, and camera keyframing.",
  },
  {
    step: "03",
    title: "Lighting & Compositing",
    description:
      "Multi-pass GPU rendering, color grading, post-processing, and sound design integration.",
  },
  {
    step: "04",
    title: "Final Delivery",
    description:
      "Delivery of high-bitrate master files in 4K resolution along with optimized web and social media crops.",
  },
];

const PRICING_TIERS = [
  {
    id: "product-viz",
    badge: "3D Stills",
    name: "Product Visualization",
    startingPrice: "$1,500",
    priceNote: "starting price per project",
    turnaround: "1–2 Weeks",
    description:
      "Ideal for tech hardware, consumer products, and packaging needing studio-grade 3D renders for web, launch campaigns, or print.",
    features: [
      "Up to 5 High-Resolution 4K Renders",
      "Studio environments & custom lighting",
      "CAD mesh cleanup (.STEP, .IGES, .OBJ)",
      "360° Turntable Animation Loop (1080p)",
      "2 Major Revision Rounds",
    ],
    emailSubject: "Inquiry: 3D Product Visualization Package",
    highlight: false,
  },
  {
    id: "motion-commercial",
    badge: "Most Requested",
    name: "CGI Motion Commercial",
    startingPrice: "$3,500",
    priceNote: "starting price for 15s film",
    turnaround: "2–3 Weeks",
    description:
      "High-impact 3D commercial films with dynamic camera moves, liquid/cloth simulations, and sound design for product releases.",
    features: [
      "15s–30s High-Bitrate 4K Video (60fps)",
      "Dynamic physics / particle / fluid simulations",
      "Sound FX & Audio Mixing included",
      "Multi-format delivery (16:9 Landscape & 9:16 Vertical)",
      "Full commercial usage rights",
      "2 Major Revision Rounds",
    ],
    emailSubject: "Inquiry: CGI Motion Commercial Package",
    highlight: true,
  },
  {
    id: "custom-project",
    badge: "Bespoke Scope",
    name: "Custom / Architectural 3D",
    startingPrice: "Custom Quote",
    priceNote: "tailored to project scope",
    turnaround: "Flexible",
    description:
      "For interior architecture concepts, real-time 3D assets, multi-product campaigns, or long-form visual R&D.",
    features: [
      "Flexible deliverable scope (Stills + Motion)",
      "Environment and interior architectural modeling",
      "Custom procedural material pipelines",
      "Unreal Engine / WebGL setup support",
      "Direct line of contact with the artist",
    ],
    emailSubject: "Inquiry: Custom 3D Project / Bespoke Scope",
    highlight: false,
  },
];

const FREQUENT_QUESTIONS = [
  {
    question: "How do we start a project?",
    answer:
      "Send an email with your project brief, reference images, CAD files (if available), and timeline. I will review your requirements and reply with a detailed proposal and contract.",
  },
  {
    question: "What files do I need to provide?",
    answer:
      "If you have 3D models or CAD files (.STEP, .IGES, .OBJ, .FBX), vector logos (.AI, .SVG), and label artworks, that speeds up production. If you don't have 3D models, I can build them from physical photos or dimensions.",
  },
  {
    question: "How do revisions work?",
    answer:
      "To keep projects efficient, we review progress at three distinct milestones: 1) Concept & Styleframes, 2) Motion Animatic / Clay Renders, and 3) Final Compositing. Each package includes 2 dedicated revision rounds.",
  },
];

// ============================================================================
// MAIN PAGE COMPONENT
// ============================================================================

export default function ServicesPage() {
  const contactEmail = "contact.dvlabs@gmail.com";

  return (
    <div className="min-h-screen flex flex-col bg-zinc-950 text-zinc-50 selection:bg-white selection:text-zinc-950">
      {/* 
        ------------------------------------------------------------------------
        1. HEADER NAVIGATION
        ------------------------------------------------------------------------
      */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:h-16 sm:px-6 sm:py-0">
          <Link href="/" className="flex min-w-0 items-center gap-2 group">
            <span className="truncate text-lg font-black tracking-wider uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent sm:text-xl">
              DV Labs
            </span>
            <span className="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold text-zinc-400 tracking-wide sm:inline">
              SERVICES
            </span>
          </Link>

          <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
            <Link
              href="/studio"
              className="hidden text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white sm:inline"
            >
              Studio
            </Link>
            <Link
              href="/#work"
              className="inline-flex h-9 items-center text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white sm:h-auto"
            >
              Back to Work
            </Link>
            {/* <a
              href={`mailto:${contactEmail}?subject=Direct Project Inquiry`}
              className="inline-flex h-8 items-center rounded bg-white px-3.5 text-xs font-semibold text-zinc-950 transition-transform hover:scale-105"
            >
              Email Me
            </a> */}
          </nav>
        </div>
      </header>

      <main className="flex-1">
        {/* 
          ------------------------------------------------------------------------
          2. HERO SECTION
          ------------------------------------------------------------------------
        */}
        <section className="relative border-b border-zinc-800/80 py-20 sm:py-28">
          <div className="mx-auto max-w-4xl px-6 text-center">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
              Services & Estimated Pricing
            </p>
            <h1 className="text-4xl font-black uppercase tracking-tight sm:text-6xl">
              High-End 3D Visuals. <br />
              <span className="bg-gradient-to-r from-white via-zinc-300 to-zinc-500 bg-clip-text text-transparent">
                Clear & Direct Pricing.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-sm text-zinc-400 sm:text-base mx-auto leading-relaxed">
              Every project is handled directly with the artist—ensuring fast
              communication, focused creative direction, and high-fidelity CGI
              deliverables.
            </p>
          </div>
        </section>

        {/* 
          ------------------------------------------------------------------------
          3. PRICING & SERVICES TIERS
          ------------------------------------------------------------------------
        */}
        <section className="w-full py-20 border-b border-zinc-800/80 bg-zinc-950">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-14 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Investment Tiers
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Services & Starting Rates
              </h2>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {PRICING_TIERS.map((tier) => (
                <div
                  key={tier.id}
                  className={`relative flex flex-col justify-between rounded-xl border p-8 transition-all ${
                    tier.highlight
                      ? "border-white bg-zinc-900/90 shadow-2xl shadow-white/5"
                      : "border-zinc-800/80 bg-zinc-950"
                  }`}
                >
                  {tier.highlight && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-white px-3 py-0.5 text-[10px] font-black uppercase tracking-widest text-zinc-950">
                      Popular Choice
                    </div>
                  )}

                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-500">
                      {tier.badge}
                    </span>
                    <h3 className="mt-1 text-2xl font-bold text-white">
                      {tier.name}
                    </h3>
                    <p className="mt-3 text-xs text-zinc-400 leading-relaxed">
                      {tier.description}
                    </p>

                    {/* Price Header */}
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="text-3xl font-black tracking-tight text-white">
                        {tier.startingPrice}
                      </span>
                      <span className="text-[11px] text-zinc-500">
                        {tier.priceNote}
                      </span>
                    </div>

                    <div className="mt-2 text-[11px] font-medium text-emerald-400">
                      Est. Turnaround: {tier.turnaround}
                    </div>

                    {/* Features List */}
                    <ul className="mt-6 space-y-2.5 border-t border-zinc-800/60 pt-6">
                      {tier.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-start gap-2 text-xs text-zinc-300"
                        >
                          <svg
                            className="h-4 w-4 shrink-0 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Mailto Direct Inquiry Button */}
                  <a
                    href={`mailto:${contactEmail}?subject=${encodeURIComponent(tier.emailSubject)}`}
                    className={`mt-8 inline-flex h-11 items-center justify-center rounded text-xs font-bold uppercase tracking-wider transition-all ${
                      tier.highlight
                        ? "bg-white text-zinc-950 hover:bg-zinc-200"
                        : "border border-zinc-700 bg-zinc-900 text-white hover:bg-zinc-800 hover:border-zinc-500"
                    }`}
                  >
                    Inquire via Email
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
          ------------------------------------------------------------------------
          4. SIMPLE 4-STEP WORKFLOW
          ------------------------------------------------------------------------
        */}
        <section className="w-full py-20 border-b border-zinc-800/80 bg-zinc-900/30">
          <div className="mx-auto max-w-6xl px-6">
            <div className="mb-12 text-center sm:text-left">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                Workflow
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Production Process
              </h2>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {PRODUCTION_PROCESS.map((phase) => (
                <div
                  key={phase.step}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-950 p-6"
                >
                  <span className="text-xs font-mono font-bold text-zinc-500">
                    {phase.step}
                  </span>
                  <h3 className="mt-3 text-base font-bold text-white">
                    {phase.title}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {phase.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 
          ------------------------------------------------------------------------
          5. FAQ SECTION
          ------------------------------------------------------------------------
        */}
        <section className="w-full py-20 bg-zinc-950">
          <div className="mx-auto max-w-4xl px-6">
            <div className="mb-12 text-center">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
                FAQ
              </p>
              <h2 className="text-3xl font-black uppercase tracking-tight sm:text-4xl">
                Common Questions
              </h2>
            </div>

            <div className="space-y-4">
              {FREQUENT_QUESTIONS.map((faq, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-6"
                >
                  <h3 className="text-base font-bold text-white">
                    {faq.question}
                  </h3>
                  <p className="mt-2 text-xs text-zinc-400 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              ))}
            </div>

            {/* Bottom Contact Callout */}
            <div className="mt-16 text-center">
              <p className="text-xs text-zinc-400">
                Ready to talk about your project?
              </p>
              <a
                href={`mailto:${contactEmail}?subject=General Project Inquiry`}
                className="mt-3 inline-flex h-11 items-center justify-center rounded bg-white px-8 text-xs font-bold uppercase tracking-wider text-zinc-950 transition-all hover:bg-zinc-200"
              >
                Send us an Email
              </a>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10">
        <div className="mx-auto max-w-6xl px-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <span className="text-xs text-zinc-500">
            © {new Date().getFullYear()} DV Labs Studio. All rights reserved.
          </span>
          <Link href="/" className="text-xs text-zinc-400 hover:text-white">
            Return to Homepage
          </Link>
        </div>
      </footer>
    </div>
  );
}
