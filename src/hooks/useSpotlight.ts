import { useCallback, type PointerEvent } from 'react';

/**
 * Returns a pointer-move handler that writes the cursor position into the
 * element's --mx / --my CSS variables, used by the `.spotlight` class.
 */
const useSpotlight = <T extends HTMLElement>() =>
  useCallback((e: PointerEvent<T>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - rect.left}px`);
    el.style.setProperty('--my', `${e.clientY - rect.top}px`);
  }, []);

export default useSpotlight;
