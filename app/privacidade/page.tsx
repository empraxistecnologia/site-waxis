import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";
import { LegalDocument } from "../legal-document";
import { getPublishedDocument } from "../lib/site-data";

export const metadata: Metadata = { title: "Política de Privacidade — Waxis", description: "Como a Waxis trata e protege dados pessoais." };

export default async function Privacy() {
  const document = await getPublishedDocument("privacidade");
  if (document) return <LegalLayout eyebrow="Privacidade e proteção de dados" title={document.title}><LegalDocument content={document.content} /></LegalLayout>;
  return <LegalLayout eyebrow="Privacidade e proteção de dados" title="Política de Privacidade">
    <section><h2>1. Objetivo</h2><p>Esta Política explica como a Waxis coleta, utiliza, compartilha, armazena e protege dados pessoais relacionados ao site, às demonstrações comerciais, ao suporte e ao uso da plataforma.</p></section>
    <section><h2>2. Quem controla os dados</h2><p>Nos dados coletados diretamente em nosso site e relacionamento comercial, a Waxis atua como controladora. No tratamento de conversas, contatos e informações inseridas por clientes na plataforma, a Waxis poderá atuar como operadora, seguindo as instruções do cliente contratante.</p></section>
    <section><h2>3. Dados que podemos tratar</h2><ul><li>Nome, cargo, empresa, telefone, WhatsApp e e-mail.</li><li>Informações fornecidas em formulários, reuniões e chamados de suporte.</li><li>Dados técnicos de acesso, como endereço IP, navegador, dispositivo e registros de segurança.</li><li>Dados de uso da plataforma necessários à prestação do serviço.</li><li>Conversas, contatos e arquivos inseridos pelo cliente, conforme sua configuração e responsabilidade.</li></ul></section>
    <section><h2>4. Finalidades e bases legais</h2><p>Tratamos dados para responder solicitações, apresentar e contratar serviços, prestar suporte, executar o contrato, proteger contas, cumprir obrigações legais, prevenir fraude e melhorar nossos produtos. Quando necessário, solicitaremos consentimento específico.</p></section>
    <section><h2>5. Compartilhamento</h2><p>Dados podem ser compartilhados com fornecedores de infraestrutura, comunicação, hospedagem, análise, pagamentos e integrações estritamente necessários à operação. Também poderemos compartilhar informações por obrigação legal, ordem de autoridade competente ou para proteger direitos.</p></section>
    <section><h2>6. Transferências internacionais</h2><p>Alguns fornecedores podem processar dados fora do Brasil. Nesses casos, adotamos medidas contratuais e técnicas compatíveis com a LGPD e avaliamos as garantias aplicáveis.</p></section>
    <section><h2>7. Segurança e retenção</h2><p>Aplicamos controles de acesso, registros, criptografia quando aplicável e rotinas de continuidade. Os dados são mantidos pelo tempo necessário às finalidades informadas, ao contrato e às obrigações legais, sendo eliminados ou anonimizados quando cabível.</p></section>
    <section><h2>8. Direitos do titular</h2><p>Você pode solicitar confirmação de tratamento, acesso, correção, portabilidade quando aplicável, informação sobre compartilhamento, revogação de consentimento e eliminação nos casos previstos em lei.</p></section>
    <section><h2>9. Contato</h2><p>Solicitações de privacidade podem ser enviadas para <a href="mailto:empraxisassessoria@gmail.com">empraxisassessoria@gmail.com</a>. Poderemos pedir informações adicionais para confirmar a identidade do solicitante.</p></section>
    <section><h2>10. Atualizações</h2><p>Esta Política poderá ser atualizada para refletir mudanças legais, técnicas ou comerciais. A data da versão mais recente será indicada no início do documento.</p></section>
  </LegalLayout>;
}
