"use client";

import Link from "next/link";
import { Match, sportIcons } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { cn } from "@/lib/utils";

interface MatchRowProps {
  match: Match;
  className?: string;
}

export function MatchRow({ match, className }: MatchRowProps) {
  const isLive = match.status === "live";
  const isUpcoming = match.status === "upcoming";

  return (
    <Link
      href={`/match/${match.id}`}
      className={cn(
        "group block rounded-2xl border border-border bg-card px-4 py-3.5 transition-all duration-300 hover:shadow-card hover:-translate-y-0.5",
        isLive && "ring-1 ring-primary/25",
        className
      )}
    >
      <div className="flex items-center gap-2 mb-2.5">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-muted/10 shrink-0">
          <span className="text-xs">{sportIcons[match.sport]}</span>
        </span>
        <span className="text-[11px] font-semibold uppercase tracking-wider text-muted truncate">
          {match.league}
        </span>
        {isLive && <LiveBadge />}
        {!isLive && (
          <span className="text-xs text-muted ml-auto tabular-nums shrink-0">
            {isUpcoming ? match.minute : match.minute ?? "FT"}
          </span>
        )}
      </div>
      <div className="flex items-center gap-3">
        <div className="flex-1 min-w-0 flex items-center justify-end gap-2.5">
          <span className="font-medium text-sm truncate">{match.homeTeam.name}</span>
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="sm" />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={cn(
              "font-display font-bold text-lg tabular-nums min-w-[30px] text-right",
              isLive && "text-primary"
            )}
          >
            {match.homeScore}
          </span>
          <span className="text-xs text-muted">—</span>
          <span
            className={cn(
              "font-display font-bold text-lg tabular-nums min-w-[30px]",
              isLive && "text-primary"
            )}
          >
            {match.awayScore}
          </span>
        </div>
        <div className="flex-1 min-w-0 flex items-center gap-2.5">
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="sm" />
          <span className="font-medium text-sm truncate">{match.awayTeam.name}</span>
        </div>
      </div>
    </Link>
  );
}
