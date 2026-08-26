'use client';

import React, { useState, useTransition } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  Wallet,
  Calendar,
  BookOpen,
  Megaphone,
  CheckSquare,
  Image as ImageIcon,
  MessageSquare,
  User,
  Settings,
  Users,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Menu,
  X,
  Shield,
  LogOut,
} from 'lucide-react';
import { switchMockUser } from '@/actions/auth.actions';

interface SidebarProps {
  currentUser: {
    id: string;
    fullName: string;
    nickname?: string;
    role: 'admin' | 'treasurer' | 'user';
    classRole: string;
    avatarUrl?: string;
  };
  allUsers: Array<{
    id: string;
    fullName: string;
    nickname?: string;
    role: string;
    classRole: string;
    avatarUrl?: string;
  }>;
}

const userNavItems = [
  { name: 'Beranda', href: '/', icon: Home },
  { name: 'Keuangan Kas', href: '/kas', icon: Wallet },
  { name: 'Jadwal & Tugas', href: '/jadwal', icon: Calendar },
  { name: 'Materi & Modul', href: '/materi', icon: BookOpen },
  { name: 'Pengumuman', href: '/pengumuman', icon: Megaphone },
  { name: 'Presensi', href: '/presensi', icon: CheckSquare },
  { name: 'Galeri Momen', href: '/galeri', icon: ImageIcon },
  { name: 'Forum Diskusi', href: '/forum', icon: MessageSquare },
  { name: 'Profil Saya', href: '/profil', icon: User },
];

const adminNavItems = [
  { name: 'Admin Dashboard', href: '/admin/dashboard', icon: Settings },
  { name: 'Kelola Kas', href: '/admin/kas', icon: Wallet },
  { name: 'Kelola Jadwal', href: '/admin/jadwal', icon: Calendar },
  { name: 'Kelola Materi', href: '/admin/materi', icon: BookOpen },
  { name: 'Kelola Pengumuman', href: '/admin/pengumuman', icon: Megaphone },
  { name: 'Kelola Presensi', href: '/admin/presensi', icon: CheckSquare },
  { name: 'Kelola Galeri', href: '/admin/galeri', icon: ImageIcon },
  { name: 'Moderasi Forum', href: '/admin/forum', icon: MessageSquare },
  { name: 'Kelola Anggota', href: '/admin/users', icon: Users },
];

const roleColors: Record<string, string> = {
  admin: 'bg-rose-500/10 text-rose-400 border-rose-500/20',
  treasurer: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
  user: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
};

