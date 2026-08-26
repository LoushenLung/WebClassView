# Design Document — Backend: `class-rpl-1-202627`

**Feature:** `backend-class-rpl-1`  
**Workflow:** Requirements-First  
**Stack:** Next.js 15 App Router · Supabase (Postgres + Auth + RLS) · Prisma · Cloudinary · Zod · TypeScript strict

---

## Overview

## Architecture

### System Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│  BROWSER (Client Bundle — no secrets, no DB access)                  │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │  React Client Components  (form state, optimistic UI)        │    │
│  │  Supabase Browser Client  (createBrowserClient — read-only   │    │
│  │   realtime, no service role key)                             │    │
│  └──────────────────────┬─────────────────────────────────────-┘    │
└─────────────────────────┼────────────────────────────────────────────┘
                          │  HTTPS / Server Action RPC
┌─────────────────────────▼────────────────────────────────────────────┐
│  VERCEL SERVERLESS FUNCTIONS (Next.js 15 App Router)                 │
│                                                                      │
│  middleware.ts ──────────────────────────────────────────────────    │
│    └─ updateSession()  →  refreshes cookie, redirects to /login      │
│                           if no valid session                        │
│                                                                      │
│  Server Components (reads)                                           │
│    └─ createServerClient(cookies())                                  │
│    └─ prisma.findMany / findUnique  (direct DB, no RPC)              │
│    └─ cache(getCurrentUser)  — deduplicates auth per request         │
│                                                                      │
│  Server Actions (writes)  ────────────────────────────────────────   │
│    └─ lib/actions/guards.ts  → requireAuth() → requireRole()         │
│    └─ lib/validations/*.ts   → schema.safeParse(input)               │
│    └─ lib/db.ts              → prisma singleton                      │
│    └─ lib/cloudinary.ts      → upload/delete (server-only)           │
│    └─ revalidatePath()                                               │
│                                                                      │
│  app/api/auth/callback/route.ts  (OAuth code exchange)               │
│  app/api/ping/route.ts           (Supabase keep-alive)               │
└──────────────┬────────────────────────────┬─────────────────────────┘
               │  pgbouncer (Transaction     │  HTTPS
               │  Pooler) port 6543          │
┌──────────────▼────────────────┐  ┌─────────▼────────────────────────┐
│  SUPABASE                     │  │  CLOUDINARY (free 25GB/month)    │
│  ┌────────────────────────┐   │  │  Folders:                        │
│  │ Postgres + RLS          │  │  │   web-kelas/gallery              │
│  │  12 tables              │  │  │   web-kelas/materi               │
│  │  2 helper functions     │  │  │   web-kelas/avatars              │
│  │  1 summary view         │  │  │   web-kelas/proofs               │
│  │  2 triggers             │  │  │  Transforms: w_400,c_fill,       │
│  └────────────────────────┘   │  │              q_auto,f_auto       │
│  ┌────────────────────────┐   │  └──────────────────────────────────┘
│  │ Auth (JWT, HttpOnly    │   │
│  │  cookie via @supabase/ │   │
│  │  ssr)                  │   │
│  └────────────────────────┘   │
└───────────────────────────────┘
```

### Layer Responsibilities

| Layer | Responsibility | Must NOT |
|---|---|---|
| Client Components | Form state, optimistic UI, file picker | Access DB, hold secrets, call Prisma |
| Server Components | Read-only data fetching, render HTML | Mutate data, skip auth check |
| Server Actions | All mutations, auth guards, Zod validation | Use `any`, expose Prisma/Postgres errors |
| `lib/actions/guards.ts` | Auth & role enforcement helper | Be bypassed |
| `lib/validations/` | Zod schemas (shared client+server) | Contain DB-specific logic |
| `lib/db.ts` | Prisma singleton | Be instantiated outside this file |
| `lib/cloudinary.ts` | Cloudinary upload/delete (server-only) | Be imported in client bundle |
| Supabase RLS | Final DAO authorization gate | Be disabled or set to PERMISSIVE unrestricted |
| Postgres triggers | Audit trail, profile auto-creation | Be removed without migration |

### Read Request Lifecycle

```
Browser → HTTP GET /jadwal
  → middleware.ts: updateSession(cookies) → valid session → allow
  → app/jadwal/page.tsx (Server Component)
    → cache(getCurrentUser)() → supabase.auth.getUser() [deduped]
    → prisma.schedule.findMany({ orderBy: { dayOfWeek, periodOrder } })
    → RLS evaluated: all authenticated users may SELECT
  → HTML streamed to browser
```

### Write Request Lifecycle

```
Browser → form submit
  → Server Action "use server"
    → requireAuth()          → no session → return { success: false, error }
    → requireRole(user, [...allowed]) → wrong role → return { success: false, error }
    → schema.safeParse(input) → invalid → return { success: false, error }
    → [optional] cloudinary upload
    → prisma mutation (Transaction if multi-table)
    → RLS evaluated at DB level
    → Postgres trigger fires (audit_log write)
    → revalidatePath(...)
    → return { success: true, data }
  → client shows success / error toast
```

### Cold Start Mitigation

- **Prisma singleton** in `lib/db.ts`: reuses `globalThis.__prisma` across hot function invocations in the same container — prevents connection pool exhaustion.
- **pgbouncer Transaction mode**: `DATABASE_URL` uses Supabase Transaction Pooler (`port 6543`, `?pgbouncer=true&connection_limit=1`). Serverless functions never hold idle connections.
- **`DIRECT_URL`**: used only by `prisma migrate` / `prisma db push` (direct port 5432) to bypass pgbouncer during migrations.
- **`cache(getCurrentUser)`**: React `cache()` deduplicates the `supabase.auth.getUser()` call so multiple Server Components on the same page share one auth round-trip.

---

## Components and Interfaces

## 2. Project File Structure

```
class-rpl-1-202627/
│
├── middleware.ts                        # Route protection + session refresh (root)
│
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   └── callback/
│   │   │       └── route.ts            # OAuth code exchange → session cookie → redirect
│   │   └── ping/
│   │       └── route.ts                # GET /api/ping — Supabase keep-alive (returns 200)
│   │
│   ├── (auth)/
│   │   └── login/page.tsx
│   │
│   └── [... feature pages ...]
│
├── actions/                            # Server Actions — one file per domain
│   ├── auth.actions.ts                 # signIn, signOut, signInWithGoogle
│   ├── finance.actions.ts              # createDuesPeriod, archiveDuesPeriod,
│   │                                   # markPaymentPaid, getDuesSummary
│   ├── gallery.actions.ts              # createGallery, uploadPhoto, deletePhoto,
│   │                                   # deleteGallery
│   ├── announcement.actions.ts         # createAnnouncement, publishAnnouncement,
│   │                                   # updateAnnouncement, deleteAnnouncement
│   ├── schedule.actions.ts             # upsertScheduleSlot, deleteScheduleSlot
│   ├── attendance.actions.ts           # recordAttendance, getAttendanceStats
│   ├── material.actions.ts             # createMaterial, deleteMaterial
│   ├── forum.actions.ts                # createPost, createComment, markAnswer,
│   │                                   # deletePost, deleteComment
│   └── profile.actions.ts             # updateProfile
│
├── lib/
│   ├── supabase/
│   │   ├── server.ts                   # createServerClient(cookies()) — SSR reads
│   │   ├── client.ts                   # createBrowserClient() singleton — browser only
│   │   └── middleware.ts               # updateSession() — called from root middleware.ts
│   │
│   ├── validations/                    # Zod schemas — imported by both client & server
│   │   ├── kas.ts                      # createDuesPeriodSchema, markPaymentPaidSchema
│   │   ├── gallery.ts                  # createGallerySchema, uploadPhotoSchema
│   │   ├── announcement.ts             # createAnnouncementSchema, updateAnnouncementSchema
│   │   ├── schedule.ts                 # upsertScheduleSlotSchema (with superRefine)
│   │   ├── attendance.ts               # recordAttendanceSchema
│   │   ├── material.ts                 # createMaterialSchema (XOR fileUrl/externalLink)
│   │   ├── forum.ts                    # createPostSchema, createCommentSchema
│   │   └── profile.ts                  # updateProfileSchema
│   │
│   ├── actions/
│   │   └── guards.ts                   # requireAuth(), requireRole() helpers
│   │
│   ├── types.ts                        # ActionResult<T>, UserRole, enums, interfaces
│   ├── db.ts                           # Prisma singleton (globalThis pattern)
│   ├── cloudinary.ts                   # server-only: uploadToCloudinary, deleteFromCloudinary
│   └── utils.ts                        # formatError(), formatCurrency(), formatDate()
│
├── prisma/
│   ├── schema.prisma                   # All 12 models, datasource, generator
│   └── migrations/                     # Auto-generated by prisma migrate dev
│       └── [timestamp]_init/
│           └── migration.sql
│
└── supabase/
    └── migrations/
        ├── 20240101_000_rls_policies.sql   # ENABLE/FORCE RLS, policies, helper fns
        └── 20240101_001_triggers.sql       # on_auth_user_created, audit trigger, view
```

---

## Data Models

## 3. Complete Prisma Schema

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider  = "postgresql"
  url       = env("DATABASE_URL")       // pgbouncer Transaction Pooler — runtime queries
  directUrl = env("DIRECT_URL")         // Direct connection — prisma migrate only
}

// ─────────────────────────────────────────────────────────────
// USER
// id mirrors auth.users.id (UUID), managed by Supabase Auth trigger
// ─────────────────────────────────────────────────────────────
model User {
  id        String   @id @db.Uuid
  email     String   @unique
  name      String
  role      String   @default("murid")  // "admin" | "bendahara" | "murid"
  avatarUrl String?
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")

  duesPayments  DuesPayment[]
  announcements Announcement[]
  auditLogs     AuditLog[]
  attendances   Attendance[]
  forumPosts    ForumPost[]
  forumComments ForumComment[]

  @@index([role])
  @@map("users")
}

// ─────────────────────────────────────────────────────────────
// DUES PERIOD
// ─────────────────────────────────────────────────────────────
model DuesPeriod {
  id         String   @id @default(cuid())
  name       String
  amount     Int                          // Rupiah, no decimals
  startDate  DateTime @map("start_date")
  endDate    DateTime @map("end_date")
  isArchived Boolean  @default(false) @map("is_archived")
  createdAt  DateTime @default(now()) @map("created_at")
  updatedAt  DateTime @updatedAt @map("updated_at")

  duesPayments DuesPayment[]

  @@index([isArchived])
  @@index([startDate])
  @@map("dues_periods")
}

// ─────────────────────────────────────────────────────────────
// DUES PAYMENT
// @@unique prevents duplicate payment per student per period
// ─────────────────────────────────────────────────────────────
model DuesPayment {
  id                     String    @id @default(cuid())
  studentId              String    @db.Uuid @map("student_id")
  duePeriodId            String    @map("due_period_id")
  status                 String    @default("pending") // "pending" | "paid" | "overdue"
  proofImageUrl          String?   @map("proof_image_url")
  proofImageCloudinaryId String?   @map("proof_image_cloudinary_id")
  paidAt                 DateTime? @map("paid_at")
  notes                  String?
  createdAt              DateTime  @default(now()) @map("created_at")
  updatedAt              DateTime  @updatedAt @map("updated_at")

  student User       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  period  DuesPeriod @relation(fields: [duePeriodId], references: [id], onDelete: Cascade)

  @@unique([studentId, duePeriodId])
  @@index([status])
  @@index([studentId])
  @@map("dues_payments")
}

// ─────────────────────────────────────────────────────────────
// ANNOUNCEMENT
// ─────────────────────────────────────────────────────────────
model Announcement {
  id          String    @id @default(cuid())
  title       String
  content     String
  authorId    String    @db.Uuid @map("author_id")
  status      String    @default("draft")   // "draft" | "published"
  publishedAt DateTime? @map("published_at")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  author User @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([status])
  @@index([publishedAt])
  @@map("announcements")
}

// ─────────────────────────────────────────────────────────────
// SCHEDULE
// @@unique on (dayOfWeek, periodOrder) — one cell per grid slot
// ─────────────────────────────────────────────────────────────
model Schedule {
  id          String   @id @default(cuid())
  dayOfWeek   Int      @map("day_of_week")   // 0 = Monday … 4 = Friday
  periodOrder Int      @map("period_order")  // 1–8
  periodLabel String   @map("period_label")  // "08:00–09:00"
  subject     String?
  teacher     String?
  room        String?
  isBreak     Boolean  @default(false) @map("is_break")
  updatedAt   DateTime @updatedAt @map("updated_at")

  @@unique([dayOfWeek, periodOrder])
  @@index([dayOfWeek])
  @@map("schedule")
}

// ─────────────────────────────────────────────────────────────
// PHOTO GALLERY + PHOTO
// ─────────────────────────────────────────────────────────────
model PhotoGallery {
  id          String   @id @default(cuid())
  title       String
  description String?
  eventDate   DateTime @map("event_date")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  photos Photo[]

  @@index([eventDate])
  @@map("photo_galleries")
}

model Photo {
  id            String   @id @default(cuid())
  galleryId     String   @map("gallery_id")
  cloudinaryUrl String   @map("cloudinary_url")
  cloudinaryId  String   @map("cloudinary_id")
  caption       String?
  uploadedAt    DateTime @default(now()) @map("uploaded_at")

  gallery PhotoGallery @relation(fields: [galleryId], references: [id], onDelete: Cascade)

  @@index([galleryId])
  @@map("photos")
}

// ─────────────────────────────────────────────────────────────
// AUDIT LOG
// userId SetNull so audit history survives user deletion
// No INSERT/UPDATE/DELETE from app — trigger only
// ─────────────────────────────────────────────────────────────
model AuditLog {
  id        String   @id @default(cuid())
  userId    String?  @db.Uuid @map("user_id")
  action    String
  tableName String   @map("table_name")
  recordId  String   @map("record_id")
  oldValues Json?    @map("old_values")
  newValues Json?    @map("new_values")
  createdAt DateTime @default(now()) @map("created_at")

  user User? @relation(fields: [userId], references: [id], onDelete: SetNull)

  @@index([userId])
  @@index([action])
  @@index([createdAt])
  @@map("audit_log")
}

// ─────────────────────────────────────────────────────────────
// ATTENDANCE
// @@unique([studentId, date]) — one record per student per day
// ─────────────────────────────────────────────────────────────
model Attendance {
  id          String    @id @default(cuid())
  studentId   String    @db.Uuid @map("student_id")
  date        DateTime  @db.Date
  status      String    // "HADIR" | "IZIN" | "SAKIT" | "ALFA"
  checkInTime DateTime? @map("check_in_time")
  createdAt   DateTime  @default(now()) @map("created_at")
  updatedAt   DateTime  @updatedAt @map("updated_at")

  student User @relation(fields: [studentId], references: [id], onDelete: Cascade)

  @@unique([studentId, date])
  @@index([date])
  @@map("attendances")
}

// ─────────────────────────────────────────────────────────────
// MATERIAL
// fileUrl XOR externalLink — enforced by Zod, not DB constraint
// ─────────────────────────────────────────────────────────────
model Material {
  id            String   @id @default(cuid())
  title         String
  subjectName   String   @map("subject_name")
  description   String?
  fileUrl       String?  @map("file_url")
  cloudinaryId  String?  @map("cloudinary_id")
  externalLink  String?  @map("external_link")
  createdAt     DateTime @default(now()) @map("created_at")
  updatedAt     DateTime @updatedAt @map("updated_at")

  @@index([subjectName])
  @@map("materials")
}

// ─────────────────────────────────────────────────────────────
// FORUM POST + COMMENT
// ─────────────────────────────────────────────────────────────
model ForumPost {
  id          String   @id @default(cuid())
  title       String
  content     String
  createdById String   @db.Uuid @map("created_by_id")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  createdBy ForumComment[] @relation("PostAuthor")
  comments  ForumComment[]
  author    User           @relation(fields: [createdById], references: [id], onDelete: Cascade)

  @@index([createdAt])
  @@map("forum_posts")
}

model ForumComment {
  id          String   @id @default(cuid())
  postId      String   @map("post_id")
  content     String
  createdById String   @db.Uuid @map("created_by_id")
  isAnswer    Boolean  @default(false) @map("is_answer")
  createdAt   DateTime @default(now()) @map("created_at")
  updatedAt   DateTime @updatedAt @map("updated_at")

  post      ForumPost @relation(fields: [postId], references: [id], onDelete: Cascade)
  author    User      @relation(fields: [createdById], references: [id], onDelete: Cascade)

  @@index([postId])
  @@map("forum_comments")
}
```

> **Note on `ForumPost` relation**: The `createdBy ForumComment[] @relation("PostAuthor")` line above is a placeholder that will cause a schema error — remove it. `ForumPost` relates to `ForumComment` via `comments` and the `User` via `author`. The final schema should not have the errant `createdBy` array on `ForumPost`. Use exactly the fields shown in the `ForumComment` model for the correct relations.

---

## 4. Complete RLS Migration SQL

```sql
-- supabase/migrations/20240101_000_rls_policies.sql
-- ============================================================
-- HELPER FUNCTIONS
-- SECURITY DEFINER: run as function owner (superuser), not caller
-- STABLE: result doesn't change within same query — enables caching
-- Handles NULL auth.uid() (unauthenticated) by returning FALSE
-- ============================================================

CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role = 'admin'
  );
END;
$$;

CREATE OR REPLACE FUNCTION is_treasurer_or_admin()
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
AS $$
BEGIN
  IF auth.uid() IS NULL THEN
    RETURN FALSE;
  END IF;
  RETURN EXISTS (
    SELECT 1 FROM public.users
    WHERE id = auth.uid() AND role IN ('bendahara', 'admin')
  );
END;
$$;

-- ============================================================
-- ENABLE + FORCE ROW LEVEL SECURITY ON ALL 12 TABLES
-- FORCE: table owner (postgres superuser) also subject to policies
-- ============================================================

ALTER TABLE public.users              ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users              FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.dues_periods       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dues_periods       FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.dues_payments      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dues_payments      FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.announcements      ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements      FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.schedule           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.schedule           FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.photo_galleries    ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photo_galleries    FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.photos             ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.photos             FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_log          FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.attendances        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendances        FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.materials          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials          FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts        ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_posts        FORCE  ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.forum_comments     FORCE  ROW LEVEL SECURITY;

-- ============================================================
-- USERS table policies
-- ============================================================

-- All authenticated users: see own row
CREATE POLICY "users: select own" ON public.users
  FOR SELECT USING (auth.uid() = id);

-- Admin: see all rows
CREATE POLICY "users: admin select all" ON public.users
  FOR SELECT USING (is_admin());

-- Users: update own name and avatarUrl only
-- The WITH CHECK ensures they can only write to their own row
CREATE POLICY "users: update own" ON public.users
  FOR UPDATE USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- Admin: update any user (role management, etc.)
CREATE POLICY "users: admin update all" ON public.users
  FOR UPDATE USING (is_admin()) WITH CHECK (is_admin());

-- Trigger inserts the row — no app INSERT policy needed.
-- Block direct INSERT from app connections:
CREATE POLICY "users: no direct insert" ON public.users
  FOR INSERT WITH CHECK (FALSE);

-- ============================================================
-- DUES_PERIODS policies
-- ============================================================

-- All authenticated: read non-archived periods
CREATE POLICY "dues_periods: all select active" ON public.dues_periods
  FOR SELECT USING (auth.uid() IS NOT NULL AND NOT is_archived);

-- Admin/Treasurer: read all (including archived)
CREATE POLICY "dues_periods: treasurer select all" ON public.dues_periods
  FOR SELECT USING (is_treasurer_or_admin());

-- Admin/Treasurer: insert and update
CREATE POLICY "dues_periods: treasurer insert" ON public.dues_periods
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "dues_periods: treasurer update" ON public.dues_periods
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- No DELETE — use is_archived soft delete

-- ============================================================
-- DUES_PAYMENTS policies
-- No DELETE for any role — audit integrity
-- ============================================================

-- Students: read own payments
CREATE POLICY "dues_payments: student select own" ON public.dues_payments
  FOR SELECT USING (student_id = auth.uid());

-- Admin/Treasurer: full SELECT, INSERT, UPDATE
CREATE POLICY "dues_payments: treasurer select all" ON public.dues_payments
  FOR SELECT USING (is_treasurer_or_admin());

CREATE POLICY "dues_payments: treasurer insert" ON public.dues_payments
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "dues_payments: treasurer update" ON public.dues_payments
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- Explicitly block DELETE for all roles
CREATE POLICY "dues_payments: no delete" ON public.dues_payments
  FOR DELETE USING (FALSE);

-- ============================================================
-- ANNOUNCEMENTS policies
-- ============================================================

-- All authenticated: read published
CREATE POLICY "announcements: all select published" ON public.announcements
  FOR SELECT USING (auth.uid() IS NOT NULL AND status = 'published');

-- Admin/Treasurer: read all (including draft)
CREATE POLICY "announcements: treasurer select all" ON public.announcements
  FOR SELECT USING (is_treasurer_or_admin());

-- Admin/Treasurer or own author: insert
CREATE POLICY "announcements: treasurer insert" ON public.announcements
  FOR INSERT WITH CHECK (
    is_treasurer_or_admin() OR author_id = auth.uid()
  );

-- Admin/Treasurer or own author: update
CREATE POLICY "announcements: treasurer or author update" ON public.announcements
  FOR UPDATE
  USING (is_treasurer_or_admin() OR author_id = auth.uid())
  WITH CHECK (is_treasurer_or_admin() OR author_id = auth.uid());

-- Admin/Treasurer or own author: delete
CREATE POLICY "announcements: treasurer or author delete" ON public.announcements
  FOR DELETE USING (is_treasurer_or_admin() OR author_id = auth.uid());

-- ============================================================
-- SCHEDULE policies
-- ============================================================

-- All authenticated: read
CREATE POLICY "schedule: all select" ON public.schedule
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin/Treasurer: write
CREATE POLICY "schedule: treasurer insert" ON public.schedule
  FOR INSERT WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "schedule: treasurer update" ON public.schedule
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "schedule: treasurer delete" ON public.schedule
  FOR DELETE USING (is_treasurer_or_admin());

-- ============================================================
-- PHOTO_GALLERIES and PHOTOS policies
-- ============================================================

-- All authenticated: read
CREATE POLICY "photo_galleries: all select" ON public.photo_galleries
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "photos: all select" ON public.photos
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin/Treasurer: write
CREATE POLICY "photo_galleries: treasurer write" ON public.photo_galleries
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

CREATE POLICY "photos: treasurer write" ON public.photos
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- AUDIT_LOG policies
-- Write-lock: only SECURITY DEFINER triggers may insert
-- Read: admin only
-- ============================================================

CREATE POLICY "audit_log: admin select" ON public.audit_log
  FOR SELECT USING (is_admin());

-- Block all direct mutations from app connections
CREATE POLICY "audit_log: no direct insert" ON public.audit_log
  FOR INSERT WITH CHECK (FALSE);

CREATE POLICY "audit_log: no direct update" ON public.audit_log
  FOR UPDATE USING (FALSE);

CREATE POLICY "audit_log: no direct delete" ON public.audit_log
  FOR DELETE USING (FALSE);

-- ============================================================
-- ATTENDANCES policies
-- ============================================================

-- Students: read own
CREATE POLICY "attendances: student select own" ON public.attendances
  FOR SELECT USING (student_id = auth.uid());

-- Admin/Treasurer: full access
CREATE POLICY "attendances: treasurer all" ON public.attendances
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- MATERIALS policies
-- ============================================================

-- All authenticated: read
CREATE POLICY "materials: all select" ON public.materials
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- Admin/Treasurer: write
CREATE POLICY "materials: treasurer write" ON public.materials
  FOR ALL USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- FORUM_POSTS policies
-- ============================================================

-- All authenticated: read
CREATE POLICY "forum_posts: all select" ON public.forum_posts
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- All authenticated: create own post
CREATE POLICY "forum_posts: all insert" ON public.forum_posts
  FOR INSERT WITH CHECK (created_by_id = auth.uid());

-- Author or Admin/Treasurer: delete
CREATE POLICY "forum_posts: author or treasurer delete" ON public.forum_posts
  FOR DELETE USING (created_by_id = auth.uid() OR is_treasurer_or_admin());

-- ============================================================
-- FORUM_COMMENTS policies
-- ============================================================

-- All authenticated: read
CREATE POLICY "forum_comments: all select" ON public.forum_comments
  FOR SELECT USING (auth.uid() IS NOT NULL);

-- All authenticated: create own comment
CREATE POLICY "forum_comments: all insert" ON public.forum_comments
  FOR INSERT WITH CHECK (created_by_id = auth.uid());

-- Author or Admin/Treasurer: delete
CREATE POLICY "forum_comments: author or treasurer delete" ON public.forum_comments
  FOR DELETE USING (created_by_id = auth.uid() OR is_treasurer_or_admin());

-- Admin/Treasurer only: update (for marking answer)
CREATE POLICY "forum_comments: treasurer update" ON public.forum_comments
  FOR UPDATE USING (is_treasurer_or_admin()) WITH CHECK (is_treasurer_or_admin());

-- ============================================================
-- DUES_SUMMARY view
-- ============================================================

CREATE OR REPLACE VIEW public.dues_summary AS
SELECT
  dp.id,
  dp.student_id,
  u.name,
  u.email,
  dper.id            AS period_id,
  dper.name          AS period_name,
  dper.amount,
  dp.status,
  dp.paid_at,
  dp.proof_image_url
FROM public.dues_payments dp
JOIN public.users         u    ON dp.student_id    = u.id
JOIN public.dues_periods  dper ON dp.due_period_id = dper.id
WHERE dper.is_archived = FALSE
ORDER BY dper.start_date DESC, u.name ASC;

-- ============================================================
-- TRIGGER: auto-create public.users row on first login
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.users (id, email, name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(
      NULLIF(TRIM(NEW.raw_user_meta_data->>'name'), ''),
      NEW.email
    ),
    'murid'
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- TRIGGER: audit dues_payment changes (atomic with mutation)
-- If audit insert fails → entire transaction rolls back
-- ============================================================

CREATE OR REPLACE FUNCTION public.audit_dues_payment()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  INSERT INTO public.audit_log (
    user_id,
    action,
    table_name,
    record_id,
    old_values,
    new_values
  )
  VALUES (
    auth.uid(),
    CASE TG_OP
      WHEN 'INSERT' THEN 'payment_created'
      WHEN 'UPDATE' THEN 'payment_updated'
      WHEN 'DELETE' THEN 'payment_deleted'
    END,
    'dues_payments',
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP IN ('UPDATE', 'DELETE') THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW) ELSE NULL END
  );
  -- If INSERT above fails, exception propagates and rolls back the
  -- dues_payments mutation that triggered this function.
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER audit_dues_payment_changes
  AFTER INSERT OR UPDATE OR DELETE ON public.dues_payments
  FOR EACH ROW
  EXECUTE FUNCTION public.audit_dues_payment();
```

---

## 5. Supabase Client Setup

### `lib/supabase/server.ts`

```typescript
// lib/supabase/server.ts
// Used in Server Components and Server Actions.
// Creates a new client per request (cookies are request-scoped).

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createClient() {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // setAll called from a Server Component — safe to ignore.
            // The middleware handles token refresh.
          }
        },
      },
    }
  );
}
```

### `lib/supabase/client.ts`

```typescript
// lib/supabase/client.ts
// Singleton browser client — no service role key, no secrets.
// Import ONLY in Client Components (files with "use client").

import { createBrowserClient } from "@supabase/ssr";

let client: ReturnType<typeof createBrowserClient> | undefined;

export function getSupabaseBrowserClient() {
  if (client) return client;
  client = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
  return client;
}
```

### `lib/supabase/middleware.ts`

```typescript
// lib/supabase/middleware.ts
// Called from root middleware.ts. Refreshes the session cookie on
// every request so the access token doesn't silently expire.

import { createServerClient } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh session — DO NOT remove this call
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isPublicRoute =
    pathname === "/login" ||
    pathname.startsWith("/auth/") ||
    pathname === "/api/ping";

  if (!user && !isPublicRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
```

### `middleware.ts` (root)

```typescript
// middleware.ts
import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization)
     * - favicon.ico, sitemap.xml, robots.txt
     * - public files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
```

---

## 6. Type System

```typescript
// lib/types.ts
import type {
  User,
  DuesPeriod,
  DuesPayment,
  Announcement,
  Schedule,
  PhotoGallery,
  Photo,
  AuditLog,
  Attendance,
  Material,
  ForumPost,
  ForumComment,
} from "@prisma/client";

// ─── Core ActionResult contract ─────────────────────────────
// Every Server Action MUST return this type. Never throw to client.

export type ActionResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

// ─── User roles ──────────────────────────────────────────────

export type UserRole = "admin" | "bendahara" | "murid";

// ─── Domain enums ────────────────────────────────────────────

export type PaymentStatus = "pending" | "paid" | "overdue";
export type AttendanceStatus = "HADIR" | "IZIN" | "SAKIT" | "ALFA";
export type AnnouncementStatus = "draft" | "published";

// ─── Computed / aggregate types ──────────────────────────────

export interface AttendanceStats {
  studentsCount: number;
  presentCount: number;
  attendanceRate: number; // (presentCount / studentsCount) * 100, 2 decimal places
}

export interface DuesSummaryRow {
  id: string;
  student_id: string;
  name: string;
  email: string;
  period_id: string;
  period_name: string;
  amount: number;
  status: PaymentStatus;
  paid_at: Date | null;
  proof_image_url: string | null;
}

// ─── Current user (from Supabase Auth + public.users join) ───

export interface CurrentUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatarUrl: string | null;
}

// ─── Prisma model re-exports (for use outside Server Actions) ─

export type {
  User,
  DuesPeriod,
  DuesPayment,
  Announcement,
  Schedule,
  PhotoGallery,
  Photo,
  AuditLog,
  Attendance,
  Material,
  ForumPost,
  ForumComment,
};
```

---

## 7. Zod Validation Schemas

### `lib/validations/kas.ts`

```typescript
// lib/validations/kas.ts
import { z } from "zod";

export const createDuesPeriodSchema = z
  .object({
    name: z.string().min(1).max(100),
    amount: z.number().int().min(1).max(999_999_999),
    startDate: z.string().datetime(),
    endDate: z.string().datetime(),
  })
  .refine((data) => new Date(data.endDate) > new Date(data.startDate), {
    message: "Tanggal selesai harus lebih besar dari tanggal mulai.",
    path: ["endDate"],
  });

export const markPaymentPaidSchema = z.object({
  paymentId: z.string().min(1),
  notes: z.string().max(500).optional(),
  // proofImage handled separately as File/Buffer — not in JSON schema
});

export type CreateDuesPeriodInput = z.infer<typeof createDuesPeriodSchema>;
export type MarkPaymentPaidInput = z.infer<typeof markPaymentPaidSchema>;
```

### `lib/validations/gallery.ts`

```typescript
// lib/validations/gallery.ts
import { z } from "zod";

const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/webp"] as const;
const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB

export const createGallerySchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(500).optional(),
  eventDate: z.string().datetime(),
});

export const uploadPhotoSchema = z.object({
  galleryId: z.string().min(1),
  mimeType: z.enum(ALLOWED_MIME_TYPES, {
    errorMap: () => ({
      message: "Tipe file harus JPEG, PNG, atau WebP.",
    }),
  }),
  fileSizeBytes: z
    .number()
    .int()
    .max(MAX_FILE_SIZE_BYTES, "Ukuran file tidak boleh melebihi 5MB."),
  caption: z.string().max(300).optional(),
});

export type CreateGalleryInput = z.infer<typeof createGallerySchema>;
export type UploadPhotoInput = z.infer<typeof uploadPhotoSchema>;
```

### `lib/validations/announcement.ts`

```typescript
// lib/validations/announcement.ts
import { z } from "zod";

export const createAnnouncementSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export const updateAnnouncementSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1).max(200).optional(),
  content: z.string().min(1).optional(),
});

export type CreateAnnouncementInput = z.infer<typeof createAnnouncementSchema>;
export type UpdateAnnouncementInput = z.infer<typeof updateAnnouncementSchema>;
```

### `lib/validations/schedule.ts`

```typescript
// lib/validations/schedule.ts
import { z } from "zod";

export const upsertScheduleSlotSchema = z
  .object({
    dayOfWeek: z.number().int().min(0).max(4),
    periodOrder: z.number().int().min(1).max(8),
    periodLabel: z.string().min(1).max(20),
    subject: z.string().max(100).optional(),
    teacher: z.string().max(100).optional(),
    room: z.string().max(50).optional(),
    isBreak: z.boolean().default(false),
  })
  .superRefine((data, ctx) => {
    if (!data.isBreak && (!data.subject || data.subject.trim() === "")) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mata pelajaran wajib diisi untuk slot bukan istirahat.",
        path: ["subject"],
      });
    }
  });

export type UpsertScheduleSlotInput = z.infer<typeof upsertScheduleSlotSchema>;
```

### `lib/validations/attendance.ts`

```typescript
// lib/validations/attendance.ts
import { z } from "zod";

export const recordAttendanceSchema = z.object({
  studentId: z.string().uuid("studentId harus berupa UUID yang valid."),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Format tanggal harus YYYY-MM-DD."),
  status: z.enum(["HADIR", "IZIN", "SAKIT", "ALFA"]),
});

export type RecordAttendanceInput = z.infer<typeof recordAttendanceSchema>;
```

### `lib/validations/material.ts`

```typescript
// lib/validations/material.ts
import { z } from "zod";

export const createMaterialSchema = z
  .object({
    title: z.string().min(1).max(200),
    subjectName: z.string().min(1).max(100),
    description: z.string().max(500).optional(),
    // XOR: exactly one of fileUrl or externalLink must be provided
    fileUrl: z.string().url().optional(),
    cloudinaryId: z.string().optional(),
    externalLink: z.string().url().optional(),
  })
  .superRefine((data, ctx) => {
    const hasFile = Boolean(data.fileUrl);
    const hasLink = Boolean(data.externalLink);
    if (!hasFile && !hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Harus menyertakan salah satu dari tautan file atau tautan eksternal.",
        path: ["fileUrl"],
      });
    }
    if (hasFile && hasLink) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Tidak boleh menyertakan keduanya sekaligus.",
        path: ["externalLink"],
      });
    }
  });

export type CreateMaterialInput = z.infer<typeof createMaterialSchema>;
```

### `lib/validations/forum.ts`

```typescript
// lib/validations/forum.ts
import { z } from "zod";

export const createPostSchema = z.object({
  title: z.string().min(1).max(200),
  content: z.string().min(1),
});

export const createCommentSchema = z.object({
  postId: z.string().min(1),
  content: z.string().min(1),
});

export type CreatePostInput = z.infer<typeof createPostSchema>;
export type CreateCommentInput = z.infer<typeof createCommentSchema>;
```

### `lib/validations/profile.ts`

```typescript
// lib/validations/profile.ts
import { z } from "zod";

export const updateProfileSchema = z.object({
  name: z.string().min(1).max(100),
  avatarUrl: z.string().url().optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
```

---

## 8. Auth Guard Helpers

```typescript
// lib/actions/guards.ts
"use server";

import { createClient } from "@/lib/supabase/server";
import { prisma } from "@/lib/db";
import type { ActionResult, CurrentUser, UserRole } from "@/lib/types";
import { cache } from "react";

/**
 * Reads the current authenticated user from Supabase session
 * and joins with public.users to get role.
 * React cache() deduplicates this call within a single render pass.
 */
