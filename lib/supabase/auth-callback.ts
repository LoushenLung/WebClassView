import { NextResponse } from "next/server";
import { getSafePostAuthPath } from "@/lib/auth/redirect";
import { createClient } from "@/lib/supabase/server";

/** Handles both email-confirmation and OAuth PKCE callbacks. */
export async function handleAuthCallback(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");
  const next = getSafePostAuthPath(requestUrl.searchParams.get("next"));

  const loginUrl = new URL("/login", requestUrl.origin);
  loginUrl.searchParams.set("error", "auth_failed");

  if (!code) return NextResponse.redirect(loginUrl);

  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error("[auth/callback] Session exchange failed.");
      return NextResponse.redirect(loginUrl);
    }
  } catch {
    console.error("[auth/callback] Session exchange failed unexpectedly.");
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.redirect(new URL(next, requestUrl.origin));
}
