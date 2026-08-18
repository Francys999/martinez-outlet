"use client";

import { MessageCircle } from "lucide-react";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { buildContactMessage } from "@/lib/whatsapp";
import { useCart } from "@/context/CartContext";

/** Acceso directo a WhatsApp, siempre visible salvo con el carrito abierto. */
export default function WhatsAppFab() {
  const { isOpen } = useCart();

  return (
    <div
      className={`fixed bottom-5 right-4 z-40 transition-all duration-300 sm:bottom-6 sm:right-6 ${
        isOpen ? "pointer-events-none translate-y-4 opacity-0" : "opacity-100"
      }`}
    >
      <WhatsAppButton
        message={buildContactMessage()}
        showIcon={false}
        className="grid size-12 place-items-center sm:size-14 rounded-full bg-gradient-to-br from-fucsia-500 to-fucsia-700 text-white shadow-card transition-transform hover:scale-105 active:scale-95"
      >
        <MessageCircle className="size-5.5 sm:size-6" aria-hidden />
        <span className="sr-only">Escribir por WhatsApp</span>
      </WhatsAppButton>
    </div>
  );
}
