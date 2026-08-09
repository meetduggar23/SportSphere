"use client";

import { use, useState } from "react";
import Link from "next/link";
import {
  ArrowLeft,
  Heart,
  MapPin,
  Calendar,
  Ruler,
  Weight,
  Sparkles,
  TrendingUp,
  Target,
  Award,
  Share2,
} from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { DemoBadge } from "@/components/ui/DemoBadge";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { topPlayers } from "@/data/mock";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Statistics", "Performance", "AI Analysis", "Transfers"];

const statsGrid = [
  { label: "Appearances", value: "32", icon: "📊" },
  { label: "Goals", value: "52", icon: "⚽" },
  { label: "Assists", value: "9", icon: "🎯" },
  { label: "Minutes", value: "2,840", icon: "⏱️" },
  { label: "Pass Accuracy", value: "78%", icon: "📮" },
  { label: "Shots/Game", value: "3.9", icon: "🔫" },
];

export default function PlayerPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const player = topPlayers.find((p) => p.id === id) ?? topPlayers[0];
  const [activeTab, setActiveTab] = useState("Overview");
  const [favorite, setFavorite] = useState(false);

  const ratings = [
    { label: "Attack", value: 92 },
    { label: "Defense", value: 38 },
    { label: "Pace", value: 95 },
    { label: "Passing", value: 78 },
    { label: "Shooting", value: 93 },
    { label: "Physical", value: 82 },
  ];

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
              <div className="w-28 h-28  bg-card border-4 border-card overflow-hidden shadow-xl rounded-lg">
                <img src={player.photo} alt={player.name} className="w-full h-full object-cover" />
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
                  <span className="flex items-center gap-1"><Ruler className="h-3.5 w-3.5" /> 1.94 m</span>
                  <span className="flex items-center gap-1"><Weight className="h-3.5 w-3.5" /> 88 kg</span>
                </div>
              </div>
              <div className="flex gap-2 md:pt-14">
                <button
                  onClick={() => setFavorite(!favorite)}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2  text-sm font-semibold border transition-all rounded-md",                    favorite
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
                { label: "Foot", value: "Right" },
                { label: "Shirt No.", value: "9" },
              ].map((s) => (
                <div key={s.label} className="bg-muted/10  p-3 text-center rounded-sm">
                  <p className="text-sm font-bold">{s.value}</p>
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
                    <TrendingUp className="h-4 w-4 text-secondary" /> Season Statistics
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {statsGrid.map((s) => (
                      <div key={s.label} className="bg-muted/10  p-3 rounded-sm">
                        <p className="text-lg">{s.icon}</p>
                        <p className="text-xl font-extrabold mt-1">{s.value}</p>
                        <p className="text-xs text-muted">{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card  border border-border p-5 rounded-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Target className="h-4 w-4 text-secondary" /> Player Ratings
                  </h3>
                  <div className="space-y-3">
                    {ratings.map((r) => (
                      <div key={r.label} className="flex items-center gap-3">
                        <span className="text-xs font-medium text-muted w-20">{r.label}</span>
                        <div className="flex-1 h-2 bg-muted/20  overflow-hidden rounded-full">
                          <div
                            className="h-full bg-gradient-to-r from-secondary to-deep  transition-all"
                            style={{ width: `${r.value}%` }}
                          />
                        </div>
                        <span className="text-xs font-bold w-8 text-right">{r.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-card  border border-border p-5 rounded-md">
                  <h3 className="font-bold mb-4 flex items-center gap-2">
                    <Award className="h-4 w-4 text-secondary" /> Achievements
                  </h3>
                  <div className="space-y-2 text-sm">
                    {[
                      "🏆 Premier League Winner (2023)",
                      "🥇 Golden Boot (2023)",
                      "⭐ PFA Player of the Year (2023)",
                      "🇳🇴 Norway Player of the Year (2022, 2023)",
                      "🎯 50+ Goals in 3 consecutive seasons",
                    ].map((a) => (
                      <p key={a} className="bg-muted/10  px-3 py-2 rounded-md">{a}</p>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === "Statistics" && (
              <div className="bg-card  border border-border p-5">
                <h3 className="font-bold mb-4">Career Statistics</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-xs text-muted border-b border-border">
                        {["Season", "Club", "Apps", "Goals", "Assists", "Minutes"].map((h) => (
                          <th key={h} className="text-left py-2 px-3 font-medium">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="text-sm">
                      {[
                        ["2023-24", "Man City", "32", "52", "9", "2,840"],
                        ["2022-23", "Man City", "35", "36", "8", "2,910"],
                        ["2021-22", "Borussia Dortmund", "30", "29", "7", "2,430"],
                        ["2020-21", "Borussia Dortmund", "28", "27", "6", "2,210"],
                        ["2019-20", "RB Salzburg", "22", "16", "6", "1,650"],
                      ].map((row) => (
                        <tr key={row[0]} className="border-b border-border last:border-0">
                          {row.map((cell, i) => (
                            <td key={i} className={cn("py-2.5 px-3", i === 0 && "font-semibold")}>{cell}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === "Performance" && (
              <div className="bg-card  border border-border p-5">
                <h3 className="font-bold mb-4">Performance Trend</h3>
                <div className="flex items-end justify-between gap-2 h-48">
                  {[
                    { month: "Jan", value: 55 },
                    { month: "Feb", value: 68 },
                    { month: "Mar", value: 62 },
                    { month: "Apr", value: 82 },
                    { month: "May", value: 90 },
                    { month: "Jun", value: 75 },
                    { month: "Jul", value: 84 },
                  ].map((m) => (
                    <div key={m.month} className="flex flex-col items-center flex-1 gap-2">
                      <span className="text-xs font-bold">{m.value}</span>
                      <div
                        className="w-full max-w-8 bg-gradient-to-t from-secondary/40 to-secondary transition-all hover:from-secondary/60"
                        style={{ height: `${m.value * 1.6}px` }}
                      />
                      <span className="text-xs text-muted">{m.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "AI Analysis" && (
              <div className="bg-card  border border-border p-5 space-y-4">
                <h3 className="font-bold flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-secondary" /> AI Analysis
                </h3>
                <div className="bg-secondary/5 border border-secondary/20  p-4 rounded-md">
                  <p className="text-sm text-muted leading-relaxed">
                    {player.name} is a generational talent with elite finishing and off-ball movement.
                    His xG overperformance of +8.2 this season ranks in the 99th percentile among
                    European forwards. Key weakness: touches in the defensive third are below
                    average, limiting link-up play in build-up phases.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
<div className="bg-secondary/10 border border-secondary/20  p-4 rounded-md">
                    <p className="text-sm font-bold text-secondary mb-2">Strengths</p>
                    <ul className="text-xs text-muted space-y-1.5">
                      <li>• Elite finishing (93/100)</li>
                      <li>• Aerial dominance</li>
                      <li>• Off-ball movement</li>
                      <li>• Pressing intensity</li>
                    </ul>
                  </div>
<div className="bg-brand-maroon/10 border border-brand-maroon/20  p-4 rounded-md">
                    <p className="text-sm font-bold text-brand-maroon mb-2">Weaknesses</p>
                    <ul className="text-xs text-muted space-y-1.5">
                      <li>• Limited link-up play</li>
                      <li>• Defensive contribution</li>
                      <li>• Dribbling vs low blocks</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-muted/10  p-4 rounded-md">
                  <p className="text-sm font-bold mb-2">🔮 Career Prediction</p>
                  <p className="text-sm text-muted">
                    Projected to score 65+ goals in 2024-25 with continued improvement in hold-up play.
                    Transfer value expected to reach €220M within 2 seasons.
                  </p>
                </div>
              </div>
            )}

            {activeTab === "Transfers" && (
              <div className="bg-card  border border-border p-5">
                <h3 className="font-bold mb-4">Transfer History</h3>
                <div className="space-y-3">
                  {[
                    { year: "2022", from: "Borussia Dortmund", to: "Man City", fee: "€60M" },
                    { year: "2020", from: "RB Salzburg", to: "Borussia Dortmund", fee: "€20M" },
                    { year: "2019", from: "Bryne FK", to: "RB Salzburg", fee: "€8M" },
                  ].map((t) => (
                    <div key={t.year} className="flex items-center gap-4 bg-muted/10  p-4 rounded-md">
                      <span className="text-sm font-bold text-muted-strong w-12">{t.year}</span>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{t.from} → {t.to}</p>
                      </div>
                      <span className="text-sm font-bold">{t.fee}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="space-y-6">                <div className="bg-card  border border-border p-4 rounded-md">
              <h3 className="font-bold text-sm mb-3">Team</h3>
              <Link href={`/team/${player.teamId || "#"}`} className="flex items-center gap-3 group">
                <TeamLogo logo={player.teamLogo} name={player.team} size="lg" />
                <div>
                  <p className="font-semibold text-sm group-hover:text-foreground transition-colors">{player.team}</p>
                  <p className="text-xs text-muted">Squad Member</p>
                </div>
              </Link>
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
