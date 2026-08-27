/**
 * lib/validations/forum.ts — Zod schemas for Forum domain
 *
 * Req: 11.1, 11.2 | Design §7
 */

import { z } from "zod";

// ── Create Post ───────────────────────────────────────────────────────────────

export const createPostSchema = z.object({
  title: z
    .string()
    .min(1, "Judul postingan wajib diisi.")
    .max(200, "Judul postingan maksimal 200 karakter."),
  content: z.string().min(1, "Isi postingan wajib diisi."),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;

// ── Create Comment ────────────────────────────────────────────────────────────

export const createCommentSchema = z.object({
  postId: z.string().min(1, "ID postingan tidak valid."),
  content: z.string().min(1, "Isi komentar wajib diisi."),
});

export type CreateCommentInput = z.infer<typeof createCommentSchema>;
