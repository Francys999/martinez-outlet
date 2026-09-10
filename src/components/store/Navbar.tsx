"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, ShoppingBag, X } from "lucide-react";
import Logo from "@/components/Logo";
import { useCart } from "@/context/CartContext";
import type { CategoryListItem } from "@/types/catalog";

export default function Navbar({
  categories,
}: {
  categories: CategoryListItem[];
}) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [bump, setBump] = useState(false);
  const { totalItems, openCart } = useCart();
  const previousCount = useRef(0);

  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Microanimación del contador cuando se agrega algo al carrito.
  useEffect(() => {
    const grew = totalItems > previousCount.current;
    previousCount.current = totalItems;
    if (!grew) return;

    setBump(true);
    const timeout = window.setTimeout(() => setBump(false), 400);
    return () => window.clearTimeout(timeout);
  }, [totalItems]);

  // Cierra los menús al cambiar de página (reinicio durante el render).
  const [lastRoute, setLastRoute] = useState(pathname);
  if (lastRoute !== pathname) {
    setLastRoute(pathname);
    setMenuOpen(false);
    setCategoriesOpen(false);
  }

  const onSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const value = new FormData(event.currentTarget).get("q");
    const query = typeof value === "string" ? value.trim() : "";
    router.push(query ? `/catalogo?q=${encodeURIComponent(query)}` : "/catalogo");
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-lila-100 bg-white/90 shadow-[0_1px_16px_-10px_rgba(36,21,47,0.45)] backdrop-blur-xl"
          : "border-b border-transparent bg-white/70 backdrop-blur-sm"
      }`}
    >
      <nav
        aria-label="Navegación principal"
        className="mx-auto flex h-16 max-w-7xl items-center gap-3 px-4 sm:h-[72px] sm:px-6 lg:px-8"
      >
        <Link
          href="/"
          className="flex shrink-0 items-center"
          aria-label="Martinez Outlet — inicio"
        >
          <Logo size={40} priority withWordmark />
        </Link>

        <ul className="ml-4 hidden items-center gap-1 lg:flex">
          <li>
            <Link
              href="/catalogo"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-lila-700"
            >
              Catálogo
            </Link>
          </li>

          <li className="relative">
            <button
              type="button"
              onClick={() => setCategoriesOpen((open) => !open)}
              aria-expanded={categoriesOpen}
              className="inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-lila-700"
            >
              Categorías
              <ChevronDown
                className={`size-4 transition-transform ${
                  categoriesOpen ? "rotate-180" : ""
                }`}
                aria-hidden
              />
            </button>

            {categoriesOpen && (
              <div className="absolute left-0 top-full z-50 mt-1 w-64 rounded-2xl border border-lila-200 bg-white p-2 shadow-card">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/catalogo?categoria=${category.id}`}
                    className="flex items-center justify-between gap-2 rounded-xl px-3 py-2 text-sm text-ink transition-colors hover:bg-lila-50"
                  >
                    {category.name}
                    <span className="text-xs text-ink-muted">
                      {category.productCount}
                    </span>
                  </Link>
                ))}
                <Link
                  href="/catalogo?ofertas=1"
                  className="mt-1 block rounded-xl bg-fucsia-100 px-3 py-2 text-sm font-semibold text-fucsia-700 transition-colors hover:bg-fucsia-200"
                >
                  Ver ofertas
                </Link>
              </div>
            )}
          </li>

          <li>
            <Link
              href="/#nosotros"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-lila-700"
            >
              Nosotros
            </Link>
          </li>
          <li>
            <Link
              href="/#contacto"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-soft transition-colors hover:text-lila-700"
            >
              Contacto
            </Link>
          </li>
        </ul>

        <form
          onSubmit={onSearch}
          role="search"
          className="ml-auto hidden max-w-xs flex-1 md:block"
        >
          <label htmlFor="buscador-navbar" className="sr-only">
            Buscar productos
          </label>
          <div className="relative">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
              aria-hidden
            />
            <input
              id="buscador-navbar"
              name="q"
              type="search"
              placeholder="Buscar productos..."
              className="h-10 w-full rounded-xl border border-lila-200 bg-white pl-9 pr-3 text-sm text-ink placeholder:text-ink-muted focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
            />
          </div>
        </form>

        <div className="ml-auto flex items-center gap-2 md:ml-0">
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
            aria-controls="menu-tienda"
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
        id="menu-tienda"
        className={`overflow-hidden border-t border-lila-100 bg-white/95 backdrop-blur-xl transition-[max-height,opacity] duration-300 lg:hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6">
          <form onSubmit={onSearch} role="search" className="mb-3 md:hidden">
            <label htmlFor="buscador-menu" className="sr-only">
              Buscar productos
            </label>
            <div className="relative">
              <Search
                className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-muted"
                aria-hidden
              />
              <input
                id="buscador-menu"
                name="q"
                type="search"
                placeholder="Buscar productos..."
                tabIndex={menuOpen ? 0 : -1}
                className="h-11 w-full rounded-xl border border-lila-200 bg-white pl-9 pr-3 text-[15px] text-ink placeholder:text-ink-muted focus:border-lila-400 focus:outline-none focus:ring-2 focus:ring-lila-200"
              />
            </div>
          </form>

          <Link
            href="/catalogo"
            tabIndex={menuOpen ? 0 : -1}
            className="block rounded-lg px-2 py-2.5 text-[15px] font-semibold text-ink hover:bg-lila-50"
          >
            Ver todo el catálogo
          </Link>

          <p className="mt-2 px-2 text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Categorías
          </p>
          <ul className="mt-1 grid grid-cols-2 gap-1">
            {categories.map((category) => (
              <li key={category.id}>
                <Link
                  href={`/catalogo?categoria=${category.id}`}
                  tabIndex={menuOpen ? 0 : -1}
                  className="block rounded-lg px-2 py-2 text-sm text-ink-soft hover:bg-lila-50 hover:text-ink"
                >
                  {category.name}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-2 flex gap-1">
            <Link
              href="/#nosotros"
              tabIndex={menuOpen ? 0 : -1}
              className="flex-1 rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-lila-50"
            >
              Nosotros
            </Link>
            <Link
              href="/#contacto"
              tabIndex={menuOpen ? 0 : -1}
              className="flex-1 rounded-lg px-2 py-2.5 text-sm font-medium text-ink-soft hover:bg-lila-50"
            >
              Contacto
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
