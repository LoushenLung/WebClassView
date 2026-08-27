/**
 * lib/validations/kas.ts — Zod schemas for Kas Kelas (Dues) domain
 *
 * Shared between client-side form validation and server-side Server Action
 * validation. Both sides MUST call safeParse — never skip server validation.
 *
 * Req: 4.1, 4.2, 5.2 | Design §7
 */

import { z } from "zod";

// ── Create Dues Period ────────────────────────────────────────────────────────

export const createDuesPeriodSchema = z
  .object({
    /** Period label, e.g. "Semester 1 2026-2027" */
    name: z
      .string()
      .min(1, "Nama periode wajib diisi.")
      .max(100, "Nama periode maksimal 100 karakter."),
    /** Amount in Rupiah — integer, no decimals */
    amount: z
      .number()
      .int("Jumlah iuran harus berupa bilangan bulat.")
      .min(1, "Jumlah iuran harus lebih dari 0.")
      .max(999_999_999, "Jumlah iuran terlalu besar."),
    /** ISO datetime string */
    startDate: z.string().datetime("Format tanggal mulai tidak valid."),
    /** ISO datetime string */
    endDate: z.string().datetime("Format tanggal selesai tidak valid."),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tanggal selesai harus lebih besar dari tanggal mulai.",
    path: ["endDate"],
  });

export type CreateDuesPeriodInput = z.infer<typeof createDuesPeriodSchema>;

// ── Mark Payment Paid ─────────────────────────────────────────────────────────

export const markPaymentPaidSchema = z.object({
  paymentId: z.string().min(1, "ID pembayaran tidak valid."),
  /** Optional notes from the treasurer */
  notes: z.string().max(500, "Catatan maksimal 500 karakter.").optional(),
  // proofImage is handled as Buffer/File — not part of the JSON schema
});

export type MarkPaymentPaidInput = z.infer<typeof markPaymentPaidSchema>;

// ── Proof image file validation (used server-side before Cloudinary upload) ──

export const ALLOWED_PROOF_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_PROOF_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB

export const proofImageMetaSchema = z.object({
  mimeType: z.enum(ALLOWED_PROOF_MIME_TYPES, {
    errorMap: () => ({ message: "Format bukti bayar harus JPEG, PNG, atau WebP." }),
  }),
  fileSizeBytes: z
    .number()
    .int()
    .max(MAX_PROOF_FILE_SIZE_BYTES, "Ukuran bukti bayar maksimal 5 MB."),
});

export type ProofImageMeta = z.infer<typeof proofImageMetaSchema>;
