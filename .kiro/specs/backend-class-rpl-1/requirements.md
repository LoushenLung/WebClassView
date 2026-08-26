# Requirements Document

## Introduction

Dokumen ini mendefinisikan persyaratan untuk **backend layer** aplikasi `class-rpl-1-202627` — sebuah web app manajemen kelas tunggal. Backend yang dimaksud mencakup: Prisma schema & migrasi, RLS policies Supabase, Supabase Auth integration, Server Actions per domain, Cloudinary integration, dan API routes pendukung.

Kondisi saat ini: action files sudah ada tetapi masih menggunakan mock in-memory database (`getDb/saveDb`). Requirements ini mendefinisikan backend produksi yang menggantikan layer mock tersebut dengan Supabase Postgres + Prisma + RLS.

Cakupan fitur: Authentication, Kas Kelas (Dues), Galeri Foto, Pengumuman, Jadwal Kelas, Presensi, Materi, Forum, dan Manajemen Profil.

---

## Glossary

- **System**: Backend layer `class-rpl-1-202627` secara keseluruhan (Server Actions + Prisma + Supabase).
- **Server_Action**: Next.js Server Action dengan direktif `"use server"`, satu-satunya entry point untuk semua mutasi data.
- **Validator**: Lapisan validasi Zod yang dijalankan di dalam Server Action sebelum query ke database.
- **Auth_Service**: Supabase Auth yang mengelola session via `@supabase/ssr` dan HttpOnly cookie.
- **Middleware**: `middleware.ts` Next.js yang melindungi semua route di luar `/login` dan `/auth/callback`.
- **RLS**: Row Level Security Postgres — sumber kebenaran otorisasi, dijalankan di sisi database Supabase.
- **Prisma**: ORM yang mengelola skema, tipe TypeScript, dan migrasi database.
- **Cloudinary**: Layanan penyimpanan gambar eksternal, digunakan hanya untuk upload foto galeri, bukti bayar kas, materi file, dan avatar profil.
- **admin**: Role pengguna dengan akses penuh ke semua fitur termasuk manajemen user dan audit log.
- **bendahara**: Role pengguna dengan akses CRUD ke kas, galeri, pengumuman, jadwal, materi, dan moderasi forum.
- **murid**: Role pengguna dengan akses baca ke semua konten publik dan akses tulis terbatas ke profil sendiri, presensi sendiri, dan forum.
- **AuditLog**: Tabel pencatat perubahan data kas (`dues_payments`) secara otomatis via Postgres trigger.
- **DuesPeriod**: Entitas periode iuran kelas (mis. "Semester 1 2024-2025") dengan jumlah tagihan dan rentang tanggal.
- **DuesPayment**: Entitas pembayaran iuran per siswa per periode dengan status `pending | paid | overdue`.
- **dues_summary**: SQL view yang mengagregasi status pembayaran semua siswa per periode.
- **PhotoGallery**: Entitas album foto yang mengelompokkan beberapa `Photo`.
- **Photo**: Entitas foto individual yang menyimpan URL dan Cloudinary public_id.
- **Announcement**: Entitas pengumuman dengan state `draft | published`.
- **Schedule**: Entitas baris jadwal pelajaran berdasarkan hari dan urutan periode.
- **Attendance**: Entitas presensi per siswa per tanggal dengan status `HADIR | IZIN | SAKIT | ALFA`.
- **Material**: Entitas materi pembelajaran berupa file Cloudinary atau tautan eksternal.
- **ForumPost**: Entitas postingan diskusi di forum kelas.
- **ForumComment**: Entitas komentar pada `ForumPost`, bisa ditandai sebagai jawaban.
- **ActionResult**: Tipe TypeScript generik `{ success: true; data: T } | { success: false; error: string }` yang digunakan oleh semua Server Action.

---

## Requirements

---

### Requirement 1: Authentication & Session Management

**User Story:** As a pengguna, I want to masuk menggunakan akun Google atau email/password, so that saya dapat mengakses fitur aplikasi sesuai role saya.

#### Acceptance Criteria

