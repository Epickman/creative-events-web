import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { filmsGallery } from "@/lib/media";
import { ImageCarousel } from "@/components/image-carousel";
import { ConsultButton } from "@/components/consult-button";
import { CrveVideoBackground } from "@/components/crve-video-background";

export const metadata: Metadata = {
  title: "CRVE Films",
  description:
    "CRVE Films, productora audiovisual boutique: cobertura cinematográfica, dirección y postproducción para eventos.",
};

const services = [
  {
    index: "01",
    icon: "◎",
    title: "Preproducción",
    description:
      "Cobertura cinematográfica de eventos, marcas y artistas. Equipos Sony, Canon y DJI con dirección de fotografía dedicada.",
  },
  {
    index: "02",
    icon: "◈",
    title: "Producción",
    description:
      "Concepto visual, paleta de color y narrativa estética coherente con la identidad de cada proyecto y cada cliente.",
  },
  {
    index: "03",
    icon: "▣",
    title: "Post-producción",
    description:
      "Color grading cinematográfico, motion graphics, diseño sonoro y edición en Premiere Pro y DaVinci Resolve.",
  },
];

export default function CrveFilmsPage() {
  return (
    <div className="relative flex flex-1 flex-col bg-black font-[family-name:var(--font-tech)] text-zinc-50">
      <CrveVideoBackground src="/video/crve-films-bg.mp4" />

      <div className="relative z-10 flex flex-1 flex-col">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 pb-16 pt-14">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-8">
          <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
            <span className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-white" />
              REC · CRVE Films
            </span>
            <span>TC 00:00:00:00</span>
          </div>

          <h1 className="max-w-4xl font-[family-name:var(--font-display)] text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl">
            Productora audiovisual que transforma eventos en{" "}
            <span className="text-white">
              piezas cinematográficas y recuerdos inolvidables
            </span>
            .
          </h1>

          <p className="text-sm uppercase tracking-[0.2em] text-zinc-500">
            Hudson · Buenos Aires · Argentina · La Plata
          </p>
        </div>
      </section>

      {/* Reel de fotos reales */}
      <div className="border-b border-white/10 py-6">
        <ImageCarousel items={filmsGallery} />
      </div>

      {/* Misión / Visión */}
      <section className="border-b border-white/10 bg-black px-6 py-16">
        <div className="mx-auto flex w-full max-w-3xl flex-col gap-8">
          <p className="text-xs tracking-[0.3em] text-zinc-600">
            ── CF ───────────────────────
          </p>
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-hero)] text-xl italic text-white">
              Misión
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Crear piezas audiovisuales cinematográficas a partir de eventos
              reales, combinando narrativa, estética y dirección para
              transformar cada momento en una historia única.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <p className="font-[family-name:var(--font-hero)] text-xl italic text-white">
              Visión
            </p>
            <p className="text-sm leading-relaxed text-zinc-400">
              Ser una productora referente en contenido audiovisual de
              eventos, reconocida por su mirada cinematográfica, su
              identidad estética y su capacidad de convertir experiencias en
              relatos memorables.
            </p>
          </div>
        </div>
      </section>

      {/* Servicios */}
      <section className="border-b border-white/10 px-6 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <span className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
            02 / Servicios
          </span>
          <div className="grid gap-10 sm:grid-cols-3">
            {services.map((item) => (
              <div key={item.title} className="flex flex-col gap-3">
                <div className="flex items-center gap-3">
                  <span className="text-xs text-white">
                    {item.index} /
                  </span>
                  <span className="text-lg text-zinc-500">{item.icon}</span>
                </div>
                <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold uppercase tracking-tight">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contacto */}
      <section className="px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-[0.65rem] uppercase tracking-[0.3em] text-zinc-500">
              06 / Contacto
            </span>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold uppercase tracking-tight">
              Iniciemos un proyecto
            </h2>
            <a
              href="mailto:filmscrve@gmail.com"
              className="text-sm text-white transition-colors hover:text-zinc-300"
            >
              filmscrve@gmail.com →
            </a>
          </div>
          <ConsultButton className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-white px-6 py-3 text-xs uppercase tracking-[0.2em] text-black transition-colors hover:bg-zinc-200">
            Escribinos por WhatsApp
          </ConsultButton>
        </div>

        <div className="mx-auto mt-14 flex w-full max-w-6xl flex-col gap-4 border-t border-white/10 pt-8 text-xs text-zinc-500 sm:flex-row sm:items-center sm:justify-between">
          <span>© 2026 CRVE Films</span>
          <div className="flex items-center gap-4">
            <a
              href="https://www.instagram.com/crvefilms/"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@creative.productora"
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              TikTok
            </a>
            <a
              href={siteConfig.contact.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-white"
            >
              Creative Events ↗
            </a>
          </div>
        </div>
      </section>
      </div>
    </div>
  );
}
