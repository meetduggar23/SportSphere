"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { sportLabels, Sport } from "@/types";

const allSports: { sport: Sport; icon: string; gradient: string; desc: string; href: string }[] = [
  { sport: "football", icon: "⚽", gradient: "from-emerald-500/20 to-green-500/10", desc: "Leagues, live scores, transfers", href: "/football" },
  { sport: "cricket", icon: "🏏", gradient: "from-sky-500/20 to-blue-500/10", desc: "Tests, T20, IPL & more", href: "/cricket" },
  { sport: "basketball", icon: "🏀", gradient: "from-orange-500/20 to-amber-500/10", desc: "NBA, playoffs, EuroLeague", href: "/basketball" },
  { sport: "f1", icon: "🏎️", gradient: "from-red-500/20 to-rose-500/10", desc: "Races, standings, drivers", href: "/f1" },
  { sport: "tennis", icon: "🎾", gradient: "from-lime-500/20 to-green-500/10", desc: "Grand Slams, ATP & WTA", href: "/tennis" },
  { sport: "baseball", icon: "⚾", gradient: "from-indigo-500/20 to-blue-500/10", desc: "MLB, World Series", href: "/live" },
  { sport: "hockey", icon: "🏒", gradient: "from-cyan-500/20 to-teal-500/10", desc: "NHL, Stanley Cup", href: "/live" },
  { sport: "ufc", icon: "🥊", gradient: "from-red-500/20 to-pink-500/10", desc: "Fight nights, rankings", href: "/live" },
  { sport: "boxing", icon: "🥊", gradient: "from-purple-500/20 to-fuchsia-500/10", desc: "Title fights, rankings", href: "/live" },
  { sport: "rugby", icon: "🏉", gradient: "from-teal-500/20 to-cyan-500/10", desc: "Six Nations, World Cup", href: "/live" },
  { sport: "volleyball", icon: "🏐", gradient: "from-yellow-500/20 to-amber-500/10", desc: "VNL, Olympics", href: "/live" },
  { sport: "esports", icon: "🎮", gradient: "from-violet-500/20 to-purple-500/10", desc: "CS2, Valorant, LoL", href: "/live" },
];

export default function SportsPage() {
  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Globe className="h-5 w-5" />}
          title="All Sports"
          subtitle="Every sport on the planet, one platform"
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {allSports.map((s) => (
            <Link
              key={s.sport}
              href={s.href}
              className={`bg-gradient-to-br ${s.gradient} bg-card rounded-xl border border-border p-5 hover:shadow-lg hover:-translate-y-0.5 transition-all group`}
            >
              <span className="text-4xl block mb-3 group-hover:scale-110 transition-transform inline-block">
                {s.icon}
              </span>
              <h3 className="font-bold">{sportLabels[s.sport]}</h3>
              <p className="text-xs text-muted mt-1">{s.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
