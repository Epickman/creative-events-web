import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { corporateGallery } from "@/lib/media";
import { PageHero } from "@/components/page-hero";
import { LocationMap } from "@/components/location-map";
import { ConsultButton } from "@/components/consult-button";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Contactá a Creative Events por WhatsApp, email o Instagram para consultar por la producción de tu evento.",
};

const channelClassName =
  "group flex flex-col gap-2 rounded-2xl border border-black/[.08] p-8 text-left transition-colors hover:border-black/[.16] dark:border-white/[.1] dark:hover:border-white/[.2]";

const channels = [
  {
    label: "Email",
    value: siteConfig.contact.email,
    href: `mailto:${siteConfig.contact.email}`,
  },
  {
    label: "Instagram",
    value: siteConfig.contact.instagramHandle,
    href: siteConfig.contact.instagram,
  },
];

export default function ContactoPage() {
  return (
    <div className="flex flex-1 flex-col">
      <PageHero
        eyebrow="Contacto"
        title="Contanos tu idea"
        description="Escribinos por el medio que prefieras y armamos una propuesta a medida de tu evento."
        image={corporateGallery[3].image}
        imageAlt={corporateGallery[3].alt}
      />

      <section className="px-6 py-20">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
          <div className="grid gap-6 sm:grid-cols-3">
            <ConsultButton className={channelClassName}>
              <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                WhatsApp
              </span>
              <span className="text-lg font-medium text-zinc-950 transition-transform group-hover:translate-x-1 dark:text-zinc-50">
                {siteConfig.contact.phoneDisplay}
              </span>
            </ConsultButton>
            {channels.map((channel) => (
              <a
                key={channel.label}
                href={channel.href}
                target="_blank"
                rel="noopener noreferrer"
                className={channelClassName}
              >
                <span className="text-sm uppercase tracking-[0.3em] text-zinc-400 dark:text-zinc-600">
                  {channel.label}
                </span>
                <span className="text-lg font-medium text-zinc-950 transition-transform group-hover:translate-x-1 dark:text-zinc-50">
                  {channel.value}
                </span>
              </a>
            ))}
          </div>

          <p className="max-w-xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Oficina en {siteConfig.address.streetAddress},{" "}
            {siteConfig.address.addressLocality},{" "}
            {siteConfig.address.addressRegion}, Argentina.
          </p>
        </div>
      </section>

      <section className="border-t border-black/[.08] dark:border-white/[.1]">
        <LocationMap
          latitude={siteConfig.geo.latitude}
          longitude={siteConfig.geo.longitude}
          label={siteConfig.name}
          addressLine={`${siteConfig.address.streetAddress}, ${siteConfig.address.addressLocality}, ${siteConfig.address.addressRegion}`}
        />
      </section>

      <section className="px-6 py-16">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center gap-4 text-center">
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            ¿Preferís que te escribamos nosotros?
          </p>
          <ConsultButton className="inline-flex items-center justify-center rounded-full bg-zinc-950 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-[#2f4a3d]">
            Consultar
          </ConsultButton>
        </div>
      </section>
    </div>
  );
}
