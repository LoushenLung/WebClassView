import React from 'react';
import { getTransactions, getPayments } from '@/actions/finance.actions';
import { getProfiles } from '@/actions/profile.actions';
import AdminFinanceCRUD from './_components/AdminFinanceCRUD';

export default async function AdminFinancePage() {
  const transactions = await getTransactions();
  const payments = await getPayments();
  const profiles = await getProfiles();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Keuangan & Kas</h1>
        <p className="text-xs text-slate-400">Input belanja operasional kelas, catat pemasukan non-iuran, dan perbarui status pembayaran kas mingguan siswa.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminFinanceCRUD 
          transactions={transactions} 
          payments={payments} 
          profiles={profiles} 
        />
      </div>
    </div>
  );
}