export const getCurrentUser = cache(
  async (): Promise<CurrentUser | null> => {
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const profile = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true, name: true, role: true, avatarUrl: true },
    });

    if (!profile) return null;

    return {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      role: profile.role as UserRole,
      avatarUrl: profile.avatarUrl,
    };
  }
);

/**
 * Asserts that a session exists.
 * Returns { ok: true, user } on success.
 * Returns ActionResult error if no session.
 *
 * Usage:
 *   const authResult = await requireAuth();
 *   if (!authResult.ok) return authResult.result;
 *   const { user } = authResult;
 */
export async function requireAuth(): Promise<
  | { ok: true; user: CurrentUser }
  | { ok: false; result: ActionResult<never> }
> {
  const user = await getCurrentUser();
  if (!user) {
    return {
      ok: false,
      result: {
        success: false,
        error: "Sesi tidak valid. Silakan login kembali.",
      },
    };
  }
  return { ok: true, user };
}

/**
 * Asserts that the current user has one of the allowed roles.
 *
 * Usage:
 *   const authResult = await requireAuth();
 *   if (!authResult.ok) return authResult.result;
 *   const roleResult = requireRole(authResult.user, ["admin", "bendahara"]);
 *   if (!roleResult.ok) return roleResult.result;
 */
export function requireRole(
  user: CurrentUser,
  allowed: UserRole[]
): { ok: true } | { ok: false; result: ActionResult<never> } {
  if (!allowed.includes(user.role)) {
    return {
      ok: false,
      result: { success: false, error: "Akses ditolak." },
    };
  }
  return { ok: true };
}
```

**Usage pattern in every Server Action:**

```typescript
"use server";
import { requireAuth, requireRole } from "@/lib/actions/guards";

