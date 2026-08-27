'use client';

import React, { useState, useTransition } from 'react';
import type { Material } from '@/lib/types';
import { createMaterial, deleteMaterial } from '@/actions/material.actions';
import { Plus, Trash, FileText, ExternalLink } from 'lucide-react';

interface AdminMaterialCRUDProps {
  materials: Material[];
}

export default function AdminMaterialCRUD({ materials }: AdminMaterialCRUDProps) {
  const [isPending, startTransition] = useTransition();

  const [subjectName, setSubjectName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [externalLink, setExternalLink] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !title || !externalLink) return;

    startTransition(async () => {
      await createMaterial({ subjectName, title, description: description || undefined, externalLink });
      setSubjectName('');
      setTitle('');
      setDescription('');
      setExternalLink('');
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus materi pelajaran ini?')) {
      startTransition(async () => {
        await deleteMaterial(id);
      });
    }
  };

  return (
    <div className="grid gap-8 lg:grid-cols-3">
      {/* Form */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
          <Plus className="h-4 w-4 text-indigo-500" />
          Tambah Materi / Tautan
        </h3>

        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="space-y-1">
            <label className="font-bold text-slate-400">Mata Pelajaran</label>
            <input
              type="text"
              value={subjectName}
              onChange={(e) => setSubjectName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Misal: Pemrograman Web"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">Judul Materi</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Misal: Modul 02 - CSS Grid & Flexbox"
              required
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">Deskripsi (Opsional)</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Ringkasan singkat isi materi..."
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">Tautan Eksternal</label>
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="https://drive.google.com/..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            Tambah Materi
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Materi</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Mapel</th>
                <th className="p-3 font-bold text-slate-400">Judul</th>
                <th className="p-3 font-bold text-slate-400">Tautan</th>
                <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {materials.length > 0 ? (
                materials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{mat.subjectName}</td>
                    <td className="p-3 font-semibold">
                      <span className="flex items-center gap-1.5">
                        <FileText className="h-3.5 w-3.5 text-indigo-500 shrink-0" />
                        {mat.title}
                      </span>
                    </td>
                    <td className="p-3">
                      {mat.externalLink ? (
                        <a
                          href={mat.externalLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-500 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Buka
                        </a>
                      ) : mat.fileUrl ? (
                        <a
                          href={mat.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1 text-indigo-500 hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          Unduh
                        </a>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(mat.id)}
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
                  <td colSpan={4} className="p-6 text-center text-slate-400">
                    Belum ada materi ditambahkan
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
