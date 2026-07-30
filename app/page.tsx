import Image from "next/image";
import Link from "next/link";
import { CookieBanner, Experience } from "./site-client";

const productChapters = [
  {
    n: "01",
    title: "A BrAIn encontra o que exige atenção.",
    body: "A inteligência comercial lê os sinais da operação, classifica oportunidades e ajuda sua equipe a priorizar quem está pronto para avançar.",
    image: "/assets/prints/03-brain-inteligencia-comercial.png",
    alt: "Tela real da BrAIn com indicadores de inteligência comercial",
  },
  {
    n: "02",
    title: "Cada oportunidade tem um próximo passo.",
    body: "O funil visual reúne histórico, responsável, valor e etapa. Follow-ups deixam de depender da memória de quem atendeu.",
    image: "/assets/prints/04-kanban-funil-comercial.png",
    alt: "Funil Kanban real da Waxis com oportunidades por etapa",
  },
  {
    n: "03",
    title: "Sua operação também cria demanda.",
    body: "Encontre empresas por Google ou CNPJ, organize listas e leve novos contatos para o mesmo fluxo comercial que sua equipe já acompanha.",
    image: "/assets/prints/07-prospeccao.png",
    alt: "Tela real de prospecção de empresas da Waxis",
  },
  {
    n: "04",
    title: "Campanhas que continuam a conversa.",
    body: "WhatsApp, SMS, e-mail e voz trabalham a sua base com segmentação, contexto e acompanhamento dentro da mesma operação.",
    image: "/assets/prints/05-campanhas-multicanal.png",
    alt: "Tela real de campanhas multicanal da Waxis",
  },
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
          <Image src="/assets/logos/logo-waxis.png" alt="Waxis" width={148} height={44} priority />
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
          <span /><span />
        </button>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="hero-kicker">Gestão inteligente de atendimento</p>
            <h1 id="hero-title">
              Nenhuma conversa perdida.<br />
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
              <span className="meta-mark">M</span>
              <span><strong>Meta Tech Provider</strong><small>Tecnologia preparada para operações profissionais</small></span>
            </div>
          </div>

          <div className="hero-stage" data-hero-stage aria-label="Representação animada da operação Waxis">
            <div className="orbit orbit--one" />
            <div className="orbit orbit--two" />
            <Image className="hero-x" src="/assets/logos/icon-x.png" alt="" width={260} height={260} priority />
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

        <section className="reality">
          <p>Quando o volume cresce, a perda raramente faz barulho.</p>
          <div className="reality-lines">
            <span>O cliente repete tudo.</span>
            <span>O retorno fica para depois.</span>
            <span>O histórico está em outro celular.</span>
            <span>E a oportunidade esfria.</span>
          </div>
        </section>

        <section className="transformation" id="transformacao">
          <div className="transformation-sticky">
            <div className="transformation-copy">
              <p>Do caos ao controle</p>
              <h2>Sua equipe atende.<br />A Waxis mantém<br />a operação em movimento.</h2>
              <p className="transformation-note">Conforme a operação se organiza, cada conversa ganha contexto, responsável e próximo passo.</p>
              <div className="progress-rail"><span data-transform-progress /></div>
            </div>
            <div className="dashboard-frame" data-dashboard-frame>
              <div className="frame-bar"><i /><i /><i /><span>Operação Waxis</span></div>
              <Image src="/assets/prints/02-dashboard-inicio.png" alt="Dashboard real da Waxis com visão da operação" width={1600} height={900} />
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
                  <Image key={chapter.n} className={index === 0 ? "is-active" : ""} data-tour-image src={chapter.image} alt={chapter.alt} width={1600} height={900} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="ecosystem">
          <div>
            <p className="section-label">Uma plataforma, menos remendos</p>
            <h2>Atendimento é só o começo.</h2>
          </div>
          <div className="ecosystem-flow">
            <span>WhatsApp</span><span>Instagram</span><span>Facebook</span><span>Webchat</span>
            <strong><Image src="/assets/logos/icon-x.png" alt="" width={82} height={82} />Waxis</strong>
            <span>CRM</span><span>Automações</span><span>Campanhas</span><span>Integrações</span>
          </div>
          <div className="ecosystem-proof">
            <Image src="/assets/prints/08-ecossistema-de-apps.png" alt="Ecossistema real de aplicativos Waxis" width={1600} height={900} />
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
          <div className="meta-emblem">M</div>
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
          <Image src="/assets/logos/icon-x.png" alt="" width={520} height={520} />
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
          <Image src="/assets/logos/logo-waxis-branco.png" alt="Waxis" width={162} height={48} />
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
