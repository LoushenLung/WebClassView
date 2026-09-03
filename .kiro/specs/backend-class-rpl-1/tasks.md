# Implementation Plan: Backend `class-rpl-1-202627`

## Overview

Rencana implementasi ini menggantikan mock in-memory database (`getDb/saveDb`) dengan backend produksi berbasis Supabase Postgres + Prisma + RLS + Cloudinary. Urutan task mengikuti dependency ordering yang ketat: foundation → database → auth → shared utilities → feature actions → tests.

**Stack:** Next.js 15 App Router · TypeScript strict (no `any`) · Supabase Auth + RLS · Prisma · Cloudinary · Zod · Vitest + fast-check

**Constraint:** Semua TypeScript WAJIB strict mode. Tidak ada `any` — gunakan `unknown` + narrowing.

---

## Tasks

---

### Group 1: Foundation & Infrastructure

- [ ] 1. Buat file foundation dan infrastruktur dasar
  - [x] 1.1 Buat `lib/types.ts` — Type system terpusat [M]
    - Definisikan `ActionResult<T>` sebagai discriminated union `{ success: true; data: T } | { success: false; error: string }`
    - Definisikan `UserRole = "admin" | "bendahara" | "murid"`
    - Definisikan `PaymentStatus`, `AttendanceStatus`, `AnnouncementStatus` sebagai union types
    - Definisikan interface `AttendanceStats { studentsCount, presentCount, attendanceRate }`
    - Definisikan interface `DuesSummaryRow` dengan semua field dari SQL view `dues_summary`
    - Definisikan interface `CurrentUser { id, email, name, role, avatarUrl }`
    - Re-export semua Prisma model types (`User`, `DuesPeriod`, `DuesPayment`, dst.)
    - _Req: 13.1, 13.5 | Design §6_

  - [x] 1.2 Buat `lib/env.ts` — Startup validation [S]
    - Validasi keberadaan env vars wajib: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`
    - Lempar `Error` dengan nama variable yang hilang jika ada yang undefined — fail fast, bukan gagal diam-diam
    - File ini akan di-import oleh `lib/db.ts` dan `lib/cloudinary.ts`
    - _Req: 17.6 | Design §13_

  - [x] 1.3 Buat `lib/db.ts` — Prisma singleton [S]
    - Gunakan pola `globalThis.__prisma` untuk mencegah multiple PrismaClient instances di Vercel serverless
    - Log queries di `development`, hanya errors di `production`
    - Import `lib/env.ts` di bagian atas untuk early validation
    - Export `prisma` sebagai named export (bukan default)
    - _Req: 17.5 | Design §12_

  - [x] 1.4 Buat `.env.example` di root project [S]
    - Cantumkan semua 8 env vars dengan komentar inline untuk setiap variable
    - Format: `VARIABLE_NAME=  # deskripsi singkat`
    - Kelompokkan: Supabase public, Supabase server-only, Database, Cloudinary public, Cloudinary server-only, App
    - TIDAK mencantumkan nilai aktual — hanya template kosong
    - _Req: 17.1, 17.2 | Design §13_

  - [x] 1.5 Buat `lib/supabase/server.ts`, `lib/supabase/client.ts`, `lib/supabase/middleware.ts` [M]
    - `server.ts`: fungsi `createClient()` menggunakan `createServerClient` dari `@supabase/ssr` dengan `cookies()` dari `next/headers`
    - `client.ts`: fungsi `getSupabaseBrowserClient()` sebagai singleton `createBrowserClient` — hanya untuk Client Components
    - `middleware.ts`: fungsi `updateSession(request)` yang refresh cookie dan redirect ke `/login` jika tidak ada session valid
    - Public routes yang dikecualikan dari redirect: `/login`, `/auth/**`, `/api/ping`
    - _Req: 1.1, 1.4, 1.5 | Design §5_

  - [-] 1.6 Buat root `middleware.ts` — Route protection [S]
    - Import dan panggil `updateSession` dari `@/lib/supabase/middleware`
    - Konfigurasi `matcher` untuk exclude static files, images, favicon, sitemap, robots
    - _Req: 1.4 | Design §5_

  - [x] 1.7 Buat `lib/utils.ts` — Shared utility functions [S]
    - Implementasikan `formatError(error: unknown): string` yang memetakan Prisma codes (`P2002`, `P2025`), Cloudinary errors, dan JWT/session errors ke pesan bahasa Indonesia yang aman
    - Panggil `console.error("[Server Error]", error)` sebelum return dari catch block
    - Implementasikan `formatCurrency(amount: number): string` untuk format Rupiah
    - Implementasikan `formatDate(date: Date | string): string` untuk format tanggal Indonesia
    - _Req: 13.2, 13.4 | Design §11_

  - [x] 1.8 Buat `lib/cloudinary.ts` — Cloudinary server-only integration [M]
    - Import `lib/env.ts` dan validasi `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, `NEXT_PUBLIC_CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` di module load — lempar Error jika ada yang missing
    - `CLOUDINARY_API_SECRET` TIDAK boleh memiliki prefix `NEXT_PUBLIC_`
    - Ekspor folder constants: `GALLERY_FOLDER`, `MATERI_FOLDER`, `AVATAR_FOLDER`, `PROOF_FOLDER`
    - Implementasikan `uploadToCloudinary(buffer, folder)` menggunakan `cloudinary.uploader.upload_stream` dengan `resource_type: "auto"`
    - Implementasikan `deleteFromCloudinary(publicId)` yang treat `result: 'not found'` sebagai sukses (idempotent)
    - Implementasikan `getOptimizedUrl(cloudinaryUrl, width?)` — pure string manipulation, tidak ada network call
    - _Req: 15.1–15.5 | Design §10_

  - [-] 1.9 Buat `lib/actions/guards.ts` — Auth & role helpers [M]
    - Implementasikan `getCurrentUser()` menggunakan `cache()` dari React untuk deduplicate `supabase.auth.getUser()` per render pass
    - Join dengan `prisma.user.findUnique` untuk mendapatkan `role` dari `public.users`
    - Return type: `CurrentUser | null`
    - Implementasikan `requireAuth()` yang return `{ ok: true, user }` atau `{ ok: false, result: ActionResult<never> }` dengan error message bahasa Indonesia
    - Implementasikan `requireRole(user, allowed[])` yang return `{ ok: true }` atau `{ ok: false, result: ActionResult<never> }` dengan error "Akses ditolak."
    - _Req: 1.9, 13.1 | Design §8_

---

### Group 2: Database Schema & Migrations

- [ ] 2. Buat dan terapkan database schema
  - [-] 2.1 Tulis `prisma/schema.prisma` — Complete schema [L]
    - Konfigurasi `datasource db` dengan `url = env("DATABASE_URL")` (port 6543, pgbouncer) dan `directUrl = env("DIRECT_URL")` (port 5432, migrate only)
    - Definisikan semua 12 model: `User`, `DuesPeriod`, `DuesPayment`, `Announcement`, `Schedule`, `PhotoGallery`, `Photo`, `AuditLog`, `Attendance`, `Material`, `ForumPost`, `ForumComment`
    - `User.id`: `@id @db.Uuid` — mirror dari `auth.users.id`
    - `DuesPeriod.amount`: `Int` (Rupiah, tanpa desimal) — BUKAN Float atau Decimal
    - `DuesPayment`: constraint `@@unique([studentId, duePeriodId])`
    - `Schedule`: constraint `@@unique([dayOfWeek, periodOrder])`
    - `Attendance`: constraint `@@unique([studentId, date])`, field `date @db.Date`
    - `ForumComment.isAnswer`: `Boolean @default(false)`
    - Semua relasi FK dengan `onDelete: Cascade`, kecuali `AuditLog.userId` dengan `onDelete: SetNull`
    - Semua `@@index` yang didefinisikan di design document
    - Hapus relasi `createdBy ForumComment[]` dari `ForumPost` (lihat design note)
    - _Req: 3.1–3.9 | Design §3_

  - [x] 2.2 Jalankan `prisma migrate dev` — Generate migration SQL [M]
    - Jalankan `npx prisma migrate dev --name init` untuk generate file SQL di `prisma/migrations/`
    - Verifikasi migration SQL yang dihasilkan sesuai dengan schema
    - Jalankan `npx prisma generate` untuk regenerate Prisma Client types
    - Verifikasi tidak ada TypeScript error setelah generate
    - **Free-tier note:** Gunakan `DIRECT_URL` (port 5432) saat menjalankan migrate — pgbouncer tidak kompatibel dengan migrate
    - _Req: 3.7 | Design §3_

  - [~] 2.3 Tulis `supabase/migrations/20240101_000_rls_policies.sql` — RLS policies [L]
    - `ENABLE ROW LEVEL SECURITY` dan `FORCE ROW LEVEL SECURITY` pada semua 12 tabel
    - Definisikan helper function `is_admin()`: `SECURITY DEFINER STABLE`, return `FALSE` jika `auth.uid() IS NULL`
    - Definisikan helper function `is_treasurer_or_admin()`: `SECURITY DEFINER STABLE`, return `FALSE` jika `auth.uid() IS NULL`
    - Semua policies per tabel sesuai design document §4:
      - `users`: select own + admin select all + update own + admin update all + block direct insert
      - `dues_periods`: all select active + treasurer select all + treasurer insert/update (no DELETE)
      - `dues_payments`: student select own + treasurer full + block DELETE semua role
      - `announcements`: all select published + treasurer select all + treasurer or author insert/update/delete
      - `schedule`: all select + treasurer write
      - `photo_galleries` + `photos`: all select + treasurer write
      - `audit_log`: admin select only + block semua direct mutations
      - `attendances`: student select own + treasurer full
      - `materials`: all select + treasurer write
      - `forum_posts` + `forum_comments`: all select + all insert (own) + author/treasurer delete + treasurer update (for answer)
    - _Req: 2.1–2.6 | Design §4_

  - [~] 2.4 Tulis `supabase/migrations/20240101_001_triggers.sql` — Triggers & view [M]
    - Buat SQL view `public.dues_summary` dengan join `dues_payments + users + dues_periods` dan filter `is_archived = FALSE`
    - Field view: `id, student_id, name, email, period_id, period_name, amount, status, paid_at, proof_image_url`
    - Buat function `handle_new_user()` dengan `SECURITY DEFINER` untuk auto-create `public.users` row
    - Gunakan `COALESCE(NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''), NEW.email)` untuk field `name`
    - Gunakan `ON CONFLICT (id) DO NOTHING` untuk idempotency
    - Attach trigger `on_auth_user_created` AFTER INSERT ON `auth.users`
    - Buat function `audit_dues_payment()` dengan `SECURITY DEFINER` yang insert ke `audit_log` pada INSERT/UPDATE/DELETE
    - Jika insert ke `audit_log` gagal → exception propagate → rollback dues_payment mutation (atomicity)
    - Attach trigger `audit_dues_payment_changes` AFTER INSERT OR UPDATE OR DELETE ON `dues_payments`
    - _Req: 1.2, 1.3, 16.1–16.3, 5.8 | Design §4_

  - [~] 2.5 Terapkan migrations ke Supabase project [M]
    - Jalankan migration SQL `20240101_000_rls_policies.sql` di Supabase SQL editor atau `supabase db push`
    - Jalankan migration SQL `20240101_001_triggers.sql`
    - Verifikasi semua 12 tabel ada di Supabase dashboard
    - Verifikasi view `dues_summary` ada dan bisa di-query
    - Verifikasi kedua triggers active di tabel `dues_payments` dan `auth.users`
    - Verifikasi helper functions `is_admin()` dan `is_treasurer_or_admin()` ada di database
    - **Free-tier note:** Supabase free tier bisa pause — jika project tidak aktif, resume dari dashboard sebelum apply migration
    - _Req: 2.1, 16.1 | Design §4_

---

### Group 3: Validation Schemas

- [x] 3. Buat Zod validation schemas per domain
  - [x] 3.1 Buat `lib/validations/kas.ts` [S]
    - `createDuesPeriodSchema`: `name` (string 1–100), `amount` (int 1–999_999_999), `startDate` (z.string().datetime()), `endDate` (z.string().datetime())
    - Tambah `.refine()` untuk `endDate > startDate` dengan pesan error bahasa Indonesia
    - `markPaymentPaidSchema`: `paymentId` (string min 1), `notes` (string max 500, optional)
    - Export TypeScript types via `z.infer<>`
    - _Req: 4.1, 4.2 | Design §7_

  - [x] 3.2 Buat `lib/validations/gallery.ts` [S]
    - `ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const`
    - `MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024`
    - `createGallerySchema`: `title` (string 1–200), `description` (string max 500, optional), `eventDate` (datetime)
    - `uploadPhotoSchema`: `galleryId` (string min 1), `mimeType` (z.enum(ALLOWED_MIME_TYPES) dengan custom errorMap), `fileSizeBytes` (int max 5MB dengan pesan error bahasa Indonesia), `caption` (string max 300, optional)
    - _Req: 6.1, 6.2, 5.2 | Design §7_

  - [x] 3.3 Buat `lib/validations/announcement.ts` [S]
    - `createAnnouncementSchema`: `title` (string 1–200), `content` (string min 1)
    - `updateAnnouncementSchema`: `id` (string min 1), `title` (string 1–200, optional), `content` (string min 1, optional)
    - _Req: 7.2 | Design §7_

  - [x] 3.4 Buat `lib/validations/schedule.ts` [S]
    - `upsertScheduleSlotSchema`: `dayOfWeek` (int 0–4), `periodOrder` (int 1–8), `periodLabel` (string 1–20), `subject/teacher/room` (optional strings), `isBreak` (boolean, default false)
    - Tambah `.superRefine()` yang reject jika `isBreak = false` dan `subject` kosong/whitespace — error path: `["subject"]`
    - _Req: 8.1, 8.2 | Design §7_

  - [x] 3.5 Buat `lib/validations/attendance.ts` [S]
    - `recordAttendanceSchema`: `studentId` (z.string().uuid() dengan pesan error), `date` (z.string().regex(/^\d{4}-\d{2}-\d{2}$/) dengan pesan error), `status` (z.enum(["HADIR", "IZIN", "SAKIT", "ALFA"]))
    - _Req: 9.1, 14.3 | Design §7_

  - [x] 3.6 Buat `lib/validations/material.ts` [S]
    - `createMaterialSchema`: `title` (1–200), `subjectName` (1–100), `description` (max 500, optional), `fileUrl` (z.string().url(), optional), `cloudinaryId` (string, optional), `externalLink` (z.string().url(), optional)
    - Tambah `.superRefine()` untuk XOR constraint: reject jika keduanya absent, reject jika keduanya present
    - _Req: 10.1 | Design §7_

  - [x] 3.7 Buat `lib/validations/forum.ts` [S]
    - `createPostSchema`: `title` (string 1–200), `content` (string min 1)
    - `createCommentSchema`: `postId` (string min 1), `content` (string min 1)
    - _Req: 11.1, 11.2 | Design §7_

  - [x] 3.8 Buat `lib/validations/profile.ts` [S]
    - `updateProfileSchema`: `name` (string 1–100), `avatarUrl` (z.string().url(), optional)
    - _Req: 12.1 | Design §7_

---

### Group 4: Authentication

- [ ] 4. Implementasi authentication flows
  - [~] 4.1 Buat `app/api/auth/callback/route.ts` — OAuth callback handler [M]
    - Handler `GET` yang terima `code` query param dari Supabase OAuth
    - Tukar `code` dengan session menggunakan `supabase.auth.exchangeCodeForSession(code)`
    - Jika `error` query param ada → redirect ke `/login?error=auth_failed`
    - Setelah tukar code: baca role user dari `public.users`, redirect ke `/dashboard` (admin/bendahara) atau `/` (murid)
    - Jika exchange gagal → redirect ke `/login?error=auth_failed`
    - _Req: 1.7, 1.8 | Design §5_

  - [x] 4.2 Buat/update `actions/auth.actions.ts` — Auth Server Actions [M]
    - `signInWithEmail(input: unknown)`: validasi email+password dengan Zod schema inline, panggil `supabase.auth.signInWithPassword()`, return `ActionResult<{ redirectTo: string }>`
    - `signInWithGoogle()`: panggil `supabase.auth.signInWithOAuth()` dengan `redirectTo` ke `/auth/callback`, return `ActionResult<{ url: string }>`
    - `signOut()`: panggil `supabase.auth.signOut()`, redirect ke `/login`
    - Semua fungsi wrapped dalam try/catch, gunakan `formatError()` untuk error message
    - _Req: 1.1, 1.6 | Design §9_

---

### Group 5: Feature Server Actions

- [ ] 5. Implementasi Server Actions per domain
  - [x] 5.1 Buat/update `actions/finance.actions.ts` [L]
    - `createDuesPeriod(input: unknown)`: requireAuth → requireRole(["admin","bendahara"]) → `createDuesPeriodSchema.safeParse()` → cek duplikasi nama (case-insensitive) → `prisma.duesPeriod.create()` → `revalidatePath("/kas")` + `revalidatePath("/admin/kas")`
    - `archiveDuesPeriod(periodId: string)`: requireAuth → requireRole → `prisma.duesPeriod.update({ isArchived: true })` → revalidatePath
    - `markPaymentPaid(paymentId, opts)`: requireAuth → requireRole → validasi status saat ini bukan "paid" → jika ada `proofImageBuffer`: validasi MIME + size via `uploadPhotoSchema`, upload ke Cloudinary folder `PROOF_FOLDER` → `prisma.duesPayment.update({ status: "paid", paidAt: now(), proofImageUrl, proofImageCloudinaryId })` → revalidatePath
    - `getDuesSummary()`: requireAuth → requireRole → `prisma.$queryRaw` query view `dues_summary` → return `ActionResult<DuesSummaryRow[]>`
    - Return type eksplisit untuk semua fungsi, tidak ada `any`
    - _Req: 4.1–4.8, 5.1–5.8 | Design §9_

  - [x] 5.2 Buat/update `actions/gallery.actions.ts` [M]
    - `createGallery(input: unknown)`: requireAuth → requireRole → `createGallerySchema.safeParse()` → `prisma.photoGallery.create()` → revalidatePath
    - `uploadPhoto(galleryId, fileBuffer, mimeType, fileSizeBytes, caption?)`: requireAuth → requireRole → `uploadPhotoSchema.safeParse()` → verifikasi `galleryId` ada di DB → upload ke Cloudinary `GALLERY_FOLDER` → `prisma.photo.create()` → jika DB insert gagal setelah upload: log error, return failure
    - `deletePhoto(photoId: string)`: requireAuth → requireRole → baca `cloudinaryId` dari DB → `deleteFromCloudinary()` → `prisma.photo.delete()`
    - `deleteGallery(galleryId: string)`: requireAuth → requireRole → `prisma.photoGallery.delete()` (Cascade handles photos)
    - _Req: 6.1–6.9 | Design §9_

  - [x] 5.3 Buat/update `actions/announcement.actions.ts` [M]
    - `createAnnouncement(input)`: requireAuth → requireRole → `createAnnouncementSchema.safeParse()` → `prisma.announcement.create({ status: "draft", authorId: user.id })` — JANGAN baca authorId dari input
    - `publishAnnouncement(announcementId)`: requireAuth → requireRole atau own authorship → `prisma.announcement.update({ status: "published", publishedAt: new Date() })` → revalidatePath kedua routes
    - `updateAnnouncement(input)`: requireAuth → requireRole atau own authorship → `updateAnnouncementSchema.safeParse()` → `prisma.announcement.update()`
    - `deleteAnnouncement(announcementId)`: requireAuth → requireRole atau own authorship → `prisma.announcement.delete()` → revalidatePath
    - _Req: 7.1–7.8 | Design §9_

  - [x] 5.4 Buat/update `actions/schedule.actions.ts` [M]
    - `upsertScheduleSlot(input)`: requireAuth → requireRole → `upsertScheduleSlotSchema.safeParse()` → `prisma.schedule.upsert({ where: { dayOfWeek_periodOrder: { dayOfWeek, periodOrder } }, ... })` → revalidatePath kedua routes
    - `deleteScheduleSlot(slotId)`: requireAuth → requireRole → `prisma.schedule.delete()` → revalidatePath
    - _Req: 8.1–8.6 | Design §9_

  - [x] 5.5 Buat `actions/attendance.actions.ts` [M]
    - `recordAttendance(input)`: requireAuth → `recordAttendanceSchema.safeParse()` → jika user.role === "murid", verifikasi `studentId === user.id` → `prisma.attendance.upsert({ where: { studentId_date: { studentId, date } }, create/update: { status, checkInTime: status === "HADIR" ? new Date() : null } })` → `revalidatePath("/admin/presensi")`
    - `getAttendanceStats(date)`: requireAuth → requireRole(["admin","bendahara"]) → hitung `studentsCount` (count users dengan role="murid"), `presentCount` (count attendances dengan status="HADIR" pada date), `attendanceRate` = (presentCount/studentsCount)*100 dengan 2 desimal → return `ActionResult<AttendanceStats>`
    - _Req: 9.1–9.12 | Design §9_

  - [~] 5.6 Buat `actions/material.actions.ts` [M]
    - `createMaterial(input, fileBuffer?, fileMimeType?, fileSizeBytes?)`: requireAuth → requireRole → `createMaterialSchema.safeParse()` → jika `fileBuffer` ada: upload ke Cloudinary `MATERI_FOLDER` → `prisma.material.create({ fileUrl: cloudinaryUrl, cloudinaryId: publicId, ... })`, jika external link: `prisma.material.create({ externalLink, ... })` → revalidatePath kedua routes
    - `deleteMaterial(materialId)`: requireAuth → requireRole → baca record → jika `cloudinaryId` tidak null: `deleteFromCloudinary()` → `prisma.material.delete()`, jika null: langsung delete DB
    - _Req: 10.1–10.7 | Design §9_

  - [~] 5.7 Buat `actions/forum.actions.ts` [M]
    - `createPost(input)`: requireAuth (semua role) → `createPostSchema.safeParse()` → `prisma.forumPost.create({ createdById: user.id })`
    - `createComment(input)`: requireAuth → `createCommentSchema.safeParse()` → verifikasi `postId` ada di DB → `prisma.forumComment.create({ createdById: user.id })`
    - `markCommentAsAnswer(commentId)`: requireAuth → requireRole(["admin","bendahara"]) → baca `postId` dari comment → `prisma.$transaction([updateMany others isAnswer=false, update target isAnswer=true])` — ATOMIC
    - `deletePost(postId)`: requireAuth → cek own authorship atau requireRole → `prisma.forumPost.delete()` (Cascade deletes comments)
    - `deleteComment(commentId)`: requireAuth → cek own authorship atau requireRole → `prisma.forumComment.delete()`
    - _Req: 11.1–11.9 | Design §9_

  - [x] 5.8 Buat/update `actions/profile.actions.ts` [S]
    - `updateProfile(input, avatarBuffer?, avatarMimeType?)`: requireAuth → `updateProfileSchema.safeParse()` → field `role` di input DIABAIKAN (tidak pernah di-write) → jika `avatarBuffer` ada: upload ke Cloudinary `AVATAR_FOLDER`, gunakan `secure_url` sebagai `avatarUrl` → `prisma.user.update({ where: { id: user.id }, data: { name, avatarUrl } })` → `revalidatePath("/profil")`
    - _Req: 12.1–12.5 | Design §9_

---

### Group 6: API Routes & Keep-Alive

- [ ] 6. Buat API routes pendukung
  - [~] 6.1 Buat `app/api/ping/route.ts` — Keep-alive endpoint [S]
    - Handler `GET` yang jalankan `prisma.$queryRaw\`SELECT 1\`` untuk keep DB connection alive
    - Return `NextResponse.json({ ok: true })` dengan status 200
    - Tidak perlu auth check — endpoint publik
    - **Free-tier note:** Endpoint ini mencegah Supabase free tier auto-pause karena inactivity
    - _Req: 17.3 | Design §12_

  - [~] 6.2 Buat `vercel.json` di root project — Cron job [S]
    - Konfigurasi Vercel Cron untuk hit `/api/ping` setiap 5 menit: `"crons": [{ "path": "/api/ping", "schedule": "*/5 * * * *" }]`
    - **Free-tier note:** Vercel free tier mendukung cron jobs. Ini strategi utama untuk mencegah Supabase pause
    - _Req: 17.3 | Design §12_

