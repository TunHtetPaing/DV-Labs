"use client";

import { useEffect, useRef, useState } from "react";

const CLIPS = [
  "/assets/project_videos/v1.mp4",
  "/assets/project_videos/v4.mp4",
] as const;

function playQuietly(video: HTMLVideoElement) {
  return video.play().catch((error: unknown) => {
    if (error instanceof DOMException && error.name === "AbortError") {
      return;
    }
    throw error;
  });
}

export default function HeroVideos() {
  const rootRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [inView, setInView] = useState(true);
  const [clip, setClip] = useState(0);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) {
      return;
    }

    if (!inView) {
      video.pause();
      return;
    }

    void playQuietly(video);
  }, [inView, clip]);

  return (
    <div ref={rootRef} className="absolute inset-0 z-0 bg-zinc-950">
      <video
        key={CLIPS[clip]}
        ref={videoRef}
        muted
        playsInline
        preload="none"
        onEnded={() => setClip((current) => (current === 0 ? 1 : 0))}
        className="absolute inset-0 h-full w-full object-cover scale-105 filter brightness-75"
      >
        <source src={CLIPS[clip]} type="video/mp4" />
      </video>
    </div>
  );
}
