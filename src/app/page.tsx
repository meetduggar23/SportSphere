"use client";

import { AppShell } from "@/components/layout/AppShell";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { NewsCard } from "@/components/sports/NewsCard";
import { MatchRow } from "@/components/sports/MatchRow";
import { PopularLeagues } from "@/components/home/PopularLeagues";
import { TrendingTeams } from "@/components/home/TrendingTeams";
import { FeaturedPlayers } from "@/components/home/FeaturedPlayers";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { AIPrediction } from "@/components/dashboard/AIPrediction";
import { TrendingSidebar } from "@/components/dashboard/TrendingSidebar";
import {
  liveMatches,
  topNews,
  upcomingFixtures,
  standings,
  trendingNow,
  topPlayers,
  predictions,
  teams,
} from "@/data/mock";

const leagues = [
  { id: "epl", name: "Premier League", sport: "football", country: "England", teams: 20, href: "/football" },
  { id: "ucl", name: "Champions League", sport: "football", country: "Europe", teams: 32, href: "/football" },
  { id: "ipl", name: "Indian Premier League", sport: "cricket", country: "India", teams: 10, href: "/cricket" },
  { id: "nba", name: "NBA", sport: "basketball", country: "USA", teams: 30, href: "/nba" },
  { id: "nfl", name: "NFL", sport: "nfl", country: "USA", teams: 32, href: "/nfl" },
  { id: "f1", name: "Formula 1", sport: "f1", country: "Global", teams: 10, href: "/f1" },
  { id: "nhl", name: "NHL", sport: "hockey", country: "USA", teams: 32, href: "/hockey" },
  { id: "laliga", name: "La Liga", sport: "football", country: "Spain", teams: 20, href: "/football" },
];

const trendingTeams = [
  { id: "rm", name: "Real Madrid", logo: teams.rm.logo, sport: "Football" },
  { id: "ind", name: "India", logo: teams.ind.logo, sport: "Cricket" },
  { id: "mi", name: "Mumbai Indians", logo: teams.mi.logo, sport: "Cricket" },
  { id: "bar", name: "Barcelona", logo: teams.bar.logo, sport: "Football" },
  { id: "bos", name: "Celtics", logo: teams.bos.logo, sport: "Basketball" },
  { id: "mci", name: "Man City", logo: teams.mci.logo, sport: "Football" },
];

export default function Home() {
  const featured = liveMatches[0];
  const otherLive = liveMatches.slice(1);

  return (
    <AppShell>
      <div className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6 lg:py-8">
{/* Kickoff strip */}
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker mb-1.5 text-muted-strong">Sports Desk / Live Sports</p>
            <h1 className="display text-4xl md:text-6xl">
              The world of sports, <span className="text-primary">live</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-strong">
              Live scores, breaking stories, intelligent predictions and every major league on one
              screen — for the fans who live for the moment.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-border-navy bg-navy/50 px-3.5 py-1.5 text-xs text-muted-strong">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-berry" />
              </span>
              {liveMatches.length} matches live now
            </span>
          </div>
        </div>

        {/* 1. Featured Event */}
        <div className="mb-10">
          <FeaturedEvent match={featured} />
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* 2. Live Now */}
            <section>
              <SectionHeader title="Live Now" kicker="On air" href="/live" linkLabel="All Live" />
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                {otherLive.map((match) => (
                  <LiveMatchCard key={match.id} match={match} />
                ))}
              </div>
            </section>

            {/* 3. Breaking Stories */}
            <section>
              <SectionHeader title="Breaking Stories" kicker="Latest" href="/news" linkLabel="All News" />
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <NewsCard news={topNews[0]} variant="featured" className="lg:col-span-2" />
                <div className="flex flex-col gap-4">
                  {topNews.slice(1, 3).map((news) => (
                    <NewsCard key={news.id} news={news} variant="compact" />
                  ))}
                  <NewsCard news={topNews[3]} variant="default" />
                </div>
              </div>
            </section>

            {/* 4. Top Matches */}
            <section>
              <SectionHeader title="Top Matches" kicker="Must watch" href="/live" linkLabel="Scores" />
              <div className="space-y-3">
                {upcomingFixtures.slice(0, 4).map((f) => (
                  <MatchRow
                    key={f.id}
                    match={{
                      id: f.id,
                      sport: f.sport,
                      league: f.league,
                      status: "upcoming",
                      minute: f.time,
                      homeTeam: f.homeTeam,
                      awayTeam: f.awayTeam ?? f.homeTeam,
                      homeScore: "-",
                      awayScore: "-",
                      date: f.dateTime,
                    }}
                  />
                ))}
              </div>
            </section>

            {/* 5. Popular Leagues */}
            <PopularLeagues leagues={leagues} />

            {/* 6. Trending Teams */}
            <TrendingTeams teams={trendingTeams} />

            {/* 7. Featured Players */}
            <FeaturedPlayers players={topPlayers.slice(0, 4)} />

            {/* 8. Upcoming Events */}
            <section>
              <SectionHeader title="Upcoming Events" kicker="Fixtures" href="/calendar" linkLabel="Calendar" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {upcomingFixtures.map((f) => (
                  <div key={f.id} className="rounded-3xl panel panel-hover p-5 text-center">
                    <p className="label mb-3">{f.league}</p>
                    <p className="heading text-base text-foreground">{f.title}</p>
                    <p className="meta mt-2">{f.dateTime} • {f.time}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* 9. Standings */}
            <section>
              <SectionHeader title="Standings" kicker="La Liga 2025" href="/standings" linkLabel="Full Table" />
              <StandingsTable standings={standings} compact />
            </section>

            {/* 10. AI Insights */}
            <section>
              <SectionHeader title="AI Insights" kicker="Predicted" href="/ai-insights" linkLabel="Explore" />
              <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                {predictions.slice(0, 2).map((p) => (
                  <AIPrediction key={p.id} prediction={p} />
                ))}
              </div>
            </section>
          </div>

          {/* Editorial rail */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-5">
              <TrendingSidebar items={trendingNow} title="Trending Now" />
              <div className="overflow-hidden rounded-3xl arena-card p-5">
                <p className="kicker mb-2 text-muted-strong">The Locker Room</p>
                <h3 className="heading text-lg text-foreground">Transfers heating up</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  A record summer window is expected. Clubs are preparing blockbuster moves as the
                  market heats up across Europe.
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
