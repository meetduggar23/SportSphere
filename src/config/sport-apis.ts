import { Sport } from "@/types";

export type SportApiKind = "team" | "f1" | "mma";

export interface SportApiConfig {
  /** App sport id (also the /api/sport route segment) */
  sport: Sport;
  /** API-SPORTS product key used in the v1.<key>.api-sports.io host */
  apiId: string;
  /** API-SPORTS base URL */
  baseUrl: string;
  /** Env var holding the API key for this sport */
  envKey: string;
  /** Response shape kind */
  kind: SportApiKind;
  /** Default league id used for standings/fixtures */
  leagueId?: string;
  /** Season — free plan only allows 2022–2024 */
  season: string;
}

/**
 * API-SPORTS (api-sports.io) integration config.
 * One account key unlocks every sport API below (verified active on
 * the Free plan). Cricket and NBA are not part of api-sports.io.
 */
export const sportApiConfigs: Record<string, SportApiConfig> = {
  basketball: {
    sport: "basketball",
    apiId: "basketball",
    baseUrl: "https://v1.basketball.api-sports.io",
    envKey: "BASKETBALL_API_KEY",
    kind: "team",
    leagueId: "12",
    season: "2024",
  },
  baseball: {
    sport: "baseball",
    apiId: "baseball",
    baseUrl: "https://v1.baseball.api-sports.io",
    envKey: "BASEBALL_API_KEY",
    kind: "team",
    leagueId: "1",
    season: "2024",
  },
  hockey: {
    sport: "hockey",
    apiId: "hockey",
    baseUrl: "https://v1.hockey.api-sports.io",
    envKey: "HOCKEY_API_KEY",
    kind: "team",
    leagueId: "57",
    season: "2024",
  },
  volleyball: {
    sport: "volleyball",
    apiId: "volleyball",
    baseUrl: "https://v1.volleyball.api-sports.io",
    envKey: "VOLLEYBALL_API_KEY",
    kind: "team",
    leagueId: "97",
    season: "2024",
  },
  handball: {
    sport: "handball",
    apiId: "handball",
    baseUrl: "https://v1.handball.api-sports.io",
    envKey: "HANDBALL_API_KEY",
    kind: "team",
    leagueId: "39",
    season: "2024",
  },
  rugby: {
    sport: "rugby",
    apiId: "rugby",
    baseUrl: "https://v1.rugby.api-sports.io",
    envKey: "RUGBY_API_KEY",
    kind: "team",
    leagueId: "16",
    season: "2024",
  },
  afl: {
    sport: "afl",
    apiId: "afl",
    baseUrl: "https://v1.afl.api-sports.io",
    envKey: "AFL_API_KEY",
    kind: "team",
    leagueId: "1",
    season: "2024",
  },
  nfl: {
    sport: "nfl",
    apiId: "american-football",
    baseUrl: "https://v1.american-football.api-sports.io",
    envKey: "NFL_API_KEY",
    kind: "team",
    leagueId: "1",
    season: "2024",
  },
  f1: {
    sport: "f1",
    apiId: "formula-1",
    baseUrl: "https://v1.formula-1.api-sports.io",
    envKey: "F1_API_KEY",
    kind: "f1",
    season: "2024",
  },
  mma: {
    sport: "mma",
    apiId: "mma",
    baseUrl: "https://v1.mma.api-sports.io",
    envKey: "MMA_API_KEY",
    kind: "mma",
    season: "2024",
  },
};
