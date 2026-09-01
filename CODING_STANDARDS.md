# Web Class Project Coding Standards & Architecture Guidelines

This document outlines the clear, efficient, and professional coding standards for `class-rpl-1-202627`.

---

## 1. Type Safety & Zero `any` Policy

- **Strict Typing**: All variables, parameters, return types, and object structures must be explicitly typed or strictly inferred by TypeScript.
- **Zero `any` Usage**: `any` type is strictly forbidden across the codebase. Use generics, union types, or `unknown` with Zod validation.
- **Action Returns**: All Server Actions MUST return `Promise<ActionResult<T>>` or `Promise<T>` with explicit type parameters.

```ts
export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };
```

---

## 2. Server Action Security & Guards

Every Server Action that alters or accesses sensitive data MUST follow this exact execution order:

1. **Authentication Guard**: Call `requireAuth()` to resolve the session user. Never trust caller-provided user IDs.
2. **Role Guard**: Call `requireRole(user, ['admin', 'bendahara'])` for administrative operations.
3. **Input Validation**: Use Zod `schema.safeParse(input)` to validate incoming payloads before DB operations.
4. **Database & External Services**: Perform atomic database queries using Prisma. Handle Cloudinary uploads before DB transactions where applicable.
5. **Cache Revalidation**: Revalidate relevant App Router paths via `revalidatePath()`.
6. **Error Wrapping**: Wrap all execution blocks in `try / catch` and format exceptions using `formatError(error)`.

---

## 3. Fail-Safe Error Handling

- **`formatError(error: unknown)`**: All caught exceptions in Server Actions must pass through `formatError` in `lib/utils.ts`.
- **No Technical Leaks**: Error messages displayed to users MUST NEVER expose table names, column names, stack traces, or raw database codes.
- **Fail-Safe Date Parsing**: Utility functions like `formatDate` must gracefully handle `null`, `undefined`, or invalid date strings without throwing runtime errors.
- **Lazy External Integrations**: SDKs with external API credentials (e.g. Cloudinary, Supabase) must use lazy initialization to prevent server-boot crashes when environment variables are omitted during build/testing.

---

## 4. React 19 & Next.js App Router Component Rules

- **No Static Components in Render Loops**: Never declare functional components inside the render cycle of another component (e.g., `const Inner = () => ...` inside `Parent`). Extract them to top-level module components to avoid state resets on re-render.
- **Error Boundaries**: Root pages must be guarded by `app/error.tsx`, `app/global-error.tsx`, and `app/not-found.tsx` with user-friendly Indonesian fallback interfaces.
- **Client/Server Boundary**: Keep Server Components pure. Only add `'use client'` when state hooks (`useState`, `useEffect`) or browser event handlers are required.

---

## 5. UI & Styling Guidelines

- **Design System**: Use Vanilla CSS / Tailwind utilities with curated dark/light color schemes (`#0B0B1A` dark base, glassmorphism `backdrop-blur`, subtle borders `border-slate-800/60`).
- **Interactive Feedback**: Show loading states, spinners, and disabled buttons on pending actions.
