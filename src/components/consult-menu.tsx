"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig, buildWhatsappUrl } from "@/lib/site-config";

type ConsultMenuProps = {
  className?: string;
  buttonClassName?: string;
};

const defaultButtonClassName =
  "inline-flex items-center justify-center rounded-full bg-zinc-950 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-[#2f4a3d]";

export function ConsultMenu({ className, buttonClassName }: ConsultMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handlePointerDown(event: PointerEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div ref={containerRef} className={`relative ${className ?? ""}`}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-haspopup="menu"
        aria-expanded={open}
        className={buttonClassName ?? defaultButtonClassName}
      >
        Consultar
      </button>

      {open ? (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+0.5rem)] w-72 rounded-2xl border border-black/[.08] bg-white p-2 shadow-xl dark:border-white/[.1] dark:bg-zinc-950"
        >
          <p className="px-3 py-2 text-xs uppercase tracking-[0.2em] text-zinc-400 dark:text-zinc-600">
            ¿Por qué nos consultás?
          </p>
          {siteConfig.consultOptions.map((option) => (
            <a
              key={option.label}
              role="menuitem"
              href={buildWhatsappUrl(option.message)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="block rounded-xl px-3 py-2.5 text-sm text-zinc-700 transition-colors hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-300 dark:hover:bg-white/[.06] dark:hover:text-zinc-50"
            >
              {option.label}
            </a>
          ))}
        </div>
      ) : null}
    </div>
  );
}
