import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Header } from '@/components/Header';
import { SummaryPanel } from '@/components/SummaryPanel';
import { formatDate, getArticleById, getCategoryLabel } from '@/lib/utils';

type PageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const article = await getArticleById(id);

  if (!article) {
    return {
      title: 'Articolo non trovato | VistaNotizie',
      description: 'L’articolo richiesto non è disponibile.',
    };
  }

  const siteUrl = 'https://vistanotizie.it';
  const pageUrl = `${siteUrl}/articolo/${article.id}`;

  return {
    title: `${article.title} | VistaNotizie`,
    description: article.excerpt,
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: pageUrl,
      siteName: 'VistaNotizie',
      locale: 'it_IT',
      type: 'article',
      publishedTime: article.publishedAt,
      images: [
        {
          url: article.image,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.excerpt,
      images: [article.image],
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
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
            <a
              href={article.link}
              target="_blank"
              rel="noreferrer"
              className="button primary"
            >
              Leggi la fonte originale
            </a>
          </div>
        </div>
      </article>

      <SummaryPanel title={article.title} content={article.content || article.excerpt} />
    </main>
  );
}
