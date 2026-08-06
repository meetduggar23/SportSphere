"use client";

import { Star } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { followedTeams, upcomingFixtures, topNews, topPlayers } from "@/data/mock";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { MatchRow } from "@/components/sports/MatchRow";
import { allMatches } from "@/data/mock";

export default function FavoritesPage() {
  const favoriteMatches = allMatches.filter((m) => m.status !== "finished");

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Star className="h-5 w-5" />}
          title="Favorites"
          subtitle="Your favorite teams, players, matches, and news in one place"
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="font-bold text-lg mb-4">Favorite Matches</h3>
              <div className="space-y-3">
                {favoriteMatches.map((m) => (
                  <MatchRow key={m.id} match={m} />
                ))}
              </div>
            </section>

            <section>
              <h3 className="font-bold text-lg mb-4">Favorite Teams</h3>
              <div className="grid grid-cols-2 gap-3">
                {followedTeams.map((team) => (
                  <div key={team.id} className="bg-card rounded-xl border border-border p-4 flex items-center gap-3">
                    <TeamLogo logo={team.logo} name={team.name} size="md" />
                    <div className="min-w-0">
                      <p className="font-semibold text-sm truncate">{team.name}</p>
                      <p className="text-xs text-muted">{team.sport}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3">Favorite Players</h3>
              <div className="space-y-3">
                {topPlayers.slice(0, 4).map((p) => (
                  <div key={p.id} className="flex items-center gap-3">
                    <TeamLogo logo={p.teamLogo} name={p.team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">{p.name}</p>
                      <p className="text-xs text-muted">{p.team}</p>
                    </div>
                    <span className="text-sm font-bold text-primary">{p.stat}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold text-sm mb-3">Saved News</h3>
              <div className="space-y-3">
                {topNews.slice(0, 3).map((n) => (
                  <div key={n.id} className="flex gap-3">
                    <img src={n.image} alt={n.title} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                    <p className="text-xs font-medium line-clamp-2">{n.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
