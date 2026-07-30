import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaXTwitter } from "react-icons/fa6";
import { SiMeta } from "react-icons/si";
import { CookieBanner, Experience } from "./site-client";

const productChapters = [
  {
    n: "01",
    title: "Relatórios para enxergar o que realmente acontece.",
    body: "Acompanhe atendimentos, mensagens, tempo de resposta, uso da API, propostas e tarefas com filtros por período, setor e tags.",
    image: "/assets/prints/10-relatorios.png",
    width: 1897,
    height: 906,
    alt: "Tela real de relatórios operacionais da Waxis",
  },
  {
    n: "02",
    title: "O dia começa com a operação visível.",
    body: "Avisos, eventos, conversas abertas, contatos, tarefas e indicadores essenciais aparecem reunidos no dashboard da equipe.",
    image: "/assets/prints/11-dashboard-atual.png",
    width: 1902,
    height: 906,
    alt: "Dashboard real da Waxis com resumo diário da operação",
  },
  {
    n: "03",
    title: "Todas as conversas, com contexto e responsável.",
    body: "Atenda WhatsApp, comentários e outros canais com histórico, etapas, etiquetas e apoio de agentes de IA na mesma tela.",
    image: "/assets/prints/12-atendimento.png",
    width: 1892,
    height: 913,
    alt: "Tela real de atendimento centralizado da Waxis",
  },
  {
    n: "04",
    title: "Cada oportunidade tem um próximo passo.",
    body: "O Kanban organiza contatos por etapa, responsável, probabilidade e prazo para o follow-up não depender da memória da equipe.",
    image: "/assets/prints/13-kanban-atual.png",
    width: 1899,
    height: 903,
    alt: "Kanban real da Waxis com oportunidades comerciais",
  },
  {
    n: "05",
    title: "Projetos também entram no fluxo.",
    body: "Organize atividades em backlog, andamento, revisão e conclusão, com responsáveis e tarefas acompanhados dentro da operação.",
    image: "/assets/prints/14-projetos.png",
    width: 1914,
    height: 904,
    alt: "Tela real de gestão de projetos da Waxis",
  },
  {
    n: "06",
    title: "Campanhas que continuam a conversa.",
    body: "WhatsApp, SMS, e-mail, voz por IA e ligações trabalham a sua base com canais organizados e acompanhamento centralizado.",
    image: "/assets/prints/15-campanhas-atual.png",
    width: 1915,
    height: 904,
    alt: "Tela real de campanhas multicanal da Waxis",
  },
  {
    n: "07",
    title: "Novos recursos sem transformar a operação em remendos.",
    body: "Agenda, cobranças, documentos, formulários, avaliações, ligações, projetos, propostas e prospecção ampliam a plataforma.",
    image: "/assets/prints/16-apps-atual.png",
    width: 1903,
    height: 911,
    alt: "Tela real do ecossistema de aplicativos da Waxis",
  },
  {
    n: "08",
    title: "A BrAIn encontra o que exige atenção.",
    body: "A inteligência comercial analisa conversas, riscos, temperatura, LeadScore, SLA e probabilidade para orientar as prioridades da equipe.",
    image: "/assets/prints/17-brain-atual.png",
    width: 1901,
    height: 913,
    alt: "Tela real da BrAIn com indicadores de inteligência comercial",
  },
  {
    n: "09",
    title: "Regras que mantêm o processo em movimento.",
    body: "Aniversários, agentes de IA, Instagram, chatbots, follow-ups, sequências e workflows executam tarefas automaticamente.",
    image: "/assets/prints/18-automacoes-atual.png",
    width: 1912,
    height: 898,
    alt: "Tela real do módulo de automações da Waxis",
  },
  {
    n: "10",
    title: "Integrações para conectar a Waxis ao restante da empresa.",
    body: "IA e voz, pagamentos, agenda, marketing, e-commerce, ERP e portais de anúncios conectam dados e processos em uma só operação.",
    image: "/assets/prints/19-integracoes-atual.png",
    width: 1902,
    height: 901,
    alt: "Tela real da central de integrações da Waxis",
  },
  {
    n: "11",
    title: "Configurações que acompanham o seu processo.",
    body: "Organize conexões, setores, usuários, campos, etiquetas, origens, tarefas, respostas rápidas e regras internas conforme a operação da empresa.",
    image: "/assets/prints/20-configuracoes.png",
    width: 1916,
    height: 910,
    alt: "Tela real de configurações operacionais da Waxis",
  },
  {
    n: "12",
    title: "Prospecção para alimentar o comercial.",
    body: "Encontre empresas pelo Google Meu Negócio ou por CNPJ e CNAE, importe contatos para o CRM e mantenha o histórico das buscas.",
    image: "/assets/prints/21-prospeccao-atual.png",
    width: 1910,
    height: 903,
    alt: "Tela real do módulo de prospecção da Waxis",
  },
  {
    n: "13",
    title: "Sua reputação no Google também entra na operação.",
    body: "Sincronize locais, acompanhe avaliações, filtre notas e status e responda clientes do Google Meu Negócio sem perder o histórico.",
    image: "/assets/prints/22-google-meu-negocio.png",
    width: 1904,
    height: 907,
    alt: "Tela real de gestão de avaliações do Google Meu Negócio",
  },
];

