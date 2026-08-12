"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Sport, sportShortLabels } from "@/types";

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

/** Same-content guard: identical payloads must not re-render the whole shell. */
function sameItems(a: TickerItem[], b: TickerItem[]): boolean {
  if (a.length !== b.length) return false;
  return a.every((item, i) => {
    const other = b[i];
    return (
      other !== undefined &&
      item.id === other.id &&
      item.homeScore === other.homeScore &&
      item.awayScore === other.awayScore &&
      item.minute === other.minute
    );
  });
}

export function LiveTicker() {
  const [items, setItems] = useState<TickerItem[]>([]);
  const [loaded, setLoaded] = useState(false);
  const mounted = useRef(true);
  const itemsRef = useRef<TickerItem[]>([]);
  const timerRef = useRef<number | null>(null);

  const load = useCallback(() => {
    fetch("/api/live-ticker")
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error("ticker failed"))))
      .then((data: { items?: TickerItem[] }) => {
        if (!mounted.current) return;
        const next = data.items ?? [];
        // Skip the state update (and the resulting shell re-render) when the
        // scores haven't actually changed since the last poll.
        if (!sameItems(itemsRef.current, next)) {
          itemsRef.current = next;
          setItems(next);
        }
        setLoaded(true);
      })
      .catch(() => {
        if (!mounted.current) return;
        setLoaded(true);
      });
  }, []);

  const startPolling = useCallback(() => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
    timerRef.current = window.setInterval(load, POLL_MS);
  }, [load]);

  const stopPolling = useCallback(() => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
  }, []);

  useEffect(() => {
    mounted.current = true;
    void load();
    startPolling();

    // Pause polling while the tab is hidden — live scores don't need to
    // refresh for a background tab, and resuming keeps the ticker current
    // the moment the user returns.
    const onVisibility = () => {
      if (document.hidden) stopPolling();
      else {
        void load();
        startPolling();
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      mounted.current = false;
      stopPolling();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [load, startPolling, stopPolling]);

  return (
    <div className="relative z-40 border-b border-border bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex max-w-[1440px] items-center">
        {items.length > 0 && (
          <div className="flex shrink-0 items-center gap-2 border-r border-border px-4 py-1">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-secondary">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full bg-secondary animate-ping-ring" />
                <span className="relative inline-flex h-1.5 w-1.5 bg-secondary" />
              </span>
              Live
            </span>
          </div>
        )}

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
                      className="group flex items-center gap-2.5 px-5 py-1 text-xs transition-colors hover:bg-muted/15"
                    >
                      <span className="label shrink-0 text-secondary">{sportShortLabels[m.sport]}</span>
                      <span className="font-semibold text-foreground-soft">{m.homeShort}</span>
                      <span className="tabular-nums text-muted-strong">{m.homeScore}</span>
                      <span className="text-muted">—</span>
                      <span className="tabular-nums text-muted-strong">{m.awayScore}</span>
                      <span className="font-semibold text-foreground-soft">{m.awayShort}</span>
                      {m.minute && (
                        <span className="ml-0.5 bg-secondary/15 px-1.5 py-px text-[10px] font-bold text-secondary">
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
