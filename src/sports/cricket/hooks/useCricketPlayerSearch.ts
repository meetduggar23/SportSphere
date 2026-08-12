"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cachedFetch } from "@/lib/requestCache";

/**
 * Debounced cricket player search.
 *
 * - Types "v", "vi", "vir", "vira", "virat" do NOT fire five requests: the
 *   query is debounced 300ms and only the settled value hits the API.
 * - Stale responses are cancelled via a request sequence guard — a slower
 *   earlier search can never overwrite a newer one.
 * - Identical searches hit the app request cache (cricket:players:search:<q>),
 *   so repeated identical searches never burn API quota.
 */
export interface PlayerSearchEnvelope {
  players: { id: string; name: string; country?: string }[];
  total: number;
  offset: number;
  hasMore: boolean;
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
  error?: string;
  status: "ready" | "unavailable";
}

const DEBOUNCE_MS = 300;

interface PageResult {
  seq: number;
  status: "ready" | "unavailable";
  players?: { id: string; name: string; country?: string }[];
  total?: number;
  hasMore?: boolean;
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
  error?: string;
}

export function useCricketPlayerSearch(initialQuery = "") {
  const [query, setQuery] = useState(initialQuery);
  const [debounced, setDebounced] = useState(initialQuery.trim());
  const [offset, setOffset] = useState(0);
  const [players, setPlayers] = useState<{ id: string; name: string; country?: string }[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">(
    initialQuery.trim() ? "loading" : "ready"
  );
  const [error, setError] = useState<string | undefined>();
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);
  const [source, setSource] = useState<string | undefined>();
  const [sourceUrl, setSourceUrl] = useState<string | undefined>();
  const [lastUpdated, setLastUpdated] = useState<string | null | undefined>();

  // Monotonic sequence: every NEW debounced query (or page load) bumps it;
  // responses only apply when their captured seq is still the latest.
  const seqRef = useRef(0);
  const latestSeqRef = useRef(0);
  const mountedRef = useRef(true);
  // Last value that actually reached the network (avoids a spurious seq bump
  // when the debounced query is unchanged — e.g. on mount with an empty query,
  // which would otherwise discard the very first directory response).
  const debouncedRef = useRef(initialQuery.trim());

  useEffect(() => {
    mountedRef.current = true;
    return () => {
      mountedRef.current = false;
    };
  }, []);

  // Debounce the raw input — one API call per typing pause, never per key.
  useEffect(() => {
    const t = window.setTimeout(() => {
      const q = query.trim();
      if (q === debouncedRef.current) return; // nothing changed — no new request
      seqRef.current += 1;
      latestSeqRef.current = seqRef.current;
      debouncedRef.current = q;
      setDebounced(q);
      setOffset(0);
      setPlayers([]);
      setHasMore(false);
      setTotal(0);
      setStatus(q ? "loading" : "ready");
      setError(undefined);
    }, DEBOUNCE_MS);
    return () => window.clearTimeout(t);
  }, [query]);

  /** Fetch one page; returns a result object — state updates happen in the
   *  effect's async continuation, never synchronously in a render. */
  const fetchPage = useCallback(
    async (q: string, off: number): Promise<PageResult | null> => {
      const seq = seqRef.current;
      const path = q
        ? `/api/cricket/players?search=${encodeURIComponent(q)}&offset=${off}`
        : `/api/cricket/players?offset=${off}`;

      try {
        const env = await cachedFetch<PlayerSearchEnvelope>(path, async () => {
          const r = await fetch(path);
          if (!r.ok) throw new Error(`Cricket API error: ${r.status}`);
          return r.json();
        });
        if (seq !== latestSeqRef.current) return null;

        if (env.status === "unavailable" || !env.players) {
          return {
            seq,
            status: "unavailable",
            error: env.error ?? "Cricket player service is temporarily unavailable.",
          };
        }
        return {
          seq,
          status: "ready",
          players: env.players,
          total: env.total,
          hasMore: env.hasMore,
          source: env.source,
          sourceUrl: env.sourceUrl,
          lastUpdated: env.lastUpdated,
        };
      } catch (e) {
        if (seq !== latestSeqRef.current) return null;
        return {
          seq,
          status: "unavailable",
          error: e instanceof Error ? e.message : "Cricket player service is temporarily unavailable.",
        };
      }
    },
    []
  );

  useEffect(() => {
    fetchPage(debounced, offset).then((result) => {
      if (!mountedRef.current || !result || result.seq !== latestSeqRef.current) return;

      if (result.status === "unavailable") {
        setStatus("unavailable");
        setError(result.error);
        return;
      }

      setSource(result.source);
      setSourceUrl(result.sourceUrl);
      setLastUpdated(result.lastUpdated);
      setTotal(result.total ?? 0);
      setHasMore(result.hasMore ?? false);

      setPlayers((prev) => {
        const next = result.players ?? [];
        if (offset === 0) return next;
        const seen = new Set(prev.map((p) => p.id));
        const merged = [...prev];
        for (const p of next) {
          if (!seen.has(p.id)) merged.push(p);
        }
        return merged;
      });
      debouncedRef.current = debounced;
      setStatus("ready");
    });
  }, [debounced, offset, fetchPage]);

  const retry = useCallback(() => {
    setStatus(debounced ? "loading" : "ready");
    fetchPage(debounced, offset);
  }, [debounced, offset, fetchPage]);

  const loadMore = useCallback(() => {
    if (!hasMore || status !== "ready") return;
    seqRef.current += 1;
    latestSeqRef.current = seqRef.current;
    setOffset((o) => o + 1);
  }, [hasMore, status]);

  return {
    query,
    setQuery,
    debounced,
    players,
    hasMore,
    total,
    status,
    source,
    sourceUrl,
    lastUpdated,
    error,
    retry,
    loadMore,
  };
}
