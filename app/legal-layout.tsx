import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

export function LegalLayout({ title, eyebrow, children }: { title: string; eyebrow: string; children: ReactNode }) {
  return (
    <main className="legal-page">
      <header className="nav-shell legal-nav">
        <Link href="/" className="brand" aria-label="Voltar para a home">
          <Image src="/assets/logos/logo-waxis.png" alt="Waxis" width={148} height={44} />
        </Link>
        <Link className="button button--small" href="/">Voltar para o site</Link>
      </header>
      <div className="legal-hero">
        <p>{eyebrow}</p><h1>{title}</h1><span>Última atualização: 30 de julho de 2026</span>
      </div>
      <article className="legal-content">
        <p className="legal-note">Este documento foi preparado como base operacional da Waxis e deve ser revisado com os dados cadastrais definitivos da empresa e por assessoria jurídica antes da publicação comercial.</p>
        {children}
      </article>
    </main>
  );
}
