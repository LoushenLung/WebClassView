# 01 — Architecture

> Rujuk file ini untuk memahami BAGAIMANA layer-layer sistem saling terhubung, sebelum menulis kode yang melintasi batas layer (FE ↔ Server Action ↔ Database).

## 1. Gambaran Sistem

```
┌─────────────────────────────┐
│   Browser (siswa/admin)     │
│   Next.js Client Components │  ← hanya untuk interaktivitas (form, dsb)
└───────────────┬──────────────┘
                │
┌───────────────▼──────────────┐
│   Next.js App Router (Vercel) │
│   - Server Components (read)  │  → query langsung ke Supabase
│   - Server Actions (write)    │  → validasi Zod → Prisma → Supabase
└───────┬───────────────┬──────┘
        │               │
┌───────▼──────┐  ┌─────▼─────────┐
│   Supabase    │  │   Cloudinary   │
│  Postgres+RLS │  │  (gambar saja) │
│  Auth         │  └────────────────┘
└───────────────┘
```

**Prinsip inti**: baca data lewat Server Component (langsung `await` query di komponen, tidak perlu API layer tambahan). Tulis data lewat Server Action. Tidak ada REST API custom kecuali dibutuhkan konsumen di luar Next.js — sampai ada kebutuhan itu, jangan dibuat.

## 2. Alur Autentikasi & Otorisasi

**Login (client)**:
1. Form login pakai React Hook Form + Zod (validasi email/password di client sebelum submit).
2. Saat submit: tombol disable + tampilkan loading state (cegah klik ganda) — WAJIB, jangan skip.
3. Submit memanggil Server Action yang memanggil `supabase.auth.signInWithPassword()`.

**Session (bukan token manual)**:
4. Session **TIDAK** disimpan manual ke Context/Redux/Zustand. Supabase (`@supabase/ssr`) otomatis menyimpan session ke **HttpOnly cookie** dan mengelola refresh token — AI agent dilarang membangun state management sendiri untuk data user/session.
5. Server Component membaca session langsung dari cookie tiap request lewat Supabase server client — tidak perlu "global state user" terpisah.

**Proteksi Route**:
6. Proteksi halaman pakai **Next.js Middleware** (`middleware.ts`) yang mengecek session sebelum halaman dirender dan redirect ke `/login` kalau tidak ada session. Ini pengganti pola "Private Route component" ala React Router — di App Router, middleware yang berperan di sini, bukan komponen wrapper per halaman.

**Provisioning & Role**:
7. Trigger `on_auth_user_created` otomatis membuat baris di `profiles` dengan role default `STUDENT`.
8. Perubahan role (jadi TREASURER/ADMIN) dilakukan manual oleh admin lewat query langsung di Supabase dashboard (bukan fitur UI — di luar scope v1, lihat non-goals kalau ada permintaan bikin fitur "kelola role user").

**Otorisasi data**:
9. Setiap request yang menyentuh data sensitif (kas, jadwal, pengumuman) melewati dua lapis pengecekan:
   - **RLS di Postgres** — sumber kebenaran, tidak bisa dilewati.
   - **UI-level check** — menyembunyikan aksi yang tidak relevan untuk role tersebut, murni UX, dilakukan di Server Component dengan mengecek `role` dari `profiles` user yang login.

> Catatan untuk AI agent: JANGAN implementasikan pola SPA klasik (token disimpan manual, Context/Redux/Zustand untuk user, komponen Private Route) — itu duplikasi terhadap apa yang Supabase SSR + Next.js Middleware sudah tangani, dan berisiko membuat dua sumber kebenaran soal siapa yang login.

## 3. Pola Data Flow

### Read (tampilkan data)
```
Server Component → Prisma/Supabase client (server-side) → return via props ke child component
```
Tidak perlu `useEffect` + `fetch` untuk data awal halaman. `useEffect` hanya untuk data yang benar-benar butuh refresh di client (jarang di project ini).

### Write (tambah/ubah/hapus data)
```
Client form (React Hook Form) → validasi Zod (client)
  → submit ke Server Action → validasi Zod ulang (server, wajib — jangan skip)
  → Prisma/Supabase mutation → RLS mengecek hak akses
  → trigger audit_log (untuk kas) jalan otomatis
  → revalidatePath() / redirect
```

### Upload Gambar
```
Client (pilih file) → validasi tipe & ukuran di client
  → Server Action → upload ke Cloudinary
  → simpan imageUrl + publicId ke Supabase dalam Server Action yang sama
```
Upload dan simpan-ke-DB harus dalam satu Server Action supaya tidak ada state "gambar ke-upload tapi record gagal tersimpan" tanpa penanganan.

## 4. Struktur Folder (ringkas — detail FE ada di `02-frontend-guide.md`)

```
app/            # routes, Server & Client Components
actions/        # Server Actions, dikelompokkan per domain (kas, galeri, jadwal, pengumuman)
lib/
  supabase/     # client Supabase — pisahkan instance server vs browser
  validations/  # Zod schema per domain, dipakai ulang client+server
  cloudinary.ts
prisma/
  schema.prisma
supabase/
  migrations/
docs/
  master/       # file-file guide ini
```

## 5. Error Handling Standar

- Server Action selalu return bentuk konsisten: `{ success: boolean, data？, error? }` — jangan `throw` mentah ke client, tangkap dan format dulu.
- Error dari Supabase/Prisma di-log di server (`console.error` minimal, idealnya nanti diarahkan ke logging service — di luar scope v1) dan ditampilkan ke user dalam bahasa yang dimengerti user, bukan pesan teknis mentah.

## 6. Deployment & Infra

- **Vercel**: auto-deploy dari branch utama. Environment variable (Supabase URL/key, Cloudinary credential) di-set di Vercel dashboard, tidak pernah di-commit ke repo.
- **Supabase free tier**: project bisa pause otomatis kalau tidak ada aktivitas dalam periode tertentu — kalau mendekati demo/deadline dan project sempat idle lama, cek status project sebelum demo.
- **Migration**: setiap perubahan schema lewat `prisma migrate` + file SQL RLS terpisah (Prisma tidak mengelola RLS) — dua-duanya harus di-commit bersamaan supaya tidak ada schema dan RLS yang tidak sinkron.

## 7. Batas Tanggung Jawab per Layer (biar AI agent tidak salah taruh logic)

| Logic | Taruh di |
|---|---|
| Validasi format input | Zod schema (`lib/validations/`) |
| Aturan bisnis (mis. hitung total kas belum bayar) | Server Action atau SQL view (`dues_summary`) — pilih SQL view kalau agregasi lintas banyak baris, Server Action kalau logic spesifik satu transaksi |
| Otorisasi | RLS (utama) + UI hide (sekunder) |
| Format tampilan (currency, tanggal) | Komponen/util FE (`lib/format.ts`), jangan diformat di server lalu dikirim sebagai string ke client |
