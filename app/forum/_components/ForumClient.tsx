'use client';

import React, { useState, useTransition } from 'react';
import type { ForumPost, ForumComment } from '@/lib/types';
import { createPost, createComment, markCommentAsAnswer, deletePost } from '@/actions/forum.actions';
import { MessageSquare, CheckCircle2, Plus, ArrowLeft, Send, MessageCircle, Trash } from 'lucide-react';

type PostWithRelations = ForumPost & {
  comments: ForumComment[];
  author: { name: string; avatarUrl: string | null };
};

interface ForumClientProps {
  posts: PostWithRelations[];
  currentUserId: string;
}

export default function ForumClient({ posts, currentUserId }: ForumClientProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [commentContent, setCommentContent] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;
    startTransition(async () => {
      await createPost({ title, content });
      setTitle('');
      setContent('');
      setShowAddForm(false);
    });
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent || !selectedPostId) return;
    startTransition(async () => {
      await createComment({ postId: selectedPostId, content: commentContent });
      setCommentContent('');
    });
  };

  const handleToggleAnswer = (commentId: string) => {
    startTransition(async () => {
      await markCommentAsAnswer(commentId);
    });
  };

  const handleDeletePost = (id: string) => {
    if (!confirm('Hapus thread ini beserta seluruh komentarnya?')) return;
    startTransition(async () => {
      await deletePost(id);
      if (selectedPostId === id) setSelectedPostId(null);
    });
  };

  const activePost = posts.find((p) => p.id === selectedPostId);

  if (selectedPostId && activePost) {
    return (
      <div className="space-y-6 animate-in slide-in-from-left-2 duration-200">
        <button
          onClick={() => setSelectedPostId(null)}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
        >
          <ArrowLeft className="h-4 w-4" />
          Kembali ke Daftar Forum
        </button>

        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900 space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <img
                src={activePost.author.avatarUrl ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'}
                alt={activePost.author.name}
                className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/10"
              />
              <div>
                <h3 className="font-bold text-sm">{activePost.author.name}</h3>
                <span className="text-[10px] text-slate-400">{new Date(activePost.createdAt).toLocaleDateString('id-ID')}</span>
              </div>
            </div>
            {activePost.createdById === currentUserId && (
              <button
                onClick={() => handleDeletePost(activePost.id)}
                disabled={isPending}
                className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer disabled:opacity-50"
              >
                <Trash className="h-4 w-4" />
              </button>
            )}
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-bold">{activePost.title}</h2>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{activePost.content}</p>
          </div>

          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 pt-3 border-t border-slate-50 dark:border-slate-800/40">
            <MessageCircle className="h-4 w-4 text-indigo-500" />
            <span>{activePost.comments.length} Jawaban</span>
          </div>
        </div>

        <form onSubmit={handleCreateComment} className="flex gap-2 items-center">
          <input
            type="text"
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
            placeholder="Tulis tanggapan atau solusi Anda..."
            required
          />
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 text-white shadow shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>

        <div className="space-y-4">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">Semua Tanggapan</h3>
          {activePost.comments.length > 0 ? (
            activePost.comments.map((comm: ForumComment) => (
              <div
                key={comm.id}
                className={`rounded-2xl border p-4 text-xs space-y-2 bg-white dark:bg-slate-900/30 ${
                  comm.isAnswer
                    ? 'border-emerald-500/40'
                    : 'border-slate-100 dark:border-slate-800'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">{comm.createdById}</span>
                  <div className="flex items-center gap-2">
                    {comm.isAnswer && (
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        <CheckCircle2 className="h-3 w-3" />
                        Solusi
                      </span>
                    )}
                    {activePost.createdById === currentUserId && (
                      <button
                        onClick={() => handleToggleAnswer(comm.id)}
                        disabled={isPending}
                        className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border transition-colors cursor-pointer disabled:opacity-50 ${
                          comm.isAnswer
                            ? 'bg-rose-500/10 text-rose-500 border-rose-500/20 hover:bg-rose-500/20'
                            : 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20'
                        }`}
                      >
                        {comm.isAnswer ? 'Batal Solusi' : 'Tandai Solusi'}
                      </button>
                    )}
                  </div>
                </div>
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed whitespace-pre-wrap">{comm.content}</p>
              </div>
            ))
          ) : (
            <div className="text-center text-slate-400 py-6">Belum ada tanggapan.</div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <MessageSquare className="h-5 w-5 text-indigo-500" />
            Forum & Diskusi Akademik
          </h2>
          <p className="text-xs text-slate-400">Ajukan pertanyaan seputar materi atau tugas kelas.</p>
        </div>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Buat Thread
        </button>
      </div>

      {showAddForm && (
        <form onSubmit={handleCreatePost} className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 space-y-4 max-w-lg animate-in slide-in-from-top-2 duration-200">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">Tanyakan Sesuatu</h3>
          <div className="space-y-3 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Judul Diskusi</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Misal: Error Database Connection Supabase"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Detail Pertanyaan</label>
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                required
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowAddForm(false)} className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 cursor-pointer">
              Batal
            </button>
            <button type="submit" disabled={isPending} className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white hover:bg-indigo-500 disabled:opacity-50 cursor-pointer">
              Kirim
            </button>
          </div>
        </form>
      )}

      <div className="grid gap-6">
        {posts.length > 0 ? (
          posts.map((post) => {
            const hasSolved = post.comments.some((c: ForumComment) => c.isAnswer);
            return (
              <div
                key={post.id}
                onClick={() => setSelectedPostId(post.id)}
                className="group rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 cursor-pointer hover:scale-[1.005] hover:border-indigo-500/50 transition-all duration-200"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs">
                    <img
                      src={post.author.avatarUrl ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60'}
                      alt={post.author.name}
                      className="h-6 w-6 rounded-full object-cover"
                    />
                    <span className="font-semibold text-slate-800 dark:text-slate-200">{post.author.name}</span>
                    <span className="text-slate-400">· {new Date(post.createdAt).toLocaleDateString('id-ID')}</span>
                  </div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-base leading-snug group-hover:text-indigo-500 transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2">{post.content}</p>
                </div>
                <div className="mt-4 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-400">
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments.length} Tanggapan</span>
                  </div>
                  {hasSolved && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-[9px] font-bold text-emerald-500">
                      <CheckCircle2 className="h-3 w-3" />
                      Solved
                    </span>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <div className="text-center text-slate-400 py-12">Forum diskusi masih kosong.</div>
        )}
      </div>
    </div>
  );
}
