import type { NewsCategory } from '@/lib/types';

export interface FeedConfig {
  url: string;
  source: string;
  category: NewsCategory;
}

export const FEEDS: FeedConfig[] = [
  {
    url: 'https://news.google.com/rss?hl=it&gl=IT&ceid=IT:it',
    source: 'Google News Italia',
    category: 'top',
  },
  {
    url: 'https://news.google.com/rss/search?q=tecnologia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Tecnologia',
    category: 'tech',
  },
  {
    url: 'https://news.google.com/rss/search?q=economia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Economia',
    category: 'business',
  },
  {
    url: 'https://news.google.com/rss/search?q=mondo&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Mondo',
    category: 'world',
  },
  {
    url: 'https://www.ansa.it/sito/ansait_rss.xml',
    source: 'ANSA',
    category: 'top',
  },
];
