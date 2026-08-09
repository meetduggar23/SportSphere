"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  MapPin,
  Clock,
  Users,
  Gauge,
  CloudSun,
  ArrowLeft,
  Sparkles,
  MessageCircle,
  History,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { MatchTimeline } from "@/components/sports/MatchTimeline";
import { MatchStatsCompare } from "@/components/sports/MatchStatsCompare";
import { LiveChat } from "@/components/sports/LiveChat";
import { allMatches, matchTimeline, matchStats, teams, topPlayers } from "@/data/mock";
import { cn } from "@/lib/utils";

const tabs = [
  { label: "Timeline", value: "timeline" },
  { label: "Statistics", value: "stats" },
  { label: "Head to Head", value: "h2h" },
  { label: "Lineups", value: "lineups" },
  { label: "Live Chat", value: "chat" },
];

export default function MatchPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const match = allMatches.find((m) => m.id === id) ?? allMatches[0];
  const [activeTab, setActiveTab] = useState("timeline");
  const isLive = match.status === "live";

  const h2hRows = [
    { home: "W", away: "L", comp: "UCL Semi-Final", year: "2024" },
    { home: "L", away: "W", comp: "UCL Group Stage", year: "2023" },
    { home: "D", away: "D", comp: "UCL Quarter-Final", year: "2022" },
    { home: "W", away: "L", comp: "Friendly", year: "2021" },
  ];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <Link
          href="/live"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Live Scores
        </Link>

        <div className="bg-card rounded-2xl border border-border overflow-hidden mb-6">
          <div className="px-6 py-4 border-b border-border flex items-center justify-between gap-4 flex-wrap">
            <div className="flex items-center gap-2 text-xs text-muted">
              <span>{match.league}</span>
              <span>•</span>
              <span>{match.competition}</span>
              {match.date && (
                <>
                  <span>•</span>
                  <span>{match.date}</span>
                </>
              )}
            </div>
            {isLive ? (
              <LiveBadge label={match.minute} />
            ) : (
              <span className="text-xs font-semibold text-muted">
                {match.minute}
              </span>
            )}
          </div>

          <div className="px-6 py-10">
            <div className="flex items-center justify-between gap-4">
              <Link href={`/team/${match.homeTeam.id}`} className="flex flex-col items-center gap-3 flex-1 group">
                <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="xl" />
                <span className="font-bold text-center group-hover:text-primary transition-colors">
                  {match.homeTeam.name}
                </span>
              </Link>

              <div className="flex flex-col items-center px-4">
                <div className="flex items-center gap-4">
                  <span className={cn("text-5xl font-extrabold", isLive && "text-primary")}>
                    {match.homeScore}
                  </span>
                  <span className="text-2xl text-muted">:</span>
                  <span className={cn("text-5xl font-extrabold", isLive && "text-primary")}>
                    {match.awayScore}
                  </span>
                </div>
                {isLive ? (
                  <span className="mt-2 text-xs font-bold text-brand bg-brand/10 px-3 py-1 rounded-full animate-pulse-live">
                    {match.minute}
                  </span>
                ) : (
                  <span className="mt-2 text-xs font-semibold text-muted">{match.minute}</span>
                )}
              </div>

              <Link href={`/team/${match.awayTeam.id}`} className="flex flex-col items-center gap-3 flex-1 group">
                <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="xl" />
                <span className="font-bold text-center group-hover:text-primary transition-colors">
                  {match.awayTeam.name}
                </span>
              </Link>
            </div>

            {match.details && (
              <p className="text-center text-sm text-muted mt-6">{match.details}</p>
            )}
          </div>

          <div className="px-6 py-4 border-t border-border grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="flex items-center gap-2 justify-center text-sm text-muted">
              <MapPin className="h-4 w-4 shrink-0" /> {match.venue ?? "TBD"}
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-muted">
              <CloudSun className="h-4 w-4 shrink-0" /> 22°C • Clear
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-muted">
              <Users className="h-4 w-4 shrink-0" /> 74,000 Attendance
            </div>
            <div className="flex items-center gap-2 justify-center text-sm text-muted">
              <Gauge className="h-4 w-4 shrink-0" /> Ref: A. Taylor
            </div>
          </div>
        </div>

        <div className="flex gap-6">
          <div className="flex-1 min-w-0 space-y-6">
            <div className="flex gap-1 overflow-x-auto rounded-xl bg-muted/10 p-1">
              {tabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveTab(tab.value)}
                  className={cn(
                    "px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
                    activeTab === tab.value
                      ? "bg-card shadow-sm text-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              {activeTab === "timeline" && (
                <MatchTimeline
                  events={matchTimeline}
                  homeLogo={match.homeTeam.logo}
                  awayLogo={match.awayTeam.logo}
                />
              )}

              {activeTab === "stats" && (
                <MatchStatsCompare
                  stats={matchStats[`${id}`] ?? matchStats.m1}
                  homeName={match.homeTeam.name}
                  awayName={match.awayTeam.name}
                />
              )}

              {activeTab === "h2h" && (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <TeamLogo logo={match.homeTeam.logo} size="md" />
                    <span className="text-sm font-bold">{match.homeTeam.shortName} vs {match.awayTeam.shortName}</span>
                    <TeamLogo logo={match.awayTeam.logo} size="md" />
                  </div>
                  <div className="flex gap-2 mb-6">
                    {[
                      { label: "Home Wins", value: 5, color: "bg-brand-purple" },
                      { label: "Draws", value: 2, color: "bg-muted" },
                      { label: "Away Wins", value: 3, color: "bg-brand" },
                    ].map((s) => (
                      <div key={s.label} className="flex-1 bg-muted/10 rounded-lg p-3 text-center">
                        <p className={cn("text-2xl font-bold rounded-lg py-1 mb-1 text-white", s.color)}>{s.value}</p>
                        <p className="text-xs text-muted">{s.label}</p>
                      </div>
                    ))}
                  </div>
                  <div className="divide-y divide-border">
                    {h2hRows.map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-3">
                        <span className="text-xs text-muted w-10">{row.home}</span>
                        <span className="text-sm font-medium flex-1 text-center">{row.comp}</span>
                        <span className="text-xs text-muted w-10 text-right">{row.away}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === "lineups" && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="font-bold text-sm mb-3">{match.homeTeam.name}</p>
                    <div className="text-sm space-y-1.5 text-muted">
                      <p>🧤 D. Lunin</p>
                      <p>🛡️ D. Carvajal</p>
                      <p>🛡️ A. Rüdiger</p>
                      <p>🛡️ Nacho</p>
                      <p>🛡️ F. Mendy</p>
                      <p>⚙️ F. Valverde</p>
                      <p>⚙️ T. Kroos</p>
                      <p>⚙️ E. Camavinga</p>
                      <p>🔥 J. Bellingham</p>
                      <p>⚽ Vinícius Júnior</p>
                      <p>⚽ Rodrygo</p>
                    </div>
                  </div>
                  <div>
                    <p className="font-bold text-sm mb-3">{match.awayTeam.name}</p>
                    <div className="text-sm space-y-1.5 text-muted">
                      <p>🧤 M. Neuer</p>
                      <p>🛡️ J. Kimmich</p>
                      <p>🛡️ D. Upamecano</p>
                      <p>🛡� E. Dier</p>
                      <p>🛡️ A. Davies</p>
                      <p>⚙️ J. Pavlović</p>
                      <p>⚙️ L. Goretzka</p>
                      <p>⚙️ J. Musiala</p>
                      <p>⚙️ L. Sané</p>
                      <p>🔥 T. Müller</p>
                      <p>⚽ H. Kane</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "chat" && <LiveChat />}
            </div>

            {activeTab !== "chat" && (
              <section>
                <SectionHeader title="Match Moments" href="/videos" linkLabel="More Videos" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { title: "Rodrygo's stunner from all angles", time: "0:45", icon: "🎯" },
                    { title: "Kane's penalty - slow motion", time: "1:12", icon: "⚽" },
                    { title: "Bellingham masterclass comp", time: "3:20", icon: "🎬" },
                  ].map((v) => (
                    <div
                      key={v.title}
                      className="bg-card rounded-xl border border-border p-4 flex items-center gap-3 hover:shadow-lg transition-all cursor-pointer"
                    >
                      <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-xl shrink-0">
                        {v.icon}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm truncate">{v.title}</p>
                        <p className="text-xs text-muted mt-0.5">{v.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          <aside className="hidden lg:block w-80 shrink-0 space-y-6">
            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold flex items-center gap-2 mb-3">
                <Sparkles className="h-4 w-4 text-primary" /> AI Match Summary
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                {match.homeTeam.name} have been dominant, controlling 58% of possession with an xG of 2.1.
                Rodrygo&apos;s 74th minute strike has swung the momentum. Key battle: Bellingham vs Kimmich
                in midfield. Expect Bayern to push high in the final 15 minutes.
              </p>
              <button className="w-full mt-3 py-2 text-sm font-medium bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors">
                Ask AI about this match
              </button>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold flex items-center gap-2 mb-3">
                <History className="h-4 w-4 text-primary" /> Head to Head
              </h3>
              <div className="space-y-2 text-sm">
                {[
                  { t: "Home wins", v: 5, c: "bg-brand-purple" },
                  { t: "Draws", v: 2, c: "bg-muted" },
                  { t: "Away wins", v: 3, c: "bg-brand" },
                ].map((row) => (
                  <div key={row.t} className="flex items-center gap-2">
                    <span className="text-xs text-muted w-20">{row.t}</span>
                    <div className="flex-1 h-2 bg-muted/20 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", row.c)} style={{ width: `${row.v * 10}%` }} />
                    </div>
                    <span className="text-xs font-bold w-5 text-right">{row.v}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card rounded-xl border border-border p-4">
              <h3 className="font-bold flex items-center gap-2 mb-3">
                <MessageCircle className="h-4 w-4 text-primary" /> Trending Players
              </h3>
              <div className="space-y-3">
                {topPlayers.slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 group">
                    <TeamLogo logo={p.teamLogo} name={p.team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">{p.name}</p>
                      <p className="text-xs text-muted">{p.team}</p>
                    </div>
                    <span className="text-xs font-bold">{p.rating}★</span>
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
