import Link from 'next/link';
import type { Article } from '@/lib/types';
import { formatDate, getCategoryLabel } from '@/lib/utils';

export function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card">
      <img src={article.image} alt={article.title} className="card-image" />
      <div className="card-body">
        <div className="card-meta">
          <span className="pill">{getCategoryLabel(article.category)}</span>
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
        <h2>{article.title}</h2>
        <p>{article.excerpt}</p>
        <div className="card-actions">
          <Link href={`/articolo/${article.id}`} className="button primary">
            Apri dettaglio
          </Link>
          <a href={article.link} target="_blank" rel="noreferrer" className="button ghost">
            Fonte originale
          </a>
        </div>
      </div>
    </article>
  );
}
