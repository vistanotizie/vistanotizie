import { NextResponse } from "next/server";
import type { Category, NewsItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const RSS_FEEDS = [
  {
    url: "https://www.ansa.it/sito/ansait_rss.xml",
    source: "ANSA"
  },
  {
    url: "https://www.repubblica.it/rss/homepage/rss2.0.xml",
    source: "la Repubblica"
  },
  {
    url: "https://www.ilsole24ore.com/rss/italia.xml",
    source: "Il Sole 24 Ore"
  }
];

const fallbackNews: NewsItem[] = [
  {
    id: 1001,
    title: "Feed temporaneamente non disponibile",
    summary: "Questa notizia di fallback appare quando i feed esterni non rispondono correttamente dal server.",
    category: "cronaca",
    city: "Italia",
    date: new Date().toLocaleString("it-IT"),
    sourceName: "VistaNotizie",
    sourceUrl: "https://vistanotizie.it",
    image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200",
    tags: ["fallback", "feed"]
  }
];

function stripHtml(value: string) {
  return value
    .replace(/<!\\[CDATA\\[([\\s\\S]*?)\\]\\]>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .trim();
}

function extractTag(item: string, tag: string) {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = item.match(regex);
  return match ? stripHtml(match[1]) : "";
}

function guessCategory(sourceName: string, title: string): Category {
  const text = `${sourceName} ${title}`.toLowerCase();

  if (text.includes("sport")) return "sport";
  if (text.includes("borsa") || text.includes("economia") || text.includes("finanza")) return "economia";
  if (text.includes("governo") || text.includes("parlamento") || text.includes("politica")) return "politica";
  if (text.includes("comune") || text.includes("citta") || text.includes("territorio")) return "locale";

  return "cronaca";
}

async function fetchRSS(feed: { url: string; source: string }): Promise<NewsItem[]> {
  try {
    const response = await fetch(feed.url, {
      cache: "no-store",
      headers: {
        "user-agent": "Mozilla/5.0 VistaNotizie"
      }
    });

    if (!response.ok) {
      console.error("RSS non raggiungibile:", feed.url, response.status);
      return [];
    }

    const xml = await response.text();

    if (!xml || !xml.includes("<item")) {
      console.error("RSS senza item validi:", feed.url);
      return [];
    }

    const rawItems = xml.split(/<item[ >]/i).slice(1);

    const parsed = rawItems
      .map((raw, index) => {
        const normalized = "<item " + raw;

        const title = extractTag(normalized, "title");
        const link = extractTag(normalized, "link");
        const description = extractTag(normalized, "description");
        const pubDate = extractTag(normalized, "pubDate");

        if (!title || !link) {
          return null;
        }

        return {
          id: Number(`${Date.now()}${index}`),
          title,
          summary: description ? description.slice(0, 220) : "Riassunto non disponibile",
          category: guessCategory(feed.source, title),
          city: "Italia",
          date: pubDate || new Date().toLocaleString("it-IT"),
          sourceName: feed.source,
          sourceUrl: link,
          image: "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200",
          tags: ["news", feed.source]
        } satisfies NewsItem;
      })
      .filter(Boolean) as NewsItem[];

    return parsed.slice(0, 8);
  } catch (error) {
    console.error("Errore feed:", feed.url, error);
    return [];
  }
}

export async function GET() {
  const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
  const items = results.flat();

  if (items.length === 0) {
    return NextResponse.json({
      ok: true,
      items: fallbackNews,
      debug: "Nessun feed RSS disponibile"
    });
  }

  return NextResponse.json({
    ok: true,
    items: items.slice(0, 20)
  });
}
