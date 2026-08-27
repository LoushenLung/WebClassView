import React from 'react';
import { getGalleries } from '@/actions/gallery.actions';
import AdminGalleryModeration from './_components/AdminGalleryModeration';

export default async function AdminGalleryPage() {
  const galleries = await getGalleries();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Moderasi Galeri Momen</h1>
        <p className="text-xs text-slate-400">Pantau dan hapus foto/video yang diunggah oleh siswa jika dirasa kurang pantas atau melanggar aturan.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminGalleryModeration galleries={galleries} />
      </div>
    </div>
  );
}
