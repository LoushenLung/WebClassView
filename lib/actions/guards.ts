/**
 * lib/actions/guards.ts — Auth & role enforcement helpers
 *
 * Every Server Action calls these as its first two steps:
 *   1. `requireAuth()` — asserts a valid session exists
 *   2. `requireRole(user, allowed)` — asserts the user has the required role
 *
 * Req: 1.9, 13.1 | Design §8
 */

"use server";

import { cache } from "react";
import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import type { ActionResult, CurrentUser, UserRole } from "@/lib/types";

/**
 * Gets the current authenticated user including their role from public.users.
 * Wrapped in React cache() to deduplicate supabase.auth.getUser() calls
 * across multiple Server Components in the same render pass.
 *
 * Returns null if no valid session or if no matching profile row exists.
 */
export const getCurrentUser = cache(
  async (): Promise<CurrentUser | null> => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: {
        id: true,
        email: true,
        name: true,
        role: true,
        avatarUrl: true,
      },
    });

    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role as UserRole,
      avatarUrl: profile.avatarUrl,
    };
  }
);

/**
 * Asserts that a valid session exists.
 *
 * Returns `{ ok: true, user }` on success.
 * Returns `{ ok: false, result }` with a localised error message if no session.
 *
 * Usage in a Server Action:
 * ```ts
 * const authResult = await requireAuth();
 * if (!authResult.ok) return authResult.result;
 * const { user } = authResult;
 * ```
 */
export async function requireAuth(): Promise<
  | { ok: true; user: CurrentUser }
  | { ok: false; result: ActionResult<never> }
> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      ok: false,
      result: {
        success: false,
        error: "Sesi tidak valid. Silakan login kembali.",
      },
    };
  }
  return { ok: true, user };
}

/**
 * Asserts that the current user has one of the allowed roles.
 * Must be called AFTER `requireAuth()`.
 *
 * Returns `{ ok: true }` on success.
 * Returns `{ ok: false, result }` with "Akses ditolak." if role is not allowed.
 *
 * Usage in a Server Action:
 * ```ts
 * const roleResult = requireRole(user, ["admin", "bendahara"]);
 * if (!roleResult.ok) return roleResult.result;
 * ```
 */
export function requireRole(
  user: CurrentUser,
  allowed: UserRole[]
): { ok: true } | { ok: false; result: ActionResult<never> } {
  if (!allowed.includes(user.role)) {
    return {
      ok: false,
      result: { success: false, error: "Akses ditolak." },
    };
  }
  return { ok: true };
}
