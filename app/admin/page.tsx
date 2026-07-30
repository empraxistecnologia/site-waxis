import Image from "next/image";
import { chatGPTSignOutPath } from "../chatgpt-auth";
import { requireAdminPage } from "../lib/admin-auth";
import { AdminConsole } from "./admin-console";
import "./admin.css";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { user, authorized } = await requireAdminPage();
  if (!authorized) {
    return (
      <main className="admin-access">
        <Image unoptimized src="/assets/logos/logo-waxis.png" alt="Waxis" width={150} height={40} />
        <span>Acesso administrativo</span>
        <h1>Este e-mail ainda não está autorizado.</h1>
        <p>Você entrou como <strong>{user.email}</strong>. Adicione esse endereço à configuração <code>WAXIS_ADMIN_EMAILS</code> para liberar o painel.</p>
        <a href={chatGPTSignOutPath("/admin")}>Entrar com outro e-mail</a>
      </main>
    );
  }
  return <AdminConsole user={user} signOutPath={chatGPTSignOutPath("/")} />;
}
