import { NextResponse } from "next/server";

const RSS_FEEDS = [
  "https://www.ansa.it/sito/ansait_rss.xml",
  "https://www.repubblica.it/rss/homepage/rss2.0.xml",
  "https://www.ilsole24ore.com/rss/italia.xml"
];

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

async function fetchRSS(url: string) {
  const res = await fetch(url);
  const text = await res.text();

  const items = text.split("<item>").slice(1);

  return items.map((item, index) => {
    const title = item.match(/<title>(.*?)<\/title>/)?.[1] || "";
    const link = item.match(/<link>(.*?)<\/link>/)?.[1] || "";
    const description = item.match(/<description>(.*?)<\/description>/)?.[1] || "";

    return {
      id: Math.random(),
      title: stripHtml(title),
      summary: stripHtml(description).slice(0, 200),
      category: "cronaca",
      city: "Italia",
      date: new Date().toISOString(),
      sourceName: new URL(link).hostname,
      sourceUrl: link,
      image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg",
      tags: ["news"]
    };
  });
}

export async function GET() {
  const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
  const allNews = results.flat().slice(0, 20);

  return NextResponse.json({
    ok: true,
    items: allNews
  });
}