- [~] 7. Checkpoint — Verifikasi backend dasar berfungsi
  - Pastikan `npx prisma validate` dan `npx tsc --noEmit` pass tanpa error
  - Pastikan tidak ada `any` di seluruh implementasi (jalankan `npx tsc --strict`)
  - Ensure all tests pass, ask the user if questions arise.

---

### Group 7: Property-Based Tests

- [ ] 8. Setup testing framework dan tulis property-based tests
  - [~] 8.1 Install fast-check dan konfigurasi Vitest [S]
    - Install: `npm install --save-dev fast-check vitest @vitest/ui`
    - Buat `vitest.config.ts` di root project dengan konfigurasi TypeScript path aliases (`@/` → project root)
    - Buat `__tests__/` directory di root project
    - Verifikasi `npx vitest --run` berjalan tanpa error
    - _Design §14_

  - [ ]* 8.2 Tulis Property 1 — DuesPeriod date ordering invariant [M]
    - **Property 1: DuesPeriod date ordering invariant**
    - **Validates: Req 4.2**
    - File: `__tests__/validations/kas.property.test.ts`
    - Test 1: untuk semua input dengan `endDate ≤ startDate` → schema HARUS reject (`numRuns: 200`)
    - Test 2: untuk semua input dengan `endDate > startDate` → schema HARUS accept (`numRuns: 200`)
    - Gunakan `fc.date()` dan `fc.nat({ max: 365*5 })` sebagai arbitraries
    - Tag: `// Feature: backend-class-rpl-1, Property 1: DuesPeriod date ordering invariant`
    - _Design §14, Property 1_

  - [ ]* 8.3 Tulis Property 2 — Unique payment constraint [M]
    - **Property 2: Unique payment constraint — no duplicate payments**
    - **Validates: Req 3.3, 5.1**
    - File: `__tests__/db/payment-unique.property.test.ts`
    - Test: untuk semua `(studentId, duePeriodId)` pair, create kedua kali HARUS throw error `P2002` (`numRuns: 50`)
    - Gunakan test database — bukan production
    - Tag: `// Feature: backend-class-rpl-1, Property 2: Unique payment constraint`
    - _Design §14, Property 2_

  - [ ]* 8.4 Tulis Property 3 — File upload validation universality [M]
    - **Property 3: File upload validation universality**
    - **Validates: Req 6.1, 6.2, 5.2**
    - File: `__tests__/validations/gallery.property.test.ts`
    - Test 1: semua MIME type invalid → reject (`numRuns: 300`)
    - Test 2: MIME valid tapi size > 5MB → reject (`numRuns: 200`)
    - Test 3: MIME valid dan size ≤ 5MB → accept (`numRuns: 200`)
    - Tag: `// Feature: backend-class-rpl-1, Property 3: File upload validation universality`
    - _Design §14, Property 3_

  - [ ]* 8.5 Tulis Property 4 — Material XOR constraint [M]
    - **Property 4: Material XOR constraint**
    - **Validates: Req 10.1**
    - File: `__tests__/validations/material.property.test.ts`
    - Test 1: keduanya absent → reject (`numRuns: 150`)
    - Test 2: keduanya present → reject (`numRuns: 150`)
    - Test 3: tepat satu present → accept (`numRuns: 200`)
    - Tag: `// Feature: backend-class-rpl-1, Property 4: Material XOR constraint`
    - _Design §14, Property 4_

  - [ ]* 8.6 Tulis Property 5 — Forum answer uniqueness invariant [M]
    - **Property 5: Forum answer uniqueness invariant**
    - **Validates: Req 11.3**
    - File: `__tests__/actions/forum.property.test.ts`
    - Test: setelah `markCommentAsAnswer(commentId)`, tepat satu comment di post tersebut memiliki `isAnswer = true` (`numRuns: 50`)
    - Membutuhkan test database dan fixture user
    - Tag: `// Feature: backend-class-rpl-1, Property 5: Forum answer uniqueness invariant`
    - _Design §14, Property 5_

  - [ ]* 8.7 Tulis Property 6 — Schedule isBreak conditional validation [S]
    - **Property 6: Schedule isBreak conditional validation**
    - **Validates: Req 8.2**
    - File: `__tests__/validations/schedule.property.test.ts`
    - Test 1: `isBreak = false` + whitespace/empty subject → reject (`numRuns: 200`)
    - Test 2: `isBreak = true` + absent subject → accept (`numRuns: 200`)
    - Tag: `// Feature: backend-class-rpl-1, Property 6: Schedule isBreak conditional validation`
    - _Design §14, Property 6_

  - [ ]* 8.8 Tulis Property 7 — Audit trail completeness [M]
    - **Property 7: Audit trail completeness**
    - **Validates: Req 16.1, 16.2, 16.3**
    - File: `__tests__/db/audit-trail.property.test.ts`
    - Test: setiap INSERT ke `dues_payments` → tepat satu `audit_log` row dengan `action="payment_created"`, `newValues != null`, `oldValues = null` (`numRuns: 30`)
    - Membutuhkan test database
    - Tag: `// Feature: backend-class-rpl-1, Property 7: Audit trail completeness`
    - _Design §14, Property 7_

