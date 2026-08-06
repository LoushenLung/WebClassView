import React from 'react';
import { getFinanceSummary, getTransactions, getPayments } from '@/actions/finance.actions';
import { getProfiles } from '@/actions/profile.actions';
import FinanceClient from './_components/FinanceClient';

export default async function FinancePage() {
  const summary = await getFinanceSummary();
  const transactions = await getTransactions();
  const payments = await getPayments();
  const profiles = await getProfiles();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Keuangan Kas Kelas</h1>
        <p className="text-xs text-slate-400">Laporan neraca keuangan, iuran mingguan anggota kelas, dan catatan rincian belanja inventaris.</p>
      </div>

      <FinanceClient 
        summary={summary} 
        transactions={transactions} 
        payments={payments} 
        profiles={profiles} 
      />
    </div>
  );
}
