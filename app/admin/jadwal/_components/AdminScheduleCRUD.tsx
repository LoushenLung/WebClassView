'use client';

import React, { useState, useTransition } from 'react';
import type { Schedule } from '@/lib/types';
import { upsertScheduleSlot, deleteScheduleSlot } from '@/actions/schedule.actions';
import { Plus, Trash, Calendar } from 'lucide-react';

const DAY_NAMES = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat'] as const;

interface AdminScheduleCRUDProps {
  slots: Schedule[];
}

export default function AdminScheduleCRUD({ slots }: AdminScheduleCRUDProps) {
  const [isPending, startTransition] = useTransition();

  const [dayOfWeek, setDayOfWeek] = useState(0);
  const [periodOrder, setPeriodOrder] = useState(1);
  const [periodLabel, setPeriodLabel] = useState('');
  const [subject, setSubject] = useState('');
  const [teacher, setTeacher] = useState('');
  const [room, setRoom] = useState('');
  const [isBreak, setIsBreak] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodLabel || (!isBreak && !subject)) return;

    startTransition(async () => {
      await upsertScheduleSlot({
        dayOfWeek,
        periodOrder,
        periodLabel,
        subject: subject || undefined,
        teacher: teacher || undefined,
        room: room || undefined,
        isBreak,
      });
      setPeriodLabel('');
      setSubject('');
      setTeacher('');
      setRoom('');
      setIsBreak(false);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus slot jadwal ini?')) {
      startTransition(async () => {
        await deleteScheduleSlot(id);
      });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Form */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
          <Plus className="h-4 w-4 text-indigo-500" />
          Tambah / Update Slot Jadwal
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Hari</label>
              <select
                value={dayOfWeek}
                onChange={(e) => setDayOfWeek(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              >
                {DAY_NAMES.map((name, idx) => (
                  <option key={idx} value={idx}>{name}</option>
                ))}
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Urutan Periode (1–8)</label>
              <input
                type="number"
                min={1}
                max={8}
                value={periodOrder}
                onChange={(e) => setPeriodOrder(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                required
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">Label Waktu</label>
            <input
              type="text"
              value={periodLabel}
              onChange={(e) => setPeriodLabel(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Misal: 07:30–09:00"
              required
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isBreak"
              checked={isBreak}
              onChange={(e) => setIsBreak(e.target.checked)}
              className="rounded text-indigo-600"
            />
            <label htmlFor="isBreak" className="font-bold text-slate-400 cursor-pointer">Slot Istirahat</label>
          </div>

          {!isBreak && (
            <>
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Mata Pelajaran</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Basis Data"
                  required={!isBreak}
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Guru / Pengajar</label>
                <input
                  type="text"
                  value={teacher}
                  onChange={(e) => setTeacher(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Ibu Larasati"
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Ruangan</label>
                <input
                  type="text"
                  value={room}
                  onChange={(e) => setRoom(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Lab Komputer 3"
                />
              </div>
            </>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            Simpan Jadwal
          </button>
        </form>
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
          <Calendar className="h-4 w-4 text-indigo-500" />
          Daftar Slot Jadwal
        </h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Hari</th>
                <th className="p-3 font-bold text-slate-400">Waktu</th>
                <th className="p-3 font-bold text-slate-400">Mata Pelajaran</th>
                <th className="p-3 font-bold text-slate-400">Guru</th>
                <th className="p-3 font-bold text-slate-400">Ruang</th>
                <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {slots.length > 0 ? (
                slots.map((slot) => (
                  <tr key={slot.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{DAY_NAMES[slot.dayOfWeek] ?? slot.dayOfWeek}</td>
                    <td className="p-3 font-mono">{slot.periodLabel}</td>
                    <td className="p-3 font-semibold">
                      {slot.isBreak ? (
                        <span className="text-slate-400 italic">Istirahat</span>
                      ) : (
                        slot.subject ?? '-'
                      )}
                    </td>
                    <td className="p-3 text-slate-500">{slot.teacher ?? '-'}</td>
                    <td className="p-3 text-slate-500">{slot.room ?? '-'}</td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(slot.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer disabled:opacity-50"
                      >
                        <Trash className="h-3.5 w-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-6 text-center text-slate-400">
                    Belum ada jadwal ditambahkan
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
