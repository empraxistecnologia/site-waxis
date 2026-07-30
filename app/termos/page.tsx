import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = { title: "Termos de Uso — Waxis", description: "Condições gerais para acesso ao site e à plataforma Waxis." };

export default function Terms() {
  return <LegalLayout eyebrow="Condições de utilização" title="Termos de Uso">
    <section><h2>1. Aceitação</h2><p>Ao acessar o site, solicitar demonstração, iniciar teste ou utilizar a plataforma Waxis, o usuário declara ter lido e concordado com estes Termos, com a Política de Privacidade e com as condições específicas da contratação.</p></section>
    <section><h2>2. Elegibilidade e cadastro</h2><p>O serviço é destinado principalmente a pessoas jurídicas e profissionais autorizados. As informações cadastrais devem ser verdadeiras, completas e mantidas atualizadas. Credenciais são pessoais e devem ser protegidas pelo usuário.</p></section>
    <section><h2>3. Uso permitido</h2><p>A plataforma deve ser usada de forma lícita, em conformidade com a LGPD, regras da Meta e demais canais integrados. É proibido enviar spam, conteúdo ilícito, abusivo ou fraudulento; violar direitos de terceiros; tentar contornar controles de segurança; ou usar integrações sem autorização.</p></section>
    <section><h2>4. Canais e terceiros</h2><p>WhatsApp, Instagram, Facebook, provedores de inteligência artificial, pagamentos e outras integrações possuem regras, disponibilidade e preços próprios. Mudanças, indisponibilidades ou bloqueios determinados por esses terceiros podem afetar funções da plataforma.</p></section>
    <section><h2>5. Conteúdo e responsabilidade do cliente</h2><p>O cliente é responsável pelos contatos, bases, mensagens, fluxos, campanhas, consentimentos e conteúdos que inserir ou transmitir. A Waxis fornece tecnologia e orientação, mas não substitui a avaliação jurídica e operacional do cliente.</p></section>
    <section><h2>6. Inteligência artificial e automações</h2><p>Resultados gerados por IA podem conter imprecisões e devem ser configurados, supervisionados e revisados conforme o risco da operação. O cliente permanece responsável por decisões comerciais, comunicações e aprovações realizadas em sua conta.</p></section>
    <section><h2>7. Disponibilidade e suporte</h2><p>Buscamos manter o serviço disponível e seguro, mas manutenções, falhas externas e eventos fora de controle podem causar interrupções. Níveis específicos de serviço, suporte e implantação dependem do plano ou proposta contratada.</p></section>
    <section><h2>8. Propriedade intelectual</h2><p>A marca, interface, documentação, software e materiais da Waxis são protegidos. A contratação concede direito limitado, não exclusivo e intransferível de uso durante a vigência, sem transferência de propriedade.</p></section>
    <section><h2>9. Suspensão</h2><p>Contas podem ser limitadas ou suspensas em caso de risco de segurança, inadimplência, violação destes Termos, uso ilícito ou descumprimento das regras dos canais integrados.</p></section>
    <section><h2>10. Contato</h2><p>Dúvidas podem ser enviadas para <a href="mailto:empraxisassessoria@gmail.com">empraxisassessoria@gmail.com</a>.</p></section>
  </LegalLayout>;
}
