import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

// IDs estables para vincular las entidades del grafo de schema.org entre
// páginas (Google las une por @id).
export const organizationId = `${siteConfig.url}/#organization`;
export const websiteId = `${siteConfig.url}/#website`;

export function absoluteUrl(path: string) {
  return path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;
}

// Metadata por página: canonical y og:url propios de cada ruta. Sin esto,
// todas las páginas heredan el canonical de la home y Google las descarta
// como duplicadas.
export function pageMetadata({
  path,
  title,
  description,
}: {
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const ogTitle = title ? `${title} | ${siteConfig.name}` : siteConfig.name;
  return {
    ...(title && { title }),
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: path,
      siteName: siteConfig.name,
      title: ogTitle,
      description,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
    },
  };
}

export const organizationJsonLd = {
  "@type": "EventPlanner",
  "@id": organizationId,
  name: siteConfig.name,
  alternateName: "CRVE Events",
  legalName: siteConfig.legalName,
  description: siteConfig.description,
  slogan: siteConfig.tagline,
  url: siteConfig.url,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/brand/logo.png"),
    width: 1297,
    height: 371,
  },
  image: [absoluteUrl("/images/hero-video-poster.jpg")],
  telephone: siteConfig.contact.phoneE164,
  email: siteConfig.contact.email,
  sameAs: siteConfig.sameAs,
  address: {
    "@type": "PostalAddress",
    streetAddress: siteConfig.address.streetAddress,
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    addressCountry: siteConfig.address.addressCountry,
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: siteConfig.geo.latitude,
    longitude: siteConfig.geo.longitude,
  },
  areaServed: [
    { "@type": "City", name: "Buenos Aires" },
    { "@type": "Country", name: "Argentina" },
  ],
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone: siteConfig.contact.phoneE164,
    email: siteConfig.contact.email,
    availableLanguage: "es",
  },
  knowsAbout: [
    "Producción de eventos",
    "Eventos corporativos",
    "Eventos sociales",
    "Casamientos",
    "Ambientación de eventos",
    "Sonido, iluminación y pantallas LED",
    "Producción audiovisual",
  ],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteConfig.url,
  name: siteConfig.name,
  inLanguage: "es-AR",
  publisher: { "@id": organizationId },
};

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "/" }, ...items].map(
      (item, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: item.name,
        item: absoluteUrl(item.path),
      })
    ),
  };
}

export function serviceJsonLd({
  name,
  serviceType,
  description,
  path,
}: {
  name: string;
  serviceType: string;
  description: string;
  path: string;
}) {
  return {
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    serviceType,
    description,
    url: absoluteUrl(path),
    provider: { "@id": organizationId },
    areaServed: { "@type": "Country", name: "Argentina" },
  };
}

// Renderiza un grafo de schema.org. Escapa "<" para evitar inyección de
// HTML dentro del <script> (recomendación de la guía de JSON-LD de Next).
export function JsonLd({ graph }: { graph: object[] }) {
  const data = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
