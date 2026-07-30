import type { Metadata } from "next";
import { Manrope, Urbanist } from "next/font/google";
import { headers } from "next/headers";
import Script from "next/script";
import "./globals.css";
import { PublicRuntime } from "./site-client";
import { getSiteConfig } from "./lib/site-data";

const display = Urbanist({ variable: "--font-display", subsets: ["latin"], display: "swap" });
const body = Manrope({ variable: "--font-body", subsets: ["latin"], display: "swap" });

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost:3000";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? (host.startsWith("localhost") ? "http" : "https");
  const origin = `${protocol}://${host}`;
  return {
    metadataBase: new URL(origin),
    title: config.siteTitle,
    description: config.siteDescription,
    alternates: { canonical: "/" },
    verification: {
      google: config.googleVerification || undefined,
      other: config.metaVerification ? { "facebook-domain-verification": config.metaVerification } : undefined,
    },
    icons: { icon: "/assets/logos/favicon.png", shortcut: "/assets/logos/favicon.png" },
    openGraph: {
      title: "Waxis — Gestão inteligente de atendimento",
      description: config.siteDescription,
      type: "website",
      locale: "pt_BR",
      images: [{ url: `${origin}/og.png`, width: 1200, height: 630, alt: "Waxis — Gestão Inteligente de Atendimento." }],
    },
    twitter: {
      card: "summary_large_image",
      title: "Waxis — Gestão inteligente de atendimento",
      description: config.siteDescription,
      images: [`${origin}/og.png`],
    },
  };
}

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const config = await getSiteConfig();
  return (
    <html lang="pt-BR">
      <body className={`${display.variable} ${body.variable}`}>
        {children}
        <PublicRuntime config={config} />
        <Script
          src="https://app.waxis.com.br/webchat-widget.js"
          data-token="6a53b9818019bf834086ef612871347e"
          strategy="afterInteractive"
        />
        <Script id="waxis-webchat-bubble-icon" strategy="afterInteractive">
          {`
            (() => {
              const bubbleIcon = '<svg data-waxis-bubble-icon="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path></svg>';
              const applyBubbleIcon = () => {
                const button = document.getElementById('webchat-bubble');
                if (button && !button.querySelector('[data-waxis-bubble-icon]')) button.innerHTML = bubbleIcon;
              };
              const observer = new MutationObserver(applyBubbleIcon);
              observer.observe(document.body, { childList: true, subtree: true });
              applyBubbleIcon();
            })();
          `}
        </Script>
      </body>
    </html>
  );
}
