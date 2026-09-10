"use client";

import { useEffect, useState, type ReactNode } from "react";
import { siteConfig, buildWhatsappUrl } from "@/lib/site-config";

type ConsultButtonProps = {
  className?: string;
  children: ReactNode;
};

// Botón que abre un modal para elegir el motivo de consulta antes de ir a
// WhatsApp, reutilizado en todos los CTA "Escribinos por WhatsApp" del sitio.
export function ConsultButton({ className, children }: ConsultButtonProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={className}>
        {children}
      </button>

      {open ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Elegí el motivo de tu consulta"
          className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/60 p-6"
          onClick={() => setOpen(false)}
        >
          <div
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl dark:bg-zinc-950"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-lg font-semibold text-zinc-950 dark:text-zinc-50">
                  ¿Por qué nos consultás?
                </h2>
                <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                  Elegí una opción y te llevamos a WhatsApp.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Cerrar"
                className="flex h-8 w-8 flex-none items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-950 dark:hover:bg-white/[.08] dark:hover:text-zinc-50"
              >
                ✕
              </button>
            </div>

            <div className="mt-5 flex flex-col gap-2">
              {siteConfig.consultOptions.map((option) => (
                <a
                  key={option.label}
                  href={buildWhatsappUrl(option.message)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="rounded-xl border border-black/[.08] px-4 py-3 text-sm font-medium text-zinc-700 transition-colors hover:border-accent-strong hover:text-zinc-950 dark:border-white/[.1] dark:text-zinc-300 dark:hover:border-accent dark:hover:text-zinc-50"
                >
                  {option.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
