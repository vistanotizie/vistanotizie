import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SummaryPanel } from '@/components/SummaryPanel';
import { formatDate, getArticleById, getCategoryLabel } from '@/lib/utils';

export default async function ArticlePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    notFound();
  }

  return (
    <main className="container detail-page">
      <Header />

      <div className="detail-topbar">
        <Link href="/" className="button ghost">
          ← Torna alla home
        </Link>
      </div>

      <article className="detail-card">
        <img src={article.image} alt={article.title} className="detail-image" />
        <div className="detail-content">
          <div className="card-meta">
            <span className="pill">{getCategoryLabel(article.category)}</span>
            <span>{article.source}</span>
            <span>{formatDate(article.publishedAt)}</span>
          </div>
          <h1>{article.title}</h1>
          <p className="lead">{article.excerpt}</p>
          <div className="article-copy">
            <p>{article.content}</p>
          </div>
          <div className="card-actions">
            <a href={article.link} target="_blank" rel="noreferrer" className="button primary">
              Leggi la fonte originale
            </a>
          </div>
        </div>
      </article>

      <SummaryPanel title={article.title} content={article.content || article.excerpt} />
    </main>
  );
}
