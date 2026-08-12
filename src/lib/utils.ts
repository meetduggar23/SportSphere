import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import type { Sport } from "@/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Canonical href for a match card/row. Cricket has a real scorecard route
 * (/sports/cricket/match/[id]); every other sport links to the generic
 * match centre. Using this everywhere keeps provider match ids from landing
 * on a "Match not found" screen when a real detail page exists.
 */
export function matchHref(match: { sport: Sport; id: string }): string {
  return match.sport === "cricket"
    ? `/sports/cricket/match/${match.id}`
    : `/match/${match.id}`;
}
