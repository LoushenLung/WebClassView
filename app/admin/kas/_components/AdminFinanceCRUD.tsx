'use client';

import React, { useState, useTransition } from 'react';
import { FinanceTransaction, CashPayment, Profile } from '@/lib/db';
import { createTransaction, deleteTransaction, updatePaymentStatus } from '@/actions/finance.actions';
import { Plus, Trash, Wallet, Save, RefreshCw, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

interface AdminFinanceCRUDProps {
  transactions: FinanceTransaction[];
  payments: CashPayment[];
  profiles: Profile[];
}

export default function AdminFinanceCRUD({ 
  transactions, 
  payments, 
  profiles 
}: AdminFinanceCRUDProps) {
  const [isPending, startTransition] = useTransition();

  // Transaction form state
  const [type, setType] = useState<'IN' | 'OUT'>('OUT');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Kas Mingguan');
  const [description, setDescription] = useState('');
  const [receiptUrl, setReceiptUrl] = useState('');

  // Selected week for dues editor
  const [selectedWeek, setSelectedWeek] = useState(1);
  const weeks = [1, 2, 3, 4];

  const handleAddTransaction = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !category || !description) return;

    startTransition(async () => {
      await createTransaction({
        type,
        amount: parseFloat(amount),
        category,
        description,
        receiptUrl: receiptUrl || undefined
      });
      // reset
      setAmount('');
      setDescription('');
      setReceiptUrl('');
    });
  };

  const handleDeleteTransaction = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus data transaksi ini?')) {
      startTransition(async () => {
        await deleteTransaction(id);
      });
    }
  };

  const handleStatusChange = (userId: string, status: 'PAID' | 'UNPAID' | 'PENDING') => {
    startTransition(async () => {
      await updatePaymentStatus(userId, selectedWeek, 2026, status);
    });
  };

  const getPaymentStatus = (userId: string, week: number) => {
    const pay = payments.find(p => p.userId === userId && p.periodWeek === week && p.periodYear === 2026);
    return pay ? pay.status : 'UNPAID';
  };

  return (
    <div className="space-y-8">
      {/* Tabs / Subsections */}
      <div className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Log Transaction Form */}
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md h-fit space-y-4">
          <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
            <Plus className="h-4 w-4 text-indigo-500" />
            Input Transaksi Baru
          </h3>

          <form onSubmit={handleAddTransaction} className="space-y-4 text-xs">
            <div className="space-y-1">
              <label className="font-bold text-slate-400">Jenis Transaksi</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value as any)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
              >
                <option value="OUT">Pengeluaran (OUT)</option>
                <option value="IN">Pemasukan Lainnya (IN)</option>
              </select>
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Jumlah Uang (Rupiah)</label>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Cth: 20000"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Kategori</label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Cth: Alat Tulis, Konsumsi, Kas"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">Keterangan / Rincian</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="Rincian penggunaan dana..."
                required
              />
            </div>

            <div className="space-y-1">
              <label className="font-bold text-slate-400">URL Gambar Nota / Resi Fisik</label>
              <input
                type="text"
                value={receiptUrl}
                onChange={(e) => setReceiptUrl(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 dark:border-slate-800 dark:bg-slate-900 focus:outline-none"
                placeholder="https://cloudinary.com/..."
              />
            </div>

            <button
              type="submit"
              disabled={isPending}
              className="w-full inline-flex h-9 items-center justify-center rounded-xl bg-indigo-600 px-4 text-xs font-bold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500 cursor-pointer disabled:opacity-50"
            >
              Simpan Transaksi
            </button>
          </form>
        </div>

        {/* Right Columns: Matrix & Dues payments updater */}
        <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md lg:col-span-2 space-y-6">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-950 dark:text-white flex items-center gap-1.5">
              <Wallet className="h-4 w-4 text-indigo-500" />
              Kelola Iuran Kas Mingguan
            </h3>
            
            <div className="flex gap-1 bg-slate-100 p-1 rounded-xl dark:bg-slate-800">
              {weeks.map(wk => (
                <button
                  key={wk}
                  onClick={() => setSelectedWeek(wk)}
                  className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                    selectedWeek === wk
                      ? 'bg-indigo-600 text-white shadow'
                      : 'hover:bg-slate-200 text-slate-700 dark:text-slate-350 dark:hover:bg-slate-700'
                  }`}
                >
                  Mng {wk}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                  <th className="p-3 font-bold text-slate-400">Nama Siswa</th>
                  <th className="p-3 font-bold text-slate-400">Jabatan</th>
                  <th className="p-3 font-bold text-slate-400 text-center">Status Minggu {selectedWeek}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {profiles.map((student) => {
                  const status = getPaymentStatus(student.id, selectedWeek);
                  return (
                    <tr key={student.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                      <td className="p-3 font-bold">{student.fullName}</td>
                      <td className="p-3 text-slate-500">{student.classRole}</td>
                      <td className="p-3 text-center">
                        <select
                          value={status}
                          onChange={(e) => handleStatusChange(student.id, e.target.value as any)}
                          className={`rounded-lg border px-2 py-1.5 text-[10px] font-bold focus:outline-none cursor-pointer ${
                            status === 'PAID'
                              ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/25'
                              : status === 'PENDING'
                              ? 'bg-amber-500/10 text-amber-500 border-amber-500/25'
                              : 'bg-rose-500/10 text-rose-500 border-rose-500/25'
                          }`}
                        >
                          <option value="UNPAID">Belum Bayar</option>
                          <option value="PENDING">Pending (Verif)</option>
                          <option value="PAID">Lunas (Paid)</option>
                        </select>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Transaction Log Table for deletion */}
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md space-y-4">
        <h3 className="text-sm font-bold text-slate-950 dark:text-white">Daftar Log Transaksi</h3>
        <div className="overflow-x-auto rounded-2xl border border-slate-100 dark:border-slate-800">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-850">
                <th className="p-3 font-bold text-slate-400">Tanggal</th>
                <th className="p-3 font-bold text-slate-400">Jenis</th>
                <th className="p-3 font-bold text-slate-400">Kategori</th>
                <th className="p-3 font-bold text-slate-400">Deskripsi</th>
                <th className="p-3 font-bold text-slate-400 text-right">Jumlah</th>
                <th className="p-3 font-bold text-slate-400 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {transactions.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-900/30">
                  <td className="p-3 text-slate-500">{new Date(tx.createdAt).toLocaleDateString('id-ID', { day: 'numeric', month: 'short' })}</td>
                  <td className="p-3 font-bold">
                    <span className={`rounded-full px-2 py-0.5 text-[9px] font-bold ${
                      tx.type === 'IN' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-rose-500/10 text-rose-500'
                    }`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className="p-3 font-bold">{tx.category}</td>
                  <td className="p-3 text-slate-500">{tx.description}</td>
                  <td className="p-3 text-right font-semibold">
                    Rp {tx.amount.toLocaleString('id-ID')}
                  </td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDeleteTransaction(tx.id)}
                      className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-500/10 cursor-pointer"
                    >
                      <Trash className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
