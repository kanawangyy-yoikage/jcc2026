import { useEffect, useState, useCallback } from 'react';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { m, AnimatePresence } from '../lib/motion';
import { Button } from './ui/button';
import { cn } from '../lib/utils';
import { useScrolledPast } from '../hooks/useThrottledScroll';
import Logo from './Logo';

const navLinks = [
  { href: '#beranda', label: 'Beranda' },
  { href: '#tentang', label: 'Tentang' },
  { href: '#divisi', label: 'Divisi' },
  { href: '#galeri', label: 'Galeri' },
  { href: '#faq', label: 'FAQ' },
] as const;

export default function Navbar() {
  const scrolled = useScrolledPast(20);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('#beranda');

  const updateActive = useCallback(() => {
    const sections = navLinks.map((l) => l.href.slice(1));
    for (let i = sections.length - 1; i >= 0; i--) {
      const el = document.getElementById(sections[i]);
      if (el && el.getBoundingClientRect().top <= 120) {
        setActive(`#${sections[i]}`);
        return;
      }
    }
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking = false;
      });
    };
    updateActive();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [updateActive]);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow,backdrop-filter] duration-300',
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-neutral-800/80 shadow-[0_1px_0_rgba(255,255,255,0.04)]'
          : 'bg-transparent border-b border-transparent'
      )}
    >
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <div className="flex h-16 md:h-[72px] items-center justify-between gap-4">
          <a href="#beranda" className="flex items-center gap-2 group shrink-0">
            <Logo className="h-8 w-8 group-hover:opacity-70 transition-opacity" />
            <span className="flex items-baseline gap-1.5">
              <span className="text-xl font-semibold tracking-tight text-white group-hover:opacity-70 transition-opacity">
                JCC
              </span>
              <span className="text-[10px] font-medium tracking-[0.18em] uppercase text-neutral-500">
                LENSA SKENSA
              </span>
            </span>
          </a>

          <nav className="hidden lg:flex items-center gap-1" aria-label="Utama">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'relative px-3.5 py-2 text-sm font-medium transition-colors duration-200 rounded-xl',
                  active === link.href ? 'text-white' : 'text-neutral-500 hover:text-white'
                )}
              >
                {link.label}
                {active === link.href && (
                  <m.span
                    layoutId="navbar-active-underline"
                    transition={{ type: 'spring', stiffness: 420, damping: 34 }}
                    className="absolute left-3.5 right-3.5 -bottom-0.5 h-[2px] rounded-full bg-white"
                  />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden sm:inline-flex rounded-full px-5">
              <a href="#daftar">
                Daftar Sekarang
                <ArrowUpRight className="h-4 w-4" />
              </a>
            </Button>

            <button
              type="button"
              aria-label={open ? 'Tutup menu' : 'Buka menu'}
              aria-expanded={open}
              className="lg:hidden inline-flex h-10 w-10 items-center justify-center rounded-full border border-neutral-800 bg-black/80 backdrop-blur-sm transition-colors hover:border-white text-white"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <m.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="lg:hidden overflow-hidden border-t border-neutral-800/80 bg-black/95 backdrop-blur-md"
          >
            <div className="mx-auto max-w-[1280px] px-5 py-6 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <m.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'rounded-2xl px-4 py-3.5 text-base font-medium transition-colors',
                    active === link.href
                      ? 'bg-neutral-900 text-white'
                      : 'text-neutral-400 hover:bg-neutral-950'
                  )}
                >
                  {link.label}
                </m.a>
              ))}
              <Button asChild className="mt-3 rounded-full h-12">
                <a href="#daftar" onClick={() => setOpen(false)}>
                  Daftar Sekarang
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </header>
  );
}
