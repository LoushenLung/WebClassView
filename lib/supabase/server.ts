/**
 * lib/supabase/server.ts — Server-side Supabase client
 *
 * Used in Server Components AND Server Actions.
 * Creates a new client per request (cookies are request-scoped).
 *
 * Req: 1.1, 1.4, 1.5 | Design §5
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL ?? "",
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? "",
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — safe to ignore.
            // The middleware handles token refresh.
          }
        },
      },
    }
  );
}
