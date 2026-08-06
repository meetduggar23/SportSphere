"use client";

import { useState, CSSProperties } from "react";
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
import { getSportAccent } from "@/config/sports";

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
  const accent = getSportAccent(sport);
  const accentStyle = {
    "--sport-accent": accent.accent,
    "--sport-soft": accent.soft,
  } as CSSProperties;

  return (
    <AppShell>
      <div className="mx-auto max-w-7xl" style={accentStyle}>
        <PageHeader
          icon={icon}
          title={sportLabels[sport]}
          subtitle={`Everything ${sportLabels[sport]}. Live scores, fixtures, standings, and more`}
        />

        {hero}

        <div className="flex flex-col gap-2 mb-8">
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

        <div className="flex gap-8">
          <div className="flex-1 min-w-0 space-y-8">
            {activeTab === "Live" && (
              <section>
                <SectionHeader title={`Live & Upcoming`} href="/live" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              <StandingsTable
                standings={standings}
                title={`${sportLabels[sport]} Standings`}
              />
            )}

            {activeTab === "News" && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {news.map((n) => (
                    <NewsCard key={n.id} news={n} />
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Top Players" && (
              <section>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {players.map((p) => (
                    <div
                      key={p.id}
                      className="group overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:-translate-y-1 hover:shadow-pop"
                    >
                      <div className="relative h-24 bg-gradient-to-br from-primary/15 to-transparent">
                        {p.photo ? (
                          <img
                            src={p.photo}
                            alt={p.name}
                            loading="lazy"
                            decoding="async"
                            className="absolute -bottom-6 left-5 h-16 w-16 rounded-2xl object-cover ring-2 ring-card shadow-card"
                          />
                        ) : (
                          <div className="absolute -bottom-6 left-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-card ring-2 ring-card shadow-card">
                            <span className="text-lg">{p.teamLogo}</span>
                          </div>
                        )}
                      </div>
                      <div className="p-5 pt-10">
                        <p className="font-display font-bold text-sm truncate group-hover:text-primary transition-colors">
                          {p.name}
                        </p>
                        <p className="text-xs text-muted mt-0.5">
                          {p.team} • {p.position}
                        </p>
                        <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
                          <span className="text-xs text-muted">{p.statLabel}</span>
                          <span className="font-display text-lg font-bold" style={{ color: "var(--sport-accent)" }}>
                            {p.stat}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden xl:block w-72 shrink-0 space-y-6">
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-card">
              <div className="px-6 py-5 border-b border-border">
                <h3 className="font-display text-lg font-bold tracking-tight">Competitions</h3>
                <p className="text-xs text-muted mt-0.5">{sportLabels[sport]} tournaments</p>
              </div>
              <ul className="p-2.5">
                {competitions.map((c) => (
                  <li key={c}>
                    <a
                      href="#"
                      className="group flex items-center justify-between px-3.5 py-2.5 text-sm text-muted hover:text-foreground hover:bg-muted/10 rounded-xl transition-colors"
                    >
                      <span className="truncate">{c}</span>
                      <span
                        className="h-1.5 w-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                        style={{ backgroundColor: "var(--sport-accent)" }}
                      />
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
