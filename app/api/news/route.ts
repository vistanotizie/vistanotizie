import { NextResponse } from 'next/server';
import { getNews } from '@/lib/utils';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const categoryParam = searchParams.get('category');
  const category = categoryParam === 'top' || categoryParam === 'tech' || categoryParam === 'business' || categoryParam === 'world'
    ? categoryParam
    : undefined;

  const articles = await getNews(category);
  return NextResponse.json({ articles });
}