export async function someAdminAction(input: unknown): Promise<ActionResult<SomeType>> {
  // 1. Auth guard
  const authResult = await requireAuth();
  if (!authResult.ok) return authResult.result;
  const { user } = authResult;

  // 2. Role guard
  const roleResult = requireRole(user, ["admin", "bendahara"]);
  if (!roleResult.ok) return roleResult.result;

  // 3. Zod validation
  const parsed = someSchema.safeParse(input);
  if (!parsed.success) {
    return { success: false, error: "Input tidak valid." };
  }

  // 4. DB operation
  try {
    const data = await prisma.someModel.create({ data: parsed.data });
    revalidatePath("/some-path");
    return { success: true, data };
  } catch (error) {
    return { success: false, error: formatError(error) };
  }
}
```

---

## 9. Server Action Signatures (All 8 Domains)

### `actions/auth.actions.ts`

```typescript
"use server";

// Sign in with email + password. Calls supabase.auth.signInWithPassword().
// Returns: ActionResult<{ redirectTo: string }>
export async function signInWithEmail(
  input: unknown
): Promise<ActionResult<{ redirectTo: string }>>;

// Sign in with Google OAuth. Calls supabase.auth.signInWithOAuth().
// Returns: ActionResult<{ url: string }> — client should redirect to url
export async function signInWithGoogle(): Promise<ActionResult<{ url: string }>>;

