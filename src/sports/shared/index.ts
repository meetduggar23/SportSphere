/**
 * SHARED / ALL-SPORTS LAYER
 *
 * Every sport module inherits from here. A change to any shared component,
 * hook, service, type or config below automatically applies to all 13 sports.
 *
 * Import from this barrel (or from the canonical paths — both are equivalent):
 *   import { SportPage } from "@/sports/shared";
 */

/* ---- Shared components ---- */
export { SportPage } from "@/components/sports/SportPage";
export { MatchMeta, MatchStatus, uniqueMeta } from "@/components/sports/MatchMeta";
export { MatchRow } from "@/components/sports/MatchRow";
export { LiveMatchCard } from "@/components/sports/LiveMatchCard";
export { FixtureList } from "@/components/sports/FixtureList";
export { StandingsTable } from "@/components/sports/StandingsTable";
export { NewsCard } from "@/components/sports/NewsCard";
export { SportHero } from "@/components/sports/SportHero";
export { LiveTicker } from "@/components/layout/LiveTicker";
export { SportIcon } from "@/components/ui/SportIcon";
export { SportTabs } from "@/components/ui/SportTabs";
export { SectionHeader } from "@/components/ui/SectionHeader";
export { DataStatus } from "@/components/ui/DataStatus";
export { TeamLogo } from "@/components/ui/TeamLogo";
export { LiveBadge } from "@/components/ui/LiveBadge";
export { PageHeader } from "@/components/ui/PageHeader";
export { DemoBadge } from "@/components/ui/DemoBadge";
export { StatsCard } from "@/components/ui/StatsCard";
export { AppShell } from "@/components/layout/AppShell";

/* ---- Shared hooks ---- */
export { useSportData } from "@/lib/useSportData";
export { useHomeFeed, homeSports, getFeaturedLiveEvent } from "@/lib/homeFeed";

/* ---- Shared services / data access ---- */
export { getProvider } from "@/lib/providers/registry";
export type { SportProvider, ProviderSnapshot } from "@/lib/providers/types";
export { sportApiConfigs } from "@/config/sport-apis";
export type { SportApiConfig } from "@/config/sport-apis";

/* ---- Shared types ---- */
export type {
  Sport,
  Team,
  Player,
  Match,
  Fixture,
  Standing,
  News,
  TrendingItem,
  Tournament,
  Transfer,
  Prediction,
} from "@/types";
export { sportLabels, sportShortLabels } from "@/types";

/* ---- Shared config ---- */
export { SPORTS, getSport, getSportBySlug, sportIds, sportLabel } from "@/sports/registry";
export type { SportDefinition, SportFeatures, ScoringType } from "@/sports/registry";
