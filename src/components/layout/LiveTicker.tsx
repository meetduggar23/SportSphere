"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { sportIcons, Sport } from "@/types";

interface TickerItem {
  id: string;
  sport: Sport;
  href: string;
  homeShort: string;
  awayShort: string;
  homeScore: number | string;
  awayScore: number | string;
  minute: string;
}

// 5 minutes — the free API tier allows only ~100 requests/day, and the ticker
// fans out to every sport provider per poll. 60s polling would burn the quota.
const POLL_MS = 300_000;

export function LiveTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const mounted = useRef(true);

  const load = useCallback(() => {
    fetch("/api/live-ticker")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("ticker failed"))))
      .then((data: { items?: TickerItem[] }) => {
        if (!mounted.current) return;
        setItems(data.items ?? []);
        setLoaded(true);
      })
      .catch(() => {
        if (!mounted.current) return;
        setLoaded(true);
      });
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    const timer = window.setInterval(load, POLL_MS);
    return () => {
      mounted.current = false;
      window.clearInterval(timer);
    };
  }, [load]);

  return (
    <div className="relative z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center">
        <div className="flex shrink-0 items-center gap-2 border-r border-border px-4 py-1">
          <span className="inline-flex items-center gap-1.5 bg-primary px-2 py-0.5 rounded-full">
            <span className="relative flex h-1 w-1">
              <span className="absolute inline-flex h-full w-full bg-navy animate-ping-ring" />
              <span className="relative inline-flex h-1 w-1 bg-navy" />
            </span>
            <span className="label text-navy">Live</span>
          </span>
        </div>

        <div className="ticker-track relative flex-1 overflow-hidden">
          {!loaded ? (
            <p className="meta px-5 py-1.5">Checking live events…</p>
          ) : items.length === 0 ? (
            <p className="meta px-5 py-1.5">No live events right now — check back soon</p>
          ) : (
            <div className="animate-ticker flex w-max min-w-full items-center">
              {[0, 1].map((dup) => (
                <div key={dup} aria-hidden={dup === 1} className="flex items-center">
                  {items.map((m) => (
                    <Link
                      key={`${dup}-${m.id}`}
                      href={m.href}
                      className="group flex items-center gap-2.5 px-5 py-1 text-xs transition-colors hover:bg-blue/40"
                    >
                      <span className="text-muted">{sportIcons[m.sport]}</span>
                      <span className="font-semibold text-foreground-soft">{m.homeShort}</span>
                      <span className="tabular-nums text-muted-strong">{m.homeScore}</span>
                      <span className="text-muted">—</span>
                      <span className="tabular-nums text-muted-strong">{m.awayScore}</span>
                      <span className="font-semibold text-foreground-soft">{m.awayShort}</span>
                      {m.minute && (
                        <span className="ml-0.5 bg-blue px-1.5 py-px text-[10px] font-bold text-muted-strong">
                          {m.minute}
                        </span>
                      )}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          )}
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
