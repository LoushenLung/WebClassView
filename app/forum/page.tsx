import React from 'react';
import { getForumPosts, getForumComments } from '@/actions/gallery.actions';
import { getProfiles } from '@/actions/profile.actions';
import { getMockSession } from '@/actions/auth.actions';
import ForumClient from './_components/ForumClient';

export default async function ForumPage() {
  const posts = await getForumPosts();
  const profiles = await getProfiles();
  const currentUser = await getMockSession();
  
  // Since we load comments, we can load all comments. For file db we can just load all comments.
  const dbComments = await getForumComments(''); // Empty string will return all inside implementation if we modify action, let's see.
  // Oh! In actions/gallery.actions.ts:
  // export async function getForumComments(postId: string) {
  //   const db = getDb();
  //   return db.forumComments.filter(c => c.postId === postId);
  // }
  // Wait, if it takes a postId, let's look at the action. We can change or retrieve all comments instead by reading from the DB file inside our page.tsx, or we can update actions to return all comments if postId is empty or if we create an getForumCommentsAll function. Let's look at gallery.actions.ts: it filters by c.postId === postId.
  // Since we want to pass all comments, let's import getDb in page.tsx or modify actions/gallery.actions.ts to support loading all.
  // Since page.tsx is server-side, it is totally fine to import getDb() directly here to read comments! Let's do that to avoid modifying other files.
  
  const { getDb } = require('@/lib/db');
  const db = getDb();
  const allComments = db.forumComments;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <ForumClient 
          posts={posts} 
          comments={allComments} 
          profiles={profiles} 
          currentUserId={currentUser.id} 
        />
      </div>
    </div>
  );
}
