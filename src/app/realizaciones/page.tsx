import type { Metadata } from "next";
import { hero, corporateCarousel, socialCarousel } from "@/lib/media";
import { PageHero } from "@/components/page-hero";
import { CarouselRow } from "@/components/image-carousel";

export const metadata: Metadata = {
  title: "Realizaciones",
  description:
    "Realizaciones de eventos corporativos y sociales producidos por Creative Events en Argentina.",
};

const included = [
  "Respetamos o creamos la identidad de la marca",
  "Equipo profesional para la realización de planos y renders",
  "Cronograma de armado",
  "Equipo de realización especializado: carpinteros, herreros, electricistas, electromecánicos",
  "Programadores para activaciones interactivas",
  "Equipo propio audiovisual para generar contenido de alto nivel",
  "Cobertura para redes y books de la acción a realizar",
  "No solo somos productores: nos encanta generar ideas distintas y no solo sacarle una sonrisa al verlo, sino un peso de encima",
  "Un equipo que resuelve",
];

export default function RealizacionesPage() {
  return (
    <div className="flex flex-1 flex-col bg-accent-strong">
      <PageHero
        eyebrow="Realizaciones"
        title="Realizamos producciones de alto nivel"
        description="Un equipo, una idea, una activación de marca."
        image={hero.image}
        imageAlt={hero.alt}
      />

      <section className="px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-zinc-200">
              Producción audiovisual
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Tandas temáticas
            </h2>
          </div>
          <p className="max-w-3xl text-sm leading-relaxed text-zinc-200">
            Son momentos del evento en los que combinamos videos y música
            elegidos a medida de un estilo temático, para que cada tanda
            tenga su propia identidad y marque un cambio de clima dentro de
            la fiesta.
          </p>
        </div>
      </section>

      <section className="bg-zinc-50 px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-accent-strong">
              Detalle
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-950">
              Todo lo que incluye la realización
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {included.map((item) => (
              <div
                key={item}
                className="flex items-start gap-3 rounded-2xl border border-black/[.08] bg-white p-5"
              >
                <svg
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 flex-none text-accent-strong"
                >
                  <circle
                    cx="10"
                    cy="10"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                  <path
                    d="M6 10.5l2.5 2.5L14 7.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="text-sm leading-relaxed text-zinc-600">
                  {item}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-black/15 py-20">
        <div className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-3 px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
            Producciones
          </h2>
        </div>
        <div className="flex flex-col gap-4">
          <CarouselRow items={corporateCarousel} speed={0.3} />
          <CarouselRow items={socialCarousel} speed={-0.3} />
        </div>
      </section>
    </div>
  );
}
