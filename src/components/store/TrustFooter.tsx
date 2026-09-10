import { Camera, Music2, ShieldCheck, ThumbsUp, Truck, Wallet } from "lucide-react";
import Logo from "@/components/Logo";
import ContactWhatsAppButton from "@/components/store/ContactWhatsAppButton";
import { DELIVERY_ZONE_LABEL, SITE, SOCIAL_LINKS } from "@/lib/config";

const SOCIALS = [
  { name: "Instagram", icon: Camera, url: SOCIAL_LINKS.instagram },
  { name: "TikTok", icon: Music2, url: SOCIAL_LINKS.tiktok },
  { name: "Facebook", icon: ThumbsUp, url: SOCIAL_LINKS.facebook },
].filter((social) => social.url);

/** Pie corto: solo confianza y el atajo a WhatsApp. Sin secciones ni menús. */
export default function TrustFooter() {
  return (
    <footer className="bg-ink pb-24 pt-10 text-white sm:pb-10">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <ul className="grid gap-3 sm:grid-cols-3">
          {[
            {
              icon: Truck,
              title: "Garantía de entrega local",
              text: `Envío GRATIS ${DELIVERY_ZONE_LABEL}, coordinado contigo.`,
            },
            {
              icon: Wallet,
              title: "Pago contra entrega",
              text: "También aceptamos Yape y Plin.",
            },
            {
              icon: ShieldCheck,
              title: "Precio más bajo del mercado",
              text: "Si lo encuentras más barato, dínoslo.",
            },
          ].map(({ icon: Icon, title, text }) => (
            <li
              key={title}
              className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/5 p-4"
            >
              <Icon className="mt-0.5 size-5 shrink-0 text-fucsia-300" aria-hidden />
              <div>
                <p className="text-sm font-bold">{title}</p>
                <p className="mt-0.5 text-xs text-lila-200/80">{text}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-8 flex flex-col items-center gap-4 border-t border-white/10 pt-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <Logo size={44} light withWordmark />

          <div className="flex flex-wrap items-center justify-center gap-3">
            {SOCIALS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="grid size-10 place-items-center rounded-xl border border-white/15 bg-white/5 text-white transition-colors hover:border-fucsia-500 hover:bg-fucsia-600"
                >
                  <Icon className="size-4.5" aria-hidden />
                </a>
              );
            })}

            <ContactWhatsAppButton className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-fucsia-500 to-fucsia-600 px-5 text-sm font-extrabold text-white transition-opacity hover:opacity-95">
              Escríbenos por WhatsApp
            </ContactWhatsAppButton>
          </div>
        </div>

        <p className="mt-6 text-center text-[11px] text-lila-200/60">
          © {new Date().getFullYear()} {SITE.name} · Catálogo online · Pedidos por
          WhatsApp
        </p>
      </div>
    </footer>
  );
}