// Sign out. Calls supabase.auth.signOut(). Redirects to /login.
// Returns: never (redirect)
export async function signOut(): Promise<never>;
```

### `actions/finance.actions.ts`

```typescript
"use server";
import type { ActionResult, DuesSummaryRow } from "@/lib/types";
import type { DuesPeriod, DuesPayment } from "@prisma/client";

// Creates a new DuesPeriod. Requires admin or bendahara role.
// Calls revalidatePath("/kas") and revalidatePath("/admin/kas").
// Returns: ActionResult<DuesPeriod>
export async function createDuesPeriod(
  input: unknown
): Promise<ActionResult<DuesPeriod>>;

// Soft-deletes a DuesPeriod (sets isArchived = true).
// Requires admin or bendahara. Calls revalidatePath.
// Returns: ActionResult<DuesPeriod>
export async function archiveDuesPeriod(
  periodId: string
): Promise<ActionResult<DuesPeriod>>;

// Marks a DuesPayment as paid. Validates current status is pending|overdue.
// Accepts optional proof image as Buffer + mimeType for Cloudinary upload.
// Requires admin or bendahara. Calls revalidatePath.
// Returns: ActionResult<DuesPayment>
export async function markPaymentPaid(
  paymentId: string,
  opts: {
    notes?: string;
    proofImageBuffer?: Buffer;
    proofImageMimeType?: string;
    proofImageSizeBytes?: number;
  }
): Promise<ActionResult<DuesPayment>>;

