"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { CricketMatchList } from "@/sports/cricket/components/CricketMatchList";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketMatches } from "@/sports/cricket/hooks/useCricketMatches";
import { useCricketStandings } from "@/sports/cricket/hooks/useCricketSeries";
import { IPL_SEASONS, IPL_TEAMS } from "@/sports/cricket/config/cricketConfig";
import { cn } from "@/lib/utils";

/**
 * IPL HUB — the Indian Premier League treated strictly as its own franchise
 * competition. Matches, points table and teams are separate from India's
 * national-side data.
 */
export function CricketIPLPage() {
  const [season, setSeason] = useState<string>("");

  const { matches, status, source, sourceUrl, lastUpdated } = useCricketMatches({
    series: "Indian Premier League",
    limit: 30,
  });
  const standings = useCricketStandings();

  const visibleMatches = season
    ? matches.filter((m) => m.series.includes(season) || m.date.startsWith(season))
    : matches;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6 lg:py-10">
        <PageHeader
          icon={<Trophy className="h-5 w-5" />}
          title="IPL"
          kicker="SportSphere Cricket"
          subtitle="Indian Premier League — a standalone franchise T20 competition, kept separate from India national cricket."
          actions={
            <div className="flex items-center gap-1  border border-border bg-blue/10 p-1 rounded-md">
              <span className="px-2 text-xs font-semibold text-muted">Season</span>
              {["", ...IPL_SEASONS].map((s) => (
                <button
                  key={s || "all"}
                  onClick={() => setSeason(s)}
                  className={cn(
                    " px-2.5 py-1 text-xs font-semibold transition-colors rounded-sm",
                    season === s ? "bg-blue/50 text-foreground" : "text-muted hover:text-foreground"
                  )}
                >
                  {s || "All"}
                </button>
              ))}
            </div>
          }
        />

        <div className="mb-8 grid grid-cols-1 gap-8 xl:grid-cols-[1fr_380px]">
          <section>
            <SectionHeader title="Matches" kicker="CricAPI live feed" />
            <CricketMatchList
              matches={visibleMatches}
              status={status}
              emptyMessage="No IPL matches available for this season right now."
            />
            <div className="mt-3">
              <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
            </div>
          </section>

          <aside className="space-y-6">
            <section>
              <SectionHeader
                title="Points Table"
                href="/sports/cricket/records"
                linkLabel="Records"
              />
              {standings.status === "ready" && standings.data && standings.data.length > 0 ? (
                <StandingsTable
                  standings={standings.data}
                  title="IPL Points"
                  compact
                  href="/standings"
                />
              ) : (
                <div className="space-y-3">
                  <p className="  border border-border-navy bg-card/50 px-5 py-8 text-center text-sm text-muted rounded-md">
                    {standings.status === "loading"
                      ? "Loading points table…"
                      : "Points table currently unavailable. Add CRICAPI_API_KEY to view the live table."}
                  </p>
                  <CricketSourceFooter
                    source={standings.source}
                    sourceUrl={standings.sourceUrl}
                    lastUpdated={standings.lastUpdated}
                  />
                </div>
              )}
            </section>

            <section>
              <SectionHeader title="Franchises" linkLabel="" />
              <div className="grid grid-cols-2 gap-3">
                {IPL_TEAMS.map((t) => (
                  <div
                    key={t.id}
                    className="group flex items-center gap-2.5  border border-border-navy bg-card/50 px-3 py-2.5 rounded-md"
                  >
                    <TeamLogo logo={t.logo} name={t.name} size="sm" />
                    <span className="min-w-0">
                      <p className="truncate text-xs font-semibold text-foreground-soft">{t.name}</p>
                      <p className="text-[10px] text-muted">{t.city}</p>
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <Link
              href="/sports/cricket/records?format=ipl&category=batting"
              className="block arena-card arena-card-hover p-4 text-sm font-semibold text-secondary"
            >
              IPL records — batting, bowling, fielding →
            </Link>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
