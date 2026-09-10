"use client";

import { useEffect, useRef } from "react";

type Slide = {
  title: string;
  subtitle: string;
  href: string;
};

// Nombres reales de historias destacadas del Instagram de Creative Events
// (@creative.events.productions), enlazadas a cada destacado puntual.
// No inventamos citas ni reseñas: no hay forma de leer comentarios reales
// de Instagram sin iniciar sesión, así que mostramos los eventos reales en
// vez de testimonios fabricados.
const slides: Slide[] = [
  {
    title: "Boda B&G",
    subtitle: "Destacado de Instagram",
    href: "https://www.instagram.com/stories/highlights/17847729846617400/",
  },
  {
    title: "Paloma Festival",
    subtitle: "Destacado de Instagram",
    href: "https://www.instagram.com/stories/highlights/18058145627556734/",
  },
  {
    title: "XV Sofía",
    subtitle: "Destacado de Instagram",
    href: "https://www.instagram.com/stories/highlights/18010707344792211/",
  },
  {
    title: "Boda Maru & Emi",
    subtitle: "Destacado de Instagram",
    href: "https://www.instagram.com/stories/highlights/18156322186366715/",
  },
  {
    title: "Cumple Chany",
    subtitle: "Destacado de Instagram",
    href: "https://www.instagram.com/stories/highlights/18070699922067841/",
  },
  {
    title: "@creative.events.productions",
    subtitle: "Seguinos en Instagram",
    href: "https://www.instagram.com/creative.events.productions/",
  },
];

const SPEED = 0.4; // px por frame

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-accent"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.9" fill="currentColor" stroke="none" />
    </svg>
  );
}

// Cinta de banners con loop infinito: se desplaza sola, se pausa al pasar
// el mouse y se puede arrastrar con click/touch para moverla manualmente.
export function PromoBanner() {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const hasDraggedRef = useRef(false);

  useEffect(() => {
    const row = rowRef.current;
    if (!row) return;

    const halfWidth = () => row.scrollWidth / 2;

    const normalizePos = (p: number) => {
      const half = halfWidth();
      if (half <= 0) return p;
      p = p % half;
      if (p > 0) p -= half;
      return p;
    };

    const render = () => {
      row.style.transform = `translate3d(${posRef.current}px, 0, 0)`;
    };

    let rafId: number;
    const animate = () => {
      if (!isHoveringRef.current && !isDraggingRef.current) {
        posRef.current -= SPEED;
        if (Math.abs(posRef.current) >= halfWidth()) posRef.current = 0;
        render();
      }
      rafId = requestAnimationFrame(animate);
    };

    const onMouseEnter = () => {
      isHoveringRef.current = true;
    };
    const onMouseLeave = () => {
      isHoveringRef.current = false;
    };

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      hasDraggedRef.current = false;
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = posRef.current;
      row.style.cursor = "grabbing";
      row.setPointerCapture?.(e.pointerId);
      // Ojo: no hacer preventDefault acá — con setPointerCapture eso hace
      // que el navegador nunca dispare el "click" al soltar, incluso en un
      // click simple sin arrastre. Solo prevenimos una vez confirmado el
      // arrastre, en onPointerMove.
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - dragStartXRef.current;
      if (Math.abs(delta) > 3) {
        hasDraggedRef.current = true;
        e.preventDefault();
      }
      posRef.current = normalizePos(dragStartPosRef.current + delta);
      render();
    };

    const onPointerUp = (e?: Event) => {
      if (!isDraggingRef.current) return;
      isDraggingRef.current = false;
      row.style.cursor = "grab";

      const pointerEvent =
        e && "pointerId" in e ? (e as PointerEvent) : undefined;
      if (pointerEvent) {
        row.releasePointerCapture?.(pointerEvent.pointerId);
      }

      // Con setPointerCapture, el navegador liga el "click" resultante al
      // elemento que capturó el puntero (este contenedor) en vez del link
      // bajo el cursor, así que si no hubo arrastre navegamos a mano.
      if (!hasDraggedRef.current && pointerEvent) {
        const target = document.elementFromPoint(
          pointerEvent.clientX,
          pointerEvent.clientY
        );
        const link = target?.closest("a");
        if (link && row.contains(link)) {
          link.click();
        }
      }
    };

    const onClickCapture = (e: MouseEvent) => {
      if (hasDraggedRef.current) {
        e.preventDefault();
        e.stopPropagation();
        hasDraggedRef.current = false;
      }
    };

    row.style.cursor = "grab";
    row.style.touchAction = "pan-y";

    row.addEventListener("mouseenter", onMouseEnter);
    row.addEventListener("mouseleave", onMouseLeave);
    row.addEventListener("pointerdown", onPointerDown);
    row.addEventListener("pointermove", onPointerMove);
    row.addEventListener("pointerup", onPointerUp);
    row.addEventListener("pointercancel", onPointerUp);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("blur", onPointerUp);
    row.addEventListener("click", onClickCapture, true);

    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
      row.removeEventListener("mouseenter", onMouseEnter);
      row.removeEventListener("mouseleave", onMouseLeave);
      row.removeEventListener("pointerdown", onPointerDown);
      row.removeEventListener("pointermove", onPointerMove);
      row.removeEventListener("pointerup", onPointerUp);
      row.removeEventListener("pointercancel", onPointerUp);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("blur", onPointerUp);
      row.removeEventListener("click", onClickCapture, true);
    };
  }, []);

  return (
    <div className="overflow-hidden border-y border-white/10 bg-[#0c0c0d] py-4">
      <div ref={rowRef} className="flex flex-nowrap select-none will-change-transform">
        {[...slides, ...slides].map((slide, index) => (
          <a
            key={index}
            href={slide.href}
            target="_blank"
            rel="noopener noreferrer"
            draggable={false}
            className="relative mr-3 flex aspect-[16/8] w-[260px] flex-none flex-col justify-end gap-2 overflow-hidden rounded-lg border border-white/10 bg-white/[.03] p-4 text-zinc-50 transition-colors hover:border-accent/40"
          >
            <div className="flex items-center gap-1.5">
              <InstagramIcon />
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.08em] text-accent">
                {slide.subtitle}
              </span>
            </div>
            <span className="relative text-[1.05rem] font-semibold leading-snug tracking-tight text-balance">
              {slide.title}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
