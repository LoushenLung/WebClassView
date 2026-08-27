import React from 'react';
import { getProfiles } from '@/actions/profile.actions';
import { getAttendances } from '@/actions/attendance.actions';
import AdminAttendanceCRUD from './_components/AdminAttendanceCRUD';

export default async function AdminAttendancePage() {
  const users = await getProfiles();
  const todayStr = new Date().toISOString().split('T')[0];
  const attendances = await getAttendances(todayStr);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Presensi</h1>
        <p className="text-xs text-slate-400">Pilih tanggal, pantau absensi kelas, dan rekap manual kehadiran siswa (Hadir, Izin, Sakit, Alfa).</p>
      </div>

      <AdminAttendanceCRUD
        initialAttendances={attendances}
        users={users}
      />
    </div>
  );
}
