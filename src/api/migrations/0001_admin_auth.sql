-- Migration: Admin authentication tables
-- Created: 2026-03-06

CREATE TABLE IF NOT EXISTS `admin_reset_tokens` (
  `id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
  `token` text NOT NULL UNIQUE,
  `expires_at` integer NOT NULL,
  `used` integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS `admin_config` (
  `key` text PRIMARY KEY NOT NULL,
  `value` text NOT NULL
);

-- Set default admin password (can be changed via reset flow)
INSERT OR IGNORE INTO `admin_config` (`key`, `value`) VALUES ('admin_password', 'yachting26!');
