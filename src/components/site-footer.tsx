"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site-config";
import logo from "@/images/brand/logo.png";
import { ConsultButton } from "@/components/consult-button";

export function SiteFooter() {
  const pathname = usePathname();
  const isCrveFilms = pathname === "/crve-films";

  return (
    <footer
      className={`relative z-10 border-t border-white/10 text-zinc-50 ${
        isCrveFilms ? "bg-black" : "bg-[#0c0c0d]"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-start gap-3">
          <Image src={logo} alt={siteConfig.name} className="h-14 w-auto" />
          <p className="max-w-xs text-sm text-zinc-400">{siteConfig.tagline}</p>
        </div>

        <nav aria-label="Secciones" className="flex flex-col gap-2">
          {siteConfig.nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-zinc-400 transition-colors hover:text-accent"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-2 text-sm text-zinc-400">
          <a
            href={`mailto:${siteConfig.contact.email}`}
            className="transition-colors hover:text-accent"
          >
            {siteConfig.contact.email}
          </a>
          <ConsultButton className="text-left transition-colors hover:text-accent">
            {siteConfig.contact.phoneDisplay}
          </ConsultButton>
          <a
            href={siteConfig.contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-accent"
          >
            {siteConfig.contact.instagramHandle}
          </a>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-6 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} {siteConfig.legalName}. Todos los
        derechos reservados.
      </div>
    </footer>
  );
}
