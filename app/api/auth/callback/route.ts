import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { prisma } from '@/lib/db';
import type { UserRole } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const error = searchParams.get('error');

  if (error || !code) {
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }

  try {
    const supabase = await createClient();
    const { data, error: exchangeError } =
      await supabase.auth.exchangeCodeForSession(code);

    if (exchangeError || !data.user) {
      console.error('OAuth code exchange failed:', exchangeError);
      return NextResponse.redirect(`${origin}/login?error=auth_failed`);
    }

    // Resolve user role from public.users table
    const profile = await prisma.user.findUnique({
      where: { id: data.user.id },
      select: { role: true },
    });

    const role = profile?.role as UserRole | undefined;
    const redirectTo =
      role === 'admin' || role === 'bendahara' ? '/admin/dashboard' : '/';

    return NextResponse.redirect(`${origin}${redirectTo}`);
  } catch (err) {
    console.error('Auth callback exception:', err);
    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
  }
}
