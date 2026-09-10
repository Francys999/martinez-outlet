# Martinez Outlet — Catálogo web

Catálogo online de belleza, skincare, joyería, aseo personal, mochilas y
variedades, con carrito y pedidos por WhatsApp.

**Es 100% frontend**: no hay base de datos, ni panel administrativo, ni servidor
propio. Todo el contenido vive en archivos dentro de `src/data` y se compila
junto con la web.

Stack: Next.js 16 · TypeScript · React 19 · Tailwind CSS v4 · lucide-react.

---

## Ejecutar el proyecto

```bash
npm install
```

```bash
npm run dev
```

Abre http://localhost:3000

Para publicar:

```bash
npm run build
```

```bash
npm start
```

---

## Los 3 archivos que vas a editar

### 1. Productos → `src/data/products.ts`

```ts
{
  id: "aretes-argolla-dorados",   // único; es la URL: /producto/aretes-argolla-dorados
  name: "Aretes Argolla Dorados",
  category: "joyeria",            // debe existir en src/data/categories.ts
  price: 16.9,                    // precio online (el que paga el cliente)
  storePrice: 24,                 // precio en tienda: se muestra tachado (opcional)
  images: ["/products/aretes.svg"],
  description: "Argollas livianas de acabado dorado...",
  stock: 24,                      // opcional: si lo omites, no se controla stock
  featured: true,                 // opcional: sale en "Lo más pedido"
  offer: true,                    // opcional: entra en Ofertas
  variants: [                     // opcional: colores, modelos o tallas
    { id: "medianas", type: "modelo", label: "Medianas (4 cm)", stock: 8 },
  ],
}
```

Para **fotos reales**: copia la imagen a `public/products/` y apunta `images` a
ella, por ejemplo `["/products/mi-foto.jpg"]`. Se recomiendan imágenes cuadradas.
Las 36 ilustraciones incluidas son SVG propios (sin marcas registradas).

### 2. Categorías → `src/data/categories.ts`

Las 7 actuales: Skincare · Maquillaje y belleza · Joyería y accesorios · Aseo
personal · Cuidado capilar · Mochilas y loncheras · Bazar y variedades.

Para agregar una nueva, añade su `id` en `CategoryId` (`src/types/catalog.ts`) y
luego el bloque en este archivo.

### 3. Anuncios del slider → `src/data/banners.ts`

Los carteles de la portada. Admiten fechas, así que una campaña de temporada
aparece y desaparece sola:

```ts
{
  id: "navidad",
  title: "Campaña de Navidad: 20% en joyería",
  badge: "Navidad",
  link: { type: "categoria", value: "joyeria" },
  theme: "fucsia",
  startsAt: "2026-12-01",
  endsAt: "2026-12-26",
}
```

### Datos del negocio → `src/lib/config.ts`

Número de WhatsApp (ya configurado: `51996112905`), textos de la portada,
redes sociales, dirección, horarios y correo. Las redes y los datos de contacto
vacíos simplemente no se muestran.

---

## Cómo compra el cliente

1. Entra y ve el catálogo (portada, `/catalogo` o por categoría).
2. Abre un producto, elige color o modelo si lo tiene, y lo agrega al carrito.
3. En el carrito ve el total y **cuánto ahorra comprando online**.
4. Pulsa "Continuar", deja nombre, teléfono y una nota (opcional).
5. Se abre WhatsApp con el pedido ya escrito: productos, cantidades, precios,
   total y un código de referencia.

El carrito se guarda en el navegador del cliente, así que no se pierde si cierra
la página.

---

## Protecciones contra abuso y spam

| Protección | Qué evita |
|---|---|
| **Precios recalculados** | El navegador solo guarda identificadores y cantidades. Nombres y precios salen siempre del catálogo, así que editar el almacenamiento local **no** permite fabricar precios ni productos falsos. |
| **Campo trampa (honeypot)** | Un campo invisible que las personas no ven pero los bots rellenan. Si llega con texto, el pedido no se envía. |
| **Tiempo mínimo** | Un formulario completado en menos de 3 segundos se descarta: es un robot. |
| **Espera entre pedidos** | 45 segundos entre un envío y el siguiente. |
| **Límite por hora y por día** | Máximo 5 pedidos por hora y 15 por día desde el mismo navegador. |
| **Topes de cantidad** | Hasta 20 unidades por producto, 30 productos distintos y 120 unidades por pedido. Para más, se invita a escribir por WhatsApp. |
| **Sin enlaces** | La nota del cliente no admite enlaces (el uso típico de spam) y se limpian los caracteres raros, para que nadie pueda "armar" un mensaje falso dentro del pedido. |
| **Cabeceras de seguridad** | CSP, `X-Frame-Options: DENY` (no se puede incrustar la web en otra), `nosniff`, `Referrer-Policy` y `Permissions-Policy`. |
| **Sin superficie de ataque** | No hay base de datos, ni login, ni formularios que envíen datos a ningún servidor: no hay nada que hackear ni información que robar. |

Los límites viven en `src/lib/antispam.ts` y `src/lib/constants.ts`, por si
quieres hacerlos más estrictos o más flexibles.

**Importante, para que lo tengas claro:** como no hay servidor, los límites de
frecuencia se guardan en el navegador de cada visitante. Detienen bots y envíos
masivos normales, pero alguien con conocimientos técnicos podría saltárselos
borrando sus datos de navegación. El filtro definitivo sigue siendo WhatsApp,
donde puedes bloquear cualquier número que moleste. Si algún día el spam se
vuelve un problema real, la solución sería un pequeño backend con límite por IP.

---

## Estructura

```text
src/
├── app/
│   ├── (tienda)/
│   │   ├── page.tsx           portada
│   │   ├── catalogo/          catálogo con filtros
│   │   └── producto/[slug]/   página de cada producto
│   ├── layout.tsx             SEO y fuentes
│   ├── icon.svg               favicon
│   └── opengraph-image.tsx    imagen para redes
├── components/
│   ├── store/                 navbar, slider, tarjetas, carrito, secciones
│   ├── ui/                    piezas compartidas
│   └── Logo.tsx
├── context/CartContext.tsx    carrito (navegador)
├── data/                      👈 productos, categorías y anuncios
├── lib/
│   ├── config.ts              👈 WhatsApp, textos, redes, contacto
│   ├── catalog.ts             filtros, búsqueda y resolución del carrito
│   ├── antispam.ts            protecciones contra abuso
│   ├── whatsapp.ts            armado del mensaje del pedido
│   ├── format.ts              precios (S/) y descuentos
│   └── constants.ts           límites y etiquetas
└── types/catalog.ts           tipos del catálogo
```

El logo está en `public/logo.png`. Si lo cambias, se actualiza en toda la web.

---

## Publicar

Al ser un sitio estático, se puede publicar en cualquier lado: **Vercel**,
Netlify, o un hosting propio con `npm run build && npm start`. No necesita base
de datos, ni variables de entorno, ni configuración adicional.

La portada y las 36 páginas de producto se generan al compilar, así que cargan
de inmediato.

---

## Lo que no incluye (a propósito)

Panel administrativo, base de datos, pasarela de pagos y cuentas de clientes.
Para cambiar el catálogo se editan los archivos de `src/data` y se vuelve a
publicar.
