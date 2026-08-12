"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Match } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
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
        "group flex items-center gap-4  px-5 py-3.5 panel panel-hover",
        isLive && "ring-1 ring-border-live/40",
        className
      )}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-2">
          <span className="label truncate">{match.league}</span>
          {isLive && (
            <span className="inline-flex items-center gap-1  bg-primary px-2 py-0.5 text-[9px] font-bold text-navy rounded-full">
              <span className="relative flex h-1 w-1">
                <span className="absolute inline-flex h-full w-full  bg-navy animate-ping-ring" />
                <span className="relative inline-flex h-1 w-1  bg-navy" />
              </span>
              LIVE
            </span>
          )}
        </div>
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
        <span className="meta w-14 text-right">
          {isUpcoming ? match.minute : isLive ? match.minute : match.minute ?? "FT"}
        </span>
        <ChevronRight className="h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>
    </Link>
  );
}
