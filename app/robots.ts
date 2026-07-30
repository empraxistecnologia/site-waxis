import type { MetadataRoute } from "next";
import { getSiteConfig } from "./lib/site-data";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waxis-site-novo.ruanalves.chatgpt.site";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const config = await getSiteConfig();
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/admin", "/api"] },
      { userAgent: "OAI-SearchBot", allow: config.allowAiSearch ? "/" : undefined, disallow: config.allowAiSearch ? ["/admin", "/api"] : "/" },
      { userAgent: "GPTBot", allow: config.allowAiTraining ? "/" : undefined, disallow: config.allowAiTraining ? ["/admin", "/api"] : "/" },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
