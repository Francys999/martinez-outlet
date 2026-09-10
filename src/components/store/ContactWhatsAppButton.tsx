"use client";

import type { ReactNode } from "react";
import WhatsAppLink from "@/components/store/WhatsAppLink";
import { buildContactMessage } from "@/lib/whatsapp";

/**
 * Botón de contacto genérico. Existe como componente propio para que las
 * secciones del servidor puedan usarlo sin volverse client components.
 */
export default function ContactWhatsAppButton({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <WhatsAppLink message={buildContactMessage()} className={className}>
      {children}
    </WhatsAppLink>
  );
}
