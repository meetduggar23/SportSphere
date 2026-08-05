"use client";

import { AppShell } from "@/components/layout/AppShell";
import { StatsCard } from "@/components/ui/StatsCard";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { NewsCard } from "@/components/sports/NewsCard";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { FixtureList } from "@/components/sports/FixtureList";
import { TrendingSidebar } from "@/components/dashboard/TrendingSidebar";
import { TopPlayersSidebar } from "@/components/dashboard/TopPlayersSidebar";
import { AIPrediction } from "@/components/dashboard/AIPrediction";
import {
  statsCards,
  liveMatches,
  topNews,
  upcomingFixtures,
  standings,
  trendingNow,
  topPlayers,
  predictions,
} from "@/data/mock";

export default function Home() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <div className="mb-6">
          <h1 className="text-2xl md:text-3xl font-bold tracking-tight">
            Good Evening, Meet! 👋
          </h1>
          <p className="text-muted text-sm mt-1">
            Here&apos;s what&apos;s happening in the world of sports
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {statsCards.map((card, i) => (
            <StatsCard key={i} card={card} />
          ))}
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-8">
            <section>
              <SectionHeader title="Live Matches" href="/live" linkLabel="View All Live" />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {liveMatches.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>

            <section>
              <SectionHeader title="Top News" href="/news" linkLabel="View All News" />
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {topNews.slice(0, 3).map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            </section>

            <section>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FixtureList fixtures={upcomingFixtures} />
                <StandingsTable standings={standings} />
              </div>
            </section>
          </div>

          <aside className="hidden xl:block w-80 shrink-0 space-y-6">
            <TrendingSidebar items={trendingNow} />
            <TopPlayersSidebar players={topPlayers.slice(0, 5)} />
            <AIPrediction prediction={predictions[0]} />
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
