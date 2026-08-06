import React from 'react';
import { getSchedules, getTasks } from '@/actions/schedule.actions';
import AdminScheduleCRUD from './_components/AdminScheduleCRUD';

export default async function AdminSchedulePage() {
  const schedules = await getSchedules();
  const tasks = await getTasks();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Jadwal & Tugas</h1>
        <p className="text-xs text-slate-400">Tambah, edit, dan hapus jadwal pelajaran harian beserta penugasan kelas.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminScheduleCRUD schedules={schedules} tasks={tasks} />
      </div>
    </div>
  );
}
