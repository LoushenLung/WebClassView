# 02 — Frontend & UI Implementation Guide

> Dokumen ini berisi petunjuk implementasi UI/UX, prinsip **Mobile-First**, penanganan state UI, serta standar integrasi Next.js App Router dengan Tailwind CSS v4.

---

## 1. Stack Frontend

- **Framework**: Next.js App Router (React 19).
- **Styling**: Vanilla Tailwind CSS v4 (mengikuti token warna Cosmic di `03-design-system.md`).
- **Icons**: `lucide-react` (satu-satunya ikon pustaka).
- **State Management**: React State (`useState`) lokal untuk interaksi Client Component. DILARANG menginstall Zustand/Redux.

---

## 2. Prinsip Utama UI & UX

### 2.1 Mobile-First Mandatory (Layar 360px)
Siswa kelas RPL 1 mayoritas membuka web dari Smartphone.
1. **Desain Mobile First**: Tulis CSS dari utility terkecil tanpa prefix (`base`), baru gunakan breakpoint `sm:`, `md:`, `lg:` untuk tampilan desktop.
2. **Horizontal Scroll Prevention**: Seluruh kontainer wajib memiliki `max-w-full overflow-x-hidden` atau strategi card list khusus.
3. **Card List vs Table**:
   - Di desktop (`lg:`), data kas/jadwal dapat ditampilkan dalam format tabel.
   - Di mobile (`< md:`), tabel WAJIB diubah menjadi daftar Card vertikal agar tidak overflow.

### 2.2 Interactive Feedback & States
Setiap aksi pengguna WAJIB memiliki 3 keadaan UI:
1. **Default State**: Tampilan bersih dan rapi.
2. **Pending / Loading State**: Tombol menjadi disabled, menampilkan spinner / indikator loading (`animate-spin`), mencegah klik ganda (*double submit*).
3. **Empty State**: Tampilan menarik bila data kosong (contoh: "Belum ada foto momen di album ini"). Gunakan ikon `lucide-react` dan pesan ramah.

---

## 3. Konvensi Server Component & Client Component

- **Server Components (Default)**:
  - Digunakan untuk membaca data awal (`await` ke Prisma/Action).
  - Tempat render utama halaman.
  - Meminimalkan jumlah JavaScript yang dikirim ke browser siswa.
- **Client Components (`"use client"`)**:
  - Ditambahkan **HANYA** pada komponen daun (*leaf components*) yang memiliki event listener (`onClick`, `onSubmit`) atau state (`useState`).
  - Taruh di folder `_components/` lokal pada route terkait.

---

## 4. Formulir & Validasi Client

1. Gunakan Zod Schema dari `@/lib/validations/` untuk validasi client sebelum mengirim payload ke Server Action.
2. Tampilkan pesan kesalahan dalam Bahasa Indonesia yang ramah tepat di bawah input field yang bermasalah.
3. Bersihkan input dan berikan umpan balik sukses jika operasi mutasi berhasil.
