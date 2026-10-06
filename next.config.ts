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
    ];
  },
};

export default nextConfig;
