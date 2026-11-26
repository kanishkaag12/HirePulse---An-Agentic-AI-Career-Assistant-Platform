import { useEffect } from 'react';

// Calls `handler` on a click/touch outside `ref` or when Escape is pressed.
export default function useClickOutside(ref, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return undefined;

    const onPointer = (event) => {
      if (ref.current && !ref.current.contains(event.target)) handler(event);
    };
    const onKey = (event) => {
      if (event.key === 'Escape') handler(event);
    };

    document.addEventListener('mousedown', onPointer);
    document.addEventListener('touchstart', onPointer);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onPointer);
      document.removeEventListener('touchstart', onPointer);
      document.removeEventListener('keydown', onKey);
    };
  }, [ref, handler, enabled]);
}
