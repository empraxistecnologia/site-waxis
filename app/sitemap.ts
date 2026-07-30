import type { MetadataRoute } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://waxis-site-novo.ruanalves.chatgpt.site";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/privacidade", "/termos", "/contrato-de-adesao", "/cookies"].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path ? "monthly" : "weekly",
    priority: path ? 0.5 : 1,
  }));
}
