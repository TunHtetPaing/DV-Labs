import type { Metadata } from "next";
import Link from "next/link";
import StudioViewer from "@/app/studio-viewer";

export const metadata: Metadata = {
  title: "Studio Viewer",
  description:
    "Orbit real-time 3D assets from DV Labs under studio lighting. Switch models with the arrows.",
};

export default function StudioPage() {
  return (
    <div className="flex min-h-full flex-col bg-zinc-950 text-zinc-50 selection:bg-white selection:text-zinc-950">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-800/80 bg-zinc-950/80 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between gap-3 px-5 py-3 sm:h-16 sm:px-6 sm:py-0">
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <span className="truncate text-lg font-black tracking-wider uppercase bg-gradient-to-r from-white via-zinc-200 to-zinc-500 bg-clip-text text-transparent sm:text-xl">
              DV Labs
            </span>
            <span className="hidden rounded bg-zinc-800 px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-zinc-400 sm:inline">
              STUDIO
            </span>
          </Link>
          <nav className="flex shrink-0 items-center gap-3 sm:gap-6">
            <Link
              href="/#work"
              className="inline-flex h-9 items-center text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white sm:h-auto"
            >
              Work
            </Link>
            <Link
              href="/services"
              className="hidden text-xs font-semibold uppercase tracking-widest text-zinc-400 transition-colors hover:text-white sm:inline"
            >
              Services
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">
        <section className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Interactive lookdev
          </p>
          <h1 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Studio Viewer
          </h1>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">
            Drag to orbit. Use the arrows to switch assets under studio
            lighting.
          </p>
          <div className="mt-10">
            <StudioViewer />
          </div>
          <div className="mt-8 flex justify-center">
            <a
              href="https://sketchfab.com/Tun.Htet.Paing/models"
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-11 items-center justify-center gap-2 rounded border border-zinc-700 bg-zinc-900 px-6 text-xs font-bold uppercase tracking-wider text-white transition-all hover:border-zinc-500 hover:bg-zinc-800"
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
        </section>
      </main>

      <footer className="border-t border-zinc-800/80 bg-zinc-950 py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-6 sm:flex-row">
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
