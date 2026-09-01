# 03 — Design System (Cosmic & Deep Space Theme)

> Document ini berisi aturan visual, estetika, warna, tipografi, dan komponen UI untuk **`class-rpl-1-202627`**.
> Seluruh AI agent dan developer WAJIB mengacungi dokumen ini untuk menjaga konsistensi visual di seluruh halaman.

---

## 1. Konsep & Filosofi Visual

Web kelas RPL 1 mengusung konsep **Cosmic / Deep Space / Galaxy**. 
Kelas adalah sebuah sistem tata surya tersendiri di mana setiap siswa adalah bintang, dan setiap momen kegiatan adalah rasi bintang yang diabadikan.

### Core Aesthetic Rules:
1. **Dark & Deep Space Foundation**: Menggunakan latar belakang sangat gelap (`#0B0B1A`) dengan gradien nebula halus.
2. **Glassmorphism / Frosted Glass**: Card dan kontainer menggunakan transparansi tinggi (`bg-white/5` atau `bg-[#15152D]/80`), backdrop blur (`backdrop-blur-md`), dan border berpendar tipis (`border-white/10` atau `border-indigo-500/20`).
3. **Glow & Cosmic Accent**: Efek pendaran (glow shadow / radial gradient blur) dalam warna Purple, Indigo, Cyan, dan Rose.
4. **Fluid Micro-Animations**: Transisi halus pada hover, active, loading state, dan page entry (`animate-in fade-in duration-300`).

---

## 2. Palette Warna & Palette Token

### 2.1 Backgrounds & Surfaces
- **Deep Space Base**: `#0B0B1A` (`bg-[#0B0B1A]`)
- **Nebula Surface 1**: `#15152D` (`bg-[#15152D]`)
- **Nebula Surface 2 (Glass)**: `rgba(21, 21, 45, 0.8)` (`bg-[#15152D]/80`)
- **Card Surface Hover**: `rgba(255, 255, 255, 0.08)` (`hover:bg-white/10`)
- **Border Glass**: `rgba(255, 255, 255, 0.1)` (`border-white/10`)
- **Border Glow Active**: `rgba(99, 102, 241, 0.3)` (`border-indigo-500/30`)

### 2.2 Accent & Glow Gradients
- **Primary Celestial**: `from-purple-600 via-indigo-600 to-cyan-500`
- **Secondary Starlight**: `from-indigo-400 to-cyan-400`
- **Supernova / Admin**: `from-rose-500 to-amber-500`
- **Treasurer Gold**: `from-amber-400 to-emerald-400`

### 2.3 Status Colors (Badge & Indicator)
- **Hadir / Lunas / Published**: Emerald / Green (`bg-emerald-500/10 text-emerald-400 border-emerald-500/20`)
- **Pending / Izin / Draft**: Amber / Yellow (`bg-amber-500/10 text-amber-400 border-amber-500/20`)
- **Overdue / Sakit / Urgent**: Rose / Red (`bg-rose-500/10 text-rose-400 border-rose-500/20`)
- **Alfa / Archived**: Slate / Gray (`bg-slate-800/50 text-slate-400 border-slate-700/50`)

---

## 3. Typography & Text Hierarchy

Menggunakan font bawaan **Geist** (`var(--font-geist-sans)`) & **Geist Mono** (`var(--font-geist-mono)`).

- **Page Title (H1)**: `text-3xl sm:text-5xl font-extrabold tracking-tight text-white`
- **Section Heading (H2)**: `text-xl font-bold tracking-tight text-white flex items-center gap-2`
- **Card Title (H3)**: `text-base font-bold text-slate-100`
- **Body Text**: `text-sm text-slate-300 leading-relaxed`
- **Caption / Secondary**: `text-xs text-slate-400`
- **Micro Label / Badge**: `text-[10px] font-bold tracking-wider uppercase`

---

## 4. UI Patterns & Key Components

### 4.1 Card Standard (Cosmic Glass)
```tsx
<div className="rounded-3xl border border-white/10 bg-[#15152D]/80 p-6 backdrop-blur-md shadow-[0_0_20px_rgba(0,0,0,0.5)] transition-all duration-200 hover:border-indigo-500/30">
  {/* Content */}
</div>
```

### 4.2 Buttons & Actions
- **Primary Cosmic Button**:
  ```tsx
  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 px-5 text-sm font-bold text-white shadow-[0_0_15px_rgba(138,43,226,0.4)] hover:from-purple-500 hover:to-indigo-500 transition-all cursor-pointer disabled:opacity-50">
    <Sparkles className="mr-2 h-4 w-4 text-cyan-300" />
    Simpan Changes
  </button>
  ```
- **Secondary Glass Button**:
  ```tsx
  <button className="inline-flex h-11 items-center justify-center rounded-xl bg-white/5 border border-white/10 px-5 text-sm font-bold text-slate-200 hover:bg-white/10 hover:text-white transition-all cursor-pointer">
    Batal
  </button>
  ```

### 4.3 Iconography Rules
- Gunakan **`lucide-react`** secara eksklusif.
- Ukuran ikon standar: `h-4 w-4` (inline/button), `h-5 w-5` (heading/nav), `h-6 w-6` (feature card).
- Berikan aksen warna neon pada ikon (mis. `text-indigo-400`, `text-cyan-400`, `text-amber-400`).

---

## 5. Mobile-First & Responsiveness

- **Breakpoint Acuan**: `360px` (Minimum), `sm: 640px`, `md: 768px`, `lg: 1024px`.
- **Touch Target**: Minimal tinggi elemen interaktif (tombol, input) adalah `44px`.
- **Tabel & Data Grid**: Di layar HP (`< 768px`), ubah tabel horizontal yang panjang menjadi **Card List** bergaya vertikal agar nyaman dibaca dari smartphone tanpa scrolling mendatar.
