import type { NewsCategory } from '@/lib/types';

export interface FeedConfig {
  url: string;
  source: string;
  category: NewsCategory;
}

export const FEEDS: FeedConfig[] = [
  {
    url: 'https://www.ansa.it/sito/notizie/topnews/topnews_rss.xml',
    source: 'ANSA · Top News',
    category: 'top',
  },
  {
    url: 'https://www.ansa.it/sito/notizie/politica/politica_rss.xml',
    source: 'ANSA · Politica',
    category: 'politica',
  },
  {
    url: 'https://www.ansa.it/sito/notizie/cronaca/cronaca_rss.xml',
    source: 'ANSA · Cronaca',
    category: 'cronaca',
  },
  {
    url: 'https://www.ansa.it/sito/notizie/economia/economia_rss.xml',
    source: 'ANSA · Economia',
    category: 'economia',
  },
  {
    url: 'https://www.ansa.it/sito/notizie/sport/sport_rss.xml',
    source: 'ANSA · Sport',
    category: 'sport',
  },
  {
    url: 'https://www.ansa.it/canale_tecnologia/notizie/tecnologia_rss.xml',
    source: 'ANSA · Tecnologia',
    category: 'tecnologia',
  },
  {
    url: 'https://www.ansa.it/sito/notizie/mondo/mondo_rss.xml',
    source: 'ANSA · Mondo',
    category: 'mondo',
  },
];
