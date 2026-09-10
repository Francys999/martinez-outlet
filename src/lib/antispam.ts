import {
  MAX_CART_LINES,
  MAX_CART_UNITS,
  MAX_QUANTITY_PER_LINE,
} from "@/lib/constants";
import type { ResolvedCartLine } from "@/types/catalog";

/* ==========================================================================
 *  PROTECCIONES CONTRA ABUSO
 *
 *  La web no tiene servidor propio ni base de datos: el pedido se arma en el
 *  navegador y se envía a WhatsApp. Por eso las defensas apuntan a lo que sí
 *  se puede controlar desde aquí:
 *
 *   1. Que nadie pueda alterar los precios del pedido (se recalculan siempre
 *      contra el catálogo; ver resolveCartLines en src/lib/catalog.ts).
 *   2. Que un bot no pueda enviar pedidos automáticos (campo trampa + tiempo
 *      mínimo de llenado).
 *   3. Que nadie pueda mandar decenas de pedidos seguidos (límite por hora y
 *      por día, más una espera entre envíos).
 *   4. Que no se puedan pedir cantidades absurdas (topes por línea y por
 *      pedido completo).
 *   5. Que no se pueda inyectar enlaces ni texto raro en el mensaje que llega
 *      al WhatsApp del negocio.
 *
 *  Nota honesta: sin servidor, alguien con conocimientos técnicos puede
 *  saltarse los límites del navegador. Lo que esto evita de verdad es el
 *  abuso automatizado y los envíos masivos accidentales o de bots comunes.
 *  El filtro final siempre es WhatsApp, donde puedes bloquear un número.
 * ========================================================================== */

const STORAGE_KEY = "martinez-outlet:envios";

/** Pedidos permitidos por hora desde el mismo navegador. */
export const MAX_ORDERS_PER_HOUR = 5;

/** Pedidos permitidos por día desde el mismo navegador. */
export const MAX_ORDERS_PER_DAY = 15;

/** Espera mínima entre dos envíos (segundos). */
export const COOLDOWN_SECONDS = 45;

/** Tiempo mínimo que debe pasar desde que se abre el formulario (segundos). */
export const MIN_FORM_SECONDS = 3;

/* ------------------------- Límite de envíos ------------------------------- */

function readTimestamps(): number[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    return parsed
      .filter((value): value is number => typeof value === "number")
      .filter((value) => value > dayAgo)
      .slice(-MAX_ORDERS_PER_DAY * 2);
  } catch {
    return [];
  }
}

function writeTimestamps(values: number[]): void {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(values));
  } catch {
    // Si el navegador bloquea el almacenamiento, se sigue sin historial.
  }
}

export interface RateLimitResult {
  allowed: boolean;
  message?: string;
  /** Segundos que faltan para poder enviar de nuevo. */
  retryAfter?: number;
}

/** ¿Puede este navegador enviar otro pedido ahora? */
export function checkSendRate(): RateLimitResult {
  const now = Date.now();
  const timestamps = readTimestamps();

  const last = timestamps.at(-1);
  if (last && now - last < COOLDOWN_SECONDS * 1000) {
    const retryAfter = Math.ceil((COOLDOWN_SECONDS * 1000 - (now - last)) / 1000);
    return {
      allowed: false,
      retryAfter,
      message: `Acabas de enviar un pedido. Espera ${retryAfter} segundos antes de mandar otro.`,
    };
  }

  const lastHour = timestamps.filter((value) => value > now - 60 * 60 * 1000);
  if (lastHour.length >= MAX_ORDERS_PER_HOUR) {
    return {
      allowed: false,
      message:
        "Enviaste varios pedidos en la última hora. Continúa la conversación por WhatsApp con el pedido que ya nos mandaste.",
    };
  }

  if (timestamps.length >= MAX_ORDERS_PER_DAY) {
    return {
      allowed: false,
      message:
        "Se alcanzó el límite de pedidos por día desde este dispositivo. Escríbenos directamente por WhatsApp.",
    };
  }

  return { allowed: true };
}

/** Deja constancia de un envío para el control de frecuencia. */
export function registerSend(): void {
  writeTimestamps([...readTimestamps(), Date.now()]);
}

/* --------------------------- Detección de bots ---------------------------- */

export interface BotCheckInput {
  /** Valor del campo trampa: debe llegar vacío. */
  honeypot: string;
  /** Momento en que se abrió el formulario (Date.now()). */
  openedAt: number;
}

