import type { Metadata } from "next";
import { Montserrat, Fraunces, Space_Grotesk } from "next/font/google";
import { siteConfig } from "@/lib/site-config";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { PageTransitionOverlay } from "@/components/page-transition-overlay";
import { JsonLd, organizationJsonLd, websiteJsonLd } from "@/lib/seo";
import "./globals.css";

// Tipografía principal del sitio: Montserrat, tanto para texto general
// como para títulos (h1/h2/h3 usan --font-display, mapeado a esta misma
// fuente en globals.css).
const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Serif elegante para el título principal de la home ("Productora de
// eventos de categoría"), más premium que la display geométrica.
const fraunces = Fraunces({
  variable: "--font-hero",
  subsets: ["latin"],
  weight: ["500", "600"],
  style: ["normal", "italic"],
});

// Tipografía técnica de CRVE Films (identidad audiovisual propia, estilo
// timecode de producción), distinta al resto del sitio.
const spaceGrotesk = Space_Grotesk({
  variable: "--font-tech",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "producción de eventos",
    "casamientos",
    "eventos corporativos",
    "eventos sociales",
    "productora de eventos Buenos Aires",
    "wedding planner Buenos Aires",
    "organización de eventos Argentina",
    "ambientación de eventos",
  ],
  authors: [{ name: siteConfig.legalName }],
  creator: siteConfig.legalName,
  openGraph: {
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${fraunces.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <JsonLd graph={[organizationJsonLd, websiteJsonLd]} />
        <PageTransitionOverlay />
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
