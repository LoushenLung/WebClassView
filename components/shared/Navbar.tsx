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
  Sparkles
} from 'lucide-react';
import { switchMockUser } from '@/actions/auth.actions';

interface NavbarProps {
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
    role: string;
    classRole: string;
  }>;
}

export default function Navbar({ currentUser, allUsers }: NavbarProps) {
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [adminMenuOpen, setAdminMenuOpen] = useState(false);

  const isAdmin = currentUser.role === 'admin';
  const isTreasurer = currentUser.role === 'treasurer';
  const isManagement = isAdmin || isTreasurer;

  const userNavItems = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Kas', href: '/kas', icon: Wallet },
    { name: 'Jadwal', href: '/jadwal', icon: Calendar },
    { name: 'Materi', href: '/materi', icon: BookOpen },
    { name: 'Pengumuman', href: '/pengumuman', icon: Megaphone },
    { name: 'Presensi', href: '/presensi', icon: CheckSquare },
    { name: 'Galeri', href: '/galeri', icon: ImageIcon },
    { name: 'Forum', href: '/forum', icon: MessageSquare },
    { name: 'Profil', href: '/profil', icon: User },
  ];

  const adminNavItems = [
    { name: 'Admin Dashboard', href: '/admin/dashboard', icon: Settings },
    { name: 'Kelola Kas', href: '/admin/kas', icon: Wallet },
    { name: 'Kelola Jadwal', href: '/admin/jadwal', icon: Calendar },
    { name: 'Kelola Materi', href: '/admin/materi', icon: BookOpen },
    { name: 'Kelola Pengumuman', href: '/admin/pengumuman', icon: Megaphone },
    { name: 'Kelola Presensi', href: '/admin/presensi', icon: CheckSquare },
    { name: 'Kelola Galeri', href: '/admin/galeri', icon: ImageIcon },
    { name: 'Kelola Anggota', href: '/admin/users', icon: Users },
  ];

  const handleUserSwitch = (userId: string) => {
    setDropdownOpen(false);
    startTransition(async () => {
      await switchMockUser(userId);
      window.location.reload();
    });
  };

  return (
    <>
      {/* Desktop Header */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200/40 bg-white/75 backdrop-blur-md dark:border-slate-800/40 dark:bg-slate-950/75 transition-colors duration-200">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
              <Sparkles className="h-6 w-6 animate-pulse" />
              <span className="bg-gradient-to-r from-indigo-500 to-indigo-600 dark:from-indigo-400 dark:to-indigo-500 bg-clip-text text-transparent text-xl font-extrabold tracking-tight">RPL 1</span>
            </Link>

            <nav className="hidden lg:flex items-center gap-1">
              {userNavItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm font-semibold transition-all duration-200 ${
                      isActive 
                        ? 'bg-indigo-50 text-indigo-600 dark:bg-indigo-950/50 dark:text-indigo-400' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {item.name}
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-3">
            {/* Admin Menu Trigger (For easy nav to admin pages without role guard) */}
            <div className="relative">
              <button
                onClick={() => setAdminMenuOpen(!adminMenuOpen)}
                onBlur={() => setTimeout(() => setAdminMenuOpen(false), 200)}
                className="flex items-center gap-1.5 rounded-full bg-slate-100 px-3.5 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 transition-all duration-200 cursor-pointer"
              >
                <Settings className="h-3.5 w-3.5" />
                <span>Admin Actions</span>
                <ChevronDown className="h-3 w-3" />
              </button>
              {adminMenuOpen && (
                <div className="absolute right-0 mt-2 w-56 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Admin / Treasurer views
                  </div>
                  {adminNavItems.map((item) => {
                    const Icon = item.icon;
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
                      >
                        <Icon className="h-4 w-4 text-indigo-500" />
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Dev Switcher */}
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                onBlur={() => setTimeout(() => setDropdownOpen(false), 200)}
                className="flex items-center gap-2 rounded-full border border-indigo-200/50 bg-indigo-50/50 pl-2.5 pr-4 py-1.5 text-sm font-medium text-indigo-700 hover:bg-indigo-50 dark:border-indigo-900/50 dark:bg-indigo-950/20 dark:text-indigo-300 dark:hover:bg-indigo-950/40 transition-all duration-200 cursor-pointer"
              >
                <img
                  src={currentUser.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'}
                  alt={currentUser.fullName}
                  className="h-6 w-6 rounded-full object-cover ring-2 ring-indigo-500/20"
                />
                <div className="hidden sm:block text-left text-xs leading-none">
                  <div className="font-bold text-slate-900 dark:text-white">{currentUser.nickname || currentUser.fullName}</div>
                  <div className="text-[10px] text-slate-400 capitalize">{currentUser.role} • {currentUser.classRole}</div>
                </div>
                <ChevronDown className="h-3 w-3 text-indigo-500" />
              </button>

              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 origin-top-right rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-800 dark:bg-slate-900 animate-in fade-in slide-in-from-top-1 duration-150">
                  <div className="px-2.5 py-1.5 text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                    Switch Test User ({isPending ? 'Saving...' : 'Dev Session'})
                  </div>
                  {allUsers.map((u) => (
                    <button
                      key={u.id}
                      onClick={() => handleUserSwitch(u.id)}
                      className={`flex w-full items-center gap-3 rounded-lg px-2.5 py-2 text-left text-sm transition-colors cursor-pointer ${
                        currentUser.id === u.id 
                          ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-400' 
                          : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                      }`}
                    >
                      <div className="font-semibold">
                        <div>{u.fullName}</div>
                        <div className="text-[10px] font-medium text-slate-400 capitalize">{u.role} ({u.classRole})</div>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Bottom Navigation (Glassmorphic) */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200/40 bg-white/80 backdrop-blur-lg lg:hidden dark:border-slate-800/40 dark:bg-slate-950/80 transition-colors pb-safe">
        <div className="flex h-16 items-center justify-around px-2">
          {userNavItems.slice(0, 5).map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'text-indigo-600 dark:text-indigo-400 scale-105' 
                    : 'text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-bold tracking-tight">{item.name}</span>
              </Link>
            );
          })}
          
          {/* More mobile nav trigger */}
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex flex-col items-center justify-center gap-1 w-12 h-12 rounded-xl text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white cursor-pointer"
          >
            <User className="h-5 w-5" />
            <span className="text-[10px] font-bold tracking-tight">Lainnya</span>
          </button>
        </div>

        {/* Mobile menu popup */}
        {dropdownOpen && (
          <div className="absolute bottom-20 right-4 w-56 rounded-2xl border border-slate-200 bg-white/95 p-2 shadow-2xl backdrop-blur-md dark:border-slate-800 dark:bg-slate-900/95 animate-in slide-in-from-bottom-2 duration-150">
            <div className="px-2 py-1 text-[9px] font-bold text-slate-400 uppercase tracking-wider">Navigasi Tambahan</div>
            {userNavItems.slice(5).map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setDropdownOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                  <Icon className="h-4 w-4 text-indigo-500" />
                  {item.name}
                </Link>
              );
            })}
          </div>
        )}
      </nav>
    </>
  );
}
