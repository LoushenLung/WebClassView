import React from 'react';
import { getMaterials } from '@/actions/material.actions';
import MaterialLibrary from './_components/MaterialLibrary';

export default async function MaterialsPage() {
  const materials = await getMaterials();

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-950 dark:text-white">Perpustakaan Digital</h1>
        <p className="text-xs text-slate-400">Modul, materi kelas, dan referensi pelajaran RPL 1.</p>
      </div>
      <div className="rounded-3xl border border-slate-200/50 bg-white p-6 shadow-sm dark:border-slate-800/50 dark:bg-slate-900/50 backdrop-blur-md">
        <MaterialLibrary materials={materials} />
      </div>
    </div>
  );
}
