import React from 'react';
import { getAnnouncements } from '@/actions/announcement.actions';
import AdminAnnouncementCRUD from './_components/AdminAnnouncementCRUD';

export default async function AdminAnnouncementsPage() {
  const announcements = await getAnnouncements();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Pengumuman</h1>
        <p className="text-xs text-slate-400">Rilis pengumuman kelas baru, beri tingkat urgensi (Biasa, Penting, Urgent), dan sematkan (pin) info penting.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminAnnouncementCRUD announcements={announcements} />
      </div>
    </div>
  );
}
