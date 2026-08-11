"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Users,
  Star,
  Share2,
  Trophy,
  Sparkles,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { FixtureList } from "@/components/sports/FixtureList";
import { StandingsTable } from "@/components/sports/StandingsTable";
import { teams, upcomingFixtures, standings, topPlayers } from "@/data/mock";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Squad", "Fixtures", "Statistics", "Transfers", "AI Analysis"];

const squad = [
  { name: "Thibaut Courtois", position: "Goalkeeper", no: 1 },
  { name: "Dani Carvajal", position: "Defender", no: 2 },
  { name: "Antonio Rüdiger", position: "Defender", no: 22 },
  { name: "Eder Militão", position: "Defender", no: 3 },
  { name: "Ferland Mendy", position: "Defender", no: 23 },
  { name: "Federico Valverde", position: "Midfielder", no: 15 },
  { name: "Toni Kroos", position: "Midfielder", no: 8 },
  { name: "Eduardo Camavinga", position: "Midfielder", no: 12 },
  { name: "Jude Bellingham", position: "Midfielder", no: 5 },
  { name: "Vinícius Júnior", position: "Forward", no: 7 },
  { name: "Rodrygo", position: "Forward", no: 11 },
];

export default function TeamPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const team = teams[id];
  const [activeTab, setActiveTab] = useState("Overview");
  const [favorite, setFavorite] = useState(false);

  if (!team) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <p className="text-5xl mb-4">🔍</p>
          <h1 className="text-xl font-bold">Team not found</h1>
          <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
            We don&apos;t have a profile for this team yet. Try browsing the teams list.
          </p>
          <Link
            href="/teams"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary mt-6 hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Teams
          </Link>
        </div>
      </AppShell>
    );
  }

  // Squad, transfers and AI analysis are demo content written for Real
  // Madrid only — showing them under another team's name would be wrong.
  const hasDetailData = team.id === "rm";

  // Achievements are curated per team in src/data/mock.ts (every IPL
  // franchise and national cricket side has a list).
  const achievements = team.achievements ?? [];

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <Link
          href="/teams"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Teams
        </Link>

        <div className="mb-4">
          <DemoBadge label="Demo team data" />
        </div>

        <div className="bg-card  border border-border overflow-hidden mb-6 rounded-md">
          <div className="h-32 bg-gradient-to-r from-blue via-navy to-deep" />
          <div className="px-6 pb-6">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-4 -mt-12">
              <TeamLogo logo={team.logo} name={team.name} size="xl" />
              <div className="flex-1 pt-14 md:pt-0">
                <h1 className="text-2xl font-extrabold">{team.name}</h1>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted flex-wrap">
                  <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {team.city ?? team.country}</span>
                  {team.founded && (
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> Founded {team.founded}</span>
                  )}
                  <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" /> {team.capacity?.toLocaleString() ?? "-"} capacity</span>
                  <span className="flex items-center gap-1"><Star className="h-3.5 w-3.5" /> 4.8 fan rating</span>
                </div>
              </div>
              <div className="flex gap-2 md:pt-14">
                <button
                  onClick={() => setFavorite(!favorite)}
