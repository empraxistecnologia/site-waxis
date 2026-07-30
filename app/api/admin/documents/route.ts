import { requireAdminApi } from "../../../lib/admin-auth";
import { getDocuments, saveDocument } from "../../../lib/site-data";

const allowedSlugs = new Set(["privacidade", "termos", "contrato-de-adesao", "cookies"]);

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  return Response.json({ documents: await getDocuments() });
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth.response || !auth.user) return auth.response;
  const input = await request.json() as { slug?: string; title?: string; content?: string; status?: string };
  const slug = String(input.slug ?? "");
  if (!allowedSlugs.has(slug)) return Response.json({ error: "Documento inválido." }, { status: 400 });
  if (!String(input.title ?? "").trim()) return Response.json({ error: "Informe o título." }, { status: 400 });
  await saveDocument({
    slug,
    title: String(input.title).trim(),
    content: String(input.content ?? ""),
    status: input.status === "published" ? "published" : "draft",
  }, auth.user.email);
  return Response.json({ ok: true });
}
