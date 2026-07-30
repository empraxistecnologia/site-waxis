"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  LuActivity, LuChartColumn, LuBot, LuCalendarDays, LuCheck, LuChevronRight,
  LuExternalLink, LuFileText, LuGauge, LuGlobe, LuLayoutDashboard, LuLink,
  LuLogOut, LuMenu, LuMousePointerClick, LuRefreshCw, LuSave, LuSearch,
  LuSettings2, LuShieldCheck, LuUsers, LuX,
} from "react-icons/lu";
import type { ChatGPTUser } from "../chatgpt-auth";
import type { SiteConfig } from "../lib/site-data";

type Section = "dashboard" | "links" | "integrations" | "seo" | "legal";
type Analytics = {
  totals: { visits: number; sessions: number; conversions: number; bookings: number };
  previousSessions: number;
  daily: Array<{ day: string; visits: number; sessions: number }>;
  pages: Array<{ path: string; visits: number }>;
  sources: Array<{ source: string; visits: number }>;
  devices: Array<{ device: string; visits: number }>;
  recent: Array<{ eventType: string; label?: string; path: string; createdAt: string }>;
};
type LegalDocument = { slug: string; title: string; content: string; status: string; updatedAt?: string; publishedAt?: string };

const emptyConfig: SiteConfig = {
  testUrl: "", calLink: "", contactEmail: "", whatsapp: "", facebookUrl: "", instagramUrl: "", linkedinUrl: "", xUrl: "",
  gaMeasurementId: "", gtmId: "", metaPixelId: "", googleVerification: "", metaVerification: "",
  siteTitle: "", siteDescription: "", allowAiSearch: true, allowAiTraining: false,
};
const legalLabels: Record<string, string> = {
  privacidade: "Política de Privacidade",
  termos: "Termos de Uso",
  "contrato-de-adesao": "Contrato de Adesão",
  cookies: "Política de Cookies",
};
const sectionMeta: Record<Section, [string, string]> = {
  dashboard: ["Visão geral", "Acompanhe o movimento do site e os sinais de conversão."],
  links: ["Links e contatos", "Atualize os destinos dos botões e os canais oficiais."],
  integrations: ["Integrações", "Conecte agenda, análise e campanhas sem alterar o site."],
  seo: ["SEO e descoberta", "Controle como buscadores e inteligências artificiais encontram a Waxis."],
  legal: ["Documentos legais", "Edite, salve rascunhos e publique os textos institucionais."],
};

