/**
 * lib/supabase/auth-callback.ts — Shared OAuth callback handler
 *
 * Used by both:
 *   app/api/auth/callback/route.ts  (primary, configured in Supabase dashboard)
 *   app/auth/callback/route.ts      (legacy alias, kept for backwards compat)
 *
 * Flow:
 *   1. If Supabase sends `error` param (user denied, etc.) → /login?error=auth_failed
 *   2. If no `code` present → /login?error=auth_failed
 *   3. Exchange code for session via supabase.auth.exchangeCodeForSession()
 *   4. If exchange fails → /login?error=auth_failed
 *   5. Read role from public.users via Prisma
 *   6. admin / bendahara → /dashboard  |  murid / no row yet → /
 *
 * Req: 1.7, 1.8 | Design §5
 */

import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";

/** Handles both email-confirmation and OAuth PKCE callbacks. */
export async function handleAuthCallback(request: Request) {
  const requestUrl = new URL(request.url);
  const { searchParams, origin } = requestUrl;

  const code = searchParams.get("code");
  const oauthError = searchParams.get("error");

  const loginErrorUrl = new URL("/login", origin);
  loginErrorUrl.searchParams.set("error", "auth_failed");

  // OAuth error from Supabase (user denied, provider error, etc.) — Req 1.8
  if (oauthError) {
    return NextResponse.redirect(loginErrorUrl);
  }

  if (!code) {
    return NextResponse.redirect(loginErrorUrl);
  }

  let userId: string;

  try {
    const supabase = await createClient();
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data.session) {
      console.error("[auth/callback] Session exchange failed.", exchangeError);
      return NextResponse.redirect(loginErrorUrl);
    }

    userId = data.session.user.id;
  } catch {
    console.error("[auth/callback] Session exchange threw unexpectedly.");
    return NextResponse.redirect(loginErrorUrl);
  }

  // Role-based redirect — Req 1.7
  try {
    const dbUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    });

    const role = dbUser?.role;
    if (role === "admin" || role === "bendahara") {
      return NextResponse.redirect(new URL("/dashboard", origin));
    }
  } catch (err) {
    // If DB lookup fails, fall through to the safe default redirect.
    console.error("[auth/callback] Role lookup failed, defaulting to /.", err);
  }

  return NextResponse.redirect(new URL("/", origin));
}
