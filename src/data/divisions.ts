import { PenLine, Camera, Video, Palette, Share2, type LucideIcon } from 'lucide-react';

export interface Division {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const divisions: Division[] = [
  {
    id: 'pena',
    title: 'Pena',
    description:
      'Menulis berita, artikel, features, dan content menarik dengan narasi yang kuat.',
    icon: PenLine,
  },
  {
    id: 'fotografi',
    title: 'Fotografi',
    description:
      'Mengabadikan momen terbaik dalam setiap kegiatan dengan sudut pandang kreatif.',
    icon: Camera,
  },
  {
    id: 'videografi',
    title: 'Videografi',
    description:
      'Membuat video informatif dan kreatif dengan storytelling yang powerful.',
    icon: Video,
  },
  {
    id: 'desain',
    title: 'Desain Grafis',
    description:
      'Merancang visual poster, feed, dan identitas visual yang elegan dan modern.',
    icon: Palette,
  },
  {
    id: 'medsos',
    title: 'Media Sosial',
    description:
      'Mengelola konten digital dan menyebarkan karya JCC ke audiens yang lebih luas.',
    icon: Share2,
  },
];

export const formDivisions = [
  { id: 'fotografi', label: 'Fotografi' },
  { id: 'videografi', label: 'Videografi' },
  { id: 'talent', label: 'Talent' },
  { id: 'editor', label: 'Editor' },
] as const;

export const jurusanOptions = [
  'Rekayasa Perangkat Lunak',
  'Teknik Komputer dan Jaringan',
  'Desain Komunikasi Visual',
  'Broadcasting dan Perfilman',
  'Akuntansi',
  'Manajemen Perkantoran',
  'Pemasaran',
  'Lainnya',
];

export const timelineItems = [
  {
    id: 1,
    step: '01',
    title: 'Pendaftaran',
    date: '1 – 15 Juni 2026',
    description: 'Isi formulir online dan lengkapi data diri dengan benar.',
  },
  {
    id: 2,
    step: '02',
    title: 'Seleksi Administrasi',
    date: '16 – 18 Juni 2026',
    description: 'Tim panitia meninjau kelengkapan dan kesesuaian data pendaftar.',
  },
  {
    id: 3,
    step: '03',
    title: 'Wawancara',
    date: '19 – 22 Juni 2026',
    description: 'Sesi wawancara singkat untuk mengenal minat dan komitmenmu.',
  },
  {
    id: 4,
    step: '04',
    title: 'Pengumuman',
    date: '23 Juni 2026',
    description: 'Hasil seleksi diumumkan melalui media sosial dan WhatsApp.',
  },
  {
    id: 5,
    step: '05',
    title: 'First Gathering',
    date: '25 Juni 2026',
    description: 'Pertemuan pertama anggota baru — kenalan, briefing, dan mulai berkarya.',
  },
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
      'Latihan rutin biasanya diadakan seminggu sekali setelah jam sekolah. Jadwal pasti akan diinformasikan setelah First Gathering.',
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
  { value: '50+', label: 'Member', icon: 'users' as const },
  { value: '200+', label: 'Liputan', icon: 'camera' as const },
  { value: '40+', label: 'Event', icon: 'calendar' as const },
  { value: '5', label: 'Divisi', icon: 'layers' as const },
];
