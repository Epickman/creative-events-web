import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

// Todas las rutas reales del sitio, incluidas las que ya no están en el
// menú principal (nosotros, blog) pero siguen siendo accesibles.
const routes = [
  "/",
  "/eventos-corporativos",
  "/eventos-sociales",
  "/crve-films",
  "/realizaciones",
  "/nosotros",
  "/blog",
  "/contacto",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((href) => ({
    url: `${siteConfig.url}${href === "/" ? "" : href}`,
    lastModified: new Date(),
    changeFrequency: href === "/blog" ? "weekly" : "monthly",
    priority: href === "/" ? 1 : 0.7,
  }));
}
