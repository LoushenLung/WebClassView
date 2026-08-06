import fs from 'fs';
import path from 'path';

// Define DB file path
const DB_FILE = path.join(process.cwd(), 'db.json');

// Interface structures matching schema
export interface Profile {
  id: string;
  email: string;
  fullName: string;
  nickname: string;
  studentId: string;
  role: 'admin' | 'treasurer' | 'user';
  classRole: string;
  avatarUrl: string;
  bioQuote: string;
  birthDate: string;
  whatsapp: string;
  instagram: string;
  linkedin: string;
  github: string;
  academicSkills: string[];
  address: string;
  hideContact: boolean;
  createdAt: string;
}

export interface Schedule {
  id: string;
  day: string;
  subjectName: string;
  teacherName: string;
  room: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface Task {
  id: string;
  title: string;
  description: string;
  deadline: string;
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  subjectName: string;
  attachmentUrl?: string;
  attachmentName?: string;
  linkUrl?: string;
  createdById: string;
  createdAt: string;
}

export interface TaskProgress {
  id: string;
  taskId: string;
  userId: string;
  status: 'TODO' | 'IN_PROGRESS' | 'DONE';
  updatedAt: string;
}

export interface Material {
  id: string;
  subjectName: string;
  title: string;
  description?: string;
  fileUrl: string;
  fileType: string;
  semester: number;
  uploaderName: string;
  createdAt: string;
}

export interface FinanceTransaction {
  id: string;
  type: 'IN' | 'OUT';
  amount: number;
  category: string;
  description: string;
  receiptUrl?: string;
  createdById: string;
  createdAt: string;
}

export interface CashPayment {
  id: string;
  userId: string;
  periodWeek: number;
  periodYear: number;
  status: 'PAID' | 'UNPAID' | 'PENDING';
  verifiedById?: string;
  updatedAt: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  priorityLevel: 'BIASA' | 'PENTING' | 'URGENT';
  pinned: boolean;
  createdById: string;
  createdAt: string;
}

export interface Attendance {
  id: string;
  userId: string;
  date: string; // YYYY-MM-DD
  status: 'HADIR' | 'IZIN' | 'SAKIT' | 'ALFA';
  checkInTime?: string;
  createdAt: string;
}

export interface GalleryPost {
  id: string;
  albumName: string;
  imageUrl: string;
  description?: string;
  uploadedById: string;
  createdAt: string;
}

export interface ForumPost {
  id: string;
  title: string;
  content: string;
  subjectName?: string;
  createdById: string;
  createdAt: string;
  upvotes: number;
}

export interface ForumComment {
  id: string;
  postId: string;
  content: string;
  createdById: string;
  createdAt: string;
  isAnswer: boolean;
}

export interface DatabaseSchema {
  profiles: Profile[];
  schedules: Schedule[];
  tasks: Task[];
  taskProgresses: TaskProgress[];
  materials: Material[];
  transactions: FinanceTransaction[];
  payments: CashPayment[];
  announcements: Announcement[];
  attendances: Attendance[];
  galleryPosts: GalleryPost[];
  forumPosts: ForumPost[];
  forumComments: ForumComment[];
}

// Seed data
const SEED_DATA: DatabaseSchema = {
  profiles: [
    {
      id: "usr-admin",
      email: "admin@kelas.com",
      fullName: "Muhammad Farhan",
      nickname: "Farhan",
      studentId: "26270101",
      role: "admin",
      classRole: "Ketua Kelas",
      avatarUrl: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=200",
      bioQuote: "Lead by example, create with passion.",
      birthDate: "2008-04-12",
      whatsapp: "08123456789",
      instagram: "farhan_dev",
      linkedin: "linkedin.com/in/farhan",
      github: "github.com/farhan",
      academicSkills: ["Frontend Dev", "Public Speaking", "UI/UX Design"],
      address: "Bandung, Jawa Barat",
      hideContact: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "usr-treasurer",
      email: "bendahara@kelas.com",
      fullName: "Siti Rahmawati",
      nickname: "Rahma",
      studentId: "26270102",
      role: "treasurer",
      classRole: "Bendahara",
      avatarUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
      bioQuote: "Uang kas lancar, kegiatan lancar!",
      birthDate: "2008-09-24",
      whatsapp: "08987654321",
      instagram: "rahma_siti",
      linkedin: "",
      github: "",
      academicSkills: ["Accounting", "Event Planning"],
      address: "Soreang, Bandung",
      hideContact: false,
      createdAt: new Date().toISOString()
    },
    {
      id: "usr-student1",
      email: "siswa1@kelas.com",
      fullName: "Andi Wijaya",
      nickname: "Andi",
      studentId: "26270103",
      role: "user",
      classRole: "Anggota",
      avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
      bioQuote: "Enjoy the little things.",
      birthDate: "2008-11-05",
      whatsapp: "08522334455",
      instagram: "andiwjy",
      linkedin: "",
      github: "github.com/andiw",
      academicSkills: ["Mobile Dev", "Cybersecurity"],
      address: "Cimahi, Jawa Barat",
      hideContact: false,
      createdAt: new Date().toISOString()
    }
  ],
  schedules: [
    {
      id: "sched-1",
      day: "Senin",
      subjectName: "Pemrograman Web & Perangkat Bergerak",
      teacherName: "Pak Eko Prasetyo, M.T.",
      room: "Lab Komputer 3",
      startTime: "07:30",
      endTime: "09:45",
      notes: "Materi Next.js & Tailwind CSS"
    },
    {
      id: "sched-2",
      day: "Senin",
      subjectName: "Bahasa Inggris Akademik",
      teacherName: "Ibu Dian Sastro",
      room: "Ruang Teori 12",
      startTime: "10:15",
      endTime: "12:00"
    },
    {
      id: "sched-3",
      day: "Selasa",
      subjectName: "Basis Data & PostgreSQL",
      teacherName: "Ibu Larasati",
      room: "Lab Komputer 1",
      startTime: "07:30",
      endTime: "09:45"
    },
    {
      id: "sched-4",
      day: "Selasa",
      subjectName: "Matematika Rekayasa",
      teacherName: "Pak Budi",
      room: "Ruang Teori 12",
      startTime: "10:15",
      endTime: "12:00"
    }
  ],
  tasks: [
    {
      id: "task-1",
      title: "Tugas Membuat CRUD Next.js",
      description: "Buatlah web CRUD sederhana menggunakan Next.js App Router dan database lokal JSON.",
      deadline: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days from now
      priority: "HIGH",
      subjectName: "Pemrograman Web & Perangkat Bergerak",
      createdById: "usr-admin",
      createdAt: new Date().toISOString()
    },
    {
      id: "task-2",
      title: "Desain Skema Database Perpustakaan",
      description: "Gambarkan ERD perpustakaan dengan tabel Anggota, Buku, Peminjaman, dan Denda.",
      deadline: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000).toISOString(), // 4 days from now
      priority: "MEDIUM",
      subjectName: "Basis Data & PostgreSQL",
      createdById: "usr-admin",
      createdAt: new Date().toISOString()
    }
  ],
  taskProgresses: [
    {
      id: "prog-1",
      taskId: "task-1",
      userId: "usr-student1",
      status: "IN_PROGRESS",
      updatedAt: new Date().toISOString()
    }
  ],
  materials: [
    {
      id: "mat-1",
      subjectName: "Pemrograman Web & Perangkat Bergerak",
      title: "Slide 01 - Pengenalan Next.js 15 App Router",
      description: "Panduan dasar file-system routing, Server Components, dan Client Components.",
      fileUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      fileType: "PDF",
      semester: 1,
      uploaderName: "Muhammad Farhan",
      createdAt: new Date().toISOString()
    }
  ],
  transactions: [
    {
      id: "tx-1",
      type: "IN",
      amount: 150000,
      category: "Kas Mingguan",
      description: "Pembayaran kas siswa minggu ke-1 & ke-2 Agustus",
      createdById: "usr-treasurer",
      createdAt: new Date().toISOString()
    },
    {
      id: "tx-2",
      type: "OUT",
      amount: 45000,
      category: "Kebutuhan Kelas",
      description: "Pembelian sapu, pel, dan penghapus papan tulis",
      receiptUrl: "https://images.unsplash.com/photo-1554415707-6e8cfc93fe23?auto=format&fit=crop&q=80&w=400",
      createdById: "usr-treasurer",
      createdAt: new Date().toISOString()
    }
  ],
  payments: [
    {
      id: "pay-1",
      userId: "usr-admin",
      periodWeek: 1,
      periodYear: 2026,
      status: "PAID",
      verifiedById: "usr-treasurer",
      updatedAt: new Date().toISOString()
    },
    {
      id: "pay-2",
      userId: "usr-treasurer",
      periodWeek: 1,
      periodYear: 2026,
      status: "PAID",
      verifiedById: "usr-treasurer",
      updatedAt: new Date().toISOString()
    },
    {
      id: "pay-3",
      userId: "usr-student1",
      periodWeek: 1,
      periodYear: 2026,
      status: "PENDING",
      updatedAt: new Date().toISOString()
    }
  ],
  announcements: [
    {
      id: "ann-1",
      title: "Iuran Kas Agustus Wajib Lunas Sebelum UTS",
      content: "Pengumuman untuk seluruh siswa kelas RPL 1, harap melunasi iuran kas untuk bulan Agustus sebesar Rp 20.000 sebelum UTS dimulai tanggal 24 Agustus 2026. Pembayaran bisa dilakukan langsung ke Rahma (Bendahara). Terima kasih!",
      priorityLevel: "PENTING",
      pinned: true,
      createdById: "usr-admin",
      createdAt: new Date().toISOString()
    }
  ],
  attendances: [],
  galleryPosts: [
    {
      id: "gal-1",
      albumName: "Kebersamaan RPL 1",
      imageUrl: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=800",
      description: "Foto bersama setelah menyelesaikan projek kelas semester lalu.",
      uploadedById: "usr-admin",
      createdAt: new Date().toISOString()
    }
  ],
  forumPosts: [
    {
      id: "forum-1",
      title: "Ada yang ngerti materi Server Actions di Next.js?",
      content: "Halo guys, mau nanya dong. Bedanya make Server Actions sama API Route di Next.js apa ya kelebihannya? Terus kalau error handling enaknya gmn?",
      subjectName: "Pemrograman Web & Perangkat Bergerak",
      createdById: "usr-student1",
      createdAt: new Date().toISOString(),
      upvotes: 4
    }
  ],
  forumComments: [
    {
      id: "comm-1",
      postId: "forum-1",
      content: "Server Actions itu jalan langsung di server dan ga butuh bikin endpoint API manual, jadi lebih clean. Buat error handling, enaknya return object { success: false, error: 'Pesan' } aja dari function action-nya terus ditangkap pake state di client.",
      createdById: "usr-admin",
      createdAt: new Date().toISOString(),
      isAnswer: true
    }
  ]
};

// Initialize DB file if not exists
const initializeDb = () => {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify(SEED_DATA, null, 2));
  }
};

// Generic read/write functions
export function getDb(): DatabaseSchema {
  initializeDb();
  try {
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data) as DatabaseSchema;
  } catch (error) {
    console.error("Failed to read JSON DB, returning seed data", error);
    return SEED_DATA;
  }
}

export function saveDb(data: DatabaseSchema): void {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
  } catch (error) {
    console.error("Failed to write to JSON DB", error);
  }
}
