export async function GET() {
  const content = `# Waxis

> Gestão inteligente de atendimento para empresas com alto volume de conversas no WhatsApp.

A Waxis centraliza canais, histórico, CRM, funil, automações, campanhas, projetos, relatórios e inteligência comercial. A plataforma ajuda equipes a atender com contexto, executar follow-ups e identificar oportunidades e riscos.

## Páginas
- / — visão geral da plataforma e recursos
- /privacidade — política de privacidade
- /termos — termos de uso
- /contrato-de-adesao — contrato de adesão
- /cookies — política de cookies

## Contato
empraxisassessoria@gmail.com
`;
  return new Response(content, { headers: { "content-type": "text/plain; charset=utf-8" } });
}
