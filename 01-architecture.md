# 01 — Architecture Overview

> Dokumen ini menjelaskan tata arsitektur teknis sistem **`class-rpl-1-202627`**, pola data flow, otorisasi dua lapis (RLS + UI), serta interaksi antar layer sistem.

---

## 1. Topologi Arsitektur Sistem

```
┌─────────────────────────────────────────────────────────┐
│            Client Browser (Mobile & Desktop)            │
│   - Next.js App Router Client Components (React 19)     │
└────────────────────────┬────────────────────────────────┘
                         │ HTTPS Requests
┌────────────────────────▼────────────────────────────────┐
│               Next.js App Router (Vercel)               │
│   ┌───────────────────────────────────────────────┐     │
│   │  proxy.ts (Next.js 16 Route Guard)            │     │
│   │  - Refresh cookie session Supabase            │     │
│   │  - Redirect ke /login jika unauthenticated    │     │
│   └───────────────────────┬───────────────────────┘     │
│                           │                             │
│   ┌───────────────────────▼───────────────────────┐     │
│   │  Server Components (Read Path)                │     │
│   │  - Directly await Prisma queries              │     │
│   │  - Pure HTML Server Rendering                 │     │
│   └───────────────────────────────────────────────┘     │
│   ┌───────────────────────────────────────────────┐     │
│   │  Server Actions (Write Path)                  │     │
│   │  - requireAuth() → requireRole()              │     │
│   │  - Zod validation → Prisma mutation           │     │
│   │  - revalidatePath()                           │     │
│   └───────────────────────────────────────────────┘     │
└──────────────┬────────────────────┬─────────────────────┘
               │                    │
┌──────────────▼───────┐  ┌────────▼──────────────────┐
│   Supabase           │  │   Cloudinary             │
│   - PostgreSQL + RLS │  │   - Gallery & Proofs     │
│   - Auth Session     │  │   - Material Files       │
│   - DB Triggers      │  │   - Avatars              │
└──────────────────────┘  └──────────────────────────┘
```

---

## 2. Alur Data & Pola Eksekusi

### 2.1 Read Flow (Tanpa API Route / Tanpa useEffect)
Data awal halaman di-fetch langsung di Server Component menggunakan Prisma:
```
Browser Request → proxy.ts → Server Component (page.tsx)
  → await prisma.model.findMany()
  → Render HTML ke Browser
```

### 2.2 Write Flow (Mutasi Data via Server Actions)
Semua perubahan data (tambah, edit, hapus) wajib melalui Server Action dengan urutan proteksi berikut:
```
Client Form Submit → Server Action Execution:
  1. requireAuth()        -> Cek session pengguna dari Supabase Auth
  2. requireRole(...)     -> Cek role pengguna di public.users (admin/bendahara)
  3. Zod.safeParse(...)   -> Validasi tipe & constraint data input
  4. Prisma Operation     -> Mutasi data di database PostgreSQL
  5. revalidatePath(...)  -> Refresh cache Next.js App Router
  6. Return ActionResult  -> { success: true, data } atau { success: false, error }
```

### 2.3 File Upload Pattern (Atomic Operations)
Upload file ke Cloudinary dilakukan langsung dari Server Action untuk menjaga keamanan credential secret:
```
Client Buffer/File -> Server Action:
  1. Validasi MIME Type & Ukuran File dengan Zod
  2. uploadToCloudinary() -> Upload ke folder Cloudinary terkait
  3. prisma.model.create() -> Simpan URL & Public ID ke database
  * Jika DB insert gagal, log error dan tangani cleanup untuk mencegah orphan asset.
```

---

## 3. Otorisasi Dua Lapis (Defense in Depth)

1. **Lapis 1: Row Level Security (RLS) PostgreSQL & Server Actions Guard**
   - Merupakan sumber kebenaran utama (*Source of Truth*).
   - Setiap Server Action memverifikasi identity via `requireAuth()` dan hak akses via `requireRole()`.
2. **Lapis 2: UI-Level Control (UX Only)**
   - Menyembunyikan tombol/tombol edit/halaman khusus admin dari tampilan siswa biasa.
   - Lapisan ini MURNI untuk UX, bukan pengganti keamanan utama.

---

## 4. Keandalan Database & Singleton Pattern

- **Prisma Singleton (`lib/db.ts`)**: Mencegah kebocoran *connection pool* saat Hot Reload di mode development dan penghematan koneksi di serverless environment Vercel.
- **CLI Connection (`prisma.config.ts`)**: Prisma CLI (migration) menggunakan `DIRECT_URL` (Port 5432) untuk bypass PgBouncer advisory lock limitation.
