import { Phone, Globe, MapPin, Heart } from 'lucide-react';
import { m, staggerContainer, fadeUp, viewOnce } from '../lib/motion';

export default function Footer() {
  return (
    <footer className="border-t border-neutral-800 bg-black content-auto">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8 py-14 md:py-16">
        <m.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewOnce}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
        >
          <m.div variants={fadeUp}>
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-semibold tracking-tight text-white">JCC</span>
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-500">
                LENSA SKENSA
              </span>
            </div>
            <p className="mt-3 text-sm text-neutral-400 leading-relaxed max-w-xs">
              Jurnalistik & Content Creator
              <br />
              SMKN 1 Kedungwuni
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4">
              Contact Person (Pendaftaran)
            </h4>
            <ul className="space-y-3 text-sm text-neutral-400">
              <li>
                <a
                  href="https://wa.me/6285174456249"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Sofyan · 0851-7445-6249
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/6281390649165"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Phone className="h-4 w-4" />
                  Mazaya · 0813-9064-9165
                </a>
              </li>
              <li>
                <a
                  href="https://jurnalistikskensa.my.id"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2.5 transition-colors hover:text-white"
                >
                  <Globe className="h-4 w-4" />
                  jurnalistikskensa.my.id
                </a>
              </li>
            </ul>
          </m.div>

          <m.div variants={fadeUp}>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4"></h4>
            <p className="inline-flex items-start gap-2.5 text-sm text-neutral-400 leading-relaxed">
              <MapPin className="h-4 w-4 mt-0.5 shrink-0" />
              <span>
                
                <br />
                
                <br />
                
              </span>
            </p>
          </m.div>

          <m.div variants={fadeUp}>
            <h4 className="text-sm font-semibold tracking-tight text-white mb-4">
              
            </h4>
            <a
              href="#daftar"
              className="inline-flex rounded-2xl border border-neutral-800 bg-black p-3 shadow-sm shadow-white/5 transition-colors hover:border-white"
              aria-label="Buka form pendaftaran"
            >
              <img
                src=""
                alt="QR Code pendaftaran JCC"
                width={120}
                height={120}
                className="rounded-xl w-[120px] h-[120px] invert"
                loading="lazy"
                decoding="async"
              />
            </a>
          </m.div>
        </m.div>

        <m.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewOnce}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-12 pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-neutral-500"
        >
          <p>© 2026 JCC Lensa Skensa. All rights reserved.</p>
          <p className="inline-flex items-center gap-1.5">
            Made with <Heart className="h-3 w-3 fill-white text-white" /> passion
          </p>
        </m.div>
      </div>
    </footer>
  );
}
