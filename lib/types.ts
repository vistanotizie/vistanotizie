export type NewsCategory = 'top' | 'tech' | 'business' | 'world';

export interface Article {
  id: string;
  title: string;
  link: string;
  source: string;
  category: NewsCategory;
  publishedAt: string;
  image: string;
  excerpt: string;
  content: string;
}
