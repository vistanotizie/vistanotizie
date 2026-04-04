import Link from "next/link";
import { notFound } from "next/navigation";
import type { NewsItem } from "@/lib/types";

type NewsItemWithSlug = NewsItem & {
  slug?: string;
};

async function getNews(): Promise<NewsItemWithSlug[]> {
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

export default async function NewsDetailPage({
  params
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const items = await getNews();
  const article = items.find((item) => item.slug === slug);

  if (!article) {
    notFound();
  }

  return (
    <main className="shell articlePage">
      <header className="topbar">
        <div className="brand">
          <div className="logo">V</div>
          <div>
            <h1>VistaNotizie</h1>
            <p>Dettaglio notizia</p>
          </div>
        </div>

        <div className="topbarActions">
          <Link href="/" className="chip secondaryChip">
            Torna alla home
          </Link>
        </div>
      </header>

      <article className="articleCard">
        <div className="articleMedia">
          <img src={article.image} alt={article.title} />
        </div>

        <div className="articleBody">
          <div className="articleMeta">
            <span className="badge staticBadge">{article.category}</span>
            <span>{article.city}</span>
            <span>•</span>
            <span>{article.date}</span>
          </div>

          <h2 className="articleTitle">{article.title}</h2>

          <p className="articleSummary">{article.summary}</p>

          <div className="tags">
            {article.tags.map((tag) => (
              <span key={tag} className="tag">
                {tag}
              </span>
            ))}
          </div>

          <div className="articleSourceBox">
            <p>
              <strong>Fonte:</strong> {article.sourceName}
            </p>
            <a className="primaryButton" href={article.sourceUrl} target="_blank" rel="noreferrer">
              Vai alla notizia originale
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}