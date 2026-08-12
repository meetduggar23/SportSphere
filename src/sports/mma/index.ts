import { getSport } from "@/sports/registry";
import type { SportDefinition } from "@/sports/registry";

/** MMA MODULE — definition + sport-specific extras (if any). */
export const definition: SportDefinition = getSport("mma");
