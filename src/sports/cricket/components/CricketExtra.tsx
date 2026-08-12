"use client";

import Link from "next/link";
import { BarChart3, Flag, Trophy, Users, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CricketMatchList } from "@/sports/cricket/components/CricketMatchList";
import { useCricketMatches } from "@/sports/cricket/hooks/useCricketMatches";

const hubLinks = [
  {
    href: "/sports/cricket/records",
    title: "Records",
    description: "All-time batting, bowling, fielding and team records",
    icon: BarChart3,
  },
  {
    href: "/sports/cricket/india",
    title: "India Cricket",
    description: "Tests, ODIs and T20Is for the national side",
    icon: Flag,
  },
  {
    href: "/sports/cricket/ipl",
    title: "IPL",
    description: "The Indian Premier League as its own competition",
    icon: Trophy,
  },
  {
    href: "/sports/cricket/players",
    title: "Players",
    description: "Search player profiles and career statistics",
    icon: Users,
  },
];

/**
 * CRICKET-SPECIFIC EXTRA — the cricket hub on the overview page.
 * Navigates to the dedicated cricket sections and previews live matches
 * (real CricAPI data when CRICAPI_API_KEY is configured).
 */
export function CricketExtra() {
  const { matches, status } = useCricketMatches({ status: ["live", "finished"], limit: 6 });

  return (
    <div className="mb-8 space-y-8">
      <section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {hubLinks.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className="group arena-card arena-card-hover flex flex-col gap-3 p-5"
              >
                <span className="flex h-10 w-10 items-center justify-center  bg-blue/40 text-secondary rounded-md transition-transform duration-200 group-hover:scale-110">
                  <Icon className="h-5 w-5" />
                </span>
                <span>
                  <span className="flex items-center gap-1.5 font-display text-base font-bold text-foreground">
                    {item.title}
                    <ArrowRight className="h-3.5 w-3.5 text-muted transition-transform duration-200 group-hover:translate-x-0.5" />
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">{item.description}</span>
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      <section>
        <SectionHeader
          title="Live & Latest"
          href="/sports/cricket/ipl"
          linkLabel="IPL hub"
          kicker="CricAPI live feed"
        />
        <CricketMatchList
          matches={matches}
          status={status}
          emptyMessage="No live or recent cricket matches right now."
        />
      </section>
    </div>
  );
}
