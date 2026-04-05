import type { Article } from '@/lib/types';
import { ArticleCard } from '@/components/ArticleCard';

export function NewsGrid({ articles }: { articles: Article[] }) {
  if (articles.length === 0) {
    return <div className="empty-state">Nessuna notizia disponibile al momento.</div>;
  }

  return (
    <section className="grid">
      {articles.map((article) => (
        <ArticleCard key={article.id} article={article} />
      ))}
    </section>
  );
}
