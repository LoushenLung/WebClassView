'use server';

import { cookies } from 'next/headers';
import { getDb } from '@/lib/db';

export async function getMockSession() {
  const cookieStore = await cookies();
  const userId = cookieStore.get('mock_user_id')?.value || 'usr-admin'; // default to admin for dev ease
  
  const db = getDb();
  const user = db.profiles.find(p => p.id === userId);
  return user || db.profiles[0];
}

export async function switchMockUser(userId: string) {
  const cookieStore = await cookies();
  cookieStore.set('mock_user_id', userId, { path: '/' });
  return { success: true };
}
