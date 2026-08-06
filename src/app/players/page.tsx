"use client";

import { Users } from "lucide-react";
import Link from "next/link";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { useState } from "react";
import { topPlayers } from "@/data/mock";

const tabs = [
  { label: "All", value: "all" },
  { label: "⚽ Football", value: "football" },
  { label: "🏏 Cricket", value: "cricket" },
  { label: "🏀 Basketball", value: "basketball" },
  { label: "🏎️ F1", value: "f1" },
  { label: "🎾 Tennis", value: "tennis" },
];

export default function PlayersPage() {
  const [active, setActive] = useState("all");
  const filtered = active === "all" ? topPlayers : topPlayers.filter((p) => p.sport === active);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Users className="h-5 w-5" />}
          title="Players"
          subtitle="Browse top players across every sport, with stats and market values"
        />

        <SportTabs tabs={tabs} active={active} onChange={setActive} className="mb-6" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((player) => (
            <Link
              key={player.id}
              href={`/player/${player.id}`}
              className="bg-card rounded-xl border border-border p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all group"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-border flex items-center justify-center shrink-0">
                  <TeamLogo logo={player.teamLogo} name={player.team} size="md" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate group-hover:text-primary transition-colors">
                    {player.name}
                  </p>
                  <p className="text-xs text-muted truncate">
                    {player.team} • {player.position}
                  </p>
                </div>
                <span className="text-xs font-bold text-yellow-500 shrink-0">
                  {player.rating}★
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 pt-3 border-t border-border">
                <div>
                  <p className="text-[10px] text-muted uppercase">Stat</p>
                  <p className="text-sm font-bold text-primary">{player.stat}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Value</p>
                  <p className="text-sm font-bold">{player.marketValue ?? "-"}</p>
                </div>
                <div>
                  <p className="text-[10px] text-muted uppercase">Age</p>
                  <p className="text-sm font-bold">{player.age}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
