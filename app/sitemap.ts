import type { MetadataRoute } from 'next';
import { getNews } from '@/lib/utils';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = 'https://vistanotizie.it';
  const articles = await getNews();

  return [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'hourly',
      priority: 1,
    },
    ...articles.map((article) => ({
      url: `${siteUrl}/articolo/${article.id}`,
      lastModified: new Date(article.publishedAt),
      changeFrequency: 'hourly' as const,
      priority: 0.8,
    })),
  ];
}
