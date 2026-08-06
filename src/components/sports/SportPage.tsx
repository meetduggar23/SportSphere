"use client";

import { useState } from "react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { FixtureList } from "@/components/sports/FixtureList";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { NewsCard } from "@/components/sports/NewsCard";
import { TopPlayersSidebar } from "@/components/dashboard/TopPlayersSidebar";
import { Match, Fixture, Standing, News, Player } from "@/types";
import { sportLabels, Sport } from "@/types";

interface SportPageProps {
  sport: Sport;
  icon: React.ReactNode;
  matches: Match[];
  fixtures: Fixture[];
  standings: Standing[];
  news: News[];
  players: Player[];
  competitions: string[];
  hero: React.ReactNode;
}

const tabs = ["Live", "Fixtures", "Standings", "News", "Top Players"];

export function SportPage({
  sport,
  icon,
  matches,
  fixtures,
  standings,
  news,
  players,
  competitions,
  hero,
}: SportPageProps) {
  const [activeTab, setActiveTab] = useState("Live");

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader icon={icon} title={sportLabels[sport]} subtitle={`Everything ${sportLabels[sport]}. Live scores, fixtures, standings, and more`} />

        {hero}

        <div className="flex flex-col gap-2 mb-6">
          <SportTabs
            tabs={tabs.map((t) => ({
              label: t,
              value: t,
              count: t === "Live" ? matches.length : t === "News" ? news.length : undefined,
            }))}
            active={activeTab}
            onChange={setActiveTab}
          />
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            {activeTab === "Live" && (
              <section>
                <SectionHeader title={`Live & Upcoming`} href="/live" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matches.map((match) => (
                    <LiveMatchCard key={match.id} match={match} />
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Fixtures" && (
              <FixtureList fixtures={fixtures} title="Upcoming Fixtures" href="/calendar" />
            )}

            {activeTab === "Standings" && (
              <StandingsTable standings={standings} title={`${sportLabels[sport]} Standings`} />
            )}

            {activeTab === "News" && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {news.map((n) => (
                    <NewsCard key={n.id} news={n} />
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Top Players" && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {players.map((p) => (
                    <div key={p.id} className="bg-card rounded-xl border border-border p-4 hover:shadow-lg transition-all">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-lg shrink-0">
                          {p.teamLogo}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-sm truncate">{p.name}</p>
                          <p className="text-xs text-muted">{p.team} • {p.position}</p>
                        </div>
                        <span className="text-sm font-bold">{p.rating}★</span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
                        <span className="text-xs text-muted">{p.statLabel}</span>
                        <span className="text-sm font-bold text-primary">{p.stat}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden xl:block w-72 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3">Competitions</h3>
              <ul className="space-y-1">
                {competitions.map((c) => (
                  <li key={c}>
                    <a href="#" className="text-sm text-muted hover:text-primary transition-colors block py-1.5 rounded-lg hover:bg-muted/10 px-2">
                      {c}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <TopPlayersSidebar players={players.slice(0, 5)} title={`Top ${sportLabels[sport]} Players`} />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
