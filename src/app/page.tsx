"use client";

import { Header } from "@/components/layout/Header";
import { Sidebar } from "@/components/layout/Sidebar";
import { StatsCard } from "@/components/ui/StatsCard";
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
} from "@/data/mock";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="flex">
        <Sidebar />

        <main className="flex-1 p-4 lg:p-6 overflow-x-hidden">
          <div className="max-w-7xl mx-auto">
            {/* Welcome Section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold">Good Evening, Meet! 👋</h1>
              <p className="text-muted text-sm mt-1">
                Here&apos;s what&apos;s happening in the world of sports
              </p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {statsCards.map((card, i) => (
                <StatsCard key={i} card={card} />
              ))}
            </div>

            <div className="flex gap-6">
              {/* Main Content */}
              <div className="flex-1 min-w-0">
                {/* Live Matches */}
                <section className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">Live Matches</h2>
                    <button className="text-sm font-medium text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
                      View All Live <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {liveMatches.map((match) => (
                      <LiveMatchCard key={match.id} match={match} />
                    ))}
                  </div>
                </section>

                {/* Top News */}
                <section className="mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="font-bold text-lg">Top News</h2>
                    <button className="text-sm font-medium text-primary flex items-center gap-1 hover:text-primary/80 transition-colors">
                      View All News <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {topNews.map((news) => (
                      <NewsCard key={news.id} news={news} />
                    ))}
                  </div>
                </section>

                {/* Fixtures and Standings */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <FixtureList fixtures={upcomingFixtures} />
                  <StandingsTable standings={standings} />
                </div>
              </div>

              {/* Right Sidebar */}
              <div className="hidden xl:block w-72 space-y-6">
                <TrendingSidebar items={trendingNow} />
                <TopPlayersSidebar players={topPlayers} />
                <AIPrediction />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
