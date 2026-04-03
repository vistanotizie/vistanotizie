import { NextResponse } from "next/server";
import type { Category, NewsItem } from "@/lib/types";

export const dynamic = "force-dynamic";

const RSS_FEEDS = [
  { url: "https://www.ansa.it/sito/ansait_rss.xml", source: "ANSA" },
  { url: "https://www.repubblica.it/rss/homepage/rss2.0.xml", source: "la Repubblica" },
  { url: "https://www.ilsole24ore.com/rss/italia.xml", source: "Il Sole 24 Ore" }
];

function stripHtml(value: string): string {
  return value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/gi, "$1")
    .replace(/<[^>]+>/g, "")
    .replace(/&quot;/g, '"')
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&#39;/g, "'")
    .trim();
}

function extractTag(item: string, tag: string): string {
  const regex = new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`, "i");
  const match = item.match(regex);
  return match ? stripHtml(match[1]) : "";
}

function guessCategory(sourceName: string, title: string, description: string): Category {
  const text = `${sourceName} ${title} ${description}`.toLowerCase();

  if (
    text.includes("governo") ||
    text.includes("parlamento") ||
    text.includes("elezioni") ||
    text.includes("ministro") ||
    text.includes("politica") ||
    text.includes("senato") ||
    text.includes("camera")
  ) {
    return "politica";
  }

  if (
    text.includes("borsa") ||
    text.includes("mercati") ||
    text.includes("inflazione") ||
    text.includes("finanza") ||
    text.includes("economia") ||
    text.includes("spread") ||
    text.includes("banche") ||
    text.includes("pil") ||
    text.includes("tassi")
  ) {
    return "economia";
  }

  if (
    text.includes("calcio") ||
    text.includes("serie a") ||
    text.includes("serie b") ||
    text.includes("tennis") ||
    text.includes("formula 1") ||
    text.includes("motogp") ||
    text.includes("champions") ||
    text.includes("allenatore") ||
    text.includes("partita") ||
    text.includes("sport")
  ) {
    return "sport";
  }

  if (
    text.includes("comune") ||
    text.includes("provincia") ||
    text.includes("sindaco") ||
    text.includes("rimini") ||
    text.includes("milano") ||
    text.includes("roma") ||
    text.includes("bologna") ||
    text.includes("torino") ||
    text.includes("napoli") ||
    text.includes("firenze") ||
    text.includes("palermo") ||
    text.includes("territorio") ||
    text.includes("quartiere") ||
    text.includes("citta")
  ) {
    return "locale";
  }

  return "cronaca";
}

function guessCity(title: string, description: string): string {
  const text = `${title} ${description}`.toLowerCase();

  if (text.includes("rimini")) return "Rimini";
  if (text.includes("milano")) return "Milano";
  if (text.includes("roma")) return "Roma";
  if (text.includes("bologna")) return "Bologna";
  if (text.includes("torino")) return "Torino";
  if (text.includes("napoli")) return "Napoli";
  if (text.includes("firenze")) return "Firenze";
  if (text.includes("palermo")) return "Palermo";

  return "Italia";
}

function getCategoryImage(category: Category): string {
  switch (category) {
    case "politica":
      return "https://images.pexels.com/photos/466685/pexels-photo-466685.jpeg?auto=compress&cs=tinysrgb&w=1200";
    case "economia":
      return "https://images.pexels.com/photos/210607/pexels-photo-210607.jpeg?auto=compress&cs=tinysrgb&w=1200";
    case "sport":
      return "https://images.pexels.com/photos/274422/pexels-photo-274422.jpeg?auto=compress&cs=tinysrgb&w=1200";
    case "locale":
      return "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg?auto=compress&cs=tinysrgb&w=1200";
    default:
      return "https://images.pexels.com/photos/518543/pexels-photo-518543.jpeg?auto=compress&cs=tinysrgb&w=1200";
  }
}

function createId(index: number): number {
  const timestamp = Date.now().toString();
  const safeIndex = index.toString().padStart(3, "0");
  return Number(`${timestamp}${safeIndex}`);
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
      return [];
    }

    const xml = await response.text();

    if (!xml.includes("<item")) {
      return [];
    }

    const rawItems = xml.split(/<item[ >]/i).slice(1);

    const parsed: NewsItem[] = rawItems
      .map((raw, index) => {
        const normalized = "<item " + raw;

        const title = extractTag(normalized, "title");
        const link = extractTag(normalized, "link");
        const description = extractTag(normalized, "description");
        const pubDate = extractTag(normalized, "pubDate");

        if (!title || !link) {
          return null;
        }

        const category = guessCategory(feed.source, title, description);
        const city = guessCity(title, description);

        return {
          id: createId(index),
          title,
          summary: description ? description.slice(0, 220) : "Riassunto non disponibile",
          category,
          city,
          date: pubDate || new Date().toLocaleString("it-IT"),
          sourceName: feed.source,
          sourceUrl: link,
          image: getCategoryImage(category),
          tags: [feed.source, category, city]
        };
      })
      .filter((item): item is NewsItem => item !== null);

    return parsed.slice(0, 8);
  } catch {
    return [];
  }
}

function deduplicateNews(items: NewsItem[]): NewsItem[] {
  const seen = new Set<string>();

  return items.filter((item) => {
    const key = item.title.toLowerCase().trim();

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

export async function GET() {
  const results = await Promise.all(RSS_FEEDS.map(fetchRSS));
  const allItems = results.flat();
  const uniqueItems = deduplicateNews(allItems);

  return NextResponse.json({
    ok: true,
    items: uniqueItems.slice(0, 24)
  });
}
