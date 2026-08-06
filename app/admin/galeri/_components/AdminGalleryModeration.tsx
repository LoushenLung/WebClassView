'use client';

import React, { useTransition } from 'react';
import { GalleryPost, Profile } from '@/lib/db';
import { deleteGalleryPost } from '@/actions/gallery.actions';
import { Trash, Calendar, User, LayoutGrid } from 'lucide-react';

interface AdminGalleryModerationProps {
  posts: GalleryPost[];
  profiles: Profile[];
}

export default function AdminGalleryModeration({ posts, profiles }: AdminGalleryModerationProps) {
  const [isPending, startTransition] = useTransition();

  const getUploaderName = (userId: string) => {
    const prof = profiles.find(p => p.id === userId);
    return prof ? prof.fullName : 'Siswa RPL 1';
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus foto ini secara permanen dari galeri kelas?')) {
      startTransition(async () => {
        await deleteGalleryPost(id);
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
        {posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="overflow-hidden rounded-3xl border border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-slate-900 shadow-sm flex flex-col justify-between">
              <div>
                <img 
                  src={post.imageUrl} 
                  alt={post.albumName} 
                  className="w-full h-44 object-cover"
                />
                
                <div className="p-4 space-y-2 text-xs">
                  <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase tracking-tight">
                    {post.albumName}
                  </span>
                  
                  <p className="text-slate-500 line-clamp-2">
                    {post.description || 'Tidak ada caption.'}
                  </p>
                </div>
              </div>

              <div className="border-t border-slate-100 p-4 dark:border-slate-800 flex items-center justify-between">
                <div className="text-[10px] text-slate-400 space-y-0.5">
                  <div className="flex items-center gap-1">
                    <User className="h-3 w-3" />
                    <span>Upload: {getUploaderName(post.uploadedById)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    <span>{new Date(post.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</span>
                  </div>
                </div>

                <button
                  onClick={() => handleDelete(post.id)}
                  disabled={isPending}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
                  title="Hapus Momen"
                >
                  <Trash className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full text-center text-slate-400 py-12">
            Belum ada foto terunggah di galeri kelas.
          </div>
        )}
      </div>
    </div>
  );
}
