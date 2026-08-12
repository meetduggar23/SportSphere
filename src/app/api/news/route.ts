import { NextResponse } from "next/server";
import type { News, Sport } from "@/types";

const API_KEY = process.env.NEWS_API_KEY;
const BASE_URL = "https://newsdata.io/api/1/news";

/** Shared response headers: let browsers reuse the same data within a minute. */
const CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
};

function json(body: unknown, init?: number | ResponseInit) {
  const status = typeof init === "number" ? init : init?.status;
  const headers =
    status === undefined || status < 400 ? CACHE_HEADERS : undefined;
  if (typeof init === "number") {
    return NextResponse.json(body, { status: init, headers });
  }
  return NextResponse.json(body, { ...init, headers });
}

interface NewsDataArticle {
  article_id: string;
  title: string;
  link: string;
  description: string | null;
  image_url: string | null;
  keywords: string[] | null;
  creator: string[] | null;
  source_name: string | null;
  pubDate: string;
  category: string[];
  duplicate: boolean;
}

interface NewsDataResponse {
  status: string;
  totalResults: number;
  results: NewsDataArticle[];
  nextPage: string | null;
}

/**
 * NewsData.io's `category` accepts a single value; passing `sports` returns
 * sports-category articles only. On top of that, every article is filtered
 * server-side so nothing but sports content ever reaches the app.
 */
const SPORT_PATTERNS: { sport: Sport; label: string; re: RegExp }[] = [
  {
    sport: "football",
    label: "FOOTBALL",
    re: /\b(football|soccer|premier league|la liga|serie a|bundesliga|ligue 1|champions league|europa league|world cup|uefa|fifa|real madrid|barcelona|manchester|chelsea|arsenal|liverpool|bayern|psg|juventus|messi|ronaldo|haaland|mbappe)\b/i,
  },
  {
    sport: "cricket",
    label: "CRICKET",
    re: /\b(cricket|ipl|test match|t20|odi|ashes|border[- ]gavaskar|virat|kohli|bumrah|rohit|india vs|australia vs|england vs|pakistan vs|bangladesh cricket)\b/i,
  },
  {
    sport: "basketball",
    label: "NBA",
    re: /\b(basketball|nba|ncaa|lebron|curry|jokic|lakers|warriors|celtics|bucks|suns|playoffs)\b/i,
  },
  {
    sport: "f1",
    label: "F1",
    re: /\b(formula 1|formula one|f1|grand prix|verstappen|hamilton|leclerc|norris|sainz|ferrari|red bull|mclaren|mercedes f1)\b/i,
  },
  {
    sport: "nfl",
    label: "NFL",
    re: /\b(nfl|super bowl|chiefs|eagles|49ers|cowboys|patriots|mahomes)\b/i,
  },
  {
    sport: "baseball",
    label: "MLB",
    re: /\b(mlb|baseball|yankees|dodgers|red sox|world series|home run)\b/i,
  },
  {
    sport: "hockey",
    label: "NHL",
    re: /\b(nhl|hockey|stanley cup|oilers|maple leafs)\b/i,
  },
  {
    sport: "mma",
    label: "MMA",
    re: /\b(mma|ufc|boxing|mcgregor|title fight|octagon)\b/i,
  },
  {
    sport: "rugby",
    label: "RUGBY",
    re: /\b(rugby|six nations|all blacks|springboks)\b/i,
  },
  {
    sport: "volleyball",
    label: "VOLLEYBALL",
    re: /\b(volleyball|fivb|nations league)\b/i,
  },
  {
    sport: "handball",
    label: "HANDBALL",
    re: /\b(handball|ihf|european handball)\b/i,
  },
  {
    sport: "afl",
    label: "AFL",
    re: /\b(afl|australian rules)\b/i,
  },
];

function inferSport(article: NewsDataArticle): {
  sport: Sport | undefined;
  category: string;
} {
  const text = [
    article.title,
    article.description ?? "",
    (article.keywords ?? []).join(" "),
  ].join(" ");

  // Esports is NOT one of the app's sports — keep it generic instead of
  // letting phrases like "Esports World Cup" leak into the football tag.
  if (/\besports?\b/i.test(text)) {
    return { sport: undefined, category: "SPORTS" };
  }

  // Transfers are football-specific in this app — check before generic sports.
  if (/\b(transfer|signing|contract|deal|transfer window)\b/i.test(text)) {
    return { sport: "football", category: "TRANSFERS" };
  }

  for (const p of SPORT_PATTERNS) {
    if (p.re.test(text)) return { sport: p.sport, category: p.label };
  }
  return { sport: undefined, category: "SPORTS" };
}

function timeAgo(pubDate: string): string {
  // NewsData pubDates look like "2026-08-12 06:33:00" (UTC).
  const t = new Date(pubDate.replace(" ", "T") + "Z").getTime();
  if (Number.isNaN(t)) return "";
  const s = Math.floor((Date.now() - t) / 1000);
  if (s < 60) return "just now";
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.floor(h / 24);
  return `${d}d ago`;
}

function toNews(a: NewsDataArticle): News {
  const { sport, category } = inferSport(a);
  return {
    id: a.article_id,
    title: a.title,
    excerpt: a.description ?? "",
    // NewsData often omits images — use a neutral placeholder so cards stay
    // consistent instead of echoing the brand logo everywhere.
    image:
      a.image_url ||
      "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=400&h=250&fit=crop",
    sport,
    category,
    timeAgo: timeAgo(a.pubDate),
    author: a.creator?.[0] ?? a.source_name ?? undefined,
    url: a.link,
    source: a.source_name ?? undefined,
  };
}

async function fetchNews(params: Record<string, string>) {
  const url = new URL(BASE_URL);
  url.searchParams.set("apikey", API_KEY || "");
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const res = await fetch(url.toString(), { next: { revalidate: 300 } });

  if (!res.ok) {
    throw new Error(`NewsData.io error: ${res.status}`);
  }

  const data: NewsDataResponse = await res.json();
  if (data.status !== "success") {
    throw new Error(`NewsData.io: ${data.status}`);
  }
  return data;
}

export async function GET(request: Request) {
  if (!API_KEY) {
    return json(
      { error: "NEWS_API_KEY is not configured. Add it to .env.local" },
      401
    );
  }

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");
  const q = searchParams.get("q");
  const language = searchParams.get("language") || "en";
  const size = Math.min(Math.max(Number(searchParams.get("size") || 10), 1), 10);

  try {
    // NewsData.io rejects the `id` parameter alongside ANY other filter
    // ("TooManyFilter") — an id lookup must be a bare request. The ids we
    // serve come from the sports feed, so the result is sports by construction.
    const data = id
      ? await fetchNews({ id })
      : await fetchNews({
          category: "sports", // sports-only, always
          language,
          size: String(size),
          ...(q ? { q } : {}),
        });

    // Defensive: even if the API drifts, never forward non-sports articles.
    const results = (data.results ?? [])
      .filter((a) => !a.duplicate)
      .filter((a) => (a.category ?? []).includes("sports"))
      .map(toNews);

    return json({
      data: results,
      totalResults: data.totalResults,
      dataSource: "NewsData.io",
      lastUpdated: Date.now(),
    });
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      500
    );
  }
}
