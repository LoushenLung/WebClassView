# Requirements Document

## Introduction

Fitur **Guest Access Homepage** mengizinkan pengguna yang belum melakukan autentikasi (tamu/guest) untuk mengakses halaman beranda (`/`) tanpa diredirect ke halaman login. Sistem menerapkan pola _graceful degradation_: tamu dapat melihat konten publik seperti pengumuman terpublikasi dan jadwal hari ini, sementara data yang memerlukan identitas (statistik kehadiran detail, daftar anggota kelas) hanya ditampilkan kepada pengguna dengan role yang sesuai. Keamanan tetap terjaga — draft pengumuman tidak pernah bocor ke tamu, dan semua rute lain yang dilindungi tetap tidak berubah perilakunya.

---

## Glossary

- **Middleware**: Lapisan `lib/supabase/middleware.ts` yang memproses setiap request sebelum mencapai halaman Next.js, bertanggung jawab atas pengecekan sesi dan redirect ke `/login`.
- **Public Route**: Rute yang dapat diakses tanpa sesi aktif — saat ini: `/login`, `/signup`, `/auth/**`, `/api/auth/**`, `/api/ping`. Setelah fitur ini: ditambah `/`.
- **Guest / Tamu**: Pengguna yang mengakses aplikasi tanpa sesi autentikasi aktif; `getCurrentUser()` mengembalikan `null`.
- **getCurrentUser**: Server action yang mengambil data pengguna saat ini dari session Supabase; mengembalikan `null` jika tidak ada session.
- **getPublicScheduleSlots**: Server action yang mengambil semua slot jadwal tanpa memerlukan autentikasi.
- **getPublicAnnouncements**: Server action yang mengambil pengumuman berstatus `published` tanpa memerlukan autentikasi.
- **getAttendanceStats**: Server action yang mengambil statistik kehadiran; hanya boleh dipanggil untuk pengguna dengan role `admin` atau `bendahara`.
- **getProfiles**: Server action yang mengambil daftar profil anggota kelas; hanya boleh dipanggil untuk pengguna dengan role `admin`.
- **Homepage / Beranda**: Halaman di route `/` (`app/page.tsx`) yang merupakan halaman utama aplikasi.
- **Hero Section**: Bagian atas halaman beranda yang menampilkan sapaan atau Call-to-Action (CTA).
- **CTA Login**: Elemen UI "Masuk / Daftar" yang ditampilkan kepada tamu di hero section.
- **Widget**: Komponen kartu di halaman beranda yang menampilkan data tertentu (kehadiran, jadwal, pengumuman, dll).
- **Placeholder**: Elemen UI yang menampilkan pesan terkunci ("🔒 Login untuk melihat data") sebagai pengganti widget data nyata untuk pengguna yang tidak berwenang.
- **Draft**: Pengumuman dengan status selain `published`; tidak boleh pernah ditampilkan kepada tamu.
- **isGuest**: Kondisi boolean `currentUser === null` yang digunakan homepage untuk menentukan mode render.

---

## Requirements

### Requirement 1: Middleware Mengizinkan Akses Tamu ke Beranda

**User Story:** Sebagai tamu, saya ingin dapat membuka halaman beranda tanpa diredirect ke halaman login, agar saya dapat melihat informasi publik kelas.

#### Acceptance Criteria

1. WHEN sebuah request masuk dengan `pathname === "/"`, THE Middleware SHALL memproses request tersebut dengan `NextResponse.next()` tanpa menghasilkan redirect ke `/login`, terlepas dari ada atau tidaknya session cookie.
2. WHEN sebuah request masuk dengan `pathname === "/"` dan session cookie yang valid ada, THE Middleware SHALL me-refresh session cookie dan melanjutkan request tanpa redirect.
3. WHILE `pathname` bukan salah satu dari `"/"`, `"/login"`, `"/signup"`, rute yang dimulai dengan `"/auth/"`, rute yang dimulai dengan `"/api/auth/"`, atau `"/api/ping"`, THE Middleware SHALL tetap meredirect request tanpa session aktif ke `/login`.
4. THE Middleware SHALL hanya menambahkan `pathname === "/"` sebagai public route tanpa mengubah logika proteksi rute lainnya.

---

### Requirement 2: Public Schedule Action Tanpa Autentikasi

**User Story:** Sebagai tamu, saya ingin melihat jadwal kelas hari ini di halaman beranda, agar saya mengetahui aktivitas kelas tanpa perlu login.

#### Acceptance Criteria

1. THE `getPublicScheduleSlots` SHALL dapat dipanggil tanpa sesi autentikasi aktif dan mengembalikan array `Schedule[]`.
2. WHEN `getPublicScheduleSlots` berhasil mengambil data, THE `getPublicScheduleSlots` SHALL mengembalikan semua slot jadwal yang tersedia sebagai array.
3. IF terjadi kegagalan koneksi database saat `getPublicScheduleSlots` dipanggil, THEN THE `getPublicScheduleSlots` SHALL mengembalikan array kosong (`[]`) tanpa melempar exception.
4. THE `getPublicScheduleSlots` SHALL bersifat read-only dan tidak menghasilkan efek samping pada data di database.

---

### Requirement 3: Public Announcements Action dengan Invariant Keamanan

**User Story:** Sebagai tamu, saya ingin melihat pengumuman terbaru yang telah dipublikasikan, agar saya tetap mendapatkan informasi kelas yang relevan tanpa perlu login.

#### Acceptance Criteria

