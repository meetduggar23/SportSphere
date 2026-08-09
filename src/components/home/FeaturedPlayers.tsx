"use client";

import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { Player } from "@/types";

interface FeaturedPlayersProps {
  players: Player[];
}

export function FeaturedPlayers({ players }: FeaturedPlayersProps) {
  return (
    <section>
      <SectionHeader title="Featured Players" kicker="In the spotlight" href="/players" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {players.map((p) => (
          <Link
            key={p.id}
            href={`/player/${p.id}`}
            className="group relative overflow-hidden  arena-card arena-card-hover p-5"
          >
<div className="absolute -right-12 -top-12 h-36 w-36  bg-blue/30 blur-2xl transition-colors duration-300 group-hover:bg-blue/40" />
            <div className="relative flex items-center gap-4">
              {p.photo ? (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden  border border-border-navy bg-blue/30">
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
            <div className="relative mt-4 flex items-end justify-between border-t border-border-navy pt-4">
              <div>
                <p className="label">{p.statLabel}</p>
                <p className="display text-2xl tabular-nums">
                  {p.stat}
                </p>
              </div>
              {p.rating !== undefined && (
                <span className="display text-2xl text-secondary tabular-nums">{p.rating}</span>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