const ecosystemNodes = [
  { name: "OpenAI", x: 60, y: 39, color: "#18ba92", category: "ia", ring: 0 },
  { name: "Claude", x: 67, y: 59, color: "#dd8a5f", category: "ia", ring: 0 },
  { name: "Gemini", x: 57, y: 77, color: "#70a9ff", category: "ia", ring: 0 },
  { name: "Grok", x: 36, y: 76, color: "#f1f3f8", category: "ia", ring: 0 },
  { name: "DeepSeek", x: 28, y: 58, color: "#4c77ff", category: "ia", ring: 0 },
  { name: "Meta AI", x: 34, y: 38, color: "#2273ff", category: "ia", ring: 0 },
  { name: "WhatsApp", x: 17, y: 74, color: "#2bda72", category: "canal", ring: 1 },
  { name: "Instagram", x: 16, y: 54, color: "#ef3b87", category: "canal", ring: 1 },
  { name: "Facebook", x: 19, y: 34, color: "#3286ff", category: "canal", ring: 1 },
  { name: "Telegram", x: 35, y: 20, color: "#32b7f0", category: "canal", ring: 1 },
  { name: "E-mail", x: 63, y: 23, color: "#aeb7d9", category: "canal", ring: 1 },
  { name: "Google", x: 77, y: 39, color: "#65a2ff", category: "google", ring: 1 },
  { name: "Google Calendar", x: 82, y: 62, color: "#48b85a", category: "google", ring: 1 },
  { name: "Gmail", x: 73, y: 83, color: "#f05245", category: "google", ring: 1 },
  { name: "Google Drive", x: 53, y: 92, color: "#ffd21c", category: "google", ring: 1 },
  { name: "Google Meet", x: 29, y: 89, color: "#2bbca1", category: "google", ring: 1 },
  { name: "Asaas", x: 7, y: 81, color: "#1769ff", category: "pagamento", ring: 2 },
  { name: "Stripe", x: 5, y: 55, color: "#6e5cff", category: "pagamento", ring: 2 },
  { name: "Mercado Pago", x: 9, y: 27, color: "#1fb9e8", category: "pagamento", ring: 2 },
  { name: "Webhooks", x: 24, y: 10, color: "#8b35ff", category: "integracao", ring: 2 },
  { name: "API REST", x: 56, y: 8, color: "#3157ff", category: "integracao", ring: 2 },
  { name: "ERP", x: 81, y: 20, color: "#7e8db8", category: "integracao", ring: 2 },
  { name: "Pixel Meta", x: 91, y: 48, color: "#4389ff", category: "automacao", ring: 2 },
  { name: "Google Analytics", x: 86, y: 75, color: "#f1a234", category: "automacao", ring: 2 },
  { name: "N8N", x: 75, y: 96, color: "#ef4e81", category: "automacao", ring: 2 },
  { name: "Make", x: 49, y: 104, color: "#a442e8", category: "automacao", ring: 2 },
  { name: "Zapier", x: 23, y: 98, color: "#ff5b18", category: "automacao", ring: 2 },
];

