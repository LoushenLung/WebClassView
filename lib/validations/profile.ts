/**
 * lib/validations/profile.ts — Zod schemas for Profile domain
 * Req: 12.1 | Design §7
 */

import { z } from "zod";

// ── Update Profile ────────────────────────────────────────────────────────────

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(1, "Nama wajib diisi.")
    .max(100, "Nama maksimal 100 karakter."),
  avatarUrl: z.string().url("URL avatar tidak valid.").optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
