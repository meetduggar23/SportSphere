import { Match, Fixture, Standing, Player, Sport } from "@/types";

export type SnapshotStatus = "ready" | "unavailable";

export interface ProviderSnapshot<T> {
  status: SnapshotStatus;
  data: T;
  dataSource: string;
  /** Epoch ms of the last successful fetch, or null if never succeeded */
  lastUpdated: number | null;
  error?: string;
}

/**
 * A replaceable data provider for one sport.
 * UI consumes only normalized Match/Fixture/Standing data through this
 * interface, so providers can be swapped without touching components.
 */
export interface SportProvider {
  readonly sport: Sport;
  readonly dataSource: string;
  getMatches(): Promise<ProviderSnapshot<Match[]>>;
  getFixtures(): Promise<ProviderSnapshot<Fixture[]>>;
  getStandings(): Promise<ProviderSnapshot<Standing[]>>;
  getPlayers(): Promise<ProviderSnapshot<Player[]>>;
}
