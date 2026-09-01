/**
 * lib/utils.ts — Shared utility functions
 *
 * Safe error formatting, currency, and date helpers used across the backend.
 * Req: 13.2, 13.4 | Design §11
 *
 * SECURITY INVARIANT: `formatError` NEVER leaks table names, column names,
 * stack traces, or Postgres error codes in the returned string.
 * Raw error details are only sent to `console.error` for server-side logging.
 */

// ---------------------------------------------------------------------------
// Error formatting
// ---------------------------------------------------------------------------

/**
 * Converts an unknown error to a safe, user-facing Indonesian message.
 *
 * Always logs the raw error server-side before mapping to a safe string.
 * The returned string never contains technical details (Postgres codes,
 * table/column names, stack traces).
 *
 * @param error - The caught value from a try/catch block.
 * @returns A safe Indonesian error message suitable for UI display.
 */
export function formatError(error: unknown): string {
  // Always log the full technical details server-side first.
  console.error("[Server Error]", error);

  if (error instanceof Error) {
    const msg = error.message;

    // Prisma unique constraint violation (e.g. @@unique, @unique)
    if (msg.includes("P2002")) {
      return "Data dengan nilai tersebut sudah ada. Pastikan tidak ada duplikasi.";
    }

    // Prisma record not found
    if (msg.includes("P2025")) {
      return "Data yang dimaksud tidak ditemukan.";
    }

    // Cloudinary / file upload errors
    if (
      msg.toLowerCase().includes("cloudinary") ||
      msg.toLowerCase().includes("upload")
    ) {
      return "Gagal memproses file. Coba lagi atau hubungi administrator.";
    }

    // JWT / session / token errors
    if (
      msg.includes("JWT") ||
      msg.includes("token") ||
      msg.includes("session")
    ) {
      return "Sesi tidak valid. Silakan login kembali.";
    }
  }

  // Generic fallback — covers non-Error throws and unmapped errors
  return "Terjadi kesalahan. Coba lagi atau hubungi administrator.";
}

// ---------------------------------------------------------------------------
// Currency formatting
// ---------------------------------------------------------------------------

/**
 * Formats a numeric amount as Indonesian Rupiah.
 *
 * @example
 * formatCurrency(150000) // → "Rp 150.000"
 *
 * @param amount - Amount in Rupiah (integer, no decimals).
 * @returns Formatted string, e.g. "Rp 150.000".
 */
export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
}

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Formats a date in the Indonesian long-form locale.
 *
 * @example
 * formatDate(new Date("2026-08-17")) // → "17 Agustus 2026"
 * formatDate("2026-08-17")           // → "17 Agustus 2026"
 *
 * @param date - A `Date` object or an ISO date string.
 * @returns Formatted date string, e.g. "17 Agustus 2026".
 */
export function formatDate(date: Date | string | null | undefined): string {
  if (!date) return "-";
  const d = typeof date === "string" ? new Date(date) : date;
  if (isNaN(d.getTime())) return "-";

  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(d);
}
