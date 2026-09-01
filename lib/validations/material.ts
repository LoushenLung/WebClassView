/**
 * lib/validations/material.ts — Zod schemas for Materi domain
 *
 * Enforces XOR constraint: exactly one of fileUrl or externalLink must be
 * provided. This is a business rule enforced by Zod, not a DB constraint.
 *
 * Req: 10.1 | Design §7
 */

import { z } from "zod";

export const createMaterialSchema = z
  .object({
    title: z
      .string()
      .min(1, "Judul materi wajib diisi.")
      .max(200, "Judul materi maksimal 200 karakter."),
    subjectName: z
      .string()
      .min(1, "Nama mata pelajaran wajib diisi.")
      .max(100, "Nama mata pelajaran maksimal 100 karakter."),
    description: z.string().max(500, "Deskripsi maksimal 500 karakter.").optional(),
    /** Cloudinary secure_url — set after server-side upload */
    fileUrl: z.string().url("URL file tidak valid.").optional(),
    /** Cloudinary public_id — stored for later deletion */
    cloudinaryId: z.string().optional(),
    /** External link (e.g. Google Drive, YouTube) */
    externalLink: z.string().url("Tautan eksternal tidak valid.").optional(),
  })
  .superRefine((data, ctx) => {
    const hasFile = Boolean(data.fileUrl);
    const hasLink = Boolean(data.externalLink);

    if (!hasFile && !hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Harus menyertakan salah satu: file atau tautan eksternal.",
        path: ["fileUrl"],
      });
    }

    if (hasFile && hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tidak boleh menyertakan file dan tautan eksternal sekaligus.",
        path: ["externalLink"],
      });
    }
  });

export const ALLOWED_MATERIAL_MIME_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-powerpoint",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "application/zip",
  "application/x-zip-compressed",
  "application/x-rar-compressed",
  "text/plain",
  "image/jpeg",
  "image/png",
  "image/webp",
] as const;

export const MAX_MATERIAL_FILE_SIZE_BYTES = 10 * 1024 * 1024; // 10 MB

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
