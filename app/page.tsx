import NewsClient from "@/components/NewsClient";

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
        <p className="eyebrow">Notizie reali</p>
        <h2>Feed aggiornato da fonti esterne</h2>
        <p>
          La homepage carica le notizie dall&apos;API interna e mostra titoli, riassunti,
          categorie e link alla fonte.
        </p>
      </section>

      <NewsClient />

      <p className="note">
        Nota: i contenuti arrivano dall&apos;endpoint API del progetto.
      </p>
    </main>
  );
}
