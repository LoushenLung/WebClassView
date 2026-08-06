'use client';

import React, { useState, useTransition } from 'react';
import { Schedule, Task, TaskProgress } from '@/lib/db';
import { updateTaskProgress } from '@/actions/schedule.actions';
import { 
  Calendar, 
  Clock, 
  MapPin, 
  User, 
  CheckCircle2, 
  Circle, 
  Play, 
  Check, 
  AlertCircle,
  FileText,
  ExternalLink
} from 'lucide-react';

interface ScheduleClientProps {
  schedules: Schedule[];
  tasks: Task[];
  initialProgresses: TaskProgress[];
  currentUserId: string;
}

export default function ScheduleClient({ 
  schedules, 
  tasks, 
  initialProgresses,
  currentUserId 
}: ScheduleClientProps) {
  const [activeDay, setActiveDay] = useState('Senin');
  const [isPending, startTransition] = useTransition();

  // Local state for progress tracking
  const [progresses, setProgresses] = useState<TaskProgress[]>(initialProgresses);

  const days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];

  const filteredSchedules = schedules.filter(s => s.day === activeDay);

  const getTaskStatus = (taskId: string) => {
    const prog = progresses.find(p => p.taskId === taskId && p.userId === currentUserId);
    return prog ? prog.status : 'TODO';
  };

  const handleUpdateStatus = (taskId: string, newStatus: 'TODO' | 'IN_PROGRESS' | 'DONE') => {
    startTransition(async () => {
      await updateTaskProgress(taskId, newStatus);
      // Update local state instantly for UX
      setProgresses(prev => {
        const idx = prev.findIndex(p => p.taskId === taskId && p.userId === currentUserId);
        if (idx >= 0) {
          const updated = [...prev];
          updated[idx] = { ...updated[idx], status: newStatus, updatedAt: new Date().toISOString() };
          return updated;
        } else {
          return [...prev, {
            id: 'local-' + Math.random(),
            taskId,
            userId: currentUserId,
            status: newStatus,
            updatedAt: new Date().toISOString()
          }];
        }
      });
    });
  };

  // Helper to calculate deadline urgency and styling
  const getDeadlineBadge = (deadlineStr: string) => {
    const deadline = new Date(deadlineStr);
    const now = new Date();
    const diffHours = (deadline.getTime() - now.getTime()) / (1000 * 60 * 60);

    if (diffHours < 0) {
      return { label: 'Terlewati', class: 'bg-rose-500/10 text-rose-500 border border-rose-500/20' };
    } else if (diffHours < 24) {
      return { label: '< 24 Jam', class: 'bg-rose-500/10 text-rose-500 border border-rose-500/20 animate-pulse' };
    } else if (diffHours < 72) {
      return { label: '< 3 Hari', class: 'bg-amber-500/10 text-amber-500 border border-amber-500/20' };
    } else {
      return { label: '> 3 Hari', class: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' };
    }
  };

  // Group tasks by Kanban column
  const kanbanColumns = [
    { title: 'Belum Dikerjakan', status: 'TODO' as const, bg: 'bg-slate-100/50 dark:bg-slate-900/40' },
    { title: 'Proses Pengerjaan', status: 'IN_PROGRESS' as const, bg: 'bg-indigo-50/10 dark:bg-indigo-950/5 border border-indigo-500/10' },
    { title: 'Selesai', status: 'DONE' as const, bg: 'bg-emerald-50/10 dark:bg-emerald-950/5 border border-emerald-500/10' }
  ];

  return (
    <div className="space-y-12">
      {/* --- Part 1: Dynamic Schedules --- */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <Calendar className="h-5 w-5 text-indigo-500" />
            Jadwal Pelajaran Kelas
          </h2>
          <p className="text-xs text-slate-400">Pilih hari untuk melihat daftar mata pelajaran.</p>
        </div>

        {/* Day Tabs */}
        <div className="flex flex-wrap gap-2 pb-2">
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setActiveDay(day)}
              className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                activeDay === day
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/20'
                  : 'bg-white border border-slate-200/60 hover:bg-slate-50 text-slate-700 dark:bg-slate-900 dark:border-slate-800 dark:text-slate-300 dark:hover:bg-slate-800'
              }`}
            >
              {day}
            </button>
          ))}
        </div>

        {/* Schedule List */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSchedules.length > 0 ? (
            filteredSchedules.map((sched) => (
              <div key={sched.id} className="relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
                <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-3">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{sched.startTime} - {sched.endTime}</span>
                </div>
                
                <h3 className="font-bold text-slate-950 dark:text-white text-base leading-snug">{sched.subjectName}</h3>
                
                <div className="mt-4 space-y-2 text-xs text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-slate-400" />
                    <span>{sched.teacherName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-3.5 w-3.5 text-slate-400" />
                    <span>{sched.room}</span>
                  </div>
                </div>

                {sched.notes && (
                  <div className="mt-4 border-t border-slate-100 pt-3 dark:border-slate-800 text-[11px] italic text-slate-400">
                    Catatan: {sched.notes}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="col-span-full flex h-40 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
              <Calendar className="h-10 w-10 stroke-1 text-slate-300 mb-2" />
              <p className="text-sm font-semibold">Tidak ada pelajaran hari ini</p>
              <p className="text-xs text-slate-400 mt-1">Silakan nikmati hari libur Anda.</p>
            </div>
          )}
        </div>
      </section>

      {/* --- Part 2: Task Tracker (Kanban Board) --- */}
      <section className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-indigo-500" />
            Task Tracker & Tugas Kelas
          </h2>
          <p className="text-xs text-slate-400">Kelola status pengerjaan tugas pribadi Anda.</p>
        </div>

        {/* Kanban Board Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          {kanbanColumns.map((col) => {
            // Filter tasks for this column
            const colTasks = tasks.filter(t => getTaskStatus(t.id) === col.status);

            return (
              <div key={col.status} className={`rounded-3xl p-5 ${col.bg} flex flex-col min-h-[400px]`}>
                <div className="flex justify-between items-center mb-4 pb-2 border-b border-slate-200/40 dark:border-slate-800/40">
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">{col.title}</h3>
                  <span className="rounded-full bg-slate-200 px-2.5 py-0.5 text-xs font-bold text-slate-700 dark:bg-slate-800 dark:text-slate-400">
                    {colTasks.length}
                  </span>
                </div>

                <div className="flex-1 space-y-4 overflow-y-auto">
                  {colTasks.length > 0 ? (
                    colTasks.map((task) => {
                      const badge = getDeadlineBadge(task.deadline);
                      return (
                        <div key={task.id} className="rounded-2xl border border-slate-200/50 bg-white p-4 shadow-sm dark:border-slate-800/50 dark:bg-slate-900 space-y-3 transition-all hover:shadow-md">
                          <div className="flex items-center justify-between">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight block max-w-[150px] truncate">
                              {task.subjectName}
                            </span>
                            <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${badge.class}`}>
                              {badge.label}
                            </span>
                          </div>

                          <h4 className="font-bold text-sm text-slate-900 dark:text-white leading-snug">
                            {task.title}
                          </h4>

                          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                            {task.description}
                          </p>

                          {/* Task Attachments / Links */}
                          {(task.attachmentUrl || task.linkUrl) && (
                            <div className="flex flex-wrap gap-2 pt-1.5 border-t border-slate-100 dark:border-slate-800">
                              {task.attachmentUrl && (
                                <a 
                                  href={task.attachmentUrl} 
                                  target="_blank" 
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-500 hover:underline"
                                >
                                  <FileText className="h-3 w-3" />
                                  <span>{task.attachmentName || 'Lampiran'}</span>
                                </a>
                              )}
                              {task.linkUrl && (
                                <a 
                                  href={task.linkUrl} 
                                  target="_blank" 
                                  className="inline-flex items-center gap-1 text-[10px] font-bold text-indigo-500 hover:underline"
                                >
                                  <ExternalLink className="h-3 w-3" />
                                  <span>Pengumpulan</span>
                                </a>
                              )}
                            </div>
                          )}

                          {/* Quick Status Action Controls */}
                          <div className="flex items-center justify-end gap-1.5 pt-2 border-t border-slate-50 dark:border-slate-800/40">
                            {col.status !== 'TODO' && (
                              <button
                                onClick={() => handleUpdateStatus(task.id, 'TODO')}
                                className="inline-flex h-7 items-center justify-center rounded-lg bg-slate-100 hover:bg-slate-200 px-2.5 text-[10px] font-bold text-slate-800 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 cursor-pointer"
                              >
                                Belum
                              </button>
                            )}
                            {col.status !== 'IN_PROGRESS' && (
                              <button
                                onClick={() => handleUpdateStatus(task.id, 'IN_PROGRESS')}
                                className="inline-flex h-7 items-center justify-center rounded-lg bg-indigo-50 hover:bg-indigo-100 px-2.5 text-[10px] font-bold text-indigo-600 dark:bg-indigo-950/30 dark:text-indigo-400 dark:hover:bg-indigo-950/50 cursor-pointer"
                              >
                                <Play className="mr-1 h-3 w-3" />
                                Kerjakan
                              </button>
                            )}
                            {col.status !== 'DONE' && (
                              <button
                                onClick={() => handleUpdateStatus(task.id, 'DONE')}
                                className="inline-flex h-7 items-center justify-center rounded-lg bg-emerald-500 hover:bg-emerald-600 px-2.5 text-[10px] font-bold text-white shadow shadow-emerald-500/20 cursor-pointer"
                              >
                                <Check className="mr-1 h-3 w-3" />
                                Selesai
                              </button>
                            )}
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex h-48 flex-col items-center justify-center text-center text-slate-400">
                      <AlertCircle className="h-8 w-8 stroke-1 text-slate-300 mb-2" />
                      <p className="text-xs">Tidak ada tugas di kolom ini</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
