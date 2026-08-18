# Martinez Outlet — Catálogo web

Catálogo online de productos de belleza, cuidado personal y aseo, con carrito
frontend y pedidos por WhatsApp. **No** incluye pagos online, login ni backend.

Stack: Next.js 16 (App Router) · TypeScript · React 19 · Tailwind CSS v4 ·
lucide-react.

## Ejecutar el proyecto

```bash
npm install
```

```bash
npm run dev
```

Luego abre http://localhost:3000

Otros comandos:

```bash
npm run build
```

```bash
npm run lint
```

## Lo que tienes que configurar

### 1. Número de WhatsApp (obligatorio)

Archivo: `src/lib/config.ts`

```ts
export const WHATSAPP_NUMBER = "519XXXXXXXXX"; // ← reemplázalo
```

Formato internacional, solo dígitos, sin `+`, sin espacios ni guiones.
Perú: `51` + los 9 dígitos del celular → `51987654321`.

Mientras el valor tenga "X", los botones de WhatsApp no abren el enlace: muestran
un aviso indicando que falta configurar el número.

### 2. Logo — ya configurado

El logo está en `public/logo.png` (círculo con fondo transparente, 384×384, generado a
partir de `public/logo.jpg`). Se usa en navbar, hero, "Sobre nosotros" y footer.
En navbar y footer se muestra junto al nombre de la marca, porque el texto dentro
del círculo sería ilegible a ese tamaño.

Para cambiarlo, reemplaza `public/logo.png` por otro PNG (idealmente cuadrado y con
fondo transparente). Si el archivo faltara, la web muestra un logotipo vectorial de
respaldo en vez de romperse.

### 3. Productos

Archivo: `src/data/products.ts` — un solo arreglo con todos los productos.

```ts
{
  id: "skc-serum-vitamina-c",   // único
  name: "Sérum Facial Vitamina C",
  category: "skincare",          // skincare | maquillaje | cuidado-capilar | aseo-personal | accesorios
  price: 39.9,
  previousPrice: 55.0,           // opcional (precio tachado)
  image: "/products/serum-facial.svg",
  description: "…",
  featured: true,                // opcional: aparece primero
  offer: true,                   // opcional: badge de oferta + filtro "Ofertas"
  size: "30 ml",                 // opcional
}
```

Las imágenes van en `public/products/`. Las incluidas son ilustraciones propias
en SVG (sin marcas registradas); puedes reemplazarlas por fotos reales
(`.jpg` / `.webp`, preferiblemente cuadradas) y actualizar el campo `image`.

### 4. Redes sociales, dirección y horarios

Archivo: `src/lib/config.ts` → `SOCIAL_LINKS` y `CONTACT_INFO`.
Están en `null` a propósito: no se inventó ningún dato. En cuanto pongas una URL
o un texto, el enlace o el bloque aparece solo en la sección de contacto y en el
footer.

## Estructura

```text
src/
├── app/
│   ├── layout.tsx           SEO, metadata, Open Graph, fuentes
│   ├── page.tsx             composición de la landing
│   ├── providers.tsx        carrito + filtros + avisos (client)
│   ├── globals.css          design tokens de marca (Tailwind v4)
│   ├── icon.svg             favicon
│   └── opengraph-image.tsx  imagen para redes (generada)
├── components/
│   ├── Navbar · Hero · Categories · Catalog · Benefits · About · Contact · Footer
│   ├── ProductCard · ProductGrid · ProductModal · SearchBar · Filters
│   ├── Cart · CartItem · WhatsAppFab · Logo
│   └── ui/  QuantityStepper · WhatsAppButton · SectionHeading · Reveal · Toaster
├── context/
│   ├── CartContext.tsx      carrito (localStorage, sin backend)
│   └── CatalogContext.tsx   búsqueda, categoría, orden, ofertas
├── data/
│   ├── products.ts          👈 catálogo
│   └── categories.ts
├── lib/
│   ├── config.ts            👈 WhatsApp, redes, contacto
│   ├── whatsapp.ts          armado del mensaje del pedido
│   └── format.ts            precios (S/) y descuentos
└── types/product.ts         Product, CartItem, filtros
```

## Preparado para una versión futura con backend

- `src/types/product.ts` define el contrato de datos: basta con que la API
  devuelva la misma forma para reemplazar `src/data/products.ts`.
- `src/data/products.ts` está aislado: ningún componente tiene productos
  hardcodeados.
- `src/lib/config.ts` centraliza los datos del negocio (número, redes, contacto).
- El carrito vive en `CartContext` con una API mínima (`addItem`, `removeItem`,
  `updateQuantity`, `clearCart`), fácil de conectar luego a un backend de pedidos.
- `buildOrderMessage()` genera el pedido a partir del carrito: el mismo objeto
  puede enviarse a una API cuando exista.
