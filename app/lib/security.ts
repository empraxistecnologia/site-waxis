import { env } from "cloudflare:workers";
import { defaultSiteConfig, type SiteConfig } from "./site-data";

const MAX_JSON_BYTES = 128_000;
const bookingHosts = {
  calcom: ["cal.com", "www.cal.com"],
  calendly: ["calendly.com", "www.calendly.com"],
  google: ["calendar.google.com"],
} as const;

function database() {
  const binding = (env as unknown as { DB?: D1Database }).DB;
  if (!binding) throw new Error("D1 binding DB is unavailable");
  return binding;
}

export function securityJson(body: unknown, init: ResponseInit = {}) {
  const headers = new Headers(init.headers);
  headers.set("Cache-Control", "no-store");
  headers.set("Content-Type", "application/json; charset=utf-8");
  return Response.json(body, { ...init, headers });
}

export async function parseJsonBody<T>(request: Request): Promise<T> {
  const type = request.headers.get("content-type")?.split(";")[0].trim();
  if (type !== "application/json") throw new SecurityError("Use Content-Type application/json.", 415);
  const declared = Number(request.headers.get("content-length") ?? 0);
  if (declared > MAX_JSON_BYTES) throw new SecurityError("Requisição muito grande.", 413);
  const reader = request.body?.getReader();
  const chunks: Uint8Array[] = [];
  let total = 0;
  if (reader) {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      total += value.byteLength;
      if (total > MAX_JSON_BYTES) {
        await reader.cancel();
        throw new SecurityError("Requisição muito grande.", 413);
      }
      chunks.push(value);
    }
  }
  const bytes = new Uint8Array(total);
  let offset = 0;
  for (const chunk of chunks) { bytes.set(chunk, offset); offset += chunk.byteLength; }
  let text: string;
  try { text = new TextDecoder("utf-8", { fatal: true }).decode(bytes); }
  catch { throw new SecurityError("O corpo deve usar UTF-8 válido.", 400); }
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new SecurityError("JSON inválido.", 400);
  }
}

export function requireSameOriginMutation(request: Request) {
  const origin = request.headers.get("origin");
  const expected = new URL(request.url).origin;
  const fetchSite = request.headers.get("sec-fetch-site");
  const action = request.headers.get("x-waxis-admin-action");
  if (!origin || origin !== expected || (fetchSite && fetchSite !== "same-origin") || action !== "1") {
    throw new SecurityError("Origem da requisição não autorizada.", 403);
  }
}

export async function enforceRateLimit(request: Request, scope: string, limit: number, windowSeconds = 60) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const actor = request.headers.get("oai-authenticated-user-email")?.toLowerCase() ?? "";
  const raw = scope.endsWith(":global") ? scope : `${scope}|${actor || ip}`;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(raw));
  const key = Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
  const windowStart = Math.floor(Date.now() / 1000 / windowSeconds) * windowSeconds;
  const db = database();
  const row = await db.prepare(`
    INSERT INTO security_rate_limits (key, window_start, count)
    VALUES (?, ?, 1)
    ON CONFLICT(key, window_start) DO UPDATE SET count = count + 1
    RETURNING count
  `).bind(key, windowStart).first<{ count: number }>();
  if (crypto.getRandomValues(new Uint8Array(1))[0] === 0) {
    await db.prepare("DELETE FROM security_rate_limits WHERE window_start < ?").bind(windowStart - 86_400).run();
  }
  if (Number(row?.count ?? 1) > limit) throw new SecurityError("Muitas solicitações. Aguarde um minuto.", 429);
}

export async function auditSecurityEvent(input: {
  actor: string; action: string; entity: string; entityId: string; request: Request; before?: unknown; after?: unknown;
}) {
  const db = database();
  const [beforeHash, afterHash] = await Promise.all([hashValue(input.before), hashValue(input.after)]);
  const ip = input.request.headers.get("cf-connecting-ip") ?? "";
  await db.prepare(`
    INSERT INTO security_audit_log (actor, action, entity, entity_id, before_hash, after_hash, ip_hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
  `).bind(input.actor, input.action, input.entity, input.entityId, beforeHash, afterHash, await hashValue(ip)).run();
}

