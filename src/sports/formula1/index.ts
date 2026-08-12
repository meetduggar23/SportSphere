import { getSport } from "@/sports/registry";
import type { SportDefinition } from "@/sports/registry";

/** FORMULA 1 MODULE — definition + sport-specific extras (if any). */
export const definition: SportDefinition = getSport("f1");
