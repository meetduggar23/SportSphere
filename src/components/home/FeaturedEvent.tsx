"use client";

import Link from "next/link";
import { ArrowRight, MapPin, CalendarDays } from "lucide-react";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { LiveBadge } from "@/components/ui/LiveBadge";
import { Match } from "@/types";

interface FeaturedEventProps {
  match: Match;
}

export function FeaturedEvent({ match }: FeaturedEventProps) {
  const isLive = match.status === "live";

  return (
    <section className="relative overflow-hidden border border-border-strong bg-gradient-to-br from-surface-1 via-surface-2 to-surface-3 shadow-hero rounded-lg">
      {/* Layered theme-aware environment — subtle accent depth, no neon */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 90% 65% at 50% -12%, color-mix(in srgb, var(--sport-accent) 40%, transparent), transparent 62%), radial-gradient(ellipse 70% 55% at 50% 118%, color-mix(in srgb, var(--sport-bg) 85%, transparent), transparent 65%), radial-gradient(ellipse 55% 60% at 0% 50%, color-mix(in srgb, var(--sport-accent) 24%, transparent), transparent 62%), radial-gradient(ellipse 55% 60% at 100% 50%, color-mix(in srgb, var(--sport-accent) 22%, transparent), transparent 62%)",
        }}
      />
      <div className="pointer-events-none absolute -right-28 -top-28 h-96 w-96  bg-accent/30 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-32 -left-28 h-96 w-96  bg-blue/60 blur-3xl" />

      {/* Broadcast hairlines */}
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-secondary/60 to-transparent" />
      <div className="absolute inset-x-8 bottom-0 h-px bg-gradient-to-r from-transparent via-secondary/40 to-transparent" />

      <div className="relative px-5 py-10 md:px-12 md:py-12">
        {/* Eyebrow */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span className="kicker text-muted-strong">{match.competition}</span>
          <span className="h-1 w-1  bg-border-strong" />
          <span className="kicker text-muted">{match.league}</span>
          {isLive && <LiveBadge label={match.minute} />}
        </div>

        <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:gap-10">
          {/* Home team */}
          <div className="flex flex-1 flex-col items-center gap-4">
            <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="xl" />
            <div className="text-center">
              <p className="heading text-xl text-foreground md:text-2xl">{match.homeTeam.name}</p>
              <p className="meta mt-0.5">{match.homeTeam.shortName}</p>
            </div>
          </div>

          {/* Broadcast scoreboard panel — sharp, informational */}
          <div className="flex shrink-0 flex-col items-center justify-center gap-4 border border-border bg-card-glass px-8 py-5 backdrop-blur-sm md:px-10">
            <div className="display flex items-center gap-3 text-6xl text-berry tabular-nums md:text-7xl">
              <span className="animate-score-pop">{match.homeScore}</span>
              <span className="text-3xl text-muted md:text-4xl">:</span>
              <span className="animate-score-pop">{match.awayScore}</span>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="inline-flex items-center gap-1.5  bg-card-glass border border-border-navy px-3 py-1 text-xs text-muted-strong rounded-full">
                <CalendarDays className="h-3.5 w-3.5" /> {match.date ?? match.minute}
              </span>
              {match.venue && (
                <span className="inline-flex items-center gap-1.5  bg-card-glass border border-border-navy px-3 py-1 text-xs text-muted-strong rounded-full">
                  <MapPin className="h-3.5 w-3.5" /> {match.venue}
                </span>
              )}
            </div>
          </div>

          {/* Away team */}
          <div className="flex flex-1 flex-col items-center gap-4">
            <TeamLogo logo={match.awayTeam.logo} name={match.awayTeam.name} size="xl" />
            <div className="text-center">
              <p className="heading text-xl text-foreground md:text-2xl">{match.awayTeam.name}</p>
              <p className="meta mt-0.5">{match.awayTeam.shortName}</p>
            </div>
          </div>
        </div>

        <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
          <Link
            href={`/match/${match.id}`}
            className="group inline-flex items-center gap-2  bg-live-gradient px-7 py-3 text-sm font-bold text-navy transition-transform hover:scale-[1.04] rounded-md"
          >
            Match Centre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/ai-insights"
            className="inline-flex items-center gap-2  border border-border-strong bg-card-glass px-7 py-3 text-sm font-semibold text-foreground-soft backdrop-blur transition-colors hover:border-border-strong hover:bg-blue/40 rounded-md"
          >
            AI Live Insight
          </Link>
        </div>
      </div>
    </section>
  );
}
