/**
 * lib/validations/announcement.ts — Zod schemas for Pengumuman domain
 *
 * Req: 7.2 | Design §7
 */

import { z } from "zod";

// ── Create Announcement ───────────────────────────────────────────────────────

export const createAnnouncementSchema = z.object({
  title: z
    .string()
    .min(1, "Judul pengumuman wajib diisi.")
    .max(200, "Judul pengumuman maksimal 200 karakter."),
  content: z.string().min(1, "Isi pengumuman wajib diisi."),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;

// ── Update Announcement ───────────────────────────────────────────────────────

export const updateAnnouncementSchema = z.object({
  id: z.string().min(1, "ID pengumuman tidak valid."),
  title: z
    .string()
    .min(1, "Judul pengumuman wajib diisi.")
    .max(200, "Judul pengumuman maksimal 200 karakter.")
    .optional(),
  content: z.string().min(1, "Isi pengumuman wajib diisi.").optional(),
});

export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
