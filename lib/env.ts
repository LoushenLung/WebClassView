/**
 * lib/env.ts — Startup environment variable validation
 *
 * Validates that all required environment variables are present at module load
 * time. Imported by lib/db.ts and lib/cloudinary.ts to ensure fail-fast
 * behaviour before attempting any connection.
 *
 * Req: 17.6 | Design §13
 */

const required = ["NEXT_PUBLIC_SUPABASE_URL", "DATABASE_URL"] as const;

for (const key of required) {
  const value = process.env[key];
  if (value === undefined || value === "") {
    const msg = `Missing required environment variable: ${key}. Check .env.local or your Vercel project settings.`;
    if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL || process.env.CI) {
      console.warn(`[env] ${msg}`);
    } else {
      throw new Error(msg);
    }
  }
}

if (
  !process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
) {
  const msg =
    "Missing required Supabase public key. Set NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY or NEXT_PUBLIC_SUPABASE_ANON_KEY.";
  if (process.env.NEXT_PHASE === "phase-production-build" || process.env.VERCEL || process.env.CI) {
    console.warn(`[env] ${msg}`);
  } else {
    throw new Error(msg);
  }
}