className={cn(
                    "flex items-center gap-2 px-4 py-2  text-sm font-semibold border transition-all rounded-md",
                    favorite ? "bg-primary text-navy border-primary" : "border-border hover:bg-muted/10"
                  )}
                >
                  <Heart className={cn("h-4 w-4", favorite && "fill-current")} />
                  {favorite ? "Following" : "Follow"}
                </button>
                <button className="flex items-center gap-2 px-4 py-2  text-sm font-semibold border border-border hover:bg-muted/10 transition-all rounded-md">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-6">
              {[
                { label: "Coach", value: team.coach ?? "-" },
                { label: "Stadium", value: team.stadium ?? "-" },
                { label: "League Position", value: "1st" },
                { label: "Current Form", value: "WWWDW" },
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
              <>
                <div className="bg-card  border border-border p-5 rounded-md">
                  <h3 className="font-bold mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-secondary" /> Achievements
                  </h3>
                  {achievements.length > 0 ? (
                    <div className="space-y-2 text-sm">
                      {achievements.map((a) => (
                        <p key={a} className="bg-muted/10  px-3 py-2 rounded-md">{a}</p>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-muted">Detailed achievement data is not available for this team yet.</p>
                  )}
                </div>

                <FixtureList
                  fixtures={upcomingFixtures.filter((f) => f.homeTeam.id === id || f.awayTeam?.id === id)}
                  title="Upcoming Fixtures"
                />

                <div className="bg-card  border border-border p-5 rounded-md">
                  <h3 className="font-bold mb-4">Top Scorers</h3>
                  <div className="space-y-3">
                    {topPlayers.filter((p) => p.teamId === id).map((p, i) => (
                      <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 group">
                        <span className="text-sm font-bold text-muted w-5">{i + 1}</span>
                        <TeamLogo logo={p.teamLogo} name={p.team} size="sm" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">{p.name}</p>
                          <p className="text-xs text-muted">{p.position}</p>
                        </div>
                        <span className="text-sm font-bold text-secondary">{p.stat} {p.statLabel}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "Squad" && (
              <div className="bg-card  border border-border p-5">
                <h3 className="font-bold mb-4">Current Squad</h3>
                {hasDetailData ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {squad.map((player) => (
                      <div key={player.name} className="flex items-center gap-3 bg-muted/10  p-3 rounded-sm">
                        <span className="text-xs font-bold text-muted w-6">{player.no}</span>
                        <div className="w-8 h-8  bg-secondary/10 text-secondary flex items-center justify-center text-sm rounded-md">
                          {player.position[0]}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{player.name}</p>
                          <p className="text-xs text-muted">{player.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted">Squad data is not available for this team yet.</p>
                )}
              </div>
            )}

            {activeTab === "Fixtures" && (
              <FixtureList fixtures={upcomingFixtures} title={`${team.shortName} Fixtures`} />
            )}

            {activeTab === "Statistics" && (
              <StandingsTable standings={standings} title="League Table" compact />
            )}

            {activeTab === "Transfers" && (
              <div className="bg-card  border border-border p-5">
                <h3 className="font-bold mb-4">Recent Transfers</h3>
                {hasDetailData ? (
                  <div className="space-y-3">
                    {[
                      { year: "2024", name: "Kylian Mbappé", type: "In", fee: "Free" },
                      { year: "2023", name: "Jude Bellingham", type: "In", fee: "€103M" },
                      { year: "2023", name: "Arda Güler", type: "In", fee: "€20M" },
                      { year: "2022", name: "Antonio Rüdiger", type: "In", fee: "Free" },
                    ].map((t) => (
                      <div key={t.name} className="flex items-center gap-4 bg-muted/10  p-4 rounded-md">
<span className={cn("text-xs font-bold px-2 py-1 rounded-full", t.type === "In" ? "bg-secondary/10 text-secondary" : "bg-brand-maroon/10 text-brand-maroon")}>
                          {t.type}
                        </span>
                        <p className="text-sm font-medium flex-1">{t.name}</p>
                        <span className="text-sm text-muted">{t.year}</span>
                        <span className="text-sm font-bold">{t.fee}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted">Transfer data is not available for this team yet.</p>
                )}
              </div>
            )}

            {activeTab === "AI Analysis" && (
              <div className="bg-card  border border-border p-5 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-secondary" /> AI Analysis
                </h3>
                {hasDetailData ? (
                  <>
                    <div className="bg-secondary/5 border border-secondary/20  p-4 rounded-md">
                      <p className="text-sm text-muted leading-relaxed">
                        {team.name} enter this phase of the season with a 78% win probability in their
                        remaining fixtures. Their press triggers in the final third rank 4th in Europe,
                        and Bellingham&apos;s progressive carries have created 12 big chances. Expected
                        lineup stability is high — 9 of 11 starters unchanged in the last 5 matches.
                      </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="bg-muted/10  p-4 rounded-md">
                        <p className="text-sm font-bold mb-2">Expected Lineup (4-3-3)</p>
                        <p className="text-xs text-muted leading-relaxed">
                          Courtois; Carvajal, Rüdiger, Militão, Mendy; Valverde, Kroos, Bellingham;
                          Rodrygo, Vini Jr, Joselu
                        </p>
                      </div>
                      <div className="bg-muted/10  p-4 rounded-md">
                        <p className="text-sm font-bold mb-2">Team Form</p>
                        <div className="flex gap-1.5">
                          {["W", "W", "D", "W", "W"].map((f, i) => (
<span key={i} className={cn("w-6 h-6 text-[10px] font-bold  flex items-center justify-center rounded-full", f === "W" ? "bg-primary text-navy" : "bg-deep text-gold")}>
                              {f}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </>
                ) : (
                  <p className="text-sm text-muted">AI analysis is not available for this team yet.</p>
                )}
              </div>
            )}
          </div>

          <aside className="space-y-6">                <div className="bg-card  border border-border p-4 rounded-md">
              <h3 className="font-bold text-sm mb-3">Club Info</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Founded</span><span className="font-medium">{team.founded ?? "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted">Coach</span><span className="font-medium">{team.coach ?? "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted">Stadium</span><span className="font-medium text-right">{team.stadium ?? "-"}</span></div>
                <div className="flex justify-between"><span className="text-muted">Capacity</span><span className="font-medium">{team.capacity?.toLocaleString() ?? "-"}</span></div>
              </div>
            </div>
                <div className="bg-card  border border-border p-4 rounded-md">
              <h3 className="font-bold text-sm mb-3">Star Players</h3>
              <div className="space-y-3">
                {topPlayers.filter((p) => p.teamId === id).slice(0, 4).map((p) => (
                  <Link key={p.id} href={`/player/${p.id}`} className="flex items-center gap-3 group">
                    <TeamLogo logo={p.teamLogo} name={p.team} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate group-hover:text-foreground transition-colors">{p.name}</p>
                      <p className="text-xs text-muted">{p.position}</p>
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
