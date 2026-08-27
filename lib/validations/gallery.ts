/**
 * lib/validations/gallery.ts — Zod schemas for Galeri Foto domain
 * Req: 6.1, 6.2 | Design §7
 */

import { z } from "zod";

export const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024;

export const createGallerySchema = z.object({
  title: z.string().min(1, "Judul album wajib diisi.").max(200, "Judul album maksimal 200 karakter."),
  description: z.string().max(500, "Deskripsi maksimal 500 karakter.").optional(),
  eventDate: z.string().datetime("Format tanggal kegiatan tidak valid."),
});

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;

export const uploadPhotoSchema = z.object({
  galleryId: z.string().min(1, "ID album tidak valid."),
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    error: () => "Format foto harus JPEG, PNG, atau WebP.",
  }),
  fileSizeBytes: z.number().int().max(MAX_FILE_SIZE_BYTES, "Ukuran foto maksimal 5 MB."),
  caption: z.string().max(300, "Keterangan foto maksimal 300 karakter.").optional(),
});

export type UploadPhotoInput = z.infer<typeof uploadPhotoSchema>;
