'use server';

import { getDb, saveDb, Schedule, Task, Material, TaskProgress } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getMockSession } from './auth.actions';

// --- Schedules ---
export async function getSchedules() {
  const db = getDb();
  return db.schedules;
}

export async function createSchedule(data: Omit<Schedule, 'id'>) {
  const db = getDb();
  const newSchedule: Schedule = {
    id: 'sched-' + Math.random().toString(36).substr(2, 9),
    ...data
  };
  db.schedules.push(newSchedule);
  saveDb(db);
  revalidatePath('/jadwal');
  revalidatePath('/admin/jadwal');
  return { success: true };
}

export async function deleteSchedule(id: string) {
  const db = getDb();
  db.schedules = db.schedules.filter(s => s.id !== id);
  saveDb(db);
  revalidatePath('/jadwal');
  revalidatePath('/admin/jadwal');
  return { success: true };
}

// --- Tasks ---
export async function getTasks() {
  const db = getDb();
  return db.tasks;
}

export async function getTaskProgresses(userId: string) {
  const db = getDb();
  return db.taskProgresses.filter(p => p.userId === userId);
}

export async function createTask(data: Omit<Task, 'id' | 'createdAt' | 'createdById'>) {
  const session = await getMockSession();
  const db = getDb();
  const newTask: Task = {
    id: 'task-' + Math.random().toString(36).substr(2, 9),
    ...data,
    createdById: session.id,
    createdAt: new Date().toISOString()
  };
  db.tasks.push(newTask);
  saveDb(db);
  revalidatePath('/jadwal');
  revalidatePath('/admin/jadwal');
  return { success: true };
}

export async function deleteTask(id: string) {
  const db = getDb();
  db.tasks = db.tasks.filter(t => t.id !== id);
  db.taskProgresses = db.taskProgresses.filter(p => p.taskId !== id);
  saveDb(db);
  revalidatePath('/jadwal');
  revalidatePath('/admin/jadwal');
  return { success: true };
}

export async function updateTaskProgress(taskId: string, status: 'TODO' | 'IN_PROGRESS' | 'DONE') {
  const session = await getMockSession();
  const db = getDb();
  const existing = db.taskProgresses.find(p => p.taskId === taskId && p.userId === session.id);
  
  if (existing) {
    existing.status = status;
    existing.updatedAt = new Date().toISOString();
  } else {
    const newProgress: TaskProgress = {
      id: 'prog-' + Math.random().toString(36).substr(2, 9),
      taskId,
      userId: session.id,
      status,
      updatedAt: new Date().toISOString()
    };
    db.taskProgresses.push(newProgress);
  }
  
  saveDb(db);
  revalidatePath('/jadwal');
  return { success: true };
}

// --- Materials ---
export async function getMaterials() {
  const db = getDb();
  return db.materials;
}

export async function createMaterial(data: Omit<Material, 'id' | 'createdAt' | 'uploaderName'>) {
  const session = await getMockSession();
  const db = getDb();
  const newMaterial: Material = {
    id: 'mat-' + Math.random().toString(36).substr(2, 9),
    ...data,
    uploaderName: session.fullName,
    createdAt: new Date().toISOString()
  };
  db.materials.push(newMaterial);
  saveDb(db);
  revalidatePath('/materi');
  revalidatePath('/admin/materi');
  return { success: true };
}

export async function deleteMaterial(id: string) {
  const db = getDb();
  db.materials = db.materials.filter(m => m.id !== id);
  saveDb(db);
  revalidatePath('/materi');
  revalidatePath('/admin/materi');
  return { success: true };
}
