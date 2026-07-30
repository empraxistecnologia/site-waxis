import { recordEvent } from "../../lib/site-data";
import { enforceRateLimit, parseJsonBody, securityErrorResponse } from "../../lib/security";

const allowedEvents = new Set(["page_view", "cta_click", "booking_opened", "booking_completed"]);

export async function POST(request: Request) {
  try {
    await enforceRateLimit(request, "public-analytics", 60);
    await enforceRateLimit(request, "public-analytics:global", 3_000);
    const body = await parseJsonBody<Record<string, unknown>>(request);
    const eventType = String(body.eventType ?? "");
    const sessionId = String(body.sessionId ?? "").slice(0, 80);
    const path = String(body.path ?? "/").replace(/[\u0000-\u001f\u007f]/g, "").slice(0, 300);
    if (!allowedEvents.has(eventType) || !sessionId) return Response.json({ error: "Evento inválido." }, { status: 400 });
    await recordEvent({
      eventType, sessionId, path,
      label: String(body.label ?? "").slice(0, 160),
      referrer: String(body.referrer ?? "").slice(0, 400),
      source: String(body.source ?? "").slice(0, 120),
      medium: String(body.medium ?? "").slice(0, 120),
      campaign: String(body.campaign ?? "").slice(0, 160),
      device: ["mobile", "tablet", "desktop"].includes(String(body.device)) ? String(body.device) : "desktop",
    });
    return Response.json({ ok: true });
  } catch (error) { return securityErrorResponse(error); }
}
