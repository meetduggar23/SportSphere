"use client";

import Link from "next/link";
import { ArrowRight, MapPin, Sparkles } from "lucide-react";
import { Sport } from "@/types";
import { TeamLogo } from "@/components/ui/TeamLogo";
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
      className="relative mb-8 overflow-hidden rounded-[28px] border shadow-hero"
      style={{ borderColor: `${accent.accent}33`, background: accent.gradient }}
    >
{/* Cinematic glows */}
      <div
        className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full blur-3xl"
        style={{ backgroundColor: accent.accent, opacity: 0.22 }}
      />
      <div className="pointer-events-none absolute -bottom-32 -left-20 h-96 w-96 rounded-full bg-navy/70 blur-3xl" />
      {/* Score rays */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(circle at 50% 38%, transparent 42%, rgba(141,11,65,0.16) 100%)`,
        }}
      />

      <div className="relative px-5 py-8 md:px-10 md:py-12">
        {/* Kicker row */}
        <div className="mb-8 flex flex-wrap items-center justify-center gap-3">
          <span
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-border-navy bg-blue/40 text-muted-strong"
          >
            <SportIcon sport={sport} className="h-5 w-5" />
          </span>
          <span className="kicker text-muted-strong">{kicker}</span>
          {live && (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-[11px] font-bold text-primary ring-1 ring-border-live">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary animate-ping-ring" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
              </span>
              LIVE
            </span>
          )}
        </div>

        {/* Score board */}
        <div className="flex items-center justify-center gap-4 md:gap-10">
          <div className="flex flex-col items-center gap-3">
<TeamLogo logo={home.logo} name={home.name} size="xl" />
            <div className="text-center">
              <p className="heading text-base md:text-lg text-foreground">{home.name}</p>
              {home.sub && <p className="meta mt-0.5">{home.sub}</p>}
            </div>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center gap-3 md:gap-4">
              <span className={cn("display text-5xl tabular-nums md:text-7xl", live ? "text-berry" : "text-foreground")}>
                {home.score}
              </span>
              <span className="text-2xl text-muted md:text-3xl">—</span>
              <span className={cn("display text-5xl tabular-nums md:text-7xl", live ? "text-berry" : "text-foreground")}>
                {away.score}
              </span>
            </div>            {live && (
              <span className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-1 text-xs font-bold text-berry">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-berry" />
                </span>
                {home.sub ?? "Live"}
              </span>
            )}
            {venue && (
              <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-muted">
                <MapPin className="h-3.5 w-3.5" /> {venue}
              </span>
            )}
          </div>

          <div className="flex flex-col items-center gap-3">
<TeamLogo logo={away.logo} name={away.name} size="xl" />
            <div className="text-center">
              <p className="heading text-base md:text-lg text-foreground">{away.name}</p>
              {away.sub && <p className="meta mt-0.5">{away.sub}</p>}
            </div>
          </div>
        </div>

        {/* Headline */}
        {headline && (
          <p className="mx-auto mt-6 max-w-2xl text-center text-sm text-muted-strong text-balance">
            {headline}
          </p>
        )}

        {/* CTAs */}
        <div className="mt-7 flex items-center justify-center gap-3">
          <Link
            href={ctaHref}
            className="group inline-flex items-center gap-2 rounded-full bg-live-gradient px-6 py-2.5 text-sm font-bold text-berry transition-transform hover:scale-[1.03]"
          >
            Match Centre
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
          <Link
            href="/ai-insights"
            className="inline-flex items-center gap-2 rounded-full border border-border-strong bg-navy/50 px-6 py-2.5 text-sm font-semibold text-foreground-soft backdrop-blur transition-colors hover:border-border-strong hover:bg-blue/40"
          >
            <Sparkles className="h-4 w-4" /> AI Insight
          </Link>
        </div>
      </div>
    </div>
  );
}
