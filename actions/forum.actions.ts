'use server';

/**
 * actions/forum.actions.ts — Server Actions for Forum domain
 *
 * Req: 11.1, 11.2, 11.3, 11.4, 11.5 | Design §7
 */

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/db';
import { requireAuth, requireRole } from '@/lib/actions/guards';
import { formatError } from '@/lib/utils';
import type { ActionResult, ForumPost, ForumComment } from '@/lib/types';
import {
  createPostSchema,
  createCommentSchema,
  type CreatePostInput,
  type CreateCommentInput,
} from '@/lib/validations/forum';

// ---------------------------------------------------------------------------
// Queries
// ---------------------------------------------------------------------------

/**
 * Returns all forum posts with their comments and author info,
 * ordered newest-first.
 */
export async function getForumPosts(): Promise<
  ActionResult<
    (ForumPost & {
      comments: ForumComment[];
      author: { name: string; avatarUrl: string | null };
    })[]
  >
> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;

  try {
    const posts = await prisma.forumPost.findMany({
      include: {
        comments: true,
        author: {
          select: { name: true, avatarUrl: true },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return { success: true, data: posts };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

/**
 * Returns all comments for a given post, ordered oldest-first.
 */
export async function getForumComments(
  postId: string,
): Promise<ActionResult<ForumComment[]>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;

  try {
    const comments = await prisma.forumComment.findMany({
      where: { postId },
      orderBy: { createdAt: 'asc' },
    });

    return { success: true, data: comments };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

// ---------------------------------------------------------------------------
// Mutations
// ---------------------------------------------------------------------------

/**
 * Creates a new forum post. All authenticated roles are allowed.
 */
export async function createPost(
  input: CreatePostInput,
): Promise<ActionResult<ForumPost>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  const parsed = createPostSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Input tidak valid.',
    };
  }

  const { title, content } = parsed.data;

  try {
    const post = await prisma.forumPost.create({
      data: { title, content, createdById: user.id },
    });

    revalidatePath('/forum');
    return { success: true, data: post };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

/**
 * Creates a new comment on an existing forum post.
 * Verifies the target post exists before inserting.
 */
export async function createComment(
  input: CreateCommentInput,
): Promise<ActionResult<ForumComment>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  const parsed = createCommentSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: parsed.error.issues[0]?.message ?? 'Input tidak valid.',
    };
  }

  const { postId, content } = parsed.data;

  try {
    // Verify the target post exists
    const post = await prisma.forumPost.findUnique({ where: { id: postId } });
    if (!post) {
      return { success: false, error: 'Postingan tidak ditemukan.' };
    }

    const comment = await prisma.forumComment.create({
      data: { postId, content, createdById: user.id },
    });

    revalidatePath('/forum');
    return { success: true, data: comment };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

/**
 * Marks a comment as the accepted answer for its parent post.
 * Only admin and bendahara may do this.
 * Atomically clears isAnswer on all sibling comments first.
 */
export async function markCommentAsAnswer(
  commentId: string,
): Promise<ActionResult<ForumComment>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  const roleResult = requireRole(user, ['admin', 'bendahara']);
  if (!roleResult.ok) return roleResult.result;

  try {
    const comment = await prisma.forumComment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return { success: false, error: 'Komentar tidak ditemukan.' };
    }

    const { postId } = comment;

    const [, updated] = await prisma.$transaction([
      // Clear isAnswer on all other comments in the same post
      prisma.forumComment.updateMany({
        where: { postId, id: { not: commentId } },
        data: { isAnswer: false },
      }),
      // Mark the target comment as the answer
      prisma.forumComment.update({
        where: { id: commentId },
        data: { isAnswer: true },
      }),
    ]);

    revalidatePath('/forum');
    return { success: true, data: updated };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

/**
 * Deletes a forum post (and all its comments via Cascade).
 * Allowed if: user is the post author OR user has admin/bendahara role.
 */
export async function deletePost(
  postId: string,
): Promise<ActionResult<ForumPost>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  try {
    const post = await prisma.forumPost.findUnique({ where: { id: postId } });
    if (!post) {
      return { success: false, error: 'Postingan tidak ditemukan.' };
    }

    const isAuthor = post.createdById === user.id;
    const isPrivileged =
      requireRole(user, ['admin', 'bendahara']).ok;

    if (!isAuthor && !isPrivileged) {
      return {
        success: false,
        error: 'Anda tidak memiliki izin untuk menghapus postingan ini.',
      };
    }

    const deleted = await prisma.forumPost.delete({ where: { id: postId } });

    revalidatePath('/forum');
    revalidatePath('/admin/forum');
    return { success: true, data: deleted };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}

/**
 * Deletes a single forum comment.
 * Allowed if: user is the comment author OR user has admin/bendahara role.
 */
export async function deleteComment(
  commentId: string,
): Promise<ActionResult<ForumComment>> {
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  try {
    const comment = await prisma.forumComment.findUnique({
      where: { id: commentId },
    });
    if (!comment) {
      return { success: false, error: 'Komentar tidak ditemukan.' };
    }

    const isAuthor = comment.createdById === user.id;
    const isPrivileged =
      requireRole(user, ['admin', 'bendahara']).ok;

    if (!isAuthor && !isPrivileged) {
      return {
        success: false,
        error: 'Anda tidak memiliki izin untuk menghapus komentar ini.',
      };
    }

    const deleted = await prisma.forumComment.delete({
      where: { id: commentId },
    });

    revalidatePath('/forum');
    return { success: true, data: deleted };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
