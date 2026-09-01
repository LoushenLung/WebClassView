import React from 'react';
import Link from 'next/link';
import { Compass, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0B1A] text-slate-100">
      <div className="max-w-md w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 text-center backdrop-blur-xl shadow-2xl space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
          <Compass className="h-8 w-8 animate-spin-slow" />
        </div>

        <div className="space-y-2">
          <span className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent">
            404
          </span>
          <h2 className="text-lg font-bold text-slate-200">
            Halaman Tidak Ditemukan
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Halaman yang Anda cari tidak tersedia, telah dipindahkan, atau alamat URL yang dimasukkan salah.
          </p>
        </div>

        <div className="pt-2">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
