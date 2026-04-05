import { Header } from '@/components/Header';
import { NewsGrid } from '@/components/NewsGrid';
import { getNews, getCategoryLabel } from '@/lib/utils';

const categories = [
  { key: 'top', title: 'In evidenza' },
  { key: 'tech', title: 'Tecnologia' },
  { key: 'business', title: 'Economia' },
  { key: 'world', title: 'Mondo' },
] as const;

export default async function HomePage() {
  const [top, tech, business, world] = await Promise.all([
    getNews('top'),
    getNews('tech'),
    getNews('business'),
    getNews('world'),
  ]);

  const sections = [top, tech, business, world];
  const featured = top.slice(0, 6);

  return (
    <main className="container">
      <Header />

      <section className="hero">
        <div>
          <span className="hero-badge">Next.js + Vercel</span>
          <h1>Il tuo sito news moderno, già pronto per la pubblicazione.</h1>
          <p>
            VistaNotizie aggrega feed RSS reali, mostra immagini dinamiche, apre una pagina dettaglio per ogni
            articolo e genera un riassunto AI direttamente dal server.
          </p>
        </div>
        <div className="hero-panel">
          <div>
            <strong>{featured.length}</strong>
            <span>notizie in primo piano</span>
          </div>
          <div>
            <strong>4</strong>
            <span>sezioni tematiche</span>
          </div>
          <div>
            <strong>AI</strong>
            <span>riassunti on demand</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Prime notizie</h2>
          <p>Le più recenti da fonti RSS reali.</p>
        </div>
        <NewsGrid articles={featured} />
      </section>

      {sections.map((articles, index) => (
        <section className="section-block" key={categories[index].key}>
          <div className="section-heading">
            <h2>{getCategoryLabel(categories[index].key)}</h2>
            <p>Aggiornamento automatico con revalidazione server-side.</p>
          </div>
          <NewsGrid articles={articles.slice(0, 6)} />
        </section>
      ))}
    </main>
  );
}
