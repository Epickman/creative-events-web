import type { StaticImageData } from "next/image";

import heroImg from "@/images/hero.jpg";

// Corporativos: fotos reales de eventos de marca/empresa.
import eventBarLounge from "@/images/corporativos/event-bar-lounge.jpg";
import eventBrandDinner from "@/images/corporativos/event-brand-dinner.jpg";
import eventChany from "@/images/corporativos/event-chany.jpg";
import eventDisco from "@/images/corporativos/event-disco.jpg";
import eventNycGala from "@/images/corporativos/event-nyc-gala.jpg";
import eventStage from "@/images/corporativos/event-stage.jpg";
import eventYpf from "@/images/corporativos/event-ypf.jpg";

// Sociales: fotos reales de casamientos y celebraciones privadas.
import eventCarousel from "@/images/sociales/event-carousel.jpg";
import eventJungle from "@/images/sociales/event-jungle.jpg";
import eventLiberty from "@/images/sociales/event-liberty.jpg";
import eventParty from "@/images/sociales/event-party.jpg";
import aerialSilk from "@/images/sociales/aerial-silk.jpg";
import jellyfishWide from "@/images/sociales/jellyfish-party-wide.jpg";
import jellyfishBubbles from "@/images/sociales/jellyfish-party-bubbles.jpg";
import jellyfishGuests from "@/images/sociales/jellyfish-party-guests.jpg";
import jellyfishCrowd from "@/images/sociales/jellyfish-party-crowd.jpg";
import jellyfishDj from "@/images/sociales/jellyfish-party-dj.jpg";
import ldPartyWide from "@/images/sociales/ld-party-wide.jpg";
import ldPartyDonut from "@/images/sociales/ld-party-donut.jpg";
import ldPartyLobster from "@/images/sociales/ld-party-lobster.jpg";
import jungleLounge from "@/images/sociales/jungle-lounge.jpg";
import jungleCrowdLobster from "@/images/sociales/jungle-crowd-lobster.jpg";
import jungleGuests from "@/images/sociales/jungle-guests.jpg";
import palomaStage from "@/images/sociales/paloma-stage.jpg";
import palomaSalon from "@/images/sociales/paloma-salon.jpg";

export type MediaItem = {
  image: StaticImageData;
  alt: string;
};

// Fotos reales de producciones de Creative Events.
export const hero: MediaItem = {
  image: heroImg,
  alt: "Producción de evento de Creative Events con escenografía de marca",
};

// Eventos Corporativos: solo fotos de la carpeta "corporativos".
export const corporateGallery: MediaItem[] = [
  {
    image: eventYpf,
    alt: "Evento corporativo de YPF con escenario y pista iluminados en azul",
  },
  {
    image: eventChany,
    alt: "Escenografía de marca con arañas de cristal para un evento corporativo",
  },
  {
    image: eventNycGala,
    alt: "Cena de gala ambientada con skyline de Nueva York y arañas de cristal",
  },
  {
    image: eventBrandDinner,
    alt: "Mesa de gala con vajilla personalizada para marcas invitadas",
  },
  {
    image: eventStage,
    alt: "Escenario con pantalla LED y DJ en vivo",
  },
  {
    image: eventDisco,
    alt: "Salón con estructura circular de luces LED y barra central",
  },
  {
    image: eventBarLounge,
    alt: "Barra central iluminada en un salón de evento nocturno",
  },
];

// Eventos Sociales: solo fotos de la carpeta "sociales".
export const weddingGallery: MediaItem[] = [
  {
    image: eventJungle,
    alt: "Salón ambientado con follaje, arañas de cristal y pantallas LED",
  },
  {
    image: eventCarousel,
    alt: "Carrusel de caballos como pieza decorativa de un evento",
  },
  {
    image: eventLiberty,
    alt: "Escenografía temática con réplicas de la Estatua de la Libertad",
  },
  {
    image: eventParty,
    alt: "Pista de baile llena de invitados",
  },
  {
    image: aerialSilk,
    alt: "Artista de tela aérea durante un show en vivo con pantallas LED",
  },
  {
    image: palomaStage,
    alt: "Escenario con identidad de marca 'Paloma' proyectada en pantallas LED",
  },
  {
    image: palomaSalon,
    alt: "Salón de evento con branding 'Paloma' de Creative Events en pantalla",
  },
  {
    image: jellyfishWide,
    alt: "Pista con escenografía de medusas gigantes y luces de fiesta temática submarina",
  },
  {
    image: jellyfishGuests,
    alt: "Invitados bailando bajo medusas decorativas y luces de neón",
  },
  {
    image: jellyfishCrowd,
    alt: "Multitud en pista de baile con escenografía submarina y luces rosas",
  },
  {
    image: jellyfishBubbles,
    alt: "Cañón de burbujas sobre la pista durante la fiesta",
  },
  {
    image: jellyfishDj,
    alt: "DJ set con láser verde iluminando a la multitud",
  },
  {
    image: ldPartyWide,
    alt: "Salón de evento con pantallas LED y ambientación de piletada inflable",
  },
  {
    image: ldPartyDonut,
    alt: "Pista cubierta de flotadores inflables y confeti durante la fiesta",
  },
  {
    image: ldPartyLobster,
    alt: "Invitado sosteniendo un flotador inflable de langosta en la pista",
  },
  {
    image: jungleLounge,
    alt: "Lounge con mesas y follaje ambientado para un evento nocturno",
  },
  {
    image: jungleCrowdLobster,
    alt: "Invitados posando con un flotador inflable de langosta gigante",
  },
  {
    image: jungleGuests,
    alt: "Invitados bailando entre burbujas y luces de neón",
  },
];

export const fullPortfolio: MediaItem[] = [
  hero,
  ...corporateGallery.slice(0, 3),
  ...weddingGallery.slice(0, 3),
];

// Tandas de 8 fotos para los carruseles: cada categoría usa únicamente
// fotos de su propia carpeta (corporativos / sociales), sin mezclarse.
export const corporateCarousel: MediaItem[] = corporateGallery;

export const socialCarousel: MediaItem[] = weddingGallery;

// CRVE Films: reel general, puede mezclar fotos de ambas categorías.
export const filmsGallery: MediaItem[] = weddingGallery.slice(4, 12);
