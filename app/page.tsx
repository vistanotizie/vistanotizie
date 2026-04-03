import NewsClient from "@/components/NewsClient";
import type { NewsItem } from "@/lib/types";

async function getNews(): Promise<NewsItem[]> {
  const baseUrl =
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000";

  const response = await fetch(`${baseUrl}/api/news`, {
    cache: "no-store"
  });

  if (!response.ok) {
    return [];
  }

  const data = await response.json();
  return data.items || [];
}

export default async function HomePage() {
  const items = await getNews();

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

      <NewsClient items={items} />

      <p className="note">
        Nota: i contenuti inclusi sono mostrati tramite API. Per la produzione conviene usare l&apos;AI
        per classificazione, deduplicazione e riassunto, mantenendo sempre il link alla fonte originale.
      </p>
    </main>
  );
}