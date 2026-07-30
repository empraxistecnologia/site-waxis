import { sql } from "drizzle-orm";
import { index, integer, primaryKey, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const siteSettings = sqliteTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedBy: text("updated_by"),
});

export const legalDocuments = sqliteTable("legal_documents", {
  slug: text("slug").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull().default(""),
  status: text("status").notNull().default("draft"),
  updatedAt: text("updated_at").notNull().default(sql`CURRENT_TIMESTAMP`),
  publishedAt: text("published_at"),
  updatedBy: text("updated_by"),
});

export const analyticsEvents = sqliteTable("analytics_events", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  sessionId: text("session_id").notNull(),
  eventType: text("event_type").notNull(),
  path: text("path").notNull(),
  label: text("label"),
  referrer: text("referrer"),
  source: text("source"),
  medium: text("medium"),
  campaign: text("campaign"),
  device: text("device"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [
  index("analytics_created_at_idx").on(table.createdAt),
  index("analytics_event_type_idx").on(table.eventType),
  index("analytics_session_idx").on(table.sessionId),
]);

export const securityRateLimits = sqliteTable("security_rate_limits", {
  key: text("key").notNull(),
  windowStart: integer("window_start").notNull(),
  count: integer("count").notNull().default(0),
}, (table) => [primaryKey({ columns: [table.key, table.windowStart] })]);

export const securityAuditLog = sqliteTable("security_audit_log", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  actor: text("actor").notNull(),
  action: text("action").notNull(),
  entity: text("entity").notNull(),
  entityId: text("entity_id").notNull(),
  beforeHash: text("before_hash"),
  afterHash: text("after_hash"),
  ipHash: text("ip_hash"),
  createdAt: text("created_at").notNull().default(sql`CURRENT_TIMESTAMP`),
}, (table) => [index("security_audit_created_idx").on(table.createdAt)]);
