import NewsClient from "@/components/NewsClient";

export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div className="brand">
          <div className="logo">V</div>
          <div>
            <h1>VistaNotizie</h1>
            <p>Notizie aggiornate, ordinate per argomento e citta</p>
          </div>
        </div>

        <div className="topbarActions">
          <a href="/api/news" className="chip secondaryChip">
            API news
          </a>
        </div>
      </header>

      <section className="hero heroGrid">
        <div className="heroMain">
          <p className="eyebrow">VistaNotizie</p>
          <h2>Le notizie del momento, in una pagina piu chiara e piu leggibile</h2>
          <p className="heroLead">
            VistaNotizie raccoglie notizie aggiornate da fonti esterne, le organizza
            per categoria e ti permette di filtrare rapidamente i contenuti per citta
            e argomento.
          </p>

          <div className="heroCtas">
            <a href="#news-section" className="primaryButton">
              Vai alle notizie
            </a>
            <a href="/api/news" className="ghostButton">
              Apri feed JSON
            </a>
          </div>
        </div>

        <div className="heroSide">
          <div className="miniStatCard">
            <span className="miniStatLabel">Aggiornamento</span>
            <strong>Feed live da RSS</strong>
            <p>Le notizie arrivano dall&apos;API interna del progetto.</p>
          </div>

          <div className="miniStatCard">
            <span className="miniStatLabel">Focus</span>
            <strong>Mobile + Desktop</strong>
            <p>Layout studiato per consultazione rapida anche da iPhone.</p>
          </div>

          <div className="miniStatCard">
            <span className="miniStatLabel">Prossimo step</span>
            <strong>AI + riassunti migliori</strong>
            <p>Classificazione e sintesi possono essere migliorate ulteriormente.</p>
          </div>
        </div>
      </section>

      <section className="infoStrip">
        <div className="infoCard">
          <span className="infoTitle">Categorie</span>
          <span className="infoText">Politica, cronaca, sport, economia, locale</span>
        </div>
        <div className="infoCard">
          <span className="infoTitle">Filtro</span>
          <span className="infoText">Ricerca testuale e selezione citta</span>
        </div>
        <div className="infoCard">
          <span className="infoTitle">Fonti</span>
          <span className="infoText">Link diretto sempre visibile in fondo card</span>
        </div>
      </section>

      <section id="news-section" className="newsSection">
        <div className="sectionHeading">
          <div>
            <p className="sectionEyebrow">Homepage</p>
            <h3>Ultime notizie</h3>
          </div>
          <p className="sectionDescription">
            Filtra il flusso per categoria, citta o parole chiave.
          </p>
        </div>

        <NewsClient />
      </section>

      <footer className="siteFooter">
        <div>
          <strong>VistaNotizie</strong>
          <p>
            Progetto in evoluzione. Le notizie mostrano sempre il collegamento alla
            fonte originale.
          </p>
        </div>

        <div className="footerLinks">
          <a href="/api/news">Feed JSON</a>
          <a href="#news-section">Torna alle notizie</a>
        </div>
      </footer>
    </main>
  );
}
