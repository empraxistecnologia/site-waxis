import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const display = Urbanist({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: "Waxis — Nenhuma conversa perdida",
    description: "Centralize canais, preserve históricos e mantenha cada oportunidade em movimento com CRM, automação e inteligência comercial.",
    icons: { icon: "/assets/logos/favicon.png", shortcut: "/assets/logos/favicon.png" },
    openGraph: {
      title: "Waxis — Gestão inteligente de atendimento",
      description: "Nenhuma conversa perdida. Nenhuma oportunidade esquecida.",
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Waxis — Gestão Inteligente de Atendimento." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Waxis — Gestão inteligente de atendimento",
      description: "Nenhuma conversa perdida. Nenhuma oportunidade esquecida.",
      images: [`${origin}/og.png`],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="pt-BR"><body className={`${display.variable} ${body.variable}`}>{children}</body></html>;
}
