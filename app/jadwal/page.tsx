import React from 'react';
import { getScheduleSlots } from '@/actions/schedule.actions';
import ScheduleClient from './_components/ScheduleClient';

export default async function SchedulePage() {
  const slots = await getScheduleSlots();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Jadwal Pelajaran</h1>
        <p className="text-xs text-slate-400">Jadwal pelajaran harian kelas RPL 1.</p>
      </div>
      <ScheduleClient slots={slots} />
    </div>
  );
}
