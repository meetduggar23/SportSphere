import { Match, Fixture, Standing } from "@/types";
import { ProviderSnapshot } from "./types";

/**
 * Runs a provider function and wraps the result in a snapshot with
 * data-source metadata. Failures become "unavailable" — never fabricated data.
 */
export async function snapshot<T>(
  dataSource: string,
  fn: () => Promise<T[]>
): Promise<ProviderSnapshot<T[]>> {
  try {
    const data = await fn();
    return { status: "ready", data, dataSource, lastUpdated: Date.now() };
  } catch (e) {
    return {
      status: "unavailable",
      data: [],
      dataSource,
      lastUpdated: null,
      error: e instanceof Error ? e.message : "Unknown error",
    };
  }
}

/** Drop matches missing required ids, dedupe by id, clamp invalid scores. */
export function validateMatches(items: Match[]): Match[] {
  const seen = new Set<string>();
  return items
    .filter((m) => {
      if (!m.id || !m.homeTeam?.id || !m.awayTeam?.id) {
        console.warn("[sportsphere] dropped match missing ids", m.id);
        return false;
      }
      if (seen.has(m.id)) {
        console.warn("[sportsphere] duplicate match id", m.id);
        return false;
      }
      seen.add(m.id);
      return true;
    })
    .map((m) => ({
      ...m,
      homeScore:
        typeof m.homeScore === "number" && m.homeScore < 0 ? 0 : m.homeScore,
      awayScore:
        typeof m.awayScore === "number" && m.awayScore < 0 ? 0 : m.awayScore,
    }));
}

/** Drop fixtures missing ids or home team, dedupe by id. */
export function validateFixtures(items: Fixture[]): Fixture[] {
  const seen = new Set<string>();
  return items.filter((f) => {
    if (!f.id || !f.homeTeam?.id) {
      console.warn("[sportsphere] dropped fixture missing ids", f.id);
      return false;
    }
    if (seen.has(f.id)) {
      console.warn("[sportsphere] duplicate fixture id", f.id);
      return false;
    }
    seen.add(f.id);
    return true;
  });
}

/** Drop standings rows missing team ids, dedupe by team id. */
export function validateStandings(items: Standing[]): Standing[] {
  const seen = new Set<string>();
  return items.filter((s) => {
    if (!s.team?.id) {
      console.warn("[sportsphere] dropped standings row missing team id");
      return false;
    }
    if (seen.has(s.team.id)) {
      console.warn("[sportsphere] duplicate standings team", s.team.id);
      return false;
    }
    seen.add(s.team.id);
    return true;
  });
}
