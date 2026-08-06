'use client';

import React, { useState, useTransition } from 'react';
import { ForumPost, ForumComment, Profile } from '@/lib/db';
import { 
  createForumPost, 
  upvoteForumPost, 
  createForumComment, 
  markCommentAsAnswer 
} from '@/actions/gallery.actions';
import { 
  MessageSquare, 
  ThumbsUp, 
  CheckCircle2, 
  User, 
  Calendar, 
  Plus, 
  ArrowLeft,
  Send,
  MessageCircle
} from 'lucide-react';

interface ForumClientProps {
  posts: ForumPost[];
  comments: ForumComment[];
  profiles: Profile[];
  currentUserId: string;
}

export default function ForumClient({ 
  posts, 
  comments, 
  profiles, 
  currentUserId 
}: ForumClientProps) {
  const [isPending, startTransition] = useTransition();
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form states
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [subjectName, setSubjectName] = useState('Umum');

  const [commentContent, setCommentContent] = useState('');

  const getUserDetails = (userId: string) => {
    const prof = profiles.find(p => p.id === userId);
    return prof ? { fullName: prof.fullName, classRole: prof.classRole, avatarUrl: prof.avatarUrl } : { fullName: 'Siswa RPL 1', classRole: 'Anggota', avatarUrl: '' };
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    startTransition(async () => {
      await createForumPost({
        title,
        content,
        subjectName: subjectName || undefined
      });
      // reset
      setTitle('');
      setContent('');
      setSubjectName('Umum');
      setShowAddForm(false);
    });
  };

  const handleUpvote = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    startTransition(async () => {
      await upvoteForumPost(id);
    });
  };

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentContent || !selectedPostId) return;

    startTransition(async () => {
      await createForumComment(selectedPostId, commentContent);
      setCommentContent('');
    });
  };

  const handleToggleAnswer = (commentId: string) => {
    if (!selectedPostId) return;
    startTransition(async () => {
      await markCommentAsAnswer(selectedPostId, commentId);
    });
  };

  const activePost = posts.find(p => p.id === selectedPostId);
  const activePostComments = comments.filter(c => c.postId === selectedPostId);
  const activePostAuthor = activePost ? getUserDetails(activePost.createdById) : null;

  return (
    <div className="space-y-6">
      {selectedPostId ? (
        /* Thread Detail View */
        <div className="space-y-6 animate-in slide-in-from-left-2 duration-200">
          <button
            onClick={() => setSelectedPostId(null)}
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 dark:hover:text-white cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" />
            Kembali ke Daftar Forum
          </button>

          {activePost && (
            <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900 space-y-6">
              {/* Post Header */}
              <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-3">
                  <img
                    src={activePostAuthor?.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'}
                    alt={activePostAuthor?.fullName}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/10"
                  />
                  <div>
                    <h3 className="font-bold text-sm leading-none">{activePostAuthor?.fullName}</h3>
                    <span className="text-[10px] text-slate-400 mt-1 block">{activePostAuthor?.classRole}</span>
                  </div>
                </div>

                <span className="rounded-full bg-indigo-50 px-2.5 py-0.5 text-[9px] font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400 uppercase tracking-tight">
                  {activePost.subjectName || 'Umum'}
                </span>
              </div>

              {/* Post Body */}
              <div className="space-y-3">
                <h2 className="text-lg font-bold leading-tight">{activePost.title}</h2>
                <p className="text-xs text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-wrap">
                  {activePost.content}
                </p>
              </div>

              {/* Upvote & Comment counts */}
              <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 pt-3 border-t border-slate-50 dark:border-slate-800/40">
                <button
                  onClick={(e) => handleUpvote(activePost.id, e)}
                  className="flex items-center gap-1.5 hover:text-indigo-500 cursor-pointer"
                >
                  <ThumbsUp className="h-4 w-4" />
                  <span>{activePost.upvotes} Upvotes</span>
                </button>
                <div className="flex items-center gap-1.5">
                  <MessageCircle className="h-4 w-4 text-indigo-500" />
                  <span>{activePostComments.length} Jawaban</span>
                </div>
              </div>
            </div>
          )}

          {/* Comment Thread Form */}
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

          {/* Comments List */}
          <div className="space-y-4 pt-4 border-t border-slate-150 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white">Semua Tanggapan</h3>

            {activePostComments.length > 0 ? (
              activePostComments.map((comm) => {
                const commentUser = getUserDetails(comm.createdById);
                const isPostAuthor = activePost?.createdById === currentUserId;

                return (
                  <div 
                    key={comm.id} 
                    className={`rounded-2xl border p-4 backdrop-blur-md text-xs space-y-3 bg-white dark:bg-slate-900/30 ${
                      comm.isAnswer 
                        ? 'border-emerald-500/40 bg-emerald-50/5 dark:bg-emerald-950/5' 
                        : 'border-slate-100 dark:border-slate-850'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <img
                          src={commentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60'}
                          alt={commentUser.fullName}
                          className="h-6 w-6 rounded-full object-cover"
                        />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white leading-none block">{commentUser.fullName}</span>
                          <span className="text-[9px] text-slate-400 mt-0.5 block">{commentUser.classRole}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {comm.isAnswer && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[9px] font-bold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-450 uppercase tracking-wider">
                            <CheckCircle2 className="h-3 w-3" />
                            Solusi Terverifikasi
                          </span>
                        )}

                        {isPostAuthor && (
                          <button
                            onClick={() => handleToggleAnswer(comm.id)}
                            className={`rounded-lg px-2.5 py-1 text-[10px] font-bold border transition-colors cursor-pointer ${
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

                    <p className="text-slate-650 dark:text-slate-350 leading-relaxed whitespace-pre-wrap">
                      {comm.content}
                    </p>
                  </div>
                );
              })
            ) : (
              <div className="text-center text-slate-400 py-6">
                Belum ada tanggapan untuk diskusi ini.
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Posts Listing View */
        <div className="space-y-6 animate-in fade-in duration-200">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
                <MessageSquare className="h-5 w-5 text-indigo-500" />
                Forum & Diskusi Akademik
              </h2>
              <p className="text-xs text-slate-400">Ajukan pertanyaan seputar tugas, materi kuliah, atau bahas topik umum kelas.</p>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer"
            >
              <Plus className="mr-1.5 h-4 w-4" />
              Buat Thread
            </button>
          </div>

          {/* Add Thread Form */}
          {showAddForm && (
            <form onSubmit={handleCreatePost} className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4 max-w-lg animate-in slide-in-from-top-2 duration-200">
              <h3 className="text-sm font-bold text-slate-950 dark:text-white">Tanyakan Sesuatu</h3>
              
              <div className="space-y-3 text-xs">
                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Tag / Kategori Mapel</label>
                  <input
                    type="text"
                    value={subjectName}
                    onChange={(e) => setSubjectName(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="Misal: Pemrograman Web, Matematika, Umum"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-bold text-slate-400">Judul Diskusi</label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
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
                    className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    placeholder="Tulis pertanyaan Anda secara jelas, sertakan link eror jika ada..."
                    required
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors disabled:opacity-50 cursor-pointer"
                >
                  Kirim Diskusi
                </button>
              </div>
            </form>
          )}

          {/* Threads Feed Grid */}
          <div className="grid gap-6">
            {posts.length > 0 ? (
              posts.map((post) => {
                const author = getUserDetails(post.createdById);
                const postCommentsCount = comments.filter(c => c.postId === post.id).length;
                const hasSolved = comments.some(c => c.postId === post.id && c.isAnswer);

                return (
                  <div
                    key={post.id}
                    onClick={() => setSelectedPostId(post.id)}
                    className="group rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md cursor-pointer hover:scale-[1.005] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-4">
                      {/* Thread Top Info */}
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2">
                          <img
                            src={author.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60'}
                            alt={author.fullName}
                            className="h-6 w-6 rounded-full object-cover"
                          />
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {author.fullName} • {author.classRole}
                          </span>
                        </div>
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500 dark:bg-slate-850 dark:text-slate-400 uppercase tracking-tight">
                          {post.subjectName || 'Umum'}
                        </span>
                      </div>

                      {/* Header title */}
                      <div className="space-y-1">
                        <h3 className="font-bold text-slate-950 dark:text-white text-base leading-snug group-hover:text-indigo-500 transition-colors">
                          {post.title}
                        </h3>
                        <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                          {post.content}
                        </p>
                      </div>
                    </div>

                    {/* Footer Actions / Stats */}
                    <div className="mt-6 border-t border-slate-100 pt-4 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-450 dark:text-slate-400">
                      <div className="flex items-center gap-4">
                        <button
                          onClick={(e) => handleUpvote(post.id, e)}
                          className="flex items-center gap-1.5 hover:text-indigo-500 transition-colors cursor-pointer"
                        >
                          <ThumbsUp className="h-4 w-4" />
                          <span>{post.upvotes} Upvotes</span>
                        </button>
                        <div className="flex items-center gap-1.5">
                          <MessageSquare className="h-4 w-4" />
                          <span>{postCommentsCount} Tanggapan</span>
                        </div>
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
              <div className="text-center text-slate-400 py-12">
                Forum diskusi masih kosong.
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
