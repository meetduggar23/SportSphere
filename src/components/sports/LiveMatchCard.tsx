"use client";

import Link from "next/link";
import { MapPin, Clock } from "lucide-react";
import { Match } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { MatchMeta } from "@/components/sports/MatchMeta";
import { cn, matchHref } from "@/lib/utils";

interface LiveMatchCardProps {
  match: Match;
  className?: string;
}

export function LiveMatchCard({ match, className }: LiveMatchCardProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
    <Link
      href={matchHref(match)}
      className={cn(
        "group relative flex flex-col overflow-hidden bg-score-surface border border-score-border arena-card-hover hover:bg-score-elevated transition-colors",
        isLive && "ring-1 ring-score-border",
        className
      )}
    >
      {/* Live top accent bar — small sky accent only */}
      {isLive && <div className="absolute inset-x-0 top-0 h-0.5 bg-score-accent" />}

      {/* Header — sport · competition · status */}
      <div className="px-5 pt-4">
        <MatchMeta
          sport={match.sport}
          league={match.league}
          competition={match.competition}
          status={match.status}
          minute={match.minute}
          period={match.period}
        />
      </div>

      {/* Scoreboard */}
      <div className="flex items-center justify-between gap-3 px-5 py-5">
        <div className="flex flex-1 items-center gap-3">
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="md" />
          <span className="font-semibold text-sm leading-tight text-score-text">{match.homeTeam.name}</span>
        </div>
        <div className="flex shrink-0 flex-col items-center">
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "display text-3xl tabular-nums text-score-text"
              )}
            >
              {match.homeScore}
            </span>
            <span className="text-sm text-score-muted">—</span>
            <span
              className={cn(
                "display text-3xl tabular-nums text-score-text"
              )}
            >
              {match.awayScore}
            </span>
          </div>
          {match.details && <p className="meta mt-1.5 text-center text-score-muted">{match.details}</p>}
        </div>
        <div className="flex flex-1 items-center justify-end gap-3">
          <span className="font-semibold text-sm text-right leading-tight text-score-text">{match.awayTeam.name}</span>
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="md" />
        </div>
      </div>

      {/* Footer — venue + kickoff/competition (the header already shows live time) */}
      <div className="mt-auto flex items-center justify-between border-t border-score-border bg-score-elevated/50 px-5 py-3">
        <span className="flex items-center gap-1.5 meta text-score-muted">
          <MapPin className="h-3 w-3" /> {match.venue ?? "TBD"}
        </span>
        <span className="meta text-score-muted">
          {isUpcoming ? (
            <span className="flex items-center gap-1.5">
              <Clock className="h-3 w-3" /> {match.date}
            </span>
          ) : (
            match.competition ?? match.league
          )}
        </span>
      </div>
    </Link>
  );
}
