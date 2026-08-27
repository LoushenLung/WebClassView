'use client';

import React, { useTransition } from 'react';
import type { ForumPost, User } from '@/lib/types';
import { deletePost } from '@/actions/forum.actions';
import { Trash, MessageSquare } from 'lucide-react';

interface AdminForumModerationProps {
  posts: ForumPost[];
  users: User[];
}

export default function AdminForumModeration({ posts, users }: AdminForumModerationProps) {
  const [isPending, startTransition] = useTransition();

  const getAuthorDetails = (createdById: string) => {
    const user = users.find(u => u.id === createdById);
    return user
      ? { name: user.name, role: user.role }
      : { name: 'Siswa RPL 1', role: 'Anggota' };
  };

  const handleDelete = (id: string) => {
    if (confirm('Hapus thread diskusi ini beserta seluruh komentarnya secara permanen?')) {
      startTransition(async () => {
        await deletePost(id);
      });
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5 pb-4 border-b border-slate-100 dark:border-slate-800">
        <MessageSquare className="h-4 w-4 text-indigo-500" />
        Moderasi Diskusi Forum Kelas
      </h3>

      <div className="space-y-4">
        {posts.length > 0 ? (
          posts.map((post) => {
            const author = getAuthorDetails(post.createdById);
            return (
              <div
                key={post.id}
                className="flex items-start justify-between p-4 rounded-2xl border border-slate-100 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-900/30 text-xs"
              >
                <div className="space-y-1.5 max-w-[80%]">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] text-slate-400">
                      Oleh: {author.name} ({author.role})
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm">{post.title}</h4>
                  <p className="text-slate-550 line-clamp-2">{post.content}</p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => handleDelete(post.id)}
                    disabled={isPending}
                    className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer disabled:opacity-50"
                    title="Hapus Thread"
                  >
                    <Trash className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-slate-400 py-6">
            Belum ada diskusi diposting.
          </div>
        )}
      </div>
    </div>
  );
}
