"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Fixture, sportShortLabels } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { matchHref } from "@/lib/utils";

interface FixtureListProps {
  fixtures: Fixture[];
  title?: string;
  href?: string;
}

export function FixtureList({ fixtures, title = "Upcoming Fixtures", href = "/calendar" }: FixtureListProps) {
  return (  <div className="overflow-hidden bg-score-surface border border-score-border">
      <div className="flex items-center justify-between border-b border-score-border px-6 py-5">
        <div>
          <h2 className="heading text-lg text-foreground">{title}</h2>
          <p className="meta mt-0.5">Mark your calendar</p>
        </div>
        <Link
          href={href}
          className="shrink-0  px-3 py-1.5 text-sm font-semibold text-score-muted transition-colors hover:bg-score-elevated hover:text-score-text rounded-md"
        >
          Full Calendar
        </Link>
      </div>

      <div className="divide-y divide-score-border">
        {fixtures.map((fixture) => (
          <Link
            key={fixture.id}
            href={matchHref({ sport: fixture.sport, id: fixture.id })}
            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-score-elevated"
          >
            <div className="hidden flex-col items-center sm:flex">
              <span className="text-xs font-bold tabular-nums">{fixture.time}</span>
              <span className="meta">{fixture.dateTime}</span>
            </div>

            <div className="min-w-0 flex-1">
              <div className="mb-1.5 flex items-center gap-2">
                <span className="label text-score-muted">{sportShortLabels[fixture.sport]}</span>
                <span className="label truncate text-score-muted">{fixture.league}</span>
                {fixture.isLive && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-score-accent">
                    <span className="relative flex h-1 w-1">
                      <span className="absolute inline-flex h-full w-full bg-score-accent animate-ping-ring" />
                      <span className="relative inline-flex h-1 w-1 bg-score-accent" />
                    </span>
                    Live
                  </span>
                )}
              </div>
<div className="flex items-center gap-2.5">
                <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} size="xs" />
                <span className="truncate text-sm font-medium text-score-text">{fixture.homeTeam.name}</span>
                {fixture.awayTeam && (
                  <>
                    <span className="shrink-0 text-xs text-score-muted">vs</span>
                    <span className="truncate text-sm font-medium text-score-text">{fixture.awayTeam.name}</span>
                    <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} size="xs" />
                  </>
                )}
              </div>
            </div>

            <div className="shrink-0 text-right">
              <p className="hidden text-xs font-semibold text-muted md:block">{fixture.title}</p>
              <p className="text-xs font-bold tabular-nums sm:hidden">{fixture.time}</p>
              <ChevronRight className="ml-auto mt-1 h-4 w-4 text-faint transition-transform group-hover:translate-x-0.5 group-hover:text-foreground" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