export function AdminConsole({ user, signOutPath }: { user: ChatGPTUser; signOutPath: string }) {
  const [section, setSection] = useState<Section>("dashboard");
  const [menuOpen, setMenuOpen] = useState(false);
  const [config, setConfig] = useState<SiteConfig>(emptyConfig);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [activeDocument, setActiveDocument] = useState("privacidade");
  const [days, setDays] = useState(30);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [settingsResponse, analyticsResponse, documentsResponse] = await Promise.all([
        fetch("/api/admin/settings"),
        fetch(`/api/admin/analytics?days=${days}`),
        fetch("/api/admin/documents"),
      ]);
      if (settingsResponse.ok) setConfig(await settingsResponse.json());
      if (analyticsResponse.ok) setAnalytics(await analyticsResponse.json());
      if (documentsResponse.ok) {
        const payload = await documentsResponse.json() as { documents: LegalDocument[] };
        setDocuments(payload.documents);
      }
    } finally {
      setLoading(false);
    }
  }, [days]);

  // The initial fetch synchronizes this client dashboard with the admin APIs.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => { void load(); }, [load]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 3600);
    return () => clearTimeout(timer);
  }, [notice]);

  const saveConfig = async () => {
    setSaving(true);
    const response = await fetch("/api/admin/settings", { method: "PUT", headers: { "Content-Type": "application/json" }, body: JSON.stringify(config) });
    setSaving(false);
    setNotice(response.ok ? "Configurações publicadas." : "Não foi possível salvar.");
  };

  const currentDocument = useMemo(() => {
    return documents.find((document) => document.slug === activeDocument) ?? {
      slug: activeDocument, title: legalLabels[activeDocument], content: "", status: "draft",
    };
  }, [documents, activeDocument]);

  const updateDocument = (changes: Partial<LegalDocument>) => {
    setDocuments((current) => {
      const exists = current.some((document) => document.slug === activeDocument);
      if (!exists) return [...current, { ...currentDocument, ...changes }];
      return current.map((document) => document.slug === activeDocument ? { ...document, ...changes } : document);
    });
  };

  const saveDocument = async (status: "draft" | "published") => {
    setSaving(true);
    const response = await fetch("/api/admin/documents", {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentDocument, status }),
    });
    setSaving(false);
    setNotice(response.ok ? status === "published" ? "Documento publicado." : "Rascunho salvo." : "Não foi possível salvar.");
    if (response.ok) void load();
  };

  const navigate = (target: Section) => {
    setSection(target);
    setMenuOpen(false);
  };

  const [title, subtitle] = sectionMeta[section];
  return (
    <div className={`admin-shell ${menuOpen ? "is-menu-open" : ""}`}>
      <button className="admin-menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-label="Abrir menu">
        {menuOpen ? <LuX /> : <LuMenu />}
      </button>
      <aside className="admin-sidebar">
        <Link className="admin-brand" href="/" aria-label="Voltar ao site">
          <Image unoptimized src="/assets/logos/logo-waxis-branco.png" alt="Waxis" width={132} height={34} />
          <span>Central de gestão</span>
        </Link>
        <nav aria-label="Navegação administrativa">
          <NavButton active={section === "dashboard"} onClick={() => navigate("dashboard")} icon={<LuLayoutDashboard />} label="Visão geral" />
          <NavButton active={section === "links"} onClick={() => navigate("links")} icon={<LuLink />} label="Links e contatos" />
          <NavButton active={section === "integrations"} onClick={() => navigate("integrations")} icon={<LuSettings2 />} label="Integrações" />
          <NavButton active={section === "seo"} onClick={() => navigate("seo")} icon={<LuSearch />} label="SEO e descoberta" />
          <NavButton active={section === "legal"} onClick={() => navigate("legal")} icon={<LuFileText />} label="Documentos legais" />
        </nav>
        <div className="admin-sidebar__footer">
          <div className="admin-user"><span>{user.displayName.slice(0, 1).toUpperCase()}</span><div><strong>{user.displayName}</strong><small>{user.email}</small></div></div>
          <a href={signOutPath}><LuLogOut /> Sair</a>
        </div>
      </aside>
      <main className="admin-main">
        <header className="admin-topbar">
          <div><span>Painel Waxis</span><h1>{title}</h1><p>{subtitle}</p></div>
          <div className="admin-topbar__actions">
            <a href="/" target="_blank" rel="noreferrer"><LuExternalLink /> Ver site</a>
            {section !== "dashboard" && section !== "legal" && <button type="button" onClick={saveConfig} disabled={saving}><LuSave /> {saving ? "Salvando..." : "Salvar alterações"}</button>}
          </div>
        </header>
        {section === "dashboard" && <Dashboard analytics={analytics} days={days} setDays={setDays} loading={loading} refresh={load} />}
        {section === "links" && <LinksForm config={config} setConfig={setConfig} />}
        {section === "integrations" && <IntegrationsForm config={config} setConfig={setConfig} />}
        {section === "seo" && <SeoForm config={config} setConfig={setConfig} />}
        {section === "legal" && (
          <LegalEditor
            documents={documents} active={activeDocument} setActive={setActiveDocument}
            document={currentDocument} update={updateDocument} save={saveDocument} saving={saving}
          />
        )}
      </main>
      {notice && <div className="admin-toast" role="status"><LuCheck /> {notice}</div>}
    </div>
  );
}

function NavButton({ active, onClick, icon, label }: { active: boolean; onClick: () => void; icon: ReactNode; label: string }) {
  return <button className={active ? "is-active" : ""} type="button" onClick={onClick}>{icon}<span>{label}</span><LuChevronRight /></button>;
}

