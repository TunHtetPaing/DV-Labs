"use client";

import dynamic from "next/dynamic";
import { useCallback, useEffect, useState } from "react";

const StudioViewerScene = dynamic(() => import("./studio-viewer-scene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full flex-col items-center justify-center gap-4 bg-zinc-950">
      <p className="text-xs font-semibold uppercase tracking-[0.25em] text-zinc-300">
        Loading scene
      </p>
      <div className="h-px w-32 overflow-hidden bg-zinc-800">
        <div className="h-full w-1/3 animate-pulse bg-white" />
      </div>
    </div>
  ),
});

const MODELS = [
  { id: "m1", url: "/assets/3D_models/m1.glb", label: "Asset 01" },
  { id: "m2", url: "/assets/3D_models/m2.glb", label: "Asset 02" },
  { id: "m3", url: "/assets/3D_models/m3.glb", label: "Asset 03" },
] as const;

export default function StudioViewer() {
  const [index, setIndex] = useState(0);

  const previous = useCallback(() => {
    setIndex((current) => (current === 0 ? MODELS.length - 1 : current - 1));
  }, []);

  const next = useCallback(() => {
    setIndex((current) => (current === MODELS.length - 1 ? 0 : current + 1));
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    }

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [next, previous]);

  const model = MODELS[index];

  return (
    <div className="relative overflow-hidden rounded-2xl border border-zinc-800/80 bg-zinc-950">
      <div className="aspect-[16/10] w-full sm:aspect-[16/8]">
        <StudioViewerScene url={model.url} />
      </div>

      <button
        type="button"
        onClick={previous}
        aria-label="Previous model"
        className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/80 text-white backdrop-blur-md transition hover:border-zinc-400 hover:bg-zinc-900"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        type="button"
        onClick={next}
        aria-label="Next model"
        className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-zinc-700 bg-zinc-950/80 text-white backdrop-blur-md transition hover:border-zinc-400 hover:bg-zinc-900"
      >
        <svg
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.75}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      <div className="pointer-events-none absolute bottom-5 left-0 right-0 flex flex-col items-center gap-3">
        <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-zinc-300">
          {model.label}
        </p>
        <div className="flex gap-2">
          {MODELS.map((item, itemIndex) => (
            <span
              key={item.id}
              className={`h-1.5 w-6 rounded-full ${
                itemIndex === index ? "bg-white" : "bg-zinc-700"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
