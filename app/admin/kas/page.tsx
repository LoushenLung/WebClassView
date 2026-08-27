import React from 'react';
import { getDuesSummary } from '@/actions/finance.actions';
import { getProfiles } from '@/actions/profile.actions';
import AdminFinanceCRUD from './_components/AdminFinanceCRUD';

export default async function AdminFinancePage() {
  const [summaryResult, users] = await Promise.all([
    getDuesSummary(),
    getProfiles(),
  ]);

  const summary = summaryResult.success ? summaryResult.data : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Keuangan & Kas</h1>
        <p className="text-xs text-slate-400">Kelola periode iuran, catat pembayaran, dan pantau status kas kelas.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminFinanceCRUD summary={summary} users={users} />
      </div>
    </div>
  );
}
