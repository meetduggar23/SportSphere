import { getSportmonksApiToken, PLAYER_IMAGE_API } from "@/sports/cricket/config/cricketConfig";

/**
 * SPORTMONKS CRICKET API — raw server-side client (player images only).
 *
 * This module talks ONLY to the Sportmonks Cricket API v2.0 players endpoints
 * and exists exclusively to resolve player photographs (`image_path`). It is
 * independent of CricketData.org, which remains the player-information source.
 *
 * Verified against the official docs (docs.sportmonks.com/v2/cricket-api and
 * the Cricket Postman collection):
 *   GET {base}/players?filter[name]=<name>&include=country
 *       → { data: [{ id, firstname, lastname, fullname, image_path,
 *                    country_id, country?: { id, name, code }, … }], meta }
 *   GET {base}/players/<id>?include=country
 *       → { data: { id, firstname, …, image_path, country?: {…} } }
 *
 * Auth: `api_token` query parameter (never a header). Token lives in the
 * server environment (SPORTMONKS_API_TOKEN) and is never exposed to the
 * browser.
 *
 * ACCURACY RULE: every raw field is read defensively. If the provider does
 * not return an image_path the caller gets null — never a fabricated URL.
 */

export class SportmonksApiError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = "SportmonksApiError";
  }
}

/* ---- Raw response shapes (defensive: every field optional) ---- */

export interface RawSportmonksCountry {
  id?: number;
  name?: string;
  code?: string;
}

export interface RawSportmonksPlayer {
  id?: number;
  firstname?: string;
  lastname?: string;
  fullname?: string;
  /** The player photograph URL (CDN-hosted). May be empty/absent. */
  image_path?: string;
  country_id?: number;
  dateofbirth?: string;
  battingstyle?: string | null;
  bowlingstyle?: string | null;
  position?: { id?: number; name?: string };
  /** Present when the request used `include=country`. */
  country?: RawSportmonksCountry;
}

interface SportmonksEnvelope<T> {
  data?: T;
  message?: string;
  meta?: { pagination?: { total?: number; count?: number; per_page?: number } };
}

/** Auth + cache-friendly fetch of a Sportmonks endpoint. */
async function sportmonksFetch<T>(
  endpoint: string,
  params: Record<string, string | number> = {}
): Promise<T> {
  const token = getSportmonksApiToken();
  if (!token) {
    throw new SportmonksApiError(
      "Sportmonks API token is not configured. Add SPORTMONKS_API_TOKEN to .env.local"
    );
  }

  const url = new URL(`${PLAYER_IMAGE_API.baseUrl}${endpoint}`);
  for (const [k, v] of Object.entries(params)) {
    if (v !== undefined && v !== "") url.searchParams.set(k, String(v));
  }
  url.searchParams.set("api_token", token);

  const res = await fetch(url.toString(), {
    next: { revalidate: PLAYER_IMAGE_API.revalidateSeconds },
  });

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new SportmonksApiError("Sportmonks API token is invalid or expired.", res.status);
    }
    if (res.status === 429) {
      throw new SportmonksApiError("Sportmonks rate limit reached. Try again later.", res.status);
    }
    throw new SportmonksApiError(`Sportmonks API error: ${res.status}`, res.status);
  }

  const json = (await res.json()) as SportmonksEnvelope<T>;
  if (json.data === undefined && json.message) {
    throw new SportmonksApiError(json.message);
  }
  return json.data as T;
}

/**
 * Search Sportmonks players by name. Cricket players expose firstname/
 * lastname/fullname, so the search is tried against `fullname` first (the
 * field tier-2 exact matching compares) and falls back to `name` when the
 * first pass returns nothing — both are standard Sportmonks filter fields.
 * Country is included so matches can be verified by country — the image layer
 * never trusts a name match alone.
 */
export async function searchSportmonksPlayers(name: string): Promise<RawSportmonksPlayer[]> {
  const query = name.trim();
  if (!query) return [];

  const params = { include: "country", per_page: 25 } as const;

  const viaFullname = await sportmonksFetch<RawSportmonksPlayer[]>("/players", {
    ...params,
    "filter[fullname]": query,
  });
  const fullResults = Array.isArray(viaFullname) ? viaFullname : [];
  if (fullResults.length > 0) {
    return fullResults.filter((p) => p && typeof p.id === "number");
  }

  const viaName = await sportmonksFetch<RawSportmonksPlayer[]>("/players", {
    ...params,
    "filter[name]": query,
  });
  return Array.isArray(viaName) ? viaName.filter((p) => p && typeof p.id === "number") : [];
}

/** Fetch a single Sportmonks player by its stable numeric id. */
export async function getSportmonksPlayerById(id: number): Promise<RawSportmonksPlayer | null> {
  const raw = await sportmonksFetch<RawSportmonksPlayer>(`/players/${id}`, {
    include: "country",
  });
  if (!raw || typeof raw.id !== "number") return null;
  return raw;
}
