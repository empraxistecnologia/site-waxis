import { requireAdminApi } from "../../../lib/admin-auth";
import { getAnalyticsSummary } from "../../../lib/site-data";

export async function GET(request: Request) {
  const auth = await requireAdminApi();
  if (auth.response) return auth.response;
  const days = Number(new URL(request.url).searchParams.get("days") ?? 30);
  return Response.json(await getAnalyticsSummary(days));
}
