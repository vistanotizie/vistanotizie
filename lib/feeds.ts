import type { NewsCategory } from '@/lib/types';

export interface FeedConfig {
  url: string;
  source: string;
  category: NewsCategory;
}

export const FEEDS: FeedConfig[] = [
  // TOP NEWS

  {
    url: 'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml',
    source: 'ANSA · Top News',
    category: 'top',
  },

  // POLITICA

  {
    url: 'https://www.ansa.it/sito/notizie/politica/politica_rss.xml',
    source: 'ANSA · Politica',
    category: 'politica',
  },
  {
    url: 'https://news.google.com/rss/search?q=politica%20Italia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Politica',
    category: 'politica',
  },

  // CRONACA

  {
    url: 'https://www.ansa.it/sito/notizie/cronaca/cronaca_rss.xml',
    source: 'ANSA · Cronaca',
    category: 'cronaca',
  },
  {
    url: 'https://news.google.com/rss/search?q=cronaca%20Italia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Cronaca',
    category: 'cronaca',
  },

  // ECONOMIA

  {
    url: 'https://www.ansa.it/sito/notizie/economia/economia_rss.xml',
    source: 'ANSA · Economia',
    category: 'economia',
  },
  {
    url: 'https://news.google.com/rss/search?q=economia%20Italia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Economia',
    category: 'economia',
  },

  // SPORT

  {
    url: 'https://www.ansa.it/sito/notizie/sport/sport_rss.xml',
    source: 'ANSA · Sport',
    category: 'sport',
  },
  {
    url: 'https://news.google.com/rss/search?q=sport%20Italia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Sport',
    category: 'sport',
  },

  // TECNOLOGIA

  {
    url: 'https://www.ansa.it/canale_tecnologia/notizie/tecnologia_rss.xml',
    source: 'ANSA · Tecnologia',
    category: 'tecnologia',
  },
  {
    url: 'https://news.google.com/rss/search?q=tecnologia%20Italia&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Tecnologia',
    category: 'tecnologia',
  },

  // MONDO

  {
    url: 'https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml',
    source: 'ANSA · Mondo',
    category: 'mondo',
  },
  {
    url: 'https://news.google.com/rss/search?q=esteri%20mondo&hl=it&gl=IT&ceid=IT:it',
    source: 'Google News · Mondo',
    category: 'mondo',
  },
];
