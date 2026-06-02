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
    url: 'https://news.google.com/rss/search?q=politica&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Politica',
    category: 'politica',
  },
  {
    url: 'https://news.google.com/rss/search?q=cronaca&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Cronaca',
    category: 'cronaca',
  },
  {
    url: 'https://news.google.com/rss/search?q=economia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Economia',
    category: 'economia',
  },
  {
    url: 'https://news.google.com/rss/search?q=sport&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Sport',
    category: 'sport',
  },
  {
    url: 'https://news.google.com/rss/search?q=tecnologia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Tecnologia',
    category: 'tecnologia',
  },
  {
    url: 'https://news.google.com/rss/search?q=mondo&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Mondo',
    category: 'mondo',
  },
  {
    url: 'https://www.ansa.it/sito/ansait_rss.xml',
    source: 'ANSA',
    category: 'top',
  },
];
