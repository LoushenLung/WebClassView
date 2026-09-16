# Implementation Plan: Guest Access Homepage

## Overview

Lima perubahan atomik pada empat file yang membuka halaman beranda untuk tamu, menyediakan public server actions, dan merefaktor `app/page.tsx` agar data fetching dan UI disesuaikan dengan status autentikasi pengguna.

Urutan tugas mengikuti dependency: middleware → actions → data fetching → UI.

---

## Tasks

- [ ] 1. Tambah `pathname === "/"` sebagai public route di middleware
  - [ ] 1.1 Edit `lib/supabase/middleware.ts` — tambah kondisi `pathname === "/"` pada blok `isPublicRoute`
    - Sisipkan `pathname === "/"` di antara `isAuthRoute` dan `pathname.startsWith("/auth/")` pada deklarasi `isPublicRoute`
    - Pastikan tidak ada perubahan lain pada file — satu baris tambahan saja
    - _Requirements: 1.1, 1.2, 1.3, 1.4_
  - [ ]* 1.2 Tulis property test untuk logika `isPublicRoute`
    - **Property 1: Tamu tidak pernah diredirect dari beranda**
    - Ekstrak logika `isPublicRoute` ke helper murni `checkIsPublicRoute(pathname: string): boolean` (atau test langsung via mock)
    - Gunakan `fast-check` — generate string yang dimulai `/` dan bukan salah satu public route, pastikan hasilnya `false`
    - Test eksplisit: `checkIsPublicRoute("/")` === `true`
    - **Validates: Requirements 1.1, 1.3**

- [ ] 2. Tambah `getPublicScheduleSlots()` ke `actions/schedule.actions.ts`
  - [ ] 2.1 Tulis fungsi `getPublicScheduleSlots()` di `actions/schedule.actions.ts`
    - Letakkan di bawah fungsi `getScheduleSlots()` yang sudah ada
    - Query: `prisma.schedule.findMany({ orderBy: [{ dayOfWeek: 'asc' }, { periodOrder: 'asc' }] })` — tanpa `requireAuth()`
    - Bungkus seluruh body dalam `try/catch`; catch block mengembalikan `[]`
    - Return type: `Promise<Schedule[]>`
    - _Requirements: 2.1, 2.2, 2.3, 2.4_
  - [ ]* 2.2 Tulis unit test untuk `getPublicScheduleSlots()`
    - Mock `prisma.schedule.findMany` — test bahwa fungsi memanggil query tanpa auth guard
    - Test error path: mock `findMany` throw → fungsi mengembalikan `[]` (bukan throw)
    - _Requirements: 2.3_

- [ ] 3. Tambah `getPublicAnnouncements()` ke `actions/announcement.actions.ts`
  - [ ] 3.1 Tulis fungsi `getPublicAnnouncements()` di `actions/announcement.actions.ts`
    - Letakkan di bawah fungsi `getAnnouncements()` yang sudah ada
    - Query: `prisma.announcement.findMany({ where: { status: 'published' }, orderBy: { createdAt: 'desc' } })` — tanpa `requireAuth()`
    - Filter `status: 'published'` di-hard-code, tidak menerima parameter apapun
    - Bungkus seluruh body dalam `try/catch`; catch block mengembalikan `[]`
    - Return type: `Promise<Announcement[]>`
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5_
  - [ ]* 3.2 Tulis property test untuk invariant keamanan `getPublicAnnouncements()`
    - **Property 2: Keamanan data draft — invariant tidak boleh dilanggar**
    - Mock `prisma.announcement.findMany` agar mengembalikan campuran draft + published
    - Assert: setiap elemen hasil `getPublicAnnouncements()` memiliki `status === "published"`
    - Test error path: mock `findMany` throw → fungsi mengembalikan `[]`
    - **Validates: Requirements 3.2, 3.5**

- [ ] 4. Checkpoint — pastikan semua test unit/property lulus
  - Pastikan semua test lulus, tanyakan kepada user jika ada pertanyaan sebelum melanjutkan.

