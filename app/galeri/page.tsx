import React from 'react';
import { getGalleryPosts } from '@/actions/gallery.actions';
import { getMockSession } from '@/actions/auth.actions';
import GalleryClient from './_components/GalleryClient';

export default async function GalleryPage() {
  const posts = await getGalleryPosts();
  const currentUser = await getMockSession();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <GalleryClient 
          posts={posts} 
          currentUserId={currentUser.id} 
        />
      </div>
    </div>
  );
}
