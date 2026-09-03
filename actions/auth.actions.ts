'use server';

/** Authentication actions that persist sessions only in Supabase SSR cookies. */

import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { getSafePostAuthPath } from '@/lib/auth/redirect';
import { createClient } from '@/lib/supabase/server';
import type { ActionResult } from '@/lib/types';

// ---------------------------------------------------------------------------
// signInWithEmail
// ---------------------------------------------------------------------------

const emailSchema = z
  .string()
  .trim()
  .min(1, 'Email wajib diisi.')
  .email('Masukkan alamat email yang valid.');

const passwordSchema = z.string().min(8, 'Kata sandi minimal 8 karakter.');

const signInSchema = z.object({
  email: emailSchema,
  password: passwordSchema,
  next: z.string().optional(),
});

const signUpSchema = z
  .object({
    name: z
      .string()
      .trim()
      .min(2, 'Nama minimal 2 karakter.')
      .max(100, 'Nama maksimal 100 karakter.'),
    email: emailSchema,
    password: passwordSchema,
    passwordConfirmation: z.string().min(1, 'Konfirmasi kata sandi wajib diisi.'),
    next: z.string().optional(),
  })
  .refine((value) => value.password === value.passwordConfirmation, {
    message: 'Konfirmasi kata sandi tidak sama.',
    path: ['passwordConfirmation'],
  });

const nextSchema = z.object({ next: z.string().optional() });

type SignUpSuccess =
  | { status: 'confirmation_required' }
  | { status: 'signed_in'; redirectTo: string };

function getValidationError(result: z.ZodSafeParseError<unknown>) {
  return result.error.issues[0]?.message ?? 'Data yang dikirim tidak valid.';
}

function getAppOrigin() {
  const configuredUrl =
    process.env.NEXT_PUBLIC_APP_URL ??
    process.env.NEXT_PUBLIC_VERCEL_URL ??
    'http://localhost:3000';
  const urlWithProtocol = configuredUrl.startsWith('http')
    ? configuredUrl
    : `https://${configuredUrl}`;

  try {
    return new URL(urlWithProtocol).origin;
  } catch {
    return 'http://localhost:3000';
  }
}

function getCallbackUrl(next?: string) {
  const callbackUrl = new URL('/auth/callback', getAppOrigin());
  const safeNext = getSafePostAuthPath(next);

  if (safeNext !== '/') callbackUrl.searchParams.set('next', safeNext);

  return callbackUrl.toString();
}

export async function signInWithEmail(
  input: unknown
): Promise<ActionResult<{ redirectTo: string }>> {
  const parsed = signInSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: getValidationError(parsed) };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: parsed.data.email,
      password: parsed.data.password,
    });

    if (error || !data.user) {
      if (error?.code === 'email_not_confirmed') {
        return {
          success: false,
          error: 'Periksa email Anda dan konfirmasi akun sebelum masuk.',
        };
      }

      // This deliberately covers both an unknown email and a wrong password.
      return {
        success: false,
        error: 'Email atau kata sandi tidak sesuai.',
      };
    }

    return {
      success: true,
      data: { redirectTo: getSafePostAuthPath(parsed.data.next) },
    };
  } catch {
    console.error('[auth/sign-in] Sign-in failed unexpectedly.');
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

// ---------------------------------------------------------------------------
// signUpWithEmail
// ---------------------------------------------------------------------------

export async function signUpWithEmail(
  input: unknown
): Promise<ActionResult<SignUpSuccess>> {
  const parsed = signUpSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: getValidationError(parsed) };
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email: parsed.data.email,
      password: parsed.data.password,
      options: {
        data: { name: parsed.data.name },
        emailRedirectTo: getCallbackUrl(parsed.data.next),
      },
    });

    if (error || !data.user) {
      // Do not reveal whether an address already has an account.
      return {
        success: false,
        error: 'Pendaftaran belum dapat diproses. Silakan coba lagi.',
      };
    }

    if (data.session) {
      return {
        success: true,
        data: {
          status: 'signed_in',
          redirectTo: getSafePostAuthPath(parsed.data.next),
        },
      };
    }

    // Hosted projects require email confirmation by default. This response is
    // intentionally the same for a duplicate address when Supabase masks it.
    return { success: true, data: { status: 'confirmation_required' } };
  } catch {
    console.error('[auth/sign-up] Sign-up failed unexpectedly.');
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

// ---------------------------------------------------------------------------
// signInWithGoogle
// ---------------------------------------------------------------------------

/** Starts the Google OAuth PKCE flow. */
export async function signInWithGoogle(
  input: unknown = {}
): Promise<ActionResult<{ url: string }>> {
  const parsed = nextSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: getValidationError(parsed) };
  }

  try {
    const supabase = await createClient();

    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: getCallbackUrl(parsed.data.next),
      },
    });

    if (error || !data.url) {
      return {
        success: false,
        error: 'Tidak dapat menghubungkan ke Google. Silakan coba lagi.',
      };
    }

    return { success: true, data: { url: data.url } };
  } catch {
    console.error('[auth/google] OAuth initiation failed unexpectedly.');
    return { success: false, error: 'Terjadi kesalahan. Silakan coba lagi.' };
  }
}

// ---------------------------------------------------------------------------
// signOut
// ---------------------------------------------------------------------------

/** Clears the Supabase SSR session cookies for the current browser. */
export async function signOut(): Promise<ActionResult<null>> {
  try {
    const supabase = await createClient();
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('[auth/sign-out] Sign-out failed.');
      return { success: false, error: 'Tidak dapat keluar. Silakan coba lagi.' };
    }

    revalidatePath('/', 'layout');
    return { success: true, data: null };
  } catch {
    console.error('[auth/sign-out] Sign-out failed unexpectedly.');
    return { success: false, error: 'Tidak dapat keluar. Silakan coba lagi.' };
  }
}
