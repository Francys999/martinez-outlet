import type { NextConfig } from "next";

/**
 * La web es 100% frontend: no hay base de datos, ni API, ni subida de
 * archivos. Todo el contenido sale de src/data y se compila con el sitio.
 */
const nextConfig: NextConfig = {
  images: {
    /**
     * Las ilustraciones del catálogo son SVG propios en /public. Next solo
     * optimiza SVG con esta bandera; el sandbox + CSP de abajo impiden que un
     * SVG pueda ejecutar scripts. No se aceptan imágenes de dominios externos:
     * `remotePatterns` vacío deja fuera cualquier origen que no sea el propio.
     */
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [],
  },

  /** No revelar la tecnología del servidor. */
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Evita que el navegador "adivine" tipos de archivo.
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Impide que la web se incruste en un iframe ajeno (clickjacking).
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          // La web no necesita cámara, micrófono ni ubicación.
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            /**
             * Política de contenido: solo se cargan recursos propios.
             * - form-action 'none': la web no envía formularios a ningún lado.
             * - frame-ancestors 'none': nadie puede incrustarla.
             * - connect-src 'self': no se envían datos a terceros.
             * 'unsafe-inline' en estilos y scripts es lo que necesita Next.js
             * para hidratar la página.
             */
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' 'unsafe-eval'",
              "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
              "font-src 'self' https://fonts.gstatic.com data:",
              "img-src 'self' data: blob:",
              "connect-src 'self'",
              "form-action 'none'",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "object-src 'none'",
              "upgrade-insecure-requests",
            ].join("; "),
          },
        ],
      },
    ];
  },
};

export default nextConfig;
