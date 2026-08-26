/**
 * lib/env.ts — Startup environment variable validation
 *
 * Validates that all required environment variables are present at module load
 * time. Imported by lib/db.ts and lib/cloudinary.ts to ensure fail-fast
 * behaviour before attempting any connection.
 *
 * Req: 17.6 | Design §13
 */

const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
] as const;

for (const key of required) {
  const value = process.env[key];
  if (value === undefined || value === "") {
    throw new Error(
      `Missing required environment variable: ${key}. Check .env.local or your Vercel project settings.`
    );
  }
}
