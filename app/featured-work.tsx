"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

export type FeaturedProject = {
  id: string;
  title: string;
  client: string;
  category: "product" | "commercial" | "interior" | "motion";
  tags: string[];
  thumbnailImg: string;
  previewVideo: string;
  href: string;
};

const FILTERS = [
  { id: "all", label: "All" },
  { id: "product", label: "Product Viz" },
  { id: "commercial", label: "Commercials" },
  { id: "interior", label: "Interior" },
] as const;

function playQuietly(video: HTMLVideoElement) {
  return video.play().catch((error: unknown) => {
    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }
    throw error;
  });
}

function canPreviewVideo() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return false;
  }
  if (window.matchMedia("(hover: none)").matches) {
    return false;
  }
  const connection = (
    navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }
  ).connection;
  if (connection?.saveData) {
    return false;
  }
  if (
    connection?.effectiveType === "slow-2g" ||
    connection?.effectiveType === "2g"
  ) {
    return false;
  }
  return true;
}

function ProjectCard({
  project,
  previewing,
  onPreview,
}: {
  project: FeaturedProject;
  previewing: boolean;
  onPreview: (id: string | null) => void;
}) {
  const [ready, setReady] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hoverTimer = useRef<number>(0);

  useEffect(() => {
    if (!previewing) {
      setReady(false);
      return;
    }

    const video = videoRef.current;
    if (!video) {
      return;
    }

    const markReady = () => {
      setReady(true);
    };

    video.addEventListener("canplay", markReady);
    video.load();
    void playQuietly(video).then(() => {
      if (!video.paused) {
        setReady(true);
      }
    });

    return () => {
      video.removeEventListener("canplay", markReady);
      video.pause();
    };
  }, [previewing]);

  const showSpinner = previewing && !ready;

  return (
    <Link
      href={project.href}
      onMouseEnter={() => {
        if (!canPreviewVideo()) {
          return;
        }
        window.clearTimeout(hoverTimer.current);
        hoverTimer.current = window.setTimeout(() => {
          onPreview(project.id);
        }, 150);
      }}
      onMouseLeave={() => {
        window.clearTimeout(hoverTimer.current);
        onPreview(null);
        const video = videoRef.current;
        if (video) {
          video.pause();
          video.removeAttribute("src");
          video.load();
        }
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-600 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <img
          src={project.thumbnailImg}
          alt={project.title}
          loading="lazy"
          decoding="async"
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            ready ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          {previewing ? (
            <source src={project.previewVideo} type="video/mp4" />
          ) : null}
        </video>
        {showSpinner ? (
          <div
            className="absolute inset-0 z-10 flex items-center justify-center bg-black/30"
            aria-hidden
          >
            <span className="h-8 w-8 animate-spin rounded-full border-2 border-white/25 border-t-white" />
          </div>
        ) : null}
        <div className="absolute top-4 right-4 z-20 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          View Project
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-zinc-400">
            {project.client}
          </p>
          <h3 className="mt-1 text-2xl font-bold tracking-tight text-white group-hover:text-zinc-200">
            {project.title}
          </h3>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="rounded border border-zinc-800 bg-zinc-950 px-2 py-0.5 text-[10px] font-medium text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default function FeaturedWork({
  projects,
}: {
  projects: FeaturedProject[];
}) {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]["id"]>("all");
  const [previewId, setPreviewId] = useState<string | null>(null);

  const visible = useMemo(
    () =>
      filter === "all"
        ? projects
        : projects.filter((project) => project.category === filter),
    [filter, projects],
  );

  return (
    <div className="mx-auto w-full max-w-6xl px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Selected Archives
          </p>
          <h2 className="text-3xl font-black uppercase tracking-tight sm:text-5xl">
            Featured Work
          </h2>
        </div>

        <div className="flex flex-wrap gap-2 text-xs font-medium text-zinc-400">
          {FILTERS.map((item) => {
            const active = filter === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setFilter(item.id)}
                className={
                  active
                    ? "rounded-full bg-white px-4 py-1.5 text-zinc-950 font-bold"
                    : "rounded-full border border-zinc-800 px-4 py-1.5 hover:border-zinc-600 hover:text-white transition-colors"
                }
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>

      {visible.length === 0 ? (
        <p className="text-sm text-zinc-500">
          No projects in this category yet.
        </p>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2">
          {visible.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              previewing={previewId === project.id}
              onPreview={setPreviewId}
            />
          ))}
        </div>
      )}
    </div>
  );
}
