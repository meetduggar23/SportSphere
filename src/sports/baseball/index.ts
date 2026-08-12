import { getSport } from "@/sports/registry";
import type { SportDefinition } from "@/sports/registry";

/** BASEBALL MODULE — definition + sport-specific extras (if any). */
export const definition: SportDefinition = getSport("baseball");
