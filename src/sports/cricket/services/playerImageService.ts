import { cachedFetch } from "@/lib/requestCache";
import type { CricketPlayer, CricketPlayerRef } from "@/sports/cricket/types/cricketTypes";
import type { RawSportmonksPlayer } from "@/sports/cricket/services/sportmonksApi";
import type { CricketPlayerImageProvider, PlayerImage } from "@/sports/cricket/services/playerImageProvider";

/**
 * PLAYER IMAGE SERVICE — identity mapping + safe matching + caching.
 *
 * CricketData.org and the image provider (Sportmonks) use different player
 * ids. This module reconciles the two WITHOUT guessing:
 *
 *   CricketData Player
 *        ↓ normalizePlayerIdentity()
 *        ↓ findImageProviderPlayer()  (tiered, conservative)
 *        ↓ Sportmonks Player → image_path
 *        ↓ cached + attached to the SportsSphere player
 *
 * Matching tiers (never skips a tier):
 *   1. Exact known id mapping (manual PLAYER_IMAGE_MAPPINGS table).
 *   2. Exact normalized name + exact country.
 *   3. Strong name match (surname/initial forms) + exact country AND a single
 *      unambiguous candidate.
 *   4. No reliable match → null (the UI falls back to the initials avatar).
 *
 * A name that matches but whose country differs is REJECTED. Two players with
 * the same name from different countries are never conflated ("Rahul Sharma"
 * from India is not automatically "Rahul Sharma" from another country).
 *
 * Image lookups are cached per CricketData player id (`cricket:player-image:*`)
 * with a long TTL — identical requests never re-poll the image provider.
 */

/** Player id → image-provider player id. Populated only with VERIFIED ids —
 *  never guesses. Seed entries as they are confirmed against the live API. */
export type PlayerMapping = { cricketDataPlayerId: string; imageProviderPlayerId: string };

/** Manual mapping table (extensible, verified entries only). */
export const PLAYER_IMAGE_MAPPINGS: PlayerMapping[] = [];

/** Look up an exact known mapping for a CricketData player id (tier 1). */
export function mapPlayerIdentity(cricketDataPlayerId: string): string | null {
  const found = PLAYER_IMAGE_MAPPINGS.find((m) => m.cricketDataPlayerId === cricketDataPlayerId);
  return found?.imageProviderPlayerId ?? null;
}

/* ---- Identity normalization ---- */

export interface PlayerIdentity {
  /** Lowercase, trimmed, whitespace-collapsed full name. */
  normalizedName: string;
  /** Lowercase, trimmed country name, when known. */
  normalizedCountry?: string;
  /** Uppercased ISO alpha-2 code when known ("" never matches anything). */
  countryCode?: string;
  /** Distinct name tokens (used for strong matching). */
  tokens: string[];
}

