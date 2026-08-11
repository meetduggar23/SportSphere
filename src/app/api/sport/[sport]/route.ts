import { NextResponse } from "next/server";
import { sportApiConfigs } from "@/config/sport-apis";

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
    return NextResponse.json({ error: `Unknown sport: ${sport}` }, { status: 404 });
  }

  const apiKey = process.env[cfg.envKey];
  if (!apiKey) {
    return NextResponse.json(
      { error: `${cfg.envKey} is not configured. Add it to .env.local` },
      { status: 401 }
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
          return NextResponse.json(data);
        }
        case "standings":
          return NextResponse.json([]);
        default:
          return NextResponse.json({ error: "Unknown type" }, { status: 400 });
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
          return NextResponse.json(data);
        }
        case "fixtures":
        case "standings":
          return NextResponse.json([]);
        default:
          return NextResponse.json({ error: "Unknown type" }, { status: 400 });
      }
    }

    // ---- Team sports ----
    switch (type) {
      case "matches": {
        const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", { date });
        return NextResponse.json(data);
      }
      case "live": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", { live: "all" });
        return NextResponse.json(data);
      }
      case "fixtures": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/games", {
          league: cfg.leagueId || "",
          season: cfg.season,
        });
        return NextResponse.json(data);
      }
      case "standings": {
        const data = await fetchAPI(cfg.baseUrl, apiKey, "/standings", {
          league: cfg.leagueId || "",
          season: cfg.season,
        });
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 502 }
    );
  }
}
