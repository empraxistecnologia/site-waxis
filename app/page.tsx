import Image from "next/image";
import Link from "next/link";
import type { CSSProperties } from "react";
import { SiMeta } from "react-icons/si";
import { CookieBanner, Experience } from "./site-client";

const productChapters = [
  {
    n: "01",
    title: "A BrAIn encontra o que exige atenção.",
    body: "A inteligência comercial lê os sinais da operação, classifica oportunidades e ajuda sua equipe a priorizar quem está pronto para avançar.",
    image: "/assets/prints/03-brain-inteligencia-comercial.png",
    width: 1904,
    height: 902,
    alt: "Tela real da BrAIn com indicadores de inteligência comercial",
  },
  {
    n: "02",
    title: "Cada oportunidade tem um próximo passo.",
    body: "O funil visual reúne histórico, responsável, valor e etapa. Follow-ups deixam de depender da memória de quem atendeu.",
    image: "/assets/prints/04-kanban-funil-comercial.png",
    width: 1933,
    height: 1024,
    alt: "Funil Kanban real da Waxis com oportunidades por etapa",
  },
  {
    n: "03",
    title: "Sua operação também cria demanda.",
    body: "Encontre empresas por Google ou CNPJ, organize listas e leve novos contatos para o mesmo fluxo comercial que sua equipe já acompanha.",
    image: "/assets/prints/07-prospeccao.png",
    width: 1920,
    height: 911,
    alt: "Tela real de prospecção de empresas da Waxis",
  },
  {
    n: "04",
    title: "Campanhas que continuam a conversa.",
    body: "WhatsApp, SMS, e-mail e voz trabalham a sua base com segmentação, contexto e acompanhamento dentro da mesma operação.",
    image: "/assets/prints/05-campanhas-multicanal.png",
    width: 1920,
    height: 911,
    alt: "Tela real de campanhas multicanal da Waxis",
  },
];

