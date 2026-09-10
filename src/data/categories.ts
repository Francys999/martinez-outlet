import type { Category } from "@/types/catalog";

/* ==========================================================================
 *  CATEGORÍAS
 *
 *  Para agregar una categoría:
 *   1. Añade su `id` en CategoryId (src/types/catalog.ts).
 *   2. Agrega el bloque aquí abajo, en el orden en que quieras que aparezca.
 *   3. Usa ese `id` en el campo `category` de los productos.
 *
 *  El `icon` es un nombre de lucide-react. Los disponibles están en
 *  src/components/store/CategoryGrid.tsx (CATEGORY_ICONS).
 * ========================================================================== */

export const categories: Category[] = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Cuidado facial: limpieza, hidratación y protección.",
    icon: "Droplets",
  },
  {
    id: "maquillaje",
    name: "Maquillaje y belleza",
    description: "Labiales, bases, máscaras y todo para tu look.",
    icon: "Sparkles",
  },
  {
    id: "joyeria",
    name: "Joyería y accesorios",
    description: "Aretes, collares, anillos y pulseras.",
    icon: "Gem",
  },
  {
    id: "aseo-personal",
    name: "Aseo personal",
    description: "Jabones, cremas corporales e higiene diaria.",
    icon: "ShowerHead",
  },
  {
    id: "cuidado-capilar",
    name: "Cuidado capilar",
    description: "Shampoo, acondicionador y tratamientos.",
    icon: "Wind",
  },
  {
    id: "mochilas-loncheras",
    name: "Mochilas y loncheras",
    description: "Mochilas, loncheras, cartucheras y termos.",
    icon: "Backpack",
  },
  {
    id: "bazar",
    name: "Bazar y variedades",
    description: "Accesorios de belleza y artículos prácticos.",
    icon: "ShoppingBasket",
  },
];
