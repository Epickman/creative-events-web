"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { siteConfig, buildWhatsappUrl } from "@/lib/site-config";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        className="relative flex h-10 w-10 flex-none flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-zinc-950 transition-transform ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-zinc-950 transition-opacity ${
            open ? "opacity-0" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-zinc-950 transition-transform ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open && mounted
        ? createPortal(
            <div className="fixed inset-x-0 top-16 bottom-0 z-[200] overflow-y-auto bg-white px-6 py-8">
              <nav aria-label="Principal" className="flex flex-col gap-1">
                {siteConfig.nav.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-3 py-3 text-base font-medium text-zinc-800 transition-colors hover:bg-zinc-50"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-8 border-t border-black/[.08] pt-8">
                <p className="px-3 text-xs uppercase tracking-[0.2em] text-zinc-400">
                  ¿Por qué nos consultás?
                </p>
                <div className="mt-3 flex flex-col gap-1">
                  {siteConfig.consultOptions.map((option) => (
                    <a
                      key={option.label}
                      href={buildWhatsappUrl(option.message)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                      className="rounded-xl px-3 py-3 text-sm text-zinc-600 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                    >
                      {option.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>,
            document.body
          )
        : null}
    </div>
  );
}
