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
          News reali da RSS, riassunti AI, immagini dinamiche e lettura pronta per Vercel.
        </p>
      </div>
      <ThemeToggle />
    </header>
  );
}
