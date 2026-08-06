import React from 'react';
import { getSchedules, getTasks, getTaskProgresses } from '@/actions/schedule.actions';
import { getMockSession } from '@/actions/auth.actions';
import ScheduleClient from './_components/ScheduleClient';

export default async function SchedulePage() {
  const schedules = await getSchedules();
  const tasks = await getTasks();
  const currentUser = await getMockSession();
  const progresses = await getTaskProgresses(currentUser.id);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Akademik & Tugas</h1>
        <p className="text-xs text-slate-400">Jadwal pelajaran dinamis kelas RPL 1 beserta daftar tugas dengan deadline yang terkoordinasi.</p>
      </div>

      <ScheduleClient 
        schedules={schedules} 
        tasks={tasks} 
        initialProgresses={progresses} 
        currentUserId={currentUser.id} 
      />
    </div>
  );
}
