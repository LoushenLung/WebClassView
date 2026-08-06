'use server';

import { getDb, saveDb, Announcement, Attendance } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getMockSession } from './auth.actions';

// --- Announcements ---
export async function getAnnouncements() {
  const db = getDb();
  // Pinned first, then newest first
  return [...db.announcements].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });
}

export async function createAnnouncement(data: {
  title: string;
  content: string;
  priorityLevel: 'BIASA' | 'PENTING' | 'URGENT';
  pinned?: boolean;
}) {
  const session = await getMockSession();
  const db = getDb();
  const newAnn: Announcement = {
    id: 'ann-' + Math.random().toString(36).substr(2, 9),
    title: data.title,
    content: data.content,
    priorityLevel: data.priorityLevel,
    pinned: data.pinned ?? false,
    createdById: session.id,
    createdAt: new Date().toISOString()
  };
  db.announcements.push(newAnn);
  saveDb(db);
  revalidatePath('/pengumuman');
  revalidatePath('/admin/pengumuman');
  revalidatePath('/dashboard');
  revalidatePath('/admin/dashboard');
  return { success: true };
}

export async function togglePinAnnouncement(id: string) {
  const db = getDb();
  const ann = db.announcements.find(a => a.id === id);
  if (ann) {
    ann.pinned = !ann.pinned;
    saveDb(db);
    revalidatePath('/pengumuman');
    revalidatePath('/admin/pengumuman');
  }
  return { success: true };
}

export async function deleteAnnouncement(id: string) {
  const db = getDb();
  db.announcements = db.announcements.filter(a => a.id !== id);
  saveDb(db);
  revalidatePath('/pengumuman');
  revalidatePath('/admin/pengumuman');
  return { success: true };
}

// --- Attendance ---
export async function getAttendances(dateStr: string) {
  const db = getDb();
  return db.attendances.filter(a => a.date === dateStr);
}

export async function submitAttendance(userId: string, status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA', dateStr: string) {
  const db = getDb();
  const existing = db.attendances.find(a => a.userId === userId && a.date === dateStr);

  if (existing) {
    existing.status = status;
    existing.checkInTime = status === 'HADIR' ? new Date().toISOString() : undefined;
  } else {
    const newAtt: Attendance = {
      id: 'att-' + Math.random().toString(36).substr(2, 9),
      userId,
      date: dateStr,
      status,
      checkInTime: status === 'HADIR' ? new Date().toISOString() : undefined,
      createdAt: new Date().toISOString()
    };
    db.attendances.push(newAtt);
  }

  saveDb(db);
  revalidatePath('/presensi');
  revalidatePath('/admin/presensi');
  return { success: true };
}

export async function getAttendanceStats() {
  const db = getDb();
  const studentsCount = db.profiles.length;
  if (studentsCount === 0) return { attendanceRate: 0 };
  
  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendances = db.attendances.filter(a => a.date === todayStr);
  const presentCount = todayAttendances.filter(a => a.status === 'HADIR').length;
  
  const attendanceRate = Math.round((presentCount / studentsCount) * 100);
  return {
    studentsCount,
    presentCount,
    attendanceRate
  };
}
