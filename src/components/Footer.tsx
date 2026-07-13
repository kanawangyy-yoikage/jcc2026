import { Instagram, Youtube, Mail, MapPin, Heart } from 'lucide-react';

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.73a8.19 8.19 0 0 0 4.76 1.52V6.84a4.84 4.84 0 0 1-1-.15z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-14 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold tracking-tight text-white">JCC</span>
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-500">
                SKENSA
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Journalism Creative Club
              <br />
              SMKN 1 Kedungwuni
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4">Hubungi Kami</h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="https://instagram.com/jcc_skensa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Instagram className="h-4 w-4" />
                  @jcc_skensa
                </a>
              </li>
              <li>
                <a
                  href="https://youtube.com/@jccskensa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Youtube className="h-4 w-4" />
                  JCC Skensa
                </a>
              </li>
              <li>
                <a
                  href="https://tiktok.com/@jcc.skensa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <TikTokIcon className="h-4 w-4" />
                  jcc.skensa
                </a>
              </li>
              <li>
                <a
                  href="mailto:jcc.skensa@gmail.com"
                  className="inline-flex items-center gap-2.5 hover:text-white transition-colors"
                >
                  <Mail className="h-4 w-4" />
                  jcc.skensa@gmail.com
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4">Sekretariat</h4>
            <p className="inline-flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                Ruang Ekskul JCC
                <br />
                SMKN 1 Kedungwuni
                <br />
                Pekalongan, Jawa Tengah
              </span>
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4">
              Scan untuk daftar
            </h4>
            <a
              href="#daftar"
              className="inline-flex rounded-2xl border border-neutral-800 bg-black p-3 shadow-sm shadow-white/5 hover:border-white transition-colors"
              aria-label="Buka form pendaftaran"
            >
              <img
                src="/images/qr-daftar.png"
                alt="QR Code pendaftaran JCC"
                width={120}
                height={120}
                className="rounded-xl w-[120px] h-[120px] invert"
                loading="lazy"
                decoding="async"
              />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500">
          <p>© 2026 JCC Skensa. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-white text-white" /> passion
          </p>
        </div>
      </div>
    </footer>
  );
}
