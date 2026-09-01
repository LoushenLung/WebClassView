/**
 * prisma.config.ts — Prisma CLI configuration (Prisma v7+)
 *
 * Connection URLs are no longer defined in schema.prisma in Prisma v7.
 * They are configured here instead:
 *
 * - `datasource.url` is used by the Prisma CLI (migrate dev, db push, introspect).
 *   We point it to DIRECT_URL (port 5432) because pgbouncer (port 6543) is not
 *   compatible with Prisma Migrate — it does not support advisory locks.
 *
 * - The runtime pooler URL (DATABASE_URL, port 6543) is passed to PrismaClient
 *   via the driver adapter in lib/db.ts.
 *
 * Req: 3.7 | Design §3 (Free-tier note: use DIRECT_URL for migrate)
 */

import "dotenv/config";
import { defineConfig } from "prisma/config";

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    // DIRECT_URL = port 5432, bypasses pgbouncer — required for prisma migrate
    // Fall back to DATABASE_URL or dummy URL during build step (prisma generate) if DIRECT_URL is missing
    url:
      process.env.DIRECT_URL ||
      process.env.DATABASE_URL ||
      "postgresql://postgres:postgres@localhost:5432/postgres",
  },
});
