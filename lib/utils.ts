import { XMLParser } from 'fast-xml-parser';
import type { Article, NewsCategory } from '@/lib/types';
import { FEEDS } from '@/lib/feeds';

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: '',
  trimValues: true,
  parseTagValue: false,
});

function ensureArray<T>(value: T | T[] | undefined | null): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function stripHtml(input: string): string {
  return input
    .replace(/<!\[CDATA\[|\]\]>/g, '')
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text: string, max = 120): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

function extractImageFromHtml(html: string): string | null {
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return match?.[1] ?? null;
}

function normalizeDate(input?: string): string {
  if (!input) return new Date().toISOString();
  const parsed = new Date(input);
  return Number.isNaN(parsed.getTime()) ? new Date().toISOString() : parsed.toISOString();
}

function buildId(link: string): string {
  return Buffer.from(link).toString('base64url');
}

function fallbackImage(title: string, category: string): string {
  const params = new URLSearchParams({ title, category });
  return `/api/og?${params.toString()}`;
}

function cleanForCompare(text: string): string {
  return stripHtml(text)
    .toLowerCase()
    .replace(/[^\w\sàèéìòù]/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function removeSourceFromGoogleTitle(title: string): string {
  return title.replace(/\s-\s[^-]+$/g, '').trim();
}

function summaryFromFields(...values: Array<string | undefined>): string {
  const parts = values
    .filter(Boolean)
    .map((value) => stripHtml(String(value)))
    .filter(Boolean);

  const uniqueParts = [...new Set(parts)];

  const joined = uniqueParts
    .join(' ')
    .replace(/\s+/g, ' ')
    .trim();

  return truncate(joined || '');
}

function isRepeatedText(title: string, excerpt: string): boolean {
  const cleanTitle = cleanForCompare(removeSourceFromGoogleTitle(title));
  const cleanExcerpt = cleanForCompare(excerpt);

  if (!cleanExcerpt) return true;
  if (cleanTitle === cleanExcerpt) return true;
  if (cleanTitle.includes(cleanExcerpt)) return true;
  if (cleanExcerpt.includes(cleanTitle)) return true;

  const titleWords = cleanTitle.split(' ').filter((word) => word.length > 3);
  const commonWords = titleWords.filter((word) => cleanExcerpt.includes(word));

  return commonWords.length >= Math.min(5, titleWords.length);
}

function normalizeItem(item: any, source: string, category: NewsCategory): Article | null {
  const rawTitle = stripHtml(item.title || 'Senza titolo');
  const cleanTitle = removeSourceFromGoogleTitle(rawTitle);

  const link = item.link || item.guid || '';
  if (!link) return null;

  const description = item.description || item.summary || item['content:encoded'] || '';
  const content = item['content:encoded'] || item.content || item.description || '';

  const mediaCandidates = [
    item.enclosure?.url,
    item['media:content']?.url,
    ensureArray(item['media:thumbnail'])[0]?.url,
    extractImageFromHtml(description),
    extractImageFromHtml(content),
  ].filter(Boolean) as string[];

  const rawExcerpt = summaryFromFields(description, content);
  const contentText = stripHtml(content || description || cleanTitle);

  const finalExcerpt = isRepeatedText(cleanTitle, rawExcerpt) ? '' : rawExcerpt;

  return {
    id: buildId(link),
    title: cleanTitle,
    link,
    source,
    category,
    publishedAt: normalizeDate(item.pubDate || item.published || item.updated),
    image: mediaCandidates[0] || fallbackImage(cleanTitle, category),
    excerpt: finalExcerpt,
    content: contentText,
  };
}

function extractItems(parsed: any): any[] {
  const rssItems = parsed?.rss?.channel?.item;
  if (rssItems) return ensureArray(rssItems);

  const atomEntries = parsed?.feed?.entry;
  if (!atomEntries) return [];

  return ensureArray(atomEntries).map((entry: any) => ({
    title: entry.title,
    link: typeof entry.link === 'string' ? entry.link : entry.link?.href || ensureArray(entry.link)[0]?.href,
    pubDate: entry.updated || entry.published,
    description: entry.summary,
    content: entry.content,
  }));
}

async function fetchFeed(url: string, source: string, category: NewsCategory): Promise<Article[]> {
  try {
    const response = await fetch(url, {
      next: { revalidate: 900 },
      headers: {
        'User-Agent': 'VistaNotizie/1.0',
        Accept: 'application/rss+xml, application/xml, text/xml;q=0.9, */*;q=0.8',
      },
    });

    if (!response.ok) return [];

    const xml = await response.text();
    const parsed = parser.parse(xml);
    const items = extractItems(parsed);

    return items
      .map((item) => normalizeItem(item, source, category))
      .filter(Boolean) as Article[];
  } catch {
    return [];
  }
}

export async function getNews(category?: NewsCategory): Promise<Article[]> {
  const maxItems = Number(process.env.RSS_MAX_ITEMS || 120);
  const feeds = category ? FEEDS.filter((feed) => feed.category === category) : FEEDS;

  const all = (
    await Promise.all(
      feeds.map((feed) => fetchFeed(feed.url, feed.source, feed.category)),
    )
  ).flat();

  const unique = new Map<string, Article>();

  for (const article of all) {
    const normalizedTitle = cleanForCompare(article.title);
    const key = `${normalizedTitle.slice(0, 80)}-${article.category}`;

    if (!unique.has(key)) {
      unique.set(key, article);
    }
  }

  return [...unique.values()]
    .sort((a, b) => +new Date(b.publishedAt) - +new Date(a.publishedAt))
    .slice(0, maxItems);
}

export async function getArticleById(id: string): Promise<Article | null> {
  const articles = await getNews();
  return articles.find((article) => article.id === id) || null;
}

export function formatDate(date: string): string {
  return new Intl.DateTimeFormat('it-IT', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(date));
}

export function getCategoryLabel(category: NewsCategory): string {
  return {
    top: 'In evidenza',
    politica: 'Politica',
    cronaca: 'Cronaca',
    economia: 'Economia',
    sport: 'Sport',
    tecnologia: 'Tecnologia',
    mondo: 'Mondo',
  }[category];
}

export function localSummary(text: string): string {
  const cleaned = stripHtml(text).replace(/\s+/g, ' ').trim();

  if (!cleaned) {
    return 'Nessun contenuto disponibile per il riassunto.';
  }

  const sentences = cleaned
    .split(/(?<=[.!?])\s+/)
    .map((sentence) => sentence.trim())
    .filter((sentence) => sentence.length > 25);

  if (sentences.length === 0) {
    return truncate(cleaned, 280);
  }

  return truncate(sentences.slice(0, 3).join(' '), 420);
}
