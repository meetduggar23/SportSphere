import { Sport } from "@/types";
import { SportProvider } from "./types";
import { createApiSportsProvider } from "./apiSports";
import { createFootballProvider } from "./football";
import { createCricketProvider } from "@/sports/cricket/services/cricketProvider";
import { createUnavailableProvider } from "./unavailable";

const cache: Partial<Record<Sport, SportProvider>> = {};

/** Returns the provider for a sport (cached). Falls back to "unavailable". */
export function getProvider(sport: Sport): SportProvider {
  if (cache[sport]) return cache[sport]!;

  let provider: SportProvider;
  if (sport === "football") {
    provider = createFootballProvider();
  } else if (sport === "cricket") {
    // CricAPI-backed: live matches, fixtures, IPL points + player directory.
    provider = createCricketProvider();
  } else {
    provider = createApiSportsProvider(sport) ?? createUnavailableProvider(sport);
  }

  cache[sport] = provider;
  return provider;
}
