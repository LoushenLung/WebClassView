import React from 'react';
import { getScheduleSlots } from '@/actions/schedule.actions';
import AdminScheduleCRUD from './_components/AdminScheduleCRUD';

export default async function AdminSchedulePage() {
  const slots = await getScheduleSlots();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Jadwal Pelajaran</h1>
        <p className="text-xs text-slate-400">Tambah, edit, dan hapus slot jadwal pelajaran harian kelas.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminScheduleCRUD slots={slots} />
      </div>
    </div>
  );
}
