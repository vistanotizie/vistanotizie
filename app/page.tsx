import NewsClient from "@/components/NewsClient";
import { mockNews } from "@/lib/mock-news";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo">V</div>
          <div>
            <h1>VistaNotizie</h1>
            <p>Le notizie del momento, spiegate bene e ordinate per città</p>
          </div>
        </div>

        <a href="/api/news" className="chip">API demo</a>
      </header>

      <section className="hero">
        <p className="eyebrow">Versione pubblicabile</p>
        <h2>News app responsive pronta per essere collegata a fonti reali, AI e database</h2>
        <p>
          Questa base è pronta per GitHub e Vercel. Ha già filtri per categoria e città,
          card responsive, route API demo e link fonte visibile in piccolo sotto ogni notizia.
        </p>
      </section>

      <NewsClient items={mockNews} />

      <p className="note">
        Nota: i contenuti inclusi sono dimostrativi. Per la produzione conviene usare l&apos;AI
        per classificazione, deduplicazione e riassunto, mantenendo sempre il link alla fonte originale.
      </p>
    </main>
  );
}
