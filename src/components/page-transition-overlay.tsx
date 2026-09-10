"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { animate } from "animejs";
import mark from "@/images/brand/mark.png";

export type TransitionDirection = "left" | "right";

let panelEl: HTMLDivElement | null = null;
let markEl: HTMLDivElement | null = null;

const LEG_DURATION = 380;

// Empuje cinematográfico continuo: el panel entra desde un costado,
// pasa por el centro (momento en que se cambia de página) y sigue de
// largo hasta salir por el otro costado, todo en un solo barrido sin
// pausas. direction "right" => todo el recorrido va de izquierda a
// derecha. direction "left" => todo el recorrido va de derecha a izquierda.
export function runPageTransition(
  direction: TransitionDirection,
  navigate: () => void
): Promise<void> {
  const panel = panelEl;
  if (!panel) {
    navigate();
    return Promise.resolve();
  }
  const from = direction === "right" ? "-100%" : "100%";
  const to = direction === "right" ? "100%" : "-100%";

  // A CRVE Films (derecha) la cortina es negra; de vuelta a Creative
  // Events (izquierda) es verde.
  panel.style.backgroundColor = direction === "right" ? "#000000" : "#2f4a3d";

  return new Promise((resolve) => {
    animate(panel, {
      translateX: [from, "0%"],
      duration: LEG_DURATION,
      ease: "inOutQuad",
      onComplete: () => {
        navigate();
        if (markEl) {
          animate(markEl, {
            opacity: [0, 1, 0],
            scale: [0.7, 1, 0.7],
            duration: LEG_DURATION,
            ease: "inOutQuad",
          });
        }
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            animate(panel, {
              translateX: ["0%", to],
              duration: LEG_DURATION,
              ease: "inOutQuad",
              onComplete: () => resolve(),
            });
          });
        });
      },
    });
  });
}

// Monta el panel una sola vez, en el layout raíz, para que persista
// entre navegaciones (no se desmonta al cambiar de página).
export function PageTransitionOverlay() {
  const panelRef = useRef<HTMLDivElement>(null);
  const markRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    panelEl = panelRef.current;
    markEl = markRef.current;
    return () => {
      panelEl = null;
      markEl = null;
    };
  }, []);

  return (
    <div
      ref={panelRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999] flex items-center justify-center bg-[#2a4536]"
      style={{ transform: "translateX(-100%)" }}
    >
      <div
        ref={markRef}
        className="opacity-0"
        style={{ transform: "scale(0.7)" }}
      >
        <Image src={mark} alt="" className="h-16 w-auto" priority />
      </div>
    </div>
  );
}
