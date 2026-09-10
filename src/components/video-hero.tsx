import type { ReactNode } from "react";

// Hero con video de fondo en loop normal (autoplay, muted, sin controles).
export function VideoHero({
  videoSrc,
  poster,
  eyebrow,
  title,
  description,
  children,
}: {
  videoSrc: string;
  poster: string;
  eyebrow: string;
  title: string;
  description?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative flex min-h-[85vh] flex-col justify-end overflow-hidden bg-[#0c0c0d] text-zinc-50 sm:min-h-screen">
      <video
        src={videoSrc}
        poster={poster}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/50 to-[#0c0c0d]/10" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 pb-20 pt-32 sm:pb-28">
        <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-6xl">
          {title}
        </h1>
        {description ? (
          <p className="max-w-xl text-lg leading-relaxed text-zinc-300">
            {description}
          </p>
        ) : null}
        {children}
      </div>
    </section>
  );
}
