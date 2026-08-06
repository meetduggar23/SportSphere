"use client";

import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { Sport } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { getSportAccent } from "@/config/sports";
import { SportIcon } from "@/components/ui/SportIcon";
import { cn } from "@/lib/utils";

export interface SportHeroTeam {
  name: string;
  shortName?: string;
  logo: string;
  score: string | number;
  sub?: string;
}

interface SportHeroProps {
  sport: Sport;
  kicker: string;
  live?: boolean;
  home: SportHeroTeam;
  away: SportHeroTeam;
  headline?: string;
  venue?: string;
  ctaHref?: string;
}

export function SportHero({
  sport,
  kicker,
  live,
  home,
  away,
  headline,
  venue,
  ctaHref = "/live",
}: SportHeroProps) {
  const accent = getSportAccent(sport);

  return (
    <div
      className="relative overflow-hidden rounded-3xl border border-border mb-8 shadow-card"
      style={{ background: accent.gradient }}
    >
      <div
        className="absolute -top-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-40"
        style={{ backgroundColor: accent.accent }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_45%,rgba(0,0,0,0.25))]" />

      <div className="relative px-6 md:px-10 py-8 md:py-10">
        <div className="flex flex-col items-center gap-3 mb-8 md:mb-9">
          <div className="flex items-center gap-2.5 flex-wrap justify-center">
            <span
              className="flex h-8 w-8 items-center justify-center rounded-xl ring-1"
              style={{
                backgroundColor: accent.soft,
                color: accent.accent,
                borderColor: "transparent",
                boxShadow: `0 0 0 1px ${accent.accent}40`,
              }}
            >
              <SportIcon sport={sport} className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              {kicker}
            </span>
            {live && <LiveBadge />}
          </div>

          <div className="flex items-center gap-6 md:gap-12">
            <div className="flex flex-col items-center gap-3 md:gap-4">
              <TeamLogo logo={home.logo} name={home.name} size="xl" className="bg-card/60" />
              <div className="text-center">
                <p className="font-display font-bold text-sm md:text-base">{home.name}</p>
                {home.sub && <p className="text-xs text-muted mt-1">{home.sub}</p>}
              </div>
            </div>

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-3 md:gap-4">
                <span className="font-display text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
                  {home.score}
                </span>
                <span className="text-xl md:text-2xl text-muted">—</span>
                <span className="font-display text-5xl md:text-6xl font-bold tabular-nums tracking-tight">
                  {away.score}
                </span>
              </div>
              {live && (
                <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-red-500/15 px-3 py-1 text-xs font-bold text-red-500 ring-1 ring-red-500/30">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping-dot" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
                  </span>
                  LIVE
                </span>
              )}
              {venue && (
                <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                  <MapPin className="h-3.5 w-3.5" /> {venue}
                </span>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 md:gap-4">
              <TeamLogo logo={away.logo} name={away.name} size="xl" className="bg-card/60" />
              <div className="text-center">
                <p className="font-display font-bold text-sm md:text-base">{away.name}</p>
                {away.sub && <p className="text-xs text-muted mt-1">{away.sub}</p>}
              </div>
            </div>
          </div>

          {headline && (
            <p className="text-sm text-muted max-w-xl text-center mt-2 text-balance">{headline}</p>
          )}

          <div className="flex items-center gap-3 mt-2">
            <Link
              href={ctaHref}
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white shadow-card hover:bg-primary-hover hover:shadow-glow transition-all duration-300"
            >
              Match Centre
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/ai-insights"
              className="inline-flex items-center gap-2 rounded-xl border border-border bg-card/70 backdrop-blur px-5 py-2.5 text-sm font-semibold hover:bg-card transition-colors"
            >
              AI Insight
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
