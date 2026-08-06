import React from 'react';
import { getMaterials } from '@/actions/schedule.actions';
import AdminMaterialCRUD from './_components/AdminMaterialCRUD';

export default async function AdminMaterialsPage() {
  const materials = await getMaterials();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Kelola Modul & Materi</h1>
        <p className="text-xs text-slate-400">Tambahkan modul PDF, presentasi PPT, link Google Drive, atau hapus dokumen usang.</p>
      </div>

      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <AdminMaterialCRUD materials={materials} />
      </div>
    </div>
  );
}
