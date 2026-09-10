# Martinez Outlet — Landing de catálogo

Landing de una sola página, pensada para vender: el cliente entra, ve los
precios comparados, arma su carrito y envía el pedido por WhatsApp. Sin
secciones institucionales, sin formularios y sin pasos de más.

**100% frontend**: no hay base de datos, ni panel, ni servidor propio. El
catálogo vive en `src/data/products.ts` y se compila con la web.

Stack: Next.js 16 · TypeScript · React 19 · Tailwind CSS v4 · lucide-react.

---

## Ejecutar

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

## Cómo está armada la página (en orden)

1. **Cintillo de urgencia** con cuenta regresiva real hasta medianoche:
   "🔥 Promoción de hoy: envío GRATIS en tu zona · Termina en 09:23:41".
2. **Cabecera mínima**: logo + botón de carrito con el total en vivo.
3. **Franja de impacto**: "Precios directos de importación / Envíos GRATIS",
   badge de "Hasta -30% OFF" y los tres sellos de confianza.
4. **Catálogo**, que es el 90% de la página: filtros rápidos (Todos · Skin Care
   · Belleza · Accesorios), buscador y la vitrina de productos.
5. **Barra flotante del carrito** con unidades, ahorro y total.
6. **Pie corto** de confianza: entrega local, pago contra entrega / Yape / Plin
   y garantía de precio.

---

## Los gatillos de conversión

| Elemento | Qué hace |
|---|---|
| **Badge de descuento** | "-27% OFF" en la esquina de cada foto, calculado solo a partir de los dos precios. |
| **Comparativa de precios** | "Precio mercado: ~~S/ 55.00~~" en gris/rojo tenue y **S/ 39.90** grande en fucsia, más el "ahorras S/ 15.10" en verde. |
| **Escasez** | "¡Últimas 4 unidades!" cuando el producto tiene 5 o menos. Sale del `stock` real que tú escribes, no es un número inventado. |
| **Cuenta regresiva** | Marca lo que falta para que termine el día. No se reinicia con trucos: la promo del día realmente termina a medianoche. |
| **Carrito siempre visible** | La barra flotante muestra unidades, ahorro acumulado y total; agregar un producto **no** interrumpe la navegación. |
| **Checkout de un paso** | Un solo botón: "Finalizar pedido por WhatsApp 📲". |

---

## Editar el catálogo → `src/data/products.ts`

```ts
{
  id: "aretes-argolla-dorados",   // único, sin espacios
  name: "Aretes Argolla Dorados",
  category: "joyeria",            // ver src/data/categories.ts
  price: 16.9,                    // PRECIO MARTINEZ OUTLET
  storePrice: 24,                 // PRECIO MERCADO (tachado, calcula el % OFF)
  images: ["/products/aretes.svg"],
  description: "Argollas livianas de acabado dorado...",
  stock: 4,                       // con 5 o menos sale "¡Últimas 4 unidades!"
  featured: true,                 // aparece primero en la vitrina
  offer: true,
  variants: [                     // colores, modelos o tallas
    { id: "medianas", type: "modelo", label: "Medianas (4 cm)", stock: 8 },
  ],
}
```

Para **fotos reales**: copia la imagen a `public/products/` y apunta `images` a
ella (`["/products/mi-foto.jpg"]`). Cuadradas quedan mejor.

**Otros archivos que quizá quieras tocar:**

- `src/data/tabs.ts` — los botones de filtro y qué categorías agrupa cada uno.
- `src/data/categories.ts` — las categorías internas.
- `src/lib/config.ts` — número de WhatsApp, **zona de entrega**, textos de la
  cabecera y del cintillo, redes sociales.

### ⚠️ Configura tu zona de entrega

En `src/lib/config.ts`:

```ts
export const DELIVERY_ZONE = "";   // escribe aquí tu distrito, ej. "Ate"
```

Con el campo vacío los textos dicen "en tu zona". Al ponerlo, dirán "a todo Ate"
en el cintillo, la cabecera y el pie.

---

## El pedido que llega a tu WhatsApp

```text
¡Hola Martinez Outlet! Quiero realizar el siguiente pedido:
- Sérum Facial Vitamina C x1 - S/ 39.90
- Tratamiento Capilar de Keratina x2 - S/ 69.80
Total a pagar: S/ 109.70
Ubicación de entrega: Ate - Salamanca - Envío Gratis
(Ahorro frente al precio de mercado: S/ 35.30)
```

La zona la escribe el cliente en el carrito antes de enviar.

---

## Protecciones contra abuso

| Protección | Qué evita |
|---|---|
| **Precios recalculados** | El navegador solo guarda ids y cantidades: nombres y precios salen del catálogo. Editar el almacenamiento local no permite fabricar precios falsos. |
| **Campo trampa** | Un campo invisible que solo los bots rellenan: si llega con texto, el pedido no se envía. |
| **Tiempo mínimo** | Un carrito enviado en menos de 3 segundos se descarta. |
| **Espera y límites** | 45 s entre pedidos, máximo 5 por hora y 15 por día desde el mismo navegador. |
| **Topes de cantidad** | 20 unidades por producto, 30 productos distintos y 120 unidades por pedido. |
| **Sin enlaces** | La zona de entrega no admite enlaces ni caracteres de control. |
| **Cabeceras** | CSP, `X-Frame-Options: DENY`, `nosniff`, `Referrer-Policy`, `Permissions-Policy`. |

Los valores están en `src/lib/antispam.ts` y `src/lib/constants.ts`.

Como no hay servidor, estos límites viven en el navegador de cada visitante:
frenan bots y envíos masivos normales, pero alguien con conocimientos técnicos
podría saltárselos borrando sus datos. El filtro final sigue siendo WhatsApp,
donde puedes bloquear un número.

---

## Estructura

```text
src/
├── app/
│   ├── (tienda)/
│   │   ├── layout.tsx      cintillo, cabecera, carrito flotante y modal
│   │   └── page.tsx        la landing completa
│   ├── layout.tsx          SEO y fuentes
│   ├── icon.svg            favicon
│   └── opengraph-image.tsx imagen para compartir por WhatsApp/Instagram
├── components/store/
│   ├── TopBar · StoreHeader · HeroStrip
│   ├── CatalogSection · ProductCard · QuickViewModal
│   ├── FloatingCart · CartModal
│   └── TrustFooter · WhatsAppLink · ContactWhatsAppButton
├── context/CartContext.tsx carrito (navegador)
├── data/                   👈 productos, categorías y filtros
└── lib/                    config, catálogo, antispam, WhatsApp, formatos
```

---

## Publicar

Es un sitio estático: se puede subir a **Vercel**, Netlify o un hosting propio
con `npm run build && npm start`. Sin base de datos ni variables de entorno.
