export const siteConfig = {
  name: "Creative Events",
  legalName: "Creative Events Producciones",
  shortName: "Creative Events",
  tagline: "Productora de eventos de categoría",
  description:
    "Creative Events es una productora integral de eventos y producciones de alto nivel. No solo hacemos eventos, hacemos producciones distintas y únicas, para que tu experiencia sea inolvidable desde el primer momento.",
  url: "https://www.creativeevents.com.ar",
  ogImage: "/opengraph-image",
  locale: "es_AR",
  themeColor: "#0c0c0d",

  contact: {
    phoneDisplay: "+54 9 11 6685-1392",
    phoneE164: "+5491166851392",
    email: "crve.events@gmail.com",
    instagram: "https://www.instagram.com/creative.events.productions",
    instagramHandle: "@creative.events.productions",
  },

  address: {
    streetAddress: "Polo Hudson",
    addressLocality: "Hudson",
    addressRegion: "Buenos Aires",
    postalCode: "",
    addressCountry: "AR",
  },

  geo: {
    latitude: -34.77664387313777,
    longitude: -58.16324504378973,
  },

  sameAs: ["https://www.instagram.com/creative.events.productions"],

  // Opciones del botón "Consultar": cada una arma un mensaje distinto de WhatsApp.
  consultOptions: [
    {
      label: "Evento social",
      message: "Quiero consultar sobre mi evento social.",
    },
    {
      label: "Evento corporativo",
      message: "Quiero consultar sobre mi evento corporativo.",
    },
    {
      label: "Realizaciones",
      message: "Quiero consultar sobre las realizaciones de Creative Events.",
    },
    {
      label: "Técnica",
      message:
        "Quiero consultar sobre la técnica para mi evento: sonido, luces y pantallas.",
    },
    {
      label: "Ambientación",
      message: "Quiero consultar sobre la ambientación para mi evento.",
    },
    {
      label: "Producción",
      message: "Quiero consultar sobre la producción de mi evento.",
    },
  ],

  nav: [
    { href: "/eventos-corporativos", label: "Eventos Corporativos" },
    { href: "/eventos-sociales", label: "Eventos Sociales" },
    { href: "/realizaciones", label: "Realizaciones" },
    { href: "/contacto", label: "Contacto" },
  ],
} as const;

export type SiteConfig = typeof siteConfig;

export function buildWhatsappUrl(message: string) {
  return `https://wa.me/${siteConfig.contact.phoneE164.replace(
    "+",
    ""
  )}?text=${encodeURIComponent(`Hola Creative! ${message}`)}`;
}
