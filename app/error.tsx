'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[App Error Boundary]', error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#0B0B1A] text-slate-100">
      <div className="max-w-md w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 text-center backdrop-blur-xl shadow-2xl space-y-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
          <AlertTriangle className="h-8 w-8 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
            Terjadi Kesalahan Aplikasi
          </h2>
          <p className="text-xs text-slate-400 leading-relaxed">
            Maaf, sistem mengalami kendala yang tidak terduga. Silakan coba memuat ulang halaman ini.
          </p>
          {error.digest && (
            <p className="text-[10px] text-slate-600 font-mono">
              Kode Error: {error.digest}
            </p>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
          >
            <RefreshCw className="h-4 w-4" />
            Coba Lagi
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-800/50 px-5 py-2.5 text-xs font-bold text-slate-300 hover:bg-slate-800 hover:text-white transition-all"
          >
            <Home className="h-4 w-4" />
            Kembali ke Beranda
          </Link>
        </div>
      </div>
    </div>
  );
}
