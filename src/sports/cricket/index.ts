import { getSport } from "@/sports/registry";
import type { SportDefinition } from "@/sports/registry";
import { iplTeams } from "@/data/mock";

/**
 * CRICKET MODULE
 * Sport-specific identity + extras. Everything generic lives in shared.
 */
export const definition: SportDefinition = getSport("cricket");

export { iplTeams };

export { CricketExtra } from "./components/CricketExtra";
