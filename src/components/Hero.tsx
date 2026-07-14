import { useRef } from 'react';
import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { m, useScroll, useTransform, easeOutExpo } from '../lib/motion';
import { Button } from './ui/button';
import { FallingPattern } from './ui/falling-pattern';

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 32]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.35]);

  return (
    <section
      id="beranda"
      ref={ref}
      className="relative min-h-[100svh] flex items-center pt-24 pb-16 md:pt-28 md:pb-24 overflow-hidden contain-paint"
    >
      <div className="pointer-events-none absolute inset-0 bg-black" aria-hidden>
        <FallingPattern
          className="opacity-70"
          color="rgba(255,255,255,0.55)"
          backgroundColor="#000000"
          duration={45}
          blurIntensity="0.6em"
          density={1}
        />
        {/* Gradasi transisi menyatu ke hitam solid di bagian bawah, menerus ke section berikutnya */}
        <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-black via-black/80 to-transparent" />
        <div className="absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-black/60 to-transparent" />
      </div>

      <div className="relative mx-auto max-w-[1280px] w-full px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <m.div style={{ y: textY, opacity }} className="lg:col-span-5 xl:col-span-5">
            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.08, ease: easeOutExpo }}
              className="text-xs font-medium tracking-[0.22em] uppercase text-neutral-500 mb-5"
            >
              Open Recruitment 2026
            </m.p>

            <m.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.14, ease: easeOutExpo }}
              className="text-[clamp(3rem,8vw,5.75rem)] font-semibold tracking-[-0.04em] leading-[0.92] text-white"
            >
              JCC
              <br />
              LENSA SKENSA
            </m.h1>

            <m.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26, ease: easeOutExpo }}
              className="mt-6 max-w-md text-base md:text-lg text-neutral-400 leading-relaxed"
            >
              Kreatif, inspiratif,
              <br className="hidden sm:block" /> berbagi karya.
            </m.p>

            <m.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.36, ease: easeOutExpo }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Button asChild size="lg" className="rounded-full px-7 h-12">
                <a href="#daftar">
                  Daftar Sekarang
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-full px-7 h-12">
                <a href="#tentang">
                  Pelajari JCC
                  <ArrowDown className="h-4 w-4" />
                </a>
              </Button>
            </m.div>
          </m.div>

          <m.div style={{ y: imageY }} className="lg:col-span-7 xl:col-span-7 relative">
            <m.div
              initial={{ opacity: 0, scale: 0.97, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: easeOutExpo }}
              className="relative"
            >
              <div className="hero-float relative overflow-hidden rounded-[20px] md:rounded-[28px] shadow-[0_20px_60px_-20px_rgba(255,255,255,0.12)] border border-neutral-800/60 will-change-transform">
                <picture>
                  <source srcSet="/images/hero-jcc.webp" type="image/webp" />
                  <img
                    src="/images/hero-jcc.jpg"
                    alt="Anggota JCC Lensa Skensa"
                    width={900}
                    height={1200}
                    fetchPriority="high"
                    decoding="async"
                    className="w-full h-[320px] sm:h-[400px] lg:h-[480px] object-cover object-center grayscale"
                  />
                </picture>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent pointer-events-none" />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-black/30 pointer-events-none" />
              </div>

              <div
                className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-[80%] h-14 rounded-full bg-black/60 blur-xl pointer-events-none"
                aria-hidden
              />

              <m.div
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.55, duration: 0.4 }}
                className="absolute right-4 top-1/2 -translate-y-1/2 hidden md:flex flex-col items-center gap-2"
                aria-hidden
              >
                <div className="h-1.5 w-1.5 rounded-full bg-white" />
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                <div className="h-1.5 w-1.5 rounded-full bg-neutral-700" />
                <div className="mt-2 h-8 w-px bg-neutral-800" />
                <span className="text-[10px] tracking-widest text-neutral-500 rotate-90 mt-4">
                  01
                </span>
              </m.div>
            </m.div>
          </m.div>
        </div>
      </div>
    </section>
  );
}
