import Link from 'next/link';
import { Header } from '@/components/Header';

export default function NotFound() {
  return (
    <main className="container">
      <Header />

      <section className="empty-state">
        <h1>Pagina non trovata</h1>
        <p>La notizia che stai cercando non è disponibile o non esiste più.</p>
        <Link href="/" className="button primary">
          Torna alla home
        </Link>
      </section>
    </main>
  );
}
