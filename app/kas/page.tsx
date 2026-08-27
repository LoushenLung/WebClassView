import React from 'react';
import { getDuesSummary } from '@/actions/finance.actions';
import FinanceClient from './_components/FinanceClient';

export default async function FinancePage() {
  const result = await getDuesSummary();
  const summary = result.success ? result.data : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Keuangan Kas Kelas</h1>
        <p className="text-xs text-slate-400">Status iuran dan pembayaran kas kelas RPL 1.</p>
      </div>
      <FinanceClient summary={summary} />
    </div>
  );
}
