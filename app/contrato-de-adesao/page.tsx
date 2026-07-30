import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = { title: "Contrato de Adesão — Waxis", description: "Condições contratuais gerais da plataforma e dos serviços Waxis." };

export default function Contract() {
  return <LegalLayout eyebrow="Condições comerciais gerais" title="Contrato de Adesão">
    <section><h2>1. Partes e objeto</h2><p>Este instrumento regula a licença de uso da plataforma Waxis e, quando contratados, os serviços de diagnóstico, implantação, configuração, automação, treinamento e acompanhamento descritos na proposta comercial.</p></section>
    <section><h2>2. Formação do contrato</h2><p>A contratação se aperfeiçoa com a aceitação da proposta, criação da conta, pagamento ou uso após o período de teste. Proposta comercial, ordem de serviço e anexos específicos integram este Contrato e prevalecem quanto a escopo, preço e prazo.</p></section>
    <section><h2>3. Modalidades</h2><h3>3.1 Plataforma</h3><p>O cliente recebe acesso para configurar e operar os recursos disponíveis em seu plano, sendo responsável por processos, integrações, conteúdo e usuários.</p><h3>3.2 Implantação assistida</h3><p>Quando contratada, a Waxis executará as entregas previstas na proposta. Prazos dependem do fornecimento de acessos, informações, aprovações e disponibilidade da equipe do cliente.</p></section>
    <section><h2>4. Valores e cobrança</h2><p>Mensalidades, implantação, adicionais de usuários, conexões, consumo, integrações e serviços serão cobrados conforme a proposta. Custos de terceiros, templates, conversas da API Oficial, modelos de IA, telefonia ou gateways podem ser cobrados separadamente.</p></section>
    <section><h2>5. Obrigações da Waxis</h2><ul><li>Disponibilizar o acesso contratado e orientar sua utilização.</li><li>Aplicar medidas razoáveis de segurança e continuidade.</li><li>Prestar suporte conforme o plano.</li><li>Manter confidencialidade sobre informações do cliente.</li></ul></section>
    <section><h2>6. Obrigações do cliente</h2><ul><li>Fornecer dados e acessos legítimos.</li><li>Manter usuários, permissões e credenciais seguros.</li><li>Obter bases legais e consentimentos necessários para contatos e campanhas.</li><li>Respeitar políticas da Meta e demais integrações.</li><li>Pagar valores e consumos contratados.</li></ul></section>
    <section><h2>7. Dados e confidencialidade</h2><p>Cada parte protegerá informações confidenciais da outra. O cliente mantém a titularidade sobre sua base e seus conteúdos. O tratamento de dados seguirá a Política de Privacidade e, quando necessário, anexo específico de tratamento de dados.</p></section>
    <section><h2>8. Vigência, cancelamento e inadimplência</h2><p>A vigência, fidelidade quando houver, renovação e aviso de cancelamento constarão da proposta. A inadimplência pode gerar suspensão após comunicação. Valores de implantação já executados e consumos de terceiros não são reembolsáveis, salvo previsão diversa.</p></section>
    <section><h2>9. Limitação de responsabilidade</h2><p>A Waxis não responde por bloqueios decorrentes de conduta do cliente, falhas de canais terceiros, conteúdo enviado, decisões automatizadas sem supervisão ou lucros cessantes indiretos. Limites específicos devem ser confirmados na proposta final.</p></section>
    <section><h2>10. Disposições finais</h2><p>Alterações relevantes serão comunicadas. A invalidade de uma cláusula não afeta as demais. O foro e os dados completos da contratada serão preenchidos na versão jurídica definitiva.</p></section>
  </LegalLayout>;
}
