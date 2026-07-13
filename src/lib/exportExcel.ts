import * as XLSX from 'xlsx';
import type { RegistrationRecord } from './firebase';
import { formatCreatedAt } from './firebase';

const divisionLabels: Record<string, string> = {
  fotografi: 'Fotografi',
  videografi: 'Videografi',
  talent: 'Talent',
  editor: 'Editor',
};

export function exportRegistrationsToExcel(
  rows: RegistrationRecord[],
  filename = 'pendaftar-jcc-skensa.xlsx'
) {
  if (!rows.length) {
    throw new Error('Tidak ada data yang dipilih untuk diekspor');
  }

  const sheetData = rows.map((r, i) => ({
    No: i + 1,
    'Nama Lengkap': r.full_name,
    WhatsApp: r.whatsapp,
    Kelas: r.class_level,
    Jurusan: r.major,
    'Jenis Kelamin': r.gender,
    Divisi: r.divisions.map((d) => divisionLabels[d] || d).join(', '),
    Alasan: r.reason,
    'Tanggal Daftar': formatCreatedAt(r.created_at),
  }));

  const worksheet = XLSX.utils.json_to_sheet(sheetData);
  worksheet['!cols'] = [
    { wch: 5 },
    { wch: 24 },
    { wch: 16 },
    { wch: 8 },
    { wch: 28 },
    { wch: 14 },
    { wch: 28 },
    { wch: 48 },
    { wch: 20 },
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Pendaftar');
  XLSX.writeFile(workbook, filename);
}
