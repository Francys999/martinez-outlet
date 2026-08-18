import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    /**
     * Las imágenes de producto incluidas son SVG propios que viven en /public.
     * Next solo optimiza SVG con esta bandera activa; el sandbox + CSP evitan
     * que un SVG pueda ejecutar scripts.
     * Si más adelante solo usas .jpg/.png/.webp, puedes quitar este bloque.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
