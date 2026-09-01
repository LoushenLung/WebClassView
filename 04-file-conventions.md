# 04 — File Conventions & Architecture Organization

> Dokumen ini mengatur tata laksana penamaan file, struktur direktori, dan pembagian peran kode untuk mencegah duplikasi, keteracakan, serta **file bertumpuk (bloated/overlapping files)** pada project `class-rpl-1-202627`.

---

## 1. Aturan Penamaan File & Folder

### 1.1 Formatting Standards
- **Komponen React / Page / Layout**: `PascalCase.tsx` (contoh: `Sidebar.tsx`, `KasSummaryCard.tsx`, `ForumClient.tsx`)
- **Utility / Action / Validation / Types**: `kebab-case.ts` atau `domain.actions.ts` (contoh: `finance.actions.ts`, `auth.actions.ts`, `kas.ts`)
- **Folder Route App Router**: `kebab-case` atau `(grouping)` (contoh: `app/(dashboard)/kas/page.tsx`, `app/admin/jadwal/page.tsx`)
- **Folder Komponen Lokal Route**: `_components/` (diberi awalan underscore agar tidak dianggap sebagai route oleh Next.js App Router).

---

## 2. Larangan File Bertumpuk (Overlapping & Monolithic Code)

AI Agent **DILARANG KERAS** membuat file raksasa dengan tanggung jawab ganda.

### Prinsip Pemisahan Tugas (Single Responsibility Principle):
1. **File Action Server (`actions/*.actions.ts`)**: HANYA berisi logic mutasi/query database, autentikasi guard, Zod parse, dan `revalidatePath()`. DILARANG menyertakan JSX / UI logic di dalamnya.
2. **File Validation (`lib/validations/*.ts`)**: HANYA berisi Zod schema dan inferensi tipe TypeScript `z.infer`. DILARANG memasukkan database query atau Cloudinary upload di sini.
3. **File Page Server Component (`app/.../page.tsx`)**: HANYA bertugas melakukan `await` query data dari Server Action/Prisma, lalu mengoper props ke Client Component/UI Component. DILARANG membuat form handler atau state kompleks di `page.tsx`.
4. **File Client Component (`_components/*Client.tsx`)**: HANYA bertugas menangani UI state (`useState`), event handler, dan render JSX.
5. **Dilarang Menulis Komponen Dalam Render Loop**:
   - ❌ **SALAH**:
     ```tsx
     export default function Page() {
       const SubCard = () => <div>...</div>; // RE-RENDER BUG!
       return <SubCard />;
     }
     ```
   - ✅ **BENAR**: Extract `SubCard` ke file terpisah di folder `_components/` atau taruh di luar komponen utama pada file terpisah.

---

## 3. Struktur Direktori Terstruktur

```
class-rpl-1-202627/
├── 00-project-constitution.md
├── 01-architecture.md
├── 02-frontend-guide.md
├── 03-design-system.md
├── 04-file-conventions.md
├── CODING_STANDARDS.md
├── actions/                   # Server Actions per domain
│   ├── announcement.actions.ts
│   ├── attendance.actions.ts
│   ├── auth.actions.ts
│   ├── finance.actions.ts
│   ├── forum.actions.ts
│   ├── gallery.actions.ts
│   ├── material.actions.ts
│   ├── profile.actions.ts
│   └── schedule.actions.ts
├── app/                       # Next.js App Router Routes
│   ├── (auth)/                # Route Group Auth (Login)
│   ├── admin/                 # Route khusus Admin Management
│   │   ├── dashboard/
│   │   ├── forum/_components/
│   │   ├── kas/_components/
│   │   └── ...
│   ├── galeri/
│   │   ├── page.tsx           # Server Component Page
│   │   └── _components/       # UI Komponen khusus Galeri
│   ├── kas/
│   ├── ...
│   ├── layout.tsx             # Root Layout
│   └── error.tsx              # Error Boundary
├── components/                # Komponen Reusable Global
│   ├── ui/                    # Base UI Primitives (Button, Modal, Badge)
│   └── shared/                # Sidebar, Navbar, EmptyState, Header
├── lib/                       # Utility & Config Modules
│   ├── actions/               # Auth Guards (requireAuth, requireRole)
│   ├── supabase/              # Supabase Client (server.ts, client.ts, middleware.ts)
│   ├── validations/           # Zod Schemas per domain
│   ├── cloudinary.ts          # Cloudinary Server Helper
│   ├── db.ts                  # Prisma Singleton
│   ├── env.ts                 # Environment Variable Guard
│   ├── types.ts               # Shared Centralized Types
│   └── utils.ts               # Shared Utilities (formatError, formatCurrency)
├── prisma/
│   ├── schema.prisma          # Database Schema
│   └── migrations/
└── proxy.ts                   # Next.js 16 Route Guard Entry Point
```

---

## 4. Etika Kode & Kebersihan Repositori

1. **Clean Code & No Dead Code**: Hapus `console.log`, file `.bak`, atau file percobaan sementara sebelum menandai task selesai.
2. **Tidak Boleh Menggandakan Fungsi Utility**: Gunakan utility yang sudah ada di `lib/utils.ts` (`formatCurrency`, `formatDate`, `formatError`). DILARANG membuat fungsi format tanggal/uang lokal baru di dalam komponen.
3. **Explicit Imports**: Selalu gunakan path alias `@/...` (contoh: `@/lib/db`, `@/actions/finance.actions.ts`), bukan relative path yang panjang (`../../lib/db`).
