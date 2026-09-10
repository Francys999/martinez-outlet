"use client";

import { useSyncExternalStore } from "react";
import { Truck } from "lucide-react";
import { TOP_BAR } from "@/lib/config";

/* --------------------------------------------------------------------------
 * Cintillo de urgencia con cuenta regresiva.
 *
 * El contador es REAL: marca lo que falta para que termine el día. No se
 * reinicia con trucos ni inventa una urgencia falsa; la promoción del día
 * efectivamente termina a medianoche.
 * ------------------------------------------------------------------------ */

function subscribe(callback: () => void): () => void {
  const id = window.setInterval(callback, 1000);
  return () => window.clearInterval(id);
}

/** Segundos que faltan para la medianoche (se recalcula cada segundo). */
function secondsUntilMidnight(): number {
  const now = new Date();
  const midnight = new Date(now);
  midnight.setHours(24, 0, 0, 0);
  return Math.max(0, Math.floor((midnight.getTime() - now.getTime()) / 1000));
}

function pad(value: number): string {
  return String(value).padStart(2, "0");
}

export default function TopBar() {
  // En el servidor devuelve null: el contador aparece al hidratar, sin
  // provocar diferencias entre el HTML del servidor y el del navegador.
  const seconds = useSyncExternalStore(
    subscribe,
    secondsUntilMidnight,
    () => null,
  );

  const countdown =
    seconds === null
      ? null
      : `${pad(Math.floor(seconds / 3600))}:${pad(
          Math.floor((seconds % 3600) / 60),
        )}:${pad(seconds % 60)}`;

  return (
    <div className="bg-gradient-to-r from-fucsia-700 via-fucsia-600 to-lila-700 text-white">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-3 gap-y-0.5 px-4 py-2 text-center sm:px-6">
        <p className="flex items-center gap-1.5 text-[13px] font-semibold sm:text-sm">
          <Truck className="size-4 shrink-0" aria-hidden />
          {TOP_BAR.message}
        </p>

        {countdown && (
          <p className="text-[13px] font-medium text-white/90 sm:text-sm">
            {TOP_BAR.countdownLabel}{" "}
            <span className="rounded-md bg-white/20 px-1.5 py-0.5 font-bold tabular-nums">
              {countdown}
            </span>
          </p>
        )}
      </div>
    </div>
  );
}