1. WHEN pengguna menyelesaikan OAuth Google atau login email/password melalui Supabase Auth, THE Auth_Service SHALL menyimpan session ke HttpOnly cookie menggunakan `@supabase/ssr` sehingga cookie tidak dapat dibaca oleh JavaScript browser.
2. WHEN pengguna berhasil login untuk pertama kali (tidak ada baris di `public.users` dengan `id = auth.uid()`), THE System SHALL membuat baris di tabel `public.users` dengan role default `murid` melalui Postgres trigger `on_auth_user_created`. IF baris sudah ada, trigger SHALL menggunakan `ON CONFLICT (id) DO NOTHING`.
3. WHEN Postgres trigger `on_auth_user_created` dieksekusi, THE System SHALL menggunakan nilai `email` dari `auth.users.email` dan `name` dari `raw_user_meta_data->>'name'` dengan fallback ke nilai `email` jika `raw_user_meta_data->>'name'` bernilai NULL atau kosong.
4. WHEN pengguna mengakses route mana pun kecuali `/login` dan `/auth/callback`, THE Middleware SHALL memvalidasi keberadaan dan validitas session dari HttpOnly cookie dan melakukan redirect ke `/login` jika session tidak valid, tidak ada, atau sudah kedaluwarsa.
5. WHEN sisa waktu validitas access token kurang dari 60 detik, THE Auth_Service SHALL memperbarui session secara otomatis menggunakan refresh token tanpa interaksi pengguna.
6. WHEN pengguna melakukan logout, THE Server_Action SHALL memanggil `supabase.auth.signOut()` untuk menginvalidasi session di Supabase dan menghapus HttpOnly cookie, lalu melakukan redirect ke `/login`.
7. THE System SHALL menyediakan route handler `GET /auth/callback` yang menerima OAuth callback dari Supabase, menukar `code` parameter dengan session, dan melakukan redirect ke `/dashboard` (role `admin`/`bendahara`) atau `/` (role `murid`) sesuai role pengguna.
8. IF route handler `/auth/callback` menerima parameter `error` dari Supabase (OAuth gagal atau ditolak pengguna), THEN THE System SHALL melakukan redirect ke `/login?error=auth_failed` tanpa mencoba membuat session.
9. IF session tidak ditemukan atau sudah kedaluwarsa saat Server Action dipanggil, THEN THE Server_Action SHALL mengembalikan `{ success: false, error: "Sesi tidak valid. Silakan login kembali." }` tanpa memproses mutasi lebih lanjut.

---

### Requirement 2: Role-Based Authorization via RLS

**User Story:** As a admin, I want otorisasi dijalankan di lapisan database, so that tidak ada bypass otorisasi via manipulasi client-side atau request langsung ke Supabase.

#### Acceptance Criteria

1. THE System SHALL mengaktifkan RLS (`ALTER TABLE ... ENABLE ROW LEVEL SECURITY` DAN `ALTER TABLE ... FORCE ROW LEVEL SECURITY`) pada semua tabel `public`: `users`, `dues_periods`, `dues_payments`, `announcements`, `schedule`, `photo_galleries`, `photos`, `audit_log`, `attendances`, `materials`, `forum_posts`, `forum_comments`. `FORCE ROW LEVEL SECURITY` diperlukan agar table owner (superuser Supabase) juga tunduk pada policy.
2. THE System SHALL menyediakan helper function `is_admin()` yang dideklarasikan sebagai `RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER STABLE`, mengembalikan `TRUE` jika `auth.uid()` memiliki `role = 'admin'` di tabel `users`, dan mengembalikan `FALSE` jika `auth.uid()` bernilai NULL (unauthenticated call).
3. THE System SHALL menyediakan helper function `is_treasurer_or_admin()` yang dideklarasikan sebagai `RETURNS BOOLEAN LANGUAGE plpgsql SECURITY DEFINER STABLE`, mengembalikan `TRUE` jika `auth.uid()` memiliki `role IN ('bendahara', 'admin')` di tabel `users`, dan mengembalikan `FALSE` jika `auth.uid()` bernilai NULL.
4. WHEN query RLS dievaluasi, THE System SHALL selalu menggunakan `auth.uid()` sebagai referensi identitas pengguna — tidak pernah menggunakan nilai dari request body, header, atau parameter query string untuk keperluan otorisasi.
5. THE System SHALL mendefinisikan semua RLS policy dalam file SQL migrasi di `supabase/migrations/` yang di-commit dalam batch migrasi yang sama dengan perubahan Prisma schema terkait.
6. THE System SHALL mendefinisikan policy eksplisit yang melarang semua operasi `INSERT`, `UPDATE`, dan `DELETE` langsung ke tabel `audit_log` dari koneksi aplikasi — hanya trigger Postgres dengan `SECURITY DEFINER` yang boleh menulis ke tabel ini.

---

### Requirement 3: Database Schema & Migrations

**User Story:** As a developer, I want skema database didefinisikan via Prisma dan dikelola lewat file migrasi, so that perubahan schema dapat dilacak, di-review, dan di-deploy secara konsisten.

#### Acceptance Criteria

