"use client";

import { useState } from "react";
import { CricketFormatTabs } from "@/sports/cricket/components/CricketFormatTabs";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { cricketFormat } from "@/sports/cricket/config/cricketConfig";
import { formatDecimal, formatNumber } from "@/sports/cricket/utils/cricketFormat";
import type { CricketCareerStats, CricketFormatId } from "@/sports/cricket/types/cricketTypes";
import type { PlayerStatsResult } from "@/sports/cricket/services/cricketStats";

interface PlayerStatsProps {
  results: PlayerStatsResult[];
}

function StatCard({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="  border border-border-navy bg-card/50 px-4 py-3 rounded-md">
      <p className="label text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p
        className={`mt-1 tabular-nums ${
          strong ? "display text-xl text-foreground" : "text-base font-bold text-foreground-soft"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function Section({ title, cards }: { title: string; cards: { label: string; value: string; strong?: boolean }[] }) {
  return (
    <div>
      <p className="label mb-2 text-[11px] font-semibold uppercase tracking-wider text-secondary">{title}</p>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {cards.map((c) => (
          <StatCard key={c.label} {...c} />
        ))}
      </div>
    </div>
  );
}

function statsPanels(stats: CricketCareerStats) {
  const hs = stats.highestScore != null
    ? `${formatNumber(stats.highestScore)}${stats.highestScoreNotOut ? "*" : ""}`
    : "-";
  const winPct =
    stats.matchesAsCaptain && stats.captainWins != null
      ? `${((stats.captainWins / stats.matchesAsCaptain) * 100).toFixed(1)}%`
      : "-";

  return [
    {
      title: "Batting",
      cards: [
        { label: "Matches", value: formatNumber(stats.matches) },
        { label: "Innings", value: formatNumber(stats.innings) },
        { label: "Runs", value: formatNumber(stats.runs), strong: true },
        { label: "Highest", value: hs },
        { label: "Average", value: formatDecimal(stats.battingAverage) },
        { label: "Strike rate", value: formatDecimal(stats.strikeRate) },
        { label: "100s", value: formatNumber(stats.hundreds) },
        { label: "50s", value: formatNumber(stats.fifties) },
        { label: "Fours", value: formatNumber(stats.fours) },
        { label: "Sixes", value: formatNumber(stats.sixes) },
        { label: "Not outs", value: formatNumber(stats.notOuts) },
        { label: "Ducks", value: formatNumber(stats.ducks) },
      ],
    },
    {
      title: "Bowling",
      cards: [
        { label: "Wickets", value: formatNumber(stats.wickets), strong: true },
        { label: "Balls", value: formatNumber(stats.ballsBowled) },
        { label: "Runs conceded", value: formatNumber(stats.runsConceded) },
        { label: "Average", value: formatDecimal(stats.bowlingAverage) },
        { label: "Economy", value: formatDecimal(stats.economy) },
        { label: "Strike rate", value: formatDecimal(stats.bowlingStrikeRate) },
        { label: "Best innings", value: stats.bestBowlingInnings ?? "-" },
        { label: "Best match", value: stats.bestBowlingMatch ?? "-" },
        { label: "Maidens", value: formatNumber(stats.maidens) },
        { label: "5W hauls", value: formatNumber(stats.fiveWicketHauls) },
        { label: "10W hauls", value: formatNumber(stats.tenWicketHauls) },
      ],
    },
    {
      title: "Fielding",
      cards: [
        { label: "Catches", value: formatNumber(stats.catches), strong: true },
        { label: "Stumpings", value: formatNumber(stats.stumpings) },
        { label: "Run outs", value: formatNumber(stats.runOuts) },
        { label: "Dismissals", value: formatNumber(stats.dismissals) },
      ],
    },
    {
      title: "Captaincy",
      cards: [
        { label: "Matches", value: formatNumber(stats.matchesAsCaptain), strong: true },
        { label: "Wins", value: formatNumber(stats.captainWins) },
        { label: "Losses", value: formatNumber(stats.captainLosses) },
        { label: "Draws", value: formatNumber(stats.captainDraws) },
        { label: "Win %", value: winPct },
      ],
    },
  ];
}

/**
 * Player career statistics with format tabs (Test / ODI / T20I / IPL).
 * Panels render only fields the provider actually supplied; formats without
 * data show the honest unavailable state.
 */
export function PlayerStats({ results }: PlayerStatsProps) {
  const [format, setFormat] = useState<CricketFormatId>("test");
  const active = results.find((r) => r.format === format);

  if (!active) {
    return <RecordsUnavailable message="Career statistics are not available for this player." />;
  }

  const formatDef = cricketFormat(format);

  return (
    <div className="space-y-5">
      <CricketFormatTabs active={format} onChange={setFormat} />

      {active.status === "unavailable" && (
        <RecordsUnavailable
          message={active.error ?? `Career ${formatDef.label} statistics are not available for this player.`}
          source={active.source}
          sourceUrl={active.sourceUrl}
          lastUpdated={active.lastUpdated}
        />
      )}

      {active.status === "ready" && active.stats && (
        <div className="space-y-6">
          {statsPanels(active.stats).map((section) => (
            <Section key={section.title} {...section} />
          ))}
          <CricketSourceFooter
            source={active.source}
            sourceUrl={active.sourceUrl}
            lastUpdated={active.lastUpdated}
          />
        </div>
      )}
    </div>
  );
}