---

### Group 8: Integration Verification

- [ ] 9. Verifikasi integrasi end-to-end
  - [~] 9.1 Verifikasi full auth flow [M]
    - Test login email/password: form submit → session cookie di-set → redirect ke `/`
    - Test Google OAuth: click sign in → redirect ke Google → callback ke `/auth/callback` → session di-set
    - Test role-based redirect: admin/bendahara → `/dashboard`, murid → `/`
    - Test logout: session dihapus → redirect ke `/login`
    - Test session persistence: refresh page → masih login
    - _Req: 1.1–1.9_

  - [~] 9.2 Verifikasi RLS policies [M]
    - Test sebagai murid: bisa SELECT data publik, tidak bisa INSERT/UPDATE/DELETE ke tabel yang dibatasi
    - Test sebagai bendahara: bisa CRUD ke kas/galeri/jadwal/pengumuman/materi
    - Test sebagai admin: bisa SELECT `audit_log`, bisa UPDATE role user
    - Test direct INSERT ke `audit_log` → harus ditolak
    - _Req: 2.1–2.6_

  - [~] 9.3 Verifikasi Cloudinary integration [M]
    - Upload foto galeri → verifikasi URL tersimpan di DB dengan format `cloudinaryUrl` yang benar
    - Akses `getOptimizedUrl()` → verifikasi transform string `/upload/w_400,c_fill,q_auto,f_auto/` ada di URL
    - Delete foto → verifikasi Cloudinary asset terhapus dan row DB terhapus
    - **Free-tier note:** Cloudinary free tier limit 25GB storage dan 25 credit/bulan — test upload/delete tidak menghabiskan quota signifikan
    - _Req: 6.3–6.6, 15.1–15.5_

  - [~] 9.4 Verifikasi audit trail [S]
    - Mark payment sebagai paid via `markPaymentPaid()` → verifikasi satu row `audit_log` dengan `action="payment_updated"`, `old_values.status="pending"`, `new_values.status="paid"`
    - Verifikasi murid tidak bisa SELECT `audit_log`
    - _Req: 16.1–16.5_

  - [~] 9.5 Verifikasi Prisma singleton dan keep-alive [S]
    - Akses beberapa halaman berbeda dalam satu session → verifikasi tidak ada error `P2024` (connection pool exhaustion) di logs
    - Hit `GET /api/ping` → verifikasi response `{ ok: true }` dengan status 200
    - Verifikasi `prisma.$queryRaw\`SELECT 1\`` berhasil dieksekusi
    - **Free-tier note:** Dengan `connection_limit=1` di `DATABASE_URL`, Lambda tidak akan exhausts pool bahkan di concurrent invocations
    - _Req: 17.5 | Design §12_

