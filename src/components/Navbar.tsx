"use client";

import { useEffect, useRef, useState } from "react";
import { Menu, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/Logo";
import { NAV_LINKS } from "@/lib/config";
import { useCart } from "@/context/CartContext";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { totalItems, openCart } = useCart();
  const previousCount = useRef(0);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Microanimación del badge cada vez que crece la cantidad de productos.
  useEffect(() => {
    const grew = totalItems > previousCount.current;
    previousCount.current = totalItems;
    if (!grew) return;

    setBump(true);
    const timeout = window.setTimeout(() => setBump(false), 400);
    return () => window.clearTimeout(timeout);
  }, [totalItems]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-lila-100 bg-white/85 shadow-[0_1px_16px_-10px_rgba(36,21,47,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/60 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-[72px] sm:px-6 lg:px-8"
      >
        <a
          href="#inicio"
          className="flex shrink-0 items-center"
          aria-label="Martinez Outlet — ir al inicio"
        >
          <Logo size={40} priority withWordmark />
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="group relative rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-lila-700"
              >
                {link.label}
                <span className="absolute inset-x-3 -bottom-0.5 h-0.5 origin-left scale-x-0 rounded-full bg-gradient-to-r from-lila-500 to-fucsia-500 transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            aria-label={`Abrir carrito (${totalItems} ${
              totalItems === 1 ? "producto" : "productos"
            })`}
            className="relative grid size-11 place-items-center rounded-xl border border-lila-200 bg-white text-ink transition-all hover:border-lila-300 hover:bg-lila-50 active:scale-95"
          >
            <ShoppingBag className="size-5" aria-hidden />
            {totalItems > 0 && (
              <span
                className={`absolute -right-1.5 -top-1.5 grid min-w-5 place-items-center rounded-full bg-fucsia-600 px-1.5 text-[11px] font-bold leading-5 text-white ${
                  bump ? "animate-bump" : ""
                }`}
              >
                {totalItems}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuOpen}
            aria-controls="menu-mobile"
            className="grid size-11 place-items-center rounded-xl border border-lila-200 bg-white text-ink transition-all hover:border-lila-300 hover:bg-lila-50 active:scale-95 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden />
            ) : (
              <Menu className="size-5" aria-hidden />
            )}
          </button>
        </div>
      </nav>

      <div
        id="menu-mobile"
        className={`overflow-hidden border-t border-lila-100 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="mx-auto flex max-w-7xl flex-col px-4 py-2 sm:px-6">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={() => setMenuOpen(false)}
                tabIndex={menuOpen ? 0 : -1}
                className="block rounded-lg px-2 py-3 text-[15px] font-medium text-ink transition-colors hover:bg-lila-50 hover:text-lila-700"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