1. THE System SHALL mendefinisikan model Prisma untuk semua tabel di `prisma/schema.prisma`: `User`, `DuesPeriod`, `DuesPayment`, `Announcement`, `Schedule`, `PhotoGallery`, `Photo`, `AuditLog`, `Attendance`, `Material`, `ForumPost`, `ForumComment`.
2. THE System SHALL mendefinisikan model `User` dengan field: `id` (String, UUID, `@id @db.Uuid`, referensi ke `auth.users`), `email` (String, `@unique`), `name` (String), `role` (String, `@default("murid")`), `avatarUrl` (String?, nullable), `createdAt` (DateTime, `@default(now())`), `updatedAt` (DateTime, `@updatedAt`).
3. THE System SHALL mendefinisikan model `DuesPayment` dengan constraint `@@unique([studentId, duePeriodId])` untuk mencegah duplikasi pembayaran per siswa per periode.
4. THE System SHALL mendefinisikan model `Schedule` dengan constraint `@@unique([dayOfWeek, periodOrder])` untuk mencegah duplikasi slot jadwal.
5. THE System SHALL mendefinisikan model `Attendance` dengan field `id`, `studentId` (UUID), `date` (DateTime, hanya tanggal), `status` (String: `"HADIR" | "IZIN" | "SAKIT" | "ALFA"`), `checkInTime` (DateTime?, nullable), `createdAt`, `updatedAt`, dan constraint `@@unique([studentId, date])`.
6. THE System SHALL mendefinisikan model `ForumComment` dengan field `isAnswer` (Boolean, `@default(false)`) untuk menandai komentar sebagai jawaban terpilih.
7. WHEN skema Prisma diubah, THE developer SHALL menghasilkan file migrasi SQL via `prisma migrate dev` dan menyertakan file migrasi tersebut di `prisma/migrations/` sebelum melakukan deployment.
8. THE System SHALL mendefinisikan semua relasi foreign key dengan opsi `onDelete: Cascade` untuk memastikan konsistensi data saat record parent dihapus, kecuali pada `AuditLog.userId` yang menggunakan `onDelete: SetNull` untuk mempertahankan riwayat audit.
9. THE System SHALL mendefinisikan field `amount` pada model `DuesPeriod` sebagai `Int` dalam satuan Rupiah tanpa desimal — bukan `Float` atau `Decimal`.

---

### Requirement 4: Kas Kelas — Dues Period Management

**User Story:** As a admin atau bendahara, I want membuat dan mengelola periode iuran, so that saya dapat melacak kewajiban pembayaran siswa per periode.

#### Acceptance Criteria

