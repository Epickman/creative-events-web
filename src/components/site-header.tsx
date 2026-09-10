"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import type { MouseEvent } from "react";
import { siteConfig } from "@/lib/site-config";
import logo from "@/images/brand/logo-dark.png";
import crveFilmsLogo from "@/images/brand/crve-films-header-dark.png";
import crveFilmsLogoLight from "@/images/brand/crve-films-header-light.png";
import { MobileNav } from "@/components/mobile-nav";
import { runPageTransition } from "@/components/page-transition-overlay";

export function SiteHeader() {
  const pathname = usePathname();
  const router = useRouter();
  const isCrveFilms = pathname === "/crve-films";

  // Transición animada (empuje con anime.js) al cambiar entre el modo
  // Creative Events y CRVE Films: un solo barrido continuo que pasa por
  // el centro (ahí se cambia de página) y sigue de largo hacia el otro
  // costado. A CRVE Films corre hacia la derecha; de vuelta a Creative
  // Events corre hacia la izquierda.
  const navigateWithTransition =
    (href: string) => (e: MouseEvent<HTMLAnchorElement>) => {
      if (pathname === href) return;
      e.preventDefault();
      const direction = href === "/crve-films" ? "right" : "left";
      runPageTransition(direction, () => router.push(href));
    };

  return (
    <header
      className={`sticky top-0 z-50 border-b backdrop-blur transition-colors ${
        isCrveFilms
          ? "border-white/10 bg-black"
          : "border-black/[.06] bg-white/90"
      }`}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center gap-8 px-4">
        <div className="flex h-full flex-none items-center gap-8">
          <Link
            href="/"
            onClick={navigateWithTransition("/")}
            className="flex h-full items-center"
          >
            <Image
              src={logo}
              alt={siteConfig.name}
              className={`h-9 w-auto ${isCrveFilms ? "brightness-0 invert" : ""}`}
              priority
            />
          </Link>

          <Link
            href="/crve-films"
            onClick={navigateWithTransition("/crve-films")}
            className="flex h-full flex-none items-center transition-opacity hover:opacity-80"
          >
            {/* Caja de tamaño fijo: las dos versiones del logo (clara/
                oscura) tienen proporciones distintas, así que en vez de
                depender del ancho intrínseco de cada imagen, se acomodan
                dentro de un mismo recuadro para que el tamaño no salte
                al cambiar de modo. */}
            <div className="relative h-9 w-[85px] sm:h-10 sm:w-[95px]">
              <Image
                src={isCrveFilms ? crveFilmsLogo : crveFilmsLogoLight}
                alt="CRVE Films"
                fill
                className="object-contain object-left"
              />
            </div>
          </Link>
        </div>

        <nav aria-label="Principal" className="ml-auto hidden h-full gap-8 md:flex">
          {siteConfig.nav.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`relative flex h-full items-center text-sm font-medium transition-colors ${
                  isActive
                    ? "text-zinc-950"
                    : "text-zinc-600 hover:text-zinc-950"
                }`}
              >
                {item.label}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-0.5 rounded-full bg-accent-strong transition-opacity ${
                    isActive ? "opacity-100" : "opacity-0"
                  }`}
                />
              </Link>
            );
          })}
        </nav>

        <div className="ml-auto flex items-center">
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
