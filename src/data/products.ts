import type { Product } from "@/types/product";

/* ==========================================================================
 *  CATÁLOGO — datos de ejemplo (mock)
 *
 *  👉 Para editar la tienda, trabaja SOLO en este archivo.
 *     - Agregar producto: copia un bloque y cambia sus campos (el `id` debe ser único).
 *     - Quitar producto: borra su bloque.
 *     - Cambiar precio: campo `price` (y `previousPrice` si está en oferta).
 *     - Imagen: coloca el archivo en /public/products y apunta `image` a él,
 *       ej. "/products/mi-producto.jpg". Se recomienda una imagen cuadrada.
 *     - `offer: true` muestra el badge de oferta y entra en el filtro "Ofertas".
 *     - `featured: true` lo posiciona primero en el orden "Destacados".
 *
 *  Cuando exista un backend, este arreglo se reemplaza por una llamada a la API
 *  que devuelva la misma forma de datos (ver src/types/product.ts).
 * ========================================================================== */

export const products: Product[] = [
  /* ----------------------------- SKINCARE ------------------------------- */
  {
    id: "skc-serum-vitamina-c",
    name: "Sérum Facial Vitamina C",
    category: "skincare",
    price: 39.9,
    previousPrice: 55.0,
    image: "/products/serum-facial.svg",
    description:
      "Sérum ligero con vitamina C que ayuda a unificar el tono y aportar luminosidad. Se absorbe rápido y se usa antes de la crema hidratante.",
    featured: true,
    offer: true,
    size: "30 ml",
  },
  {
    id: "skc-agua-micelar",
    name: "Agua Micelar 3 en 1",
    category: "skincare",
    price: 24.9,
    image: "/products/agua-micelar.svg",
    description:
      "Limpia, desmaquilla y refresca en un solo paso. Ideal para el uso diario, incluso en pieles sensibles.",
    size: "400 ml",
  },
  {
    id: "skc-crema-hidratante",
    name: "Crema Hidratante Facial",
    category: "skincare",
    price: 32.0,
    previousPrice: 42.0,
    image: "/products/crema-hidratante.svg",
    description:
      "Textura en gel-crema de rápida absorción que mantiene la piel hidratada durante el día sin sensación grasosa.",
    offer: true,
    size: "50 ml",
  },
  {
    id: "skc-protector-solar",
    name: "Protector Solar SPF 50+",
    category: "skincare",
    price: 45.0,
    image: "/products/protector-solar.svg",
    description:
      "Protección alta de uso diario, con acabado invisible y sin dejar residuo blanco. Se puede usar debajo del maquillaje.",
    featured: true,
    size: "60 ml",
  },
  {
    id: "skc-gel-limpiador",
    name: "Gel Limpiador Facial",
    category: "skincare",
    price: 22.5,
    image: "/products/gel-limpiador.svg",
    description:
      "Gel suave que retira impurezas y exceso de grasa sin resecar. Deja la piel fresca y lista para el resto de la rutina.",
    size: "150 ml",
  },
  {
    id: "skc-contorno-ojos",
    name: "Contorno de Ojos Hidratante",
    category: "skincare",
    price: 28.9,
    image: "/products/contorno-ojos.svg",
    description:
      "Crema ligera para la zona del contorno de ojos. Ayuda a hidratar y a suavizar la apariencia de líneas finas.",
    size: "15 ml",
  },

  /* ---------------------------- MAQUILLAJE ------------------------------ */
  {
    id: "mkp-gloss-labial",
    name: "Gloss Labial Brillo Húmedo",
    category: "maquillaje",
    price: 15.9,
    image: "/products/gloss-labial.svg",
    description:
      "Brillo labial de acabado jugoso y no pegajoso. Se puede usar solo o encima del labial favorito.",
    featured: true,
  },
  {
    id: "mkp-mascara-pestanas",
    name: "Máscara de Pestañas Volumen",
    category: "maquillaje",
    price: 19.9,
    previousPrice: 26.0,
    image: "/products/mascara-pestanas.svg",
    description:
      "Cepillo de fibras que separa y aporta volumen desde la primera capa. Fórmula de larga duración.",
    offer: true,
  },
  {
    id: "mkp-base-maquillaje",
    name: "Base de Maquillaje Matte",
    category: "maquillaje",
    price: 42.0,
    image: "/products/base-maquillaje.svg",
    description:
      "Cobertura media construible con acabado matte natural. Dosificador con pump para controlar la cantidad.",
    size: "30 ml",
  },
  {
    id: "mkp-labial-mate",
    name: "Labial Mate Larga Duración",
    category: "maquillaje",
    price: 18.5,
    image: "/products/labial-mate.svg",
    description:
      "Labial de alta pigmentación con acabado mate y sensación cómoda. Un solo paso para un color intenso.",
  },
  {
    id: "mkp-rubor-compacto",
    name: "Rubor Compacto",
    category: "maquillaje",
    price: 21.0,
    image: "/products/rubor-compacto.svg",
    description:
      "Rubor en polvo de textura sedosa, fácil de difuminar. Aporta un color natural y luminoso a las mejillas.",
  },
  {
    id: "mkp-polvo-compacto",
    name: "Polvo Compacto Traslúcido",
    category: "maquillaje",
    price: 25.9,
    previousPrice: 33.0,
    image: "/products/polvo-compacto.svg",
    description:
      "Sella el maquillaje y controla el brillo durante el día. Incluye espejo y esponja aplicadora.",
    offer: true,
  },

  /* -------------------------- CUIDADO CAPILAR --------------------------- */
  {
    id: "cap-shampoo-nutricion",
    name: "Shampoo Nutrición Intensa",
    category: "cuidado-capilar",
    price: 26.9,
    image: "/products/shampoo.svg",
    description:
      "Limpia con suavidad y aporta nutrición al cabello seco o castigado. Uso frecuente para toda la familia.",
    size: "400 ml",
  },
  {
    id: "cap-acondicionador",
    name: "Acondicionador Reparador",
    category: "cuidado-capilar",
    price: 26.9,
    image: "/products/acondicionador.svg",
    description:
      "Desenreda y suaviza desde el primer uso. Complemento ideal del shampoo de nutrición intensa.",
    size: "400 ml",
  },
  {
    id: "cap-tratamiento-keratina",
    name: "Tratamiento Capilar de Keratina",
    category: "cuidado-capilar",
    price: 34.9,
    previousPrice: 45.0,
    image: "/products/tratamiento-capilar.svg",
    description:
      "Mascarilla de tratamiento profundo para cabello con frizz o quiebre. Se aplica de 1 a 2 veces por semana.",
    featured: true,
    offer: true,
    size: "250 ml",
  },
  {
    id: "cap-ampolla-reconstructora",
    name: "Ampolla Capilar Reconstructora",
    category: "cuidado-capilar",
    price: 8.9,
    image: "/products/ampolla-capilar.svg",
    description:
      "Dosis única de tratamiento intensivo. Perfecta para recuperar el cabello después de tintes o planchas.",
    size: "15 ml",
  },
  {
    id: "cap-serum-antifrizz",
    name: "Sérum Capilar Anti-Frizz",
    category: "cuidado-capilar",
    price: 29.9,
    image: "/products/serum-capilar.svg",
    description:
      "Aceite ligero que controla el frizz y aporta brillo sin engrasar. Se aplica sobre el cabello húmedo o seco.",
    size: "100 ml",
  },

  /* --------------------------- ASEO PERSONAL ---------------------------- */
  {
    id: "ase-jabon-avena",
    name: "Jabón Corporal de Avena",
    category: "aseo-personal",
    price: 6.9,
    image: "/products/jabon-corporal.svg",
    description:
      "Jabón en barra con avena, suave con la piel del cuerpo. Espuma cremosa y aroma delicado.",
    size: "120 g",
  },
  {
    id: "ase-crema-corporal",
    name: "Crema Corporal Hidratante",
    category: "aseo-personal",
    price: 23.9,
    previousPrice: 30.0,
    image: "/products/crema-corporal.svg",
    description:
      "Hidratación diaria de rápida absorción para todo el cuerpo. Deja la piel suave por horas.",
    offer: true,
    size: "400 ml",
  },
  {
    id: "ase-desodorante-rollon",
    name: "Desodorante Roll-On",
    category: "aseo-personal",
    price: 12.9,
    image: "/products/desodorante-rollon.svg",
    description:
      "Protección del día a día con secado rápido y sin manchar la ropa. Aroma fresco y discreto.",
    size: "50 ml",
  },
  {
    id: "ase-gel-ducha",
    name: "Gel de Ducha Frutos Rojos",
    category: "aseo-personal",
    price: 18.9,
    image: "/products/gel-ducha.svg",
    description:
      "Gel de ducha de espuma abundante y aroma frutal. Formato familiar de gran rendimiento.",
    size: "750 ml",
  },
  {
    id: "ase-cepillo-dental",
    name: "Cepillo Dental Suave (Pack x2)",
    category: "aseo-personal",
    price: 9.9,
    image: "/products/cepillo-dental.svg",
    description:
      "Cerdas suaves y mango ergonómico. Pack de dos unidades para el cuidado diario.",
  },

  /* ---------------------------- ACCESORIOS ------------------------------ */
  {
    id: "acc-set-brochas",
    name: "Set de Brochas de Maquillaje x5",
    category: "accesorios",
    price: 39.9,
    previousPrice: 52.0,
    image: "/products/set-brochas.svg",
    description:
      "Set de 5 brochas de fibras suaves para rostro y ojos. Incluye brocha para base, polvo, rubor y difuminado.",
    featured: true,
    offer: true,
  },
  {
    id: "acc-esponja-maquillaje",
    name: "Esponja de Maquillaje",
    category: "accesorios",
    price: 9.9,
    image: "/products/esponja-maquillaje.svg",
    description:
      "Esponja de textura suave para aplicar base y corrector con acabado uniforme. Se puede usar seca o húmeda.",
  },
  {
    id: "acc-vincha-facial",
    name: "Vincha Facial de Microfibra",
    category: "accesorios",
    price: 11.9,
    image: "/products/vincha-facial.svg",
    description:
      "Vincha suave que sujeta el cabello durante la rutina de skincare o el maquillaje.",
  },
  {
    id: "acc-neceser-belleza",
    name: "Neceser Organizador de Belleza",
    category: "accesorios",
    price: 27.9,
    image: "/products/neceser-belleza.svg",
    description:
      "Neceser con cierre y compartimentos internos para llevar tus productos ordenados a todos lados.",
    featured: true,
  },
];
