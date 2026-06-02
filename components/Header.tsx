'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

export function Header() {
  return (
    <header className="site-header">
      <div>
        <Link href="/" className="brand">
          VistaNotizie
        </Link>
        <p className="brand-subtitle">
          Cronaca, economia, tecnologia e attualità in tempo reale.
        </p>
      </div>

      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
        <button
          type="button"
          className="button ghost"
          onClick={() => window.location.reload()}
        >
          Aggiorna
        </button>
        <ThemeToggle />
      </div>
    </header>
  );
}
