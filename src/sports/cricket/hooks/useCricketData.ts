"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cachedFetch } from "@/lib/requestCache";

export type CricketDataStatus = "loading" | "ready" | "unavailable";

export interface CricketEnvelope<T> {
  status: "ready" | "unavailable";
  data: T | null;
  source?: string;
  sourceUrl?: string;
  provider?: string;
  lastUpdated?: string | null;
  error?: string;
}

interface CricketDataState<T> {
  status: CricketDataStatus;
  data: T | null;
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
  error?: string;
}

const initial: CricketDataState<never> = {
  status: "loading",
  data: null,
};

function unavailableState(error: string): CricketDataState<never> {
  return { status: "unavailable", data: null, error };
}

/**
 * Generic data hook for /api/cricket/* routes.
 * Uses the app-wide request cache (in-flight dedup + 60s TTL) so the cricket
 * hub, records page and ticker never duplicate network calls. Failures render
 * as "unavailable" — never mock fallbacks. setState only ever runs inside
 * promise callbacks (async), never synchronously from the mount effect.
 */
export function useCricketData<T>(path: string) {
  const [state, setState] = useState<CricketDataState<T>>(initial as CricketDataState<T>);
  const mounted = useRef(true);

  const load = useCallback(async (): Promise<CricketDataState<T> | null> => {
    if (!path) return null;
    const res = await cachedFetch<CricketEnvelope<T>>(path, async () => {
      const r = await fetch(path);
      if (!r.ok) throw new Error(`Cricket API error: ${r.status}`);
      return r.json();
    });
    if (res.status === "ready" && res.data != null) {
      return {
        status: "ready",
        data: res.data,
        source: res.source,
        sourceUrl: res.sourceUrl,
        lastUpdated: res.lastUpdated,
      };
    }
    return {
      status: "unavailable",
      data: null,
      source: res.source,
      sourceUrl: res.sourceUrl,
      lastUpdated: res.lastUpdated,
      error: res.error ?? "Cricket data is currently unavailable.",
    };
  }, [path]);

  const apply = useCallback((next: CricketDataState<T> | null) => {
    if (next && mounted.current) setState(next);
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "loading" }));
    load()
      .then(apply)
      .catch((e) => apply(unavailableState(e instanceof Error ? e.message : "Cricket data is currently unavailable.")));
  }, [load, apply]);

  useEffect(() => {
    mounted.current = true;
    load()
      .then(apply)
      .catch((e) => apply(unavailableState(e instanceof Error ? e.message : "Cricket data is currently unavailable.")));
    return () => {
      mounted.current = false;
    };
  }, [load, apply]);

  return { ...state, retry };
}
