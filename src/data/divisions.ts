import { Mic, Camera, Video, MonitorPlay, type LucideIcon } from 'lucide-react';

export interface Division {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const divisions: Division[] = [
  {
    id: 'talent',
    title: 'Talent',
    description: 'Pembawa acara, wawancara, dan presentasi konten di depan kamera.',
    icon: Mic,
  },
  {
    id: 'fotografi',
    title: 'Fotografi',
    description: 'Mengabadikan momen dengan teknik pengambilan foto yang tepat.',
    icon: Camera,
  },
  {
    id: 'videografi',
    title: 'Videografi',
    description:
      'Merekam video kegiatan, cinematography, dan produksi konten audio visual.',
    icon: Video,
  },
  {
    id: 'editor',
    title: 'Editor',
    description:
      'Mengolah hasil karya menjadi konten siap tayang — editing foto & video serta desain grafis.',
    icon: MonitorPlay,
  },
];

export const formDivisions = [
  { id: 'talent', label: 'Talent' },
  { id: 'fotografi', label: 'Fotografi' },
  { id: 'videografi', label: 'Videografi' },
  { id: 'editor', label: 'Editor' },
] as const;

export const jurusanOptions = [
  'Desain Pemodelan dan Informasi Bangunan (DPIB)',
  'Teknik Instalasi Tenaga Listrik (TITL)',
  'Teknik Pengelasan (TLAS)',
  'Teknik Pemesinan (TPEM)',
  'Teknik Kendaraan Ringan dan Otomotif (TKR)',
  'Teknik Jaringan Komputer dan Telekomunikasi (TJKT)',
  'Teknik Geomatika (GMT)',
];

export const faqItems = [
  {
    id: 'faq-1',
    question: 'Apakah harus punya kamera?',
    answer:
      'Tidak wajib. Kamu bisa mulai dengan smartphone. JCC juga menyediakan peralatan bersama untuk latihan dan liputan tertentu.',
  },
  {
    id: 'faq-2',
    question: 'Apakah semua jurusan boleh mendaftar?',
    answer:
      'Ya! Semua siswa SMKN 1 Kedungwuni dari kelas X, XI, dan XII boleh mendaftar tanpa batasan jurusan.',
  },
  {
    id: 'faq-3',
    question: 'Kapan latihan JCC?',
    answer:
      'Latihan rutin biasanya diadakan seminggu sekali setelah jam sekolah. Jadwal pasti akan diinformasikan setelah pengumuman anggota baru.',
  },
  {
    id: 'faq-4',
    question: 'Apakah boleh memilih lebih dari satu divisi?',
    answer:
      'Boleh. Kamu bisa mencentang lebih dari satu divisi pada form. Penempatan final disesuaikan minat, kemampuan, dan kebutuhan klub.',
  },
];

export const galleryImages = [
  { src: '/images/gallery-member.jpg', alt: 'Anggota JCC SKENSA di koridor sekolah' },
  { src: '/images/gallery-1.jpg', alt: 'Kegiatan liputan jurnalistik' },
  { src: '/images/gallery-2.jpg', alt: 'Sesi diskusi anggota JCC' },
  { src: '/images/gallery-3.jpg', alt: 'Produksi video dan kamera' },
  { src: '/images/gallery-4.jpg', alt: 'Proses desain dan editing' },
];

export const stats = [
  { value: '4', label: 'Divisi', icon: 'layers' as const },
  { value: '7', label: 'Jurusan Terbuka', icon: 'users' as const },
  { value: '6', label: 'Benefit Bergabung', icon: 'camera' as const },
  { value: '2026', label: 'Angkatan Baru', icon: 'calendar' as const },
];
