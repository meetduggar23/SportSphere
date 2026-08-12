"use client";

import { use, useState } from "react";
import Link from "next/link";
import { Search as SearchIcon, Users, Trophy, Newspaper, CalendarDays, Clock } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { teams, topPlayers, topNews, tournaments, allMatches, recentSearches } from "@/data/mock";
import { sportShortLabels } from "@/types";
import { cn, matchHref } from "@/lib/utils";

function normalize(s: string) {
  return s.toLowerCase().trim();
}

export default function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const params = use(searchParams);
  const query = params.q ?? "";
  return <SearchContent key={query} initialQuery={query} />;
}

function SearchContent({ initialQuery }: { initialQuery: string }) {
  const [localQuery, setLocalQuery] = useState(initialQuery);
  const q = normalize(localQuery);

  const matchedTeams = q ? Object.values(teams).filter((t) => normalize(t.name).includes(q)) : [];
  const matchedPlayers = q ? topPlayers.filter((p) => normalize(p.name).includes(q)) : [];
  const matchedNews = q ? topNews.filter((n) => normalize(n.title).includes(q)) : [];
  const matchedTournaments = q ? tournaments.filter((t) => normalize(t.name).includes(q)) : [];
  const matchedMatches = q
    ? allMatches.filter(
        (m) => normalize(m.homeTeam.name).includes(q) || normalize(m.awayTeam.name).includes(q)
      )
    : [];

  const results = [
    ...matchedMatches.map((m) => ({ type: "Match", label: `${m.homeTeam.name} vs ${m.awayTeam.name}`, sub: `${sportShortLabels[m.sport]} • ${m.league}`, href: matchHref(m) })),
    ...matchedPlayers.map((p) => ({ type: "Player", label: p.name, sub: `${p.team} • ${p.position}`, href: `/player/${p.id}` })),
    ...matchedTeams.map((t) => ({ type: "Team", label: t.name, sub: t.country, href: `/team/${t.id}` })),
    ...matchedTournaments.map((t) => ({ type: "Competition", label: t.name, sub: t.season, href: `/competitions` })),
    ...matchedNews.map((n) => ({ type: "News", label: n.title, sub: n.timeAgo, href: `/news/${n.id}` })),
  ];

  const icons: Record<string, React.ReactNode> = {
    Match: <CalendarDays className="h-4 w-4" />,
    Player: <Users className="h-4 w-4" />,
    Team: <Trophy className="h-4 w-4" />,
    Competition: <Trophy className="h-4 w-4" />,
    News: <Newspaper className="h-4 w-4" />,
  };

  return (
    <AppShell>
      <div className="max-w-5xl mx-auto">
        <PageHeader
          icon={<SearchIcon className="h-5 w-5" />}
          title="Search"
          subtitle="Players, teams, matches, competitions, and news"
        />

        <div className="relative mb-8">
          <div className="flex items-center gap-3 px-4 py-3  border border-border bg-card focus-within:border-secondary/50 focus-within:ring-2 focus-within:ring-secondary/10 transition-all">
            <SearchIcon className="h-5 w-5 text-muted shrink-0" />
            <input
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search players, teams, matches, competitions..."
              className="flex-1 bg-transparent text-base outline-none placeholder:text-muted"
              autoFocus
            />
          </div>
        </div>

        {!q && (
          <div className="mb-8">
            <h3 className="text-sm font-semibold text-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" /> Recent Searches
            </h3>
            <div className="flex flex-wrap gap-2">
              {recentSearches.map((s) => (
                <button
                  key={s}
                  onClick={() => setLocalQuery(s)}
                  className="text-sm px-3 py-1.5  bg-muted/10 hover:bg-muted/20 transition-colors rounded-full"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}

        {q && (
          <>
            <p className="text-sm text-muted mb-4">
              {results.length} result{results.length !== 1 && "s"} for &quot;{localQuery}&quot;
            </p>

            {results.length === 0 ? (
              <div className="text-center py-16 bg-card  border border-border">
                <p className="font-medium">No results found</p>
                <p className="text-sm text-muted mt-1">Try a different search term</p>
              </div>
            ) : (
              <div className="bg-card  border border-border divide-y divide-border overflow-hidden">
                {results.slice(0, 30).map((r, i) => (
                  <Link
                    key={i}
                    href={r.href}
                    className="flex items-center gap-4 px-4 py-3.5 hover:bg-muted/5 transition-colors group"
                  >
                    <div className="w-9 h-9  bg-muted/10 text-muted flex items-center justify-center shrink-0 rounded-md">
                      {icons[r.type]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">
                        {r.label}
                      </p>
                      <p className="text-xs text-muted truncate">{r.sub}</p>
                    </div>
                    <span
                      className={cn(
                        "text-[10px] font-bold px-2 py-0.5  shrink-0 rounded-full",
                        r.type === "Player" && "bg-secondary/10 text-secondary",
                        r.type === "Team" && "bg-brand-maroon/10 text-brand-maroon",
                        r.type === "Match" && "bg-secondary/10 text-secondary",
                        r.type === "News" && "bg-brand-navy/10 text-brand-navy",
                        r.type === "Competition" && "bg-secondary/10 text-secondary"
                      )}
                    >
                      {r.type}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
