/**
 * lib/validations/attendance.ts — Zod schemas for Presensi domain
 * Req: 9.1, 14.3 | Design §7
 */

import { z } from "zod";

export const ATTENDANCE_STATUSES = ["HADIR", "IZIN", "SAKIT", "ALFA"] as const;

export const recordAttendanceSchema = z.object({
  studentId: z.string().uuid("studentId harus berupa UUID yang valid."),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD."),
  status: z.enum(ATTENDANCE_STATUSES, {
    error: () => "Status presensi harus salah satu dari: HADIR, IZIN, SAKIT, ALFA.",
  }),
});

export type RecordAttendanceInput = z.infer<typeof recordAttendanceSchema>;
