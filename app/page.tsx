import { Header } from '@/components/Header';
import { NewsGrid } from '@/components/NewsGrid';
import { getNews, getCategoryLabel } from '@/lib/utils';

const categories = [
  { key: 'top', title: 'In evidenza' },
  { key: 'politica', title: 'Politica' },
  { key: 'cronaca', title: 'Cronaca' },
  { key: 'economia', title: 'Economia' },
  { key: 'sport', title: 'Sport' },
  { key: 'tecnologia', title: 'Tecnologia' },
  { key: 'mondo', title: 'Mondo' },
] as const;

export default async function HomePage() {
const [
  top,
  politica,
  cronaca,
  economia,
  sport,
  tecnologia,
  mondo,
] = await Promise.all([
  getNews('top'),
  getNews('politica'),
  getNews('cronaca'),
  getNews('economia'),
  getNews('sport'),
  getNews('tecnologia'),
  getNews('mondo'),
]);

const sections = [
  top,
  politica,
  cronaca,
  economia,
  sport,
  tecnologia,
  mondo,
];
  const featured = top.slice(0, 6);

  return (
    <main className="container">
      <Header />

      <section className="hero">
        <div>
          <span className="hero-badge">Aggiornamento continuo</span>
          
          <h1>Le ultime notizie dall'Italia e dal mondo</h1>
          
          <p>
            Cronaca, economia, tecnologia e attualità raccolte dalle principali fonti informative,
            aggiornate automaticamente durante la giornata.
          </p>
        </div>
        <div className="hero-panel">
          <div>
            <strong>{featured.length}</strong>
            <span>notizie in primo piano</span>
          </div>
          <div>
            <strong>24/7</strong>
            <span>aggiornamento continuo</span>
          </div>
          <div>
            <strong>Fonti</strong>
            <span>selezionate e aggiornate</span>
          </div>
        </div>
      </section>

      <section className="section-block">
        <div className="section-heading">
          <h2>Prime notizie</h2>
          <p>Le notizie più recenti selezionate dalle fonti disponibili.</p>
        </div>
        <NewsGrid articles={featured} />
      </section>

      {sections.map((articles, index) => (
        <section className="section-block" key={categories[index].key}>
          <div className="section-heading">
            <h2>{getCategoryLabel(categories[index].key)}</h2>
            <p>Le ultime notizie della categoria.</p>
          </div>
          <NewsGrid articles={articles.slice(0, 6)} />
        </section>
      ))}
    </main>
  );
}