// Returns aggregated payment status for all students in active periods.
// Queries dues_summary view. Requires admin or bendahara.
// Returns: ActionResult<DuesSummaryRow[]>
export async function getDuesSummary(): Promise<ActionResult<DuesSummaryRow[]>>;
```

### `actions/gallery.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { PhotoGallery, Photo } from "@prisma/client";

// Creates a new PhotoGallery record. Requires admin or bendahara.
// Calls revalidatePath("/galeri") and revalidatePath("/admin/galeri").
// Returns: ActionResult<PhotoGallery>
export async function createGallery(
  input: unknown
): Promise<ActionResult<PhotoGallery>>;

// Uploads a photo to Cloudinary then inserts into photos table.
// Validates galleryId exists first. Requires admin or bendahara.
// Returns: ActionResult<Photo>
export async function uploadPhoto(
  galleryId: string,
  fileBuffer: Buffer,
  mimeType: string,
  fileSizeBytes: number,
  caption?: string
): Promise<ActionResult<Photo>>;

// Deletes Cloudinary file then removes photos row.
// If Cloudinary returns 'not found', proceeds with DB delete.
// Requires admin or bendahara.
// Returns: ActionResult<{ id: string }>
export async function deletePhoto(
  photoId: string
): Promise<ActionResult<{ id: string }>>;

// Deletes a gallery and all its photos (Cascade handles DB side).
// Requires admin or bendahara.
// Returns: ActionResult<{ id: string }>
export async function deleteGallery(
  galleryId: string
): Promise<ActionResult<{ id: string }>>;
```

### `actions/announcement.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { Announcement } from "@prisma/client";

// Creates announcement with status = "draft". authorId = auth.uid().
// Requires admin or bendahara.
// Returns: ActionResult<Announcement>
export async function createAnnouncement(
  input: unknown
): Promise<ActionResult<Announcement>>;

// Sets status = "published", publishedAt = now().
// Requires admin or bendahara, or own authorship.
// Calls revalidatePath("/pengumuman") and revalidatePath("/admin/pengumuman").
// Returns: ActionResult<Announcement>
export async function publishAnnouncement(
  announcementId: string
): Promise<ActionResult<Announcement>>;

// Updates title and/or content of a draft or published announcement.
// Requires admin or bendahara, or own authorship.
// Returns: ActionResult<Announcement>
export async function updateAnnouncement(
  input: unknown
): Promise<ActionResult<Announcement>>;

// Deletes announcement. Calls revalidatePath.
// Requires admin or bendahara, or own authorship.
// Returns: ActionResult<{ id: string }>
export async function deleteAnnouncement(
  announcementId: string
): Promise<ActionResult<{ id: string }>>;
```

### `actions/schedule.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { Schedule } from "@prisma/client";

// Upserts a schedule slot based on (dayOfWeek, periodOrder) unique key.
// Validates isBreak conditional (subject required if isBreak = false).
// Requires admin or bendahara.
// Calls revalidatePath("/jadwal") and revalidatePath("/admin/jadwal").
// Returns: ActionResult<Schedule>
export async function upsertScheduleSlot(
  input: unknown
): Promise<ActionResult<Schedule>>;

// Deletes a schedule slot by id. Requires admin or bendahara.
// Calls revalidatePath("/jadwal") and revalidatePath("/admin/jadwal").
// Returns: ActionResult<{ id: string }>
export async function deleteScheduleSlot(
  slotId: string
): Promise<ActionResult<{ id: string }>>;
```

### `actions/attendance.actions.ts`

```typescript
"use server";
import type { ActionResult, AttendanceStats } from "@/lib/types";
import type { Attendance } from "@prisma/client";

// Records or updates attendance for one student on one date.
// Murid can only record for their own studentId (enforced in action).
// Sets checkInTime = now() if status = "HADIR", else null.
// Calls revalidatePath("/admin/presensi").
// Returns: ActionResult<Attendance>
export async function recordAttendance(
  input: unknown
): Promise<ActionResult<Attendance>>;

// Computes attendance stats for a given date.
// Requires admin or bendahara.
// attendanceRate = (presentCount / studentsCount) * 100 (2 decimal precision).
// Returns: ActionResult<AttendanceStats>
export async function getAttendanceStats(
  date: string // "YYYY-MM-DD"
): Promise<ActionResult<AttendanceStats>>;
```

### `actions/material.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { Material } from "@prisma/client";

// Creates a material record with either fileUrl (Cloudinary) or externalLink.
// XOR validated by Zod schema. Requires admin or bendahara.
// Calls revalidatePath("/materi") and revalidatePath("/admin/materi").
// Returns: ActionResult<Material>
export async function createMaterial(
  input: unknown,
  fileBuffer?: Buffer,
  fileMimeType?: string,
  fileSizeBytes?: number
): Promise<ActionResult<Material>>;