function Dashboard({ analytics, days, setDays, loading, refresh }: {
  analytics: Analytics | null; days: number; setDays: (days: number) => void; loading: boolean; refresh: () => void;
}) {
  const totals = analytics?.totals ?? { visits: 0, sessions: 0, conversions: 0, bookings: 0 };
  const previous = analytics?.previousSessions ?? 0;
  const change = previous ? Math.round(((totals.sessions - previous) / previous) * 100) : totals.sessions ? 100 : 0;
  const maxVisit = Math.max(1, ...(analytics?.daily.map((day) => Number(day.visits)) ?? [1]));
  return (
    <section className="admin-dashboard">
      <div className="dashboard-toolbar">
        <div className="period-switch" aria-label="Período">
          {[7, 30, 90].map((period) => <button type="button" className={days === period ? "is-active" : ""} onClick={() => setDays(period)} key={period}>{period} dias</button>)}
        </div>
        <button className="icon-action" type="button" onClick={refresh} aria-label="Atualizar dados"><LuRefreshCw className={loading ? "is-spinning" : ""} /></button>
      </div>
      <div className="metric-grid">
        <Metric icon={<LuGauge />} label="Visualizações" value={totals.visits} note={`${days} dias`} tone="violet" />
        <Metric icon={<LuUsers />} label="Sessões" value={totals.sessions} note={`${change >= 0 ? "+" : ""}${change}% vs. período anterior`} tone="blue" />
        <Metric icon={<LuMousePointerClick />} label="Cliques em CTA" value={totals.conversions} note={totals.visits ? `${((totals.conversions / totals.visits) * 100).toFixed(1)}% das visualizações` : "Aguardando movimento"} tone="orange" />
        <Metric icon={<LuCalendarDays />} label="Agendamentos" value={totals.bookings} note="Confirmados pelo Cal.com" tone="green" />
      </div>
      <div className="dashboard-layout">
        <article className="analytics-chart">
          <div className="panel-heading"><div><span>Tráfego</span><h2>Movimento diário</h2></div><LuActivity /></div>
          {analytics?.daily.length ? (
            <div className="bar-chart">
              {analytics.daily.map((day) => <div className="bar-chart__item" key={day.day} title={`${day.day}: ${day.visits} visualizações`}>
                <span style={{ height: `${Math.max(6, (Number(day.visits) / maxVisit) * 100)}%` }} />
                <small>{day.day.slice(5).replace("-", "/")}</small>
              </div>)}
            </div>
          ) : <EmptyAnalytics />}
        </article>
        <article className="conversion-panel">
          <div className="panel-heading"><div><span>Conversão</span><h2>Do acesso à ação</h2></div><LuChartColumn /></div>
          <FunnelRow label="Sessões" value={totals.sessions} total={totals.sessions} />
          <FunnelRow label="Cliques" value={totals.conversions} total={totals.sessions} />
          <FunnelRow label="Agendamentos" value={totals.bookings} total={totals.sessions} />
          <p>Os números começam a aparecer depois que visitantes autorizarem cookies de análise.</p>
        </article>
        <DataList title="Páginas mais vistas" icon={<LuGlobe />} rows={analytics?.pages.map((row) => [row.path, row.visits]) ?? []} />
        <DataList title="Origem do tráfego" icon={<LuActivity />} rows={analytics?.sources.map((row) => [row.source, row.visits]) ?? []} />
      </div>
    </section>
  );
}

function Metric({ icon, label, value, note, tone }: { icon: ReactNode; label: string; value: number; note: string; tone: string }) {
  return <article className={`metric metric--${tone}`}><div>{icon}<span>{label}</span></div><strong>{Number(value).toLocaleString("pt-BR")}</strong><small>{note}</small></article>;
}
function FunnelRow({ label, value, total }: { label: string; value: number; total: number }) {
  const percent = total ? Math.min(100, Math.round((value / total) * 100)) : 0;
  return <div className="funnel-row"><div><span>{label}</span><strong>{value}</strong></div><i><b style={{ width: `${percent}%` }} /></i></div>;
}
function DataList({ title, icon, rows }: { title: string; icon: ReactNode; rows: Array<[string, number]> }) {
  const max = Math.max(1, ...rows.map((row) => Number(row[1])));
  return <article className="data-list"><div className="panel-heading"><div><h2>{title}</h2></div>{icon}</div>{rows.length ? rows.map(([label, value]) => <div className="data-list__row" key={label}><span>{label}</span><i><b style={{ width: `${(Number(value) / max) * 100}%` }} /></i><strong>{value}</strong></div>) : <EmptyAnalytics compact />}</article>;
}
function EmptyAnalytics({ compact = false }: { compact?: boolean }) {
  return <div className={`empty-analytics ${compact ? "is-compact" : ""}`}><LuChartColumn /><strong>Os primeiros dados aparecerão aqui.</strong>{!compact && <p>Publique o painel e acesse o site com cookies de análise autorizados.</p>}</div>;
}

