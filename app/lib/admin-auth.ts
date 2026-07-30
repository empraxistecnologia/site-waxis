import { env } from "cloudflare:workers";
import { getChatGPTUser, requireChatGPTUser } from "../chatgpt-auth";

const fallbackAdmin = "empraxisassessoria@gmail.com";

function allowedEmails() {
  const configured = (env as unknown as { WAXIS_ADMIN_EMAILS?: string }).WAXIS_ADMIN_EMAILS;
  return (configured || fallbackAdmin).split(",").map((email) => email.trim().toLowerCase()).filter(Boolean);
}

export function isAdminEmail(email: string) {
  return allowedEmails().includes(email.toLowerCase());
}

export async function requireAdminPage() {
  const user = await requireChatGPTUser("/admin");
  return { user, authorized: isAdminEmail(user.email) };
}

export async function requireAdminApi() {
  const user = await getChatGPTUser();
  if (!user) return { response: Response.json({ error: "Faça login para continuar." }, { status: 401 }), user: null };
  if (!isAdminEmail(user.email)) return { response: Response.json({ error: "Este e-mail não possui acesso ao painel." }, { status: 403 }), user };
  return { response: null, user };
}