/**
 * Comprobación silenciosa contra bots:
 *  - el campo trampa está oculto para las personas, pero los bots lo rellenan;
 *  - un formulario completado en menos de MIN_FORM_SECONDS no es humano.
 */
export function looksAutomated({ honeypot, openedAt }: BotCheckInput): boolean {
  if (honeypot.trim() !== "") return true;
  if (!openedAt) return false;
  return Date.now() - openedAt < MIN_FORM_SECONDS * 1000;
}

/* ------------------------- Limpieza de texto ------------------------------ */

/**
 * Detecta enlaces de forma genérica: el protocolo (aunque venga cortado), el
 * "www." y cualquier dominio del tipo `palabra.ext`, incluidos los acortadores
 * (bit.ly, t.me). Un dato de entrega normal no lleva puntos pegados a letras,
 * así que un acierto aquí es señal clara de spam.
 */
const URL_PATTERN =
  /(https?:\/\/|www\.|\b[a-z0-9][a-z0-9-]{0,40}\.[a-z]{2,12}\b)/gi;

/** true si el texto contiene algo que parece un enlace. */
export function containsLink(value: string): boolean {
  URL_PATTERN.lastIndex = 0;
  return URL_PATTERN.test(value);
}

/**
 * Limpia lo que escribe el cliente antes de meterlo en el mensaje:
 *  - quita caracteres de control y saltos de línea (evita que alguien "arme"
 *    un mensaje falso dentro del pedido);
 *  - elimina enlaces, que es el uso típico de spam;
 *  - recorta a un largo razonable.
 */
export function sanitizeText(value: string, maxLength: number): string {
  return value
    .replace(/[\u0000-\u001f\u007f]/g, " ")
    .replace(URL_PATTERN, "")
    .replace(/\s{2,}/g, " ")
    .trim()
    .slice(0, maxLength);
}

/** Teléfono: solo dígitos, espacios y los signos habituales. */
export function sanitizePhone(value: string): string {
  return value.replace(/[^0-9+\s()-]/g, "").trim().slice(0, 20);
}

/**
 * true si el texto parece spam.
 * Se comprueba sobre el texto ORIGINAL, antes de limpiarlo: así el cliente
 * recibe un aviso claro en vez de que el enlace se borre en silencio.
 */
export function looksLikeSpam(value: string): boolean {
  if (!value) return false;
  if (containsLink(value)) return true;

  const letters = value.replace(/[^a-zA-ZáéíóúñÁÉÍÓÚÑ]/g, "");
  if (letters.length >= 20) {
    const upper = letters.replace(/[^A-ZÁÉÍÓÚÑ]/g, "").length;
    if (upper / letters.length > 0.8) return true;
  }
  return false;
}

/* --------------------------- Límites del pedido --------------------------- */

export interface CartCheckResult {
  ok: boolean;
  message?: string;
}

/** Verifica que el pedido esté dentro de límites razonables. */
export function checkCartLimits(lines: ResolvedCartLine[]): CartCheckResult {
  if (lines.length === 0) {
    return { ok: false, message: "Tu carrito está vacío." };
  }

  if (lines.length > MAX_CART_LINES) {
    return {
      ok: false,
      message: `Puedes pedir hasta ${MAX_CART_LINES} productos distintos por pedido.`,
    };
  }

  const units = lines.reduce((sum, line) => sum + line.quantity, 0);
  if (units > MAX_CART_UNITS) {
    return {
      ok: false,
      message: `El pedido supera las ${MAX_CART_UNITS} unidades. Para compras al por mayor, escríbenos directamente por WhatsApp.`,
    };
  }

  const overLine = lines.find((line) => line.quantity > MAX_QUANTITY_PER_LINE);
  if (overLine) {
    return {
      ok: false,
      message: `Máximo ${MAX_QUANTITY_PER_LINE} unidades por producto. Para más cantidad, consúltanos por WhatsApp.`,
    };
  }

  return { ok: true };
}

/** Código de referencia del pedido, para ubicarlo en la conversación. */
export function buildOrderReference(): string {
  const now = new Date();
  const day = String(now.getDate()).padStart(2, "0");
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const random = Math.floor(Math.random() * 9000 + 1000);
  return `MO-${day}${month}-${random}`;
}
