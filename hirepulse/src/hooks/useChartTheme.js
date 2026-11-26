import { useApp } from '../context/AppContext';

// Recharts needs literal colors, so pick them from the active theme.
export default function useChartTheme() {
  const { resolvedTheme } = useApp();
  const dark = resolvedTheme === 'dark';

  return {
    primary: '#6366f1',
    secondary: '#8b5cf6',
    grid: dark ? '#272c3c' : '#e4e7ef',
    axis: dark ? '#949cb2' : '#64748b',
    empty: dark ? '#272c3c' : '#e4e7ef',
  };
}
