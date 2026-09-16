// Feature: backend-class-rpl-1, Property 4: Material XOR constraint

/**
 * Property 4: Material XOR constraint
 * Validates: Req 10.1
 *
 * The createMaterialSchema enforces an XOR constraint:
 * exactly one of `fileUrl` OR `externalLink` must be present.
 * Both absent → reject. Both present → reject. Exactly one → accept.
 */

import { describe, it, expect } from "vitest";
import * as fc from "fast-check";
import { createMaterialSchema } from "@/lib/validations/material";

// ---------------------------------------------------------------------------
// Arbitraries
// ---------------------------------------------------------------------------

/** Valid non-empty string up to 200 chars for `title` */
const titleArb = fc
  .string({ minLength: 1, maxLength: 200 })
  .filter((s) => s.trim().length > 0);

/** Valid non-empty string up to 100 chars for `subjectName` */
const subjectNameArb = fc
  .string({ minLength: 1, maxLength: 100 })
  .filter((s) => s.trim().length > 0);

/** Valid URL — use a small set of known-valid URLs to avoid fc.webUrl() edge cases */
const validUrlArb = fc.constantFrom(
  "https://example.com/file.pdf",
  "https://drive.google.com/file/d/abc123",
  "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
  "https://storage.googleapis.com/bucket/object",
  "https://res.cloudinary.com/demo/image/upload/sample.pdf",
);

// ---------------------------------------------------------------------------
// Test 1: Both fileUrl and externalLink absent → must reject (numRuns: 150)
// ---------------------------------------------------------------------------

describe("Property 4 — Material XOR constraint", () => {
  it(
    "Test 1: keduanya absent → reject",
    () => {
      fc.assert(
        fc.property(titleArb, subjectNameArb, (title, subjectName) => {
          const result = createMaterialSchema.safeParse({
            title,
            subjectName,
            // fileUrl absent
            // externalLink absent
          });

          expect(result.success).toBe(false);
          if (!result.success) {
            const paths = result.error.issues.map((i) => i.path.join("."));
            expect(paths).toContain("fileUrl");
          }
        }),
        { numRuns: 150 },
      );
    },
  );

  // -------------------------------------------------------------------------
  // Test 2: Both fileUrl and externalLink present → must reject (numRuns: 150)
  // -------------------------------------------------------------------------

  it(
    "Test 2: keduanya present → reject",
    () => {
      fc.assert(
        fc.property(
          titleArb,
          subjectNameArb,
          validUrlArb,
          validUrlArb,
          (title, subjectName, fileUrl, externalLink) => {
            const result = createMaterialSchema.safeParse({
              title,
              subjectName,
              fileUrl,
              externalLink,
            });

            expect(result.success).toBe(false);
            if (!result.success) {
              const paths = result.error.issues.map((i) => i.path.join("."));
              expect(paths).toContain("externalLink");
            }
          },
        ),
        { numRuns: 150 },
      );
    },
  );

  // -------------------------------------------------------------------------
  // Test 3: Exactly one present → must accept (numRuns: 200)
  // -------------------------------------------------------------------------

  it(
    "Test 3: tepat satu present → accept",
    () => {
      fc.assert(
        fc.property(
          titleArb,
          subjectNameArb,
          validUrlArb,
          fc.boolean(),
          (title, subjectName, url, useFileUrl) => {
            const input = useFileUrl
              ? { title, subjectName, fileUrl: url }
              : { title, subjectName, externalLink: url };

            const result = createMaterialSchema.safeParse(input);

            expect(result.success).toBe(true);
          },
        ),
        { numRuns: 200 },
      );
    },
  );
});
