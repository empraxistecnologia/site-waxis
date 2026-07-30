import type { SiteConfig } from "./site-data";

export function getBookingUrl(config: SiteConfig) {
  if (config.bookingProvider === "calendly") return config.calendlyLink.trim();
  if (config.bookingProvider === "google") return config.googleCalendarLink.trim();
  const value = config.calLink.trim();
  if (!value) return "";
  return /^https?:\/\//.test(value) ? value : `https://cal.com/${value.replace(/^\/+/, "")}`;
}
