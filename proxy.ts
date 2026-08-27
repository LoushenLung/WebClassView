/**
 * proxy.ts — Root route-protection proxy (Next.js 16 convention)
 *
 * Next.js 16 renamed middleware.ts → proxy.ts. This file is the canonical
 * entry point. It delegates to updateSession() in lib/supabase/middleware.ts
 * which:
 * - Refreshes the Supabase session cookie on every request
 * - Redirects unauthenticated users to /login
 * - Skips redirect for public routes: /login, /auth/**, /api/ping
 *
 * Req: 1.4 | Design §5
 */

import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function proxy(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
