// Feature: backend-class-rpl-1, Property 1: DuesPeriod date ordering invariant

/**
 * Property 1: DuesPeriod date ordering invariant
 * Validates: Req 4.2
 *
 * The createDuesPeriodSchema MUST reject any input where endDate ≤ startDate,
 * and MUST accept any input where endDate > startDate.
 */

import * as fc from "fast-check";
import { describe, it, expect } from "vitest";
import { createDuesPeriodSchema } from "@/lib/validations/kas";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

/** Build a valid base payload with the given date strings. */
function buildPayload(
  startDate: string,
  endDate: string,
): {
  name: string;
  amount: number;
  startDate: string;
  endDate: string;
} {
  return {
    name: "Periode Kas",
    amount: 50_000,
    startDate,
    endDate,
  };
}

// ---------------------------------------------------------------------------
// Arbitrary: a Date clamped to a range Zod's z.string().datetime() handles.
// We clamp to [1970-01-01, 9999-12-31] so .toISOString() is always valid.
// ---------------------------------------------------------------------------
const MIN_DATE = new Date("1970-01-01T00:00:00.000Z").getTime();
const MAX_DATE = new Date("9999-12-31T23:59:59.999Z").getTime();

const arbDate = fc
  .integer({ min: MIN_DATE, max: MAX_DATE })
  .map((ms) => new Date(ms));

// ---------------------------------------------------------------------------
// Test 1: endDate ≤ startDate  →  schema MUST reject
// ---------------------------------------------------------------------------
describe("Property 1 — DuesPeriod date ordering invariant", () => {
  it(
    "Test 1: rejects all inputs where endDate ≤ startDate",
    () => {
      fc.assert(
        fc.property(
          arbDate,
          // offset in days from 0..365*5; subtract it so endDate ≤ startDate
          fc.nat({ max: 365 * 5 }),
          (startDate, offsetDays) => {
            // endDate is at most equal to startDate (offset = 0 means equal)
            const endDateMs = startDate.getTime() - offsetDays * 86_400_000;
            // clamp endDate so it stays inside the valid ISO range
            const clampedEndMs = Math.max(MIN_DATE, endDateMs);
            const endDate = new Date(clampedEndMs);

            const result = createDuesPeriodSchema.safeParse(
              buildPayload(startDate.toISOString(), endDate.toISOString()),
            );

            return result.success === false;
          },
        ),
        { numRuns: 200 },
      );
    },
  );

  // -------------------------------------------------------------------------
  // Test 2: endDate > startDate  →  schema MUST accept
  // -------------------------------------------------------------------------
  it(
    "Test 2: accepts all inputs where endDate > startDate",
    () => {
      fc.assert(
        fc.property(
          arbDate,
          // offset in days 1..365*5; add it so endDate is strictly after startDate
          fc.nat({ max: 365 * 5 - 1 }).map((n) => n + 1),
          (startDate, offsetDays) => {
            const endDateMs = startDate.getTime() + offsetDays * 86_400_000;
            // clamp so we stay inside the valid ISO range
            const clampedEndMs = Math.min(MAX_DATE, endDateMs);
            const endDate = new Date(clampedEndMs);

            // If clamping caused endDate to collide with startDate, skip this run
            // (extremely unlikely at the boundary, but guard for correctness)
            if (endDate.getTime() <= startDate.getTime()) return true;

            const result = createDuesPeriodSchema.safeParse(
              buildPayload(startDate.toISOString(), endDate.toISOString()),
            );

            return result.success === true;
          },
        ),
        { numRuns: 200 },
      );
    },
  );
});
