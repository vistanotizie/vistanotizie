import NewsClient from "@/components/NewsClient";
import type { NewsItem } from "@/lib/types";

async function getNews(): Promise<NewsItem[]> {
  const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";

  try {
    const response = await fetch(`${baseUrl}/api/news`, {
      cache: "no-store"
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.items || [];
  } catch {
    return [];
  }
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
        <p className="eyebrow">Notizie reali</p>
        <h2>Feed aggiornato da fonti esterne</h2>
        <p>
          La homepage legge le notizie dall&apos;API interna e mostra titoli, riassunti,
          categorie e link alla fonte.
        </p>
      </section>

      <NewsClient items={items} />

      <p className="note">
        Nota: i contenuti arrivano dall&apos;endpoint API del progetto.
      </p>
    </main>
  );
}
