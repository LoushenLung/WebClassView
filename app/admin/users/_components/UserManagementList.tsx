'use client';

import React, { useState, useTransition } from 'react';
import { updateProfile, updateProfileRole, deleteProfile, createProfile } from '@/actions/profile.actions';
import { Profile } from '@/lib/db';
import { Shield, ShieldAlert, ShieldCheck, Trash, UserPlus, Save } from 'lucide-react';

interface UserManagementListProps {
  users: Profile[];
}

export default function UserManagementList({ users }: UserManagementListProps) {
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // New user form state
  const [newEmail, setNewEmail] = useState('');
  const [newFullName, setNewFullName] = useState('');
  const [newNickname, setNewNickname] = useState('');
  const [newStudentId, setNewStudentId] = useState('');
  const [newRole, setNewRole] = useState<'admin' | 'treasurer' | 'user'>('user');
  const [newClassRole, setNewClassRole] = useState('Anggota');

  // Edit inline states
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [editClassRole, setEditClassRole] = useState('');
  const [editStudentId, setEditStudentId] = useState('');

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const generatedId = 'usr-' + Math.random().toString(36).substr(2, 9);
      await createProfile({
        id: generatedId,
        email: newEmail,
        fullName: newFullName,
        nickname: newNickname,
        studentId: newStudentId,
        role: newRole,
        classRole: newClassRole,
        avatarUrl: `https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80`, // placeholder
        bioQuote: 'Halo, saya siswa RPL 1!',
        birthDate: '',
        whatsapp: '',
        instagram: '',
        linkedin: '',
        github: '',
        academicSkills: [],
        address: '',
        hideContact: false
      });

      // Reset
      setNewEmail('');
      setNewFullName('');
      setNewNickname('');
      setNewStudentId('');
      setNewRole('user');
      setNewClassRole('Anggota');
      setShowAddForm(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRoleChange = (userId: string, role: 'admin' | 'treasurer' | 'user') => {
    startTransition(async () => {
      await updateProfileRole(userId, role);
    });
  };

  const handleDeleteUser = (userId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus anggota kelas ini?')) {
      startTransition(async () => {
        await deleteProfile(userId);
      });
    }
  };

  const startEdit = (user: Profile) => {
    setEditingUserId(user.id);
    setEditClassRole(user.classRole);
    setEditStudentId(user.studentId || '');
  };

  const saveEdit = async (userId: string) => {
    startTransition(async () => {
      await updateProfile(userId, {
        classRole: editClassRole,
        studentId: editStudentId
      });
      setEditingUserId(null);
    });
  };

  return (
    <div className="space-y-6">
      {/* Header and User Creation Trigger */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-950 dark:text-white">Daftar Anggota Kelas</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer"
        >
          <UserPlus className="mr-1.5 h-4 w-4" />
          Tambah Anggota
        </button>
      </div>

      {/* Add User Form */}
      {showAddForm && (
        <form onSubmit={handleCreateUser} className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4 animate-in slide-in-from-top-2 duration-200">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white">Tambah Anggota Kelas Baru</h3>
          
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">Nama Lengkap</label>
              <input
                type="text"
                value={newFullName}
                onChange={(e) => setNewFullName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">Nama Panggilan</label>
              <input
                type="text"
                value={newNickname}
                onChange={(e) => setNewNickname(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">Email</label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                required
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">NISN / NIM</label>
              <input
                type="text"
                value={newStudentId}
                onChange={(e) => setNewStudentId(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">App Role</label>
              <select
                value={newRole}
                onChange={(e) => setNewRole(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              >
                <option value="user">Siswa (User)</option>
                <option value="treasurer">Bendahara (Treasurer)</option>
                <option value="admin">Pengurus / Admin</option>
              </select>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-bold text-slate-400">Jabatan Kelas</label>
              <input
                type="text"
                value={newClassRole}
                onChange={(e) => setNewClassRole(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Anggota, Ketua Kelas, Bendahara, dll"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 transition-colors"
            >
              Batal
            </button>
            <button
              type="submit"
              disabled={isLoading}
              className="inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 transition-colors disabled:opacity-50"
            >
              {isLoading ? 'Menambahkan...' : 'Simpan Anggota'}
            </button>
          </div>
        </form>
      )}

      {/* Users List Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {users.map((user) => {
          const isEditing = editingUserId === user.id;

          return (
            <div key={user.id} className="rounded-3xl border border-slate-200/50 bg-white p-5 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={user.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'}
                  alt={user.fullName}
                  className="h-12 w-12 rounded-full object-cover ring-2 ring-indigo-500/10"
                />
                <div>
                  <h3 className="font-bold text-slate-950 dark:text-white text-sm">{user.fullName}</h3>
                  <span className="text-[10px] text-slate-400 block">{user.email}</span>
                </div>
              </div>

              {/* Roles Edit Section */}
              <div className="space-y-2 border-t border-slate-100 pt-3 dark:border-slate-800 text-xs">
                {isEditing ? (
                  <div className="space-y-2">
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">Jabatan Kelas</label>
                      <input
                        type="text"
                        value={editClassRole}
                        onChange={(e) => setEditClassRole(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[9px] font-bold text-slate-400">NISN / NIM</label>
                      <input
                        type="text"
                        value={editStudentId}
                        onChange={(e) => setEditStudentId(e.target.value)}
                        className="w-full rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between">
                    <div>
                      <span className="font-bold text-slate-400 block text-[9px] uppercase">Jabatan</span>
                      <span className="font-semibold text-slate-700 dark:text-slate-300">{user.classRole}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-400 block text-[9px] uppercase">NISN / NIM</span>
                      <span className="font-mono text-slate-700 dark:text-slate-300">{user.studentId || '-'}</span>
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between border-t border-slate-50 pt-2.5 dark:border-slate-800/40">
                  <div className="flex items-center gap-1.5">
                    <Shield className="h-3.5 w-3.5 text-indigo-500" />
                    <select
                      value={user.role}
                      onChange={(e) => handleRoleChange(user.id, e.target.value as any)}
                      className="bg-transparent font-semibold text-slate-700 dark:text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="user">Siswa (User)</option>
                      <option value="treasurer">Bendahara</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <div className="flex gap-1.5">
                    {isEditing ? (
                      <button
                        onClick={() => saveEdit(user.id)}
                        className="p-1.5 rounded-lg text-emerald-500 hover:bg-emerald-500/10 transition-colors cursor-pointer"
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
                    <button
                      onClick={() => handleDeleteUser(user.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 transition-colors cursor-pointer"
                      title="Hapus Anggota"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
