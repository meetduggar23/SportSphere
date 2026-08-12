"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Share2,
  TrendingUp,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { topPlayers } from "@/data/mock";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Statistics", "Performance", "AI Analysis", "Transfers"];

function UnavailablePanel({ title, note }: { title: string; note: string }) {
  return (
    <div className="bg-card  border border-border p-5 rounded-md">
      <h3 className="font-bold mb-3">{title}</h3>
      <p className="text-sm text-muted">{note}</p>
    </div>
  );
}

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = topPlayers.find((p) => p.id === id);
  const [activeTab, setActiveTab] = useState("Overview");
  const [favorite, setFavorite] = useState(false);

  // Unknown ids (e.g. real provider player ids with no demo profile) must not
  // silently render another player's name and stats — show a clear empty state.
  if (!player) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold">Player not found</h1>
          <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
            We don&apos;t have a player profile for this id yet. Try browsing the players list.
          </p>
          <Link
            href="/players"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary mt-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Players
          </Link>
        </div>
      </AppShell>
    );
  }

  // Every value below comes straight from the curated player record
  // (src/data/mock.ts). Career tables, ratings breakdowns, achievements,
  // AI analysis and transfer histories are not part of that record, so the
  // matching sections state that data honestly instead of inventing it.
  const statCards = [
    { label: player.statLabel, value: player.stat },
    { label: "Rating", value: player.rating != null ? `${player.rating}★` : "-" },
    { label: "Age", value: `${player.age} years` },
    { label: "Market Value", value: player.marketValue ?? "-" },
  ];

  const teamHref = player.teamId ? `/team/${player.teamId}` : null;

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <Link
          href="/players"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Players
        </Link>

        <div className="mb-4">
          <DemoBadge label="Demo player data" />
        </div>

        <div className="bg-card  border border-border overflow-hidden mb-6 rounded-md">
          <div className="h-32 bg-gradient-to-r from-blue via-navy to-deep relative">
            <div className="absolute inset-0 opacity-20 pattern-dots" />
          </div>
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12">
              <div className="relative w-28 h-28  bg-card border-4 border-card overflow-hidden shadow-xl rounded-lg">
                <Image src={player.photo} alt={player.name} fill sizes="112px" className="object-cover" />
              </div>
              <div className="flex-1 pt-14 md:pt-0">
                <div className="flex items-center gap-3 flex-wrap">
                  <h1 className="text-2xl font-extrabold">{player.name}</h1>
                  <span className="text-sm font-bold text-foreground">{player.rating}★</span>
                  <span className="text-xs font-bold px-2 py-0.5  bg-secondary/10 text-secondary rounded-full">
                    {player.position}
                  </span>
                </div>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {player.nationality}</span>
                  <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {player.age} years</span>
                </div>
              </div>
              <div className="flex gap-2 md:pt-14">
                <button
                  onClick={() => setFavorite(!favorite)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2  text-sm font-semibold border transition-all rounded-md",
                    favorite
                      ? "bg-primary text-navy border-primary"
                      : "border-border hover:bg-muted/10"
                  )}
                >
                  <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
                  {favorite ? "Followed" : "Follow"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2  text-sm font-semibold border border-border hover:bg-muted/10 transition-all rounded-md">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { label: "Market Value", value: player.marketValue ?? "-" },
                { label: "Team", value: player.team },
                { label: "Position", value: player.position },
                { label: "Nationality", value: player.nationality },
              ].map((s) => (
                <div key={s.label} className="bg-muted/10  p-3 text-center rounded-sm">
                  <p className="text-sm font-bold truncate">{s.value}</p>
                  <p className="text-[10px] text-muted uppercase tracking-wide">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-1 overflow-x-auto  bg-muted/10 p-1 mb-6 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-2 text-sm font-medium  transition-all whitespace-nowrap rounded-md",
                activeTab === tab ? "bg-card shadow-sm text-foreground" : "text-muted hover:text-foreground"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            {activeTab === "Overview" && (
              <div className="bg-card  border border-border p-5 rounded-md">
                <h3 className="font-bold mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-secondary" /> Season Statistics
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {statCards.map((s) => (
                    <div key={s.label} className="bg-muted/10  p-3 rounded-sm">
                      <p className="text-xl font-extrabold truncate">{s.value}</p>
                      <p className="text-xs text-muted">{s.label}</p>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-muted mt-4">
                  Career, match-level and performance breakdowns are not part of the curated
                  profile yet, so they are not shown rather than estimated.
                </p>
              </div>
            )}

            {activeTab === "Statistics" && (
              <UnavailablePanel
                title="Career Statistics"
                note="Career statistics (matches, innings, averages, wickets, and other format-specific totals) are not available for this player yet."
              />
            )}

            {activeTab === "Performance" && (
              <UnavailablePanel
                title="Performance Trend"
                note="Performance trend data is not available for this player yet."
              />
            )}

            {activeTab === "AI Analysis" && (
              <UnavailablePanel
                title="AI Analysis"
                note="AI analysis is not available for this player yet. It will be generated from connected statistics when a data provider is configured."
              />
            )}

            {activeTab === "Transfers" && (
              <UnavailablePanel
                title="Transfer History"
                note="Transfer history is not available for this player yet."
              />
            )}
          </div>

          <aside className="space-y-6">
            <div className="bg-card  border border-border p-4 rounded-md">
              <h3 className="font-bold text-sm mb-3">Team</h3>
              {teamHref ? (
                <Link href={teamHref} className="flex items-center gap-3 group">
                  <TeamLogo logo={player.teamLogo} name={player.team} size="lg" />
                  <div>
                    <p className="font-semibold text-sm group-hover:text-foreground transition-colors">{player.team}</p>
                    <p className="text-xs text-muted">Squad Member</p>
                  </div>
                </Link>
              ) : (
                <div className="flex items-center gap-3">
                  <TeamLogo logo={player.teamLogo} name={player.team} size="lg" />
                  <div>
                    <p className="font-semibold text-sm">{player.team}</p>
                    <p className="text-xs text-muted">Club profile unavailable</p>
                  </div>
                </div>
              )}
            </div>
            <div className="bg-card  border border-border p-4 rounded-md">
              <h3 className="font-bold text-sm mb-3">Similar Players</h3>
              <div className="space-y-3">
                {topPlayers.filter((p) => p.id !== player.id).slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 group">
                    <TeamLogo logo={p.teamLogo} name={p.team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">{p.name}</p>
                      <p className="text-xs text-muted">{p.team}</p>
                    </div>
                    <span className="text-xs font-bold text-foreground">{p.rating}★</span>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </AppShell>
  );
}
