import type { Metadata } from "next";
import { corporateGallery, corporateCarousel } from "@/lib/media";
import { PageHero } from "@/components/page-hero";
import { ImageCarousel } from "@/components/image-carousel";
import { ConsultButton } from "@/components/consult-button";

export const metadata: Metadata = {
  title: "Eventos Corporativos",
  description:
    "Producción integral de eventos corporativos: lanzamientos, aniversarios, convenciones y activaciones de marca en Argentina.",
};

// Copy real de Creative Events (crve-events.com/eventos).
const highlights = [
  {
    title: "Eventos personalizados",
    description:
      "Donde la creatividad no tiene límites: tu esencia, nuestra inspiración. Diseñamos experiencias que nacen de una idea poderosa y evolucionan hasta convertirse en relatos vivos.",
  },
  {
    title: "Diseño integral",
    description:
      "Nos ocupamos de todo: concepto, planificación y ejecución. Cada detalle cuenta y cada decisión suma para que tu evento sea perfecto.",
  },
  {
    title: "Conceptos que inspiran",
    description:
      "Cada concepto es un desafío. Lo llevamos al límite, lo rompemos, lo reinventamos. En Creative Events no seguimos tendencias, las creamos.",
  },
];

export default function EventosCorporativosPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Eventos Corporativos"
        title="Eventos Corporativos"
        description="Tenemos un salón de eventos único en Argentina y contamos con un equipo profesional en cada área para hacer tu evento una experiencia inolvidable. Tenemos lo último en tecnología para poder sorprenderte año a año, a vos y a tus invitados."
        image={corporateGallery[0].image}
        imageAlt={corporateGallery[0].alt}
      />

      <section className="bg-accent-strong px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="flex flex-col gap-3">
            <span className="text-sm uppercase tracking-[0.3em] text-zinc-200">
              Por qué elegirnos
            </span>
            <h2 className="text-2xl font-semibold tracking-tight text-zinc-50">
              Así vivís tu evento corporativo con nosotros
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className="flex flex-col gap-4 rounded-[28px] border border-white/20 bg-white/10 p-8 backdrop-blur-xl transition-colors hover:border-white/35"
              >
                <span className="font-[family-name:var(--font-display)] text-4xl font-semibold text-white/40">
                  {`0${index + 1}`}
                </span>
                <h3 className="text-lg font-semibold text-zinc-50">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-zinc-200">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-zinc-50 py-20 dark:bg-zinc-950">
        <div className="mx-auto mb-8 flex w-full max-w-6xl flex-col gap-3 px-6">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Producciones
          </h2>
        </div>
        <ImageCarousel items={corporateCarousel} />
      </section>

      <section className="px-6 py-24">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 rounded-2xl bg-[#0c0c0d] p-10 text-zinc-50 sm:flex-row sm:items-center sm:justify-between sm:p-14">
          <div className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight">
              ¿Tenés un evento corporativo en mente?
            </h2>
            <p className="text-zinc-400">
              Contanos el objetivo de tu marca y armamos una propuesta a
              medida.
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
