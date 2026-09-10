"use client";

import type { ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { useToast } from "@/components/ui/Toaster";
import { buildWhatsAppUrl, isWhatsAppConfigured } from "@/lib/whatsapp";

/**
 * Enlace a WhatsApp con un mensaje precargado.
 * Si el número no está configurado en src/lib/config.ts, avisa en lugar de
 * abrir un enlace inválido.
 */
export default function WhatsAppLink({
  message,
  children,
  className = "",
  showIcon = true,
  onOpen,
}: {
  message: string;
  children: ReactNode;
  className?: string;
  showIcon?: boolean;
  onOpen?: () => void;
}) {
  const { showToast } = useToast();
  const configured = isWhatsAppConfigured();

  return (
    <a
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
      data-whatsapp-link
      onClick={(event) => {
        if (!configured) {
          event.preventDefault();
          showToast(
            "Falta configurar el número de WhatsApp en src/lib/config.ts",
            "info",
          );
          return;
        }
        onOpen?.();
      }}
      className={className}
    >
      {showIcon && <MessageCircle className="size-4.5 shrink-0" aria-hidden />}
      {children}
    </a>
  );
}
