import React from 'react';
import { getAnnouncements } from '@/actions/announcement.actions';
import { Megaphone, Pin, Calendar, User, Info } from 'lucide-react';

export default async function AnnouncementsPage() {
  const announcements = await getAnnouncements();

  const getPriorityBadgeClass = (priority: string) => {
    switch (priority) {
      case 'URGENT':
        return 'bg-rose-500/10 text-rose-500 border border-rose-500/25';
      case 'PENTING':
        return 'bg-amber-500/10 text-amber-500 border border-amber-500/25';
      case 'BIASA':
      default:
        return 'bg-slate-100 text-slate-600 border border-slate-200/50 dark:bg-slate-800 dark:text-slate-350 dark:border-slate-700/50';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Papan Pengumuman</h1>
        <p className="text-xs text-slate-400">Informasi penting, edaran wali kelas, agenda sekolah, dan pemberitahuan darurat.</p>
      </div>

      <div className="mx-auto max-w-4xl space-y-6">
        {announcements.length > 0 ? (
          announcements.map((ann) => (
            <div 
              key={ann.id} 
              className={`relative overflow-hidden rounded-3xl border p-6 bg-white dark:bg-slate-900/50 backdrop-blur-md shadow-sm transition-all hover:scale-[1.005] ${
                ann.pinned 
                  ? 'border-indigo-200/60 dark:border-indigo-900/40 bg-indigo-50/5 dark:bg-indigo-950/5' 
                  : 'border-slate-200/50 dark:border-slate-800/50'
              }`}
            >
              {ann.pinned && (
                <span className="absolute right-6 top-6 inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-[9px] font-bold text-indigo-700 dark:bg-indigo-950 dark:text-indigo-400 uppercase tracking-wider">
                  <Pin className="h-3 w-3" />
                  Sematkan
                </span>
              )}

              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-2">
                  <span className={`rounded-full px-2.5 py-0.5 text-[9px] font-bold uppercase ${getPriorityBadgeClass(ann.priorityLevel)}`}>
                    {ann.priorityLevel}
                  </span>
                  
                  <div className="flex items-center gap-3 text-[10px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {new Date(ann.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white leading-tight">
                    {ann.title}
                  </h2>
                  <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-wrap">
                    {ann.content}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="flex h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
            <Megaphone className="h-10 w-10 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Belum ada pengumuman</p>
            <p className="text-xs text-slate-400 mt-1">Pengumuman baru akan tampil di papan ini.</p>
          </div>
        )}
      </div>
    </div>
  );
}
