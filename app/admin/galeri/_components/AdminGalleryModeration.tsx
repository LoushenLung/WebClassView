'use client';

import React, { useTransition } from 'react';
import type { PhotoGallery, Photo } from '@/lib/types';
import { deleteGallery } from '@/actions/gallery.actions';
import { Trash, Calendar, Images, LayoutGrid } from 'lucide-react';

interface AdminGalleryModerationProps {
  galleries: (PhotoGallery & { photos: Photo[] })[];
}

export default function AdminGalleryModeration({ galleries }: AdminGalleryModerationProps) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = (id: string) => {
    if (confirm('Hapus album ini secara permanen dari galeri kelas?')) {
      startTransition(async () => {
        await deleteGallery(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <LayoutGrid className="h-4 w-4 text-indigo-500" />
        Moderasi Foto & Video Galeri
      </h3>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <div key={gallery.id} className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                {gallery.photos[0]?.cloudinaryUrl ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={gallery.photos[0].cloudinaryUrl}
                    alt={gallery.title}
                    className="w-full h-44 object-cover"
                  />
                ) : (
                  <div className="w-full h-44 bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Images className="h-10 w-10 text-slate-300 dark:text-slate-600" />
                  </div>
                )}

                <div className="p-4 space-y-2 text-xs">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase tracking-tight">
                    {gallery.title}
                  </span>

                  <p className="text-slate-500 line-clamp-2">
                    {gallery.description || 'Tidak ada deskripsi.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 p-4 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <Images className="h-3 w-3" />
                    <span>{gallery.photos.length} foto</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(gallery.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(gallery.id)}
                  disabled={isPending}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
                  title="Hapus Album"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-400 py-12">
            Belum ada album di galeri kelas.
          </div>
        )}
      </div>
    </div>
  );
}
