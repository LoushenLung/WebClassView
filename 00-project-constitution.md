# 00 — Project Constitution
> **AI AGENT WAJIB MEMBACA FILE INI PERTAMA** sebelum menyentuh satu baris kode pun.
> Urutan baca wajib: `00` → `01` → `02` → `03` → `04` → `CODING_STANDARDS`.
> Jika ada konflik antara instruksi task dan dokumen ini, dokumen ini yang menang — tanya manusia sebelum menyimpang.

---

## 1. Jiwa & Identitas Project

### 1.1 Nama & Konteks
- **Nama project**: `class-rpl-1-202627`
- **Kelas**: RPL 1, tahun ajaran 2026/2027
- **Tim**: 2–4 siswa developer

### 1.2 Tujuan Sejati (BUKAN sekadar aplikasi manajemen)

> Web ini **bukan** sistem ERP mini. Web ini adalah **rumah digital kelas RPL 1**.

Tujuan utama, diurutkan dari yang paling penting:

1. **Mengabadikan kenangan kebersamaan** — galeri foto kegiatan, momen, dan perjalanan bersama kelas
2. **Transparansi kas kelas** — semua warga kelas bisa melihat kondisi keuangan secara jelas dan jujur
3. **Koordinasi akademik harian** — jadwal pelajaran dan pengumuman yang mudah diakses dari HP
4. **Ruang diskusi bersama** — forum sebagai tempat bertanya, berbagi, dan belajar bareng
5. **Rekam jejak kehadiran** — presensi digital sebagai bukti kebersamaan yang terdokumentasi

### 1.3 Persona Pengguna

| Role | Siapa | Motivasi |
|------|-------|----------|
| `murid` | Seluruh siswa kelas | "Saya ingin tahu jadwal hari ini, lihat foto kegiatan kemarin, dan cek apakah kas saya sudah lunas." |
| `bendahara` | Ketua / Sekretaris keuangan | "Saya perlu mencatat pembayaran dengan mudah dan transparan tanpa repot." |
| `admin` | Wali kelas / Ketua kelas | "Saya ingin mengelola semua konten kelas dari satu tempat." |

---

## 2. Tech Stack (FINAL — tidak untuk didiskusikan ulang AI agent)

| Layer | Teknologi | Versi | Catatan |
|-------|-----------|-------|---------|
| Framework | Next.js App Router | 16.3.0 | `middleware` → `proxy.ts` (Next.js 16 convention) |
| Styling | Tailwind CSS | v4 | Vanilla Tailwind, bukan shadcn/ui (tidak diinstall) |
| Database | Supabase PostgreSQL | hosted | RLS adalah sumber kebenaran otorisasi |
| ORM | Prisma | 7.9.x | `prisma.config.ts` untuk koneksi (bukan di schema) |
| Storage | Cloudinary | 2.x | Gambar & dokumen. Supabase Storage tidak dipakai |
| Auth | Supabase Auth + `@supabase/ssr` | 0.12.x | HttpOnly cookie, TIDAK ada token manual |
| Validasi | Zod | 4.x | Dijalankan di client DAN server (dual validation) |
| Ikon | lucide-react | 1.x | Satu-satunya ikon library. Jangan install yang lain |
| Runtime | Node.js (bukan Edge) | — | `proxy.ts` menggunakan Node.js runtime |
| Deploy | Vercel + Supabase | free tier | Semua di free tier, tanpa biaya |

**Larangan keras untuk AI agent:**
- ❌ JANGAN install library UI baru (shadcn, radix, headlessui, dll) tanpa izin eksplisit
- ❌ JANGAN ganti Prisma dengan Drizzle atau ORM lain
- ❌ JANGAN tambahkan state manager (Zustand, Redux, Jotai) — session dikelola Supabase
- ❌ JANGAN buat API Route (`/api/*`) untuk data yang bisa diambil via Server Component

---

## 3. Cakupan Fitur

### ✅ Must Have (v1 — harus selesai sebelum demo)

