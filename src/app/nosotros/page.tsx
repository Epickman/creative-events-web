import type { Metadata } from "next";
import Image from "next/image";
import { corporateGallery, weddingGallery } from "@/lib/media";
import { PageHero } from "@/components/page-hero";
import { ConsultButton } from "@/components/consult-button";

export const metadata: Metadata = {
  title: "Nosotros",
  description:
    "Conocé a Creative Events, productora de eventos premium en Argentina: quiénes somos y qué nos diferencia.",
};

const photos = [weddingGallery[1], corporateGallery[2]];

export default function NosotrosPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Nosotros"
        title="No creemos en fórmulas"
        image={corporateGallery[1].image}
        imageAlt={corporateGallery[1].alt}
      />

      <section className="px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-16">
          <div className="grid gap-10 sm:grid-cols-2">
            <div className="flex flex-col gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                Quiénes somos
              </span>
              <p className="text-lg leading-relaxed text-zinc-950 dark:text-zinc-50">
                En Creative Events no creemos en fórmulas. Creemos en
                personas, en ideas que nos sacan de lo común, en detalles que
                hacen la diferencia.
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Creamos y producimos eventos sociales y corporativos con una
                mirada creativa, emocional y funcional.
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                Nuestro diferencial
              </span>
              <p className="text-lg leading-relaxed text-zinc-950 dark:text-zinc-50">
                Nos salimos del molde. Escuchamos, proponemos y diseñamos
                eventos que cuentan la historia de quienes los viven.
              </p>
              <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Con una palabra disparadora creamos un concepto único, un
                hilo conductor que une cada detalle en una misma experiencia.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-20 dark:bg-zinc-950">
        <div className="mx-auto grid w-full max-w-6xl gap-4 sm:grid-cols-2">
          {photos.map((item) => (
            <div
              key={item.alt}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl"
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                placeholder="blur"
                className="object-cover"
                sizes="(min-width: 640px) 50vw, 100vw"
              />
            </div>
          ))}
        </div>
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 rounded-2xl bg-[#0c0c0d] p-10 text-zinc-50 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              ¿Charlamos sobre tu próximo evento?
            </h2>
            <p className="text-zinc-400">
              Escribinos y contanos qué tenés en mente.
            </p>
          </div>
          <ConsultButton className="inline-flex items-center justify-center whitespace-nowrap rounded-full bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200">
            Escribinos por WhatsApp
          </ConsultButton>
        </div>
      </section>
    </div>
  );
}