// Deletes Cloudinary file (if cloudinaryId present) then DB row.
// Requires admin or bendahara.
// Returns: ActionResult<{ id: string }>
export async function deleteMaterial(
  materialId: string
): Promise<ActionResult<{ id: string }>>;
```

### `actions/forum.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { ForumPost, ForumComment } from "@prisma/client";

// Creates a forum post. createdById = auth.uid().
// Any authenticated user may create.
// Returns: ActionResult<ForumPost>
export async function createPost(
  input: unknown
): Promise<ActionResult<ForumPost>>;

// Creates a comment on a post. Verifies postId exists first.
// createdById = auth.uid(). Any authenticated user.
// Returns: ActionResult<ForumComment>
export async function createComment(
  input: unknown
): Promise<ActionResult<ForumComment>>;

// Atomically sets target comment isAnswer = true and all others
// in the same post to isAnswer = false. Requires admin or bendahara.
// Uses prisma.$transaction([...]).
// Returns: ActionResult<ForumComment>
export async function markCommentAsAnswer(
  commentId: string
): Promise<ActionResult<ForumComment>>;

// Deletes a post (and cascades comments). Requires own authorship or admin/bendahara.
// Returns: ActionResult<{ id: string }>
export async function deletePost(
  postId: string
): Promise<ActionResult<{ id: string }>>;

// Deletes a comment. Requires own authorship or admin/bendahara.
// Returns: ActionResult<{ id: string }>
export async function deleteComment(
  commentId: string
): Promise<ActionResult<{ id: string }>>;
```

### `actions/profile.actions.ts`

```typescript
"use server";
import type { ActionResult } from "@/lib/types";
import type { User } from "@prisma/client";

// Updates name and/or avatarUrl for the current user.
// role field in payload is silently ignored (never written).
// Optionally uploads new avatar to Cloudinary first.
// Returns: ActionResult<User>
export async function updateProfile(
  input: unknown,
  avatarBuffer?: Buffer,
  avatarMimeType?: string
): Promise<ActionResult<User>>;
```

---

## 10. Cloudinary Integration

```typescript
// lib/cloudinary.ts
// server-only — never imported in client bundle
// Validated at module load — fails fast if env vars missing

import { v2 as cloudinary, type UploadApiResponse } from "cloudinary";

// ─── Folder constants ────────────────────────────────────────
export const GALLERY_FOLDER = "web-kelas/gallery" as const;
export const MATERI_FOLDER  = "web-kelas/materi"  as const;
export const AVATAR_FOLDER  = "web-kelas/avatars" as const;
export const PROOF_FOLDER   = "web-kelas/proofs"  as const;

// ─── Validate at module load ─────────────────────────────────
const cloudName  = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const apiKey     = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
const apiSecret  = process.env.CLOUDINARY_API_SECRET;

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    `Cloudinary env vars missing: ${[
      !cloudName  && "NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME",
      !apiKey     && "NEXT_PUBLIC_CLOUDINARY_API_KEY",
      !apiSecret  && "CLOUDINARY_API_SECRET",
    ]
      .filter(Boolean)
      .join(", ")}`
  );
}

cloudinary.config({
  cloud_name: cloudName,
  api_key:    apiKey,
  api_secret: apiSecret,
  secure:     true,
});

// ─── Upload ──────────────────────────────────────────────────

/**
 * Uploads a Buffer to Cloudinary.
 * @param buffer  - File content
 * @param folder  - One of the FOLDER constants above
 * @returns       - { url: secure_url, publicId: public_id }
 */
export function uploadToCloudinary(
  buffer: Buffer,
  folder: string
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder, resource_type: "auto" },
      (error, result) => {
        if (error || !result) {
          reject(error ?? new Error("Upload ke Cloudinary gagal."));
          return;
        }
        resolve({ url: result.secure_url, publicId: result.public_id });
      }
    );
    stream.end(buffer);
  });
}

// ─── Delete ──────────────────────────────────────────────────

/**
 * Deletes a file from Cloudinary by publicId.
 * Treats 'not found' as success (idempotent).
 * @throws if Cloudinary returns a real error (not 'not found')
 */
export async function deleteFromCloudinary(publicId: string): Promise<void> {
  const result = await cloudinary.uploader.destroy(publicId, {
    resource_type: "auto",
  });
  // result.result === 'not found' is OK — file already gone
  if (result.result !== "ok" && result.result !== "not found") {
    throw new Error(
      `Cloudinary delete gagal untuk ${publicId}: ${result.result}`
    );
  }
}

// ─── Thumbnail transform URL ─────────────────────────────────

/**
 * Rewrites a Cloudinary URL to apply thumbnail transforms.
 * Does NOT make a network call — pure string manipulation.
 *
 * @param cloudinaryUrl - Original secure_url from Cloudinary
 * @param width         - Desired width in pixels (default 400)
 */
export function getOptimizedUrl(
  cloudinaryUrl: string,
  width: number = 400
): string {
  const transform = `w_${width},c_fill,q_auto,f_auto`;
  // Insert transform string after /upload/
  return cloudinaryUrl.replace("/upload/", `/upload/${transform}/`);
}
```

---

## Error Handling

## 11. Error Handling Strategy

```typescript
// lib/utils.ts  (partial — error handling section)

/**
 * Converts any caught error into a safe, user-facing Indonesian string.
 * Never exposes table names, column names, stack traces, or Postgres codes.
 * Technical error is logged server-side via console.error.
 */
export function formatError(error: unknown): string {
  console.error("[Server Error]", error);

  if (error instanceof Error) {
    const msg = error.message;

    // Prisma unique constraint violation
    if (msg.includes("P2002")) {
      return "Data dengan nilai tersebut sudah ada. Pastikan tidak ada duplikasi.";
    }

    // Prisma record not found
    if (msg.includes("P2025")) {
      return "Data yang dimaksud tidak ditemukan.";
    }

    // Cloudinary-specific errors
    if (
      msg.toLowerCase().includes("cloudinary") ||
      msg.toLowerCase().includes("upload")
    ) {
      return "Gagal memproses file. Coba lagi atau hubungi administrator.";
    }

    // Supabase / Postgres auth errors
    if (
      msg.includes("JWT") ||
      msg.includes("token") ||
      msg.includes("session")
    ) {
      return "Sesi tidak valid. Silakan login kembali.";
    }
  }

  // Fallback — generic Indonesian message
  return "Terjadi kesalahan. Coba lagi atau hubungi administrator.";
}
```

**Error sanitization rules:**

| Scenario | What is logged (server) | What is shown (client) |
|---|---|---|
| Prisma `P2002` unique violation | Full Prisma error | "Data dengan nilai tersebut sudah ada..." |
| Prisma `P2025` not found | Full Prisma error | "Data yang dimaksud tidak ditemukan." |
| Cloudinary upload failure | Full Cloudinary error + publicId | "Gagal memproses file. Coba lagi..." |
| Supabase auth / JWT error | Full Supabase error | "Sesi tidak valid. Silakan login kembali." |
| Unknown error | `error` as-is | "Terjadi kesalahan. Coba lagi..." |
| Zod parse failure | Zod issues array | User-readable field-level message from schema |

**Invariants:**
- `console.error` is called before returning any `{ success: false }` result from a catch block.
- Stack traces, Postgres error codes (e.g. `23505`), table names, and column names are never included in the `error` string returned to the client.
- `throw` is never used to propagate errors to the client — all errors are caught and returned as `ActionResult`.

---

## 12. Performance & Free-Tier Optimizations

### Prisma Singleton (`lib/db.ts`)

```typescript
// lib/db.ts
// Prevents connection pool exhaustion on Vercel serverless:
// Each warm Lambda reuses the same PrismaClient instance.

import { PrismaClient } from "@prisma/client";

declare global {
  // eslint-disable-next-line no-var
  var __prisma: PrismaClient | undefined;
}

function createPrismaClient() {
  return new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  });
}

export const prisma: PrismaClient =
  globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalThis.__prisma = prisma;
}
```

### pgbouncer Connection String

```
# .env.local — runtime queries
DATABASE_URL="postgresql://postgres.[ref]:[password]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true&connection_limit=1"

# .env.local — migrations only (direct, bypasses pgbouncer)
DIRECT_URL="postgresql://postgres.[ref]:[password]@db.[ref].supabase.co:5432/postgres"
```

- `connection_limit=1` prevents a single Lambda from exhausting the pool.
- `pgbouncer=true` tells Prisma to skip prepared statements (incompatible with pgbouncer Transaction mode).
- `DIRECT_URL` is used exclusively by `prisma migrate dev` / `prisma db push`.

### `cache(getCurrentUser)` — Deduplicated Auth Read

`getCurrentUser()` is wrapped in React's `cache()` in `lib/actions/guards.ts`. Multiple Server Components on the same page (e.g. layout + page + sidebar) that all call `requireAuth()` share a single `supabase.auth.getUser()` round-trip per render pass.

### Supabase Keep-Alive Endpoint

```typescript
// app/api/ping/route.ts
// Called by a Vercel Cron job (or external ping service) every 5 minutes
// to prevent Supabase free-tier auto-pause.

