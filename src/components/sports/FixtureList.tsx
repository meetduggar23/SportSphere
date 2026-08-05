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
    <div className="bg-card rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">{title}</h2>
          <Link
            href={href}
            className="text-sm font-medium text-primary hover:text-primary-hover px-3 py-1.5 rounded-lg transition-colors"
          >
            Full Calendar
          </Link>
        </div>
      </div>

      <div className="divide-y divide-border">
        {fixtures.map((fixture) => (
          <Link
            key={fixture.id}
            href={`/match/${fixture.id}`}
            className="block p-4 hover:bg-muted/5 transition-colors"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-sm">{sportIcons[fixture.sport]}</span>
                <span className="text-xs text-muted">{fixture.league}</span>
                {fixture.isLive && (
                  <span className="flex items-center gap-1 text-xs font-bold text-red-500">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse-live" />
                    LIVE
                  </span>
                )}
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">{fixture.dateTime}</p>
                <p className="text-xs font-medium">{fixture.time}</p>
              </div>
            </div>

            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                <div className="flex items-center gap-2 min-w-0">
                  <TeamLogo logo={fixture.homeTeam.logo} name={fixture.homeTeam.name} size="sm" />
                  <span className="font-medium text-sm truncate">{fixture.homeTeam.name}</span>
                </div>
                {fixture.awayTeam && (
                  <>
                    <span className="text-xs text-muted px-1 shrink-0">vs</span>
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="font-medium text-sm truncate">{fixture.awayTeam.name}</span>
                      <TeamLogo logo={fixture.awayTeam.logo} name={fixture.awayTeam.name} size="sm" />
                    </div>
                  </>
                )}
              </div>
              {fixture.awayTeam && (
                <span className="text-xs text-muted font-medium shrink-0 hidden sm:inline">
                  {fixture.title}
                </span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
