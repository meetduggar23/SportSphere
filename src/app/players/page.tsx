"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { useEffect, useState } from "react";
import { getTopScorers } from "@/lib/api";
import { Player } from "@/types";

export default function PlayersPage() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await getTopScorers("39", "2025");
        setPlayers(data);
      } catch (e) {
        console.error("Failed to load players:", e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-secondary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted">Loading top players...</p>
        </div>
      </div>
    );
  }

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Players"
          subtitle={`Top scorers and performers from Premier League`}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {players.map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
className="arena-card arena-card-hover p-4 group"
            >
              <div className="flex items-center gap-3 mb-3">
                {player.photo ? (
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-secondary/20 to-secondary/10 border border-border flex items-center justify-center shrink-0 overflow-hidden">
                    <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <TeamLogo logo={player.teamLogo} name={player.team} size="md" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate group-hover:text-foreground transition-colors">
                    {player.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {player.team} • {player.position}
                  </p>
                </div>
                {player.rating && (                  <span className="text-xs font-bold text-foreground shrink-0">
                    {player.rating}★
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted uppercase">Stat</p>
                  <p className="text-sm font-bold text-foreground">{player.stat}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Age</p>
                  <p className="text-sm font-bold">{player.age}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Country</p>
                  <p className="text-sm font-bold truncate">{player.nationality}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
