'use client';

import React, { useState, useTransition } from 'react';
import type { User, DuesSummaryRow } from '@/lib/types';
import { createDuesPeriod, markPaymentPaid } from '@/actions/finance.actions';
import { Plus, Wallet, CheckCircle2, Clock, XCircle } from 'lucide-react';
import { formatCurrency, formatDate } from '@/lib/utils';

interface AdminFinanceCRUDProps {
  summary: DuesSummaryRow[];
  users: User[];
}

export default function AdminFinanceCRUD({ summary, users }: AdminFinanceCRUDProps) {
  const [isPending, startTransition] = useTransition();

  // Create period form
  const [periodName, setPeriodName] = useState('');
  const [amount, setAmount] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [periodError, setPeriodError] = useState('');

  const handleCreatePeriod = (e: React.FormEvent) => {
    e.preventDefault();
    if (!periodName || !amount || !startDate || !endDate) return;
    setPeriodError('');

    startTransition(async () => {
      const result = await createDuesPeriod({
        name: periodName,
        amount: parseInt(amount, 10),
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
      });
      if (result.success) {
        setPeriodName('');
        setAmount('');
        setStartDate('');
        setEndDate('');
      } else {
        setPeriodError(result.error);
      }
    });
  };

  const handleMarkPaid = (paymentId: string) => {
    startTransition(async () => {
      await markPaymentPaid(paymentId);
    });
  };

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
    <div className="space-y-8">
      {/* Create Period Form */}
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <Plus className="h-4 w-4 text-indigo-500" />
            Buat Periode Iuran Baru
          </h3>

          {periodError && (
            <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-xs font-medium text-rose-600 border border-rose-500/20">
              {periodError}
            </p>
          )}

          <form onSubmit={handleCreatePeriod} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Nama Periode</label>
              <input
                type="text"
                value={periodName}
                onChange={(e) => setPeriodName(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Misal: Semester 1 2026-2027"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Jumlah Iuran (Rupiah)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Cth: 50000"
                min={1}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Tanggal Mulai</label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  required
                />
              </div>
              <div className="space-y-1">
                <label className="font-bold text-slate-400">Tanggal Selesai</label>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
            >
              Buat Periode
            </button>
          </form>
        </div>

        {/* Stats summary */}
        <div className="lg:col-span-2 rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <Wallet className="h-4 w-4 text-indigo-500" />
            Ringkasan Kas
          </h3>
          <div className="grid grid-cols-3 gap-4 text-xs">
            <div className="rounded-2xl bg-emerald-500/10 p-4 text-center border border-emerald-500/20">
              <p className="font-bold text-emerald-600 text-lg">
                {summary.filter((r) => r.status === 'paid').length}
              </p>
              <p className="text-slate-500 mt-1">Lunas</p>
            </div>
            <div className="rounded-2xl bg-amber-500/10 p-4 text-center border border-amber-500/20">
              <p className="font-bold text-amber-600 text-lg">
                {summary.filter((r) => r.status === 'pending').length}
              </p>
              <p className="text-slate-500 mt-1">Belum Bayar</p>
            </div>
            <div className="rounded-2xl bg-rose-500/10 p-4 text-center border border-rose-500/20">
              <p className="font-bold text-rose-600 text-lg">
                {summary.filter((r) => r.status === 'overdue').length}
              </p>
              <p className="text-slate-500 mt-1">Terlambat</p>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Summary Table */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Rekap Pembayaran Iuran</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100">
                <th className="p-3 font-bold text-slate-400">Nama Siswa</th>
                <th className="p-3 font-bold text-slate-400">Periode</th>
                <th className="p-3 font-bold text-slate-400 text-right">Jumlah</th>
                <th className="p-3 font-bold text-slate-400 text-center">Status</th>
                <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {summary.length > 0 ? (
                summary.map((row) => (
                  <tr key={row.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                    <td className="p-3 font-bold">{row.name}</td>
                    <td className="p-3 text-slate-500">{row.period_name}</td>
                    <td className="p-3 text-right font-semibold">{formatCurrency(row.amount)}</td>
                    <td className="p-3 text-center">
                      <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold ${statusClass(row.status)}`}>
                        {statusIcon(row.status)}
                        {statusLabel(row.status)}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      {row.status !== 'paid' && (
                        <button
                          onClick={() => handleMarkPaid(row.id)}
                          disabled={isPending}
                          className="inline-flex items-center gap-1 rounded-lg bg-emerald-500/10 px-2 py-1 text-[10px] font-bold text-emerald-600 hover:bg-emerald-500/20 cursor-pointer disabled:opacity-50 transition-colors"
                        >
                          <CheckCircle2 className="h-3 w-3" />
                          Tandai Lunas
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="p-6 text-center text-slate-400">
                    Belum ada data iuran. Buat periode iuran terlebih dahulu.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
