'use client';

import React, { useState, useTransition } from 'react';
import type { Attendance } from '@/lib/types';
import { recordAttendance } from '@/actions/attendance.actions';
import { CheckCircle2, Clock, Calendar, QrCode } from 'lucide-react';

interface AttendanceClientProps {
  initialHistory: Attendance[];
  currentUserId: string;
}

function toDateStr(d: Date | string): string {
  return new Date(d).toISOString().split('T')[0];
}

export default function AttendanceClient({ initialHistory, currentUserId }: AttendanceClientProps) {
  const [isPending, startTransition] = useTransition();
  const [history, setHistory] = useState<Attendance[]>(initialHistory);
  const [qrOpen, setQrOpen] = useState(false);

  const todayStr = new Date().toISOString().split('T')[0];
  const todayAttendance = history.find(
    (a) => a.studentId === currentUserId && toDateStr(a.date) === todayStr
  );

  const handleCheckIn = () => {
    startTransition(async () => {
      await recordAttendance({ studentId: currentUserId, date: todayStr, status: 'HADIR' });
      setHistory((prev) => {
        const idx = prev.findIndex(
          (a) => a.studentId === currentUserId && toDateStr(a.date) === todayStr
        );
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], status: 'HADIR', checkInTime: new Date() };
          return updated;
        }
        return [
          {
            id: 'att-local-' + Math.random(),
            studentId: currentUserId,
            date: new Date(todayStr),
            status: 'HADIR',
            checkInTime: new Date(),
            createdAt: new Date(),
            updatedAt: new Date(),
          },
          ...prev,
        ];
      });
    });
  };

  const getStatusClass = (status: string) => {
    if (status === 'HADIR') return 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20';
    if (status === 'IZIN') return 'bg-blue-500/10 text-blue-500 border border-blue-500/20';
    if (status === 'SAKIT') return 'bg-amber-500/10 text-amber-500 border border-amber-500/20';
    return 'bg-rose-500/10 text-rose-500 border border-rose-500/20';
  };

  const myHistory = history.filter((a) => a.studentId === currentUserId);

  return (
    <div className="grid gap-8 md:grid-cols-3">
      {/* Check-in card */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-6 text-center">
        <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Presensi Hari Ini</span>

        {todayAttendance?.status === 'HADIR' ? (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-500">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Anda Sudah Hadir</h3>
              {todayAttendance.checkInTime && (
                <p className="text-[10px] text-slate-400 flex items-center justify-center gap-1">
                  <Clock className="h-3 w-3" />
                  Check-in pada{' '}
                  {new Date(todayAttendance.checkInTime).toLocaleTimeString('id-ID', {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}{' '}
                  WIB
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-500/10 text-indigo-500">
              <Clock className="h-8 w-8" />
            </div>
            <div className="space-y-1">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">Belum Melakukan Presensi</h3>
              <p className="text-[10px] text-slate-400">Silakan check-in menggunakan tombol di bawah.</p>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={handleCheckIn}
                disabled={isPending}
                className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-5 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer disabled:opacity-50"
              >
                Check-in Sekarang
              </button>
              <button
                onClick={() => setQrOpen(true)}
                className="w-full inline-flex h-11 items-center justify-center rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 text-xs font-bold transition-all cursor-pointer"
              >
                <QrCode className="mr-1.5 h-4 w-4" />
                Tampilkan QR Check-in
              </button>
            </div>
          </div>
        )}
      </div>

      {/* History */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md md:col-span-2 space-y-4">
        <h3 className="font-bold text-slate-950 dark:text-white text-base">Riwayat Kehadiran Anda</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                <th className="p-3 font-bold text-slate-400">Tanggal</th>
                <th className="p-3 font-bold text-slate-400">Status</th>
                <th className="p-3 font-bold text-slate-400">Waktu Masuk</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {myHistory.length > 0 ? (
                myHistory.map((att) => (
                  <tr key={att.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-semibold flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-indigo-500" />
                      {new Date(att.date).toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                      })}
                    </td>
                    <td className="p-3">
                      <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold ${getStatusClass(att.status)}`}>
                        {att.status}
                      </span>
                    </td>
                    <td className="p-3 font-mono text-slate-500">
                      {att.checkInTime
                        ? new Date(att.checkInTime).toLocaleTimeString('id-ID', {
                            hour: '2-digit',
                            minute: '2-digit',
                          }) + ' WIB'
                        : '-'}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="p-6 text-center text-slate-400">
                    Belum ada riwayat kehadiran tercatat.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* QR modal */}
      {qrOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-sm w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-6 text-center space-y-4">
            <div className="flex justify-between items-center border-b border-slate-100 pb-2.5 dark:border-slate-800">
              <h3 className="font-bold text-sm">QR Code Absensi Kelas</h3>
              <button onClick={() => setQrOpen(false)} className="text-slate-400 hover:text-slate-900 dark:hover:text-white font-bold cursor-pointer">
                Tutup
              </button>
            </div>
            <div className="mx-auto flex h-48 w-48 items-center justify-center rounded-2xl border border-slate-100 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 p-4">
              <div className="h-full w-full bg-[radial-gradient(#4f46e5_1px,transparent_1px)] [background-size:16px_16px] rounded-lg border border-dashed border-indigo-500/30 flex items-center justify-center text-xs font-bold text-indigo-500">
                [ RPL_1_QR ]
              </div>
            </div>
            <p className="text-[10px] text-slate-400">
              Scan barcode di atas untuk melakukan absensi otomatis di kelas.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
