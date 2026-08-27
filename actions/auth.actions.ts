'use server';

/**
 * actions/auth.actions.ts — Auth Server Actions
 *
 * Handles email/password sign-in, Google OAuth sign-in, and sign-out.
 * Req: 1.1, 1.6 | Design §9
 */

import { redirect } from 'next/navigation';
import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/db';
import { formatError } from '@/lib/utils';
import type { ActionResult, UserRole } from '@/lib/types';

// ---------------------------------------------------------------------------
// signInWithEmail
// ---------------------------------------------------------------------------

const signInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

/**
 * Validates credentials with Zod, signs in via Supabase, then resolves the
 * user's role from `public.users` to determine the redirect destination.
 *
 * Returns `{ success: true, data: { redirectTo } }` on success, or
 * `{ success: false, error }` on validation / auth failure.
 */
export async function signInWithEmail(
  input: unknown
): Promise<ActionResult<{ redirectTo: string }>> {
  try {
    const parsed = signInSchema.safeParse(input);
    if (!parsed.success) {
      return {
        success: false,
        error: parsed.error.issues.map((e: { message: string }) => e.message).join(', '),
      };
    }

    const { email, password } = parsed.data;

    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      return {
        success: false,
        error: error
          ? formatError(error)
          : 'Terjadi kesalahan. Coba lagi atau hubungi administrator.',
      };
    }

    // Resolve redirect based on role stored in public.users
    const profile = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { role: true },
    });

    const role = profile?.role as UserRole | undefined;
    const redirectTo =
      role === 'admin' || role === 'bendahara' ? '/dashboard' : '/';

    return { success: true, data: { redirectTo } };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// ---------------------------------------------------------------------------
// signInWithGoogle
// ---------------------------------------------------------------------------

/**
 * Initiates Google OAuth sign-in via Supabase.
 * Returns the OAuth redirect URL which the client should navigate to.
 */
export async function signInWithGoogle(): Promise<
  ActionResult<{ url: string }>
> {
  try {
    const supabase = await createClient();
    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000';

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${appUrl}/auth/callback`,
      },
    });

    if (error || !data.url) {
      return {
        success: false,
        error: error
          ? formatError(error)
          : 'Terjadi kesalahan. Coba lagi atau hubungi administrator.',
      };
    }

    return { success: true, data: { url: data.url } };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// ---------------------------------------------------------------------------
// signOut
// ---------------------------------------------------------------------------

/**
 * Signs the current user out of Supabase, then redirects to /login.
 * The `redirect()` call throws internally — the try/catch only catches
 * genuine errors from `supabase.auth.signOut()`.
 */
export async function signOut(): Promise<void> {
  try {
    const supabase = await createClient();
    await supabase.auth.signOut();
  } catch (error) {
    formatError(error);
  }
  redirect('/login');
}
