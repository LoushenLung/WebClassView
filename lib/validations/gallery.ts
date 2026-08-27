/**
 * lib/validations/gallery.ts — Zod schemas for Galeri Foto domain
 *
 * Req: 6.1, 6.2 | Design §7
 */

import { z } from "zod";

// ── Allowed MIME types and size limit ────────────────────────────────────────

export const ALLOWED_MIME_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5 MB (5_242_880 bytes)

// ── Create Gallery (Album) ────────────────────────────────────────────────────

export const createGallerySchema = z.object({
  title: z
    .string()
    .min(1, "Judul album wajib diisi.")
    .max(200, "Judul album maksimal 200 karakter."),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter.").optional(),
  /** ISO datetime string representing the event date */
  eventDate: z.string().datetime("Format tanggal kegiatan tidak valid."),
});

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;

// ── Upload Photo (metadata validation — file buffer handled separately) ───────

export const uploadPhotoSchema = z.object({
  /** ID of the PhotoGallery this photo belongs to */
  galleryId: z.string().min(1, "ID album tidak valid."),
  /** MIME type of the uploaded file */
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    errorMap: () => ({
      message: "Format foto harus JPEG, PNG, atau WebP.",
    }),
  }),
  /** File size in bytes */
  fileSizeBytes: z
    .number()
    .int()
    .max(MAX_FILE_SIZE_BYTES, "Ukuran foto maksimal 5 MB."),
  /** Optional caption */
  caption: z.string().max(300, "Keterangan foto maksimal 300 karakter.").optional(),
});

export type UploadPhotoInput = z.infer<typeof uploadPhotoSchema>;
