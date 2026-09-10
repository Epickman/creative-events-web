"use client";

import { useEffect, useRef } from "react";

// Video de fondo fijo de CRVE Films, reproducido a 4x velocidad en loop.
export function CrveVideoBackground({ src }: { src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    video.playbackRate = 4;
    video.play().catch(() => {});
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <video
        ref={videoRef}
        src={src}
        autoPlay
        loop
        muted
        playsInline
        className="h-full w-full object-cover opacity-25"
      />
      <div className="absolute inset-0 bg-black/60" />
    </div>
  );
}
