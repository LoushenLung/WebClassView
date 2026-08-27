'use client';

import React, { useState, useTransition } from 'react';
import type { Attendance, User } from '@/lib/types';
import { recordAttendance } from '@/actions/attendance.actions';
import { Calendar } from 'lucide-react';

interface AdminAttendanceCRUDProps {
  initialAttendances: Attendance[];
  users: User[];
}

export default function AdminAttendanceCRUD({
  initialAttendances,
  users,
}: AdminAttendanceCRUDProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);

  const getStudentStatus = (userId: string): 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA' => {
    const att = attendances.find(
      (a) => a.studentId === userId && new Date(a.date).toISOString().split('T')[0] === selectedDate
    );
    return (att?.status as 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA') ?? 'ALFA';
  };

  const handleStatusChange = (
    userId: string,
    newStatus: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA'
  ) => {
    startTransition(async () => {
      await recordAttendance({ studentId: userId, date: selectedDate, status: newStatus });

      // Optimistic local update
      setAttendances((prev) => {
        const existingIdx = prev.findIndex(
          (a) => a.studentId === userId && new Date(a.date).toISOString().split('T')[0] === selectedDate
        );
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            status: newStatus,
            checkInTime: newStatus === 'HADIR' ? new Date() : null,
          };
          return updated;
        }
        return [
          ...prev,
          {
            id: 'att-local-' + Math.random(),
            studentId: userId,
            date: new Date(selectedDate),
            status: newStatus,
            checkInTime: newStatus === 'HADIR' ? new Date() : null,
            createdAt: new Date(),
            updatedAt: new Date(),
          },
        ];
      });
    });
  };

  const presentCount = attendances.filter(
    (a) => new Date(a.date).toISOString().split('T')[0] === selectedDate && a.status === 'HADIR'
  ).length;
  const permissionCount = attendances.filter(
    (a) =>
      new Date(a.date).toISOString().split('T')[0] === selectedDate &&
      (a.status === 'IZIN' || a.status === 'SAKIT')
  ).length;
  const absentCount = users.length - presentCount - permissionCount;

  return (
    <div className="space-y-6">
      {/* Date selector & Quick Stats */}
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Calendar className="h-5 w-5 text-indigo-500" />
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs font-bold dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-4 text-xs font-bold">
          <div className="rounded-xl bg-emerald-500/10 text-emerald-500 px-3 py-2 border border-emerald-500/20">
            Hadir: {presentCount}
          </div>
          <div className="rounded-xl bg-blue-500/10 text-blue-500 px-3 py-2 border border-blue-500/20">
            Izin/Sakit: {permissionCount}
          </div>
          <div className="rounded-xl bg-rose-500/10 text-rose-500 px-3 py-2 border border-rose-500/20">
            Alfa: {Math.max(0, absentCount)}
          </div>
        </div>
      </div>

      {/* Recap Table */}
      <div className="overflow-x-auto rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white mb-4">
          Status Presensi Kelas (
          {new Date(selectedDate).toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          })}
          )
        </h3>

        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Nama</th>
                <th className="p-3 font-bold text-slate-400">Email</th>
                <th className="p-3 font-bold text-slate-400">Role</th>
                <th className="p-3 font-bold text-slate-400 text-center">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {users.map((user) => {
                const status = getStudentStatus(user.id);
                return (
                  <tr key={user.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{user.name}</td>
                    <td className="p-3 text-slate-500">{user.email}</td>
                    <td className="p-3 text-slate-500 capitalize">{user.role}</td>
                    <td className="p-3 text-center">
                      <select
                        value={status}
                        onChange={(e) =>
                          handleStatusChange(
                            user.id,
                            e.target.value as 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA'
                          )
                        }
                        disabled={isPending}
                        className={`rounded-lg border px-2 py-1.5 text-[10px] font-bold focus:outline-none cursor-pointer disabled:opacity-50 ${
                          status === 'HADIR'
                            ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25'
                            : status === 'IZIN'
                            ? 'bg-blue-500/10 text-blue-500 border-blue-500/25'
                            : status === 'SAKIT'
                            ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                            : 'bg-rose-500/10 text-rose-500 border-rose-500/25'
                        }`}
                      >
                        <option value="HADIR">Hadir</option>
                        <option value="IZIN">Izin</option>
                        <option value="SAKIT">Sakit</option>
                        <option value="ALFA">Alfa</option>
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
