"use client";

import { useEffect, useState } from "react";

export default function HeroVideos() {
  const [loadSecond, setLoadSecond] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => setLoadSecond(true), 4000);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <div className="absolute inset-0 z-0 bg-zinc-950">
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
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="video-carousel-1 absolute inset-0 h-full w-full object-cover scale-105 filter brightness-75"
      >
        <source src="/assets/project_videos/v1.mp4" type="video/mp4" />
      </video>
      {loadSecond ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="none"
          className="video-carousel-2 absolute inset-0 h-full w-full object-cover opacity-0 scale-105 filter brightness-75"
        >
          <source src="/assets/project_videos/v4.mp4" type="video/mp4" />
        </video>
      ) : null}
    </div>
  );
}
