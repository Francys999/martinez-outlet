import type { Product } from "@/types/catalog";

/* ==========================================================================
 *  CATÁLOGO DE PRODUCTOS
 *
 *  👉 Este es el único archivo que necesitas tocar para cambiar la tienda.
 *
 *  Agregar un producto: copia un bloque y cambia sus datos.
 *    - `id`: único y sin espacios. Es también la URL: /producto/{id}
 *    - `price`: precio online (el que paga el cliente por la web).
 *    - `storePrice`: precio en tienda. Se muestra tachado y se calcula el
 *      ahorro. Déjalo fuera si el producto no tiene precio de tienda.
 *    - `images`: rutas dentro de /public. Puedes poner varias.
 *    - `stock`: unidades disponibles. Si lo omites, no se controla stock.
 *    - `featured: true`: aparece en "Lo más pedido" de la portada.
 *    - `offer: true`: entra en la sección y el filtro de Ofertas.
 *    - `variants`: colores, modelos o tallas, cada uno con su stock.
 *
 *  Quitar un producto: borra su bloque (o pon `stock: 0` para "agotado").
 * ========================================================================== */

export const products: Product[] = [
  /* --------------------------------- Skincare ------------------------------ */
  {
    id: "serum-facial-vitamina-c",
    name: "Sérum Facial Vitamina C",
    category: "skincare",
    price: 39.9,
    storePrice: 55,
    images: ["/products/serum-facial.svg"],
    description:
      "Sérum ligero con vitamina C que ayuda a unificar el tono y aportar luminosidad. Se absorbe rápido y se usa antes de la crema hidratante.",
    size: "30 ml",
    stock: 18,
    featured: true,
    offer: true,
  },
  {
    id: "agua-micelar-3-en-1",
    name: "Agua Micelar 3 en 1",
    category: "skincare",
    price: 24.9,
    storePrice: 32,
    images: ["/products/agua-micelar.svg"],
    description:
      "Limpia, desmaquilla y refresca en un solo paso. Ideal para uso diario, incluso en pieles sensibles.",
    size: "400 ml",
    stock: 25,
  },
  {
    id: "crema-hidratante-facial",
    name: "Crema Hidratante Facial",
    category: "skincare",
    price: 32,
    storePrice: 42,
    images: ["/products/crema-hidratante.svg"],
    description:
      "Textura gel-crema de rápida absorción que mantiene la piel hidratada durante el día sin sensación grasosa.",
    size: "50 ml",
    stock: 14,
    offer: true,
  },
  {
    id: "protector-solar-spf-50",
    name: "Protector Solar SPF 50+",
    category: "skincare",
    price: 45,
    storePrice: 58,
    images: ["/products/protector-solar.svg"],
    description:
      "Protección alta de uso diario, con acabado invisible y sin residuo blanco. Se puede usar debajo del maquillaje.",
    size: "60 ml",
    stock: 20,
    featured: true,
  },
  {
    id: "gel-limpiador-facial",
    name: "Gel Limpiador Facial",
    category: "skincare",
    price: 22.5,
    storePrice: 29,
    images: ["/products/gel-limpiador.svg"],
    description:
      "Gel suave que retira impurezas y exceso de grasa sin resecar. Deja la piel fresca y lista para el resto de la rutina.",
    size: "150 ml",
    stock: 22,
  },
  {
    id: "contorno-de-ojos",
    name: "Contorno de Ojos Hidratante",
    category: "skincare",
    price: 28.9,
    storePrice: 36,
    images: ["/products/contorno-ojos.svg"],
    description:
      "Crema ligera para la zona del contorno de ojos. Ayuda a hidratar y suavizar la apariencia de líneas finas.",
    size: "15 ml",
    stock: 12,
  },

  /* ------------------------------- Maquillaje ------------------------------ */
  {
    id: "gloss-labial-brillo-humedo",
    name: "Gloss Labial Brillo Húmedo",
    category: "maquillaje",
    price: 15.9,
    storePrice: 22,
    images: ["/products/gloss-labial.svg"],
    description:
      "Brillo labial de acabado jugoso y no pegajoso. Se puede usar solo o encima del labial favorito.",
    stock: 30,
    featured: true,
    variants: [
      { id: "rosa-nude", type: "color", label: "Rosa nude", colorHex: "#E8A0B4", stock: 10 },
      { id: "cereza", type: "color", label: "Cereza", colorHex: "#C21E56", stock: 10 },
      { id: "transparente", type: "color", label: "Transparente", colorHex: "#F3E9F7", stock: 10 },
    ],
  },
  {
    id: "mascara-de-pestanas-volumen",
    name: "Máscara de Pestañas Volumen",
    category: "maquillaje",
    price: 19.9,
    storePrice: 26,
    images: ["/products/mascara-pestanas.svg"],
    description:
      "Cepillo de fibras que separa y aporta volumen desde la primera capa. Fórmula de larga duración.",
    stock: 16,
    offer: true,
  },
  {
    id: "base-de-maquillaje-matte",
    name: "Base de Maquillaje Matte",
    category: "maquillaje",
    price: 42,
    storePrice: 54,
    images: ["/products/base-maquillaje.svg"],
    description:
      "Cobertura media construible con acabado matte natural. Dosificador con pump para controlar la cantidad.",
    size: "30 ml",
    stock: 15,
    variants: [
      { id: "beige-claro", type: "color", label: "Beige claro", colorHex: "#E8C4A0", stock: 5 },
      { id: "beige-medio", type: "color", label: "Beige medio", colorHex: "#D2A377", stock: 5 },
      { id: "canela", type: "color", label: "Canela", colorHex: "#A9764E", stock: 5 },
    ],
  },
  {
    id: "labial-mate-larga-duracion",
    name: "Labial Mate Larga Duración",
    category: "maquillaje",
    price: 18.5,
    storePrice: 25,
    images: ["/products/labial-mate.svg"],
    description:
      "Labial de alta pigmentación con acabado mate y sensación cómoda. Un solo paso para un color intenso.",
    stock: 28,
    variants: [
      { id: "rojo-clasico", type: "color", label: "Rojo clásico", colorHex: "#C0182F", stock: 9 },
      { id: "vino", type: "color", label: "Vino", colorHex: "#7B2038", stock: 9 },
      { id: "rosa-palo", type: "color", label: "Rosa palo", colorHex: "#D98A9C", stock: 10 },
    ],
  },
  {
    id: "rubor-compacto",
    name: "Rubor Compacto",
    category: "maquillaje",
    price: 21,
    storePrice: 27,
    images: ["/products/rubor-compacto.svg"],
    description:
      "Rubor en polvo de textura sedosa, fácil de difuminar. Aporta un color natural y luminoso a las mejillas.",
    stock: 18,
  },
  {
    id: "polvo-compacto-traslucido",
    name: "Polvo Compacto Traslúcido",
    category: "maquillaje",
    price: 25.9,
    storePrice: 33,
    images: ["/products/polvo-compacto.svg"],
    description:
      "Sella el maquillaje y controla el brillo durante el día. Incluye espejo y esponja aplicadora.",
    stock: 17,
    offer: true,
  },

  /* -------------------------------- Joyería -------------------------------- */
  {
    id: "aretes-argolla-dorados",
    name: "Aretes Argolla Dorados",
    category: "joyeria",
    price: 16.9,
    storePrice: 24,
    images: ["/products/aretes.svg"],
    description:
      "Argollas livianas de acabado dorado, cómodas para todo el día. Cierre seguro tipo click.",
    stock: 24,
    featured: true,
    variants: [
      { id: "pequenas", type: "modelo", label: "Pequeñas (2 cm)", stock: 8 },
      { id: "medianas", type: "modelo", label: "Medianas (4 cm)", stock: 8 },
      { id: "grandes", type: "modelo", label: "Grandes (6 cm)", stock: 8 },
    ],
  },
  {
    id: "aretes-perla-elegantes",
    name: "Aretes de Perla",
    category: "joyeria",
    price: 14.9,
    storePrice: 20,
    images: ["/products/aretes-perla.svg"],
    description:
      "Aretes con perla sintética de acabado nacarado. Un clásico que combina con todo.",
    stock: 20,
  },
  {
    id: "collar-dije-corazon",
    name: "Collar con Dije de Corazón",
    category: "joyeria",
    price: 22.9,
    storePrice: 32,
    images: ["/products/collar.svg"],
    description:
      "Cadena delicada con dije de corazón. Largo ajustable, ideal para regalo.",
    stock: 15,
    offer: true,
    variants: [
      { id: "dorado", type: "color", label: "Dorado", colorHex: "#D9A93B", stock: 8 },
      { id: "plateado", type: "color", label: "Plateado", colorHex: "#C0C6CE", stock: 7 },
    ],
  },
  {
    id: "anillo-piedra-cristal",
    name: "Anillo con Piedra Cristal",
    category: "joyeria",
    price: 12.9,
    storePrice: 18,
    images: ["/products/anillo.svg"],
    description:
      "Anillo con piedra facetada que brilla con la luz. Banda cómoda de uso diario.",
    stock: 22,
    variants: [
      { id: "talla-6", type: "talla", label: "Talla 6", stock: 7 },
      { id: "talla-7", type: "talla", label: "Talla 7", stock: 8 },
      { id: "talla-8", type: "talla", label: "Talla 8", stock: 7 },
    ],
  },
  {
    id: "pulsera-de-cuentas",
    name: "Pulsera de Cuentas",
    category: "joyeria",
    price: 11.9,
    storePrice: 16,
    images: ["/products/pulsera.svg"],
    description:
      "Pulsera elástica de cuentas, fácil de poner y combinar con otras.",
    stock: 26,
    variants: [
      { id: "rosa", type: "color", label: "Rosa", colorHex: "#F0A9C4", stock: 9 },
      { id: "lila", type: "color", label: "Lila", colorHex: "#B99AEC", stock: 9 },
      { id: "blanco", type: "color", label: "Blanco", colorHex: "#F2F0F5", stock: 8 },
    ],
  },

  /* ------------------------------ Aseo personal ----------------------------- */
  {
    id: "jabon-corporal-avena",
    name: "Jabón Corporal de Avena",
    category: "aseo-personal",
    price: 6.9,
    storePrice: 9,
    images: ["/products/jabon-corporal.svg"],
    description:
      "Jabón en barra con avena, suave con la piel del cuerpo. Espuma cremosa y aroma delicado.",
    size: "120 g",
    stock: 40,
  },
  {
    id: "crema-corporal-hidratante",
    name: "Crema Corporal Hidratante",
    category: "aseo-personal",
    price: 23.9,
    storePrice: 30,
    images: ["/products/crema-corporal.svg"],
    description:
      "Hidratación diaria de rápida absorción para todo el cuerpo. Deja la piel suave por horas.",
    size: "400 ml",
    stock: 19,
    offer: true,
  },
  {
    id: "desodorante-roll-on",
    name: "Desodorante Roll-On",
    category: "aseo-personal",
    price: 12.9,
    storePrice: 17,
    images: ["/products/desodorante-rollon.svg"],
    description:
      "Protección del día a día con secado rápido y sin manchar la ropa. Aroma fresco y discreto.",
    size: "50 ml",
    stock: 30,
  },
  {
    id: "gel-de-ducha-frutos-rojos",
    name: "Gel de Ducha Frutos Rojos",
    category: "aseo-personal",
    price: 18.9,
    storePrice: 25,
    images: ["/products/gel-ducha.svg"],
    description:
      "Gel de ducha de espuma abundante y aroma frutal. Formato familiar de gran rendimiento.",
    size: "750 ml",
    stock: 16,
  },
  {
    id: "cepillo-dental-suave-pack",
    name: "Cepillo Dental Suave (Pack x2)",
    category: "aseo-personal",
    price: 9.9,
    storePrice: 13,
    images: ["/products/cepillo-dental.svg"],
    description:
      "Cerdas suaves y mango ergonómico. Pack de dos unidades para el cuidado diario.",
    stock: 35,
  },

  /* ---------------------------- Cuidado capilar ----------------------------- */
  {
    id: "shampoo-nutricion-intensa",
    name: "Shampoo Nutrición Intensa",
    category: "cuidado-capilar",
    price: 26.9,
    storePrice: 35,
    images: ["/products/shampoo.svg"],
    description:
      "Limpia con suavidad y aporta nutrición al cabello seco o castigado. Uso frecuente para toda la familia.",
    size: "400 ml",
    stock: 21,
  },
  {
    id: "acondicionador-reparador",
    name: "Acondicionador Reparador",
    category: "cuidado-capilar",
    price: 26.9,
    storePrice: 35,
    images: ["/products/acondicionador.svg"],
    description:
      "Desenreda y suaviza desde el primer uso. Complemento ideal del shampoo de nutrición intensa.",
    size: "400 ml",
    stock: 21,
  },
  {
    id: "tratamiento-capilar-keratina",
    name: "Tratamiento Capilar de Keratina",
    category: "cuidado-capilar",
    price: 34.9,
    storePrice: 45,
    images: ["/products/tratamiento-capilar.svg"],
    description:
      "Mascarilla de tratamiento profundo para cabello con frizz o quiebre. Se aplica de 1 a 2 veces por semana.",
    size: "250 ml",
    stock: 13,
    featured: true,
    offer: true,
  },
  {
    id: "ampolla-capilar-reconstructora",
    name: "Ampolla Capilar Reconstructora",
    category: "cuidado-capilar",
    price: 8.9,
    storePrice: 12,
    images: ["/products/ampolla-capilar.svg"],
    description:
      "Dosis única de tratamiento intensivo. Perfecta para recuperar el cabello después de tintes o planchas.",
    size: "15 ml",
    stock: 45,
  },
  {
    id: "serum-capilar-anti-frizz",
    name: "Sérum Capilar Anti-Frizz",
    category: "cuidado-capilar",
    price: 29.9,
    storePrice: 38,
    images: ["/products/serum-capilar.svg"],
    description:
      "Aceite ligero que controla el frizz y aporta brillo sin engrasar. Se aplica sobre el cabello húmedo o seco.",
    size: "100 ml",
    stock: 14,
  },

  /* -------------------------- Mochilas y loncheras -------------------------- */
  {
    id: "mochila-escolar-clasica",
    name: "Mochila Escolar Clásica",
    category: "mochilas-loncheras",
    price: 59.9,
    storePrice: 79,
    images: ["/products/mochila.svg"],
    description:
      "Mochila resistente con compartimento para laptop, bolsillo frontal y tirantes acolchados.",
    stock: 12,
    featured: true,
    variants: [
      { id: "morado", type: "color", label: "Morado", colorHex: "#6E42B5", stock: 4 },
      { id: "negro", type: "color", label: "Negro", colorHex: "#2A2A31", stock: 4 },
      { id: "rosa", type: "color", label: "Rosa", colorHex: "#EC008C", stock: 4 },
    ],
  },
  {
    id: "mochila-juvenil-rosa",
    name: "Mochila Juvenil",
    category: "mochilas-loncheras",
    price: 49.9,
    storePrice: 65,
    images: ["/products/mochila-rosa.svg"],
    description:
      "Mochila liviana de uso diario, con bolsillo lateral para botella y cierre reforzado.",
    stock: 14,
    offer: true,
  },
  {
    id: "lonchera-termica",
    name: "Lonchera Térmica",
    category: "mochilas-loncheras",
    price: 32.9,
    storePrice: 44,
    images: ["/products/lonchera.svg"],
    description:
      "Lonchera con interior térmico que mantiene la temperatura de los alimentos. Fácil de limpiar.",
    stock: 18,
    variants: [
      { id: "fucsia", type: "color", label: "Fucsia", colorHex: "#EC008C", stock: 9 },
      { id: "lila", type: "color", label: "Lila", colorHex: "#9B6BD6", stock: 9 },
    ],
  },
  {
    id: "cartuchera-doble-cierre",
    name: "Cartuchera Doble Cierre",
    category: "mochilas-loncheras",
    price: 16.9,
    storePrice: 23,
    images: ["/products/cartuchera.svg"],
    description:
      "Cartuchera amplia con dos compartimentos independientes. Tela resistente al uso diario.",
    stock: 25,
  },
  {
    id: "termo-acero-inoxidable",
    name: "Termo de Acero Inoxidable",
    category: "mochilas-loncheras",
    price: 38.9,
    storePrice: 52,
    images: ["/products/termo.svg"],
    description:
      "Termo de doble pared que conserva la temperatura por horas. Tapa hermética antiderrames.",
    size: "500 ml",
    stock: 16,
    offer: true,
  },

  /* --------------------------------- Bazar --------------------------------- */
  {
    id: "set-de-brochas-x5",
    name: "Set de Brochas de Maquillaje x5",
    category: "bazar",
    price: 39.9,
    storePrice: 52,
    images: ["/products/set-brochas.svg"],
    description:
      "Set de 5 brochas de fibras suaves para rostro y ojos. Incluye brocha para base, polvo, rubor y difuminado.",
    stock: 15,
    featured: true,
    offer: true,
  },
  {
    id: "esponja-de-maquillaje",
    name: "Esponja de Maquillaje",
    category: "bazar",
    price: 9.9,
    storePrice: 14,
    images: ["/products/esponja-maquillaje.svg"],
    description:
      "Esponja de textura suave para aplicar base y corrector con acabado uniforme. Se puede usar seca o húmeda.",
    stock: 32,
  },
  {
    id: "vincha-facial-microfibra",
    name: "Vincha Facial de Microfibra",
    category: "bazar",
    price: 11.9,
    storePrice: 16,
    images: ["/products/vincha-facial.svg"],
    description:
      "Vincha suave que sujeta el cabello durante la rutina de skincare o el maquillaje.",
    stock: 28,
  },
  {
    id: "neceser-organizador",
    name: "Neceser Organizador de Belleza",
    category: "bazar",
    price: 27.9,
    storePrice: 37,
    images: ["/products/neceser-belleza.svg"],
    description:
      "Neceser con cierre y compartimentos internos para llevar tus productos ordenados a todos lados.",
    stock: 17,
    featured: true,
  },
];
