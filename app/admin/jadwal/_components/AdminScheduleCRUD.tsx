'use client';

import React, { useState, useTransition } from 'react';
import { Schedule, Task } from '@/lib/db';
import { createSchedule, deleteSchedule, createTask, deleteTask } from '@/actions/schedule.actions';
import { Plus, Trash, Calendar, BookOpen, Clock, AlertTriangle, FilePlus } from 'lucide-react';

interface AdminScheduleCRUDProps {
  schedules: Schedule[];
  tasks: Task[];
}

export default function AdminScheduleCRUD({ schedules, tasks }: AdminScheduleCRUDProps) {
  const [isPending, startTransition] = useTransition();

  // Schedule form state
  const [day, setDay] = useState('Senin');
  const [subjectName, setSubjectName] = useState('');
  const [teacherName, setTeacherName] = useState('');
  const [room, setRoom] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [notes, setNotes] = useState('');

  // Task form state
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [taskDeadline, setTaskDeadline] = useState('');
  const [taskPriority, setTaskPriority] = useState<'LOW' | 'MEDIUM' | 'HIGH'>('MEDIUM');
  const [taskSubject, setTaskSubject] = useState('');
  const [taskAttachmentUrl, setTaskAttachmentUrl] = useState('');
  const [taskAttachmentName, setTaskAttachmentName] = useState('');
  const [taskLinkUrl, setTaskLinkUrl] = useState('');

  const [activeTab, setActiveTab] = useState<'schedule' | 'tasks'>('schedule');

  const handleAddSchedule = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !teacherName || !room || !startTime || !endTime) return;

    startTransition(async () => {
      await createSchedule({
        day,
        subjectName,
        teacherName,
        room,
        startTime,
        endTime,
        notes: notes || undefined
      });
      // reset
      setSubjectName('');
      setTeacherName('');
      setRoom('');
      setStartTime('');
      setEndTime('');
      setNotes('');
    });
  };

  const handleDeleteSchedule = (id: string) => {
    if (confirm('Hapus jadwal pelajaran ini?')) {
      startTransition(async () => {
        await deleteSchedule(id);
      });
    }
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskTitle || !taskDesc || !taskDeadline || !taskSubject) return;

    startTransition(async () => {
      await createTask({
        title: taskTitle,
        description: taskDesc,
        deadline: new Date(taskDeadline).toISOString(),
        priority: taskPriority,
        subjectName: taskSubject,
        attachmentUrl: taskAttachmentUrl || undefined,
        attachmentName: taskAttachmentName || undefined,
        linkUrl: taskLinkUrl || undefined
      });
      // reset
      setTaskTitle('');
      setTaskDesc('');
      setTaskDeadline('');
      setTaskPriority('MEDIUM');
      setTaskSubject('');
      setTaskAttachmentUrl('');
      setTaskAttachmentName('');
      setTaskLinkUrl('');
    });
  };

  const handleDeleteTask = (id: string) => {
    if (confirm('Hapus tugas kelas ini?')) {
      startTransition(async () => {
        await deleteTask(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      {/* Switch Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('schedule')}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'schedule'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Kelola Jadwal Pelajaran
        </button>
        <button
          onClick={() => setActiveTab('tasks')}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'tasks'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Kelola Tugas (Tasks)
        </button>
      </div>

      {activeTab === 'schedule' ? (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Form */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-indigo-500" />
              Tambah Jadwal Baru
            </h3>

            <form onSubmit={handleAddSchedule} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Hari</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                >
                  <option value="Senin">Senin</option>
                  <option value="Selasa">Selasa</option>
                  <option value="Rabu">Rabu</option>
                  <option value="Kamis">Kamis</option>
                  <option value="Jumat">Jumat</option>
                  <option value="Sabtu">Sabtu</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Mata Pelajaran</label>
                <input
                  type="text"
                  value={subjectName}
                  onChange={(e) => setSubjectName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Basis Data"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Nama Guru / Dosen</label>
                <input
                  type="text"
                  value={teacherName}
                  onChange={(e) => setTeacherName(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Ibu Larasati"
                  required
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
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Jam Mulai</label>
                  <input
                    type="text"
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="07:30"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Jam Selesai</label>
                  <input
                    type="text"
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="09:45"
                    required
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Catatan Tambahan (Optional)</label>
                <input
                  type="text"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Pertemuan Ke-5, bawa laptop"
                />
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
              >
                Simpan Jadwal
              </button>
            </form>
          </div>

          {/* List Table */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Jadwal Pelajaran</h3>
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
                  {schedules.length > 0 ? (
                    schedules.map((sched) => (
                      <tr key={sched.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <td className="p-3 font-bold">{sched.day}</td>
                        <td className="p-3 font-mono">{sched.startTime} - {sched.endTime}</td>
                        <td className="p-3 font-semibold">{sched.subjectName}</td>
                        <td className="p-3">{sched.teacherName}</td>
                        <td className="p-3">{sched.room}</td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteSchedule(sched.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
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
      ) : (
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Task Form */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
              <Plus className="h-4 w-4 text-indigo-500" />
              Tambah Tugas Baru
            </h3>

            <form onSubmit={handleAddTask} className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Judul Tugas</label>
                <input
                  type="text"
                  value={taskTitle}
                  onChange={(e) => setTaskTitle(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Latihan Subquery SQL"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Mata Pelajaran</label>
                <input
                  type="text"
                  value={taskSubject}
                  onChange={(e) => setTaskSubject(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Misal: Basis Data"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Deskripsi / Instruksi</label>
                <textarea
                  value={taskDesc}
                  onChange={(e) => setTaskDesc(e.target.value)}
                  rows={3}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  placeholder="Tulis deskripsi tugas..."
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Deadline</label>
                <input
                  type="datetime-local"
                  value={taskDeadline}
                  onChange={(e) => setTaskDeadline(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  required
                />
              </div>

              <div className="space-y-1">
                <label className="font-bold text-slate-400">Prioritas</label>
                <select
                  value={taskPriority}
                  onChange={(e) => setTaskPriority(e.target.value as any)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                >
                  <option value="LOW">Rendah (LOW)</option>
                  <option value="MEDIUM">Sedang (MEDIUM)</option>
                  <option value="HIGH">Tinggi (HIGH)</option>
                </select>
              </div>

              <div className="border-t border-slate-100 pt-3 dark:border-slate-800 space-y-3">
                <span className="font-bold text-slate-400 block text-[10px] uppercase">Attachment & Pengumpulan</span>
                <div className="space-y-2">
                  <input
                    type="text"
                    value={taskAttachmentUrl}
                    onChange={(e) => setTaskAttachmentUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="URL file lampiran (PDF/Gambar)"
                  />
                  <input
                    type="text"
                    value={taskAttachmentName}
                    onChange={(e) => setTaskAttachmentName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="Nama file lampiran (cth: Slide_05.pdf)"
                  />
                  <input
                    type="text"
                    value={taskLinkUrl}
                    onChange={(e) => setTaskLinkUrl(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="Tautan Pengumpulan (Google Classroom, dsb)"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isPending}
                className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
              >
                Buat Tugas
              </button>
            </form>
          </div>

          {/* Task List */}
          <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Tugas Kelas</h3>
            <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                    <th className="p-3 font-bold text-slate-400">Mapel</th>
                    <th className="p-3 font-bold text-slate-400">Judul Tugas</th>
                    <th className="p-3 font-bold text-slate-400">Deadline</th>
                    <th className="p-3 font-bold text-slate-400">Prioritas</th>
                    <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {tasks.length > 0 ? (
                    tasks.map((task) => (
                      <tr key={task.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                        <td className="p-3 font-bold">{task.subjectName}</td>
                        <td className="p-3 font-semibold">{task.title}</td>
                        <td className="p-3 text-rose-500 font-medium">
                          {new Date(task.deadline).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' })}
                        </td>
                        <td className="p-3">
                          <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                            task.priority === 'HIGH' 
                              ? 'bg-rose-500/10 text-rose-500' 
                              : task.priority === 'MEDIUM' 
                              ? 'bg-amber-500/10 text-amber-500' 
                              : 'bg-emerald-500/10 text-emerald-500'
                          }`}>
                            {task.priority}
                          </span>
                        </td>
                        <td className="p-3 text-center">
                          <button
                            onClick={() => handleDeleteTask(task.id)}
                            className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                          >
                            <Trash className="h-3.5 w-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="p-6 text-center text-slate-400">
                        Belum ada tugas dibuat
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