const faq = [
  ["A Waxis funciona com vários atendentes no mesmo número?", "Sim. A plataforma centraliza a conversa e permite distribuir atendimentos por usuários, equipes e setores, mantendo o histórico disponível para a operação."],
  ["Preciso contratar a implantação?", "Não. Sua equipe pode configurar e operar a plataforma. Se preferir, a Waxis também oferece diagnóstico, implantação, automações, treinamento e acompanhamento."],
  ["A Waxis utiliza a API Oficial do WhatsApp?", "A Waxis oferece conexão por API Oficial e outras modalidades, conforme o plano, o canal e os requisitos de homologação. Nossa equipe orienta a melhor configuração para cada operação."],
  ["O que acontece quando um atendente sai da empresa?", "O relacionamento permanece com a empresa. Histórico, contatos, tarefas e oportunidades ficam centralizados, respeitando as permissões configuradas."],
  ["A inteligência artificial substitui minha equipe?", "Não. Ela reduz tarefas repetitivas, identifica sinais e ajuda a organizar prioridades. Sua equipe continua no controle das decisões e dos relacionamentos importantes."],
  ["Consigo testar antes de contratar?", "Sim. Você pode iniciar um teste ou agendar uma demonstração orientada à realidade da sua operação."],
];

export default function Home() {
  return (
    <>
      <Experience />
      <header className="nav-shell">
        <Link href="/" className="brand" aria-label="Waxis — início">
          <Image unoptimized src="/assets/logos/logo-waxis.png" alt="Waxis" width={160} height={40} priority />
        </Link>
        <nav aria-label="Navegação principal">
          <a href="#transformacao">Por que Waxis</a>
          <a href="#plataforma">Plataforma</a>
          <a href="#ecossistema">Recursos</a>
          <a href="#implantacao">Implantação</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div className="nav-actions">
          <a className="text-link" href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">Teste grátis</a>
          <a className="button button--small" href="#demonstracao">Agendar demonstração</a>
        </div>
        <button className="menu-button" data-menu-button aria-label="Abrir menu" aria-expanded="false">
          <Image unoptimized src="/assets/logos/icon-x.png" alt="" width={28} height={28} />
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <canvas className="particle-field" data-particle-field data-theme="light" aria-hidden="true" />
          <div className="hero-copy">
            <p className="hero-kicker">Gestão inteligente de atendimento</p>
            <h1 id="hero-title">
              Nenhuma conversa perdida.{" "}
              <span>Nenhuma oportunidade esquecida.</span>
            </h1>
            <p className="hero-lede">
              Centralize seus canais, preserve cada histórico e acompanhe sua operação
              do primeiro contato ao fechamento.
            </p>
            <div className="hero-actions">
              <a className="button" href="#demonstracao">Agendar demonstração</a>
              <a className="button button--outline" href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">Começar teste grátis</a>
            </div>
            <div className="trust-line" aria-label="Credenciais e benefícios">
              <span className="meta-mark"><SiMeta aria-hidden="true" /></span>
              <span><strong>Meta Tech Provider</strong><small>Tecnologia preparada para operações profissionais</small></span>
            </div>
          </div>

          <div className="hero-stage" data-hero-stage aria-label="Representação animada da operação Waxis">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <Image unoptimized className="hero-x" src="/assets/logos/hero-core.png" alt="Símbolo Waxis" width={64} height={64} priority />
            <div className="hero-card-orbit">
              <svg className="hero-connections" viewBox="0 0 560 520" preserveAspectRatio="none" aria-hidden="true">
                <line x1="280" y1="260" x2="280" y2="34" />
                <line x1="280" y1="260" x2="440" y2="100" />
                <line x1="280" y1="260" x2="506" y2="260" />
                <line x1="280" y1="260" x2="440" y2="420" />
                <line x1="280" y1="260" x2="280" y2="486" />
                <line x1="280" y1="260" x2="120" y2="420" />
                <line x1="280" y1="260" x2="54" y2="260" />
                <line x1="280" y1="260" x2="120" y2="100" />
              </svg>
              <div className="hero-event hero-event--one">
                <b className="hero-event__icon">⌁</b>
                <span><small>09:02</small><strong>Atendimento concluído</strong><em>Demonstração realizada</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--two">
                <b className="hero-event__icon">↩</b>
                <span><small>09:02</small><strong>Cliente retornou</strong><em>Histórico localizado</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--three">
                <b className="hero-event__icon">✉</b>
                <span><small>09:03</small><strong>Follow-up gerado</strong><em>Resumo enviado no WhatsApp</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--four">
                <b className="hero-event__icon">!</b>
                <span><small>09:03</small><strong>Oportunidades em atenção</strong><em>12 sinais identificados</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--five">
                <b className="hero-event__icon">▤</b>
                <span><small>09:03</small><strong>CRM atualizado</strong><em>Proposta → Fechamento</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--six">
                <b className="hero-event__icon">◎</b>
                <span><small>09:04</small><strong>Lead qualificado</strong><em>Prioridade alta · 87%</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--seven">
                <b className="hero-event__icon">□</b>
                <span><small>09:04</small><strong>Reunião agendada</strong><em>Assinatura confirmada</em></span>
                <i>✓</i>
              </div>
              <div className="hero-event hero-event--eight">
                <b className="hero-event__icon">＋</b>
                <span><small>09:05</small><strong>Novo orçamento</strong><em>Responsável atribuído</em></span>
                <i>✓</i>
              </div>
            </div>
          </div>
          <a className="scroll-cue" href="#transformacao"><span />Role para organizar a operação</a>
        </section>

        <section className="reality" data-reality>
          <div className="reality-intro">
            <p>O problema não é o volume.</p>
            <h2>É o que se perde<br />dentro dele.</h2>
          </div>
          <div className="reality-lines">
            <span data-reality-line>O cliente precisa repetir tudo.</span>
            <span data-reality-line>O retorno importante fica para depois.</span>
            <span data-reality-line>O histórico está preso em outro celular.</span>
            <span data-reality-line>E uma oportunidade real esfria sem aviso.</span>
          </div>
        </section>

        <section className="transformation" id="transformacao">
          <div className="transformation-sticky">
            <div className="transformation-copy">
              <p>Do caos ao controle</p>
              <h2>Sua equipe atende. A Waxis mantém a operação em movimento.</h2>
              <p className="transformation-note">Conforme a operação se organiza, cada conversa ganha contexto, responsável e próximo passo.</p>
              <div className="progress-rail"><span data-transform-progress /></div>
            </div>
            <div className="dashboard-frame" data-dashboard-frame>
              <div className="frame-bar"><i /><i /><i /><span>Operação Waxis</span></div>
              <Image unoptimized src="/assets/prints/02-dashboard-inicio.png" alt="Dashboard real da Waxis com visão da operação" width={1920} height={911} />
              <div className="frame-callout frame-callout--sla"><small>SLA em risco</small><strong>3 conversas</strong></div>
              <div className="frame-callout frame-callout--lead"><small>Lead quente</small><strong>Próximo passo sugerido</strong></div>
            </div>
          </div>
        </section>

        <section className="control">
          <div className="control-head">
            <p className="section-label">Controle que atravessa a empresa</p>
            <h2><span>O cliente troca de atendente.</span><span>A história não começa de novo.</span></h2>
          </div>
          <div className="control-list">
            <article><span>01</span><h3>Histórico contínuo</h3><p>Conversas, dados e decisões acompanham o cliente — não o aparelho ou o funcionário.</p></article>
            <article><span>02</span><h3>Responsabilidade visível</h3><p>Cada contato tem dono, setor, etapa e prazo. O gestor enxerga o que parou antes que vire perda.</p></article>
            <article><span>03</span><h3>Follow-up que acontece</h3><p>Automações e tarefas mantêm a próxima ação ativa, mesmo nos dias de maior volume.</p></article>
          </div>
        </section>

        <section className="ai-evolution" aria-labelledby="ai-evolution-title">
          <div className="ai-evolution__head">
            <span className="ai-evolution__badge"><i aria-hidden="true">◎</i> Evolução contínua</span>
            <h2 id="ai-evolution-title">
              A <span>inteligência comercial</span> que fica melhor quanto mais trabalha.
            </h2>
          </div>
          <div className="ai-evolution__timeline">
            <article>
              <span>Mês 1</span>
              <h3>Aprende sua operação</h3>
              <p>Conecta canais, históricos e etapas para entender como sua equipe atende e vende.</p>
            </article>
            <article>
              <span>Mês 3</span>
              <h3>Identifica o que converte</h3>
              <p>Reconhece padrões nas conversas, objeções recorrentes e argumentos que fazem o negócio avançar.</p>
            </article>
            <article>
              <span>Mês 4</span>
              <h3>Alerta riscos de perda</h3>
              <p>Sinaliza contatos parados, SLA em risco e oportunidades que podem esfriar antes do próximo passo.</p>
            </article>
            <article>
              <span>Mês 6</span>
              <h3>Orienta as prioridades</h3>
              <p>Usa o contexto acumulado para mostrar à equipe onde agir primeiro e o que exige atenção.</p>
            </article>
          </div>
          <div className="ai-evolution__cta">
            <strong>Comece hoje. Daqui a 6 meses você vai desejar ter começado agora.</strong>
            <a className="button" href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">
              Iniciar teste grátis
            </a>
          </div>
        </section>

        <section className="platform-resources" id="recursos">
          <canvas className="particle-field" data-particle-field data-theme="light" aria-hidden="true" />
          <div className="resources-heading">
            <p>A plataforma</p>
            <h2>Uma operação inteira trabalhando no mesmo lugar.</h2>
            <span>
              Seis recursos conectados para sua equipe atender melhor, manter o processo em
              movimento e enxergar onde cada oportunidade precisa avançar.
            </span>
          </div>
          <div className="resources-list">
            <article>
              <span>Atendimento</span>
              <h3>Atendimento centralizado</h3>
              <p>Reúna conversas, históricos e responsáveis em um ambiente organizado, mesmo com vários canais e setores.</p>
            </article>
            <article>
              <span>Comercial</span>
              <h3>CRM e funil de vendas</h3>
              <p>Acompanhe leads e oportunidades em etapas personalizadas, do primeiro contato ao fechamento.</p>
            </article>
            <article>
              <span>Processos</span>
              <h3>Automações</h3>
              <p>Crie regras para mensagens, movimentações, tarefas, etiquetas, alertas e ações da operação.</p>
            </article>
            <article>
              <span>Inteligência</span>
              <h3>Agentes de IA</h3>
              <p>Qualifique contatos, responda com contexto, identifique prioridades e automatize tarefas repetitivas.</p>
            </article>
            <article>
              <span>Equipe</span>
              <h3>Gestão de atendimento</h3>
              <p>Acompanhe responsáveis, filas, setores, produtividade, tempo de resposta e andamento das conversas.</p>
            </article>
            <article>
              <span>Decisão</span>
              <h3>Dados e indicadores</h3>
              <p>Visualize o desempenho da operação em tempo real e tome decisões com informações centralizadas.</p>
            </article>
          </div>
          <a className="resources-link" href="#plataforma">Ver a plataforma em ação <b>→</b></a>
        </section>

        <section className="product-tour" id="plataforma">
          <div className="tour-intro">
            <p className="section-label">Por dentro da plataforma</p>
            <h2>Não é uma promessa.<br />É a sua operação, visível.</h2>
            <p>Telas reais da Waxis. Cada módulo resolve uma parte do mesmo fluxo comercial.</p>
          </div>
          <div className="tour-track" data-tour>
            <div className="tour-sticky">
              <div className="tour-copy">
                {productChapters.map((chapter, index) => (
                  <article key={chapter.n} className={index === 0 ? "is-active" : ""} data-tour-copy>
                    <span>{chapter.n} / 13</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                  </article>
                ))}
              </div>
              <div className="tour-visual">
                <div className="tour-screen">
                  <div className="tour-frame-bar" aria-hidden="true"><i /><i /><i /><span>Operação Waxis</span></div>
                  {productChapters.map((chapter, index) => (
                    <Image unoptimized key={chapter.n} className={index === 0 ? "is-active" : ""} data-tour-image src={chapter.image} alt={chapter.alt} width={chapter.width} height={chapter.height} />
                  ))}
                </div>
                <button className="tour-arrow tour-arrow--previous" type="button" data-tour-previous aria-label="Ver tela anterior">
                  <span aria-hidden="true">←</span>
                </button>
                <button className="tour-arrow tour-arrow--next" type="button" data-tour-next aria-label="Ver próxima tela">
                  <span aria-hidden="true">→</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="ecosystem" id="ecossistema">
          <div className="ecosystem-heading">
            <p>Uma plataforma, menos remendos</p>
            <h2>O Ecossistema Waxis.</h2>
            <span>
              Não é uma lista de integrações. É um sistema nervoso: inteligência artificial,
              canais, agenda, cobrança e automação trocando informações em tempo real, com a
              Waxis orquestrando cada troca.
            </span>
          </div>
          <div className="integration-network" aria-label="Ecossistema de integrações conectado à Waxis">
            <canvas className="ecosystem-canvas" data-ecosystem-canvas aria-hidden="true" />
            <svg className="network-lines" viewBox="0 0 1000 720" preserveAspectRatio="none" aria-hidden="true">
              {ecosystemNodes.map((node) => (
                <line key={node.name} x1="500" y1="360" x2={node.x * 10} y2={(node.y / 112) * 720} />
              ))}
            </svg>
            <div className="network-core-rings" aria-hidden="true"><i /><i /><i /></div>
            <div className="integration-hub">
              <Image unoptimized src="/assets/logos/logo-waxis-branco.png" alt="Waxis" width={160} height={40} />
              <small>Orquestra toda a operação</small>
            </div>
            {ecosystemNodes.map((node, index) => (
              <div
                className="integration-node"
                key={node.name}
                tabIndex={0}
                data-eco-node
                data-name={node.name}
                data-category={node.category}
                data-ring={node.ring}
                data-color={node.color}
                style={{
                  left: `${node.x}%`,
                  top: `${node.y / 1.12}%`,
                  "--node-color": node.color,
                  "--node-delay": `${index * -0.17}s`,
                } as CSSProperties}
              >
                <i />
                <span>{node.name}</span>
              </div>
            ))}
          </div>
          <p className="ecosystem-route" data-ecosystem-route>
            Passe o mouse sobre um serviço para ver o caminho dos dados.
          </p>
          <div className="ecosystem-roles" aria-label="Camadas do ecossistema">
            <span><i />Canais e atendimento</span>
            <span><i />Inteligência artificial</span>
            <span><i />Automação e APIs</span>
            <span><i />Cobrança e dados</span>
          </div>
        </section>

        <section className="implementation" id="implantacao">
          <div className="implementation-copy">
            <p className="section-label">A tecnologia se adapta ao seu momento</p>
            <h2>Você escolhe o quanto quer fazer sozinho.</h2>
            <p>A mesma plataforma, com dois caminhos de entrada. Comece com autonomia ou acelere com uma implantação desenhada para a sua operação.</p>
          </div>
          <div className="offer offer--self">
            <span>Plataforma</span>
            <h3>Sua equipe configura.</h3>
            <p>Acesso à Waxis para criar canais, funis, usuários, automações e agentes no ritmo do seu time.</p>
            <ul><li>Configuração autônoma</li><li>Base de orientação</li><li>Suporte especializado</li><li>Evolução por módulos</li></ul>
            <a href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">Começar teste grátis <b>→</b></a>
          </div>
          <div className="offer offer--guided">
            <span>Implantação Waxis</span>
            <h3>A gente deixa tudo em movimento.</h3>
            <p>Mapeamos a operação, configuramos a plataforma e preparamos a equipe para trabalhar com processo desde o primeiro dia.</p>
            <ul><li>Diagnóstico da operação</li><li>Funis e roteamento por setor</li><li>Automações e agentes de IA</li><li>Treinamento e acompanhamento</li></ul>
            <a href="#demonstracao">Planejar minha implantação <b>→</b></a>
          </div>
        </section>

        <section className="meta-section">
          <div className="meta-emblem"><SiMeta aria-hidden="true" /></div>
          <div>
            <p className="section-label">Meta Tech Provider</p>
            <h2>Uma operação profissional pede uma conexão profissional.</h2>
          </div>
          <p>A Waxis trabalha com tecnologia do ecossistema Meta para orientar conexões oficiais, estabilidade operacional e crescimento responsável no WhatsApp.</p>
        </section>

        <section className="faq" id="faq">
          <div><p className="section-label">Perguntas frequentes</p><h2>Antes de colocar sua operação em movimento.</h2></div>
          <div className="faq-list">
            {faq.map(([question, answer]) => (
              <details key={question}><summary>{question}<span>+</span></summary><p>{answer}</p></details>
            ))}
          </div>
        </section>

        <section className="final-cta" id="demonstracao">
          <Image unoptimized src="/assets/logos/icon-x.png" alt="" width={520} height={520} />
          <p className="section-label">Sua operação já está conversando</p>
          <h2>Agora ela precisa<br />se mover como uma só.</h2>
          <p>Conheça a Waxis aplicada ao volume, à equipe e aos processos da sua empresa.</p>
          <div>
            <a className="button button--light" href="mailto:empraxisassessoria@gmail.com?subject=Quero%20uma%20demonstração%20da%20Waxis">Agendar demonstração</a>
            <a className="button button--ghost" href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">Começar teste grátis</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <Image unoptimized src="/assets/logos/logo-waxis-branco.png" alt="Waxis" width={160} height={40} />
          <p>
            <span>Gestão inteligente de atendimento.</span>
            <span>Conversas em movimento, oportunidades sob controle.</span>
          </p>
          <div className="footer-socials" aria-label="Redes sociais da Waxis">
            <span aria-label="Facebook" title="Facebook"><FaFacebookF aria-hidden="true" /></span>
            <span aria-label="LinkedIn" title="LinkedIn"><FaLinkedinIn aria-hidden="true" /></span>
            <span aria-label="Instagram" title="Instagram"><FaInstagram aria-hidden="true" /></span>
            <span aria-label="X" title="X"><FaXTwitter aria-hidden="true" /></span>
          </div>
        </div>
        <div><strong>Plataforma</strong><a href="#plataforma">Inteligência comercial</a><a href="#plataforma">CRM e funil</a><a href="#implantacao">Implantação</a></div>
        <div><strong>Empresa</strong><a href="#demonstracao">Demonstração</a><a href="https://app.waxis.com.br/register" target="_blank" rel="noopener noreferrer">Teste grátis</a><a href="mailto:empraxisassessoria@gmail.com">Contato</a></div>
        <div><strong>Legal</strong><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de Uso</Link><Link href="/contrato-de-adesao">Contrato de Adesão</Link><Link href="/cookies">Política de Cookies</Link><button type="button" className="footer-cookie-link" data-cookie-settings>Gerenciar cookies</button></div>
        <div className="footer-bottom">
          <span>© 2026 Empraxis Marketing e Assessoria. Todos os direitos reservados.</span>
          <span>
            Conteúdo protegido pela{" "}
            <a href="https://www.planalto.gov.br/ccivil_03/leis/l9610.htm#art29" target="_blank" rel="noopener noreferrer">
              Lei nº 9.610/1998
            </a>
            . É proibida a reprodução total ou parcial sem autorização prévia e expressa, ressalvados os usos permitidos em lei.
          </span>
        </div>
      </footer>
      <CookieBanner />
    </>
  );
}