import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  // Lightweight query — just to keep the connection alive
  await prisma.$queryRaw`SELECT 1`;
  return NextResponse.json({ ok: true });
}
```

> Configure a Vercel Cron in `vercel.json`:
> ```json
> { "crons": [{ "path": "/api/ping", "schedule": "*/5 * * * *" }] }
> ```

### Cloudinary Thumbnail Transforms

Use `getOptimizedUrl(url, width)` from `lib/cloudinary.ts` when rendering gallery thumbnails. The transform `w_400,c_fill,q_auto,f_auto` is applied in the URL string — no extra network call:

```typescript
// In a Server Component:
import { getOptimizedUrl } from "@/lib/cloudinary";

const thumbUrl = getOptimizedUrl(photo.cloudinaryUrl, 400);
// → https://res.cloudinary.com/.../upload/w_400,c_fill,q_auto,f_auto/...
```

### `revalidatePath` Strategy

| Domain | Paths revalidated on mutation |
|---|---|
| Kas | `/kas`, `/admin/kas` |
| Gallery | `/galeri`, `/admin/galeri` |
| Announcement | `/pengumuman`, `/admin/pengumuman` |
| Schedule | `/jadwal`, `/admin/jadwal` |
| Attendance | `/admin/presensi` |
| Material | `/materi`, `/admin/materi` |
| Forum | `/forum`, `/admin/forum` |
| Profile | `/profil` |

---

## 13. Environment Variables

```bash
# .env.example
# Copy this file to .env.local and fill in your actual values.
# NEVER commit .env.local to version control.

# ─── Supabase (public — safe to expose in browser bundle) ────
NEXT_PUBLIC_SUPABASE_URL=             # https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=        # Supabase anon/public key

# ─── Supabase (server-only — NEVER prefix with NEXT_PUBLIC_) ─
SUPABASE_SERVICE_ROLE_KEY=            # Supabase service role key (admin bypass)

# ─── Database (server-only) ──────────────────────────────────
DATABASE_URL=                         # Supabase Transaction Pooler URL
                                      # port 6543, ?pgbouncer=true&connection_limit=1
DIRECT_URL=                           # Supabase direct DB URL
                                      # port 5432, used by prisma migrate only

# ─── Cloudinary (public — cloud name and API key are safe) ───
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=    # Your Cloudinary cloud name
NEXT_PUBLIC_CLOUDINARY_API_KEY=       # Cloudinary API key (public)

# ─── Cloudinary (server-only) ────────────────────────────────
CLOUDINARY_API_SECRET=                # Cloudinary API secret — NEVER NEXT_PUBLIC_

# ─── App (optional) ──────────────────────────────────────────
NEXT_PUBLIC_APP_URL=                  # e.g. https://yourapp.vercel.app
                                      # Used for OAuth redirect URLs
```

**Startup validation** — add to `next.config.ts` or a dedicated `lib/env.ts`:

```typescript
// lib/env.ts — imported in lib/db.ts and lib/cloudinary.ts for early failure
const required = [
  "NEXT_PUBLIC_SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "DATABASE_URL",
] as const;

for (const key of required) {
  if (!process.env[key]) {
    throw new Error(
      `Missing required environment variable: ${key}. ` +
        `Check .env.local or your Vercel project settings.`
    );
  }
}
```

---

## 14. Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

These properties are implemented using **fast-check** (TypeScript PBT library). Each test runs a minimum of 100 iterations.

```bash
npm install --save-dev fast-check
```

Tag format per test: `// Feature: backend-class-rpl-1, Property {N}: {property_text}`

---

## Correctness Properties

### Property 1: DuesPeriod Date Ordering Invariant

*For any* DuesPeriod input where `endDate ≤ startDate`, the `createDuesPeriodSchema` validator SHALL reject the input; and for any input where `endDate > startDate`, it SHALL accept it.

**Validates: Requirements 4.2**

```typescript
// Feature: backend-class-rpl-1, Property 1: DuesPeriod date ordering invariant
import * as fc from "fast-check";
import { createDuesPeriodSchema } from "@/lib/validations/kas";

test("createDuesPeriodSchema rejects endDate <= startDate for all date pairs", () => {
  fc.assert(
    fc.property(
      fc.date({ min: new Date("2020-01-01"), max: new Date("2030-01-01") }),
      fc.nat({ max: 365 * 5 }), // offset in days — 0 means same day
      (startDate, offsetDays) => {
        // endDate <= startDate case
        const invalidInput = {
          name: "Periode Test",
          amount: 50000,
          startDate: startDate.toISOString(),
          endDate: new Date(
            startDate.getTime() - offsetDays * 86_400_000
          ).toISOString(),
        };
        const result = createDuesPeriodSchema.safeParse(invalidInput);
        return result.success === false;
      }
    ),
    { numRuns: 200 }
  );
});

test("createDuesPeriodSchema accepts endDate > startDate for all date pairs", () => {
  fc.assert(
    fc.property(
      fc.date({ min: new Date("2020-01-01"), max: new Date("2029-01-01") }),
      fc.nat({ max: 365 * 5 }).filter((n) => n > 0), // at least 1 day gap
      (startDate, offsetDays) => {
        const validInput = {
          name: "Periode Test",
          amount: 50000,
          startDate: startDate.toISOString(),
          endDate: new Date(
            startDate.getTime() + offsetDays * 86_400_000
          ).toISOString(),
        };
        const result = createDuesPeriodSchema.safeParse(validInput);
        return result.success === true;
      }
    ),
    { numRuns: 200 }
  );
});
```

---

### Property 2: Unique Payment Constraint — No Duplicate Payments

*For any* student and dues period, attempting to create two `DuesPayment` records with the same `(studentId, duePeriodId)` pair SHALL fail with a Prisma `P2002` unique constraint error, and the original payment SHALL remain unchanged.

**Validates: Requirements 3.3, 5.1**

```typescript
// Feature: backend-class-rpl-1, Property 2: Unique payment constraint
import * as fc from "fast-check";
import { prisma } from "@/lib/db";

test("duplicate (studentId, duePeriodId) is always rejected by DB", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.uuid(),  // studentId (mock — no real DB user needed for constraint test)
      fc.string({ minLength: 1, maxLength: 30 }), // periodId
      async (studentId, duePeriodId) => {
        // Reset state between runs: cleanup after each
        try {
          await prisma.duesPayment.deleteMany({
            where: { studentId, duePeriodId },
          });
          await prisma.duesPayment.create({
            data: { studentId, duePeriodId, status: "pending" },
          });
          // Second create must fail
          await expect(
            prisma.duesPayment.create({
              data: { studentId, duePeriodId, status: "pending" },
            })
          ).rejects.toThrow("P2002");
          return true;
        } finally {
          await prisma.duesPayment.deleteMany({
            where: { studentId, duePeriodId },
          });
        }
      }
    ),
    { numRuns: 50 } // fewer runs — involves DB I/O
  );
});
```

> **Note:** This property tests the DB constraint layer. Use a test database (not production). In CI, run against a Supabase local dev instance or a dedicated test schema.

---

### Property 3: File Upload Validation Universality

*For any* file with an invalid MIME type (not in `["image/jpeg", "image/png", "image/webp"]`) or with a size exceeding 5MB, the `uploadPhotoSchema` validator SHALL reject it; and for any valid MIME type with size ≤ 5MB, it SHALL accept it.

**Validates: Requirements 6.1, 6.2, 5.2**

```typescript
// Feature: backend-class-rpl-1, Property 3: File upload validation universality
import * as fc from "fast-check";
import { uploadPhotoSchema } from "@/lib/validations/gallery";

const VALID_MIMES = ["image/jpeg", "image/png", "image/webp"];
const MAX_BYTES = 5 * 1024 * 1024;

test("uploadPhotoSchema rejects invalid MIME types for all inputs", () => {
  fc.assert(
    fc.property(
      fc.string().filter((s) => !VALID_MIMES.includes(s)),
      fc.nat({ max: MAX_BYTES }),
      (invalidMime, size) => {
        const result = uploadPhotoSchema.safeParse({
          galleryId: "test-gallery",
          mimeType: invalidMime,
          fileSizeBytes: size,
        });
        return result.success === false;
      }
    ),
    { numRuns: 300 }
  );
});

test("uploadPhotoSchema rejects files over 5MB regardless of MIME type", () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...VALID_MIMES),
      fc.integer({ min: MAX_BYTES + 1, max: MAX_BYTES * 10 }),
      (validMime, oversizeBytes) => {
        const result = uploadPhotoSchema.safeParse({
          galleryId: "test-gallery",
          mimeType: validMime,
          fileSizeBytes: oversizeBytes,
        });
        return result.success === false;
      }
    ),
    { numRuns: 200 }
  );
});

test("uploadPhotoSchema accepts valid MIME and size ≤ 5MB for all combinations", () => {
  fc.assert(
    fc.property(
      fc.constantFrom(...VALID_MIMES),
      fc.nat({ max: MAX_BYTES }),
      (validMime, validSize) => {
        const result = uploadPhotoSchema.safeParse({
          galleryId: "test-gallery",
          mimeType: validMime,
          fileSizeBytes: validSize,
        });
        return result.success === true;
      }
    ),
    { numRuns: 200 }
  );
});
```

