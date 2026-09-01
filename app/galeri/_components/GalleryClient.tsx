'use client';

import React, { useState } from 'react';
import type { PhotoGallery, Photo } from '@/lib/types';
import { Image as ImageIcon, Camera, ZoomIn, X, Calendar, Images } from 'lucide-react';

interface GalleryClientProps {
  galleries: (PhotoGallery & { photos: Photo[] })[];
  currentUserId: string;
}

export default function GalleryClient({ galleries }: GalleryClientProps) {
  const [activePhoto, setActivePhoto] = useState<Photo | null>(null);
  const [activeGallery, setActiveGallery] = useState<(PhotoGallery & { photos: Photo[] }) | null>(null);

  if (activeGallery) {
    return (
      <div className="space-y-6 animate-in fade-in duration-200">
        <button
          onClick={() => setActiveGallery(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          ← Kembali ke Semua Album
        </button>

        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white">{activeGallery.title}</h2>
          {activeGallery.description && (
            <p className="text-xs text-slate-400 mt-1">{activeGallery.description}</p>
          )}
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            {new Date(activeGallery.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4">
          {activeGallery.photos.length > 0 ? (
            activeGallery.photos.map((photo: Photo) => (
              <div
                key={photo.id}
                onClick={() => setActivePhoto(photo)}
                className="break-inside-avoid relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-800/50 dark:bg-slate-900 group cursor-pointer hover:scale-[1.01] transition-transform"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.cloudinaryUrl}
                  alt={photo.caption ?? activeGallery.title}
                  className="w-full h-auto object-cover max-h-[350px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                  <div className="flex items-center gap-1.5 text-[9px] text-slate-300">
                    <ZoomIn className="h-3 w-3" />
                    <span>{photo.caption ?? 'Perbesar'}</span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full text-center text-slate-400 py-12">
              Belum ada foto di album ini.
            </div>
          )}
        </div>

        {/* Lightbox */}
        {activePhoto && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
            <div className="relative max-w-3xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl p-2 space-y-4">
              <button
                onClick={() => setActivePhoto(null)}
                className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/85 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activePhoto.cloudinaryUrl}
                alt={activePhoto.caption ?? ''}
                className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-2xl"
              />
              {activePhoto.caption && (
                <p className="px-4 pb-4 text-xs text-slate-300">{activePhoto.caption}</p>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2">
        <Camera className="h-5 w-5 text-indigo-500" />
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Galeri Kenangan RPL 1</h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {galleries.length > 0 ? (
          galleries.map((gallery) => (
            <div
              key={gallery.id}
              onClick={() => setActiveGallery(gallery)}
              className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-slate-900 shadow-sm cursor-pointer hover:scale-[1.01] transition-transform"
            >
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
              <div className="p-4 space-y-1">
                <h3 className="font-bold text-slate-950 dark:text-white text-sm">{gallery.title}</h3>
                {gallery.description && (
                  <p className="text-xs text-slate-500 line-clamp-2">{gallery.description}</p>
                )}
                <div className="flex items-center justify-between pt-1 text-[10px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Images className="h-3 w-3" />
                    {gallery.photos.length} foto
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(gallery.eventDate).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
            <ImageIcon className="h-10 w-10 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Album galeri kosong</p>
            <p className="text-xs mt-1">Admin dapat menambahkan album baru di panel admin.</p>
          </div>
        )}
      </div>
    </div>
  );
}
