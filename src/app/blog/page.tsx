import type { Metadata } from "next";
import { JsonLd, breadcrumbJsonLd, pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site-config";
import { weddingGallery } from "@/lib/media";
import { PageHero } from "@/components/page-hero";

const description =
  "Novedades e ideas de Creative Events, próximamente.";

export const metadata: Metadata = pageMetadata({
  path: "/blog",
  title: "Blog",
  description,
});

export default function BlogPage() {
  return (
    <div className="flex flex-1 flex-col">
      <JsonLd
        graph={[
          breadcrumbJsonLd([
            { name: "Blog", path: "/blog" },
          ]),
        ]}
      />
      <PageHero
        eyebrow="Blog"
        title="Estamos preparando esta sección"
        description="Muy pronto vamos a compartir ideas, detrás de escena y novedades de nuestros eventos. Mientras tanto, seguinos en Instagram."
        image={weddingGallery[2].image}
        imageAlt={weddingGallery[2].alt}
      >
        <a
          href={siteConfig.contact.instagram}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex w-fit items-center justify-center rounded-full bg-zinc-50 px-6 py-3 text-sm font-medium text-zinc-950 transition-colors hover:bg-zinc-200"
        >
          Seguinos en Instagram
        </a>
      </PageHero>
    </div>
  );
}
