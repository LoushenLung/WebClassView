'use client';

import React, { useState } from 'react';
import { Material } from '@/lib/db';
import { Search, FileText, Download, User, Calendar, ExternalLink } from 'lucide-react';

interface MaterialLibraryProps {
  materials: Material[];
}

export default function MaterialLibrary({ materials }: MaterialLibraryProps) {
  const [search, setSearch] = useState('');
  const [fileType, setFileType] = useState('ALL');
  const [semester, setSemester] = useState('ALL');

  const filtered = materials.filter(m => {
    const matchesSearch = m.title.toLowerCase().includes(search.toLowerCase()) || 
      (m.description && m.description.toLowerCase().includes(search.toLowerCase())) ||
      m.subjectName.toLowerCase().includes(search.toLowerCase());
    
    const matchesType = fileType === 'ALL' || m.fileType === fileType;
    const matchesSemester = semester === 'ALL' || m.semester.toString() === semester;

    return matchesSearch && matchesType && matchesSemester;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filter Controls */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="relative">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
            placeholder="Cari materi atau mata pelajaran..."
          />
        </div>

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
        >
          <option value="ALL">Semua Jenis File</option>
          <option value="PDF">PDF Document</option>
          <option value="PPT">PPT Presentation</option>
          <option value="DOCX">Word Document</option>
          <option value="Video">Video Tutorial</option>
        </select>

        <select
          value={semester}
          onChange={(e) => setSemester(e.target.value)}
          className="rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
        >
          <option value="ALL">Semua Semester</option>
          <option value="1">Semester 1</option>
          <option value="2">Semester 2</option>
        </select>
      </div>

      {/* Materials Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.length > 0 ? (
          filtered.map((mat) => (
            <div key={mat.id} className="flex flex-col justify-between rounded-3xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md hover:scale-[1.01] transition-transform">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase tracking-tight">
                    {mat.subjectName}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-semibold text-slate-500 dark:bg-slate-800 dark:text-slate-400">
                    Smtr {mat.semester}
                  </span>
                </div>

                <h3 className="font-bold text-slate-950 dark:text-white text-sm leading-snug flex items-start gap-2">
                  <FileText className="h-4 w-4 text-indigo-500 shrink-0 mt-0.5" />
                  <span>{mat.title}</span>
                </h3>

                {mat.description && (
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3">
                    {mat.description}
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 space-y-1">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Upload: {mat.uploaderName}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(mat.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <a
                  href={mat.fileUrl}
                  target="_blank"
                  className="inline-flex h-8 items-center justify-center rounded-lg bg-indigo-600 px-3 text-[10px] font-bold text-white shadow shadow-indigo-600/25 hover:bg-indigo-500 cursor-pointer"
                >
                  <Download className="mr-1 h-3 w-3" />
                  Unduh ({mat.fileType})
                </a>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
            <FileText className="h-10 w-10 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Materi tidak ditemukan</p>
            <p className="text-xs text-slate-400 mt-1">Coba sesuaikan kata kunci pencarian atau filter tipe file.</p>
          </div>
        )}
      </div>
    </div>
  );
}
