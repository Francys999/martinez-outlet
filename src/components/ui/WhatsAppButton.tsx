"use client";

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { isWhatsAppConfigured } from "@/lib/config";
import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { useToast } from "@/components/ui/Toaster";

interface WhatsAppButtonProps {
  /** Mensaje ya construido (ver src/lib/whatsapp.ts). */
  message: string;
  children: ReactNode;
  className?: string;
  /** Acción opcional a ejecutar antes de abrir WhatsApp. */
  onBeforeOpen?: () => void;
  showIcon?: boolean;
}

/**
 * Enlace a wa.me con el pedido precargado.
 * Si el número todavía es el placeholder, no navega: avisa que falta
 * configurarlo en src/lib/config.ts (así nunca se abre un enlace inválido).
 */
export default function WhatsAppButton({
  message,
  children,
  className = "",
  onBeforeOpen,
  showIcon = true,
}: WhatsAppButtonProps) {
  const { showToast } = useToast();
  const href = buildWhatsAppUrl(message);

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-link
      onClick={(event) => {
        if (!isWhatsAppConfigured) {
          event.preventDefault();
          showToast(
            "Falta configurar el número de WhatsApp en src/lib/config.ts",
            "info",
          );
          return;
        }
        onBeforeOpen?.();
      }}
      className={className}
    >
      {showIcon && <MessageCircle className="size-4.5 shrink-0" aria-hidden />}
      {children}
    </a>
  );
}
