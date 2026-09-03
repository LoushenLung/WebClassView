import { handleAuthCallback } from '@/lib/supabase/auth-callback';

// Keep the former endpoint working for URLs already configured in a provider.
export const GET = handleAuthCallback;