function Field({ label, hint, children }: { label: string; hint?: string; children: ReactNode }) {
  return <label className="admin-field"><span>{label}</span>{children}{hint && <small>{hint}</small>}</label>;
}
function SectionCard({ icon, title, description, children }: { icon: ReactNode; title: string; description: string; children: ReactNode }) {
  return <section className="settings-section"><header><i>{icon}</i><div><h2>{title}</h2><p>{description}</p></div></header><div className="settings-fields">{children}</div></section>;
}
function LinksForm({ config, setConfig }: { config: SiteConfig; setConfig: (config: SiteConfig) => void }) {
  const update = (key: keyof SiteConfig, value: string) => setConfig({ ...config, [key]: value });
  return <div className="settings-stack">
    <SectionCard icon={<LuMousePointerClick />} title="Ações principais" description="Destinos usados nos botões de conversão do site.">
      <Field label="Link do teste grátis"><input type="url" value={config.testUrl} onChange={(event) => update("testUrl", event.target.value)} /></Field>
      <Field label="Agenda do Cal.com" hint="Use somente usuário/evento. Ex.: waxis/demonstracao"><input value={config.calLink} onChange={(event) => update("calLink", event.target.value)} placeholder="waxis/demonstracao" /></Field>
      <Field label="E-mail comercial"><input type="email" value={config.contactEmail} onChange={(event) => update("contactEmail", event.target.value)} /></Field>
      <Field label="WhatsApp comercial"><input value={config.whatsapp} onChange={(event) => update("whatsapp", event.target.value)} placeholder="5565999999999" /></Field>
    </SectionCard>
    <SectionCard icon={<LuLink />} title="Redes sociais" description="Links oficiais exibidos no rodapé.">
      <Field label="Instagram"><input type="url" value={config.instagramUrl} onChange={(event) => update("instagramUrl", event.target.value)} /></Field>
      <Field label="LinkedIn"><input type="url" value={config.linkedinUrl} onChange={(event) => update("linkedinUrl", event.target.value)} /></Field>
      <Field label="Facebook"><input type="url" value={config.facebookUrl} onChange={(event) => update("facebookUrl", event.target.value)} /></Field>
      <Field label="X"><input type="url" value={config.xUrl} onChange={(event) => update("xUrl", event.target.value)} /></Field>
    </SectionCard>
  </div>;
}
function IntegrationsForm({ config, setConfig }: { config: SiteConfig; setConfig: (config: SiteConfig) => void }) {
  const update = (key: keyof SiteConfig, value: string) => setConfig({ ...config, [key]: value });
  return <div className="settings-stack">
    <SectionCard icon={<LuChartColumn />} title="Google" description="Análise de audiência e gerenciamento de tags.">
      <Field label="Google Analytics 4" hint="Ex.: G-XXXXXXXXXX"><input value={config.gaMeasurementId} onChange={(event) => update("gaMeasurementId", event.target.value)} placeholder="G-" /></Field>
      <Field label="Google Tag Manager" hint="Ex.: GTM-XXXXXXX"><input value={config.gtmId} onChange={(event) => update("gtmId", event.target.value)} placeholder="GTM-" /></Field>
      <Field label="Verificação do Search Console"><input value={config.googleVerification} onChange={(event) => update("googleVerification", event.target.value)} /></Field>
    </SectionCard>
    <SectionCard icon={<LuActivity />} title="Meta" description="Medição de campanhas e validação do domínio.">
      <Field label="ID do Meta Pixel"><input value={config.metaPixelId} onChange={(event) => update("metaPixelId", event.target.value)} /></Field>
      <Field label="Verificação de domínio da Meta"><input value={config.metaVerification} onChange={(event) => update("metaVerification", event.target.value)} /></Field>
      <div className="integration-note"><LuShieldCheck /><p>A Conversions API exige uma credencial secreta no servidor. Ela será adicionada em uma etapa protegida, sem expor o token neste formulário.</p></div>
    </SectionCard>
  </div>;
}
function SeoForm({ config, setConfig }: { config: SiteConfig; setConfig: (config: SiteConfig) => void }) {
  const update = (key: keyof SiteConfig, value: string | boolean) => setConfig({ ...config, [key]: value });
  return <div className="settings-stack">
    <SectionCard icon={<LuSearch />} title="Resultado de busca" description="Prévia principal usada por buscadores e compartilhamentos.">
      <Field label="Título do site"><input value={config.siteTitle} onChange={(event) => update("siteTitle", event.target.value)} maxLength={62} /></Field>
      <Field label="Descrição"><textarea value={config.siteDescription} onChange={(event) => update("siteDescription", event.target.value)} rows={4} maxLength={165} /></Field>
      <div className="search-preview"><small>waxis.com.br</small><strong>{config.siteTitle || "Waxis"}</strong><p>{config.siteDescription}</p></div>
    </SectionCard>
    <SectionCard icon={<LuBot />} title="Buscadores e inteligência artificial" description="Controle a descoberta do conteúdo público da Waxis.">
      <Toggle checked={config.allowAiSearch} onChange={(value) => update("allowAiSearch", value)} title="Permitir busca por inteligências artificiais" description="Autoriza o OAI-SearchBot a encontrar e citar páginas públicas." />
      <Toggle checked={config.allowAiTraining} onChange={(value) => update("allowAiTraining", value)} title="Permitir uso para treinamento" description="Autoriza o GPTBot. Pode permanecer desligado sem bloquear a busca do ChatGPT." />
      <div className="integration-note"><LuGlobe /><p>O sitemap, robots.txt e o arquivo llms.txt serão gerados automaticamente a partir destas preferências.</p></div>
    </SectionCard>
  </div>;
}
function Toggle({ checked, onChange, title, description }: { checked: boolean; onChange: (value: boolean) => void; title: string; description: string }) {
  return <label className="toggle-row"><button type="button" role="switch" aria-checked={checked} className={checked ? "is-on" : ""} onClick={() => onChange(!checked)}><span /></button><div><strong>{title}</strong><small>{description}</small></div></label>;
}
function LegalEditor({ documents, active, setActive, document, update, save, saving }: {
  documents: LegalDocument[]; active: string; setActive: (slug: string) => void; document: LegalDocument;
  update: (changes: Partial<LegalDocument>) => void; save: (status: "draft" | "published") => void; saving: boolean;
}) {
  return <section className="legal-editor">
    <aside>{Object.entries(legalLabels).map(([slug, label]) => {
      const current = documents.find((item) => item.slug === slug);
      return <button type="button" className={active === slug ? "is-active" : ""} onClick={() => setActive(slug)} key={slug}><span><LuFileText />{label}</span><small>{current?.status === "published" ? "Publicado" : "Rascunho"}</small></button>;
    })}</aside>
    <article>
      <header><div><span>{document.status === "published" ? "Publicado" : "Rascunho"}</span><h2>{legalLabels[active]}</h2><p>Use títulos iniciados por <code>##</code>, listas com <code>-</code> e parágrafos separados por uma linha.</p></div><a href={`/${active}`} target="_blank" rel="noreferrer"><LuExternalLink /> Visualizar</a></header>
      <Field label="Título"><input value={document.title} onChange={(event) => update({ title: event.target.value })} /></Field>
      <Field label="Conteúdo do documento"><textarea className="document-textarea" value={document.content} onChange={(event) => update({ content: event.target.value })} placeholder={"## 1. Objetivo\n\nEscreva o conteúdo aqui.\n\n## 2. Condições\n\n- Primeiro item\n- Segundo item"} /></Field>
      <footer><button type="button" className="secondary-action" onClick={() => save("draft")} disabled={saving}>Salvar rascunho</button><button type="button" className="primary-action" onClick={() => save("published")} disabled={saving}><LuCheck /> Publicar documento</button></footer>
    </article>
  </section>;
}