- [ ] 5. Refaktor `app/page.tsx` — data fetching kondisional
  - [ ] 5.1 Ganti `Promise.all()` monolitik dengan data fetching kondisional di `app/page.tsx`
    - Hapus `getScheduleSlots` dan ganti dengan `getPublicScheduleSlots` di import
    - Hapus `getAnnouncements` dan ganti dengan `getPublicAnnouncements` di import
    - Pindahkan `getCurrentUser()` ke baris pertama (sebelum fetch lain) dan simpan sebagai `currentUser`
    - Tambah `const isGuest = currentUser === null`
    - Fetch `slots` dan `announcements` secara paralel via `Promise.all([getPublicScheduleSlots(), getPublicAnnouncements()])`
    - `attendanceResult`: hanya di-fetch jika `!isGuest && (currentUser.role === 'admin' || currentUser.role === 'bendahara')`, selain itu `null`
    - `profiles`: hanya di-fetch jika `!isGuest && currentUser.role === 'admin'`, selain itu `[]`
    - Pastikan variabel `attendance` memiliki fallback yang aman saat `attendanceResult` adalah `null`
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6, 4.7, 6.3, 6.4_

- [ ] 6. Refaktor `app/page.tsx` — UI guest mode dengan CTA dan placeholder
  - [ ] 6.1 Update hero section di `app/page.tsx` — tampilkan CTA login untuk tamu
    - Kondisi pada badge hero: jika `isGuest` tampilkan teks `"Selamat Datang di Hub RPL 1"` (teks statis), jika tidak tampilkan `"Halo, ${currentUser.name}!"`
    - Tambah elemen CTA di bawah tombol yang sudah ada, hanya jika `isGuest === true`: link ke `/login` dengan teks "Masuk / Daftar" dan link ke `/signup` dengan teks "Buat Akun"
    - _Requirements: 5.1, 5.2_
  - [ ] 6.2 Update widget Kehadiran Hari Ini di `app/page.tsx` — placeholder untuk non-admin
    - Ganti konten widget dengan kondisional:
      - Jika `attendanceResult === null` (tamu atau murid): render placeholder dengan ikon `Lock`, teks "Login dengan akun admin untuk melihat data kehadiran"
      - Jika `attendanceResult !== null`: render visualisasi lingkaran kehadiran yang sudah ada
    - _Requirements: 5.5, 5.6, 5.7, 5.8_
  - [ ] 6.3 Update widget Anggota Kelas di `app/page.tsx` — placeholder untuk non-admin
    - Ganti konten widget dengan kondisional:
      - Jika `profiles.length === 0` (tamu, murid, atau bendahara): render placeholder dengan ikon `Lock`, teks "Login dengan akun admin untuk melihat anggota kelas"
      - Jika `profiles.length > 0`: render daftar avatar yang sudah ada
    - _Requirements: 5.5, 5.6, 5.7, 5.9_

- [ ] 7. Checkpoint akhir — pastikan semua test lulus dan halaman berfungsi
  - Pastikan semua test lulus, tanyakan kepada user jika ada pertanyaan.

---

## Notes

- Tasks bertanda `*` bersifat opsional dan dapat dilewati untuk MVP yang lebih cepat
- Setiap task merujuk ke requirement spesifik untuk keterlacakan
- Task 1–3 adalah perubahan satu-file yang independen dan dapat dikerjakan paralel
- Task 5 bergantung pada Task 2 dan 3 (import fungsi baru); Task 6 bergantung pada Task 5
- Widget kehadiran dan anggota kelas menggunakan `profiles.length === 0` dan `attendanceResult === null` sebagai sinyal placeholder — konsisten dengan Widget Visibility Matrix di design doc
- `getPublicScheduleSlots()` dan `getPublicAnnouncements()` sengaja tidak memanggil `revalidatePath('/')` — revalidasi sudah terjadi dari action write (upsert/create) yang ada

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "2.1", "3.1"] },
    { "id": 1, "tasks": ["1.2", "2.2", "3.2"] },
    { "id": 2, "tasks": ["5.1"] },
    { "id": 3, "tasks": ["6.1", "6.2", "6.3"] }
  ]
}
```
