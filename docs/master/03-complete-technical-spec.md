# 03 — Complete Technical Specification
**class-rpl-1-202627** | Web Kelas (Classroom Management Application)

**Version:** 1.0  
**Last Updated:** August 2026  
**Status:** Reference Document for AI Agents  

---

## Table of Contents

1. [Feature Inventory](#feature-inventory)
2. [System Architecture](#system-architecture)
3. [Database Schema](#database-schema)
4. [API Contract](#api-contract)
5. [Authentication & Security](#authentication--security)
6. [Frontend Components & Pages](#frontend-components--pages)
7. [System Flow Diagram](#system-flow-diagram)
8. [User Journeys](#user-journeys)
9. [Error Handling](#error-handling)
10. [Deployment & Free-Tier Constraints](#deployment--free-tier-constraints)

---

## 1. Feature Inventory

### MVP Features (Must Have)

#### 1.1 Authentication & User Management
- **SSO via Supabase Auth** (Google, Email/Password)
- **Three canonical roles:** `admin`, `bendahara`, `murid`
- **Role-based access control** enforced at database layer (RLS)
- **Session management:** HttpOnly cookies + Supabase SSR pattern
- **Auto-profile creation** on first login (trigger in Postgres)

#### 1.2 Kas Kelas (Class Treasury)
- **Dues period management** (`DuesPeriod` model)
  - Period name, start date, end date, amount due
  - Soft delete flag (archive, not destroy)
  - Created/updated timestamps
  
- **Dues payment tracking** (`DuesPayment` model)
  - Student → Payment record linking
  - Payment status: `pending`, `paid`, `overdue`
  - Proof of payment (optional image via Cloudinary)
  - Payment date, notes, created/updated timestamps
  
- **Treasurer dashboard** (`bendahara` role)
  - View all students and payment status
  - Mark payments as paid with optional image proof
  - Generate payment summary (via `dues_summary` SQL view)
  - Export summary (future: CSV/Excel via free tools or Server Action)
  - Audit trail for all payment mutations
  
- **Student view** (`murid` role)
  - See their own payment status and history
  - View outstanding dues with deadlines
  - Read-only access to their payment records

- **Admin control**
  - Create/edit/archive dues periods
  - Manage student roster
  - View audit log for compliance

#### 1.3 Photo Gallery
- **Image upload** (via Cloudinary, max 5MB per image)
- **Album/gallery organization** (by event date or category)
- **Role-based visibility:**
  - `admin` & `bendahara`: full CRUD
  - `murid`: view-only
  
- **Lazy-load images** (pagination for mobile performance)
- **Responsive grid layout** (3 columns desktop, 2 mobile)

#### 1.4 Announcements
- **Rich-text announcement creation** (admin/bendahara only)
- **Publish/draft states**
- **Timestamp and author attribution**
- **Read receipts tracking** (future enhancement, not MVP)
- **All roles can view** announcements

#### 1.5 Class Schedule
- **Period-based grid layout**
  - Rows = days of week (Mon–Fri)
  - Columns = teaching periods (1–8)
  - Cells = subject + teacher + room
  
- **Data model:** `Schedule` with:
  - `dayOfWeek` (0–4 for Mon–Fri)
  - `periodOrder` (1–8)
  - `periodLabel` (e.g., "08:00–09:00")
  - `subject`, `teacher`, `room`
  - `isBreak` flag (lunch, free period, etc.)
  - `updatedAt` for change tracking
  
- **Mobile-friendly display:**
  - Horizontal scroll with sticky day column
  - Touch-friendly cell sizing (44px minimum)
  
- **Admin/Bendahara:** Can edit schedule  
- **Murid:** Read-only view

---

## 2. System Architecture

### 2.1 Technology Stack (Locked)

| Layer | Technology | Free Tier | Notes |
|-------|-----------|-----------|-------|
| **Frontend** | Next.js 14+ (App Router) | ✓ Vercel | Mobile-first; Server Components for reads, Server Actions for mutations |
| **Auth** | Supabase Auth | ✓ Free tier | SSO (Google, Email), HttpOnly cookies, Middleware protection |
| **Database** | Supabase Postgres | ✓ 500MB | RLS policies, audit triggers, view for summary queries |
| **ORM** | Prisma | ✓ Open source | Type-safe queries; auto-migrations via Vercel/CLI |
| **Image Storage** | Cloudinary | ✓ Free tier | 25 GB/month, signed URLs, on-the-fly transforms |
| **Deployment** | Vercel | ✓ Free tier | Edge Functions (future), Environment variables, Git deploy |
| **Validation** | Zod | ✓ Open source | Client + server schemas; parse & validate |
| **Styling** | Tailwind CSS | ✓ Open source | Mobile-first; dark mode capable |
| **Icons** | Lucide React | ✓ Open source | 400+ icons; tree-shakeable |

**Forbidden Dependencies:**
- UI component libraries (shadcn/ui, MUI, Chakra, etc.) without explicit approval
- Auth libraries beyond Supabase (Firebase, Auth0, etc.)
- Redundant storage (use Cloudinary for images only; Supabase for metadata & non-images)

---

### 2.2 Authentication Flow (Supabase SSR + Next.js Middleware)

```
┌─────────────────────────────────────────────────────────────────┐
│ 1. User visits app (guest)                                       │
│    → Middleware checks for session cookie                        │
│    → No cookie → redirect to /login                              │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 2. /login page (public)                                          │
│    → Display Google SSO button + Email/Password form             │
│    → User clicks "Sign in with Google"                           │
│    → Supabase Auth → Google OAuth → callback to /auth/callback   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 3. /auth/callback (Supabase redirects here)                      │
│    → Exchange code for session                                   │
│    → Set HttpOnly cookie (via @supabase/ssr)                     │
│    → Auto-create profile via Postgres trigger (if new user)      │
│    → Redirect to /dashboard (Middleware allows access)           │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 4. Authenticated request to /dashboard                           │
│    → Middleware extracts session from HttpOnly cookie            │
│    → Verifies JWT signature                                      │
│    → Attaches user context to request                            │
│    → Route handler or Server Component can access user.id        │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 5. Server Component fetches data with RLS checks                 │
│    → SELECT * FROM users WHERE id = auth.uid()                   │
│    → Database evaluates RLS policy for this role                 │
│    → Only authorized data returned                               │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│ 6. Server Action (mutation): bendahara marks payment as paid     │
│    → Client calls paymentAction({ paymentId, ... })              │
│    → Server verifies role via RLS + custom helper fn             │
│    → UPDATE dues_payments SET status = 'paid' WHERE id = ...     │
│    → Insert audit log entry                                      │
│    → Return { success: true, data: updatedPayment }              │
└─────────────────────────────────────────────────────────────────┘
```

**Key Points:**
- No Redux/Context/Zustand—state lives on server (Supabase + Postgres)
- HttpOnly cookies prevent XSS theft of session
- Middleware is the single source of truth for route protection
- RLS policies are enforced at database level, not app logic

---

### 2.3 Data Flow Patterns

#### Read (Query)
```
Client (React Component)
  ↓
Server Component / API Route
  ↓
Supabase Client (with session)
  ↓
Postgres + RLS Policy Check
  ↓
Return data (or 403 if denied)
  ↓
Component renders or error handling
```

**Standard Response Shape:**
```typescript
{
  success: boolean,
  data?: any,        // populated if success = true
  error?: string     // populated if success = false
}
```

#### Write (Mutation)
```
Client clicks button
  ↓
Server Action invoked ("use server")
  ↓
Zod validation (input schema)
  ↓
Supabase client query (mutation)
  ↓
Postgres trigger → audit log entry
  ↓
Postgres RLS policy check
  ↓
Return { success: true/false, data?, error? }
  ↓
Client updates UI or shows error
```

---

## 3. Database Schema

### 3.1 Core Tables

#### `auth.users` (Supabase native)
- `id` (UUID, primary key)
- `email` (unique)
- `created_at`, `updated_at`
- *Note: managed by Supabase Auth, not Prisma*

#### `public.users` (Prisma model)
```prisma
model User {
  id              String   @id @db.Uuid
  email           String   @unique
  name            String
  role            String   @default("murid")  // "admin" | "bendahara" | "murid"
  avatarUrl       String?  // Optional profile picture (Cloudinary)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  duesPayments    DuesPayment[]
  announcements   Announcement[]
  auditLogs       AuditLog[]

  @@index([role])
  @@index([email])
}
```

#### `public.dues_periods`
```prisma
model DuesPeriod {
  id              String   @id @default(cuid())
  name            String   // e.g., "Semester 1 2024-2025"
  amount          Int      // in rupiah (no decimals)
  startDate       DateTime
  endDate         DateTime
  isArchived      Boolean  @default(false)  // soft delete
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  duesPayments    DuesPayment[]

  @@index([isArchived])
  @@index([startDate])
}
```

#### `public.dues_payments`
```prisma
model DuesPayment {
  id              String   @id @default(cuid())
  studentId       String   @db.Uuid
  duePeriodId     String
  status          String   @default("pending")  // "pending" | "paid" | "overdue"
  proofImageUrl   String?  // Cloudinary URL
  paidAt          DateTime?
  notes           String?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  student         User       @relation(fields: [studentId], references: [id], onDelete: Cascade)
  period          DuesPeriod @relation(fields: [duePeriodId], references: [id], onDelete: Cascade)

  @@unique([studentId, duePeriodId])
  @@index([status])
  @@index([paidAt])
}
```

#### `public.announcements`
```prisma
model Announcement {
  id              String   @id @default(cuid())
  title           String
  content         String   // HTML or markdown
  authorId        String   @db.Uuid
  status          String   @default("draft")  // "draft" | "published"
  publishedAt     DateTime?
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  author          User     @relation(fields: [authorId], references: [id], onDelete: Cascade)

  @@index([status])
  @@index([publishedAt])
}
```

#### `public.schedule`
```prisma
model Schedule {
  id              String   @id @default(cuid())
  dayOfWeek       Int      // 0 = Monday, 4 = Friday
  periodOrder     Int      // 1–8 (order of teaching period)
  periodLabel     String   // "08:00–09:00"
  subject         String?  // NULL if isBreak = true
  teacher         String?
  room            String?
  isBreak         Boolean  @default(false)
  updatedAt       DateTime @updatedAt

  @@unique([dayOfWeek, periodOrder])
  @@index([dayOfWeek])
}
```

#### `public.photo_galleries` (future enhancement)
```prisma
model PhotoGallery {
  id              String   @id @default(cuid())
  title           String
  description     String?
  eventDate       DateTime
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  photos          Photo[]

  @@index([eventDate])
}

model Photo {
  id              String   @id @default(cuid())
  galleryId       String
  cloudinaryUrl   String
  cloudinaryId    String   // for deletion
  caption         String?
  uploadedAt      DateTime @default(now())

  gallery         PhotoGallery @relation(fields: [galleryId], references: [id], onDelete: Cascade)

  @@index([galleryId])
}
```

#### `public.audit_log`
```prisma
model AuditLog {
  id              String   @id @default(cuid())
  userId          String   @db.Uuid
  action          String   // "payment_marked_paid" | "announcement_published" | etc.
  tableName       String   // "dues_payments" | "announcements"
  recordId        String
  oldValues       Json?    // before state
  newValues       Json?    // after state
  createdAt       DateTime @default(now())

  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@index([userId])
  @@index([action])
  @@index([createdAt])
}
```

### 3.2 SQL Views & Helper Functions

#### `dues_summary` (SQL View)
```sql
CREATE OR REPLACE VIEW dues_summary AS
SELECT
  dp.id,
  dp.student_id,
  u.name,
  u.email,
  dper.id as period_id,
  dper.name as period_name,
  dper.amount,
  dp.status,
  dp.paid_at,
  COUNT(*) OVER (
    PARTITION BY dp.student_id, dper.id
  ) as payment_count
FROM dues_payments dp
JOIN users u ON dp.student_id = u.id
JOIN dues_periods dper ON dp.due_period_id = dper.id
WHERE dper.is_archived = false
ORDER BY dper.start_date DESC, u.name ASC;
```

#### Helper Function: `is_admin()`
```sql
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Helper Function: `is_treasurer_or_admin()`
```sql
CREATE OR REPLACE FUNCTION is_treasurer_or_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM users
    WHERE id = auth.uid()
    AND role IN ('bendahara', 'admin')
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
```

#### Trigger: Auto-create Profile on First Login
```sql
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.raw_user_meta_data->>'role' IS NOT NULL THEN
    INSERT INTO public.users (id, email, name, role)
    VALUES (
      NEW.id,
      NEW.email,
      COALESCE(
        NEW.raw_user_meta_data->>'name',
        NEW.email
      ),
      COALESCE(
        NEW.raw_user_meta_data->>'role',
        'murid'
      )
    )
    ON CONFLICT (id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION create_user_profile();
```

#### Trigger: Audit Trail on Payment Mutation
```sql
CREATE OR REPLACE FUNCTION audit_dues_payment()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.audit_log (user_id, action, table_name, record_id, old_values, new_values)
  VALUES (
    auth.uid(),
    CASE
      WHEN TG_OP = 'INSERT' THEN 'payment_created'
      WHEN TG_OP = 'UPDATE' THEN 'payment_updated'
      WHEN TG_OP = 'DELETE' THEN 'payment_deleted'
    END,
    'dues_payments',
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' OR TG_OP = 'UPDATE' THEN row_to_json(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN row_to_json(NEW) ELSE NULL END
  );
  RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER audit_dues_payment_changes
AFTER INSERT OR UPDATE OR DELETE ON dues_payments
FOR EACH ROW
EXECUTE FUNCTION audit_dues_payment();
```

### 3.3 Row Level Security (RLS) Policies

#### `users` table
```sql
-- Admin: see all
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
CREATE POLICY admin_all_users ON users
  USING (is_admin());

-- Regular users: see only themselves
CREATE POLICY users_see_self ON users
  USING (auth.uid() = id);
```

#### `dues_periods` table
```sql
ALTER TABLE dues_periods ENABLE ROW LEVEL SECURITY;

-- Admin/Treasurer: full CRUD
CREATE POLICY treasurer_manage_periods ON dues_periods
  USING (is_treasurer_or_admin())
  WITH CHECK (is_treasurer_or_admin());

-- All logged-in users: read current/active
CREATE POLICY all_see_active_periods ON dues_periods
  FOR SELECT
  USING (NOT is_archived);
```

#### `dues_payments` table
```sql
ALTER TABLE dues_payments ENABLE ROW LEVEL SECURITY;

-- Admin/Treasurer: see all, update
CREATE POLICY treasurer_manage_payments ON dues_payments
  USING (is_treasurer_or_admin())
  WITH CHECK (is_treasurer_or_admin());

-- Students: see own payments
CREATE POLICY student_see_own_payments ON dues_payments
  FOR SELECT
  USING (student_id = auth.uid());
```

#### `announcements` table
```sql
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;

-- Admin/Treasurer: create, edit own or any published
CREATE POLICY author_manage_own ON announcements
  USING (author_id = auth.uid() OR is_treasurer_or_admin())
  WITH CHECK (author_id = auth.uid() OR is_treasurer_or_admin());

-- All logged-in: read published
CREATE POLICY all_see_published ON announcements
  FOR SELECT
  USING (status = 'published');
```

#### `schedule` table
```sql
ALTER TABLE schedule ENABLE ROW LEVEL SECURITY;

-- Admin/Treasurer: CRUD
CREATE POLICY treasurer_manage_schedule ON schedule
  USING (is_treasurer_or_admin())
  WITH CHECK (is_treasurer_or_admin());

-- All logged-in: read
CREATE POLICY all_see_schedule ON schedule
  FOR SELECT
  USING (true);
```

#### `audit_log` table
```sql
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;

-- Admin only
CREATE POLICY admin_see_audit ON audit_log
  USING (is_admin());
```

---

## 4. API Contract

### 4.1 Server Actions (Mutations)

#### Kas Kelas — Create Dues Period
```typescript
// app/actions/kas.ts
"use server";

import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const createDuesPeriodSchema = z.object({
  name: z.string().min(1),
  amount: z.number().int().positive(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime(),
});

export async function createDuesPeriod(input: unknown) {
  const parsed = createDuesPeriodSchema.safeParse(input);
  if (!parsed.success) {
    return {
      success: false,
      error: "Invalid input",
    };
  }

  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("dues_periods")
    .insert([parsed.data])
    .select();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data?.[0] };
}
```

#### Kas Kelas — Mark Payment as Paid
```typescript
// app/actions/kas.ts
"use server";

export async function markPaymentAsPaid(
  paymentId: string,
  proofImageUrl?: string,
  notes?: string
) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("dues_payments")
    .update({
      status: "paid",
      paid_at: new Date().toISOString(),
      proof_image_url: proofImageUrl,
      notes,
      updated_at: new Date().toISOString(),
    })
    .eq("id", paymentId)
    .select();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data?.[0] };
}
```

#### Announcements — Publish
```typescript
// app/actions/announcements.ts
"use server";

export async function publishAnnouncement(announcementId: string) {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) {
    return { success: false, error: "Unauthorized" };
  }

  const { data, error } = await supabase
    .from("announcements")
    .update({
      status: "published",
      published_at: new Date().toISOString(),
    })
    .eq("id", announcementId)
    .eq("author_id", user.id)  // Can only publish own announcements
    .select();

  if (error) {
    return { success: false, error: error.message };
  }

  return { success: true, data: data?.[0] };
}
```

#### Photo Upload (Cloudinary)
```typescript
// app/actions/photos.ts
"use server";

import { v2 as cloudinary } from "cloudinary";

export async function uploadPhotoToGallery(
  galleryId: string,
  formData: FormData
) {
  const file = formData.get("file") as File;

  if (!file) {
    return { success: false, error: "No file provided" };
  }

  if (file.size > 5 * 1024 * 1024) {
    return { success: false, error: "File too large (max 5MB)" };
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  return new Promise((resolve) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: "web-kelas",
        resource_type: "auto",
      },
      async (error, result) => {
        if (error) {
          return resolve({
            success: false,
            error: error.message,
          });
        }

        // Insert into database
        const supabase = createClient();
        const { data, error: dbError } = await supabase
          .from("photos")
          .insert([
            {
              gallery_id: galleryId,
              cloudinary_url: result.secure_url,
              cloudinary_id: result.public_id,
            },
          ])
          .select();

        if (dbError) {
          return resolve({
            success: false,
            error: dbError.message,
          });
        }

        resolve({ success: true, data: data?.[0] });
      }
    );

    uploadStream.end(buffer);
  });
}
```

---

### 4.2 API Routes (for file operations, webhooks)

#### Upload Signature (for client-side Cloudinary uploads)
```typescript
// app/api/cloudinary-signature/route.ts
import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    {
      timestamp,
    },
    process.env.CLOUDINARY_API_SECRET!
  );

  return NextResponse.json({
    timestamp,
    signature,
    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  });
}
```

---

## 5. Authentication & Security

### 5.1 Session & Cookie Management
- **Library:** `@supabase/ssr` (handles HttpOnly cookie lifecycle)
- **Cookie name:** `sb-{project_id}-auth-token`
- **Expiry:** Configurable (default 1 hour, refresh token handles renewal)
- **Middleware:** Every request checks cookie before allowing access

### 5.2 CORS & CSP
- **CORS:** Allow Vercel domain only (Supabase auto-configures)
- **CSP:** Restrict script-src to Supabase, Cloudinary domains
- **Headers:** Set in `next.config.js` or middleware

### 5.3 Secrets & Environment Variables
```bash
# .env.local (never commit)
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxxx
SUPABASE_SERVICE_ROLE_KEY=xxxxx  # Server-only

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=xxxxx
NEXT_PUBLIC_CLOUDINARY_API_KEY=xxxxx
CLOUDINARY_API_SECRET=xxxxx  # Server-only
```

### 5.4 Data Validation
- **Client:** Zod schemas (real-time feedback)
- **Server:** Zod re-validation (never trust client)
- **Database:** Constraints (NOT NULL, UNIQUE, CHECK)

---

## 6. Frontend Components & Pages

### 6.1 Folder Structure
```
app/
├── (auth)/
│   ├── login/
│   │   └── page.tsx
│   └── layout.tsx
├── (protected)/
│   ├── middleware.ts           # Route protection
│   ├── dashboard/
│   │   ├── page.tsx            # Role-aware landing
│   │   └── _components/
│   │       ├── AdminDashboard.tsx
│   │       ├── TreasurerDashboard.tsx
│   │       └── StudentDashboard.tsx
│   ├── kas/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── DuesTable.tsx
│   │       ├── PaymentForm.tsx
│   │       ├── DuesHistory.tsx
│   │       └── ProofImageUpload.tsx
│   ├── gallery/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── PhotoGrid.tsx
│   │       ├── PhotoUploadModal.tsx
│   │       └── AlbumFilter.tsx
│   ├── announcements/
│   │   ├── page.tsx
│   │   ├── [id]/
│   │   │   └── page.tsx
│   │   └── _components/
│   │       ├── AnnouncementList.tsx
│   │       ├── AnnouncementForm.tsx
│   │       └── RichTextEditor.tsx
│   ├── schedule/
│   │   ├── page.tsx
│   │   └── _components/
│   │       ├── ScheduleGrid.tsx
│   │       ├── ScheduleEditor.tsx
│   │       └── PeriodSelector.tsx
│   └── settings/
│       └── page.tsx
├── actions/
│   ├── auth.ts
│   ├── kas.ts
│   ├── announcements.ts
│   ├── photos.ts
│   └── schedule.ts
├── api/
│   ├── auth/
│   │   └── callback/
│   │       └── route.ts
│   ├── cloudinary-signature/
│   │   └── route.ts
│   └── webhooks/
│       └── (future)
└── lib/
    ├── supabase/
    │   ├── client.ts
    │   ├── server.ts
    │   └── middleware.ts
    ├── schemas/
    │   ├── kas.ts
    │   ├── announcements.ts
    │   └── schedule.ts
    └── utils/
        ├── cloudinary.ts
        ├── format.ts
        └── errors.ts
```

### 6.2 Key Pages & Components

#### `/dashboard` (Shared Layout with Role-Based Content)
```typescript
// app/(protected)/dashboard/page.tsx
import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "./_components/AdminDashboard";
import TreasurerDashboard from "./_components/TreasurerDashboard";
import StudentDashboard from "./_components/StudentDashboard";

export default async function DashboardPage() {
  const supabase = createClient();
  const { data: user } = await supabase.auth.getUser();

  if (!user) return null;  // Middleware redirects, but fallback

  const { data: profile } = await supabase
    .from("users")
    .select("role")
    .eq("id", user.id)
    .single();

  const role = profile?.role;

  if (role === "admin") return <AdminDashboard />;
  if (role === "bendahara") return <TreasurerDashboard />;
  return <StudentDashboard />;
}
```

#### `/kas` (Kas Kelas Treasury Page)
- **Bendahara view:** Table of all students + payment status, mark-paid buttons, upload proof image
- **Murid view:** Summary of own dues + payment history
- **Admin view:** Full audit trail + archive management

#### `/announcements` (Announcements Feed)
- **List:** Paginated, newest first, published only
- **Create (admin/bendahara):** Form with title + rich-text editor → draft
- **Publish:** Move from draft to published with timestamp

#### `/schedule` (Class Timetable)
- **Grid:** Days (rows) × Periods (columns), scrollable on mobile
- **Edit (admin/bendahara):** Modal form to add/edit cell content
- **View (all):** Read-only, highlight current period (future enhancement)

#### `/gallery` (Photo Gallery)
- **Grid:** 3 columns desktop, 2 mobile, lazy-load pagination
- **Upload (admin/bendahara):** Drag-drop → Cloudinary → insert DB
- **Filter:** By event date or album

---

## 7. System Flow Diagram

### 7.1 High-Level Architecture
```
┌─────────────────────────────────────────────────────────────────┐
│                         FRONTEND LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (React Server Components)           │   │
│  │  • Pages (protected by Middleware)                       │   │
│  │  • Server Components (direct DB access via Supabase)     │   │
│  │  • Server Actions (mutations, form handlers)             │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
         ↓                                           ↓
┌──────────────────────────┐          ┌──────────────────────────┐
│ AUTHENTICATION LAYER     │          │  FILE UPLOAD LAYER       │
│ ┌────────────────────┐   │          │ ┌────────────────────┐   │
│ │ Supabase Auth      │   │          │ │ Cloudinary         │   │
│ │ • SSO (Google)     │   │          │ │ • Image storage    │   │
│ │ • Email/Password   │   │          │ │ • Auto transforms  │   │
│ │ • Session mgmt     │   │          │ │ • Signed URLs      │   │
│ └────────────────────┘   │          │ └────────────────────┘   │
└──────────────────────────┘          └──────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────────────┐
│                    SUPABASE LAYER                                │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Auth (JWT, session management)                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Postgres Database + RLS Policies                        │   │
│  │  ┌────────────────────────────────────────────────────┐  │   │
│  │  │ Tables:                                            │  │   │
│  │  │ • users (+ role, avatar)                           │  │   │
│  │  │ • dues_periods, dues_payments                      │  │   │
│  │  │ • announcements                                    │  │   │
│  │  │ • schedule                                         │  │   │
│  │  │ • photo_galleries, photos                          │  │   │
│  │  │ • audit_log                                        │  │   │
│  │  │                                                    │  │   │
│  │  │ Triggers:                                          │  │   │
│  │  │ • auto_create_profile_on_login                     │  │   │
│  │  │ • audit_trail_on_payment_mutation                  │  │   │
│  │  │                                                    │  │   │
│  │  │ Views:                                             │  │   │
│  │  │ • dues_summary (for quick reporting)               │  │   │
│  │  └────────────────────────────────────────────────────┘  │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
         ↓
┌──────────────────────────────────────────────────────────────────┐
│                    DEPLOYMENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Vercel (Free Tier)                                      │   │
│  │  • Git-based deployment (GitHub)                         │   │
│  │  • Environment variable management                       │   │
│  │  • Edge middleware support                               │   │
│  │  • Serverless Functions for API routes                   │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────────────────────────────────────────┘
```

### 7.2 Data Flow: Student Payment Journey
```
┌──────────────────────────────────────────────────────────────────┐
│ 1. Bendahara opens /kas page (TREASURER VIEW)                    │
│    Server Component fetches dues_summary view                    │
│    Shows table: Student | Period | Amount | Status               │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 2. Bendahara clicks "Mark as Paid" on student's row              │
│    → Modal opens (ProofImageUpload component)                    │
│    → Bendahara optionally uploads proof image to Cloudinary      │
│    → Form submit → Server Action: markPaymentAsPaid()            │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 3. Server validates bendahara role via RLS check                 │
│    → UPDATE dues_payments SET status = 'paid', paid_at = now()   │
│    → Postgres trigger executes: insert into audit_log            │
│    → Returns { success: true, data: updatedPayment }             │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 4. Client receives response, closes modal, re-fetches table      │
│    UI updates: row now shows "Paid" with date                    │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 5. Student logs in, visits /kas (STUDENT VIEW)                   │
│    Server Component queries dues_payments for student            │
│    RLS policy: WHERE student_id = auth.uid()                     │
│    → Sees only their own records                                 │
│    Shows: Period | Amount | Status | Paid Date                  │
└──────────────────────────────────────────────────────────────────┘
```

### 7.3 Middleware & Route Protection Flow
```
Request → /api/something
  ↓
Middleware executes (before route)
  ↓
Read HttpOnly session cookie
  ↓
Try to verify JWT signature
  ├─ Valid? Continue to route
  └─ Invalid/Missing? Redirect to /login
  ↓
Route handler or Server Component executes
Accesses supabase.auth.getUser() (from verified session)
  ↓
Query database (RLS policies applied)
  ↓
Return data (filtered by role)
```

---

## 8. User Journeys

### 8.1 Admin Journey

#### Setup & Management
1. **First Login (SSO)**
   - Visit app → redirect to /login
   - Click "Sign in with Google"
   - Google OAuth flow → /auth/callback
   - Postgres auto-creates user with role = "admin" (from user metadata)
   - Redirect to /dashboard → AdminDashboard component loads

2. **Create Dues Period**
   - Click "New Dues Period"
   - Form: name, amount, start date, end date
   - Submit → Server Action createDuesPeriod()
   - Stored in dues_periods table
   - Page re-renders, new period visible to all roles

3. **Manage Users**
   - Settings → User Management
   - See all users (admin view)
   - Can promote student to bendahara
   - Change role → Server Action updateUserRole()
   - Audit log records change

4. **View Audit Log**
   - Settings → Audit Trail
   - Filter by action, user, date range
   - See all mutations (payments, announcements, schedule changes)
   - Export (future enhancement)

### 8.2 Treasurer (Bendahara) Journey

#### Payment Management
1. **Login & Dashboard**
   - SSO → TreasurerDashboard component
   - Quick stats: total due, total paid, pending count

2. **Review Dues Status**
   - Click "Kas Kelas"
   - Table loads (dues_summary view)
   - Columns: Student | Period | Amount | Status
   - Filter: by period, by status (paid/pending/overdue)
   - Sort: by name or date

3. **Record Payment (No Proof)**
   - Click "Mark as Paid"
   - Confirm dialog
   - Status changes to "paid", timestamp recorded
   - Audit log entry created

4. **Record Payment (With Proof)**
   - Click "Mark as Paid"
   - Modal opens
   - Drag-drop image → Cloudinary signature request
   - Client-side upload to Cloudinary (CORS-safe)
   - Receives secure URL
   - Submit form → Server Action with image URL + notes
   - Audit log: old values (pending) → new values (paid, image URL)

5. **Manage Announcements**
   - Click "Announcements"
   - Create new announcement
   - Write title + content in rich-text editor
   - Save as draft
   - Edit, preview, or publish
   - Published → visible to all students

6. **Edit Schedule**
   - Click "Schedule"
   - View current grid (read-only or editable per role)
   - Click cell to edit → modal opens
   - Input: subject, teacher, room
   - Save → Server Action updateSchedule()
   - Page re-renders with new data

### 8.3 Student (Murid) Journey

#### Viewing & Participation
1. **Login & Dashboard**
   - SSO → StudentDashboard component
   - Quick summary: dues due, announcements (recent)

2. **Check Dues Status**
   - Click "Kas Kelas"
   - Table: Period | Amount | Status | Paid Date
   - Only see own records (RLS enforced)
   - Cannot edit or mark as paid (form not available)

3. **Read Announcements**
   - Click "Announcements"
   - List of published announcements (newest first)
   - Click to read full content
   - Cannot create or edit (role check hides form)

4. **View Schedule**
   - Click "Schedule"
   - Grid: Days × Periods
   - Horizontal scroll on mobile
   - Read-only (no edit buttons)

5. **Browse Photo Gallery**
   - Click "Gallery"
   - Grid layout, lazy load on scroll
   - Click photo to expand/lightbox
   - Cannot upload (no upload button)

---

## 9. Error Handling

### 9.1 Standard Error Shape
All API responses follow:
```typescript
{
  success: boolean,
  data?: T,           // populated if success = true
  error?: string      // user-friendly message if success = false
}
```

### 9.2 Common Errors & Handling

| Scenario | HTTP Status | success | error | Action |
|----------|-------------|---------|-------|--------|
| Invalid input (Zod) | 400 | false | "Invalid input" | Show form error |
| Unauthorized (no auth) | 401 | false | "Unauthorized" | Redirect to /login |
| Forbidden (RLS denial) | 403 | false | "Insufficient permissions" | Show toast + log |
| Cloudinary upload fails | 400 | false | "Upload failed: ..." | Retry prompt |
| Database error | 500 | false | "Server error" | Log, show generic message |

### 9.3 Client-Side Error Boundary (React)
```typescript
// app/(protected)/_components/ErrorBoundary.tsx
export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="p-4 bg-red-100 text-red-700 rounded">
      <h2>Something went wrong</h2>
      <p>{error.message}</p>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### 9.4 Server-Side Logging
```typescript
// lib/utils/logger.ts
export function logError(context: string, error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`[${context}] ${message}`);
  // Future: send to Sentry or external logging service
}
```

---

## 10. Deployment & Free-Tier Constraints

### 10.1 Vercel Deployment Checklist
- [ ] GitHub repo created and connected
- [ ] Environment variables configured in Vercel dashboard
- [ ] Build command: `npm run build`
- [ ] Start command: `npm start`
- [ ] Serverless Functions region: auto (default)
- [ ] Edge Middleware enabled
- [ ] Domain (optional): custom domain or `.vercel.app`

### 10.2 Free-Tier Constraints

| Service | Limit | Mitigation |
|---------|-------|-----------|
| **Vercel** | 100 GB bandwidth/month | Compress images, cache aggressively |
| **Supabase** | 500 MB database, 1 GB bandwidth | Archive old photos, clean audit logs |
| **Cloudinary** | 25 GB storage, 25 GB bandwidth | Optimize images on upload, delete unused |
| **Next.js** | Cold starts, function timeout (10s) | Keep Server Actions lightweight |

### 10.3 Performance Optimization

#### Frontend
- Image optimization: use `next/image` for auto-formats (WebP, avif)
- Code splitting: dynamic imports for large modals
- Lazy loading: `loading="lazy"` for off-screen images
- Compression: Gzip/Brotli via Vercel defaults

#### Backend
- Connection pooling: Supabase includes PgBouncer
- Query optimization: use views (dues_summary) instead of complex JOINs
- Pagination: always limit results
- Caching: ISR (Incremental Static Regeneration) for announcements

#### Database
- Indexes: on foreign keys, search columns (status, role)
- Vacuum: Supabase auto-vacuums
- Archive: old dues periods and photos to avoid bloat

### 10.4 Monitoring & Health Checks

#### Vercel
- Check logs: `vercel logs`
- Monitor build times & cold starts
- Error tracking: integrate Sentry (free tier)

#### Supabase
- Database logs: `psql` or web console
- Query performance: EXPLAIN ANALYZE
- Realtime subscriptions: monitor for bottlenecks

---

## Appendix A: Quick Reference

### Canonical Role Names
- `admin` — Full system access
- `bendahara` — Treasurer; manage kas, announcements, schedule
- `murid` — Student; read-only for most features

### Key Tables & Views
| Name | Purpose |
|------|---------|
| `users` | Profile, role, avatar |
| `dues_periods` | Dues batch definitions |
| `dues_payments` | Individual payment records + proof images |
| `announcements` | Published/draft news |
| `schedule` | Timetable grid |
| `audit_log` | Compliance trail for financial data |
| `dues_summary` | SQL view for quick reporting |

### Environment Variables (Production)
```bash
NEXT_PUBLIC_SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
NEXT_PUBLIC_CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET
```

---

**Document Status:** Complete reference for AI agents and developers.  
**Next Steps:** Detailed component implementation guides, wireframes, and testing strategies.
