'use server';

import { getDb, saveDb, FinanceTransaction, CashPayment } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getMockSession } from './auth.actions';

export async function getFinanceSummary() {
  const db = getDb();
  const txs = db.transactions;
  const payments = db.payments;

  // Let's calculate total weekly dues collected
  const totalDues = payments
    .filter(p => p.status === 'PAID')
    .length * 10000; // Let's assume weekly due is Rp 10.000 per week

  const totalOtherIncome = txs
    .filter(t => t.type === 'IN')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalIncome = totalDues + totalOtherIncome;

  const totalExpense = txs
    .filter(t => t.type === 'OUT')
    .reduce((sum, t) => sum + t.amount, 0);

  const currentBalance = totalIncome - totalExpense;

  return {
    totalIncome,
    totalExpense,
    currentBalance,
    totalDues,
    totalOtherIncome
  };
}

export async function getTransactions() {
  const db = getDb();
  // Sort descending by date
  return [...db.transactions].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getPayments() {
  const db = getDb();
  return db.payments;
}

export async function createTransaction(data: {
  type: 'IN' | 'OUT';
  amount: number;
  category: string;
  description: string;
  receiptUrl?: string;
}) {
  const session = await getMockSession();
  const db = getDb();
  const newTx: FinanceTransaction = {
    id: 'tx-' + Math.random().toString(36).substr(2, 9),
    ...data,
    createdById: session.id,
    createdAt: new Date().toISOString()
  };
  db.transactions.push(newTx);
  saveDb(db);
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
  return { success: true };
}

export async function deleteTransaction(id: string) {
  const db = getDb();
  db.transactions = db.transactions.filter(t => t.id !== id);
  saveDb(db);
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
  return { success: true };
}

export async function updatePaymentStatus(
  userId: string,
  periodWeek: number,
  periodYear: number,
  status: 'PAID' | 'UNPAID' | 'PENDING'
) {
  const session = await getMockSession();
  const db = getDb();
  const index = db.payments.findIndex(
    p => p.userId === userId && p.periodWeek === periodWeek && p.periodYear === periodYear
  );

  if (index >= 0) {
    db.payments[index].status = status;
    db.payments[index].verifiedById = status === 'PAID' ? session.id : undefined;
    db.payments[index].updatedAt = new Date().toISOString();
  } else {
    const newPayment: CashPayment = {
      id: 'pay-' + Math.random().toString(36).substr(2, 9),
      userId,
      periodWeek,
      periodYear,
      status,
      verifiedById: status === 'PAID' ? session.id : undefined,
      updatedAt: new Date().toISOString()
    };
    db.payments.push(newPayment);
  }

  saveDb(db);
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
  return { success: true };
}
