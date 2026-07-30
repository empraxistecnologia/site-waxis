import { requireAdminApi } from "../../../lib/admin-auth";
import { defaultSiteConfig, getSiteConfig, saveSiteConfig, type SiteConfig } from "../../../lib/site-data";

export async function GET() {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  return Response.json(await getSiteConfig());
}

export async function PUT(request: Request) {
  const auth = await requireAdminApi();
  if (auth.response || !auth.user) return auth.response;
  const input = await request.json() as Partial<SiteConfig>;
  const config: SiteConfig = {
    ...defaultSiteConfig,
    ...input,
    allowAiSearch: Boolean(input.allowAiSearch),
    allowAiTraining: Boolean(input.allowAiTraining),
  };
  await saveSiteConfig(config, auth.user.email);
  return Response.json({ ok: true, config });
}
