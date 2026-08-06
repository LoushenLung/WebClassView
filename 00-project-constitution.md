# 00 — Project Constitution

> Ini adalah dokumen fondasi. AI agent (Kiro / ANTYGRAVITY / Cursor / Devin) WAJIB membaca file ini sebelum membaca file master lain atau mengeksekusi task apa pun. Kalau ada instruksi task yang bertentangan dengan dokumen ini, dokumen ini yang menang — tanya ke manusia dulu sebelum menyimpang.

## 1. Identitas Project

- **Nama**: `class-rpl-1-202627`
- **Deskripsi**: Web aplikasi internal untuk satu kelas — mengelola kas/iuran siswa, galeri foto kegiatan, pengumuman kelas, dan jadwal pelajaran.
- **Skala**: Digunakan oleh satu kelas saja. Tidak dirancang untuk multi-kelas atau multi-organisasi — jangan tambahkan abstraksi untuk itu.
- **Tim**: 2-4 orang.
- **Timeline**: 2-3 minggu. Prioritaskan fitur yang jalan dan benar di atas fitur yang "lengkap tapi belum tentu selesai".

## 2. Tech Stack Final (tidak untuk didiskusikan ulang oleh AI agent)

| Layer | Pilihan | Alasan |
|---|---|---|
| Frontend | Next.js (App Router) | Server Components mengurangi JS di client, cocok untuk device siswa yang bervariasi |
| UI | shadcn/ui + Tailwind CSS | Konsisten, cepat dikembangkan tim kecil |
| Database | Supabase (PostgreSQL) | Free tier, RLS bawaan, Auth terintegrasi |
| ORM | Prisma | Type-safe query, migration terstruktur |
| Storage gambar | Cloudinary | Free tier, image transformation bawaan (Supabase Storage tidak dipakai untuk gambar) |
| Auth | Supabase Auth | Terintegrasi langsung dengan RLS lewat `auth.uid()` |
| Deployment | Vercel (frontend) + Supabase (backend/DB) | Free tier, cocok untuk skala satu kelas |
| Validasi | Zod | Dipakai ganda: client (React Hook Form) dan server (Server Action) |

**Aturan**: AI agent tidak boleh mengusulkan/mengganti pustaka di luar tabel ini tanpa persetujuan eksplisit dari manusia — termasuk godaan untuk "upgrade" ke solusi yang dianggap lebih canggih.

## 3. Cakupan Fitur

### Must Have (v1)
1. Autentikasi & role (STUDENT / TREASURER / ADMIN)
2. Kas — transaksi umum (income/expense) + iuran per siswa per periode, dengan ringkasan total dibayar/belum dibayar
3. Galeri foto — upload & lihat
4. Pengumuman — CRUD oleh admin, dibaca semua role
5. Jadwal kelas — CRUD oleh admin, dibaca semua role
6. Audit trail otomatis pada perubahan data kas

### Should Have (kerjakan kalau waktu masih cukup)
- Indikator/badge "belum bayar kas" di halaman utama
- Search/filter sederhana di galeri & pengumuman

### Could Have (eksplisit di luar prioritas 2-3 minggu — jangan dikerjakan lebih dulu dari Must/Should)
- Export ringkasan kas ke gambar/PDF
- Grafik/statistik kas
- Dark mode

### Won't Have (non-goals — AI agent DILARANG membangun ini tanpa instruksi eksplisit)
- Dukungan multi-kelas/multi-organisasi
- Payment gateway otomatis (kas tetap dicatat manual oleh bendahara)
- Native mobile app
- Approval berlapis untuk transaksi kas (cukup satu langkah verifikasi TREASURER/ADMIN)
- Multi-bahasa

## 4. Prinsip Non-Negosiabel

1. **Tidak ada `any`** di TypeScript. Kalau tipe belum jelas, `unknown` + narrowing, bukan `any`.
2. **RLS adalah sumber kebenaran otorisasi**, bukan pengecekan di client. UI menyembunyikan tombol/aksi untuk role yang tidak berhak sebagai *lapisan kedua* (UX), bukan pengganti RLS.
3. **Semua input divalidasi dengan Zod** sebelum masuk ke database — baik di client maupun ulang di server (jangan percaya validasi client saja).
4. **Server Actions untuk semua mutasi data**, bukan API Route custom, kecuali memang dibutuhkan endpoint publik di luar Next.js.
5. **Mobile-first**: setiap komponen UI dikembangkan dan diuji dari lebar 360px dulu.
6. **Audit trail wajib** untuk tabel `cash_transactions` dan `dues_payments` — jangan hapus/skip trigger audit demi "menyederhanakan" migration.
7. **Tidak menambah dependency baru** di luar yang ada di §2 tanpa alasan tertulis dan izin.
8. **Setiap task dianggap selesai hanya jika**: lint pass, type-check pass, sesuai guide terkait (FE/BE/coding standards), dan diuji manual minimal sekali di lebar mobile.

## 5. Constraint Infra (Free Tier)

- Semua layanan (Vercel, Supabase, Cloudinary) di free tier — perhatikan limit (Supabase project bisa pause karena inactivity; siapkan strategi keep-alive/cron kalau perlu, terutama menjelang demo/deadline).
- Tidak boleh menambah layanan berbayar tanpa persetujuan.

## 6. Kalau Ragu

Kalau instruksi task tidak jelas atau tampak bertentangan dengan dokumen ini, AI agent WAJIB berhenti dan bertanya ke manusia — bukan menebak dan melanjutkan.
