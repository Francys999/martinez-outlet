import {
  Brush,
  Droplets,
  ShowerHead,
  Sparkles,
  Tag,
  Wind,
  type LucideIcon,
} from "lucide-react";
import type { CategoryFilter, CategoryId } from "@/types/product";

export interface Category {
  /** "ofertas" no es una categoría real: filtra los productos con offer: true. */
  id: CategoryFilter;
  name: string;
  description: string;
  icon: LucideIcon;
  /** Clases Tailwind del degradado suave de la tarjeta. */
  tint: string;
  /** Color del icono dentro de la tarjeta. */
  iconClass: string;
}

/** Nombre visible de cada categoría real (usado en cards, filtros y modal). */
export const CATEGORY_LABELS: Record<CategoryId, string> = {
  skincare: "Skincare",
  maquillaje: "Maquillaje",
  "cuidado-capilar": "Cuidado capilar",
  "aseo-personal": "Aseo personal",
  accesorios: "Accesorios",
};

export const categories: Category[] = [
  {
    id: "skincare",
    name: "Skincare",
    description: "Productos para el cuidado de la piel.",
    icon: Droplets,
    tint: "from-lila-100 to-lila-200/70",
    iconClass: "text-lila-700",
  },
  {
    id: "maquillaje",
    name: "Maquillaje",
    description: "Productos de maquillaje y belleza.",
    icon: Sparkles,
    tint: "from-fucsia-100 to-fucsia-200/70",
    iconClass: "text-fucsia-700",
  },
  {
    id: "cuidado-capilar",
    name: "Cuidado capilar",
    description: "Shampoos, acondicionadores y tratamientos.",
    icon: Wind,
    tint: "from-lila-100 to-lila-300/60",
    iconClass: "text-lila-800",
  },
  {
    id: "aseo-personal",
    name: "Aseo personal",
    description: "Jabones, higiene y cuidado diario.",
    icon: ShowerHead,
    tint: "from-lila-50 to-lila-200/70",
    iconClass: "text-lila-700",
  },
  {
    id: "accesorios",
    name: "Accesorios",
    description: "Accesorios de belleza y cuidado personal.",
    icon: Brush,
    tint: "from-fucsia-100 to-lila-200/70",
    iconClass: "text-fucsia-700",
  },
  {
    id: "ofertas",
    name: "Ofertas",
    description: "Productos con precios especiales.",
    icon: Tag,
    tint: "from-fucsia-200/80 to-lila-200/70",
    iconClass: "text-fucsia-700",
  },
];

/** Opciones del selector de categoría del catálogo (incluye "Todas"). */
export const CATEGORY_FILTER_OPTIONS: { value: CategoryFilter; label: string }[] =
  [
    { value: "all", label: "Todas las categorías" },
    ...(Object.keys(CATEGORY_LABELS) as CategoryId[]).map((id) => ({
      value: id as CategoryFilter,
      label: CATEGORY_LABELS[id],
    })),
  ];
