"use client";

import { useCallback, useState } from "react";

interface LogoProps {
  /** Alto del logo en píxeles. */
  size?: number;
  className?: string;
  /** Variante clara para fondos oscuros (footer). */
  light?: boolean;
  priority?: boolean;
  /**
   * Muestra el nombre de la marca junto al isotipo.
   * Se usa en tamaños pequeños (navbar, footer), donde el texto que va dentro
   * del logo circular quedaría ilegible.
   */
  withWordmark?: boolean;
}

/**
 * Logo de Martinez Outlet.
 *
 * 👉 El archivo vive en:  /public/logo.png
 *    Se usa en navbar, hero, "Sobre nosotros" y footer.
 *    Si el archivo faltara, se muestra un isotipo + wordmark vectorial de
 *    respaldo (mismos colores de marca), para que la web nunca se vea rota.
 *
 * Se usa <img> en lugar de next/image porque necesitamos el evento onError
 * para hacer ese respaldo.
 */
export default function Logo({
  size = 40,
  className = "",
  light = false,
  priority = false,
  withWordmark = false,
}: LogoProps) {
  const [failed, setFailed] = useState(false);

  // Si la imagen ya había fallado antes de hidratar, onError no llega a
  // dispararse: se comprueba también al montar el nodo.
  const checkOnMount = useCallback((node: HTMLImageElement | null) => {
    if (node?.complete && node.naturalWidth === 0) setFailed(true);
  }, []);

  if (!failed) {
    const image = (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        ref={checkOnMount}
        src="/logo.png"
        alt="Martinez Outlet"
        height={size}
        style={{ height: size }}
        className={`w-auto object-contain ${className}`}
        onError={() => setFailed(true)}
        // El logo se carga siempre de inmediato: pesa poco y así el respaldo
        // vectorial aparece sin saltos si el archivo aún no existe.
        loading="eager"
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
      />
    );

    if (!withWordmark) return image;

    return (
      <span className="inline-flex items-center gap-2.5">
        {image}
        <Wordmark light={light} />
      </span>
    );
  }

  return <LogoFallback size={size} light={light} className={className} />;
}

/** Nombre de la marca en tipografía display, para acompañar al isotipo. */
function Wordmark({ light }: { light: boolean }) {
  return (
    <span className="flex flex-col leading-none">
      <span
        className={`font-display text-[15px] font-extrabold tracking-[0.1em] ${
          light ? "text-white" : "text-ink"
        }`}
      >
        MARTINEZ
      </span>
      <span
        className={`mt-1 font-display text-[10px] font-semibold tracking-[0.34em] ${
          light ? "text-lila-300" : "text-lila-600"
        }`}
      >
        OUTLET
      </span>
    </span>
  );
}

/** Isotipo + wordmark vectorial con la identidad lila / morado / fucsia. */
export function LogoFallback({
  size = 40,
  light = false,
  className = "",
}: {
  size?: number;
  light?: boolean;
  className?: string;
}) {
  const wordmark = light ? "#FFFFFF" : "#24152F";
  const outlet = light ? "#F2EAFC" : "#8253C7";

  return (
    <svg
      viewBox="0 0 260 64"
      style={{ height: size }}
      className={`w-auto ${className}`}
      role="img"
      aria-label="Martinez Outlet"
    >
      <defs>
        <linearGradient id="mo-mark" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#B48FE8" />
          <stop offset="55%" stopColor="#8253C7" />
          <stop offset="100%" stopColor="#EC008C" />
        </linearGradient>
      </defs>
      <rect x="2" y="6" width="52" height="52" rx="17" fill="url(#mo-mark)" />
      <path
        d="M28 17c4.6 6.2 7.4 10.6 7.4 14.4 0 4.6-3.3 7.6-7.4 7.6s-7.4-3-7.4-7.6C20.6 27.6 23.4 23.2 28 17z"
        fill="#FFFFFF"
        opacity="0.92"
      />
      <circle cx="38.5" cy="42.5" r="4.5" fill="#FFFFFF" opacity="0.75" />
      <text
        x="70"
        y="30"
        fill={wordmark}
        fontFamily="var(--font-display-brand), system-ui, sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="1.4"
      >
        MARTINEZ
      </text>
      <text
        x="70"
        y="50"
        fill={outlet}
        fontFamily="var(--font-display-brand), system-ui, sans-serif"
        fontSize="17"
        fontWeight="600"
        letterSpacing="6.5"
      >
        OUTLET
      </text>
    </svg>
  );
}
