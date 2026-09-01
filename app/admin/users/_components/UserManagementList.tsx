'use client';

import React, { useState, useTransition } from 'react';
import type { User } from '@/lib/types';
import { updateProfile } from '@/actions/profile.actions';
import { Shield, Save } from 'lucide-react';

interface UserManagementListProps {
  users: User[];
}

export default function UserManagementList({ users }: UserManagementListProps) {
  const [isPending, startTransition] = useTransition();

  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');

  const startEdit = (user: User) => {
    setEditingUserId(user.id);
    setEditName(user.name);
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const saveEdit = (_userId: string) => {
    startTransition(async () => {
      await updateProfile({ name: editName });
      setEditingUserId(null);
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Daftar Anggota Kelas</h2>
        <p className="text-xs text-slate-400">
          Manajemen akun dilakukan melalui Supabase Auth — user dibuat otomatis saat login pertama kali.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const isEditing = editingUserId === user.id;

          return (
            <div
              key={user.id}
              className="rounded-3xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4"
            >
              <div className="flex items-center gap-3">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    user.avatarUrl ||
                    'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
                  }
                  alt={user.name}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/10"
                />
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">{user.name}</h3>
                  <span className="text-[10px] text-slate-400 block">{user.email}</span>
                </div>
              </div>

              <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
                {isEditing ? (
                  <div className="space-y-1">
                    <label className="text-[9px] font-bold text-slate-400">Nama</label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                    />
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-400 block text-[9px] uppercase">Role</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300 capitalize">{user.role}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-400 block text-[9px] uppercase">Bergabung</span>
                      <span className="text-slate-500">
                        {new Date(user.createdAt).toLocaleDateString('id-ID', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })}
                      </span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 dark:border-slate-800/40">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-indigo-500" />
                    <span className="capitalize font-semibold text-slate-700 dark:text-slate-300">{user.role}</span>
                  </div>

                  <div className="flex gap-1.5">
                    {isEditing ? (
                      <button
                        onClick={() => saveEdit(user.id)}
                        disabled={isPending}
                        className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer disabled:opacity-50"
                        title="Simpan"
                      >
                        <Save className="h-3.5 w-3.5" />
                      </button>
                    ) : (
                      <button
                        onClick={() => startEdit(user)}
                        className="px-2 py-1 rounded-lg text-indigo-500 hover:bg-indigo-500/10 text-[10px] font-bold transition-colors cursor-pointer"
                      >
                        Edit
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {users.length === 0 && (
          <div className="col-span-full text-center text-slate-400 py-12">
            Belum ada anggota terdaftar.
          </div>
        )}
      </div>
    </div>
  );
}
