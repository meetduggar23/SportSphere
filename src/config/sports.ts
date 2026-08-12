import { SPORTS } from "@/sports/registry";
import type { Sport } from "@/types";

/**
 * Sport display config — derived from the sport registry (the single source
 * of truth). Keeping this export shape stable means every existing consumer
 * (Header, SearchOverlay, All Sports page, etc.) keeps working while the data
 * lives in exactly one place: @/sports/registry.
 */
export interface SportConfig {
  /** Nav/display id — equals the registry slug ("formula-1"). */
  id: string;
  /** Canonical Sport id ("f1"). */
  sport: Sport;
  name: string;
  shortName: string;
  description: string;
  href: string;
  gradient: string;
  category: "primary" | "secondary";
  enabled: boolean;
  apiId?: number;
}

export const sportsConfig: SportConfig[] = SPORTS.map((s) => ({
  id: s.slug,
  sport: s.id,
  name: s.name,
  shortName: s.shortName,
  description: s.description,
  href: s.route,
  gradient: s.gradient,
  category: s.category,
  enabled: s.enabled,
  apiId: s.apiId,
}));

export const primarySports = sportsConfig.filter((s) => s.category === "primary");
export const secondarySports = sportsConfig.filter((s) => s.category === "secondary");
export const allSports = sportsConfig;

export function getSportConfig(id: string): SportConfig | undefined {
  return sportsConfig.find((s) => s.id === id || s.sport === id);
}

export interface SportAccent {
  accent: string;
  soft: string;
  gradient: string;
}

/**
 * Theme-adaptive hero accents — built entirely from the live design tokens
 * (var(--sport-accent) / var(--sport-surface)) so the same value resolves
 * to light-blue in the light theme and gold in the dark theme.
 */
const ACCENT_WASH: SportAccent = {
  accent: "var(--sport-accent)",
  soft: "color-mix(in srgb, var(--sport-accent) 28%, transparent)",
  gradient:
    "linear-gradient(135deg, color-mix(in srgb, var(--sport-accent) 32%, transparent) 0%, var(--surface-1) 55%, var(--surface-2) 100%)",
};

const DEEP_WASH: SportAccent = {
  accent: "var(--sport-accent)",
  soft: "color-mix(in srgb, var(--sport-accent) 44%, transparent)",
  gradient:
    "linear-gradient(135deg, color-mix(in srgb, var(--sport-accent) 48%, transparent) 0%, var(--surface-1) 60%, var(--surface-2) 100%)",
};

export const sportAccents: Record<string, SportAccent> = {
  football: ACCENT_WASH,
  cricket: ACCENT_WASH,
  f1: ACCENT_WASH,
  mma: ACCENT_WASH,
  baseball: ACCENT_WASH,
  basketball: DEEP_WASH,
  nba: DEEP_WASH,
  nfl: DEEP_WASH,
  hockey: DEEP_WASH,
  rugby: DEEP_WASH,
  volleyball: DEEP_WASH,
  handball: DEEP_WASH,
  afl: DEEP_WASH,
};

export function getSportAccent(id: string): SportAccent {
  return sportAccents[id] ?? ACCENT_WASH;
}

/**
 * All supported sports in the canonical editorial order (cricket-first,
 * never football-biased) — used by the top navigation and sports surfaces.
 */
export const orderedSports: SportConfig[] = sportsConfig;

/** Display label for a sport id, special-casing "formula-1". */
export function sportLabel(id: string, shortName: string): string {
  return id === "formula-1" ? "Formula 1" : shortName;
}