1. WHEN admin atau bendahara mengirimkan form periode iuran, THE Server_Action SHALL menjalankan `schema.safeParse(input)` menggunakan Zod schema sebelum melakukan operasi apapun ke database.
2. THE Validator SHALL memvalidasi bahwa `name` adalah string dengan panjang 1–100 karakter, `amount` adalah integer dalam rentang 1–999.999.999 (Rupiah), `startDate` adalah string ISO datetime yang dapat di-parse menjadi tanggal valid, `endDate` adalah string ISO datetime yang dapat di-parse menjadi tanggal valid, dan `endDate` secara kronologis lebih besar dari `startDate`.
3. WHEN periode iuran baru berhasil dibuat, THE Server_Action SHALL mengembalikan `{ success: true, data: DuesPeriod }` dan memanggil `revalidatePath("/kas")` serta `revalidatePath("/admin/kas")`.
4. WHEN admin atau bendahara mengarsipkan periode iuran, THE Server_Action SHALL mengubah field `isArchived` menjadi `true` tanpa menghapus data (soft delete). IF update gagal di database, THEN Server_Action SHALL mengembalikan `{ success: false, error: "Gagal mengarsipkan periode iuran. Coba lagi." }`.
5. WHEN periode dengan `name` yang sama sudah ada di database (case-insensitive), THE Server_Action SHALL menolak pembuatan dan mengembalikan `{ success: false, error: "Periode iuran dengan nama tersebut sudah ada." }`.
6. THE RLS SHALL mengizinkan `SELECT` pada `dues_periods` dengan kondisi `NOT is_archived` untuk semua pengguna yang terautentikasi.
7. THE RLS SHALL mengizinkan `INSERT`, `UPDATE`, dan `SELECT` (termasuk yang diarsipkan) pada `dues_periods` hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE`.
8. IF input tidak lolos validasi Zod, THEN THE Server_Action SHALL mengembalikan `{ success: false, error: string }` dalam bahasa Indonesia yang tidak mengandung nama tabel, nama kolom, stack trace, atau kode error teknis.

---

### Requirement 5: Kas Kelas — Dues Payment Tracking

**User Story:** As a bendahara, I want mencatat dan memperbarui status pembayaran iuran per siswa, so that saya dapat memonitor siapa saja yang sudah dan belum membayar.

#### Acceptance Criteria

1. WHEN bendahara menandai pembayaran sebagai lunas, THE Server_Action SHALL memvalidasi bahwa `status` saat ini adalah `"pending"` atau `"overdue"` — IF `status` sudah `"paid"`, THEN Server_Action SHALL mengembalikan `{ success: false, error: "Pembayaran ini sudah tercatat sebagai lunas." }`. Jika valid, Server_Action SHALL memperbarui `status` ke `"paid"`, mengisi `paidAt` dengan timestamp UTC saat ini, menyimpan `proofImageUrl` dan `proofImageCloudinaryId` jika tersedia.
2. WHEN bukti gambar disertakan, THE Validator SHALL memvalidasi bahwa tipe file adalah `image/jpeg`, `image/png`, atau `image/webp` dan ukuran tidak melebihi 5MB sebelum upload ke Cloudinary. IF validasi gagal, THEN Server_Action SHALL mengembalikan error tanpa mencoba upload.
3. WHEN bukti gambar lolos validasi, THE Server_Action SHALL mengupload gambar ke Cloudinary terlebih dahulu, mendapatkan `secure_url` dan `public_id`, baru kemudian melakukan `UPDATE` ke `dues_payments` dengan menyimpan `proofImageUrl` (dari `secure_url`) dan `proofImageCloudinaryId` (dari `public_id`).
4. IF upload ke Cloudinary gagal, THEN THE Server_Action SHALL tidak melakukan `UPDATE` ke `dues_payments` dan mengembalikan `{ success: false, error: "Gagal mengupload bukti pembayaran. Coba lagi." }`.
5. THE RLS SHALL mengizinkan `SELECT` pada `dues_payments` hanya untuk baris dimana `student_id = auth.uid()` bagi pengguna yang bukan `admin` atau `bendahara`.
6. THE RLS SHALL mengizinkan `SELECT`, `INSERT`, dan `UPDATE` pada `dues_payments` jika `is_treasurer_or_admin()` mengembalikan `TRUE`. THE RLS SHALL tidak mengizinkan `DELETE` pada `dues_payments` untuk semua role (integritas audit).
7. WHEN Server_Action mengambil data ringkasan kas, THE System SHALL query SQL view `dues_summary` yang menggabungkan `dues_payments`, `users`, dan `dues_periods` dengan filter `is_archived = false`.
8. THE dues_summary SQL view SHALL menyertakan field: `student_id`, `name`, `email`, `period_id`, `period_name`, `amount`, `status`, `paid_at`, dan `proof_image_url` untuk setiap kombinasi siswa-periode aktif.

---

### Requirement 6: Galeri Foto — Upload & Management

**User Story:** As a admin atau bendahara, I want mengupload foto kegiatan kelas ke dalam album, so that semua anggota kelas dapat melihat dokumentasi kegiatan.

#### Acceptance Criteria

1. WHEN admin atau bendahara mengupload foto, THE Validator SHALL memeriksa bahwa tipe MIME file adalah `image/jpeg`, `image/png`, atau `image/webp`. IF tidak sesuai, THE Server_Action SHALL mengembalikan response error tanpa mencoba upload.
2. WHEN admin atau bendahara mengupload foto, THE Validator SHALL memeriksa bahwa ukuran file tidak melebihi 5.242.880 bytes (5MB). IF melebihi, THE Server_Action SHALL mengembalikan response error tanpa mencoba upload.
3. WHEN foto lolos validasi tipe dan ukuran, THE Server_Action SHALL mengupload file ke Cloudinary dengan folder `"web-kelas"` menggunakan `cloudinary.uploader.upload_stream`.
4. WHEN upload ke Cloudinary berhasil, THE Server_Action SHALL menyimpan `cloudinaryUrl` (dari `result.secure_url`), `cloudinaryId` (dari `result.public_id`), dan `galleryId` ke tabel `photos` dalam Server Action yang sama — tidak dalam dua request terpisah. IF `galleryId` yang diberikan tidak ada di database, Server_Action SHALL mengembalikan response error sebelum mencoba upload.
5. IF upload Cloudinary berhasil tetapi insert database gagal, THEN THE Server_Action SHALL mencatat error di server (`console.error`) dan mengembalikan response error kepada client.
6. WHEN admin atau bendahara menghapus foto, THE Server_Action SHALL terlebih dahulu memanggil Cloudinary API untuk menghapus file menggunakan `cloudinaryId`. IF Cloudinary delete berhasil (atau mengembalikan `result: 'not found'`), THEN Server_Action SHALL menghapus baris dari tabel `photos`. IF Cloudinary delete gagal dengan error selain 'not found', THEN Server_Action SHALL mengembalikan response error tanpa menghapus baris database.
7. THE RLS SHALL mengizinkan `SELECT` pada `photos` dan `photo_galleries` untuk semua pengguna yang terautentikasi.
8. THE RLS SHALL mengizinkan `INSERT`, `UPDATE`, dan `DELETE` pada `photos` dan `photo_galleries` hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE`.
9. IF pengguna dengan role `murid` memanggil Server Action upload atau delete foto, THEN THE Server_Action SHALL mengembalikan response error setelah memvalidasi role, sebelum melakukan operasi apapun ke Cloudinary atau database.

---

### Requirement 7: Pengumuman — Announcement Management

**User Story:** As a admin atau bendahara, I want membuat pengumuman dalam mode draft dan mempublikasikannya saat siap, so that pengumuman yang belum selesai tidak tampil ke siswa.

#### Acceptance Criteria