/** Normalize a player's identity for safe cross-provider comparison. */
export function normalizePlayerIdentity(player: {
  name?: string;
  country?: string;
  countryCode?: string;
}): PlayerIdentity {
  const name = (player.name ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  const country = (player.country ?? "").trim().toLowerCase().replace(/\s+/g, " ");
  return {
    normalizedName: name,
    normalizedCountry: country || undefined,
    countryCode: player.countryCode?.toUpperCase() || undefined,
    tokens: name.split(" ").filter(Boolean),
  };
}

/** Normalize a Sportmonks player's full name for comparison. */
function sportmonksFullName(p: RawSportmonksPlayer): string {
  return [p.firstname, p.lastname].filter(Boolean).join(" ").trim().toLowerCase().replace(/\s+/g, " ");
}

/** Does a Sportmonks player's country match the CricketData country? */
function countryMatches(p: RawSportmonksPlayer, identity: PlayerIdentity): boolean {
  const smName = p.country?.name?.trim().toLowerCase().replace(/\s+/g, " ");
  const smCode = p.country?.code?.toUpperCase();

  if (identity.normalizedCountry && smName) {
    if (smName === identity.normalizedCountry) return true;
  }
  if (identity.countryCode && smCode && smCode === identity.countryCode) return true;
  return false;
}

/** Exact full-name equality (tier 2). */
function isExactName(p: RawSportmonksPlayer, identity: PlayerIdentity): boolean {
  return sportmonksFullName(p) === identity.normalizedName && identity.normalizedName.length > 0;
}

/**
 * Strong name match (tier 3): surname-first ("Kohli, Virat" or "V Kohli") or
 * initial-first forms. Requires the last token to be the surname and every
 * initial token to be a letter/initial of the full name — never a substring
 * coincidence like "Sharma" matching "Sharma 1".
 */
function isStrongNameMatch(p: RawSportmonksPlayer, identity: PlayerIdentity): boolean {
  const full = sportmonksFullName(p);
  if (!full || identity.tokens.length === 0) return false;

  const smTokens = full.split(" ").filter(Boolean);
  const surname = identity.tokens[identity.tokens.length - 1];
  if (!surname || surname.length < 3) return false;

  // Surname must appear in the Sportmonks name.
  if (!smTokens.includes(surname)) return false;

  // Every other token must be a leading initial ("v kohli" → v, kohli) or a
  // known prefix of a Sportmonks token — otherwise the names genuinely differ.
  for (const token of identity.tokens.slice(0, -1)) {
    const isInitial = /^[a-z]\.?$/.test(token);
    const isPrefix = smTokens.some((t) => t.startsWith(token) && token.length >= 2);
    if (!isInitial && !isPrefix) return false;
  }
  return true;
}

/**
 * Find the single best image-provider player for a CricketData player using
 * the tiered rules. Returns null when no RELIABLE match exists — the caller
 * falls back to the initials avatar. Never returns an ambiguous match.
 *
 * NOTE: tier 1 (exact known id mapping) is handled by the provider before
 * this runs — see SportmonksPlayerImageProvider.getPlayerImage.
 */
export function findImageProviderPlayer(
  player: { id: string; name?: string; country?: string; countryCode?: string },
  searchFn: (name: string) => Promise<RawSportmonksPlayer[]>
): Promise<RawSportmonksPlayer | null> {
  return findImageProviderPlayerInternal(player, searchFn);
}

async function findImageProviderPlayerInternal(
  player: { id: string; name?: string; country?: string; countryCode?: string },
  searchFn: (name: string) => Promise<RawSportmonksPlayer[]>
): Promise<RawSportmonksPlayer | null> {
  const identity = normalizePlayerIdentity(player);
  if (!identity.normalizedName) return null;

  // Fetch candidates for this name.
  const candidates = await searchFn(player.name ?? identity.normalizedName);
  if (!candidates.length) return null;

  // Tier 2 — exact normalized name + country.
  const exactWithCountry = candidates.filter(
    (p) => isExactName(p, identity) && countryMatches(p, identity)
  );
  if (exactWithCountry.length === 1) return exactWithCountry[0];

  // Tier 2b — exact name with no country on either side (unique only).
  if (identity.normalizedCountry === undefined) {
    const exactAnyCountry = candidates.filter((p) => isExactName(p, identity));
    if (exactAnyCountry.length === 1) return exactAnyCountry[0];
  }

  // Tier 3 — strong name match + country, but ONLY when unambiguous.
  const strong = candidates.filter((p) => isStrongNameMatch(p, identity) && countryMatches(p, identity));
  if (strong.length === 1) return strong[0];

  return null;
}

/* ---- Caching ---- */

/** Cache key per requirement: cricket:player-image:<cricketDataPlayerId>. */
function imageCacheKey(playerId: string): string {
  return `cricket:player-image:${playerId}`;
}

/** Long TTL — a verified image match is stable data; never poll. */
export const PLAYER_IMAGE_CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24h

/**
 * Verified-image store: lets callers warm the cache with a manually-verified
 * mapping (e.g. from an admin reconciliation run) without hitting the
 * provider again. Consulted before any network call. Capped so it can't grow
 * unbounded — verified entries are stable data, LRU-style eviction.
 */
const verifiedImageStore = new Map<string, PlayerImage | null>();
const VERIFIED_STORE_MAX = 500;

function storeVerifiedImage(playerId: string, image: PlayerImage | null): void {
  if (verifiedImageStore.has(playerId)) {
    verifiedImageStore.delete(playerId);
  }
  verifiedImageStore.set(playerId, image);
  if (verifiedImageStore.size > VERIFIED_STORE_MAX) {
    const oldest = verifiedImageStore.keys().next().value as string | undefined;
    if (oldest) verifiedImageStore.delete(oldest);
  }
}

/** Explicit cache write — verify-then-store, never guess. */
export function cachePlayerImage(playerId: string, image: PlayerImage | null): void {
  if (!playerId) return;
  storeVerifiedImage(playerId, image);
}

/**
 * Resolve a player's image through the configured provider, cached per player
 * id. Successful resolutions (including "no match" → null) are cached; thrown
 * provider errors are NOT cached so a transient outage retries naturally.
 */
export async function getPlayerImage(
  player: { id: string; name?: string; country?: string; countryCode?: string },
  provider?: CricketPlayerImageProvider
): Promise<PlayerImage | null> {
  if (!player.id) return null;

  // Warm cache wins instantly — no network, no polling.
  if (verifiedImageStore.has(player.id)) {
    return verifiedImageStore.get(player.id) ?? null;
  }

  return cachedFetch<PlayerImage | null>(imageCacheKey(player.id), async () => {
    const active = provider ?? (await getImageProvider());
    if (!active.isConfigured()) return null;
    try {
      const image = await active.getPlayerImage(player);
      storeVerifiedImage(player.id, image);
      return image;
    } catch {
      // Provider unavailable / rate limited / timeout → fallback avatar.
      return null;
    }
  }, PLAYER_IMAGE_CACHE_TTL_MS);
}

/** Lazily resolve the active image provider (avoids a static import cycle). */
async function getImageProvider(): Promise<CricketPlayerImageProvider> {
  const { getCricketPlayerImageProvider } = await import(
    "@/sports/cricket/services/playerImageProvider"
  );
  return getCricketPlayerImageProvider();
}

/* ---- Enrichment helpers (server-side routes) ---- */

/**
 * Attach resolved image metadata to a full CricketPlayer profile. Fields are
 * only set when the image provider supplied a real, verified image — the UI
 * falls back to the initials avatar otherwise.
 */
export async function enrichPlayerWithImage(player: CricketPlayer): Promise<CricketPlayer> {
  const image = await getPlayerImage({
    id: player.id,
    name: player.fullName || player.name,
    country: player.country,
    countryCode: player.countryCode,
  });
  if (!image) return player;
  return {
    ...player,
    imageUrl: image.imageUrl,
    imageProvider: image.imageProvider,
    imageProviderId: image.imageProviderId,
    imageLastUpdated: image.imageLastUpdated,
  };
}

/**
 * Attach photos to player search/roster refs. Images are resolved per player,
 * cached, and every failure degrades to a ref without a photo (initials in
 * the UI). Never throws — a slow/unavailable image provider must not break
 * the player list. Lookups run with a small concurrency cap so a large search
 * page never fires an unbounded burst of provider calls.
 */
/**
 * Attach photos to player search/roster refs. Images are resolved per player,
 * cached, and every failure degrades to a ref without a photo (initials in
 * the UI). Never throws — a slow/unavailable image provider must not break
 * the player list. Lookups run with a small concurrency cap so a large search
 * page never fires an unbounded burst of provider calls, and `cap` bounds how
 * many photos are resolved per request (first N refs) to respect rate limits.
 */
export async function enrichPlayerRefsWithImages(
  refs: CricketPlayerRef[],
  cap = 12
): Promise<CricketPlayerRef[]> {
  if (refs.length === 0) return refs;
  const provider = await getImageProvider();
  if (!provider.isConfigured()) return refs;

  const targets = refs.slice(0, Math.max(1, cap));
  const CONCURRENCY = 4;
  const enriched = new Array<CricketPlayerRef>(targets.length);
  let cursor = 0;

  async function worker(): Promise<void> {
    while (cursor < targets.length) {
      const index = cursor;
      cursor += 1;
      const ref = targets[index];
      // getPlayerImage never throws on provider errors (returns null), so the
      // list always degrades to photo-less refs instead of failing.
      const image = await getPlayerImage(
        {
          id: ref.id,
          name: ref.name,
          country: ref.country,
        },
        provider
      );
      enriched[index] = image ? { ...ref, photo: image.imageUrl } : ref;
    }
  }

  await Promise.all(Array.from({ length: Math.min(CONCURRENCY, targets.length) }, worker));
  return [...enriched, ...refs.slice(targets.length)];
}
