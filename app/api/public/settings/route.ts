import { getSiteConfig } from "../../../lib/site-data";

export async function GET() {
  const config = await getSiteConfig();
  return Response.json({
    bookingProvider: config.bookingProvider,
    calLink: config.calLink,
    calendlyLink: config.calendlyLink,
    googleCalendarLink: config.googleCalendarLink,
    testUrl: config.testUrl,
    contactEmail: config.contactEmail,
    whatsapp: config.whatsapp,
    facebookUrl: config.facebookUrl,
    instagramUrl: config.instagramUrl,
    linkedinUrl: config.linkedinUrl,
    xUrl: config.xUrl,
  }, { headers: { "Cache-Control": "public, max-age=60, stale-while-revalidate=300" } });
}