| # | Fitur | Modul | Status |
|---|-------|-------|--------|
| 1 | Auth (login email + Google, logout, session) | `auth` | Selesai |
| 2 | Galeri foto — album per event, upload, hapus | `galeri` | Selesai |
| 3 | Jadwal kelas — grid senin-jumat, CRUD admin | `jadwal` | Selesai |
| 4 | Kas — **iuran per siswa per periode** (DuesPeriod + DuesPayment) | `kas` | Selesai |
| 5 | Kas — **transaksi umum** (income/expense kelas, non-iuran) | `kas` | ⚠️ Belum ada model `CashTransaction` |
| 6 | Pengumuman — CRUD, draft/publish | `pengumuman` | Selesai |
| 7 | Presensi — rekam kehadiran harian | `presensi` | Selesai |
| 8 | Materi pelajaran — upload **semua format** (PDF, PPT, DOCX, gambar) | `materi` | ⚠️ MIME type harus diperluas |
| 9 | Forum diskusi — post, komentar, tandai jawaban | `forum` | Selesai |
| 10 | Profil pengguna — update nama & avatar | `profil` | Selesai |
| 11 | Audit trail otomatis untuk kas | DB trigger | Selesai (by design) |

### 🔄 Should Have (kerjakan kalau ada waktu)
- Badge "belum bayar kas" di halaman utama
- Search/filter di galeri dan pengumuman

### ⏳ Could Have (tidak prioritas v1)
- Export kas ke PDF
- Grafik statistik kas
- Notifikasi push

### 🚫 Won't Have (AI agent DILARANG membangun ini tanpa instruksi eksplisit)
- Multi-kelas atau multi-organisasi
- Payment gateway otomatis
- Native mobile app
- Multi-bahasa
- Approval berlapis transaksi kas

---

## 4. Prinsip Non-Negosiabel

1. **Zero `any`** — TypeScript strict. Gunakan `unknown` + Zod narrowing jika tipe belum jelas.
2. **RLS adalah gerbang utama** — authorisasi data ada di Postgres RLS, bukan di client/UI.
3. **Dual validation Zod** — setiap input divalidasi di client DAN di server action.
4. **Server Actions untuk semua mutasi** — tidak ada `fetch('/api/...')` untuk data internal.
5. **Mobile-first 360px** — desain dan test dari lebar terkecil dulu.
6. **Atomic operations** — upload Cloudinary + insert DB dalam satu server action. Jika DB gagal, jangan biarkan asset Cloudinary orphan.
7. **authorId selalu dari session** — tidak pernah dari user input.
8. **Satu file = satu tanggung jawab** — lihat `04-file-conventions.md` untuk aturan lengkap.
9. **Definition of Done**: lint pass + type-check pass + tested di 360px mobile.

---

## 5. Tema Visual

> **Tema: Cosmic / Deep Space** — Web ini adalah galaksi kecil milik RPL 1.

Setiap halaman harus terasa seperti menjelajah ruang angkasa — gelap, dalam, tapi penuh bintang dan warna. Panduan lengkap ada di `03-design-system.md`.

Warna dasar yang sudah ditetapkan dan **tidak boleh diubah**:
- Background: `#0B0B1A` (deep space black)
- Aksen utama: Indigo → Purple → Cyan (nebula gradient)
- Surface card: glassmorphism (`bg-white/5 backdrop-blur-md border-white/10`)

---

## 6. Constraint Infrastruktur

- Semua layanan di **free tier** — tidak ada yang berbayar
- Supabase free tier bisa **pause setelah 1 minggu idle** — setup keep-alive cron sebelum mendekati demo
- Cloudinary free: 1GB storage, 25 kredit transformasi/bulan — compress gambar sebelum upload
- Vercel: 100GB bandwidth/bulan — cukup untuk skala satu kelas

---

## 7. Kalau AI Agent Ragu

> BERHENTI. TANYA MANUSIA. JANGAN MENEBAK.

Khususnya jika:
- Instruksi task bertentangan dengan dokumen ini
- Ada keputusan yang memengaruhi schema database
- Ada library baru yang ingin ditambahkan
- Ada perubahan yang bisa merusak data yang sudah ada
