import { useCallback, useEffect, useMemo, useState, type ComponentType } from 'react';
import { Link, Navigate } from 'react-router-dom';
import {
  Download,
  Loader2,
  LogOut,
  RefreshCw,
  Search,
  Users,
  FileSpreadsheet,
  CheckSquare,
  Square,
  ArrowDownWideNarrow,
  ArrowUpNarrowWide,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import {
  fetchRegistrations,
  formatCreatedAt,
  getCreatedAtMillis,
  type RegistrationRecord,
} from '../../lib/firebase';
import { exportRegistrationsToExcel } from '../../lib/exportExcel';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Checkbox } from '../../components/ui/checkbox';
import { Card, CardContent } from '../../components/ui/card';
import { cn } from '../../lib/utils';
import Logo from '../../components/Logo';

const divisionLabels: Record<string, string> = {
  fotografi: 'Fotografi',
  videografi: 'Videografi',
  talent: 'Talent',
  editor: 'Editor',
};

export default function AdminDashboard() {
  const { user, loading: authLoading, logout, configured } = useAuth();
  const [rows, setRows] = useState<RegistrationRecord[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [error, setError] = useState('');
  const [queryText, setQueryText] = useState('');
  const [notice, setNotice] = useState('');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const load = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await fetchRegistrations();
      setRows(data);
      setSelected(new Set());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal memuat data pendaftar');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user) void load();
  }, [user, load]);

  const filtered = useMemo(() => {
    const q = queryText.trim().toLowerCase();
    const base = !q
      ? rows
      : rows.filter((r) =>
          [r.full_name, r.whatsapp, r.class_level, r.major, r.gender, r.reason, r.divisions.join(' ')]
            .join(' ')
            .toLowerCase()
            .includes(q)
        );
    const sorted = [...base].sort((a, b) => {
      const diff = getCreatedAtMillis(a.created_at) - getCreatedAtMillis(b.created_at);
      return sortOrder === 'newest' ? -diff : diff;
    });
    return sorted;
  }, [rows, queryText, sortOrder]);

  const allFilteredSelected =
    filtered.length > 0 && filtered.every((r) => selected.has(r.id));

  const toggleOne = (id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const toggleAllFiltered = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allFilteredSelected) {
        filtered.forEach((r) => next.delete(r.id));
      } else {
        filtered.forEach((r) => next.add(r.id));
      }
      return next;
    });
  };

  const handleExport = async () => {
    setNotice('');
    setError('');
    const picked = rows.filter((r) => selected.has(r.id));
    if (!picked.length) {
      setError('Centang minimal satu data pendaftar sebelum ekspor.');
      return;
    }
    setExporting(true);
    try {
      const stamp = new Date().toISOString().slice(0, 10);
      exportRegistrationsToExcel(picked, `pendaftar-jcc-${stamp}.xlsx`);
      setNotice(`${picked.length} data berhasil diekspor ke Excel.`);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Gagal mengekspor Excel');
    } finally {
      setExporting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-neutral-400" />
      </div>
    );
  }

  if (!configured) {
    return <Navigate to="/admin/login" replace />;
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  return (
    <div className="min-h-screen bg-black text-white antialiased">
      <header className="sticky top-0 z-40 border-b border-neutral-800/80 bg-black/80 backdrop-blur-md">
        <div className="mx-auto max-w-[1280px] px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <Logo className="h-8 w-8" />
              <span className="flex items-baseline gap-1.5">
                <span className="text-xl font-semibold tracking-tight">JCC</span>
                <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-500">
                  SKENSA
                </span>
              </span>
            </Link>
            <span className="hidden sm:inline text-neutral-700">/</span>
            <span className="text-sm text-neutral-400 truncate">Admin Dashboard</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            <span className="hidden md:inline text-xs text-neutral-500 truncate max-w-[200px]">
              {user.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              className="rounded-full"
              onClick={() => void logout()}
            >
              <LogOut className="h-4 w-4" />
              <span className="hidden sm:inline">Keluar</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-[1280px] px-5 sm:px-8 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-neutral-500 mb-3">
              Open Recruitment 2026
            </p>
            <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">Data Pendaftar</h1>
            <p className="mt-2 text-sm text-neutral-400">
              Kelola, pilih, dan ekspor data pendaftar JCC Lensa Skensa.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full lg:w-auto">
            <StatCard label="Total" value={String(rows.length)} icon={Users} />
            <StatCard label="Dipilih" value={String(selected.size)} icon={CheckSquare} />
            <StatCard
              label="Tampil"
              value={String(filtered.length)}
              icon={Search}
              className="col-span-2 sm:col-span-1"
            />
          </div>
        </div>

        <Card className="rounded-[24px] border-neutral-800 overflow-hidden shadow-sm shadow-white/5">
          <div className="border-b border-neutral-900 p-4 md:p-5 flex flex-col md:flex-row gap-3 md:items-center md:justify-between">
            <div className="relative w-full md:max-w-sm">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-500" />
              <Input
                value={queryText}
                onChange={(e) => setQueryText(e.target.value)}
                placeholder="Cari nama, kelas, jurusan..."
                className="pl-10"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={toggleAllFiltered}
                disabled={!filtered.length || loading}
              >
                {allFilteredSelected ? (
                  <CheckSquare className="h-4 w-4" />
                ) : (
                  <Square className="h-4 w-4" />
                )}
                {allFilteredSelected ? 'Batal pilih' : 'Pilih semua'}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => setSortOrder((v) => (v === 'newest' ? 'oldest' : 'newest'))}
                disabled={!rows.length || loading}
                title={sortOrder === 'newest' ? 'Menampilkan terbaru dulu' : 'Menampilkan terlama dulu'}
              >
                {sortOrder === 'newest' ? (
                  <ArrowDownWideNarrow className="h-4 w-4" />
                ) : (
                  <ArrowUpNarrowWide className="h-4 w-4" />
                )}
                {sortOrder === 'newest' ? 'Terbaru' : 'Terlama'}
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                className="rounded-full"
                onClick={() => void load()}
                disabled={loading}
              >
                <RefreshCw className={cn('h-4 w-4', loading && 'animate-spin')} />
                Refresh
              </Button>

              <Button
                type="button"
                size="sm"
                className="rounded-full"
                onClick={() => void handleExport()}
                disabled={exporting || selected.size === 0}
              >
                {exporting ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Download className="h-4 w-4" />
                )}
                Ekspor Excel ({selected.size})
              </Button>
            </div>
          </div>

          <CardContent className="p-0">
            {error && (
              <div className="m-4 md:m-5 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
                {error}
              </div>
            )}
            {notice && (
              <div className="m-4 md:m-5 rounded-2xl border border-white/20 bg-white/5 px-4 py-3 text-sm text-white flex items-center gap-2">
                <FileSpreadsheet className="h-4 w-4" />
                {notice}
              </div>
            )}

            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3 text-neutral-500">
                <Loader2 className="h-6 w-6 animate-spin" />
                <p className="text-sm">Memuat data dari Firestore...</p>
              </div>
            ) : filtered.length === 0 ? (
              <div className="py-20 text-center">
                <Users className="h-8 w-8 mx-auto text-neutral-600 mb-3" />
                <p className="text-sm text-neutral-400">
                  {rows.length === 0
                    ? 'Belum ada data pendaftar di Firestore.'
                    : 'Tidak ada hasil untuk pencarian ini.'}
                </p>
              </div>
            ) : (
              <>
                {/* Desktop table */}
                <div className="hidden lg:block overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-neutral-900 text-left text-xs uppercase tracking-wide text-neutral-500">
                        <th className="px-5 py-4 w-12">
                          <Checkbox
                            checked={allFilteredSelected}
                            onCheckedChange={() => toggleAllFiltered()}
                            aria-label="Pilih semua"
                          />
                        </th>
                        <th className="px-3 py-4 font-medium">Nama</th>
                        <th className="px-3 py-4 font-medium">WhatsApp</th>
                        <th className="px-3 py-4 font-medium">Kelas</th>
                        <th className="px-3 py-4 font-medium">Jurusan</th>
                        <th className="px-3 py-4 font-medium">Divisi</th>
                        <th className="px-3 py-4 font-medium">Alasan Bergabung</th>
                        <th className="px-3 py-4 font-medium">Tanggal</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filtered.map((row) => {
                        const checked = selected.has(row.id);
                        return (
                          <tr
                            key={row.id}
                            className={cn(
                              'border-b border-neutral-900/80 transition-colors',
                              checked ? 'bg-white/[0.04]' : 'hover:bg-neutral-950/80'
                            )}
                          >
                            <td className="px-5 py-4 align-top">
                              <Checkbox
                                checked={checked}
                                onCheckedChange={() => toggleOne(row.id)}
                                aria-label={`Pilih ${row.full_name}`}
                              />
                            </td>
                            <td className="px-3 py-4 align-top">
                              <p className="font-medium text-white">{row.full_name}</p>
                              <p className="text-xs text-neutral-500 mt-0.5">{row.gender}</p>
                            </td>
                            <td className="px-3 py-4 align-top text-neutral-300">{row.whatsapp}</td>
                            <td className="px-3 py-4 align-top text-neutral-300">{row.class_level}</td>
                            <td className="px-3 py-4 align-top text-neutral-300 max-w-[180px]">
                              {row.major}
                            </td>
                            <td className="px-3 py-4 align-top">
                              <div className="flex flex-wrap gap-1.5 max-w-[200px]">
                                {row.divisions.map((d) => (
                                  <span
                                    key={d}
                                    className="inline-flex rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] text-neutral-300"
                                  >
                                    {divisionLabels[d] || d}
                                  </span>
                                ))}
                              </div>
                            </td>
                            <td className="px-3 py-4 align-top text-neutral-400 max-w-[240px]">
                              <p className="line-clamp-3" title={row.reason}>
                                {row.reason || '-'}
                              </p>
                            </td>
                            <td className="px-3 py-4 align-top text-neutral-500 text-xs whitespace-nowrap">
                              {formatCreatedAt(row.created_at)}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>

                {/* Mobile cards */}
                <div className="lg:hidden divide-y divide-neutral-900">
                  {filtered.map((row) => {
                    const checked = selected.has(row.id);
                    return (
                      <label
                        key={row.id}
                        className={cn(
                          'flex gap-3 p-4 cursor-pointer transition-colors',
                          checked ? 'bg-white/[0.04]' : 'hover:bg-neutral-950/80'
                        )}
                      >
                        <Checkbox
                          checked={checked}
                          onCheckedChange={() => toggleOne(row.id)}
                          className="mt-1"
                          aria-label={`Pilih ${row.full_name}`}
                        />
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-medium text-white">{row.full_name}</p>
                              <p className="text-xs text-neutral-500 mt-0.5">
                                {row.gender} · Kelas {row.class_level}
                              </p>
                            </div>
                            <span className="text-[10px] text-neutral-600 whitespace-nowrap">
                              {formatCreatedAt(row.created_at)}
                            </span>
                          </div>
                          <p className="text-sm text-neutral-300">{row.whatsapp}</p>
                          <p className="text-xs text-neutral-500">{row.major}</p>
                          <div className="flex flex-wrap gap-1.5">
                            {row.divisions.map((d) => (
                              <span
                                key={d}
                                className="inline-flex rounded-full border border-neutral-800 bg-neutral-950 px-2 py-0.5 text-[11px] text-neutral-300"
                              >
                                {divisionLabels[d] || d}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-neutral-500 line-clamp-2">{row.reason}</p>
                        </div>
                      </label>
                    );
                  })}
                </div>
              </>
            )}
          </CardContent>
        </Card>

        <p className="mt-6 text-center text-xs text-neutral-600">
          Data tersimpan di Firebase Firestore · Autentikasi via Firebase Auth
        </p>
      </main>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon: Icon,
  className,
}: {
  label: string;
  value: string;
  icon: ComponentType<{ className?: string }>;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'rounded-2xl border border-neutral-800 bg-neutral-950/60 px-4 py-3 min-w-[120px]',
        className
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <p className="text-[11px] uppercase tracking-wide text-neutral-500">{label}</p>
        <Icon className="h-3.5 w-3.5 text-neutral-600" />
      </div>
      <p className="mt-1 text-2xl font-semibold tracking-tight">{value}</p>
    </div>
  );
}
