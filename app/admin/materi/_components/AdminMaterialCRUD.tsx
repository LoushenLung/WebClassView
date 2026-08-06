'use client';

import React, { useState, useTransition } from 'react';
import { Material } from '@/lib/db';
import { createMaterial, deleteMaterial } from '@/actions/schedule.actions';
import { Plus, Trash, FileText, Download } from 'lucide-react';

interface AdminMaterialCRUDProps {
  materials: Material[];
}

export default function AdminMaterialCRUD({ materials }: AdminMaterialCRUDProps) {
  const [isPending, startTransition] = useTransition();

  const [subjectName, setSubjectName] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [fileUrl, setFileUrl] = useState('');
  const [fileType, setFileType] = useState('PDF');
  const [semester, setSemester] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subjectName || !title || !fileUrl) return;

    startTransition(async () => {
      await createMaterial({
        subjectName,
        title,
        description: description || undefined,
        fileUrl,
        fileType,
        semester
      });
      // reset
      setSubjectName('');
      setTitle('');
      setDescription('');
      setFileUrl('');
      setFileType('PDF');
      setSemester(1);
    });
  };

  const handleDelete = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus materi pelajaran ini?')) {
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
          Tambah Modul / Materi Baru
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
            <label className="font-bold text-slate-400">Judul Modul</label>
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
            <label className="font-bold text-slate-400">Deskripsi Singkat</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="Tulis ringkasan singkat isi modul..."
            />
          </div>

          <div className="space-y-1">
            <label className="font-bold text-slate-400">URL File Dokumen (Cloudinary/PDF Link)</label>
            <input
              type="text"
              value={fileUrl}
              onChange={(e) => setFileUrl(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              placeholder="https://..."
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Tipe Dokumen</label>
              <select
                value={fileType}
                onChange={(e) => setFileType(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              >
                <option value="PDF">PDF File</option>
                <option value="PPT">PPT Presentation</option>
                <option value="DOCX">Word Document</option>
                <option value="Video">Video Tutorial</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Semester</label>
              <select
                value={semester}
                onChange={(e) => setSemester(Number(e.target.value))}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              >
                <option value={1}>Semester 1</option>
                <option value={2}>Semester 2</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            Unggah Materi
          </button>
        </form>
      </div>

      {/* List */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Modul Terupload</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Mapel</th>
                <th className="p-3 font-bold text-slate-400">Judul Modul</th>
                <th className="p-3 font-bold text-slate-400">Uploader</th>
                <th className="p-3 font-bold text-slate-400">Format</th>
                <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {materials.length > 0 ? (
                materials.map((mat) => (
                  <tr key={mat.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{mat.subjectName}</td>
                    <td className="p-3 font-semibold flex items-center gap-1.5">
                      <FileText className="h-3.5 w-3.5 text-indigo-500" />
                      {mat.title}
                    </td>
                    <td className="p-3 text-slate-500">{mat.uploaderName}</td>
                    <td className="p-3">
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold dark:bg-slate-800 text-slate-600 dark:text-slate-350">
                        {mat.fileType}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(mat.id)}
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
                    Belum ada materi terupload
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
