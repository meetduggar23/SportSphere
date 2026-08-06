"use client";

import Link from "next/link";
import { Fixture, sportIcons } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";

interface FixtureListProps {
  fixtures: Fixture[];
  title?: string;
  href?: string;
}

export function FixtureList({ fixtures, title = "Upcoming Fixtures", href = "/calendar" }: FixtureListProps) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="flex items-center justify-between px-6 py-5 border-b border-border">
        <div>
          <h2 className="font-display text-lg font-bold tracking-tight">{title}</h2>
          <p className="text-xs text-muted mt-0.5">Mark your calendar</p>
        </div>
        <Link
          href={href}
          className="text-sm font-semibold text-primary hover:text-primary-hover px-3 py-1.5 rounded-xl hover:bg-primary/10 transition-colors shrink-0"
        >
          Full Calendar
        </Link>
      </div>

      <div className="divide-y divide-border">
        {fixtures.map((fixture) => (
          <Link
            key={fixture.id}
            href={`/match/${fixture.id}`}
            className="group flex items-center gap-4 px-6 py-4 transition-colors hover:bg-card-hover"
          >
            <div className="hidden sm:flex flex-col items-center w-14 shrink-0">
              <span className="text-xs font-bold text-foreground tabular-nums">{fixture.time}</span>
              <span className="text-[11px] text-muted">{fixture.dateTime}</span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs">{sportIcons[fixture.sport]}</span>
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted">
                  {fixture.league}
                </span>
                {fixture.isLive && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-red-500">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping-dot" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                    </span>
                    LIVE
                  </span>
                )}
              </div>
              <div className="flex items-center gap-2.5">
                <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} size="xs" />
                <span className="font-medium text-sm truncate">{fixture.homeTeam.name}</span>
                {fixture.awayTeam && (
                  <>
                    <span className="text-xs text-muted shrink-0">vs</span>
                    <span className="font-medium text-sm truncate">{fixture.awayTeam.name}</span>
                    <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} size="xs" />
                  </>
                )}
              </div>
            </div>

            <div className="text-right shrink-0">
              <p className="text-xs font-semibold text-muted hidden md:block">{fixture.title}</p>
              <p className="text-xs font-bold sm:hidden tabular-nums">{fixture.time}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
