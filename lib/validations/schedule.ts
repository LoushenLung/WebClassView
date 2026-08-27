/**
 * lib/validations/schedule.ts — Zod schemas for Jadwal Kelas domain
 *
 * Uses .superRefine() for the isBreak conditional: subject is required
 * when the slot is NOT a break period.
 *
 * Req: 8.1, 8.2 | Design §7
 */

import { z } from "zod";

export const upsertScheduleSlotSchema = z
  .object({
    /** 0 = Monday … 4 = Friday */
    dayOfWeek: z
      .number()
      .int()
      .min(0, "Hari tidak valid (0–4).")
      .max(4, "Hari tidak valid (0–4)."),
    /** Teaching period order 1–8 */
    periodOrder: z
      .number()
      .int()
      .min(1, "Urutan periode tidak valid (1–8).")
      .max(8, "Urutan periode tidak valid (1–8)."),
    /** Human-readable time label, e.g. "08:00–09:00" */
    periodLabel: z
      .string()
      .min(1, "Label periode wajib diisi.")
      .max(20, "Label periode maksimal 20 karakter."),
    subject: z.string().max(100, "Nama mata pelajaran maksimal 100 karakter.").optional(),
    teacher: z.string().max(100, "Nama guru maksimal 100 karakter.").optional(),
    room: z.string().max(50, "Nama ruangan maksimal 50 karakter.").optional(),
    /** true = break / lunch / free period; subject/teacher/room may be null */
    isBreak: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.isBreak && (!data.subject || data.subject.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mata pelajaran wajib diisi untuk slot yang bukan istirahat.",
        path: ["subject"],
      });
    }
  });

export type UpsertScheduleSlotInput = z.infer<typeof upsertScheduleSlotSchema>;
