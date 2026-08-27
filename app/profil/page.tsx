import React from 'react';
import { getCurrentUser } from '@/lib/actions/guards';
import { redirect } from 'next/navigation';
import ProfileForm from './_components/ProfileForm';
import { Shield } from 'lucide-react';

export default async function ProfilePage() {
  const currentUser = await getCurrentUser();
  if (!currentUser) redirect('/login');

  return (
    <div className="mx-auto max-w-4xl space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Pengaturan Profil</h1>
        <p className="text-xs text-slate-400">Kelola nama dan foto profil Anda.</p>
      </div>

      <div className="grid gap-8 md:grid-cols-3">
        {/* Avatar card */}
        <div className="h-fit rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md text-center space-y-4">
          <div className="relative mx-auto h-28 w-28">
            <img
              src={currentUser.avatarUrl ?? 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=120&h=120'}
              alt={currentUser.name}
              className="h-full w-full rounded-full object-cover ring-4 ring-indigo-500/20"
            />
          </div>
          <div className="space-y-1">
            <h2 className="text-lg font-bold text-slate-950 dark:text-white">{currentUser.name}</h2>
            <p className="text-xs text-slate-400">{currentUser.email}</p>
          </div>
          <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <span className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-50 px-3 py-1.5 text-xs font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
              <Shield className="h-3.5 w-3.5" />
              <span className="capitalize">{currentUser.role}</span>
            </span>
          </div>
        </div>

        {/* Form */}
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md md:col-span-2">
          <ProfileForm currentName={currentUser.name} currentAvatarUrl={currentUser.avatarUrl} />
        </div>
      </div>
    </div>
  );
}
