import { useEffect } from 'react';
import { destroyLenis, initLenis } from '../lib/lenis';

/**
 * Mount global Lenis smooth scrolling for the current page.
 * - Soft, stable wheel/touch interpolation
 * - Pauses when tab is hidden
 * - Auto-resizes for lazy-loaded sections
 * - Anchor links scroll with navbar offset
 */
export function useLenis() {
  useEffect(() => {
    const destroy = initLenis();
    return () => {
      destroy();
      // Ensure full teardown on route leave (e.g. / → /admin)
      destroyLenis();
    };
  }, []);
}

export default useLenis;
