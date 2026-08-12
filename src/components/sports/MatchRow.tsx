"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Match } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { MatchMeta, MatchStatus } from "@/components/sports/MatchMeta";
import { cn, matchHref } from "@/lib/utils";

interface MatchRowProps {
  match: Match;
  className?: string;
}

export function MatchRow({ match, className }: MatchRowProps) {
  const isLive = match.status === "live";

  return (
    <Link
      href={matchHref(match)}
      className={cn(
        "group flex items-center gap-4 px-5 py-3.5 panel panel-hover",
        isLive && "ring-1 ring-border-live/40",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        {/* Sport · competition — status sits next to the score on the right */}
        <MatchMeta
          sport={match.sport}
          league={match.league}
          competition={match.competition}
          status={match.status}
          minute={match.minute}
          period={match.period}
          showStatus={false}
        />
        <div className="flex items-center gap-2.5">
          <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="sm" />
          <span className="truncate text-sm font-semibold text-foreground-soft">{match.homeTeam.name}</span>
          <span className="meta">vs</span>
          <span className="truncate text-sm font-semibold text-foreground-soft">{match.awayTeam.name}</span>
          <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="sm" />
        </div>
      </div>

      <div className="flex shrink-0 items-center gap-3">
        <div className="flex items-center gap-1.5">
          <span
            className={cn(
              "display text-xl tabular-nums",
              isLive ? "text-berry" : "text-foreground"
            )}
          >
            {match.homeScore}
          </span>
          <span className="text-muted">—</span>
          <span
            className={cn(
              "display text-xl tabular-nums",
              isLive ? "text-berry" : "text-foreground"
            )}
          >
            {match.awayScore}
          </span>
        </div>
        <MatchStatus status={match.status} minute={match.minute} period={match.period} className="w-20 text-right" />
        <ChevronRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
