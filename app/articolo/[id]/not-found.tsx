import Link from 'next/link';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <main className="container">
      <Header />
      <section className="empty-state large">
        <h1>Articolo non trovato</h1>
        <p>Potrebbe essere uscito dal feed RSS. Torna alla home per aggiornare l’elenco.</p>
        <Link href="/" className="button primary">
          Vai alla home
        </Link>
      </section>
    </main>
  );
}
