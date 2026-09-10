import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { corporateGallery, weddingGallery } from "@/lib/media";
import { VideoHero } from "@/components/video-hero";
import { PromoBanner } from "@/components/promo-banner";
import { ConsultButton } from "@/components/consult-button";

const process = [
  {
    step: "01",
    title: "Exploración",
    description: "Nos reunimos con vos, escuchamos tus ideas y objetivos.",
  },
  {
    step: "02",
    title: "Conceptualización",
    description: "Creamos una propuesta creativa alineada a tu visión.",
  },
  {
    step: "03",
    title: "Producción",
    description:
      "Coordinamos, armamos y ejecutamos con un equipo profesional.",
  },
  {
    step: "04",
    title: "Dirección en evento",
    description:
      "Supervisamos cada detalle y garantizamos una ejecución impecable.",
  },
  {
    step: "05",
    title: "Desmontaje + Cierre",
    description: "Nos encargamos de todo hasta el final.",
  },
];

export default function Home() {
  return (
    <div className="flex flex-1 flex-col">
      <VideoHero
        videoSrc="/video/crve-films-bg.mp4"
        poster="/images/hero-video-poster.jpg"
        eyebrow={siteConfig.shortName}
        title={siteConfig.tagline}
        description={siteConfig.description}
      >
        <div className="flex flex-col gap-4 sm:flex-row">
          <ConsultButton className="inline-flex items-center justify-center rounded-full bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
            Consultá por tu evento
          </ConsultButton>
          <Link
            href="/realizaciones"
            className="inline-flex items-center justify-center rounded-full border border-zinc-100/30 px-6 py-3 text-sm font-medium text-zinc-50 backdrop-blur-sm transition-colors hover:border-zinc-100/60"
          >
            Ver realizaciones
          </Link>
        </div>
      </VideoHero>

      <PromoBanner />

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-14">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-accent-strong">
              Proceso
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
              Cómo trabajamos
            </h2>
            <p className="max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              De la primera reunión a la última luz apagada: así se ve el
              recorrido completo de un evento de Creative Events.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            <ol className="relative flex flex-col gap-10 border-l border-black/[.08] pl-8 dark:border-white/[.1]">
              {process.map((item) => (
                <li key={item.step} className="relative flex flex-col gap-2">
                  <span className="absolute -left-[calc(2rem+9px)] top-0.5 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent-strong bg-white dark:border-accent dark:bg-[#0c0c0d]" />
                  <span className="text-sm font-medium text-accent-strong dark:text-accent">
                    {item.step}
                  </span>
                  <h3 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                    {item.title}
                  </h3>
                  <p className="max-w-md text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </li>
              ))}
            </ol>

            <div className="relative hidden overflow-hidden rounded-2xl lg:block">
              <Image
                src={corporateGallery[1].image}
                alt={corporateGallery[1].alt}
                fill
                placeholder="blur"
                className="object-cover"
                sizes="40vw"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24">
        <div className="relative mx-auto flex w-full max-w-6xl flex-col items-start gap-6 overflow-hidden rounded-2xl bg-[#0c0c0d] p-10 text-zinc-50 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <Image
            src={weddingGallery[3].image}
            alt=""
            fill
            placeholder="blur"
            className="object-cover opacity-40"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0d] via-[#0c0c0d]/80 to-[#0c0c0d]/40" />
          <div className="relative flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              ¿Tenés un evento en mente?
            </h2>
            <p className="text-zinc-300">
              Contanos tu idea y armamos una propuesta a medida.
            </p>
          </div>
          <ConsultButton className="relative inline-flex items-center justify-center whitespace-nowrap rounded-full bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
            Escribinos por WhatsApp
          </ConsultButton>
        </div>
      </section>
    </div>
  );
}
