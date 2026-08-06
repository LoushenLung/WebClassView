'use client';

import React, { useState } from 'react';
import { FinanceTransaction, CashPayment, Profile } from '@/lib/db';
import { 
  TrendingUp, 
  TrendingDown, 
  Wallet, 
  Calendar, 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  Eye, 
  FileText
} from 'lucide-react';

interface FinanceClientProps {
  summary: {
    totalIncome: number;
    totalExpense: number;
    currentBalance: number;
    totalDues: number;
    totalOtherIncome: number;
  };
  transactions: FinanceTransaction[];
  payments: CashPayment[];
  profiles: Profile[];
}

export default function FinanceClient({ 
  summary, 
  transactions, 
  payments, 
  profiles 
}: FinanceClientProps) {
  const [activeTab, setActiveTab] = useState<'matrix' | 'timeline'>('matrix');
  const [selectedWeek, setSelectedWeek] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeReceipt, setActiveReceipt] = useState<string | null>(null);

  const weeks = [1, 2, 3, 4]; // August 2026 weeks

  // Filter students based on search query
  const filteredProfiles = profiles.filter(p => 
    p.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (p.nickname && p.nickname.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const getPaymentStatus = (userId: string, week: number) => {
    const pay = payments.find(p => p.userId === userId && p.periodWeek === week && p.periodYear === 2026);
    return pay ? pay.status : 'UNPAID';
  };

  const getPaymentBadge = (status: 'PAID' | 'UNPAID' | 'PENDING') => {
    switch (status) {
      case 'PAID':
        return { label: 'Lunas', class: 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20' };
      case 'PENDING':
        return { label: 'Pending', class: 'bg-amber-500/10 text-amber-500 border border-amber-500/20' };
      case 'UNPAID':
      default:
        return { label: 'Belum Bayar', class: 'bg-rose-500/10 text-rose-500 border border-rose-500/20' };
    }
  };

  return (
    <div className="space-y-8">
      {/* Finance Summary Cards */}
      <div className="grid gap-6 sm:grid-cols-3">
        {/* Card 1: Balance */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-600 to-indigo-700 p-6 text-white shadow-xl shadow-indigo-600/10">
          <div className="absolute -right-6 -top-6 h-24 w-24 rounded-full bg-white/5 blur-xl"></div>
          <span className="text-xs font-bold text-indigo-200 block uppercase tracking-wider">Sisa Saldo Kas</span>
          <div className="mt-2 text-3xl font-black tracking-tight">
            Rp {summary.currentBalance.toLocaleString('id-ID')}
          </div>
          <div className="mt-4 flex items-center gap-1 text-[11px] text-indigo-200">
            <Wallet className="h-3.5 w-3.5" />
            <span>Kas kelas RPL 1 aktif</span>
          </div>
        </div>

        {/* Card 2: Income */}
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Pemasukan</span>
            <span className="rounded-xl bg-emerald-500/10 p-2 text-emerald-500">
              <TrendingUp className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Rp {summary.totalIncome.toLocaleString('id-ID')}
          </div>
          <div className="mt-3 text-[10px] text-slate-400">
            Dues: Rp {summary.totalDues.toLocaleString('id-ID')} | Lainnya: Rp {summary.totalOtherIncome.toLocaleString('id-ID')}
          </div>
        </div>

        {/* Card 3: Expense */}
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400 block uppercase tracking-wider">Total Pengeluaran</span>
            <span className="rounded-xl bg-rose-500/10 p-2 text-rose-500">
              <TrendingDown className="h-4 w-4" />
            </span>
          </div>
          <div className="mt-2 text-2xl font-black text-slate-950 dark:text-white tracking-tight">
            Rp {summary.totalExpense.toLocaleString('id-ID')}
          </div>
          <div className="mt-3 text-[10px] text-slate-400">
            Terpakai untuk kebutuhan inventaris kelas
          </div>
        </div>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={() => setActiveTab('matrix')}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'matrix'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Status Iuran Anggota
        </button>
        <button
          onClick={() => setActiveTab('timeline')}
          className={`px-6 py-3.5 text-sm font-bold border-b-2 transition-all cursor-pointer ${
            activeTab === 'timeline'
              ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          Log Transaksi Keuangan
        </button>
      </div>

      {/* Content Render */}
      {activeTab === 'matrix' ? (
        <div className="space-y-6">
          {/* Week & Search Controls */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {/* Week Selector */}
            <div className="flex gap-1.5 bg-slate-100/50 p-1 rounded-2xl dark:bg-slate-900 w-fit">
              {weeks.map(wk => (
                <button
                  key={wk}
                  onClick={() => setSelectedWeek(wk)}
                  className={`rounded-xl px-4 py-2 text-xs font-bold transition-all cursor-pointer ${
                    selectedWeek === wk
                      ? 'bg-indigo-600 text-white shadow'
                      : 'hover:bg-slate-200 text-slate-700 dark:text-slate-350 dark:hover:bg-slate-800'
                  }`}
                >
                  Minggu {wk}
                </button>
              ))}
            </div>

            {/* Search */}
            <div className="relative w-full sm:max-w-xs">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Cari nama siswa..."
              />
            </div>
          </div>

          {/* Desktop Table View */}
          <div className="hidden sm:block overflow-x-auto rounded-3xl border border-slate-200/50 bg-white dark:border-slate-800/50 dark:bg-slate-900/50 shadow-sm">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
                  <th className="p-4 font-bold text-slate-400">Nama Lengkap</th>
                  <th className="p-4 font-bold text-slate-400">NISN / NIM</th>
                  <th className="p-4 font-bold text-slate-400">Jabatan</th>
                  <th className="p-4 font-bold text-slate-400 text-center">Status Mng-{selectedWeek}</th>
                  <th className="p-4 font-bold text-slate-400 text-right">Nilai Iuran</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredProfiles.map((student) => {
                  const status = getPaymentStatus(student.id, selectedWeek);
                  const badge = getPaymentBadge(status);

                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="p-4 font-bold">{student.fullName}</td>
                      <td className="p-4 font-mono text-slate-500">{student.studentId || '-'}</td>
                      <td className="p-4 text-slate-500">{student.classRole}</td>
                      <td className="p-4 text-center">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-[9px] font-bold ${badge.class}`}>
                          {badge.label}
                        </span>
                      </td>
                      <td className="p-4 text-right font-semibold text-slate-700 dark:text-slate-350">
                        {status === 'PAID' ? 'Rp 10.000' : 'Rp 0'}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card List View */}
          <div className="block sm:hidden space-y-4">
            {filteredProfiles.map((student) => {
              const status = getPaymentStatus(student.id, selectedWeek);
              const badge = getPaymentBadge(status);

              return (
                <div key={student.id} className="rounded-2xl border border-slate-200/50 bg-white p-4 dark:border-slate-800/50 dark:bg-slate-900 space-y-3 shadow-sm">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-sm text-slate-900 dark:text-white">{student.fullName}</h4>
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold ${badge.class}`}>
                      {badge.label}
                    </span>
                  </div>
                  <div className="flex justify-between text-[11px] text-slate-400">
                    <span>NISN: {student.studentId || '-'}</span>
                    <span className="font-semibold text-slate-700 dark:text-slate-300">
                      Iuran: {status === 'PAID' ? 'Rp 10.000' : 'Rp 0'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Timeline Feed */
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-6">
          <h3 className="font-bold text-slate-950 dark:text-white text-base">Aliran Pemasukan & Pengeluaran Kelas</h3>
          
          <div className="relative border-l-2 border-slate-100 dark:border-slate-800 pl-6 ml-3 space-y-8">
            {transactions.length > 0 ? (
              transactions.map((tx) => (
                <div key={tx.id} className="relative">
                  {/* Circle Indicator */}
                  <span className={`absolute -left-9 top-1.5 rounded-full p-1 ring-4 ring-white dark:ring-slate-950 ${
                    tx.type === 'IN' ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
                  }`}>
                    {tx.type === 'IN' ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <TrendingDown className="h-3 w-3" />
                    )}
                  </span>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-bold text-slate-900 dark:text-white text-sm">
                        {tx.category}
                      </span>
                      <span className="text-slate-400">
                        {new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                      </span>
                    </div>

                    <p className="text-slate-500 dark:text-slate-400 text-[11px] leading-relaxed">
                      {tx.description}
                    </p>

                    <div className="flex items-center justify-between pt-1">
                      <span className={`font-bold text-sm ${
                        tx.type === 'IN' ? 'text-emerald-500' : 'text-rose-500'
                      }`}>
                        {tx.type === 'IN' ? '+' : '-'} Rp {tx.amount.toLocaleString('id-ID')}
                      </span>

                      {tx.receiptUrl && (
                        <button
                          onClick={() => setActiveReceipt(tx.receiptUrl || null)}
                          className="inline-flex items-center gap-1 font-bold text-indigo-500 hover:underline cursor-pointer"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Bukti Nota</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-slate-400 py-6">
                Belum ada transaksi terekam
              </div>
            )}
          </div>
        </div>
      )}

      {/* Receipt Viewer Modal */}
      {activeReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="relative max-w-lg w-full bg-white dark:bg-slate-900 rounded-3xl overflow-hidden shadow-2xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-sm">Bukti Nota / Resi Fisik</h3>
              <button
                onClick={() => setActiveReceipt(null)}
                className="text-slate-400 hover:text-slate-800 dark:hover:text-white font-bold cursor-pointer"
              >
                Tutup
              </button>
            </div>
            <img 
              src={activeReceipt} 
              alt="Receipt" 
              className="w-full h-auto max-h-[400px] object-contain rounded-2xl border border-slate-100 dark:border-slate-800"
            />
          </div>
        </div>
      )}
    </div>
  );
}