- [~] 10. Final checkpoint — Backend siap
  - Jalankan `npx tsc --noEmit` → zero errors
  - Jalankan `npx vitest --run` → semua tests pass (atau optional tests di-skip)
  - Verifikasi tidak ada `any` di seluruh codebase: `grep -r ": any" lib/ actions/`
  - Ensure all tests pass, ask the user if questions arise.

---

## Notes

- Task bertanda `*` adalah opsional (property-based tests dan integration tests) dan dapat di-skip untuk MVP yang lebih cepat, tapi sangat direkomendasikan sebelum demo
- Setiap task mereferensikan requirement spesifik untuk traceability — lihat `requirements.md` dan `design.md` untuk detail implementasi lengkap
- **No `any` rule**: jika tipe tidak diketahui, gunakan `unknown` + type guard atau `instanceof` check
- **Dependency rule**: Group N+1 tidak boleh dimulai sebelum Group N selesai — terutama Group 2 (DB schema) harus selesai sebelum Group 4 (Auth) dan Group 5 (Actions)
- **Free-tier checklist sebelum demo**: pastikan Supabase project tidak paused, Vercel cron `/api/ping` aktif, Cloudinary storage < 25GB
- Semua Server Action menggunakan pattern: `requireAuth() → requireRole() → safeParse() → DB operation → revalidatePath() → return ActionResult`
- Upload dan simpan-ke-DB harus dalam satu Server Action yang sama — tidak boleh terpisah menjadi dua request

---

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2", "1.4"] },
    { "id": 1, "tasks": ["1.3", "1.7"] },
    { "id": 2, "tasks": ["1.5", "1.8"] },
    { "id": 3, "tasks": ["1.6", "1.9", "2.1"] },
    { "id": 4, "tasks": ["2.2", "3.1", "3.2", "3.3", "3.4", "3.5", "3.6", "3.7", "3.8"] },
    { "id": 5, "tasks": ["2.3", "2.4"] },
    { "id": 6, "tasks": ["2.5", "4.1", "4.2"] },
    { "id": 7, "tasks": ["5.1", "5.2", "5.3", "5.4", "5.5", "5.6", "5.7", "5.8"] },
    { "id": 8, "tasks": ["6.1", "6.2"] },
    { "id": 9, "tasks": ["8.1"] },
    { "id": 10, "tasks": ["8.2", "8.3", "8.4", "8.5", "8.6", "8.7", "8.8"] },
    { "id": 11, "tasks": ["9.1", "9.2", "9.3", "9.4", "9.5"] }
  ]
}
```