1. THE `getPublicAnnouncements` SHALL dapat dipanggil tanpa sesi autentikasi aktif dan mengembalikan array `Announcement[]`.
2. WHEN `getPublicAnnouncements` mengembalikan data, THE `getPublicAnnouncements` SHALL memastikan setiap elemen dalam array memiliki `status === "published"`.
3. THE `getPublicAnnouncements` SHALL mengurutkan hasil berdasarkan `createdAt` secara descending (terbaru lebih dulu).
4. IF terjadi kegagalan koneksi database saat `getPublicAnnouncements` dipanggil, THEN THE `getPublicAnnouncements` SHALL mengembalikan array kosong (`[]`) tanpa melempar exception.
5. THE `getPublicAnnouncements` SHALL menggunakan filter `status: "published"` yang di-hard-code dan tidak menerima parameter apapun yang dapat mengubah filter tersebut.

---

### Requirement 4: Data Fetching Kondisional di Homepage

**User Story:** Sebagai developer, saya ingin homepage hanya memanggil server actions yang sesuai dengan status autentikasi pengguna, agar tidak ada data auth-only yang diambil untuk tamu.

#### Acceptance Criteria

1. WHEN `getCurrentUser()` mengembalikan `null` (kondisi tamu), THE Homepage SHALL memanggil `getPublicScheduleSlots()` dan `getPublicAnnouncements()` secara paralel menggunakan `Promise.all()`.
2. WHEN `getCurrentUser()` mengembalikan `null`, THE Homepage SHALL tidak memanggil `getAttendanceStats()`.
3. WHEN `getCurrentUser()` mengembalikan `null`, THE Homepage SHALL tidak memanggil `getProfiles()`.
4. WHEN `getCurrentUser()` mengembalikan pengguna dengan role `admin` atau `bendahara`, THE Homepage SHALL memanggil `getAttendanceStats()` untuk mengambil data kehadiran.
5. WHEN `getCurrentUser()` mengembalikan pengguna dengan role `admin`, THE Homepage SHALL memanggil `getProfiles()` untuk mengambil daftar anggota kelas.
6. WHEN `getCurrentUser()` mengembalikan pengguna dengan role selain `admin` dan `bendahara`, THE Homepage SHALL tidak memanggil `getAttendanceStats()`.
7. WHEN `getCurrentUser()` mengembalikan pengguna dengan role selain `admin`, THE Homepage SHALL tidak memanggil `getProfiles()` dan menggunakan array kosong sebagai nilai default.
8. IF `getCurrentUser()` melempar exception atau auth service tidak merespons, THEN THE `getCurrentUser` SHALL mengembalikan `null` sehingga Homepage secara otomatis masuk ke mode guest.

---

### Requirement 5: Tampilan UI Berdasarkan Status Autentikasi (Widget Visibility)

**User Story:** Sebagai tamu, saya ingin melihat tampilan beranda yang informatif dengan CTA untuk masuk, agar saya memahami konten apa yang tersedia setelah login.

#### Acceptance Criteria

1. WHEN `isGuest === true`, THE Homepage SHALL menampilkan elemen CTA "Masuk / Daftar" di hero section sebagai pengganti sapaan pengguna.
2. WHEN `isGuest === false`, THE Homepage SHALL menampilkan sapaan yang mengandung nama pengguna saat ini di hero section.
3. THE Homepage SHALL menampilkan widget Countdown, widget Jadwal Hari Ini, dan widget Akses Cepat kepada semua pengguna terlepas dari status autentikasi.
4. WHEN `isGuest === true`, THE Homepage SHALL menampilkan pengumuman yang dikembalikan oleh `getPublicAnnouncements()` di widget Pengumuman Terbaru.
5. WHEN `isGuest === true`, THE Homepage SHALL menampilkan Placeholder di widget Kehadiran Hari Ini dengan pesan yang menginformasikan bahwa login diperlukan.
6. WHEN `isGuest === true`, THE Homepage SHALL menampilkan Placeholder di widget Anggota Kelas dengan pesan yang menginformasikan bahwa login diperlukan.
7. WHEN pengguna login dengan role `murid`, THE Homepage SHALL menampilkan Placeholder di widget Kehadiran Hari Ini dan widget Anggota Kelas (konsisten dengan logika `requireRole` yang sudah ada).
8. WHEN pengguna login dengan role `admin` atau `bendahara`, THE Homepage SHALL menampilkan data kehadiran real di widget Kehadiran Hari Ini.
9. WHEN pengguna login dengan role `admin`, THE Homepage SHALL menampilkan daftar anggota kelas di widget Anggota Kelas.

---

### Requirement 6: Penanganan Error dan Stabilitas Halaman

**User Story:** Sebagai tamu, saya ingin halaman beranda tetap dapat diakses meskipun ada gangguan pada layanan database, agar pengalaman saya tidak terganggu oleh error teknis.

#### Acceptance Criteria

1. IF `getPublicScheduleSlots()` mengalami kegagalan database, THEN THE Homepage SHALL tetap me-render halaman beranda dengan widget Jadwal menampilkan empty state yang informatif (bukan halaman error 500).
2. IF `getPublicAnnouncements()` mengalami kegagalan database, THEN THE Homepage SHALL tetap me-render halaman beranda dengan widget Pengumuman menampilkan empty state yang informatif (bukan halaman error 500).
3. IF `getCurrentUser()` tidak dapat mengambil data sesi, THEN THE Homepage SHALL memperlakukan kondisi tersebut sebagai mode guest (`isGuest = true`) dan tetap me-render beranda tanpa crash.
4. THE Homepage SHALL tidak pernah mengembalikan HTTP 500 akibat kegagalan pada `getPublicScheduleSlots()` atau `getPublicAnnouncements()`.
