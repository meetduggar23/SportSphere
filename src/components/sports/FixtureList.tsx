"use client";

import { Fixture } from "@/types";

interface FixtureListProps {
  fixtures: Fixture[];
}

export function FixtureList({ fixtures }: FixtureListProps) {
  return (
    <div className="bg-card-bg rounded-xl border border-border overflow-hidden">
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between">
          <h2 className="font-bold text-lg">Upcoming Fixtures</h2>
          <button className="text-sm font-medium text-primary hover:bg-primary/10 px-3 py-1.5 rounded-lg transition-colors">
            View Full Calendar
          </button>
        </div>
      </div>

      <div className="divide-y divide-border">
        {fixtures.map((fixture) => (
          <div key={fixture.id} className="p-4 hover:bg-muted/5 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className="text-xs text-muted capitalize">{fixture.sport}</span>
                <span className="text-xs text-muted">•</span>
                <span className="text-xs text-muted">{fixture.league}</span>
              </div>
              <div className="text-right">
                <p className="text-xs text-muted">{fixture.dateTime}</p>
                <p className="text-xs font-medium">{fixture.time}</p>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{fixture.homeTeam.logo}</span>
                  <span className="font-medium text-sm">{fixture.homeTeam.name}</span>
                </div>
                {fixture.awayTeam && (
                  <>
                    <span className="text-xs text-muted px-2">vs</span>
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-sm">{fixture.awayTeam.name}</span>
                      <span className="text-lg">{fixture.awayTeam.logo}</span>
                    </div>
                  </>
                )}
              </div>
              {fixture.awayTeam && (
                <span className="text-xs text-muted font-medium">{fixture.title}</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
