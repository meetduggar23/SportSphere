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
import { Match, Fixture, Standing, News, Player } from "@/types";
import { sportLabels, Sport } from "@/types";
import { getSportAccent } from "@/config/sports";
import { TeamLogo } from "@/components/ui/TeamLogo";

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
  extra?: React.ReactNode;
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
  extra,
}: SportPageProps) {
  const [activeTab, setActiveTab] = useState("Live");
  const accent = getSportAccent(sport);
  const accentStyle = {
    "--sport-accent": accent.accent,
    "--sport-soft": accent.soft,
    "--sport-grad": accent.gradient,
  } as CSSProperties;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1440px] px-4 py-8 lg:px-6 lg:py-10" style={accentStyle}>
        <PageHeader
          icon={icon}
          title={sportLabels[sport]}
          kicker="SportSphere Coverage"
          subtitle={`Everything ${sportLabels[sport]}. Live scores, fixtures, standings, and more`}
        />

        {hero}

        {extra}

        <div className="mb-8">
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

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-[1fr_300px]">
          <div className="min-w-0 space-y-10">
            {activeTab === "Live" && (
              <section>
                <SectionHeader title={`Live & Upcoming`} href="/live" kicker="On now & next" />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-3">
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
                <SectionHeader title="Latest News" href="/news" kicker="Stories & reports" />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {news.map((n) => (
                    <NewsCard key={n.id} news={n} />
                  ))}
                </div>
              </section>
            )}

            {activeTab === "Top Players" && (
              <section>
                <SectionHeader title="Top Players" href="/players" kicker="Leaders & performers" />
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
{players.map((p) => (
                    <div
                      key={p.id}
                      className="group relative overflow-hidden rounded-3xl arena-card arena-card-hover p-5"
                    >
                      <div
                        className="absolute -right-10 -top-10 h-32 w-32 rounded-full blur-2xl opacity-20"
                        style={{ backgroundColor: "var(--sport-accent)" }}
                      />
                      <div className="relative flex items-center gap-4">
                        {p.photo ? (
                          <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-2xl border border-border-navy bg-navy/50">
                            <img src={p.photo} alt={p.name} className="h-full w-full object-cover" />
                          </div>
                        ) : (
                          <TeamLogo logo={p.teamLogo} name={p.team} size="md" />
                        )}
                        <div className="min-w-0">
                          <p className="heading truncate text-base text-foreground transition-colors group-hover:text-foreground-soft">
                            {p.name}
                          </p>
                          <p className="meta mt-0.5 truncate">
                            {p.team} • {p.position}
                          </p>
                        </div>
                      </div>
                      <div className="relative mt-4 flex items-center justify-between border-t border-border-navy pt-4">
                        <span className="meta">{p.statLabel}</span>
                        <span className="display text-2xl text-foreground">
                          {p.stat}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-5">
<div className="overflow-hidden rounded-3xl arena-card">
                <div className="border-b border-border-navy px-5 py-4">
                  <h3 className="heading text-base text-foreground">Competitions</h3>
                  <p className="meta mt-0.5">{sportLabels[sport]} tournaments</p>
                </div>
                <ul className="p-2">
                  {competitions.map((c) => (
                    <li key={c}>
                      <a
                        href="#"
                        className="group flex items-center justify-between rounded-xl px-3.5 py-2.5 text-sm text-muted transition-colors hover:bg-blue/40 hover:text-foreground"
                      >
                        <span className="truncate">{c}</span>
                        <span
                          className="h-1.5 w-1.5 rounded-full bg-border-strong opacity-0 transition-opacity group-hover:opacity-100"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
