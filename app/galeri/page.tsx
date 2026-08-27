import React from 'react';
import { getGalleries } from '@/actions/gallery.actions';
import { getCurrentUser } from '@/lib/actions/guards';
import GalleryClient from './_components/GalleryClient';

export default async function GalleryPage() {
  const [galleries, currentUser] = await Promise.all([
    getGalleries(),
    getCurrentUser(),
  ]);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Galeri Kenangan</h1>
        <p className="text-xs text-slate-400">Kumpulan momen kebersamaan kelas RPL 1.</p>
      </div>
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <GalleryClient galleries={galleries} currentUserId={currentUser?.id ?? ''} />
      </div>
    </div>
  );
}
