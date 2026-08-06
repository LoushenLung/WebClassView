'use client';

import React, { useState, useTransition } from 'react';
import { GalleryPost } from '@/lib/db';
import { createGalleryPost } from '@/actions/gallery.actions';
import { Image as ImageIcon, Camera, Plus, ZoomIn, X, Calendar } from 'lucide-react';

interface GalleryClientProps {
  posts: GalleryPost[];
  currentUserId: string;
}

export default function GalleryClient({ posts, currentUserId }: GalleryClientProps) {
  const [isPending, startTransition] = useTransition();
  const [activePhoto, setActivePhoto] = useState<GalleryPost | null>(null);
  const [showUploadForm, setShowUploadForm] = useState(false);

  // Form states
  const [albumName, setAlbumName] = useState('Kegiatan Kelas');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');

  const handleUpload = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrl) return;

    startTransition(async () => {
      await createGalleryPost({
        albumName,
        imageUrl,
        description: description || undefined
      });
      // reset
      setImageUrl('');
      setDescription('');
      setAlbumName('Kegiatan Kelas');
      setShowUploadForm(false);
    });
  };

  return (
    <div className="space-y-6">
      {/* Upload Trigger */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <Camera className="h-5 w-5 text-indigo-500" />
            Galeri Kenangan RPL 1
          </h2>
          <p className="text-xs text-slate-400">Kumpulan momen kebersamaan, porseni, dan study tour kelas.</p>
        </div>
        
        <button
          onClick={() => setShowUploadForm(!showUploadForm)}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Bagikan Foto
        </button>
      </div>

      {/* Upload Form */}
      {showUploadForm && (
        <form onSubmit={handleUpload} className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4 max-w-lg animate-in slide-in-from-top-2 duration-200">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">Bagikan Momen Baru</h3>
          
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Nama Album / Kategori</label>
              <input
                type="text"
                value={albumName}
                onChange={(e) => setAlbumName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Misal: Study Tour Jogja, Ulang Tahun"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">URL Gambar (Cloudinary / Unsplash)</label>
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="https://images.unsplash.com/..."
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Keterangan / Caption</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Ceritakan momen indah di foto ini..."
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowUploadForm(false)}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors disabled:opacity-50 cursor-pointer"
            >
              Upload
            </button>
          </div>
        </form>
      )}

      {/* Masonry Layout Grid */}
      <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 [&>div]:mb-4">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div 
              key={post.id} 
              onClick={() => setActivePhoto(post)}
              className="break-inside-avoid relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-800/50 dark:bg-slate-900 group cursor-pointer hover:scale-[1.01] transition-transform"
            >
              <img 
                src={post.imageUrl} 
                alt={post.albumName} 
                className="w-full h-auto object-cover max-h-[350px]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-[10px] font-bold text-indigo-300 uppercase">{post.albumName}</span>
                <h4 className="font-bold text-sm leading-snug mt-1">{post.description || 'Lihat Foto'}</h4>
                <div className="flex items-center gap-1.5 text-[9px] text-slate-300 mt-3 pt-2.5 border-t border-white/15">
                  <ZoomIn className="h-3 w-3" />
                  <span>Perbesar</span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex h-48 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-200 bg-white p-6 text-center text-slate-400 dark:border-slate-800 dark:bg-slate-900/30">
            <ImageIcon className="h-10 w-10 stroke-1 text-slate-300 mb-2" />
            <p className="text-sm font-semibold">Album galeri kosong</p>
            <p className="text-xs text-slate-400 mt-1">Bagikan momen foto kelas pertama Anda sekarang.</p>
          </div>
        )}
      </div>

      {/* Lightbox / Zoom Photo Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm p-4">
          <div className="relative max-w-3xl w-full bg-slate-950 rounded-3xl overflow-hidden shadow-2xl p-2 space-y-4">
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute right-4 top-4 z-10 rounded-full bg-black/60 p-2 text-white hover:bg-black/85 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <img 
              src={activePhoto.imageUrl} 
              alt={activePhoto.albumName} 
              className="w-full h-auto max-h-[70vh] object-contain mx-auto rounded-2xl"
            />
            
            <div className="p-4 text-white space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="rounded-full bg-indigo-500/20 px-2.5 py-0.5 text-[10px] font-bold text-indigo-300 ring-1 ring-indigo-500/30">
                  {activePhoto.albumName}
                </span>
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  {new Date(activePhoto.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activePhoto.description || 'Tidak ada caption.'}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
