import { next, rewrite } from '@vercel/edge';

/**
 * Gerbang waktu untuk JCC Skensa 2026.
 *
 * Selama waktu sekarang (dihitung di server Vercel, BUKAN di jam device
 * pengunjung) masih di bawah target, semua request ke halaman publik
 * di-rewrite ke /countdown.html. Begitu waktunya tiba, situs asli
 * otomatis terbuka tanpa perlu redeploy manual.
 *
 * Target: 16 Juli 2026, 07:00 WIB (UTC+7) => 2026-07-16T00:00:00Z
 */
const TARGET_TIMESTAMP = Date.parse('2026-07-16T07:00:00+07:00');

// Query param rahasia untuk preview/testing sebelum waktunya (opsional).
// Contoh: https://domainmu.com/?preview=jcc-skensa-2026
const PREVIEW_KEY = 'jcc-skensa-2026';

export const config = {
  // Middleware jalan untuk semua path KECUALI:
  // - /api/*      -> serverless function (registrasi, dsb) harus tetap hidup
  // - /countdown.html -> halaman countdown itu sendiri
  // - file statis umum (assets, gambar, favicon, dst)
  matcher: [
    '/((?!api|countdown.html|assets|images|favicon\\.svg|vite\\.svg|robots\\.txt|sitemap\\.xml).*)',
  ],
};

export default function middleware(request: Request) {
  const now = Date.now();

  if (now >= TARGET_TIMESTAMP) {
    return next();
  }

  const url = new URL(request.url);

  // Bypass untuk owner/tim yang perlu ngecek situs asli sebelum tanggal rilis.
  if (url.searchParams.get('preview') === PREVIEW_KEY) {
    return next();
  }

  return rewrite(new URL('/countdown.html', request.url));
}
