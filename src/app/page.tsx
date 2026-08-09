"use client";

import { useMemo, useState } from "react";
import { Radio, Trophy } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { DataStatus } from "@/components/ui/DataStatus";
import { SportTabs } from "@/components/ui/SportTabs";
import { FeaturedEvent } from "@/components/home/FeaturedEvent";
import { LiveMatchCard } from "@/components/sports/LiveMatchCard";
import { NewsCard } from "@/components/sports/NewsCard";
import { MatchRow } from "@/components/sports/MatchRow";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { TrendingSidebar } from "@/components/dashboard/TrendingSidebar";
import { useHomeFeed, homeSports, getFeaturedLiveEvent } from "@/lib/homeFeed";
import { sportIcons, sportLabels, TrendingItem, Sport, Match } from "@/types";
import { topNews } from "@/data/mock";

const shortLabels: Record<Sport, string> = {
  football: "Football",
  cricket: "Cricket",
  basketball: "Basketball",
  f1: "Formula 1",
  nfl: "NFL",
  baseball: "Baseball",
  hockey: "Hockey",
  mma: "MMA",
  rugby: "Rugby",
  volleyball: "Volleyball",
  handball: "Handball",
  afl: "AFL",
  nba: "NBA",
};

export default function Home() {
  const feed = useHomeFeed();
  const [filter, setFilter] = useState<string>("all");

  const filterTabs = useMemo(
    () => [
      { label: "All Sports", value: "all", count: feed.live.length },
      ...homeSports.map((s) => ({
        label: `${sportIcons[s]} ${shortLabels[s]}`,
        value: s,
        count: feed.live.filter((m) => m.sport === s).length,
      })),
    ],
    [feed.live]
  );

  const scoped = useMemo(() => {
    const keep = (m: Match) => filter === "all" || m.sport === filter;
    return {
      live: feed.live.filter(keep),
      upcoming: feed.upcoming.filter(keep),
      results: feed.results.filter(keep),
    };
  }, [feed.live, feed.upcoming, feed.results, filter]);

  const featured = scoped.live[0];
  const otherLive = scoped.live.slice(1);

  // Dynamic trending — built from what is actually live/upcoming right now.
  // getFeaturedLiveEvent picks the most relevant event sport-agnostically:
  // live → nearest upcoming → latest result.
  const trendingItems: TrendingItem[] = useMemo(() => {
    const featuredPick = getFeaturedLiveEvent(feed);
    const source = featuredPick
      ? feed.live.length > 0
        ? feed.live
        : feed.upcoming
      : feed.results;
    return source.slice(0, 6).map((m, i) => ({
      id: m.id,
      rank: i + 1,
      title: `${m.homeTeam.name} vs ${m.awayTeam.name}`,
      subtitle: `${m.league} • ${sportLabels[m.sport]}`,
      logos: [sportIcons[m.sport]],
      trend: "up" as const,
    }));
  }, [feed.live, feed.upcoming, feed.results]);

  // Group standings by sport so each competition gets its own table.
  const standingsGroups = useMemo(() => {
    const map = new Map<Sport, typeof feed.standings>();
    for (const row of feed.standings) {
      const arr = map.get(row.team.sport) ?? [];
      arr.push(row);
      map.set(row.team.sport, arr);
    }
    return homeSports
      .filter((s) => (map.get(s)?.length ?? 0) > 0)
      .map((s) => ({ sport: s, rows: map.get(s) ?? [] }));
  }, [feed.standings]);

  const [standingSport, setStandingSport] = useState<string | null>(null);
  const activeStandings = standingsGroups.find((g) => g.sport === (standingSport ?? standingsGroups[0]?.sport));

  const liveCount = feed.live.length;

  return (
    <AppShell>
      <div className="mx-auto max-w-[1440px] px-4 py-6 lg:px-6 lg:py-8">
        {/* Kickoff strip — fully dynamic, no single-sport hero */}
        <div className="mb-10 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker mb-1.5 text-muted-strong">Sports Desk / Live Sports</p>
            <h1 className="display text-4xl md:text-6xl">
              The world of sports, <span className="text-secondary">live</span>
            </h1>
            <p className="mt-3 max-w-xl text-muted-strong">
              Every sport, one feed. Live scores, upcoming events and results from across the
              entire SportsSphere — whatever is happening right now, right here.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2  border border-border bg-blue/15 px-3.5 py-1.5 text-xs text-muted-strong">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full  bg-berry animate-ping-ring" />
                <span className="relative inline-flex h-2 w-2  bg-berry" />
              </span>
              {feed.status === "loading"
                ? "Checking live events…"
                : liveCount > 0
                  ? `${liveCount} ${liveCount === 1 ? "event" : "events"} live now`
                  : "No live events right now"}
            </span>
          </div>
        </div>

        <DataStatus
          status={feed.status}
          dataSource={feed.status === "ready" ? "Live providers" : undefined}
          lastUpdated={feed.lastUpdated}
          error={feed.error}
          onRetry={feed.retry}
        />

        {/* Sport filter — All Sports by default, never football-biased */}
        <div className="mb-10">
          <SportTabs tabs={filterTabs} active={filter} onChange={setFilter} />
        </div>

        <div className="grid grid-cols-1 gap-10 xl:grid-cols-[1fr_320px]">
          <div className="min-w-0 space-y-12">
            {/* 1. Live Now — dynamically populated from all currently live sports */}
            <section>
              <SectionHeader
                title="Live Now"
                kicker="On air"
                href="/live"
                linkLabel="All Live"
                icon={<Radio className="h-5 w-5" />}
              />

              {feed.status === "loading" ? (
                <div className="flex items-center justify-center py-16 text-muted">
                  Loading live events across all sports…
                </div>
              ) : featured ? (
                <>
                  <div className="mb-5">
                    <FeaturedEvent match={featured} />
                  </div>
                  {otherLive.length > 0 && (
                    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                      {otherLive.map((match) => (
                        <LiveMatchCard key={match.id} match={match} />
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <div className="arena-card text-center py-16">
                  <p className="text-4xl mb-4">📡</p>
                  <p className="heading text-xl text-foreground">No live events right now</p>
                  <p className="mt-2 text-sm text-muted">
                    {filter === "all"
                      ? "Nothing is live at this moment. Upcoming events across all sports are below."
                      : `No live ${shortLabels[filter as Sport]} events at this moment. Upcoming events are below.`}
                  </p>
                </div>
              )}
            </section>

            {/* 2. Upcoming Events — next events across multiple sports */}
            <section>
              <SectionHeader title="Upcoming" kicker="Fixtures" href="/calendar" linkLabel="Calendar" />
              {scoped.upcoming.length > 0 ? (
                <div className="space-y-3">
                  {scoped.upcoming.slice(0, 5).map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
                </div>
              ) : (
                <div className="arena-card text-center py-12">
                  <p className="text-3xl mb-3">🗓️</p>
                  <p className="font-medium text-muted">No upcoming events available</p>
                </div>
              )}
            </section>

            {/* 3. Latest Results — recently completed events */}
            <section>
              <SectionHeader title="Latest Results" kicker="Full time" href="/live" linkLabel="Scores" />
              {scoped.results.length > 0 ? (
                <div className="space-y-3">
                  {scoped.results.slice(0, 5).map((m) => (
                    <MatchRow key={m.id} match={m} />
                  ))}
                </div>
              ) : (
                <div className="arena-card text-center py-12">
                  <p className="text-3xl mb-3">🏁</p>
                  <p className="font-medium text-muted">No completed events available</p>
                </div>
              )}
            </section>

            {/* 4. News — no news provider connected, labeled as demo */}
            <section>
              <SectionHeader
                title="News"
                kicker="Latest"
                href="/news"
                linkLabel="All News"
                icon={<span className="text-lg">📰</span>}
              />
              <div className="mb-3 -mt-2 flex items-center gap-2">
                <DemoBadge label="Demo content — no news provider connected" />
              </div>
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

            {/* 5. Standings — important/current competitions, grouped by sport */}
            {standingsGroups.length > 0 && activeStandings && (
              <section>
                <SectionHeader title="Standings" kicker="League tables" href="/standings" linkLabel="Full Tables" />
                <div className="mb-4">
                  <SportTabs
                    tabs={standingsGroups.map((g) => ({
                      label: `${sportIcons[g.sport]} ${shortLabels[g.sport]}`,
                      value: g.sport,
                    }))}
                    active={activeStandings.sport}
                    onChange={setStandingSport}
                  />
                </div>
                <StandingsTable standings={activeStandings.rows} compact title={`${shortLabels[activeStandings.sport]} Standings`} />
              </section>
            )}
          </div>

          {/* Editorial rail */}
          <aside className="hidden xl:block">
            <div className="sticky top-28 space-y-5">
              <TrendingSidebar
                items={trendingItems}
                title={feed.live.length > 0 ? "Trending Live" : "Trending Upcoming"}
              />
              <div className="overflow-hidden  arena-card p-5">
                <p className="kicker mb-2 text-muted-strong">All Sports</p>
                <h3 className="heading text-lg text-foreground">One feed, every sport</h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  Live action, fixtures and results across {homeSports.length} sports — cricket to
                  F1, MMA to the NBA. The feed reflects exactly what is happening right now.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {homeSports.map((s) => (
                    <span key={s} className="inline-flex items-center gap-1  bg-blue/15 px-2 py-1 text-[10px] text-muted-strong">
                      {sportIcons[s]} {shortLabels[s]}
                    </span>
                  ))}
                </div>
              </div>
              <div className="overflow-hidden  arena-card p-5">
                <p className="kicker mb-2 text-muted-strong">SportsSphere</p>
                <h3 className="heading text-lg text-foreground flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-secondary" /> Live providers
                </h3>
                <p className="mt-2 text-sm text-muted leading-relaxed">
                  {feed.status === "ready"
                    ? `Updated ${feed.lastUpdated ? new Date(feed.lastUpdated).toLocaleTimeString() : "just now"}.`
                    : "Live data is temporarily unavailable."}
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
