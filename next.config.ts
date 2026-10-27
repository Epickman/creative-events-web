import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un solo dominio canónico: www.crve-events.com redirige a crve-events.com
  // para que Google no indexe las dos versiones como contenido duplicado.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.crve-events.com" }],
        destination: "https://crve-events.com/:path*",
        permanent: true,
      },
      // El link viejo de la política de privacidad tenía tilde
      // (/política-de-privacidad); el slug real va sin tilde.
      {
        source: "/pol%C3%ADtica-de-privacidad",
        destination: "/politica-de-privacidad",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