---

### Property 4: Material XOR Constraint

*For any* material input, exactly one of `fileUrl` or `externalLink` must be present. Inputs where both are absent, or both are present, SHALL always be rejected by `createMaterialSchema`.

**Validates: Requirements 10.1**

```typescript
// Feature: backend-class-rpl-1, Property 4: Material XOR constraint
import * as fc from "fast-check";
import { createMaterialSchema } from "@/lib/validations/material";

const baseInput = { title: "Materi Test", subjectName: "Matematika" };
const validUrl = "https://example.com/file.pdf";

test("createMaterialSchema rejects when both fileUrl and externalLink are absent", () => {
  fc.assert(
    fc.property(
      fc.string({ minLength: 1, maxLength: 100 }), // title variation
      fc.string({ minLength: 1, maxLength: 50 }),  // subjectName variation
      (title, subjectName) => {
        const result = createMaterialSchema.safeParse({
          title,
          subjectName,
          // no fileUrl, no externalLink
        });
        return result.success === false;
      }
    ),
    { numRuns: 150 }
  );
});

test("createMaterialSchema rejects when both fileUrl and externalLink are present", () => {
  fc.assert(
    fc.property(
      fc.webUrl(),
      fc.webUrl(),
      (fileUrl, externalLink) => {
        const result = createMaterialSchema.safeParse({
          ...baseInput,
          fileUrl,
          externalLink,
        });
        return result.success === false;
      }
    ),
    { numRuns: 150 }
  );
});

test("createMaterialSchema accepts when exactly one of fileUrl or externalLink is present", () => {
  fc.assert(
    fc.property(
      fc.boolean(), // which field to use
      fc.webUrl(),
      (useFileUrl, url) => {
        const result = createMaterialSchema.safeParse({
          ...baseInput,
          fileUrl: useFileUrl ? url : undefined,
          externalLink: useFileUrl ? undefined : url,
        });
        return result.success === true;
      }
    ),
    { numRuns: 200 }
  );
});
```

---

### Property 5: Forum Answer Uniqueness Invariant

*For any* forum post with any number of comments, after calling `markCommentAsAnswer(commentId)`, exactly one comment on that post SHALL have `isAnswer = true` — the target comment — and all others SHALL have `isAnswer = false`.

**Validates: Requirements 11.3**

```typescript
// Feature: backend-class-rpl-1, Property 5: Forum answer uniqueness invariant
import * as fc from "fast-check";
import { prisma } from "@/lib/db";
import { markCommentAsAnswer } from "@/actions/forum.actions";

test("markCommentAsAnswer always results in exactly one isAnswer=true per post", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.integer({ min: 1, max: 10 }), // number of comments
      fc.nat(),                          // index of comment to mark
      async (commentCount, targetIndexSeed) => {
        // Create a test post with commentCount comments
        const post = await prisma.forumPost.create({
          data: {
            title: "Test Post",
            content: "Test Content",
            createdById: TEST_USER_ID, // fixture admin user id
          },
        });
        const comments = await Promise.all(
          Array.from({ length: commentCount }).map(() =>
            prisma.forumComment.create({
              data: {
                postId: post.id,
                content: "Comment",
                createdById: TEST_USER_ID,
              },
            })
          )
        );
        const targetComment = comments[targetIndexSeed % commentCount];
        await markCommentAsAnswer(targetComment.id);

        const allComments = await prisma.forumComment.findMany({
          where: { postId: post.id },
        });
        const answerCount = allComments.filter((c) => c.isAnswer).length;
        const targetIsAnswer = allComments.find(
          (c) => c.id === targetComment.id
        )?.isAnswer;

        // Cleanup
        await prisma.forumPost.delete({ where: { id: post.id } });

        return answerCount === 1 && targetIsAnswer === true;
      }
    ),
    { numRuns: 50 }
  );
});
```

---

### Property 6: Schedule `isBreak` Conditional Validation

*For any* schedule slot where `isBreak = false` and `subject` is absent or whitespace-only, `upsertScheduleSlotSchema` SHALL reject it. *For any* slot where `isBreak = true`, `subject` being absent SHALL be accepted.

**Validates: Requirements 8.2**

```typescript
// Feature: backend-class-rpl-1, Property 6: Schedule isBreak conditional validation
import * as fc from "fast-check";
import { upsertScheduleSlotSchema } from "@/lib/validations/schedule";

const baseSlot = {
  dayOfWeek: 0,
  periodOrder: 1,
  periodLabel: "08:00-09:00",
};

test("upsertScheduleSlotSchema rejects missing subject when isBreak=false", () => {
  fc.assert(
    fc.property(
      // whitespace-only or empty strings for subject
      fc.stringOf(fc.constantFrom(" ", "\t", "\n")),
      (whitespace) => {
        const result = upsertScheduleSlotSchema.safeParse({
          ...baseSlot,
          isBreak: false,
          subject: whitespace,
        });
        return result.success === false;
      }
    ),
    { numRuns: 200 }
  );
});

test("upsertScheduleSlotSchema accepts null/absent subject when isBreak=true", () => {
  fc.assert(
    fc.property(
      fc.integer({ min: 0, max: 4 }),  // dayOfWeek variation
      fc.integer({ min: 1, max: 8 }),  // periodOrder variation
      (dayOfWeek, periodOrder) => {
        const result = upsertScheduleSlotSchema.safeParse({
          ...baseSlot,
          dayOfWeek,
          periodOrder,
          isBreak: true,
          subject: undefined,
        });
        return result.success === true;
      }
    ),
    { numRuns: 200 }
  );
});
```

---

### Property 7: Audit Trail Completeness

*For any* `dues_payments` mutation (INSERT, UPDATE, or DELETE), exactly one `audit_log` row SHALL be created with the correct `action`, `record_id`, and non-null `new_values` (for INSERT/UPDATE) or `old_values` (for UPDATE/DELETE).

**Validates: Requirements 16.1, 16.2, 16.3**

```typescript
// Feature: backend-class-rpl-1, Property 7: Audit trail completeness
import * as fc from "fast-check";
import { prisma } from "@/lib/db";

test("every dues_payment INSERT produces exactly one audit_log entry", async () => {
  await fc.assert(
    fc.asyncProperty(
      fc.constantFrom("pending", "paid", "overdue") as fc.Arbitrary<string>,
      async (status) => {
        const countBefore = await prisma.auditLog.count();
        const payment = await prisma.duesPayment.create({
          data: {
            studentId: TEST_STUDENT_ID,  // fixture
            duePeriodId: TEST_PERIOD_ID, // fixture
            status,
          },
        });
        const countAfter = await prisma.auditLog.count();
        const entry = await prisma.auditLog.findFirst({
          where: { recordId: payment.id, action: "payment_created" },
        });

        // Cleanup
        await prisma.duesPayment.delete({ where: { id: payment.id } });

        return (
          countAfter === countBefore + 1 &&
          entry !== null &&
          entry.newValues !== null &&
          entry.oldValues === null
        );
      }
    ),
    { numRuns: 30 } // DB I/O — fewer runs
  );
});
```

---

## Testing Strategy

### Dual Testing Approach

Both unit tests and property tests are required. They are complementary, not substitutes.

| Test Type | Focus | Tool |
|---|---|---|
| Unit tests | Specific examples, edge cases, error conditions | Vitest |
| Property tests | Universal properties across all valid inputs | Vitest + fast-check |
| Integration tests | DB triggers, RLS policies, auth flow | Vitest + Supabase local |

### Unit Test Priorities

- `formatError()`: each mapped Prisma/Cloudinary code → expected Indonesian message
- `getOptimizedUrl()`: URL rewriting correctness
- `requireAuth()` / `requireRole()`: session absent, wrong role, correct role
- Each Zod schema: valid input passes, invalid permutations fail

### Property Test Configuration

Each property test file:

```typescript
import { expect, test } from "vitest";
import * as fc from "fast-check";

// Minimum 100 runs per property (default fast-check); increase for pure fn tests
fc.configureGlobal({ numRuns: 200 });
```

### Integration Test Notes

- Run against Supabase local (`supabase start` CLI) — never production.
- Test RLS by connecting as different roles and asserting SELECT/INSERT/UPDATE/DELETE outcomes.
- Test audit trigger: insert a `dues_payment`, verify `audit_log` row created.
- Test `on_auth_user_created` trigger: insert into `auth.users`, verify `public.users` row.

### PBT Applicability Assessment

Property-based testing is applicable to this backend because:
- Zod validation schemas are pure functions with a large input space.
- The `markCommentAsAnswer` atomicity invariant is universal across any number of comments.
- The audit trail completeness property holds for all payment mutations regardless of payload.
- File validation rules (MIME, size) apply to all possible file inputs.

PBT is **not used** for:
- RLS policy verification (infrastructure — use integration tests with role-switching)
- OAuth / session cookie flow (infrastructure — use example-based tests or Playwright E2E)
- `revalidatePath` calls (side-effects — verified by example in unit tests)
