import { NextResponse } from "next/server";

const API_KEY = process.env.FOOTBALL_API_KEY;
const BASE_URL = "https://v3.football.api-sports.io";

async function fetchAPI(endpoint: string, params: Record<string, string> = {}) {
  const url = new URL(`${BASE_URL}${endpoint}`);
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value));

  const res = await fetch(url.toString(), {
    headers: {
      "x-apisports-key": API_KEY || "",
    },
    next: { revalidate: 300 },
  });

  if (!res.ok) {
    throw new Error(`API-Football error: ${res.status}`);
  }

  const data = await res.json();
  return data.response;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get("type") || "matches";

  if (!API_KEY) {
    return NextResponse.json(
      { error: "FOOTBALL_API_KEY is not configured. Add it to .env.local" },
      { status: 401 }
    );
  }

  try {
    switch (type) {
      case "matches": {
        const date = searchParams.get("date") || new Date().toISOString().split("T")[0];
        const data = await fetchAPI("/fixtures", { date });
        return NextResponse.json(data);
      }
      case "live": {
        const data = await fetchAPI("/fixtures", { live: "all" });
        return NextResponse.json(data);
      }
      case "standings": {
        const league = searchParams.get("league") || "39";
        const season = searchParams.get("season") || "2024";
        const data = await fetchAPI("/standings", { league, season });
        return NextResponse.json(data);
      }
      case "fixtures": {
        const league = searchParams.get("league") || "39";
        const season = searchParams.get("season") || "2024";
        const next = searchParams.get("next") || "10";
        const data = await fetchAPI("/fixtures", { league, season, next });
        return NextResponse.json(data);
      }
      case "teams": {
        const league = searchParams.get("league") || "39";
        const season = searchParams.get("season") || "2024";
        const data = await fetchAPI("/teams", { league, season });
        return NextResponse.json(data);
      }
      case "players": {
        const team = searchParams.get("team") || "";
        const season = searchParams.get("season") || "2024";
        const data = await fetchAPI("/players", { team, season });
        return NextResponse.json(data);
      }
      case "topscorers": {
        const league = searchParams.get("league") || "39";
        const season = searchParams.get("season") || "2024";
        const data = await fetchAPI("/players/topscorers", { league, season });
        return NextResponse.json(data);
      }
      default:
        return NextResponse.json({ error: "Unknown type" }, { status: 400 });
    }
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}
