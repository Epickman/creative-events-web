import Image from "next/image";
import type { StaticImageData } from "next/image";
import type { ReactNode } from "react";

export function PageHero({
  eyebrow,
  title,
  description,
  image,
  imageAlt,
  tall = false,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  image: StaticImageData;
  imageAlt: string;
  tall?: boolean;
  children?: ReactNode;
}) {
  return (
    <section
      className={`relative flex flex-col justify-end overflow-hidden bg-[#0c0c0d] text-zinc-50 ${
        tall ? "min-h-[85vh] sm:min-h-screen" : "min-h-[60vh] sm:min-h-[70vh]"
      }`}
    >
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        placeholder="blur"
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0d] via-[#0c0c0d]/60 to-[#0c0c0d]/10" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-16 pt-32 sm:pb-20">
        <span className="text-sm uppercase tracking-[0.3em] text-zinc-300">
          {eyebrow}
        </span>
        <h1 className="max-w-3xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
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
