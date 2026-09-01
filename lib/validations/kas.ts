/**
 * lib/validations/kas.ts — Zod schemas for Kas Kelas (Dues) domain
 * Req: 4.1, 4.2, 5.2 | Design §7
 */

import { z } from "zod";

export const createDuesPeriodSchema = z
  .object({
    name: z.string().min(1, "Nama periode wajib diisi.").max(100, "Nama periode maksimal 100 karakter."),
    amount: z
      .number()
      .int("Jumlah iuran harus berupa bilangan bulat.")
      .min(1, "Jumlah iuran harus lebih dari 0.")
      .max(999_999_999, "Jumlah iuran terlalu besar."),
    startDate: z.string().datetime("Format tanggal mulai tidak valid."),
    endDate: z.string().datetime("Format tanggal selesai tidak valid."),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tanggal selesai harus lebih besar dari tanggal mulai.",
    path: ["endDate"],
  });

export type CreateDuesPeriodInput = z.infer<typeof createDuesPeriodSchema>;

export const markPaymentPaidSchema = z.object({
  paymentId: z.string().min(1, "ID pembayaran tidak valid."),
  notes: z.string().max(500, "Catatan maksimal 500 karakter.").optional(),
});

export type MarkPaymentPaidInput = z.infer<typeof markPaymentPaidSchema>;

export const ALLOWED_PROOF_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_PROOF_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const proofImageMetaSchema = z.object({
  mimeType: z.enum(ALLOWED_PROOF_MIME_TYPES, {
    error: () => "Format bukti bayar harus JPEG, PNG, atau WebP.",
  }),
  fileSizeBytes: z.number().int().max(MAX_PROOF_FILE_SIZE_BYTES, "Ukuran bukti bayar maksimal 5 MB."),
});

export type ProofImageMeta = z.infer<typeof proofImageMetaSchema>;

export const createCashTransactionSchema = z.object({
  title: z.string().min(1, "Judul transaksi wajib diisi.").max(150, "Judul transaksi maksimal 150 karakter."),
  amount: z.number().int("Jumlah harus berupa bilangan bulat.").min(1, "Jumlah harus lebih dari 0."),
  type: z.enum(["INCOME", "EXPENSE"], { error: () => "Tipe transaksi harus INCOME atau EXPENSE." }),
  category: z.string().max(100, "Kategori maksimal 100 karakter.").optional(),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter.").optional(),
});

export type CreateCashTransactionInput = z.infer<typeof createCashTransactionSchema>;
