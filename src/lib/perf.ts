/**
 * Shared device-capability detection.
 *
 * Dipakai oleh Lenis (skip smooth-scroll di device low-end) dan oleh
 * `initPerfMode()` (menambah class `.perf-low` di <html> supaya CSS bisa
 * menurunkan biaya render — backdrop-blur, blur besar, dll — tanpa
 * mengubah desain, cuma menurunkan "kualitas efek" pada device yang
 * memang tidak sanggup, mis. Oppo A83 / Android RAM kecil.
 */

export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.matchMedia('(pointer: coarse)').matches || navigator.maxTouchPoints > 0
  );
}

export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Heuristik "kentang": RAM kecil (deviceMemory API, dibatasi browser tapi
 * device 2–3GB biasanya melaporkan <=4) atau CPU core sedikit, atau UA
 * jelas-jelas Android versi lama (banyak dipakai di device sekelas Oppo A83).
 */
export function isLowPowerDevice(): boolean {
  if (typeof navigator === 'undefined') return false;

  const mem = (navigator as Navigator & { deviceMemory?: number }).deviceMemory;
  const cores = navigator.hardwareConcurrency ?? 8;
  const ua = navigator.userAgent || '';

  const lowMemory = typeof mem === 'number' && mem <= 4;
  const lowCores = cores <= 4;
  const oldAndroid = /Android\s(4|5|6|7|8)\b/.test(ua);

  return lowMemory || lowCores || oldAndroid;
}

let applied = false;

/**
 * Tandai <html> dengan class perf sesuai kemampuan device. Aman dipanggil
 * berkali-kali (no-op setelah pertama). Panggil sedini mungkin (main.tsx)
 * supaya CSS perf-low sudah aktif sebelum paint pertama.
 */
export function initPerfMode(): void {
  if (typeof document === 'undefined' || applied) return;
  applied = true;

  const root = document.documentElement;

  if (prefersReducedMotion()) {
    root.classList.add('perf-reduced-motion');
  }

  if (isLowPowerDevice()) {
    root.classList.add('perf-low');
  }
}
