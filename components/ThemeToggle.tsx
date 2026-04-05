'use client';

import { useTheme } from '@/components/ThemeProvider';

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button className="theme-toggle" onClick={toggleTheme} aria-label="Cambia tema">
      {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
    </button>
  );
}
