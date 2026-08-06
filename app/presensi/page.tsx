import React from 'react';
import { getMockSession } from '@/actions/auth.actions';
import { getAttendances } from '@/actions/announcement.actions';
import AttendanceClient from './_components/AttendanceClient';

export default async function AttendancePage() {
  const currentUser = await getMockSession();
  const todayStr = new Date().toISOString().split('T')[0];
  const allAttendances = await getAttendances(todayStr);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Presensi Harian</h1>
        <p className="text-xs text-slate-400">Lakukan check-in kehadiran kelas harian, scan QR, atau pantau persentase kehadiran Anda.</p>
      </div>

      <AttendanceClient 
        initialHistory={allAttendances} 
        currentUserId={currentUser.id} 
      />
    </div>
  );
}
