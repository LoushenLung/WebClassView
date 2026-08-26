import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Wallet, 
  Megaphone, 
  Users, 
  Clock, 
  CheckCircle,
  FileText,
  AlertCircle,
  ExternalLink,
  MessageCircle,
  Sparkles
} from 'lucide-react';
import { getMockSession } from '@/actions/auth.actions';
import { getSchedules } from '@/actions/schedule.actions';
import { getAnnouncements } from '@/actions/announcement.actions';
import { getFinanceSummary } from '@/actions/finance.actions';
import { getAttendanceStats } from '@/actions/announcement.actions';
import { getProfiles } from '@/actions/profile.actions';

export default async function HomePage() {
  const currentUser = await getMockSession();
  const schedules = await getSchedules();
  const announcements = await getAnnouncements();
  const finance = await getFinanceSummary();
  const attendance = await getAttendanceStats();
  const profiles = await getProfiles();

  // Find org members for chart
  const classRolesOrder = ['Ketua Kelas', 'Wakil Ketua Kelas', 'Sekretaris', 'Bendahara'];
  const orgMembers = profiles
    .filter(p => p.classRole !== 'Anggota')
    .sort((a, b) => {
      const idxA = classRolesOrder.indexOf(a.classRole);
      const idxB = classRolesOrder.indexOf(b.classRole);
      if (idxA === -1) return 1;
      if (idxB === -1) return -1;
      return idxA - idxB;
    });

  // Simple countdown to UTS (let's assume it's Oct 12, 2026)
  const targetDate = new Date('2026-10-12T08:00:00');
  const now = new Date();
  const diffTime = targetDate.getTime() - now.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // Determine current ongoing schedule
  const daysOfWeek = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const currentDayName = daysOfWeek[now.getDay()] || 'Senin';
  const todaySchedules = schedules.filter(s => s.day === currentDayName);

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* 1. Hero Section */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0B0B1A] via-[#15152D] to-purple-950 px-6 py-12 text-white shadow-[0_0_40px_rgba(138,43,226,0.15)] border border-purple-500/20 md:px-12 md:py-16">
        <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-purple-500/20 blur-3xl"></div>
        <div className="absolute -left-16 -bottom-16 h-64 w-64 rounded-full bg-cyan-500/10 blur-3xl"></div>

        <div className="relative z-10 grid gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-purple-500/20 px-3.5 py-1 text-xs font-semibold text-purple-300 ring-1 ring-purple-500/30">
              <Sparkles className="h-3.5 w-3.5 text-cyan-400" />
              Selamat Datang di Hub RPL 1
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight sm:text-5xl">
              Web Kelas Digital <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">RPL 1 2026/2027</span>
            </h1>
            <p className="max-w-md text-sm text-slate-300 sm:text-base">
              Pusat informasi, transparansi keuangan kas kelas, koordinasi akademik, presensi harian, dan album kenangan bersama.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link 
                href="/kas" 
                className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-blue-600 px-5 text-sm font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.5)] hover:from-purple-500 hover:to-blue-500 hover:shadow-[0_0_20px_rgba(138,43,226,0.7)] transition-all cursor-pointer"
              >
                <Wallet className="mr-2 h-4 w-4" />
                Bayar Uang Kas
              </Link>
              <Link 
                href="/jadwal" 
                className="inline-flex h-11 items-center justify-center rounded-xl bg-white/5 backdrop-blur-md border border-white/10 px-5 text-sm font-bold text-white hover:bg-white/10 hover:border-white/20 transition-all cursor-pointer"
              >
                <Calendar className="mr-2 h-4 w-4" />
                Lihat Jadwal
              </Link>
            </div>
          </div>

          {/* Countdown Widget */}
          <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-md text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-indigo-300">Countdown UTS Semester 1</span>
            <div className="mt-3 flex items-center justify-center gap-1.5">
              <span className="text-5xl font-black tabular-nums tracking-tight text-white">{Math.max(0, diffDays)}</span>
              <span className="text-lg font-semibold text-slate-300">Hari Lagi</span>
            </div>
            <div className="mt-4 flex items-center gap-1.5 text-xs text-slate-400">
              <Clock className="h-3.5 w-3.5" />
              <span>Target Mulai: 12 Oktober 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Responsive Bento Grid Dashboard */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Card 1: Pinned Announcements */}
        <div className="rounded-3xl border border-white/10 bg-[#15152D]/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white flex flex-col md:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-bold text-lg text-slate-950 dark:text-white">
              <Megaphone className="h-5 w-5 text-indigo-500" />
              Pengumuman Penting
            </h2>
            <Link href="/pengumuman" className="text-xs font-semibold text-indigo-500 hover:underline">
              Semua Pengumuman
            </Link>
          </div>

          <div className="mt-4 flex-1 space-y-4">
            {announcements.filter(a => a.pinned).length > 0 ? (
              announcements.filter(a => a.pinned).map(ann => (
                <div key={ann.id} className="rounded-2xl border border-amber-200/30 bg-amber-50/20 p-4 dark:border-amber-900/30 dark:bg-amber-950/10">
                  <div className="flex items-center justify-between">
                    <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[10px] font-bold text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                      {ann.priorityLevel}
                    </span>
                    <span className="text-[10px] text-slate-400">
                      {new Date(ann.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  <h3 className="mt-2 font-bold text-slate-900 dark:text-white text-sm">{ann.title}</h3>
                  <p className="mt-1 line-clamp-2 text-xs text-slate-500 dark:text-slate-400">
                    {ann.content}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex h-32 flex-col items-center justify-center text-center text-slate-400">
                <AlertCircle className="h-8 w-8 stroke-1 text-slate-300 mb-2" />
                <p className="text-xs">Tidak ada pengumuman disematkan</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 2: Today's Schedule Highlight */}
        <div className="rounded-3xl border border-white/10 bg-[#15152D]/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-bold text-lg text-slate-950 dark:text-white">
              <Calendar className="h-5 w-5 text-indigo-500" />
              Hari Ini ({currentDayName})
            </h2>
            <Link href="/jadwal" className="text-xs font-semibold text-indigo-500 hover:underline">
              Jadwal Lengkap
            </Link>
          </div>

          <div className="mt-4 space-y-3">
            {todaySchedules.length > 0 ? (
              todaySchedules.map(sched => (
                <div key={sched.id} className="relative overflow-hidden rounded-2xl border border-slate-100 bg-slate-50/50 p-4 dark:border-slate-800 dark:bg-slate-900/20">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">{sched.startTime} - {sched.endTime}</span>
                    <span className="text-slate-400">{sched.room}</span>
                  </div>
                  <h3 className="mt-1 font-bold text-slate-900 dark:text-white text-sm leading-tight">{sched.subjectName}</h3>
                  <p className="text-[11px] text-slate-400 mt-0.5">{sched.teacherName}</p>
                </div>
              ))
            ) : (
              <div className="flex h-32 flex-col items-center justify-center text-center text-slate-400">
                <CheckCircle className="h-8 w-8 stroke-1 text-slate-300 mb-2" />
                <p className="text-xs">Tidak ada jadwal pelajaran hari ini</p>
              </div>
            )}
          </div>
        </div>

        {/* Card 3: Cash & Finance Info */}
        <div className="rounded-3xl border border-white/10 bg-[#15152D]/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-bold text-lg text-slate-950 dark:text-white">
              <Wallet className="h-5 w-5 text-indigo-500" />
              Keuangan Kelas
            </h2>
            <Link href="/kas" className="text-xs font-semibold text-indigo-500 hover:underline">
              Rincian Kas
            </Link>
          </div>

          <div className="mt-4 space-y-4">
            <div>
              <span className="text-xs font-bold text-slate-400">Sisa Saldo Kas</span>
              <div className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">
                Rp {finance.currentBalance.toLocaleString('id-ID')}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Pemasukan</span>
                <span className="text-xs font-bold text-emerald-500">Rp {finance.totalIncome.toLocaleString('id-ID')}</span>
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Pengeluaran</span>
                <span className="text-xs font-bold text-rose-500">Rp {finance.totalExpense.toLocaleString('id-ID')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card 4: Attendance Widget */}
        <div className="rounded-3xl border border-white/10 bg-[#15152D]/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-bold text-lg text-slate-950 dark:text-white">
              <CheckCircle className="h-5 w-5 text-indigo-500" />
              Kehadiran Hari Ini
            </h2>
            <Link href="/presensi" className="text-xs font-semibold text-indigo-500 hover:underline">
              Presensi
            </Link>
          </div>

          <div className="mt-4 space-y-4 text-center">
            <div className="relative inline-flex items-center justify-center">
              <svg className="h-24 w-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-slate-100 dark:text-slate-800" fill="transparent" />
                <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" className="text-indigo-500" strokeDasharray={2 * Math.PI * 40} strokeDashoffset={2 * Math.PI * 40 * (1 - (attendance.attendanceRate ?? 0) / 100)} strokeLinecap="round" fill="transparent" />
              </svg>
              <span className="absolute text-lg font-black text-slate-950 dark:text-white">{attendance.attendanceRate ?? 0}%</span>
            </div>

            <div className="text-xs text-slate-500 dark:text-slate-400">
              <span className="font-bold text-slate-900 dark:text-white">{attendance.presentCount ?? 0}</span> dari <span className="font-bold text-slate-900 dark:text-white">{attendance.studentsCount ?? 0}</span> siswa hadir hari ini.
            </div>
          </div>
        </div>

        {/* Card 5: Fast Links to Other Modules */}
        <div className="rounded-3xl border border-white/10 bg-[#15152D]/80 backdrop-blur-md p-6 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white">
          <div className="flex items-center justify-between border-b border-slate-100 pb-4 dark:border-slate-800">
            <h2 className="flex items-center gap-2 font-bold text-lg text-slate-950 dark:text-white">
              <ExternalLink className="h-5 w-5 text-indigo-500" />
              Akses Cepat
            </h2>
          </div>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <Link href="/materi" className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/20 hover:scale-[1.02] transition-transform">
              <FileText className="h-5 w-5 text-indigo-500" />
              <span className="text-[10px] font-bold">Perpustakaan</span>
            </Link>
            <Link href="/forum" className="flex flex-col items-center gap-2 rounded-2xl border border-slate-100 bg-slate-50/50 p-3 text-center dark:border-slate-800 dark:bg-slate-900/20 hover:scale-[1.02] transition-transform">
              <MessageCircle className="h-5 w-5 text-indigo-500" />
              <span className="text-[10px] font-bold">Forum Diskusi</span>
            </Link>
          </div>
        </div>
      </div>

      {/* 3. Class Org-Chart Grid */}
      <section className="space-y-6">
        <div>
          <h2 className="text-2xl font-black tracking-tight text-slate-950 dark:text-white">Pengurus Organisasi Kelas</h2>
          <p className="text-xs text-slate-400">Tim pengurus aktif kelas RPL 1 tahun ajaran 2026/2027.</p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {orgMembers.map((member) => (
            <div key={member.id} className="group relative overflow-hidden rounded-3xl border border-white/10 bg-[#15152D]/80 p-5 shadow-[0_0_15px_rgba(0,0,0,0.5)] text-white backdrop-blur-md transition-all hover:shadow-[0_0_20px_rgba(138,43,226,0.3)] hover:scale-[1.01]">
              <div className="flex flex-col items-center text-center">
                <img 
                  src={member.avatarUrl || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=80&h=80'} 
                  alt={member.fullName} 
                  className="h-20 w-20 rounded-full object-cover ring-4 ring-indigo-500/10 transition-transform group-hover:scale-105"
                />
                <h3 className="mt-4 font-bold text-slate-950 dark:text-white text-base">{member.fullName}</h3>
                <span className="mt-1 inline-flex items-center rounded-full bg-indigo-50 px-2.5 py-0.5 text-xs font-bold text-indigo-600 dark:bg-indigo-950/40 dark:text-indigo-400">
                  {member.classRole}
                </span>
                <p className="mt-2 text-xs italic text-slate-400 line-clamp-2">
                  &ldquo;{member.bioQuote || 'Lead by example.'}&rdquo;
                </p>
                <div className="mt-4 flex gap-2.5">
                  {member.whatsapp && (
                    <a href={`https://wa.me/${member.whatsapp}`} target="_blank" className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400 transition-colors">
                      <span className="sr-only">WhatsApp</span>
                      <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.625 1.451 5.403.002 9.799-4.389 9.802-9.786.002-2.614-1.01-5.072-2.852-6.915C16.38 2.062 13.929.98 11.32.98 5.923.98 1.528 5.372 1.526 10.77c-.001 1.562.41 3.09 1.192 4.453l-.994 3.635 3.72-.975z" />
                      </svg>
                    </a>
                  )}
                  {member.instagram && (
                    <a href={`https://instagram.com/${member.instagram}`} target="_blank" className="rounded-full bg-slate-100 p-2 text-slate-600 hover:bg-indigo-50 hover:text-indigo-600 dark:bg-slate-800 dark:text-slate-400 dark:hover:bg-indigo-950/50 dark:hover:text-indigo-400 transition-colors">
                      <span className="sr-only">Instagram</span>
                      <svg className="h-4 w-4 fill-none stroke-current stroke-2" viewBox="0 0 24 24">
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
