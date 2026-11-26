const SIZES = {
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-20 w-20 text-2xl',
};

export default function Avatar({ name = '', src, size = 'md' }) {
  const initials =
    name
      .split(' ')
      .filter(Boolean)
      .slice(0, 2)
      .map((part) => part[0].toUpperCase())
      .join('') || '?';

  if (src) {
    return <img src={src} alt={name} className={`${SIZES[size]} shrink-0 rounded-full object-cover`} />;
  }

  return (
    <span
      className={`${SIZES[size]} grid shrink-0 place-items-center rounded-full bg-gradient-to-br from-brand-500 to-violet-500 font-semibold text-white`}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}
