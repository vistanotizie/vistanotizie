import { NextResponse } from "next/server";
import type { Category, NewsItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const RSS_FEEDS = [
  "https://www.ansa.it/sito/ansait_rss.xml",
  "https://www.repubblica.it/rss/homepage/rss2.0.xml",
  "https://www.ilsole24ore.com/rss/italia.xml"
];

function stripHtml(html: string) {
  return html
    .replace(/<!\\[CDATA\\[(.*?)\\]\\]>/g, "$1")
    .replace(/<[^>]*>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extractTag(item: string, tag: string) {
  const match = item.match(new RegExp(`<${tag}>([\\s\\S]*?)<\\/${tag}>`, "i"));
  return match ? match[1].trim() : "";
}

function guessCategory(sourceName: string, title: string): Category {
  const text = `${sourceName} ${title}`.toLowerCase();

  if (text.includes("sport")) return "sport";
  if (text.includes("borsa") || text.includes("economia") || text.includes("finanza")) return "economia";
  if (text.includes("governo") || text.includes("parlamento") || text.includes("politica")) return "politica";
  if (text.includes("locale") || text.includes("comune") || text.includes("citta")) return "locale";
  return "cronaca";
}

async function fetchRSS(url: string): Promise<NewsItem[]> {
  try {
    const res = await fetch(url, {
      headers: {
        "user-agent": "Mozilla/5.0 VistaNotizie"
      },
      cache: "no-store"
    });

    if (!res.ok) {
      return [];
    }

    const text = await res.text();
    const items = text.split("<item>").slice(1);

    return items.slice(0, 10).map((item, index) => {
      const title = stripHtml(extractTag(item, "title"));
      const link = stripHtml(extractTag(item, "link"));
      const description = stripHtml(extractTag(item, "description"));
      const pubDate = stripHtml(extractTag(item, "pubDate"));

      let sourceName = "Fonte RSS";

      try {
        sourceName = new URL(link).hostname.replace("www.", "");
      } catch {}

      return {
        id: Number(`${Date.now()}${index}`),
        title: title || "Titolo non disponibile",
        summary: description.slice(0, 220) || "Riassunto non disponibile",
        category: guessCategory(sourceName, title),
        city: "Italia",
        date: pubDate || new Date().toLocaleString("it-IT"),
        sourceName,
        sourceUrl: link || url,
        image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200",
        tags: ["news", sourceName]
      };
    });
  } catch {
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
  const allNews = results.flat().slice(0, 20);

  return NextResponse.json({
    ok: true,
    items: allNews
  });
}
