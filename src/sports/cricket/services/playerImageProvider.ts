import { PLAYER_IMAGE_API } from "@/sports/cricket/config/cricketConfig";
import {
  findImageProviderPlayer,
  mapPlayerIdentity,
} from "@/sports/cricket/services/playerImageService";
import {
  getSportmonksPlayerById,
  searchSportmonksPlayers,
  type RawSportmonksPlayer,
} from "@/sports/cricket/services/sportmonksApi";

/**
 * PLAYER IMAGE PROVIDER — the replaceable image layer.
 *
 * SportsSphere keeps TWO independent cricket player providers:
 *
 *   Player data   → CricketData.org   (existing CricketDataProvider)
 *   Player image  → this layer        (CricketPlayerImageProvider)
 *
 * The UI only talks to `CricketPlayerImageProvider.getPlayerImage(player)`,
 * so a future image provider can be swapped in without touching any
 * component. CricketData stays the single source of player information.
 *
 * LICENSE NOTE: Sportmonks states player photos are copyrighted by their
 * legal owners and the app owner must arrange the appropriate IP rights.
 * This provider only surfaces the provider's hosted image URL — it does not
 * download, duplicate, or redistribute photos itself.
 */

/** A verified player photograph plus its provenance. */
export interface PlayerImage {
  /** Provider-hosted photo URL (CDN). */
  imageUrl: string;
  /** Provider name (e.g. "Sportmonks"). */
  imageProvider: string;
  /** Stable player id inside the image provider's database. */
  imageProviderId: string;
  /** ISO timestamp of the verified match. */
  imageLastUpdated: string;
}

/** Minimal player identity the image layer needs to match on. */
export interface PlayerImageSubject {
  id: string;
  name?: string;
  country?: string;
  countryCode?: string;
}

export interface CricketPlayerImageProvider {
  readonly name: string;
  readonly sourceName: string;
  readonly sourceUrl: string;
  /** True when the provider is configured (token present, server-side). */
  isConfigured(): boolean;
  /**
   * Resolve a real player photograph for a CricketData player. Returns null
   * when there is no RELIABLE match — never a guessed/fabricated image. The
   * caller falls back to the initials avatar.
   */
  getPlayerImage(player: PlayerImageSubject): Promise<PlayerImage | null>;
}

/** Validate the provider's hosted image URL before it reaches the UI. */
function isValidImageUrl(url: string | undefined): url is string {
  if (!url) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" && parsed.hostname === PLAYER_IMAGE_API.imageHost;
  } catch {
    return false;
  }
}

/** Map a verified Sportmonks player onto the shared PlayerImage shape. */
function toPlayerImage(p: RawSportmonksPlayer): PlayerImage | null {
  if (!isValidImageUrl(p.image_path)) return null;
  return {
    imageUrl: p.image_path,
    imageProvider: PLAYER_IMAGE_API.provider,
    imageProviderId: String(p.id),
    imageLastUpdated: new Date().toISOString(),
  };
}

/** Sportmonks Cricket API player-image provider. */
export class SportmonksPlayerImageProvider implements CricketPlayerImageProvider {
  readonly name = "sportmonks";
  readonly sourceName = PLAYER_IMAGE_API.sourceName;
  readonly sourceUrl = PLAYER_IMAGE_API.sourceUrl;

  isConfigured(): boolean {
    // The raw client throws a descriptive error when the token is missing;
    // isConfigured lets callers skip the network entirely when unconfigured.
    return Boolean(process.env.SPORTMONKS_API_TOKEN);
  }

  async getPlayerImage(player: PlayerImageSubject): Promise<PlayerImage | null> {
    if (!player.id || !player.name) return null;

    // Tier 1 — exact known id mapping first (no name heuristics).
    const mappedId = mapPlayerIdentity(player.id);
    if (mappedId) {
      const numericId = Number(mappedId);
      // Sportmonks player ids are integers — never issue a /players/NaN call.
      if (!Number.isInteger(numericId) || numericId <= 0) return null;
      const direct = await getSportmonksPlayerById(numericId).catch(() => null);
      return direct ? toPlayerImage(direct) : null;
    }

    // Tiers 2–3 — conservative name+country matching with ambiguity rejection.
    const matched = await findImageProviderPlayer(player, (name) =>
      searchSportmonksPlayers(name).catch(() => [] as RawSportmonksPlayer[])
    );
    return matched ? toPlayerImage(matched) : null;
  }
}

/** The active player-image provider (single source of truth). */
export function getCricketPlayerImageProvider(): CricketPlayerImageProvider {
  return new SportmonksPlayerImageProvider();
}
