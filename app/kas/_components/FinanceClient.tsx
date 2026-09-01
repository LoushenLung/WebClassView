'use client';

import React, { useState } from 'react';
import type { DuesSummaryRow } from '@/lib/types';
import { CheckCircle2, Clock, XCircle, Search } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface FinanceClientProps {
  summary: DuesSummaryRow[];
}

export default function FinanceClient({ summary }: FinanceClientProps) {
  const [search, setSearch] = useState('');

  const filtered = summary.filter(
    (r) =>
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.period_name.toLowerCase().includes(search.toLowerCase())
  );

  const paidCount = summary.filter((r) => r.status === 'paid').length;
  const pendingCount = summary.filter((r) => r.status === 'pending').length;
  const overdueCount = summary.filter((r) => r.status === 'overdue').length;

  const statusIcon = (status: string) => {
    if (status === 'paid') return <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />;
    if (status === 'overdue') return <XCircle className="h-3.5 w-3.5 text-rose-500" />;
    return <Clock className="h-3.5 w-3.5 text-amber-500" />;
  };

  const statusLabel = (status: string) => {
    if (status === 'paid') return 'Lunas';
    if (status === 'overdue') return 'Terlambat';
    return 'Belum Bayar';
  };

  const statusClass = (status: string) => {
    if (status === 'paid') return 'bg-emerald-500/10 text-emerald-600 border-emerald-500/25';
    if (status === 'overdue') return 'bg-rose-500/10 text-rose-600 border-rose-500/25';
    return 'bg-amber-500/10 text-amber-600 border-amber-500/25';
  };

  return (
    <div className="space-y-6">
      {/* Summary cards */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-2xl bg-emerald-500/10 border border-emerald-500/20 p-4 text-center">
          <p className="text-2xl font-black text-emerald-600">{paidCount}</p>
          <p className="text-xs text-slate-500 mt-1">Lunas</p>
        </div>
        <div className="rounded-2xl bg-amber-500/10 border border-amber-500/20 p-4 text-center">
          <p className="text-2xl font-black text-amber-600">{pendingCount}</p>
          <p className="text-xs text-slate-500 mt-1">Belum Bayar</p>
        </div>
        <div className="rounded-2xl bg-rose-500/10 border border-rose-500/20 p-4 text-center">
          <p className="text-2xl font-black text-rose-600">{overdueCount}</p>
          <p className="text-xs text-slate-500 mt-1">Terlambat</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-xs">
        <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 py-2 text-xs dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
          placeholder="Cari nama atau periode..."
        />
      </div>

      {/* Table */}
      <div className="rounded-3xl border border-slate-200/50 bg-white shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 overflow-hidden">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
              <th className="p-4 font-bold text-slate-400">Nama Siswa</th>
              <th className="p-4 font-bold text-slate-400">Periode</th>
              <th className="p-4 font-bold text-slate-400 text-right">Jumlah</th>
              <th className="p-4 font-bold text-slate-400 text-center">Status</th>
              <th className="p-4 font-bold text-slate-400">Tanggal Bayar</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {filtered.length > 0 ? (
              filtered.map((row) => (
                <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="p-4 font-bold">{row.name}</td>
                  <td className="p-4 text-slate-500">{row.period_name}</td>
                  <td className="p-4 text-right font-semibold">{formatCurrency(row.amount)}</td>
                  <td className="p-4 text-center">
                    <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusClass(row.status)}`}>
                      {statusIcon(row.status)}
                      {statusLabel(row.status)}
                    </span>
                  </td>
                  <td className="p-4 text-slate-500">
                    {row.paid_at ? formatDate(row.paid_at) : '-'}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="p-8 text-center text-slate-400">
                  {summary.length === 0
                    ? 'Belum ada periode iuran. Admin dapat membuat periode baru di halaman admin.'
                    : 'Tidak ada data yang cocok dengan pencarian.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
