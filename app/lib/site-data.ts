import { env } from "cloudflare:workers";

export type SiteConfig = {
  testUrl: string;
  bookingProvider: "calcom" | "calendly" | "google";
  calLink: string;
  calendlyLink: string;
  googleCalendarLink: string;
  contactEmail: string;
  whatsapp: string;
  facebookUrl: string;
  instagramUrl: string;
  linkedinUrl: string;
  xUrl: string;
  gaMeasurementId: string;
  gtmId: string;
  metaPixelId: string;
  googleVerification: string;
  metaVerification: string;
  siteTitle: string;
  siteDescription: string;
  allowAiSearch: boolean;
  allowAiTraining: boolean;
};

export const defaultSiteConfig: SiteConfig = {
  testUrl: "https://app.waxis.com.br/register",
  bookingProvider: "calcom",
  calLink: "",
  calendlyLink: "",
  googleCalendarLink: "",
  contactEmail: "empraxisassessoria@gmail.com",
  whatsapp: "",
  facebookUrl: "",
  instagramUrl: "",
  linkedinUrl: "",
  xUrl: "",
  gaMeasurementId: "",
  gtmId: "",
  metaPixelId: "",
  googleVerification: "",
  metaVerification: "",
  siteTitle: "Waxis — Nenhuma conversa perdida",
  siteDescription: "Centralize canais, preserve históricos e mantenha cada oportunidade em movimento com CRM, automação e inteligência comercial.",
  allowAiSearch: true,
  allowAiTraining: false,
};

type D1Result<T> = { results?: T[] };

function database() {
  const binding = (env as unknown as { DB?: D1Database }).DB;
  if (!binding) throw new Error("D1 binding DB is unavailable");
  return binding;
}

export async function ensureDatabase() {
  const db = database();
  await db.batch([
    db.prepare("CREATE TABLE IF NOT EXISTS site_settings (key TEXT PRIMARY KEY, value TEXT NOT NULL, updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, updated_by TEXT)"),
    db.prepare("CREATE TABLE IF NOT EXISTS legal_documents (slug TEXT PRIMARY KEY, title TEXT NOT NULL, content TEXT NOT NULL DEFAULT '', status TEXT NOT NULL DEFAULT 'draft', updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP, published_at TEXT, updated_by TEXT)"),
    db.prepare("CREATE TABLE IF NOT EXISTS analytics_events (id INTEGER PRIMARY KEY AUTOINCREMENT, session_id TEXT NOT NULL, event_type TEXT NOT NULL, path TEXT NOT NULL, label TEXT, referrer TEXT, source TEXT, medium TEXT, campaign TEXT, device TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    db.prepare("CREATE INDEX IF NOT EXISTS analytics_created_at_idx ON analytics_events(created_at)"),
    db.prepare("CREATE INDEX IF NOT EXISTS analytics_event_type_idx ON analytics_events(event_type)"),
    db.prepare("CREATE INDEX IF NOT EXISTS analytics_session_idx ON analytics_events(session_id)"),
    db.prepare("CREATE TABLE IF NOT EXISTS security_rate_limits (key TEXT NOT NULL, window_start INTEGER NOT NULL, count INTEGER NOT NULL DEFAULT 0, PRIMARY KEY (key, window_start))"),
    db.prepare("CREATE TABLE IF NOT EXISTS security_audit_log (id INTEGER PRIMARY KEY AUTOINCREMENT, actor TEXT NOT NULL, action TEXT NOT NULL, entity TEXT NOT NULL, entity_id TEXT NOT NULL, before_hash TEXT, after_hash TEXT, ip_hash TEXT, created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP)"),
    db.prepare("CREATE INDEX IF NOT EXISTS security_audit_created_idx ON security_audit_log(created_at)"),
  ]);
  return db;
}

export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const db = await ensureDatabase();
    const row = await db.prepare("SELECT value FROM site_settings WHERE key = ?").bind("site_config").first<{ value: string }>();
    return row?.value ? { ...defaultSiteConfig, ...JSON.parse(row.value) } : defaultSiteConfig;
  } catch {
    return defaultSiteConfig;
  }
}

export async function saveSiteConfig(config: SiteConfig, email: string) {
  const db = await ensureDatabase();
  await db.prepare(`
    INSERT INTO site_settings (key, value, updated_at, updated_by)
    VALUES (?, ?, CURRENT_TIMESTAMP, ?)
    ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = CURRENT_TIMESTAMP, updated_by = excluded.updated_by
  `).bind("site_config", JSON.stringify(config), email).run();
}

export async function getPublishedDocument(slug: string) {
  try {
    const db = await ensureDatabase();
    return await db.prepare("SELECT slug, title, content, updated_at AS updatedAt, published_at AS publishedAt FROM legal_documents WHERE slug = ? AND status = 'published'")
      .bind(slug).first<{ slug: string; title: string; content: string; updatedAt: string; publishedAt: string | null }>();
  } catch {
    return null;
  }
}

