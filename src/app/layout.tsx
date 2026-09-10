import type { Metadata, Viewport } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import { SITE } from "@/lib/config";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display-brand",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: "Martinez Outlet | Belleza, Skincare, Joyería y Más",
    template: "%s | Martinez Outlet",
  },
  description: SITE.description,
  keywords: [
    "Martinez Outlet",
    "skincare",
    "maquillaje",
    "joyería",
    "aretes",
    "cuidado personal",
    "aseo personal",
    "mochilas",
    "loncheras",
    "outlet de belleza",
  ],
  applicationName: SITE.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_PE",
    url: SITE.url,
    siteName: SITE.name,
    title: "Martinez Outlet | Belleza, Skincare, Joyería y Más",
    description: SITE.description,
  },
  twitter: {
    card: "summary_large_image",
    title: "Martinez Outlet | Belleza, Skincare, Joyería y Más",
    description: SITE.description,
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#6E42B5",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <body className={`${inter.variable} ${jakarta.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
