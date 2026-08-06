'use server';

import { getDb, saveDb, GalleryPost, ForumPost, ForumComment } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getMockSession } from './auth.actions';

// --- Gallery ---
export async function getGalleryPosts() {
  const db = getDb();
  return [...db.galleryPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createGalleryPost(data: {
  albumName: string;
  imageUrl: string;
  description?: string;
}) {
  const session = await getMockSession();
  const db = getDb();
  const newPost: GalleryPost = {
    id: 'gal-' + Math.random().toString(36).substr(2, 9),
    albumName: data.albumName,
    imageUrl: data.imageUrl,
    description: data.description,
    uploadedById: session.id,
    createdAt: new Date().toISOString()
  };
  db.galleryPosts.push(newPost);
  saveDb(db);
  revalidatePath('/galeri');
  revalidatePath('/admin/galeri');
  return { success: true };
}

export async function deleteGalleryPost(id: string) {
  const db = getDb();
  db.galleryPosts = db.galleryPosts.filter(g => g.id !== id);
  saveDb(db);
  revalidatePath('/galeri');
  revalidatePath('/admin/galeri');
  return { success: true };
}

// --- Forum ---
export async function getForumPosts() {
  const db = getDb();
  return [...db.forumPosts].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function createForumPost(data: {
  title: string;
  content: string;
  subjectName?: string;
}) {
  const session = await getMockSession();
  const db = getDb();
  const newPost: ForumPost = {
    id: 'forum-' + Math.random().toString(36).substr(2, 9),
    title: data.title,
    content: data.content,
    subjectName: data.subjectName,
    createdById: session.id,
    createdAt: new Date().toISOString(),
    upvotes: 0
  };
  db.forumPosts.push(newPost);
  saveDb(db);
  revalidatePath('/forum');
  return { success: true };
}

export async function upvoteForumPost(id: string) {
  const db = getDb();
  const post = db.forumPosts.find(p => p.id === id);
  if (post) {
    post.upvotes += 1;
    saveDb(db);
    revalidatePath('/forum');
  }
  return { success: true };
}

export async function deleteForumPost(id: string) {
  const db = getDb();
  db.forumPosts = db.forumPosts.filter(p => p.id !== id);
  db.forumComments = db.forumComments.filter(c => c.postId !== id);
  saveDb(db);
  revalidatePath('/forum');
  revalidatePath('/admin/forum');
  return { success: true };
}

export async function getForumComments(postId: string) {
  const db = getDb();
  return db.forumComments.filter(c => c.postId === postId);
}

export async function createForumComment(postId: string, content: string) {
  const session = await getMockSession();
  const db = getDb();
  const newComment: ForumComment = {
    id: 'comm-' + Math.random().toString(36).substr(2, 9),
    postId,
    content,
    createdById: session.id,
    createdAt: new Date().toISOString(),
    isAnswer: false
  };
  db.forumComments.push(newComment);
  saveDb(db);
  revalidatePath('/forum');
  return { success: true };
}

export async function markCommentAsAnswer(postId: string, commentId: string) {
  const db = getDb();
  // Clear any existing answers on this post
  db.forumComments.forEach(c => {
    if (c.postId === postId) {
      c.isAnswer = c.id === commentId ? !c.isAnswer : false;
    }
  });
  saveDb(db);
  revalidatePath('/forum');
  return { success: true };
}
