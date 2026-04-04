import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main className="shell articlePage">
      <header className="topbar">
        <div className="brand">
          <div className="logo">V</div>
          <div>
            <h1>VistaNotizie</h1>
            <p>Pagina non trovata</p>
          </div>
        </div>
      </header>

      <section className="articleCard">
        <div className="articleBody">
          <p className="eyebrow">Errore 404</p>
          <h2 className="articleTitle">La pagina che cerchi non esiste oppure non e piu disponibile</h2>
          <p className="articleSummary">
            Puoi tornare alla homepage e continuare a consultare le ultime notizie.
          </p>

          <div className="heroCtas">
            <Link href="/" className="primaryButton">
              Torna alla home
            </Link>
            <Link href="/api/news" className="ghostButton">
              Apri feed JSON
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}