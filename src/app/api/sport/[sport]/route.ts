import { NextResponse } from "next/server";
import { sportApiConfigs } from "@/config/sport-apis";

/** Shared response headers: let browsers reuse the same data within a minute. */
const CACHE_HEADERS = {
  "Cache-Control":
    "public, max-age=60, s-maxage=120, stale-while-revalidate=300",
};

function json(body: unknown, init?: number | ResponseInit) {
  const status = typeof init === "number" ? init : init?.status;
  // Only cache successful payloads — errors must stay uncached so retries
  // actually hit the network again.
  const headers =
    status === undefined || status < 400 ? CACHE_HEADERS : undefined;
  if (typeof init === "number") {
    return NextResponse.json(body, { status: init, headers });
  }
  return NextResponse.json(body, { ...init, headers });
}

async function fetchAPI(
  baseUrl: string,
  apiKey: string,
  endpoint: string,
  params: Record<string, string> = {}
) {
  const url = new URL(`${baseUrl}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const res = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": apiKey,
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`API-Sports error: ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ sport: string }> }
) {
  const { sport } = await params;
  const cfg = sportApiConfigs[sport];

  if (!cfg) {
    return json({ error: `Unknown sport: ${sport}` }, 404);
  }

  const apiKey = process.env[cfg.envKey];
  if (!apiKey) {
    return json(
      { error: `${cfg.envKey} is not configured. Add it to .env.local` },
      401
    );
  }

  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "matches";

  try {
    // ---- Formula 1: races (season-scoped) ----
    if (cfg.kind === "f1") {
      switch (type) {
        case "matches":
        case "live":
        case "fixtures": {
          const data = await fetchAPI(cfg.baseUrl, apiKey, "/races", {
            season: cfg.season,
          });
          return json(data);
        }
        case "standings":
          return json([]);
        default:
          return json({ error: "Unknown type" }, 400);
      }
    }

    // ---- MMA: fights (season-scoped) ----
    if (cfg.kind === "mma") {
      switch (type) {
        case "matches":
        case "live": {
          const data = await fetchAPI(cfg.baseUrl, apiKey, "/fights", {
            season: cfg.season,
          });
          return json(data);
        }
        case "fixtures":
        case "standings":
          return json([]);
        default:
          return json({ error: "Unknown type" }, 400);
      }
    }

    // ---- Team sports ----
    switch (type) {
      case "matches": {
        const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", { date });
        return json(data);
      }
      case "live": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", { live: "all" });
        return json(data);
      }
      case "fixtures": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", {
          league: cfg.leagueId || "",
          season: cfg.season,
        });
        return json(data);
      }
      case "standings": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/standings", {
          league: cfg.leagueId || "",
          season: cfg.season,
        });
        return json(data);
      }
      default:
        return json({ error: "Unknown type" }, 400);
    }
  } catch (error) {
    return json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      502
    );
  }
}
