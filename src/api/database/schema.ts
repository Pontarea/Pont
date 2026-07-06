import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// Admin password reset tokens
export const adminResetTokens = sqliteTable("admin_reset_tokens", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  token: text("token").notNull().unique(),
  expiresAt: integer("expires_at").notNull(), // unix timestamp
  used: integer("used").notNull().default(0),
});

// Admin config (key-value store for runtime settings)
export const adminConfig = sqliteTable("admin_config", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
});
