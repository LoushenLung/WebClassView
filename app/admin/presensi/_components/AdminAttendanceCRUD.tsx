'use client';

import React, { useState, useTransition } from 'react';
import { Attendance, Profile } from '@/lib/db';
import { submitAttendance } from '@/actions/announcement.actions';
import { Calendar, CheckCircle2, User, RefreshCw } from 'lucide-react';

interface AdminAttendanceCRUDProps {
  initialAttendances: Attendance[];
  profiles: Profile[];
}

export default function AdminAttendanceCRUD({ 
  initialAttendances, 
  profiles 
}: AdminAttendanceCRUDProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [attendances, setAttendances] = useState<Attendance[]>(initialAttendances);

  const getStudentStatus = (userId: string) => {
    const att = attendances.find(a => a.userId === userId && a.date === selectedDate);
    return att ? att.status : 'ALFA'; // default to ALFA if not set
  };

  const handleStatusChange = (userId: string, newStatus: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA') => {
    startTransition(async () => {
      await submitAttendance(userId, newStatus, selectedDate);
      
      // Update local state instantly
      setAttendances(prev => {
        const existingIdx = prev.findIndex(a => a.userId === userId && a.date === selectedDate);
        if (existingIdx >= 0) {
          const updated = [...prev];
          updated[existingIdx] = {
            ...updated[existingIdx],
            status: newStatus,
            checkInTime: newStatus === 'HADIR' ? new Date().toISOString() : undefined
          };
          return updated;
        } else {
          return [
            ...prev,
            {
              id: 'att-local-' + Math.random(),
              userId,
              date: selectedDate,
              status: newStatus,
              checkInTime: newStatus === 'HADIR' ? new Date().toISOString() : undefined,
              createdAt: new Date().toISOString()
            }
          ];
        }
      });
    });
  };

  // Quick Stats
  const presentCount = attendances.filter(a => a.date === selectedDate && a.status === 'HADIR').length;
  const permissionCount = attendances.filter(a => a.date === selectedDate && (a.status === 'IZIN' || a.status === 'SAKIT')).length;
  const absentCount = profiles.length - presentCount - permissionCount;

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

        {/* Stats */}
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
          Status Presensi Kelas ({new Date(selectedDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })})
        </h3>
        
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Nama Siswa</th>
                <th className="p-3 font-bold text-slate-400">NISN / NIM</th>
                <th className="p-3 font-bold text-slate-400">Jabatan</th>
                <th className="p-3 font-bold text-slate-400 text-center">Status Kehadiran</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {profiles.map((student) => {
                const status = getStudentStatus(student.id);

                return (
                  <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{student.fullName}</td>
                    <td className="p-3 font-mono text-slate-500">{student.studentId || '-'}</td>
                    <td className="p-3 text-slate-500">{student.classRole}</td>
                    <td className="p-3 text-center">
                      <select
                        value={status}
                        onChange={(e) => handleStatusChange(student.id, e.target.value as any)}
                        className={`rounded-lg border px-2 py-1.5 text-[10px] font-bold focus:outline-none cursor-pointer ${
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
