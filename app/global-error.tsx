'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('[Global Error Boundary]', error);
  }, [error]);

  return (
    <html lang="id">
      <body className="bg-[#0B0B1A] text-slate-100 min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md w-full rounded-3xl border border-slate-800/80 bg-slate-900/60 p-8 text-center backdrop-blur-xl shadow-2xl space-y-6">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
            <AlertTriangle className="h-8 w-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-extrabold tracking-tight bg-gradient-to-r from-rose-400 to-amber-400 bg-clip-text text-transparent">
              Kesalahan Sistem Fatal
            </h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Terjadi kesalahan kritis pada tata letak aplikasi. Silakan muat ulang halaman.
            </p>
            {error.digest && (
              <p className="text-[10px] text-slate-600 font-mono">
                Digest: {error.digest}
              </p>
            )}
          </div>

          <div className="pt-2">
            <button
              onClick={() => reset()}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-6 py-2.5 text-xs font-bold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 transition-all cursor-pointer"
            >
              <RefreshCw className="h-4 w-4" />
              Muat Ulang Halaman
            </button>
          </div>
        </div>
      </body>
    </html>
  );
}
