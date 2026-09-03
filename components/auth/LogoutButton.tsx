"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Loader2 } from "lucide-react";
import { signOut } from "@/actions/auth.actions";

interface LogoutButtonProps {
  className?: string;
}

export default function LogoutButton({ className = "" }: LogoutButtonProps) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = () => {
    setError(null);
    startTransition(async () => {
      const result = await signOut();

      if (!result.success) {
        setError(result.error);
        return;
      }

      router.replace("/login");
      router.refresh();
    });
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={handleSignOut}
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-700/70 px-3 py-2 text-xs font-semibold text-slate-300 transition-colors hover:border-rose-500/40 hover:bg-rose-500/10 hover:text-rose-300 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isPending ? <Loader2 size={15} className="animate-spin" /> : <LogOut size={15} />}
        <span>{isPending ? "Keluar..." : "Keluar"}</span>
      </button>
      {error && (
        <p role="alert" className="mt-2 text-center text-[11px] text-rose-300">
          {error}
        </p>
      )}
    </div>
  );
}
