import { requireAdminApi } from "../../../lib/admin-auth";
import { getSiteConfig, saveSiteConfig, type SiteConfig } from "../../../lib/site-data";
import { auditSecurityEvent, enforceRateLimit, parseJsonBody, requireSameOriginMutation, sanitizeSiteConfig, securityErrorResponse } from "../../../lib/security";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;
    await enforceRateLimit(request, "admin-read", 120);
    return Response.json(await getSiteConfig(), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return securityErrorResponse(error); }
}

export async function PUT(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (auth.response || !auth.user) return auth.response;
    requireSameOriginMutation(request);
    await enforceRateLimit(request, "admin-write", 30);
    const input = await parseJsonBody<Partial<SiteConfig>>(request);
    const before = await getSiteConfig();
    const config = sanitizeSiteConfig(input);
    await saveSiteConfig(config, auth.user.email);
    await auditSecurityEvent({ actor: auth.user.email, action: "update", entity: "site_config", entityId: "site_config", request, before, after: config });
    return Response.json({ ok: true, config }, { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return securityErrorResponse(error); }
}
