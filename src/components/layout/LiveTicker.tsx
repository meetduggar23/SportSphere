"use client";

import Link from "next/link";
import { liveMatches } from "@/data/mock";
import { sportIcons } from "@/types";

export function LiveTicker() {
  const items = liveMatches.filter((m) => m.status === "live");

  return (
    <div className="relative z-40 border-b border-border-navy bg-navy/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center">
        <div className="flex shrink-0 items-center gap-2 border-r border-border-navy px-4 py-1">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-2 py-0.5">
            <span className="relative flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
              <span className="relative inline-flex h-1 w-1 rounded-full bg-berry" />
            </span>
            <span className="label text-berry">Live</span>
          </span>
        </div>

        <div className="ticker-track relative flex-1 overflow-hidden">
          <div className="animate-ticker flex w-max min-w-full items-center">
            {[0, 1].map((dup) => (
              <div key={dup} aria-hidden={dup === 1} className="flex items-center">
                {items.length === 0 && (
                  <span className="meta px-6 py-1">No live matches right now — check back soon</span>
                )}
                {items.map((m) => {
                  return (
                    <Link
                      key={`${dup}-${m.id}`}
                      href={`/match/${m.id}`}
                      className="group flex items-center gap-2.5 px-5 py-1 text-xs transition-colors hover:bg-blue/40"
                    >
                      <span className="text-muted">{sportIcons[m.sport]}</span>
                      <span className="font-semibold text-foreground-soft">
                        {m.homeTeam.shortName}
                      </span>
                      <span className="tabular-nums text-muted-strong">{m.homeScore}</span>
                      <span className="text-muted">{"—"}</span>
                      <span className="tabular-nums text-muted-strong">{m.awayScore}</span>
                      <span className="font-semibold text-foreground-soft">
                        {m.awayTeam.shortName}
                      </span>
                      <span className="ml-0.5 rounded-full bg-blue px-1.5 py-px text-[10px] font-bold text-muted-strong">
                        {m.minute}
                      </span>
                    </Link>
                  );
                })}
              </div>
            ))}
          </div>
        </div>

        <Link
          href="/live"
          className="hidden shrink-0 items-center gap-1.5 border-l border-border-navy px-4 py-1 text-xs font-bold text-muted transition-colors hover:bg-blue/40 hover:text-foreground sm:flex"
        >
          All Live
        </Link>
      </div>
    </div>
  );
}
