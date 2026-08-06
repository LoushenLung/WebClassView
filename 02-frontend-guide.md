# 02 — Frontend Guide

> Wajib dibaca AI agent (Kiro / ANTYGRAVITY / Cursor / Devin) sebelum mengerjakan task apa pun di folder `app/`, `components/`, atau `lib/` sisi client.

## 1. Stack

- **Framework**: Next.js (App Router) — Server Components sebagai default, Client Component (`"use client"`) hanya untuk yang butuh interaktivitas (form, state lokal, event handler).
- **UI**: shadcn/ui + Tailwind CSS. Jangan install component library lain tanpa alasan kuat — konsistensi visual lebih penting daripada "component paling bagus".
- **Form & Validasi**: React Hook Form + Zod. Ini pasangan standar shadcn/ui (`<Form />` shadcn dibangun di atas RHF), dan Zod schema-nya bisa dipakai ulang di server action untuk validasi ganda (client + server). Kalau ke depan preferensi berubah, update baris ini.
- **Ikon**: lucide-react (satu paket ikon saja, jangan campur).
- **Fetching data**: default lewat Server Component (`await` langsung di komponen), mutasi lewat **Server Actions** — bukan lewat `fetch` ke API route kecuali memang butuh dipanggil dari luar Next.js.

## 2. Prioritas Tampilan: Mobile-First

Siswa mengakses dari HP. Aturan wajib:
- Desain & kembangkan dari breakpoint terkecil dulu (`base` Tailwind), baru tambah `sm:` `md:` `lg:` untuk desktop — bukan sebaliknya.
- Target lebar minimum 360px tanpa horizontal scroll.
- Elemen interaktif (tombol, input) minimal tinggi 44px agar nyaman disentuh.
- Tabel (kas, jadwal) WAJIB punya strategi mobile eksplisit — lihat §5, jangan biarkan tabel overflow begitu saja.

## 3. Struktur Folder

```
app/
  (auth)/                  # halaman login/register, layout terpisah
  (dashboard)/
    kas/
      page.tsx             # Server Component: list + summary
      _components/         # komponen khusus halaman ini, tidak dipakai di tempat lain
    galeri/
    jadwal/
    pengumuman/
  actions/                 # Server Actions, dikelompokkan per domain
    kas.actions.ts
    galeri.actions.ts
    jadwal.actions.ts
components/
  ui/                      # hasil generate shadcn, JANGAN edit manual isinya
  shared/                  # komponen reusable lintas halaman (EmptyState, StatusBadge, dll)
lib/
  validations/             # Zod schema, satu file per domain
  supabase/                # client Supabase (server & browser, terpisah)
  cloudinary.ts
```

**Aturan**: komponen yang dipakai di >1 halaman → `components/shared/`. Komponen sekali pakai → folder `_components/` di dalam route-nya sendiri. Jangan taruh semua komponen di satu folder `components/` datar — itu yang bikin AI agent bingung menentukan lokasi saat generate file baru.

## 4. Konvensi Komponen

- Nama file komponen: `PascalCase.tsx` (`KasSummaryCard.tsx`), nama file non-komponen: `kebab-case.ts` (`kas.actions.ts`).
- Satu komponen = satu tanggung jawab. Kalau sebuah komponen mulai handle fetch data + form + tabel sekaligus, pecah.
- Server Component secara default. Tambahkan `"use client"` hanya di komponen daun (leaf) yang benar-benar butuh — jangan taruh `"use client"` di level halaman kalau cuma satu tombol kecil yang butuh interaktivitas.
- Props wajib diberi tipe eksplisit (interface/type), tidak boleh `any`.

## 5. Pola per Fitur

### 5.1 Upload Foto (Galeri)
- Upload ke Cloudinary dari **Server Action** (bukan langsung dari client) supaya API secret tidak pernah terekspos ke browser.
- Validasi di client sebelum upload: tipe file (jpg/png/webp) dan ukuran maksimum — tentukan batas (mis. 5MB) dan tampilkan pesan error yang jelas, bukan generic "upload failed".
- Tampilkan progress/loading state saat upload — jangan biarkan UI diam tanpa feedback.
- Setelah sukses, simpan `imageUrl` + `cloudinaryPublicId` ke `gallery_posts` dalam satu Server Action (bukan dua request terpisah yang bisa gagal di tengah).

### 5.2 Kas
Butuh dua tampilan berbeda, jangan digabung jadi satu tabel besar:
- **Ringkasan** (card di atas): total kas terkumpul dari siswa, total belum terbayar, dan total dari sumber lain (`cash_transactions` type INCOME non-iuran) — ambil dari view `dues_summary` + agregasi `cash_transactions`.
- **Tabel status per siswa**: nama siswa, status (badge PAID/UNPAID), jumlah dibayar, tanggal bayar, aksi edit (khusus role TREASURER/ADMIN — sembunyikan tombol edit untuk STUDENT di level komponen, bukan cuma diandalkan RLS).
- Di mobile, tabel status siswa diubah jadi list card per siswa (bukan tabel horizontal-scroll) — HP kecil sulit baca tabel banyak kolom.

### 5.3 Jadwal Kelas
> **Menunggu referensi visual dari kamu** — kamu sempat menyebut ada gambar acuan tapi belum ter-upload. Tolong kirim ulang, supaya struktur tabel (kolom apa saja, apakah per-hari atau per-minggu, dst) sesuai yang kamu maksud. Sementara ini saya asumsikan: kolom Hari, Mata Pelajaran, Jam Mulai, Jam Selesai, Guru, Ruangan — CRUD penuh untuk ADMIN, read-only untuk STUDENT.

## 6. Definition of Done — FE Task

Sebuah task FE dianggap selesai kalau:
1. `pnpm lint` dan `pnpm build` (type-check) lolos tanpa error.
2. Tampilan dicek di lebar 360px (mobile) dan tidak overflow.
3. State loading & empty state ada (bukan cuma state "sukses").
4. Tidak ada `any`, tidak ada console.log tertinggal.
5. Aksi yang butuh role tertentu (edit kas, kelola jadwal) disembunyikan di UI untuk role yang tidak berhak — sebagai lapisan kedua di atas RLS, bukan pengganti RLS.