const ecosystemNodes = [
  { name: "Webhooks", x: 24, y: 10, color: "#8b35ff" },
  { name: "API REST", x: 56, y: 8, color: "#3157ff" },
  { name: "Telegram", x: 35, y: 20, color: "#32b7f0" },
  { name: "E-mail", x: 63, y: 23, color: "#aeb7d9" },
  { name: "ERP", x: 81, y: 20, color: "#7e8db8" },
  { name: "Mercado Pago", x: 9, y: 27, color: "#1fb9e8" },
  { name: "Facebook", x: 19, y: 34, color: "#3286ff" },
  { name: "Meta AI", x: 34, y: 38, color: "#2273ff" },
  { name: "OpenAI", x: 60, y: 39, color: "#18ba92" },
  { name: "Google", x: 77, y: 39, color: "#65a2ff" },
  { name: "Pixel Meta", x: 91, y: 48, color: "#4389ff" },
  { name: "Stripe", x: 5, y: 55, color: "#6e5cff" },
  { name: "Instagram", x: 16, y: 54, color: "#ef3b87" },
  { name: "DeepSeek", x: 28, y: 58, color: "#4c77ff" },
  { name: "Claude", x: 67, y: 59, color: "#dd8a5f" },
  { name: "Google Calendar", x: 82, y: 62, color: "#48b85a" },
  { name: "WhatsApp", x: 17, y: 74, color: "#2bda72" },
  { name: "Asaas", x: 7, y: 81, color: "#1769ff" },
  { name: "Grok", x: 36, y: 76, color: "#f1f3f8" },
  { name: "Gemini", x: 57, y: 77, color: "#70a9ff" },
  { name: "Google Analytics", x: 86, y: 75, color: "#f1a234" },
  { name: "Google Meet", x: 29, y: 89, color: "#2bbca1" },
  { name: "Gmail", x: 73, y: 83, color: "#f05245" },
  { name: "Google Drive", x: 53, y: 92, color: "#ffd21c" },
  { name: "N8N", x: 75, y: 96, color: "#ef4e81" },
  { name: "Zapier", x: 23, y: 98, color: "#ff5b18" },
  { name: "Make", x: 49, y: 104, color: "#a442e8" },
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
          <a href="#implantacao">Implantação</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div className="nav-actions">
          <a className="text-link" href="#teste">Teste grátis</a>
          <a className="button button--small" href="#demonstracao">Agendar demonstração</a>
        </div>
        <button className="menu-button" data-menu-button aria-label="Abrir menu" aria-expanded="false">
          <Image unoptimized src="/assets/logos/icon-x.png" alt="" width={28} height={28} />
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
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
              <a className="button button--outline" href="#teste">Começar teste grátis</a>
            </div>
            <div className="trust-line" aria-label="Credenciais e benefícios">
              <span className="meta-mark"><SiMeta aria-hidden="true" /></span>
              <span><strong>Meta Tech Provider</strong><small>Tecnologia preparada para operações profissionais</small></span>
            </div>
          </div>

          <div className="hero-stage" data-hero-stage aria-label="Representação animada da operação Waxis">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <Image unoptimized className="hero-x" src="/assets/logos/icon-x.png" alt="" width={260} height={260} priority />
            <div className="conversation conversation--one">
              <span className="channel-dot whatsapp" /> Novo orçamento
              <small>Sem responsável · há 18 min</small>
            </div>
            <div className="conversation conversation--two">
              <span className="channel-dot instagram" /> Cliente retornou
              <small>Histórico localizado</small>
            </div>
            <div className="conversation conversation--three">
              <span className="channel-dot web" /> Lead qualificado
              <small>Prioridade alta · 87%</small>
            </div>
            <div className="signal-card">
              <p>Waxis identificou</p>
              <strong>12 oportunidades precisam de atenção</strong>
              <span><i /> Operação monitorada em tempo real</span>
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
            <h2>O cliente troca de atendente.<br />A história não começa de novo.</h2>
          </div>
          <div className="control-list">
            <article><span>01</span><h3>Histórico contínuo</h3><p>Conversas, dados e decisões acompanham o cliente — não o aparelho ou o funcionário.</p></article>
            <article><span>02</span><h3>Responsabilidade visível</h3><p>Cada contato tem dono, setor, etapa e prazo. O gestor enxerga o que parou antes que vire perda.</p></article>
            <article><span>03</span><h3>Follow-up que acontece</h3><p>Automações e tarefas mantêm a próxima ação ativa, mesmo nos dias de maior volume.</p></article>
          </div>
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
                    <span>{chapter.n} / 04</span>
                    <h3>{chapter.title}</h3>
                    <p>{chapter.body}</p>
                  </article>
                ))}
                <div className="tour-dots">
                  {productChapters.map((chapter, index) => <i key={chapter.n} className={index === 0 ? "is-active" : ""} data-tour-dot />)}
                </div>
              </div>
              <div className="tour-screen">
                {productChapters.map((chapter, index) => (
                  <Image unoptimized key={chapter.n} className={index === 0 ? "is-active" : ""} data-tour-image src={chapter.image} alt={chapter.alt} width={chapter.width} height={chapter.height} />
                ))}
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
            <a href="#teste">Começar teste grátis <b>→</b></a>
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
            <a className="button button--ghost" id="teste" href="mailto:empraxisassessoria@gmail.com?subject=Quero%20testar%20a%20Waxis">Começar teste grátis</a>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-brand">
          <Image unoptimized src="/assets/logos/logo-waxis-branco.png" alt="Waxis" width={160} height={40} />
          <p>Gestão inteligente de atendimento.<br />Conversas em movimento, oportunidades sob controle.</p>
        </div>
        <div><strong>Plataforma</strong><a href="#plataforma">Inteligência comercial</a><a href="#plataforma">CRM e funil</a><a href="#implantacao">Implantação</a></div>
        <div><strong>Empresa</strong><a href="#demonstracao">Demonstração</a><a href="#teste">Teste grátis</a><a href="mailto:empraxisassessoria@gmail.com">Contato</a></div>
        <div><strong>Legal</strong><Link href="/privacidade">Privacidade</Link><Link href="/termos">Termos de Uso</Link><Link href="/contrato-de-adesao">Contrato de Adesão</Link><Link href="/cookies">Política de Cookies</Link></div>
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