1. WHEN admin atau bendahara membuat pengumuman baru, THE Server_Action SHALL menyimpan pengumuman dengan `status = "draft"` secara default dan mengisi `authorId` dari `auth.uid()` — tidak pernah dari request body.
2. THE Validator SHALL memvalidasi bahwa `title` adalah string dengan panjang 1–200 karakter dan `content` adalah string dengan panjang minimal 1 karakter sebelum menyimpan ke database.
3. WHEN admin atau bendahara mempublikasikan pengumuman, THE Server_Action SHALL mengubah `status` ke `"published"` dan mengisi `publishedAt` dengan timestamp UTC saat ini, lalu memanggil `revalidatePath("/pengumuman")` dan `revalidatePath("/admin/pengumuman")`.
4. WHEN admin atau bendahara menghapus pengumuman, THE Server_Action SHALL menghapus baris dari database dan memanggil `revalidatePath("/pengumuman")` serta `revalidatePath("/admin/pengumuman")`.
5. THE RLS SHALL mengizinkan `SELECT` pada `announcements` dengan kondisi `status = 'published'` untuk semua pengguna yang terautentikasi.
6. THE RLS SHALL mengizinkan `SELECT` pada semua `announcements` (termasuk draft) hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE`.
7. THE RLS SHALL mengizinkan `INSERT`, `UPDATE`, dan `DELETE` pada `announcements` hanya jika `author_id = auth.uid()` ATAU `is_treasurer_or_admin()` mengembalikan `TRUE`.
8. IF pengumuman yang akan dipublikasikan tidak ditemukan di database, THEN THE Server_Action SHALL mengembalikan `{ success: false, error: "Pengumuman tidak ditemukan." }` tanpa melakukan update.

---

### Requirement 8: Jadwal Kelas — Schedule Management

**User Story:** As a admin atau bendahara, I want mengelola jadwal pelajaran dalam grid hari × periode, so that semua anggota kelas dapat melihat jadwal yang selalu terkini.

#### Acceptance Criteria

1. WHEN admin atau bendahara membuat atau memperbarui slot jadwal, THE Validator SHALL memvalidasi bahwa `dayOfWeek` adalah integer antara 0–4 (inklusif, 0 = Senin), `periodOrder` adalah integer antara 1–8 (inklusif), dan `periodLabel` adalah string dengan panjang 1–20 karakter.
2. WHEN `isBreak` bernilai `true` pada sebuah slot jadwal, THE System SHALL mengizinkan `subject`, `teacher`, dan `room` bernilai `null` pada slot tersebut. WHEN `isBreak` bernilai `false`, THE Validator SHALL memvalidasi bahwa `subject` adalah string non-kosong.
3. WHEN admin atau bendahara menyimpan slot jadwal, THE Server_Action SHALL menggunakan `upsert` berdasarkan pasangan unik `(dayOfWeek, periodOrder)` untuk membuat baris baru atau memperbarui yang sudah ada.
4. THE RLS SHALL mengizinkan `SELECT` pada `schedule` untuk semua pengguna yang terautentikasi.
5. THE RLS SHALL mengizinkan `INSERT`, `UPDATE`, dan `DELETE` pada `schedule` hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE`.
6. WHEN admin atau bendahara menghapus slot jadwal, THE Server_Action SHALL menghapus baris dari database dan memanggil `revalidatePath("/jadwal")` serta `revalidatePath("/admin/jadwal")`.

---

### Requirement 9: Presensi — Attendance Tracking

**User Story:** As a admin atau bendahara, I want mencatat kehadiran siswa per hari, so that ada rekam jejak presensi kelas yang dapat dilaporkan.

#### Acceptance Criteria

1. WHEN admin atau bendahara mencatat kehadiran siswa, THE Validator SHALL memvalidasi bahwa `studentId` adalah UUID v4 yang valid (menggunakan `z.string().uuid()`), `date` adalah string format `YYYY-MM-DD` yang merepresentasikan tanggal valid, dan `status` adalah salah satu dari nilai enum `"HADIR"`, `"IZIN"`, `"SAKIT"`, atau `"ALFA"` (menggunakan `z.enum([...])`).
2. IF input tidak lolos validasi Zod, THEN THE Server_Action SHALL mengembalikan `{ success: false, error: string }` dalam bahasa Indonesia tanpa melakukan query ke database.
3. WHEN data presensi untuk kombinasi `(studentId, date)` belum ada, THE Server_Action SHALL membuat baris baru di tabel `attendances` menggunakan `create`.
4. WHEN data presensi untuk kombinasi `(studentId, date)` sudah ada, THE Server_Action SHALL memperbarui baris menggunakan `upsert` berdasarkan constraint `@@unique([studentId, date])`.
5. WHEN status presensi adalah `"HADIR"`, THE Server_Action SHALL mengisi field `checkInTime` dengan timestamp UTC saat ini (`new Date().toISOString()`).
6. WHEN status presensi bukan `"HADIR"` (yaitu `"IZIN"`, `"SAKIT"`, atau `"ALFA"`), THE Server_Action SHALL menyimpan `checkInTime` sebagai `null`.
7. IF pengguna dengan role `murid` memanggil Server Action catat presensi untuk `studentId` milik orang lain, THEN THE Server_Action SHALL mengembalikan response error setelah memvalidasi bahwa `studentId === auth.uid()`.
8. THE RLS SHALL mengizinkan `SELECT` pada `attendances` untuk baris dimana `student_id = auth.uid()` bagi pengguna dengan role `murid`.
9. THE RLS SHALL mengizinkan `SELECT`, `INSERT`, dan `UPDATE` pada `attendances` jika `is_treasurer_or_admin()` mengembalikan `TRUE`.
10. IF pengguna dengan role selain `admin` atau `bendahara` memanggil Server Action `getAttendanceStats`, THEN THE Server_Action SHALL mengembalikan `{ success: false, error: "Akses ditolak." }` tanpa memproses query.
11. WHEN `getAttendanceStats` dipanggil oleh admin atau bendahara, THE Server_Action SHALL mengembalikan `{ studentsCount: number, presentCount: number, attendanceRate: number }` dimana `attendanceRate = (presentCount / studentsCount) * 100` dengan presisi dua desimal, dan `studentsCount` adalah jumlah baris di tabel `users` dengan `role = 'murid'`.
12. THE System SHALL mendefinisikan model `Attendance` di `prisma/schema.prisma` dengan field: `id` (String, `@id @default(cuid())`), `studentId` (String, `@db.Uuid`), `date` (DateTime, `@db.Date`), `status` (String), `checkInTime` (DateTime?), `createdAt` (DateTime, `@default(now())`), `updatedAt` (DateTime, `@updatedAt`), dan constraint `@@unique([studentId, date])`.

