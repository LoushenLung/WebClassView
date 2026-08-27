/**
 * lib/validations/attendance.ts — Zod schemas for Presensi domain
 *
 * Uses z.string().uuid() for studentId and z.enum() for status
 * to match DB constraints exactly.
 *
 * Req: 9.1, 14.3 | Design §7
 */

import { z } from "zod";

export const ATTENDANCE_STATUSES = ["HADIR", "IZIN", "SAKIT", "ALFA"] as const;

export const recordAttendanceSchema = z.object({
  /** UUID of the student (must match public.users.id) */
  studentId: z.string().uuid("studentId harus berupa UUID yang valid."),
  /** Date in YYYY-MM-DD format */
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD."),
  /** Attendance status — must be one of the four canonical values */
  status: z.enum(ATTENDANCE_STATUSES, {
    errorMap: () => ({
      message: "Status presensi harus salah satu dari: HADIR, IZIN, SAKIT, ALFA.",
    }),
  }),
});

export type RecordAttendanceInput = z.infer<typeof recordAttendanceSchema>;
