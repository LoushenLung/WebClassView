// Feature: backend-class-rpl-1, Property 5: Forum answer uniqueness invariant

/**
 * Property 5: Forum answer uniqueness invariant
 * Validates: Req 11.3
 *
 * For any forum post with any number of comments, after running the same
 * atomic transaction as `markCommentAsAnswer(commentId)`, exactly one comment
 * on that post SHALL have `isAnswer = true` — the target comment — and all
 * others SHALL have `isAnswer = false`.
 *
 * NOTE: We test the DB logic directly (not the Server Action) because the
 * Server Action requires a Next.js request context (cookies, requireAuth).
 * The transaction being tested is identical to what markCommentAsAnswer runs.
 */

import { describe, it, beforeAll, afterAll } from "vitest";
import * as fc from "fast-check";
import { prisma } from "@/lib/db";
import { randomUUID } from "crypto";

// ---------------------------------------------------------------------------
// DB availability guard — skip entire suite if DB is unreachable
// ---------------------------------------------------------------------------

let dbAvailable = false;

beforeAll(async () => {
  try {
    // Use a short-circuit race so a paused/unreachable Supabase DB doesn't
    // block the entire test run for several minutes.
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("DB connection timeout")), 8000),
    );
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeout]);
    dbAvailable = true;
  } catch {
    console.warn(
      "[forum.property] DB unavailable — skipping Property 5 tests.",
    );
  }
}, 10_000);

afterAll(async () => {
  await prisma.$disconnect();
});

// ---------------------------------------------------------------------------
// Fixture helpers
// ---------------------------------------------------------------------------

/**
 * Creates a minimal User row in `public.users`.
 * Uses a deterministic UUID so the row can be reused if it already exists.
 */
async function ensureFixtureUser(): Promise<string> {
  const id = "00000000-0000-0000-0000-000000000001";
  await prisma.user.upsert({
    where: { id },
    create: {
      id,
      email: "fixture-forum-test@example.invalid",
      name: "Fixture Forum User",
      role: "admin",
    },
    update: {},
  });
  return id;
}

/**
 * Replicates the exact prisma.$transaction from markCommentAsAnswer:
 *   1. Clear isAnswer on all sibling comments in the same post.
 *   2. Set isAnswer = true on the target comment.
 */
async function runMarkAsAnswerTransaction(
  postId: string,
  commentId: string,
): Promise<void> {
  await prisma.$transaction([
    prisma.forumComment.updateMany({
      where: { postId, id: { not: commentId } },
      data: { isAnswer: false },
    }),
    prisma.forumComment.update({
      where: { id: commentId },
      data: { isAnswer: true },
    }),
  ]);
}

// ---------------------------------------------------------------------------
// Property 5: Forum answer uniqueness invariant
// ---------------------------------------------------------------------------

describe("Property 5 — Forum answer uniqueness invariant", () => {
  it(
    "markCommentAsAnswer transaction always results in exactly one isAnswer=true per post",
    async () => {
      if (!dbAvailable) {
        console.warn("[Property 5] Skipped — DB unavailable.");
        return;
      }

      const userId = await ensureFixtureUser();

      await fc.assert(
        fc.asyncProperty(
          fc.integer({ min: 2, max: 10 }), // numComments — min 2 to make the invariant meaningful
          fc.nat(), // targetIndexSeed — pick which comment to mark as answer
          async (numComments, targetIndexSeed) => {
            // ── 1. Create a fresh ForumPost ────────────────────────────────
            const post = await prisma.forumPost.create({
              data: {
                title: `PBT Post ${randomUUID().slice(0, 8)}`,
                content: "Property-based test post",
                createdById: userId,
              },
            });

            // ── 2. Create numComments ForumComments (all isAnswer = false) ─
            const comments = await Promise.all(
              Array.from({ length: numComments }).map((_, i) =>
                prisma.forumComment.create({
                  data: {
                    postId: post.id,
                    content: `Comment ${i}`,
                    createdById: userId,
                  },
                }),
              ),
            );

            const targetComment = comments[targetIndexSeed % numComments];

            // ── 3. Run the same transaction as markCommentAsAnswer ─────────
            await runMarkAsAnswerTransaction(post.id, targetComment.id);

            // ── 4. Read back all comments ──────────────────────────────────
            const allComments = await prisma.forumComment.findMany({
              where: { postId: post.id },
            });

            const answerCount = allComments.filter((c) => c.isAnswer).length;
            const targetIsAnswer = allComments.find(
              (c) => c.id === targetComment.id,
            )?.isAnswer;

            // ── 5. Cleanup (always, even if assertions fail) ───────────────
            await prisma.forumPost.delete({ where: { id: post.id } });

            // ── 6. Assert the invariant ────────────────────────────────────
            return answerCount === 1 && targetIsAnswer === true;
          },
        ),
        { numRuns: 50 },
      );
    },
  );
});