export function sanitizeSiteConfig(input: Partial<SiteConfig>): SiteConfig {
  const provider = ["calcom", "calendly", "google"].includes(String(input.bookingProvider))
    ? input.bookingProvider as SiteConfig["bookingProvider"] : "calcom";
  const config: SiteConfig = {
    ...defaultSiteConfig,
    ...input,
    bookingProvider: provider,
    allowAiSearch: Boolean(input.allowAiSearch),
    allowAiTraining: Boolean(input.allowAiTraining),
  };
  config.testUrl = safeHttpsUrl(config.testUrl);
  config.calLink = safeBookingUrl(config.calLink, "calcom", true);
  config.calendlyLink = safeBookingUrl(config.calendlyLink, "calendly");
  config.googleCalendarLink = safeBookingUrl(config.googleCalendarLink, "google");
  config.facebookUrl = safeOptionalHttpsUrl(config.facebookUrl);
  config.instagramUrl = safeOptionalHttpsUrl(config.instagramUrl);
  config.linkedinUrl = safeOptionalHttpsUrl(config.linkedinUrl);
  config.xUrl = safeOptionalHttpsUrl(config.xUrl);
  config.contactEmail = String(config.contactEmail).trim().toLowerCase().slice(0, 254);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.contactEmail)) throw new SecurityError("E-mail comercial inválido.", 400);
  config.whatsapp = String(config.whatsapp).replace(/\D/g, "").slice(0, 16);
  config.gaMeasurementId = matchOrEmpty(config.gaMeasurementId, /^G-[A-Z0-9]{4,20}$/i, "Google Analytics");
  config.gtmId = matchOrEmpty(config.gtmId, /^GTM-[A-Z0-9]{4,20}$/i, "Google Tag Manager");
  config.metaPixelId = matchOrEmpty(config.metaPixelId, /^\d{5,30}$/, "Meta Pixel");
  config.googleVerification = safeToken(config.googleVerification, 180);
  config.metaVerification = safeToken(config.metaVerification, 180);
  config.siteTitle = String(config.siteTitle).trim().slice(0, 70);
  config.siteDescription = String(config.siteDescription).trim().slice(0, 180);
  if (!config.siteTitle || !config.siteDescription) throw new SecurityError("Título e descrição do site são obrigatórios.", 400);
  return config;
}

function safeBookingUrl(value: string, provider: keyof typeof bookingHosts, allowPath = false) {
  const text = String(value ?? "").trim();
  if (!text) return "";
  if (allowPath && !/^https?:\/\//i.test(text)) {
    if (!/^[a-z0-9._-]+\/[a-z0-9._/-]+$/i.test(text)) throw new SecurityError("Link do Cal.com inválido.", 400);
    return text;
  }
  const url = parseHttps(text);
  if (!bookingHosts[provider].includes(url.hostname as never)) throw new SecurityError(`Domínio de agenda inválido para ${provider}.`, 400);
  return url.toString();
}

function safeHttpsUrl(value: string) { return parseHttps(String(value ?? "").trim()).toString(); }
function safeOptionalHttpsUrl(value: string) { const text = String(value ?? "").trim(); return text ? safeHttpsUrl(text) : ""; }
function parseHttps(value: string) {
  let url: URL;
  try { url = new URL(value); } catch { throw new SecurityError("Informe um endereço HTTPS válido.", 400); }
  if (url.protocol !== "https:" || url.username || url.password) throw new SecurityError("Somente endereços HTTPS sem credenciais são permitidos.", 400);
  return url;
}
function matchOrEmpty(value: string, pattern: RegExp, label: string) {
  const text = String(value ?? "").trim();
  if (text && !pattern.test(text)) throw new SecurityError(`${label} inválido.`, 400);
  return text;
}
function safeToken(value: string, max: number) {
  const text = String(value ?? "").trim().slice(0, max);
  if (text && !/^[A-Za-z0-9._=-]+$/.test(text)) throw new SecurityError("Token de verificação inválido.", 400);
  return text;
}
async function hashValue(value: unknown) {
  if (value === undefined) return null;
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(JSON.stringify(value)));
  return Array.from(new Uint8Array(digest), (byte) => byte.toString(16).padStart(2, "0")).join("");
}

export class SecurityError extends Error {
  constructor(message: string, public status: number) { super(message); }
}

export function securityErrorResponse(error: unknown) {
  if (error instanceof SecurityError) return securityJson({ error: error.message }, { status: error.status });
  return securityJson({ error: "Não foi possível concluir a solicitação." }, { status: 500 });
}
