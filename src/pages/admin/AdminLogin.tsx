import { useState, type FormEvent } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Loader2, Lock, Shield } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card';

export default function AdminLogin() {
  const { user, loading, configured, login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!loading && user) {
    return <Navigate to="/admin" replace />;
  }

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      await login(email, password);
      navigate('/admin', { replace: true });
    } catch (err) {
      const message =
        err instanceof Error ? err.message : 'Gagal masuk. Periksa email/password.';
      if (message.includes('invalid-credential') || message.includes('wrong-password')) {
        setError('Email atau password salah.');
      } else if (message.includes('user-not-found')) {
        setError('Akun admin tidak ditemukan.');
      } else if (message.includes('too-many-requests')) {
        setError('Terlalu banyak percobaan. Coba lagi nanti.');
      } else if (message.includes('Firebase belum')) {
        setError(message);
      } else {
        setError('Gagal masuk. Periksa email/password dan konfigurasi Firebase.');
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white antialiased flex items-center justify-center px-5 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link to="/" className="inline-flex items-baseline gap-1.5 group">
            <span className="text-2xl font-semibold tracking-tight group-hover:opacity-70 transition-opacity">
              JCC
            </span>
            <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-500">
              SKENSA
            </span>
          </Link>
          <p className="mt-3 text-sm text-neutral-500">Panel Admin Open Recruitment</p>
        </div>

        <Card className="rounded-[24px] border-neutral-800 shadow-sm shadow-white/5 overflow-hidden">
          <CardHeader className="border-b border-neutral-900 px-6 py-6">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950">
                <Shield className="h-5 w-5" />
              </div>
              <div>
                <CardTitle className="text-lg">Masuk Admin</CardTitle>
                <p className="text-xs text-neutral-500 mt-1">Firebase Authentication</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-6">
            {!configured && (
              <div className="mb-5 rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-300 leading-relaxed">
                Firebase belum dikonfigurasi. Tambahkan secrets berikut di Secrets tab:
                <ul className="mt-2 space-y-1 text-xs text-neutral-400 list-disc pl-4">
                  <li>VITE_FIREBASE_API_KEY</li>
                  <li>VITE_FIREBASE_AUTH_DOMAIN</li>
                  <li>VITE_FIREBASE_PROJECT_ID</li>
                  <li>VITE_FIREBASE_STORAGE_BUCKET</li>
                  <li>VITE_FIREBASE_MESSAGING_SENDER_ID</li>
                  <li>VITE_FIREBASE_APP_ID</li>
                </ul>
              </div>
            )}

            <form onSubmit={onSubmit} className="space-y-5" noValidate>
              <div className="space-y-2">
                <Label htmlFor="admin-email">Email</Label>
                <Input
                  id="admin-email"
                  type="email"
                  autoComplete="username"
                  placeholder="admin@jcc.skensa"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="admin-password">Password</Label>
                <div className="relative">
                  <Input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pr-11"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-white transition-colors"
                    aria-label={showPassword ? 'Sembunyikan password' : 'Tampilkan password'}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {error && (
                <div className="rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-300">
                  {error}
                </div>
              )}

              <Button
                type="submit"
                size="lg"
                disabled={submitting || !configured || loading}
                className="w-full h-12 rounded-2xl"
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Memverifikasi...
                  </>
                ) : (
                  <>
                    <Lock className="h-4 w-4" />
                    Masuk
                  </>
                )}
              </Button>
            </form>

            <p className="mt-6 text-center text-xs text-neutral-500">
              <Link to="/" className="hover:text-white transition-colors">
                ← Kembali ke beranda
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
