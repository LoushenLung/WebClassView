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
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? ""
  );
  return client;
}
