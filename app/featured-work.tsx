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

function ProjectCard({ project }: { project: FeaturedProject }) {
  const [hovered, setHovered] = useState(false);
  const [loadVideo, setLoadVideo] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (hovered && loadVideo) {
      void videoRef.current?.play();
    }
  }, [hovered, loadVideo]);

  return (
    <Link
      href={project.href}
      onMouseEnter={() => {
        setLoadVideo(true);
        setHovered(true);
      }}
      onMouseLeave={() => {
        setHovered(false);
        const video = videoRef.current;
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }}
      className="group relative flex flex-col overflow-hidden rounded-xl border border-zinc-800/80 bg-zinc-900/50 transition-all duration-300 hover:border-zinc-600 hover:-translate-y-1"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-zinc-900">
        <img
          src={project.thumbnailImg}
          alt={project.title}
          className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-105 ${
            hovered ? "opacity-0" : "opacity-100"
          }`}
        />
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="none"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
            hovered ? "opacity-100" : "opacity-0"
          }`}
        >
          {loadVideo ? (
            <source src={project.previewVideo} type="video/mp4" />
          ) : null}
        </video>
        <div className="absolute top-4 right-4 rounded-full bg-black/60 backdrop-blur-md px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
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
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
