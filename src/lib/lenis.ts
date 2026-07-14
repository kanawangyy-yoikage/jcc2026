import Lenis from 'lenis';
import { isTouchDevice, prefersReducedMotion, isLowPowerDevice } from './perf';

/** Premium ease-out expo (natural deceleration). */
export const lenisEasing = (t: number) =>
  Math.min(1, 1.001 - Math.pow(2, -10 * t));

let lenisInstance: Lenis | null = null;
let rafId = 0;
let running = false;

export function getLenis(): Lenis | null {
  return lenisInstance;
}

function stopRaf() {
  running = false;
  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = 0;
  }
}

function startRaf() {
  if (running || !lenisInstance) return;
  running = true;

  const loop = (time: number) => {
    if (!running || !lenisInstance) return;
    lenisInstance.raf(time);
    rafId = requestAnimationFrame(loop);
  };

  rafId = requestAnimationFrame(loop);
}

/**
 * Soft-scroll to a hash target (navbar anchors).
 * Safe no-op if target missing.
 */
export function scrollToHash(
  hash: string,
  options?: { offset?: number; immediate?: boolean }
) {
  if (!hash || hash === '#') return;

  const el = document.querySelector(hash);
  if (!el) return;

  const offset = options?.offset ?? -80;
  const lenis = lenisInstance;

  if (lenis) {
    lenis.scrollTo(el as HTMLElement, {
      offset,
      duration: isTouchDevice() ? 1.5 : 1.8,
      easing: lenisEasing,
      lerp: 0.06,
      immediate: options?.immediate,
    });
    return;
  }

  const top =
    (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset;
  window.scrollTo({
    top,
    behavior: options?.immediate ? 'auto' : 'smooth',
  });
}

/**
 * Create global Lenis for the landing page.
 * Returns destroy function for React cleanup.
 */
export function initLenis(): () => void {
  if (typeof window === 'undefined') return () => undefined;

  // Catatan: sebelumnya Lenis di-skip total pada prefers-reduced-motion dan
  // pada device low-power (fallback ke native scroll). Sekarang Lenis SELALU
  // diaktifkan di semua device/browser — termasuk touch, low-power, dan
  // reduced-motion — supaya pengalaman smooth-scroll konsisten di mana saja.
  // syncTouch tetap true di touch device supaya scroll custom benar-benar
  // dipakai (bukan native) alih-alih hanya mempercantik momentum-nya.
  const touch = isTouchDevice();
  const lowPower = isLowPowerDevice();
  const reducedMotion = prefersReducedMotion();

  // Tear down previous instance (StrictMode / remount)
  if (lenisInstance) {
    destroyLenis();
  }

  /**
   * Desktop: buttery lerp 0.055 + duration 1.9 — momentum lebih panjang &
   * lebih halus dari sebelumnya (lerp 0.08 / duration 1.2).
   * Touch: sedikit lebih tinggi lerp-nya biar gerakan tetap stabil.
   * Low-power: lerp lebih tinggi lagi (transisi lebih pendek) supaya main
   * thread tidak keberatan, tapi tetap pakai Lenis, bukan native scroll.
   * Reduced-motion: durasi tetap dipangkas jauh lebih pendek, tapi tetap Lenis.
   */
  const lerp = lowPower ? 0.09 : touch ? 0.07 : 0.055;
  const duration = reducedMotion ? 0.5 : lowPower ? 1.3 : 1.9;

  const lenis = new Lenis({
    lerp,
    duration,
    easing: lenisEasing,
    smoothWheel: true,
    syncTouch: true,
    touchInertiaExponent: touch ? 1.55 : 1.7,
    touchMultiplier: touch ? 1.15 : 1,
    wheelMultiplier: 1,
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    autoResize: true,
    overscroll: true,
    autoRaf: false,
    anchors: false,
    allowNestedScroll: true,
    stopInertiaOnNavigate: true,
    prevent: (node) => {
      if (node.closest('[data-lenis-prevent]')) return true;
      if (node.closest('[data-radix-select-content]')) return true;
      if (node.closest('[data-radix-select-viewport]')) return true;
      const tag = node.tagName;
      if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
      return false;
    },
  });

  lenisInstance = lenis;
  document.documentElement.classList.add('lenis', 'lenis-smooth');

  startRaf();

  const resize = () => {
    lenisInstance?.resize();
  };

  let resizeRaf = 0;
  const scheduleResize = () => {
    if (resizeRaf) return;
    resizeRaf = requestAnimationFrame(() => {
      resizeRaf = 0;
      resize();
    });
  };

  const onVisibility = () => {
    if (document.hidden) {
      stopRaf();
    } else {
      resize();
      startRaf();
    }
  };

  const onClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    if (!target) return;

    const anchor = target.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (!anchor) return;

    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return;
    }

    const href = anchor.getAttribute('href');
    if (!href || href === '#' || href.length < 2) return;

    // Same-page hash only
    if (anchor.origin !== window.location.origin) return;
    if (anchor.pathname !== window.location.pathname) return;

    const el = document.querySelector(href);
    if (!el) return;

    e.preventDefault();
    scrollToHash(href, { offset: -80 });

    if (history.replaceState) {
      history.replaceState(null, '', href);
    }
  };

  const onLoad = () => scheduleResize();
  const onOrientation = () => {
    window.setTimeout(scheduleResize, 120);
  };

  const ro =
    typeof ResizeObserver !== 'undefined'
      ? new ResizeObserver(() => scheduleResize())
      : null;

  document.addEventListener('click', onClick, { passive: false });
  document.addEventListener('visibilitychange', onVisibility);
  window.addEventListener('load', onLoad, { passive: true });
  window.addEventListener('orientationchange', onOrientation, { passive: true });
  window.addEventListener('resize', scheduleResize, { passive: true });
  if (ro) ro.observe(document.documentElement);

  // Initial hash (e.g. /#daftar)
  if (window.location.hash) {
    requestAnimationFrame(() => {
      // Wait a tick for layout
      window.setTimeout(() => {
        scrollToHash(window.location.hash, { offset: -80 });
      }, 50);
    });
  }

  // Recheck dimensions after images / lazy chunks settle
  const settleTimers = [200, 600, 1200].map((ms) =>
    window.setTimeout(scheduleResize, ms)
  );

  // Web font (Inter) baru selesai load bisa mengubah tinggi teks → resize ulang
  document.fonts?.ready?.then(() => scheduleResize()).catch(() => undefined);

  return () => {
    settleTimers.forEach((id) => window.clearTimeout(id));
    document.removeEventListener('click', onClick);
    document.removeEventListener('visibilitychange', onVisibility);
    window.removeEventListener('load', onLoad);
    window.removeEventListener('orientationchange', onOrientation);
    window.removeEventListener('resize', scheduleResize);
    ro?.disconnect();
    if (resizeRaf) cancelAnimationFrame(resizeRaf);
    destroyLenis();
  };
}

export function destroyLenis() {
  stopRaf();
  if (lenisInstance) {
    lenisInstance.destroy();
    lenisInstance = null;
  }
  document.documentElement.classList.remove(
    'lenis',
    'lenis-smooth',
    'lenis-scrolling',
    'lenis-stopped'
  );
}
