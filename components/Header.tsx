'use client';

import Link from 'next/link';
import { ThemeToggle } from '@/components/ThemeToggle';

const menuItems = [
  { label: 'Politica', anchor: '#politica' },
  { label: 'Cronaca', anchor: '#cronaca' },
  { label: 'Economia', anchor: '#economia' },
  { label: 'Sport', anchor: '#sport' },
  { label: 'Tecnologia', anchor: '#tecnologia' },
  { label: 'Mondo', anchor: '#mondo' },
];

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

        <nav className="top-menu">
          {menuItems.map((item) => (
            <a key={item.label} href={item.anchor}>
              {item.label}
            </a>
          ))}
        </nav>
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
