import { requireAdminApi } from "../../../lib/admin-auth";
import { getDocuments, saveDocument } from "../../../lib/site-data";
import { auditSecurityEvent, enforceRateLimit, parseJsonBody, requireSameOriginMutation, securityErrorResponse } from "../../../lib/security";

const allowedSlugs = new Set(["privacidade", "termos", "contrato-de-adesao", "cookies"]);

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;
    await enforceRateLimit(request, "admin-read", 120);
    return Response.json({ documents: await getDocuments() }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return securityErrorResponse(error); }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (auth.response || !auth.user) return auth.response;
    requireSameOriginMutation(request);
    await enforceRateLimit(request, "admin-write", 30);
    const input = await parseJsonBody<{ slug?: string; title?: string; content?: string; status?: string }>(request);
    const slug = String(input.slug ?? "");
    if (!allowedSlugs.has(slug)) return Response.json({ error: "Documento inválido." }, { status: 400 });
    const title = String(input.title ?? "").trim().slice(0, 160);
    const content = String(input.content ?? "");
    if (!title) return Response.json({ error: "Informe o título." }, { status: 400 });
    if (content.length > 100_000) return Response.json({ error: "Documento excede o limite permitido." }, { status: 413 });
    const document = { slug, title, content, status: input.status === "published" ? "published" as const : "draft" as const };
    await saveDocument(document, auth.user.email);
    await auditSecurityEvent({ actor: auth.user.email, action: document.status === "published" ? "publish" : "save_draft", entity: "legal_document", entityId: slug, request, after: document });
    return Response.json({ ok: true }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return securityErrorResponse(error); }
}