---

### Requirement 10: Materi — Learning Materials Management

**User Story:** As a admin atau bendahara, I want mengupload atau menautkan materi pembelajaran, so that siswa dapat mengakses bahan ajar dengan mudah.

#### Acceptance Criteria

1. THE Validator SHALL memvalidasi bahwa setiap `Material` memiliki `title` (string 1–200 karakter) dan `subjectName` (string 1–100 karakter). Tepat satu dari `fileUrl` atau `externalLink` harus disediakan — keduanya kosong sekaligus atau keduanya terisi sekaligus adalah kondisi invalid.
2. WHEN admin atau bendahara mengupload file materi, THE Server_Action SHALL mengupload file ke Cloudinary dengan folder `"web-kelas/materi"` dan menyimpan `cloudinaryUrl` (dari `result.secure_url`) serta `cloudinaryId` (dari `result.public_id`) ke tabel `materials` dalam satu Server Action.
3. WHEN admin atau bendahara menautkan materi eksternal, THE Validator SHALL memvalidasi bahwa `externalLink` lolos `z.string().url()` sebelum menyimpan ke database.
4. WHEN admin atau bendahara menghapus materi yang memiliki `cloudinaryId` (bukan null), THE Server_Action SHALL memanggil Cloudinary API delete menggunakan `cloudinaryId` sebelum menghapus baris dari database. IF Cloudinary delete gagal, Server_Action SHALL mengembalikan response error tanpa menghapus baris database.
5. WHEN admin atau bendahara menghapus materi yang hanya memiliki `externalLink` (cloudinaryId null), THE Server_Action SHALL langsung menghapus baris dari database tanpa memanggil Cloudinary.
6. THE RLS SHALL mengizinkan `SELECT` pada `materials` untuk semua pengguna yang terautentikasi.
7. THE RLS SHALL mengizinkan `INSERT`, `UPDATE`, dan `DELETE` pada `materials` hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE`.

---

### Requirement 11: Forum — Class Discussion Board

**User Story:** As a murid, I want membuat postingan diskusi dan membalas postingan orang lain, so that saya dapat bertanya dan berdiskusi tentang materi atau topik kelas.

#### Acceptance Criteria

1. WHEN pengguna yang terautentikasi membuat postingan forum, THE Validator SHALL memvalidasi bahwa `title` adalah string 1–200 karakter dan `content` adalah string minimal 1 karakter. THE Server_Action SHALL menyimpan `createdById` dari `auth.uid()` — tidak pernah dari request body.
2. WHEN pengguna yang terautentikasi menambahkan komentar, THE Validator SHALL memvalidasi bahwa `postId` adalah string non-kosong dan `content` adalah string minimal 1 karakter. THE Server_Action SHALL memverifikasi bahwa `ForumPost` dengan `id = postId` ada di database sebelum menyimpan komentar.
3. WHEN admin atau bendahara menandai sebuah komentar sebagai jawaban, THE Server_Action SHALL dalam satu operasi atomik: mengubah `isAnswer` komentar target ke `true` DAN mengubah semua komentar lain pada `postId` yang sama ke `isAnswer = false`.
4. WHEN postingan forum dihapus, THE System SHALL menggunakan `onDelete: Cascade` pada relasi `ForumPost → ForumComment` sehingga semua komentar terkait terhapus otomatis.
5. THE RLS SHALL mengizinkan `SELECT` pada `forum_posts` dan `forum_comments` untuk semua pengguna yang terautentikasi.
6. THE RLS SHALL mengizinkan `INSERT` pada `forum_posts` dan `forum_comments` untuk semua pengguna yang terautentikasi.
7. THE RLS SHALL mengizinkan `DELETE` pada `forum_posts` hanya jika `created_by_id = auth.uid()` ATAU `is_treasurer_or_admin()` mengembalikan `TRUE`.
8. THE RLS SHALL mengizinkan `DELETE` pada `forum_comments` hanya jika `created_by_id = auth.uid()` ATAU `is_treasurer_or_admin()` mengembalikan `TRUE`.
9. THE RLS SHALL mengizinkan `UPDATE` pada `forum_comments` hanya jika `is_treasurer_or_admin()` mengembalikan `TRUE` (hanya untuk operasi tandai jawaban).

---

### Requirement 12: Profile Management

**User Story:** As a murid, I want melihat dan memperbarui profil saya sendiri, so that data saya di aplikasi selalu akurat.

#### Acceptance Criteria

1. WHEN murid memperbarui profilnya, THE Validator SHALL memvalidasi bahwa `name` adalah string 1–100 karakter. IF `avatarUrl` disertakan, THE Validator SHALL memvalidasi bahwa nilai tersebut lolos `z.string().url()`.
2. WHEN murid mengupload foto profil baru, THE Server_Action SHALL mengupload gambar ke Cloudinary dengan folder `"web-kelas/avatars"`, mendapatkan `secure_url`, dan memperbarui field `avatarUrl` di tabel `users` dengan `id = auth.uid()`.
3. IF pengguna dengan role `murid` mencoba memperbarui field `role` melalui Server Action (dengan menyertakan field tersebut di payload), THEN THE Server_Action SHALL mengabaikan field `role` dari payload dan hanya memproses field `name` dan `avatarUrl`. Server_Action SHALL tidak mengembalikan error untuk kasus ini.
4. THE RLS SHALL mengizinkan `SELECT` pada `users` untuk baris dimana `id = auth.uid()` bagi semua pengguna yang terautentikasi.
5. THE RLS SHALL mengizinkan `UPDATE` hanya pada field `name` dan `avatarUrl` di tabel `users` dimana `id = auth.uid()`. Policy ini diimplementasikan dengan `WITH CHECK (id = auth.uid())` dan Server Action yang secara eksplisit hanya mengupdate dua field tersebut.
6. THE RLS SHALL mengizinkan `SELECT` pada semua baris di tabel `users` jika `is_admin()` mengembalikan `TRUE`.

---

### Requirement 13: Server Action Response Contract

**User Story:** As a developer, I want semua Server Action mengembalikan bentuk response yang konsisten, so that error handling di sisi client dapat ditangani secara seragam.

#### Acceptance Criteria

1. THE System SHALL mendefinisikan tipe TypeScript `ActionResult<T>` sebagai `{ success: true; data: T } | { success: false; error: string }` dalam satu file terpusat (`lib/types.ts` atau `lib/actions/types.ts`). Semua Server Action (mutation maupun read action) SHALL menggunakan tipe ini sebagai return type.
2. THE System SHALL membungkus seluruh body setiap Server Action dengan `try/catch` dimana `catch` menangkap `unknown` dan melakukan narrowing sebelum membentuk response error. THE System SHALL tidak pernah menggunakan `throw` untuk meneruskan error ke client.
3. WHEN Server Action berhasil melakukan mutasi pada suatu entitas, THE Server_Action SHALL memanggil `revalidatePath` untuk semua rute public dan rute admin yang menampilkan entitas yang sama, sebelum mengembalikan response `success: true`.
4. THE System SHALL tidak pernah mengekspos ke client string yang mengandung: nama tabel database, nama kolom, stack trace, kode error Postgres (seperti `23505`), atau pesan error internal Supabase/Prisma. Error teknis SHALL di-log di server menggunakan `console.error` dan digantikan dengan pesan dalam bahasa Indonesia.
5. THE System SHALL tidak menggunakan tipe `any` di TypeScript pada seluruh implementasi Server Action, Validator, dan utility function. Gunakan `unknown` dengan narrowing (type guard atau `instanceof` check) jika tipe belum diketahui.

---

### Requirement 14: Zod Validation Schemas

**User Story:** As a developer, I want Zod schema didefinisikan di `lib/validations/` dan dipakai ulang di client dan server, so that validasi tidak terduplikasi dan kontrak input terjamin konsisten.

#### Acceptance Criteria

1. THE System SHALL mendefinisikan Zod schema untuk setiap domain dalam file terpisah di `lib/validations/`: `kas.ts`, `gallery.ts`, `announcement.ts`, `schedule.ts`, `attendance.ts`, `material.ts`, `forum.ts`, `profile.ts`.
2. THE Validator (Server Action) SHALL selalu menjalankan `schema.safeParse(input)` meskipun validasi client-side sudah dilakukan sebelumnya — validasi server tidak dapat dilewati dengan alasan apapun.
3. THE System SHALL mendefinisikan field bertipe enum menggunakan `z.enum([...])`, bukan `z.string()`, untuk field-field berikut: `status` pada `DuesPayment` (`z.enum(["pending", "paid", "overdue"])`), `status` pada `Attendance` (`z.enum(["HADIR", "IZIN", "SAKIT", "ALFA"])`), dan `status` pada `Announcement` (`z.enum(["draft", "published"])`).
4. THE System SHALL mendefinisikan Zod schema untuk input Server Action menggunakan `z.object({...})` dengan semua field yang diwajibkan ditentukan secara eksplisit. Penggunaan `z.unknown()` atau `z.any()` tidak diizinkan kecuali didokumentasikan dengan komentar alasan.

---

### Requirement 15: Cloudinary Integration

**User Story:** As a developer, I want semua operasi Cloudinary dijalankan di server side, so that API secret tidak pernah terekspos ke browser.

#### Acceptance Criteria

1. THE System SHALL menginisialisasi Cloudinary SDK (`cloudinary.config(...)`) hanya di file `lib/cloudinary.ts` menggunakan environment variable `CLOUDINARY_API_SECRET` — variable ini tidak boleh memiliki prefix `NEXT_PUBLIC_` dan tidak boleh diakses di file yang di-bundle untuk browser.
2. THE System SHALL tidak menyediakan API route yang mengembalikan `CLOUDINARY_API_SECRET` ke client dalam bentuk apapun. Semua operasi upload dilakukan langsung dari Server Action ke Cloudinary tanpa melewati browser.
3. WHEN file diupload ke Cloudinary dari Server Action, THE System SHALL menggunakan `cloudinary.uploader.upload_stream` dengan `resource_type: "auto"` untuk mendukung berbagai tipe file (image, video, raw).
4. THE System SHALL menyimpan `cloudinaryId` (dari field `public_id` response Cloudinary) ke kolom database yang sesuai untuk setiap file yang diupload, guna memungkinkan penghapusan file dari Cloudinary saat record database dihapus.
5. IF environment variable `CLOUDINARY_API_SECRET`, `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`, atau `NEXT_PUBLIC_CLOUDINARY_API_KEY` tidak tersedia (bernilai `undefined`) saat Server Action dipanggil, THEN THE System SHALL mengembalikan `{ success: false, error: "Konfigurasi upload tidak tersedia. Hubungi administrator." }` tanpa mencoba operasi apapun ke Cloudinary.

---

### Requirement 16: Audit Trail

**User Story:** As a admin, I want semua perubahan data kas terekam secara otomatis, so that ada jejak lengkap siapa mengubah apa dan kapan untuk keperluan akuntabilitas.

#### Acceptance Criteria

1. THE System SHALL mendefinisikan dan mempertahankan Postgres trigger `audit_dues_payment_changes` pada tabel `dues_payments` yang dieksekusi `AFTER INSERT OR UPDATE OR DELETE` untuk mencatat setiap operasi ke tabel `audit_log`.
2. WHEN trigger `audit_dues_payment_changes` dieksekusi, THE System SHALL menyimpan: `user_id` dari `auth.uid()` (atau NULL jika tidak ada session aktif, mis. operasi dari service role), `action` (`'payment_created'` untuk INSERT, `'payment_updated'` untuk UPDATE, `'payment_deleted'` untuk DELETE), `table_name` (`'dues_payments'`), `record_id` (dari `NEW.id` untuk INSERT/UPDATE, dari `OLD.id` untuk DELETE), `old_values` (dari `row_to_json(OLD)` untuk UPDATE/DELETE, NULL untuk INSERT), `new_values` (dari `row_to_json(NEW)` untuk INSERT/UPDATE, NULL untuk DELETE).
3. IF trigger `audit_dues_payment_changes` gagal dieksekusi (mis. error saat insert ke `audit_log`), THEN THE System SHALL melakukan rollback pada operasi `dues_payments` yang memicunya — audit log dan mutasi data harus atomik.
4. THE RLS SHALL mengizinkan `SELECT` pada `audit_log` hanya jika `is_admin()` mengembalikan `TRUE`.
5. THE System SHALL mendefinisikan indeks pada `audit_log` untuk kolom: `user_id` (untuk filter per pengguna), `action` (untuk filter per tipe aksi), dan `created_at` (untuk sorting dan filter rentang waktu).

---

### Requirement 17: Infrastructure & Environment

**User Story:** As a developer, I want konfigurasi environment dan deployment mengikuti batasan free tier, so that aplikasi berjalan tanpa biaya tambahan.

#### Acceptance Criteria

1. THE System SHALL mendefinisikan environment variable sensitif berikut sebagai server-side only (tanpa prefix `NEXT_PUBLIC_`) dan tidak pernah di-commit ke repository: `SUPABASE_SERVICE_ROLE_KEY`, `CLOUDINARY_API_SECRET`, `DATABASE_URL`.
2. THE System SHALL menyediakan file `.env.example` di root project yang mencantumkan semua variable yang dibutuhkan dengan format `VARIABLE_NAME=` (tanpa nilai aktual) sebagai panduan untuk developer baru.
3. THE System SHALL memastikan semua query database dari Server Components dan Server Actions menggunakan Supabase client yang diinstansiasi dari `lib/supabase/server.ts` (menggunakan `createServerClient` dari `@supabase/ssr`) — bukan `createBrowserClient`.
4. THE System SHALL memisahkan instance Supabase client antara server (`lib/supabase/server.ts` menggunakan `createServerClient`) dan browser (`lib/supabase/client.ts` menggunakan `createBrowserClient`) untuk mencegah kebocoran `SERVICE_ROLE_KEY` ke client bundle Next.js.
5. WHEN Prisma menjalankan query dari lingkungan Vercel (serverless), THE System SHALL menggunakan `DATABASE_URL` yang dikonfigurasi dengan connection string mode `?pgbouncer=true&connection_limit=1` (Supabase Transaction Pooler) untuk kompatibilitas dengan lingkungan serverless.
6. IF salah satu dari environment variable wajib berikut tidak tersedia saat aplikasi start: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `DATABASE_URL`, THEN THE System SHALL gagal pada tahap build/startup dengan pesan error yang menyebutkan nama variable yang hilang, bukan gagal diam-diam saat runtime.
