'use server';

import { getDb, saveDb, Profile } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function getProfiles() {
  const db = getDb();
  return db.profiles;
}

export async function updateProfile(id: string, data: Partial<Omit<Profile, 'id' | 'role' | 'createdAt'>>) {
  const db = getDb();
  const index = db.profiles.findIndex(p => p.id === id);
  if (index >= 0) {
    db.profiles[index] = {
      ...db.profiles[index],
      ...data,
      birthDate: data.birthDate ? new Date(data.birthDate).toISOString().split('T')[0] : db.profiles[index].birthDate,
    };
    saveDb(db);
    revalidatePath('/profil');
    revalidatePath('/admin/users');
    revalidatePath('/');
  }
  return { success: true };
}

export async function updateProfileRole(id: string, role: 'admin' | 'treasurer' | 'user') {
  const db = getDb();
  const index = db.profiles.findIndex(p => p.id === id);
  if (index >= 0) {
    db.profiles[index].role = role;
    saveDb(db);
    revalidatePath('/profil');
    revalidatePath('/admin/users');
  }
  return { success: true };
}

export async function deleteProfile(id: string) {
  const db = getDb();
  db.profiles = db.profiles.filter(p => p.id !== id);
  saveDb(db);
  revalidatePath('/admin/users');
  return { success: true };
}

export async function createProfile(data: Omit<Profile, 'createdAt'>) {
  const db = getDb();
  const newProfile: Profile = {
    ...data,
    createdAt: new Date().toISOString()
  };
  db.profiles.push(newProfile);
  saveDb(db);
  revalidatePath('/admin/users');
  return { success: true };
}
