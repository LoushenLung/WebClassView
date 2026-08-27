import React from 'react';
import { getForumPosts } from '@/actions/forum.actions';
import { getProfiles } from '@/actions/profile.actions';
import AdminForumModeration from './_components/AdminForumModeration';

export default async function AdminForumPage() {
  const result = await getForumPosts();
  const posts = result.success ? result.data : [];
  const users = await getProfiles();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Moderasi Forum Diskusi</h1>
        <p className="text-xs text-slate-400">Moderasi dan hapus diskusi/pertanyaan forum kelas yang menyimpang dari aturan atau topik akademik.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminForumModeration posts={posts} users={users} />
      </div>
    </div>
  );
}
