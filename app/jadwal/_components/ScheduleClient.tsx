'use client';

import React, { useState } from 'react';
import type { Schedule } from '@/lib/types';
import { Calendar, Clock } from 'lucide-react';

const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const;

interface ScheduleClientProps {
  slots: Schedule[];
}

export default function ScheduleClient({ slots }: ScheduleClientProps) {
  const [selectedDay, setSelectedDay] = useState<number>(() => {
    // Default to today's weekday (Mon=0 … Fri=4), clamp to 0–4
    const jsDay = new Date().getDay(); // 0=Sun, 1=Mon … 6=Sat
    const mapped = jsDay === 0 ? 0 : Math.min(jsDay - 1, 4);
    return mapped;
  });

  const daySlots = slots
    .filter((s) => s.dayOfWeek === selectedDay)
    .sort((a, b) => a.periodOrder - b.periodOrder);

  return (
    <div className="space-y-6">
      {/* Day tabs */}
      <div className="flex gap-1.5 bg-slate-100/50 p-1 rounded-2xl dark:bg-slate-900 w-fit flex-wrap">
        {DAY_NAMES.map((name, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedDay(idx)}
            className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
              selectedDay === idx
                ? 'bg-indigo-600 text-white shadow'
                : 'hover:bg-slate-200 text-slate-700 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            {name}
          </button>
        ))}
      </div>

      {/* Slots */}
      <div className="space-y-3">
        {daySlots.length > 0 ? (
          daySlots.map((slot) => (
            <div
              key={slot.id}
              className={`rounded-2xl border p-4 text-sm ${
                slot.isBreak
                  ? 'border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/20'
                  : 'border-indigo-100/50 bg-white dark:border-indigo-900/30 dark:bg-slate-900/50'
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="shrink-0 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:text-indigo-400 font-mono">
                    {slot.periodLabel}
                  </span>
                  <div className="min-w-0">
                    {slot.isBreak ? (
                      <span className="text-slate-400 italic text-xs">Istirahat</span>
                    ) : (
                      <>
                        <h3 className="font-bold text-slate-950 dark:text-white truncate">
                          {slot.subject ?? '-'}
                        </h3>
                        <p className="text-xs text-slate-500 mt-0.5">
                          {slot.teacher && <span>{slot.teacher}</span>}
                          {slot.teacher && slot.room && <span> · </span>}
                          {slot.room && <span>{slot.room}</span>}
                        </p>
                      </>
                    )}
                  </div>
                </div>
                <span className="shrink-0 text-[10px] font-bold text-slate-400">
                  Ke-{slot.periodOrder}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-32 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
            <Calendar className="h-8 w-8 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Tidak ada jadwal untuk hari ini</p>
          </div>
        )}
      </div>
    </div>
  );
}
