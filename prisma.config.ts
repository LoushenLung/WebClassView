import { defineConfig } from "prisma/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// DATABASE_URL  — pgbouncer Transaction Pooler (port 6543) — runtime queries
// DIRECT_URL    — Direct connection (port 5432) — prisma migrate only
export default defineConfig({
  earlyAccess: true,
  schema: "prisma/schema.prisma",
  migrate: {
    async adapter() {
      // Direct connection required for migrations (pgbouncer not compatible)
      const pool = new Pool({ connectionString: process.env.DIRECT_URL });
      return new PrismaPg(pool);
    },
  },
  async adapter() {
    // Pooled connection for runtime queries
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    return new PrismaPg(pool);
  },
});
