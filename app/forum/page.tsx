import React from 'react';
import { getForumPosts } from '@/actions/forum.actions';
import { getCurrentUser } from '@/lib/actions/guards';
import ForumClient from './_components/ForumClient';

export default async function ForumPage() {
  const [result, currentUser] = await Promise.all([
    getForumPosts(),
    getCurrentUser(),
  ]);

  const posts = result.success ? result.data : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <ForumClient posts={posts} currentUserId={currentUser?.id ?? ''} />
      </div>
    </div>
  );
}
