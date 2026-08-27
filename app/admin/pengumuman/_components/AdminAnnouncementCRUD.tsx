'use client';

import React, { useState, useTransition } from 'react';
import { Announcement } from '@/lib/types';
import { createAnnouncement, publishAnnouncement, deleteAnnouncement } from '@/actions/announcement.actions';
import { Plus, Trash, Send, Calendar } from 'lucide-react';

interface AdminAnnouncementCRUDProps {
  announcements: Announcement[];
}

export default function AdminAnnouncementCRUD({ announcements }: AdminAnnouncementCRUDProps) {
  const [isPending, startTransition] = useTransition();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    startTransition(async () => {
      await createAnnouncement({ title, content });
      setTitle('');
      setContent('');
    });
  };

  const handlePublish = (id: string) => {
    startTransition(async () => {
      await publishAnnouncement(id);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus pengumuman ini?')) {
      startTransition(async () => {
        await deleteAnnouncement(id);
      });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Form */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
          <Plus className="h-4 w-4 text-indigo-500" />
          Tambah Pengumuman Baru
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-400">Judul Pengumuman</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Misal: Edaran Libur UTS"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">Konten Pengumuman</label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={5}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Tulis detail pengumuman..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            Simpan sebagai Draft
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Papan Pengumuman</h3>

        <div className="space-y-4">
          {announcements.length > 0 ? (
            announcements.map((ann) => (
              <div
                key={ann.id}
                className="flex items-start justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30 text-xs"
              >
                <div className="space-y-1.5 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    {/* Status badge */}
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      ann.status === 'published'
                        ? 'bg-emerald-500/10 text-emerald-600'
                        : 'bg-slate-200 text-slate-500 dark:bg-slate-700 dark:text-slate-400'
                    }`}>
                      {ann.status === 'published' ? 'Diterbitkan' : 'Draft'}
                    </span>

                    {/* Date */}
                    <span className="flex items-center gap-1 text-[10px] text-slate-400">
                      <Calendar className="h-3 w-3" />
                      {new Date(
                        ann.status === 'published' && ann.publishedAt
                          ? ann.publishedAt
                          : ann.createdAt
                      ).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>

                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{ann.title}</h4>
                  <p className="text-slate-500 line-clamp-2">{ann.content}</p>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  {/* Publish button — only shown for drafts */}
                  {ann.status === 'draft' && (
                    <button
                      onClick={() => handlePublish(ann.id)}
                      disabled={isPending}
                      className="p-1.5 rounded-lg text-emerald-600 hover:bg-emerald-500/10 cursor-pointer disabled:opacity-50 transition-colors"
                      title="Terbitkan"
                    >
                      <Send className="h-3.5 w-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => handleDelete(ann.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer disabled:opacity-50 transition-colors"
                    title="Hapus"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-6">
              Belum ada pengumuman
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
