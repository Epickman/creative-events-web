"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import type { MediaItem } from "@/lib/media";

// Una fila arrastrable con loop infinito: se desplaza sola (en la
// dirección indicada), se pausa al pasar el mouse y se puede arrastrar
// con click/touch para moverla manualmente.
export function CarouselRow({
  items,
  speed,
}: {
  items: MediaItem[];
  speed: number;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const posRef = useRef(0);
  const isHoveringRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);

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
        posRef.current -= speed;
        const half = halfWidth();
        if (Math.abs(posRef.current) >= half) posRef.current %= half;
        if (posRef.current > 0) posRef.current -= half;
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
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = posRef.current;
      row.style.cursor = "grabbing";
      row.setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const delta = e.clientX - dragStartXRef.current;
      posRef.current = normalizePos(dragStartPosRef.current + delta);
      render();
    };

    const onPointerUp = () => {
      isDraggingRef.current = false;
      row.style.cursor = "grab";
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
    };
  }, [speed]);

  return (
    <div className="overflow-hidden">
      <div
        ref={rowRef}
        className="flex flex-nowrap select-none will-change-transform"
      >
        {[...items, ...items].map((item, index) => (
          <div
            key={index}
            className="relative mr-4 aspect-[4/3] w-[220px] flex-none overflow-hidden rounded-2xl bg-zinc-800 sm:w-[260px]"
          >
            <Image
              src={item.image}
              alt={item.alt}
              fill
              draggable={false}
              className="object-cover"
              sizes="260px"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

// Dos filas, cada una desplazándose sola en dirección opuesta a la
// otra. Ambas usan el set completo de fotos (no se parte a la mitad):
// si se dividiera y la cantidad fuera impar o chica, una fila queda
// con muy pocas fotos y se ve un hueco vacío al final del loop. La de
// abajo va en orden invertido para que no se vean idénticas.
export function ImageCarousel({ items }: { items: MediaItem[] }) {
  const bottomRow = [...items].reverse();

  return (
    <div className="flex flex-col gap-4">
      <CarouselRow items={items} speed={0.3} />
      <CarouselRow items={bottomRow} speed={-0.3} />
    </div>
  );
}
