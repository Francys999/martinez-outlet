"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { buildContactMessage, buildWhatsAppUrl } from "@/lib/whatsapp";
import type { Banner } from "@/types/catalog";

const THEMES: Record<string, { wrapper: string; text: string; button: string }> = {
  lila: {
    wrapper: "from-lila-100 via-lila-50 to-white",
    text: "text-ink",
    button: "bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-white",
  },
  fucsia: {
    wrapper: "from-fucsia-200/70 via-fucsia-100 to-lila-100",
    text: "text-ink",
    button: "bg-gradient-to-r from-fucsia-600 to-fucsia-700 text-white",
  },
  oscuro: {
    wrapper: "from-ink via-lila-800 to-lila-700",
    text: "text-white",
    button: "bg-white text-lila-800",
  },
  claro: {
    wrapper: "from-white via-lila-50 to-lila-100",
    text: "text-ink",
    button: "bg-lila-700 text-white",
  },
};

const AUTOPLAY_MS = 6000;

/** Convierte el `link` del anuncio en una URL. */
function hrefFor(banner: Banner): string {
  switch (banner.link.type) {
    case "categoria":
      return `/catalogo?categoria=${banner.link.value}`;
    case "producto":
      return `/producto/${banner.link.value}`;
    case "ofertas":
      return "/catalogo?ofertas=1";
    case "whatsapp":
      return buildWhatsAppUrl(buildContactMessage());
    default:
      return "/catalogo";
  }
}

export default function BannerSlider({ banners }: { banners: Banner[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timer = useRef<number | null>(null);

  const go = useCallback(
    (next: number) => {
      setIndex(((next % banners.length) + banners.length) % banners.length);
    },
    [banners.length],
  );

  useEffect(() => {
    if (paused || banners.length <= 1) return;

    timer.current = window.setTimeout(() => go(index + 1), AUTOPLAY_MS);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [index, paused, banners.length, go]);

  if (banners.length === 0) return null;

  const banner = banners[index]!;
  const theme = THEMES[banner.theme] ?? THEMES.lila!;
  const href = hrefFor(banner);
  const isExternal = href.startsWith("http");

  return (
    <section
      aria-roledescription="carrusel"
      aria-label="Promociones"
      className="mx-auto max-w-7xl px-4 pt-4 sm:px-6 lg:px-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={`relative overflow-hidden rounded-3xl border border-lila-200 bg-gradient-to-br ${theme.wrapper}`}
      >
        <div className="relative flex min-h-[220px] flex-col justify-center gap-3 px-6 py-8 sm:min-h-[260px] sm:px-10 sm:py-10 lg:min-h-[280px] lg:px-14">
          <div className="max-w-2xl">
            {banner.badge && (
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-bold uppercase tracking-[0.12em] ${
                  banner.theme === "oscuro"
                    ? "bg-white/15 text-white"
                    : "bg-fucsia-600 text-white"
                }`}
              >
                {banner.badge}
              </span>
            )}

            <h2
              className={`mt-3 font-display text-2xl font-extrabold leading-tight text-balance sm:text-3xl lg:text-4xl ${theme.text}`}
            >
              {banner.title}
            </h2>

            {banner.subtitle && (
              <p
                className={`mt-2 max-w-xl text-pretty text-sm sm:text-base ${
                  banner.theme === "oscuro" ? "text-lila-100" : "text-ink-soft"
                }`}
              >
                {banner.subtitle}
              </p>
            )}

            {isExternal ? (
              <a
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-5 inline-flex h-12 items-center gap-2 rounded-xl px-5 text-[15px] font-semibold shadow-soft transition-all hover:shadow-card active:scale-[0.98] ${theme.button}`}
              >
                {banner.ctaLabel ?? "Ver más"}
                <ArrowRight className="size-4.5" aria-hidden />
              </a>
            ) : (
              <Link
                href={href}
                className={`mt-5 inline-flex h-12 items-center gap-2 rounded-xl px-5 text-[15px] font-semibold shadow-soft transition-all hover:shadow-card active:scale-[0.98] ${theme.button}`}
              >
                {banner.ctaLabel ?? "Ver catálogo"}
                <ArrowRight className="size-4.5" aria-hidden />
              </Link>
            )}
          </div>
        </div>

        {banners.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(index - 1)}
              aria-label="Anuncio anterior"
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-lila-200 bg-white/90 text-ink shadow-soft transition-colors hover:bg-white"
            >
              <ChevronLeft className="size-5" aria-hidden />
            </button>
            <button
              type="button"
              onClick={() => go(index + 1)}
              aria-label="Siguiente anuncio"
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full border border-lila-200 bg-white/90 text-ink shadow-soft transition-colors hover:bg-white"
            >
              <ChevronRight className="size-5" aria-hidden />
            </button>

            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
              {banners.map((item, dot) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => go(dot)}
                  aria-label={`Ir al anuncio ${dot + 1}: ${item.title}`}
                  aria-current={dot === index}
                  className={`h-2 rounded-full transition-all ${
                    dot === index
                      ? "w-6 bg-fucsia-600"
                      : "w-2 bg-ink/20 hover:bg-ink/40"
                  }`}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}
