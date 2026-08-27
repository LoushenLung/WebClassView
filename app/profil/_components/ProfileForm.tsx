'use client';

import React, { useState } from 'react';
import { updateProfile } from '@/actions/profile.actions';
import { Save } from 'lucide-react';

interface ProfileFormProps {
  currentName: string;
  currentAvatarUrl: string | null;
}

export default function ProfileForm({ currentName, currentAvatarUrl }: ProfileFormProps) {
  const [name, setName] = useState(currentName);
  const [avatarUrl, setAvatarUrl] = useState(currentAvatarUrl ?? '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const result = await updateProfile({
        name,
        avatarUrl: avatarUrl || undefined,
      });

      if (result.success) {
        setMessage({ type: 'success', text: 'Profil berhasil diperbarui!' });
      } else {
        setMessage({ type: 'error', text: result.error });
      }
    } catch {
      setMessage({ type: 'error', text: 'Terjadi kesalahan sistem.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {message && (
        <div
          className={`p-4 rounded-xl text-xs font-bold ${
            message.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-500'
              : 'bg-rose-500/10 text-rose-500'
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400">Nama Lengkap</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
      </div>

      <div className="space-y-2">
        <label className="text-xs font-bold text-slate-400">URL Foto Profil (Opsional)</label>
        <input
          type="url"
          value={avatarUrl}
          onChange={(e) => setAvatarUrl(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="https://..."
        />
      </div>

      <div className="border-t border-slate-100 pt-6 dark:border-slate-800 flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-indigo-600 px-6 text-sm font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer disabled:opacity-50"
        >
          <Save className="mr-2 h-4 w-4" />
          {isLoading ? 'Menyimpan...' : 'Simpan Perubahan'}
        </button>
      </div>
    </form>
  );
}
