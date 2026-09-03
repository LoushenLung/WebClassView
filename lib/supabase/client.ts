/**
 * lib/supabase/client.ts — Browser-side Supabase singleton client
 *
 * Singleton browser client — no service role key, no secrets.
 * Import ONLY in Client Components (files with "use client").
 *
 * Req: 1.1, 1.5 | Design §5
 */

import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseBrowserClient() {
  if (client) return client;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    "";

  client = createBrowserClient(supabaseUrl, supabaseAnonKey);
  return client;
}
