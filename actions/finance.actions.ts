'use server';

/**
 * actions/finance.actions.ts — Kas Kelas (Dues) Server Actions
 *
 * Exports:
 *  - createDuesPeriod    Req: 4.1–4.5, 4.8
 *  - archiveDuesPeriod   Req: 4.4
 *  - markPaymentPaid     Req: 5.1–5.4
 *  - getDuesSummary      Req: 5.7, 5.8
 *
 * Pattern: requireAuth → requireRole → safeParse → DB op → revalidatePath → ActionResult
 */

import { revalidatePath } from 'next/cache';
import type { DuesPeriod, DuesPayment } from '@/lib/types';

import { prisma } from '@/lib/db';
import { requireAuth, requireRole } from '@/lib/actions/guards';
import { formatError } from '@/lib/utils';
import { uploadToCloudinary, PROOF_FOLDER } from '@/lib/cloudinary';
import {
  createDuesPeriodSchema,
  proofImageMetaSchema,
} from '@/lib/validations/kas';
import type { ActionResult, DuesSummaryRow } from '@/lib/types';

// ── Helpers ──────────────────────────────────────────────────────────────────

const ALLOWED_ROLES = ['admin', 'bendahara'] as const;

/** Revalidate all kas-related paths after any mutation. */
function revalidateKas(): void {
  revalidatePath('/kas');
  revalidatePath('/admin/kas');
}

// ── createDuesPeriod ─────────────────────────────────────────────────────────

/**
 * Creates a new DuesPeriod.
 * Guards: requireAuth → requireRole(admin|bendahara)
 * Validation: createDuesPeriodSchema + case-insensitive duplicate name check
 */
export async function createDuesPeriod(
  input: unknown,
): Promise<ActionResult<DuesPeriod>> {
  // 1. Auth guard
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  // 2. Role guard
  const roleResult = requireRole(user, [...ALLOWED_ROLES]);
  if (!roleResult.ok) return roleResult.result;

  // 3. Zod validation
  const parsed = createDuesPeriodSchema.safeParse(input);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? 'Input tidak valid.';
    return { success: false, error: firstError };
  }

  const { name, amount, startDate, endDate } = parsed.data;

  try {
    // 4. Case-insensitive duplicate name check (Req 4.5)
    const existing = await prisma.duesPeriod.findFirst({
      where: { name: { equals: name, mode: 'insensitive' } },
    });
    if (existing) {
      return {
        success: false,
        error: 'Periode iuran dengan nama tersebut sudah ada.',
      };
    }

    // 5. Create
    const period = await prisma.duesPeriod.create({
      data: {
        name,
        amount,
        startDate: new Date(startDate),
        endDate: new Date(endDate),
      },
    });

    // 6. Revalidate
    revalidateKas();

    return { success: true, data: period };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}

// ── archiveDuesPeriod ────────────────────────────────────────────────────────

/**
 * Soft-deletes a DuesPeriod by setting isArchived = true.
 * Guards: requireAuth → requireRole(admin|bendahara)
 */
export async function archiveDuesPeriod(
  periodId: string,
): Promise<ActionResult<DuesPeriod>> {
  // 1. Auth guard
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  // 2. Role guard
  const roleResult = requireRole(user, [...ALLOWED_ROLES]);
  if (!roleResult.ok) return roleResult.result;

  try {
    const period = await prisma.duesPeriod.update({
      where: { id: periodId },
      data: { isArchived: true },
    });

    revalidateKas();

    return { success: true, data: period };
  } catch (err) {
    return {
      success: false,
      error: formatError(err) || 'Gagal mengarsipkan periode iuran. Coba lagi.',
    };
  }
}

// ── markPaymentPaid ──────────────────────────────────────────────────────────

/** Options for markPaymentPaid — proof image fields are optional. */
export interface MarkPaymentPaidOpts {
  proofImageBuffer?: Buffer;
  proofImageMimeType?: string;
  proofImageSizeBytes?: number;
  notes?: string;
}

/**
 * Marks a DuesPayment as paid.
 * Guards: requireAuth → requireRole(admin|bendahara)
 * Logic:
 *   - Rejects if current status is already "paid"
 *   - If proof image provided: validates MIME + size, uploads to Cloudinary
 *   - Updates payment record atomically
 */
export async function markPaymentPaid(
  paymentId: string,
  opts?: MarkPaymentPaidOpts,
): Promise<ActionResult<DuesPayment>> {
  // 1. Auth guard
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  // 2. Role guard
  const roleResult = requireRole(user, [...ALLOWED_ROLES]);
  if (!roleResult.ok) return roleResult.result;

  try {
    // 3. Load current payment to check status (Req 5.1)
    const current = await prisma.duesPayment.findUnique({
      where: { id: paymentId },
    });

    if (!current) {
      return { success: false, error: 'Data pembayaran tidak ditemukan.' };
    }

    if (current.status === 'paid') {
      return {
        success: false,
        error: 'Pembayaran ini sudah tercatat sebagai lunas.',
      };
    }

    // 4. Handle optional proof image
    let proofImageUrl: string | undefined;
    let proofImageCloudinaryId: string | undefined;

    if (opts?.proofImageBuffer) {
      // Validate MIME type and file size (Req 5.2)
      const metaValidation = proofImageMetaSchema.safeParse({
        mimeType: opts.proofImageMimeType,
        fileSizeBytes: opts.proofImageSizeBytes,
      });

      if (!metaValidation.success) {
        const firstError =
          metaValidation.error.issues[0]?.message ?? 'File tidak valid.';
        return { success: false, error: firstError };
      }

      // Upload to Cloudinary before updating DB (Req 5.3)
      // If upload fails, we must NOT update the DB (Req 5.4)
      let uploadResult: { url: string; publicId: string };
      try {
        uploadResult = await uploadToCloudinary(
          opts.proofImageBuffer,
          PROOF_FOLDER,
        );
      } catch {
        return {
          success: false,
          error: 'Gagal mengupload bukti pembayaran. Coba lagi.',
        };
      }

      proofImageUrl = uploadResult.url;
      proofImageCloudinaryId = uploadResult.publicId;
    }

    // 5. Update payment record
    const updated = await prisma.duesPayment.update({
      where: { id: paymentId },
      data: {
        status: 'paid',
        paidAt: new Date(),
        ...(proofImageUrl !== undefined && { proofImageUrl }),
        ...(proofImageCloudinaryId !== undefined && { proofImageCloudinaryId }),
        ...(opts?.notes !== undefined && { notes: opts.notes }),
      },
    });

    revalidateKas();

    return { success: true, data: updated };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}

// ── getDuesSummary ────────────────────────────────────────────────────────────

/**
 * Returns aggregated dues summary from the `dues_summary` SQL view.
 * Guards: requireAuth → requireRole(admin|bendahara)
 */
export async function getDuesSummary(): Promise<
  ActionResult<DuesSummaryRow[]>
> {
  // 1. Auth guard
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  // 2. Role guard
  const roleResult = requireRole(user, [...ALLOWED_ROLES]);
  if (!roleResult.ok) return roleResult.result;

  try {
    // 3. Query the dues_summary view via $queryRaw (Req 5.7)
    const rows = await prisma.$queryRawUnsafe<DuesSummaryRow[]>(
      'SELECT * FROM public.dues_summary',
    );

    return { success: true, data: rows };
  } catch (err) {
    return { success: false, error: formatError(err) };
  }
}
