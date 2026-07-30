import type { Metadata } from "next";
import { LegalLayout } from "../legal-layout";

export const metadata: Metadata = { title: "Política de Cookies — Waxis", description: "Informações sobre cookies e preferências de navegação no site Waxis." };

export default function Cookies() {
  return <LegalLayout eyebrow="Preferências de navegação" title="Política de Cookies">
    <section><h2>1. O que são cookies</h2><p>Cookies são pequenos arquivos armazenados no dispositivo para permitir funções do site, lembrar preferências, proteger sessões e, mediante autorização, medir o uso das páginas.</p></section>
    <section><h2>2. Categorias utilizadas</h2><h3>Cookies essenciais</h3><p>São necessários para segurança, navegação, funcionamento do consentimento e recursos solicitados. Não podem ser desativados pelo painel do site.</p><h3>Cookies de análise</h3><p>Ajudam a entender páginas visitadas, origem de tráfego e desempenho. Só serão ativados após consentimento quando exigido.</p><h3>Cookies de marketing</h3><p>Podem medir campanhas ou permitir personalização em plataformas externas. Só serão usados com autorização e após a efetiva instalação dessas ferramentas.</p></section>
    <section><h2>3. Preferências</h2><p>No primeiro acesso, você pode aceitar todos os cookies opcionais ou manter somente os essenciais. A escolha fica armazenada neste dispositivo. Você também pode apagar cookies nas configurações do navegador para refazer a decisão.</p></section>
    <section><h2>4. Cookies de terceiros</h2><p>Vídeos, agendas, formulários, chat, analytics e outras integrações poderão definir seus próprios cookies. Antes de adicionarmos uma nova ferramenta, sua finalidade e necessidade de consentimento devem ser avaliadas.</p></section>
    <section><h2>5. Contato</h2><p>Dúvidas sobre cookies ou dados pessoais podem ser enviadas para <a href="mailto:empraxisassessoria@gmail.com">empraxisassessoria@gmail.com</a>.</p></section>
  </LegalLayout>;
}
