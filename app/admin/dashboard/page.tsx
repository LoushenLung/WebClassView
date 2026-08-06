import React from 'react';
import Link from 'next/link';
import { 
  Users, 
  Wallet, 
  Calendar, 
  BookOpen, 
  Megaphone, 
  CheckSquare, 
  Image as ImageIcon, 
  MessageSquare,
  ArrowRight,
  TrendingUp,
  Activity,
  Plus
} from 'lucide-react';
import { getProfiles } from '@/actions/profile.actions';
import { getFinanceSummary, getTransactions } from '@/actions/finance.actions';
import { getSchedules } from '@/actions/schedule.actions';
import { getAnnouncements } from '@/actions/announcement.actions';
import { getAttendanceStats } from '@/actions/announcement.actions';

export default async function AdminDashboardPage() {
  const profiles = await getProfiles();
  const finance = await getFinanceSummary();
  const txs = await getTransactions();
  const schedules = await getSchedules();
  const announcements = await getAnnouncements();
  const attendance = await getAttendanceStats();

  const stats = [
    { name: 'Total Anggota', value: profiles.length, icon: Users, color: 'text-blue-500 bg-blue-500/10' },
    { name: 'Saldo Kas Kelas', value: `Rp ${finance.currentBalance.toLocaleString('id-ID')}`, icon: Wallet, color: 'text-emerald-500 bg-emerald-500/10' },
    { name: 'Tingkat Kehadiran', value: `${attendance.attendanceRate}%`, icon: CheckSquare, color: 'text-indigo-500 bg-indigo-500/10' },
    { name: 'Jadwal Aktif', value: schedules.length, icon: Calendar, color: 'text-amber-500 bg-amber-500/10' },
  ];

  const adminModules = [
    { name: 'Kelola Anggota & Role', desc: 'Approve registrasi, ubah jabatan kelas, dan edit biodata.', href: '/admin/users', icon: Users },
    { name: 'Kelola Keuangan / Kas', desc: 'Input transaksi pemasukan/pengeluaran & update tabel iuran.', href: '/admin/kas', icon: Wallet },
    { name: 'Kelola Jadwal & Tugas', desc: 'Atur jadwal pelajaran mingguan & buat tugas baru.', href: '/admin/jadwal', icon: Calendar },
    { name: 'Kelola Library Materi', desc: 'Unggah file modul pelajaran, slide presentasi, atau PDF.', href: '/admin/materi', icon: BookOpen },
    { name: 'Kelola Pengumuman', desc: 'Buat & sematkan pengumuman penting di halaman depan.', href: '/admin/pengumuman', icon: Megaphone },
    { name: 'Kelola Presensi', desc: 'Isi kehadiran manual atau rekap absensi harian.', href: '/admin/presensi', icon: CheckSquare },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Admin Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Admin Panel Utama</h1>
          <p className="text-xs text-slate-400">Kelola konten dan administrasi web kelas digital.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/" className="inline-flex h-9 items-center justify-center rounded-xl bg-slate-100 px-4 text-xs font-bold text-slate-800 hover:bg-slate-200 dark:bg-slate-850 dark:text-slate-200 dark:hover:bg-slate-800 transition-colors">
            Kembali ke Home
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">{stat.name}</span>
                <span className={`rounded-xl p-2 ${stat.color}`}>
                  <Icon className="h-4 w-4" />
                </span>
              </div>
              <div className="mt-4 text-2xl font-black text-slate-950 dark:text-white tracking-tight">
                {stat.value}
              </div>
            </div>
          );
        })}
      </div>

      {/* Management Grid */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-950 dark:text-white">Modul Manajemen</h2>
          <p className="text-xs text-slate-400">Pilih modul yang ingin Anda konfigurasi di bawah ini.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {adminModules.map((module) => {
            const Icon = module.icon;
            return (
              <Link 
                key={module.name} 
                href={module.href}
                className="group flex flex-col justify-between rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md hover:scale-[1.01] hover:border-indigo-500/50 dark:hover:border-indigo-500/50 transition-all duration-200"
              >
                <div>
                  <span className="inline-block rounded-2xl bg-indigo-50 p-3 text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                    <Icon className="h-6 w-6" />
                  </span>
                  <h3 className="mt-4 font-bold text-slate-950 dark:text-white text-base group-hover:text-indigo-500 transition-colors">
                    {module.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {module.desc}
                  </p>
                </div>
                <div className="mt-6 flex items-center text-xs font-bold text-indigo-500 group-hover:translate-x-1 transition-transform">
                  Buka Pengaturan
                  <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