export default function Sidebar({ currentUser, allUsers }: SidebarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [adminExpanded, setAdminExpanded] = useState(false);
  const [userSwitcherOpen, setUserSwitcherOpen] = useState(false);

  const handleUserSwitch = (userId: string) => {
    setUserSwitcherOpen(false);
    setMobileOpen(false);
    startTransition(async () => {
      await switchMockUser(userId);
      window.location.reload();
    });
  };

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href);

  const SidebarContent = () => (
    <div className="flex h-full flex-col">
      {/* ── Logo ── */}
      <div className="flex h-16 shrink-0 items-center gap-2.5 border-b border-slate-800/60 px-5">
        <Sparkles className="h-6 w-6 text-indigo-400 animate-pulse" />
        <div>
          <span className="block bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent">
            RPL 1
          </span>
          <span className="block text-[9px] text-slate-500 -mt-0.5 tracking-widest uppercase">2026/2027</span>
        </div>
      </div>

      {/* ── Scrollable nav body ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1 custom-scrollbar">

        {/* User Nav */}
        <p className="px-2 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-600">Menu Utama</p>
        {userNavItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                active
                  ? 'bg-indigo-600/20 text-indigo-400 shadow-sm shadow-indigo-500/10'
                  : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
              }`}
            >
              <Icon
                className={`h-4.5 w-4.5 shrink-0 transition-colors ${
                  active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'
                }`}
                size={18}
              />
              <span>{item.name}</span>
              {active && (
                <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400" />
              )}
            </Link>
          );
        })}

        {/* Admin / Management section */}
        <div className="pt-4">
          <button
            onClick={() => setAdminExpanded(!adminExpanded)}
            className="flex w-full items-center justify-between px-2 mb-2 text-[9px] font-bold uppercase tracking-widest text-slate-600 hover:text-slate-400 transition-colors cursor-pointer"
          >
            <span>Manajemen Admin</span>
            <ChevronRight
              size={12}
              className={`transition-transform duration-200 ${adminExpanded ? 'rotate-90' : ''}`}
            />
          </button>

          {adminExpanded && (
            <div className="space-y-0.5 animate-in slide-in-from-top-1 duration-200">
              {adminNavItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-semibold transition-all duration-150 ${
                      active
                        ? 'bg-rose-600/15 text-rose-400'
                        : 'text-slate-500 hover:bg-slate-800/60 hover:text-slate-300'
                    }`}
                  >
                    <Icon
                      size={16}
                      className={`shrink-0 ${active ? 'text-rose-400' : 'text-slate-600 group-hover:text-slate-400'}`}
                    />
                    <span className="text-xs">{item.name}</span>
                    {active && <span className="ml-auto h-1.5 w-1.5 rounded-full bg-rose-400" />}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* ── User Switcher at bottom ── */}
      <div className="shrink-0 border-t border-slate-800/60 p-3">
        <div className="relative">
          <button
            onClick={() => setUserSwitcherOpen(!userSwitcherOpen)}
            className="flex w-full items-center gap-3 rounded-2xl border border-slate-800/60 bg-slate-900/60 p-3 text-left hover:border-slate-700 hover:bg-slate-800/60 transition-all cursor-pointer"
          >
            <img
              src={
                currentUser.avatarUrl ||
                'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
              }
              alt={currentUser.fullName}
              className="h-9 w-9 rounded-full object-cover ring-2 ring-indigo-500/20 shrink-0"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-100 truncate">
                {currentUser.nickname || currentUser.fullName}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className={`inline-block rounded-full border px-1.5 py-0 text-[9px] font-bold capitalize ${
                    roleColors[currentUser.role] || roleColors.user
                  }`}
                >
                  {currentUser.role}
                </span>
                <span className="text-[9px] text-slate-500 truncate">{currentUser.classRole}</span>
              </div>
            </div>
            <ChevronDown
              size={14}
              className={`shrink-0 text-slate-500 transition-transform duration-200 ${userSwitcherOpen ? 'rotate-180' : ''}`}
            />
          </button>

          {/* Dev user switcher popup */}
          {userSwitcherOpen && (
            <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-slate-700/60 bg-slate-900 p-2 shadow-2xl shadow-black/40 animate-in slide-in-from-bottom-2 duration-150">
              <p className="px-2.5 py-1.5 text-[9px] font-bold uppercase tracking-widest text-slate-600">
                🛠 Dev: Switch User
              </p>
              {allUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleUserSwitch(u.id)}
                  disabled={isPending}
                  className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-left transition-colors cursor-pointer disabled:opacity-50 ${
                    currentUser.id === u.id
                      ? 'bg-indigo-600/20 text-indigo-300'
                      : 'text-slate-400 hover:bg-slate-800 hover:text-slate-100'
                  }`}
                >
                  <img
                    src={
                      u.avatarUrl ||
                      'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=60&h=60'
                    }
                    alt={u.fullName}
                    className="h-7 w-7 rounded-full object-cover shrink-0"
                  />
                  <div className="min-w-0">
                    <p className="text-xs font-bold truncate">{u.fullName}</p>
                    <p className="text-[9px] text-slate-500 capitalize">
                      {u.role} · {u.classRole}
                    </p>
                  </div>
                  {currentUser.id === u.id && (
                    <span className="ml-auto h-1.5 w-1.5 rounded-full bg-indigo-400 shrink-0" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* ── Desktop Sidebar (fixed left) ── */}
      <aside className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 lg:left-0 lg:z-40 bg-[#0B0B1A] border-r border-slate-800/60">
        <SidebarContent />
      </aside>

      {/* ── Mobile Top Bar ── */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex h-14 items-center justify-between border-b border-slate-800/60 bg-[#0B0B1A]/95 backdrop-blur-md px-4">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-indigo-400" />
          <span className="bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-base font-extrabold tracking-tight text-transparent">
            RPL 1
          </span>
        </div>

        <div className="flex items-center gap-2">
          {/* Current user badge */}
          <img
            src={
              currentUser.avatarUrl ||
              'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'
            }
            alt={currentUser.fullName}
            className="h-7 w-7 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <span className="text-xs font-bold text-slate-200">
            {currentUser.nickname || currentUser.fullName}
          </span>

          <button
            onClick={() => setMobileOpen(true)}
            className="ml-1 flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors cursor-pointer"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>

      {/* ── Mobile Sidebar Overlay ── */}
      {mobileOpen && (
        <>
          {/* Backdrop */}
          <div
            className="lg:hidden fixed inset-0 z-50 bg-black/70 backdrop-blur-sm animate-in fade-in duration-200"
            onClick={() => setMobileOpen(false)}
          />
          {/* Drawer */}
          <div className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#0B0B1A] border-r border-slate-800/60 animate-in slide-in-from-left-2 duration-200">
            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute right-3 top-3.5 flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-800 hover:text-slate-200 transition-colors cursor-pointer"
            >
              <X size={18} />
            </button>
            <SidebarContent />
          </div>
        </>
      )}
    </>
  );
}
