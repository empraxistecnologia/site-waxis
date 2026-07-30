import { requireAdminApi } from "../../../lib/admin-auth";
import { getAnalyticsSummary } from "../../../lib/site-data";
import { enforceRateLimit, securityErrorResponse } from "../../../lib/security";

export async function GET(request: Request) {
  try {
    const auth = await requireAdminApi();
    if (auth.response) return auth.response;
    await enforceRateLimit(request, "admin-read", 120);
    const days = Number(new URL(request.url).searchParams.get("days") ?? 30);
    return Response.json(await getAnalyticsSummary(Number.isFinite(days) ? days : 30), { headers: { "Cache-Control": "no-store" } });
  } catch (error) { return securityErrorResponse(error); }
}
