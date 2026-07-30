import { getSiteConfig } from "../../../lib/site-data";

export async function GET() {
  const config = await getSiteConfig();
  return Response.json(config, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
