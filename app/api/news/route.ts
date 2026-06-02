import { NextResponse } from 'next/server';
import { getNews } from '@/lib/utils';
import type { NewsCategory } from '@/lib/types';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const categoryParam = searchParams.get('category');

  const validCategories: NewsCategory[] = [
    'top',
    'politica',
    'cronaca',
    'economia',
    'sport',
    'tecnologia',
    'mondo',
  ];

  const category = validCategories.includes(categoryParam as NewsCategory)
    ? (categoryParam as NewsCategory)
    : undefined;

  const articles = await getNews(category);

  return NextResponse.json({ articles });
}