export async function getDocuments() {
  const db = await ensureDatabase();
  const data = await db.prepare("SELECT slug, title, content, status, updated_at AS updatedAt, published_at AS publishedAt FROM legal_documents ORDER BY slug").all();
  return (data as D1Result<Record<string, unknown>>).results ?? [];
}

export async function saveDocument(input: { slug: string; title: string; content: string; status: "draft" | "published" }, email: string) {
  const db = await ensureDatabase();
  await db.prepare(`
    INSERT INTO legal_documents (slug, title, content, status, updated_at, published_at, updated_by)
    VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP, CASE WHEN ? = 'published' THEN CURRENT_TIMESTAMP ELSE NULL END, ?)
    ON CONFLICT(slug) DO UPDATE SET title = excluded.title, content = excluded.content, status = excluded.status,
      updated_at = CURRENT_TIMESTAMP,
      published_at = CASE WHEN excluded.status = 'published' THEN CURRENT_TIMESTAMP ELSE legal_documents.published_at END,
      updated_by = excluded.updated_by
  `).bind(input.slug, input.title, input.content, input.status, input.status, email).run();
}

export async function recordEvent(input: {
  sessionId: string;
  eventType: string;
  path: string;
  label?: string;
  referrer?: string;
  source?: string;
  medium?: string;
  campaign?: string;
  device?: string;
}) {
  const db = await ensureDatabase();
  await db.prepare(`
    INSERT INTO analytics_events (session_id, event_type, path, label, referrer, source, medium, campaign, device)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).bind(input.sessionId, input.eventType, input.path, input.label ?? null, input.referrer ?? null, input.source ?? null, input.medium ?? null, input.campaign ?? null, input.device ?? null).run();
}

export async function getAnalyticsSummary(days = 30) {
  const db = await ensureDatabase();
  const range = `-${Math.max(1, Math.min(days, 365))} days`;
  const previousStart = `-${Math.max(2, Math.min(days * 2, 730))} days`;
  const [totals, previous, daily, pages, sources, devices, recent] = await Promise.all([
    db.prepare(`SELECT
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS sessions,
      SUM(CASE WHEN event_type = 'cta_click' THEN 1 ELSE 0 END) AS conversions,
      SUM(CASE WHEN event_type = 'booking_completed' THEN 1 ELSE 0 END) AS bookings
      FROM analytics_events WHERE created_at >= datetime('now', ?)`).bind(range).first(),
    db.prepare(`SELECT COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS sessions
      FROM analytics_events WHERE created_at >= datetime('now', ?) AND created_at < datetime('now', ?)`).bind(previousStart, range).first(),
    db.prepare(`SELECT date(created_at) AS day,
      SUM(CASE WHEN event_type = 'page_view' THEN 1 ELSE 0 END) AS visits,
      COUNT(DISTINCT CASE WHEN event_type = 'page_view' THEN session_id END) AS sessions
      FROM analytics_events WHERE created_at >= datetime('now', ?) GROUP BY date(created_at) ORDER BY day`).bind(range).all(),
    db.prepare(`SELECT path, COUNT(*) AS visits FROM analytics_events WHERE event_type = 'page_view' AND created_at >= datetime('now', ?) GROUP BY path ORDER BY visits DESC LIMIT 6`).bind(range).all(),
    db.prepare(`SELECT COALESCE(NULLIF(source, ''), NULLIF(referrer, ''), 'Direto') AS source, COUNT(*) AS visits FROM analytics_events WHERE event_type = 'page_view' AND created_at >= datetime('now', ?) GROUP BY 1 ORDER BY visits DESC LIMIT 6`).bind(range).all(),
    db.prepare(`SELECT COALESCE(device, 'desktop') AS device, COUNT(*) AS visits FROM analytics_events WHERE event_type = 'page_view' AND created_at >= datetime('now', ?) GROUP BY device ORDER BY visits DESC`).bind(range).all(),
    db.prepare(`SELECT event_type AS eventType, label, path, created_at AS createdAt FROM analytics_events ORDER BY id DESC LIMIT 10`).all(),
  ]);
  return {
    totals: totals ?? { visits: 0, sessions: 0, conversions: 0, bookings: 0 },
    previousSessions: Number((previous as { sessions?: number } | null)?.sessions ?? 0),
    daily: (daily as D1Result<Record<string, unknown>>).results ?? [],
    pages: (pages as D1Result<Record<string, unknown>>).results ?? [],
    sources: (sources as D1Result<Record<string, unknown>>).results ?? [],
    devices: (devices as D1Result<Record<string, unknown>>).results ?? [],
    recent: (recent as D1Result<Record<string, unknown>>).results ?? [],
  };
}
