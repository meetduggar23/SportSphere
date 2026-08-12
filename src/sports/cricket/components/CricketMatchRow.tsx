"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { cricketFormat } from "@/sports/cricket/config/cricketConfig";
import { formatInningsScore, normalizeName } from "@/sports/cricket/utils/cricketFormat";
import type { CricketMatch } from "@/sports/cricket/types/cricketTypes";
import { cn } from "@/lib/utils";

interface CricketMatchRowProps {
  match: CricketMatch;
  className?: string;
}

/**
 * Cricket match row: format badge, series, teams, innings scores and status.
 * Links to the match scorecard when one is available.
 */
export function CricketMatchRow({ match, className }: CricketMatchRowProps) {
  const format = cricketFormat(match.format);
  const [home, away] = match.teams;
  const homeScore = match.score.find((s) => normalizeName(s.team) === normalizeName(home));
  const awayScore = match.score.find((s) => normalizeName(s.team) === normalizeName(away));

  return (
    <Link
      href={`/sports/cricket/match/${match.id}`}
      className={cn(
        "group flex items-center gap-4 px-5 py-4 bg-score-surface border border-score-border hover:bg-score-elevated transition-colors",
        match.status === "live" && "ring-1 ring-score-border",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <span className="label shrink-0 border border-score-border bg-score-elevated/60 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-score-muted rounded-sm">
            {format.shortLabel}
          </span>
          <span className="label truncate text-score-muted">{match.series}</span>
          <span className="ml-auto flex shrink-0 items-center gap-2">
            {match.status === "live" && <LiveBadge />}
            {match.status === "finished" && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-score-muted">
                Final
              </span>
            )}
            {match.status === "upcoming" && (
              <span className="text-[10px] font-bold uppercase tracking-wider text-score-muted">
                Upcoming
              </span>
            )}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-x-4 gap-y-1 sm:grid-cols-2">
          {home && (
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-score-text">{home}</span>
              <span className="shrink-0 text-sm font-bold tabular-nums text-score-text">
                {homeScore ? formatInningsScore(homeScore) : "-"}
              </span>
            </div>
          )}
          {away && (
            <div className="flex items-center justify-between gap-3">
              <span className="truncate text-sm font-semibold text-score-text">{away}</span>
              <span className="shrink-0 text-sm font-bold tabular-nums text-score-text">
                {awayScore ? formatInningsScore(awayScore) : "-"}
              </span>
            </div>
          )}
        </div>

        {match.statusText && (
          <p className="meta truncate text-xs text-score-accent">{match.statusText}</p>
        )}
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-score-muted transition-transform group-hover:translate-x-0.5 group-hover:text-score-text" />
    </Link>
  );
}
