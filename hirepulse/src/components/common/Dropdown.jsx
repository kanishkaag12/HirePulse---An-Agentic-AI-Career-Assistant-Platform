import { useCallback, useRef, useState } from 'react';
import useClickOutside from '../../hooks/useClickOutside';

export default function Dropdown({ trigger, children, align = 'right', width = 'w-64' }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const close = useCallback(() => setOpen(false), []);
  const toggle = useCallback(() => setOpen((o) => !o), []);

  useClickOutside(ref, close, open);

  return (
    <div ref={ref} className="relative">
      {trigger({ open, toggle })}
      {open && (
        <div
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} z-40 mt-2 ${width} max-w-[calc(100vw-2rem)] animate-fade-in overflow-hidden rounded-2xl border border-line bg-surface shadow-xl`}
        >
          {typeof children === 'function' ? children({ close }) : children}
        </div>
      )}
    </div>
  );
}
