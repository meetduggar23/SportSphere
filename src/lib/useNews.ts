"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cachedFetch } from "@/lib/requestCache";
import type { News } from "@/types";

export type NewsStatus = "loading" | "ready" | "unavailable";

interface NewsEnvelope {
  data: News[];
  totalResults?: number;
  dataSource?: string;
  lastUpdated?: number;
}

export interface NewsFeed {
  articles: News[];
  status: NewsStatus;
  dataSource?: string;
  lastUpdated: number | null;
  error?: string;
  retry: () => void;
}

interface NewsState {
  status: NewsStatus;
  articles: News[];
  dataSource?: string;
  lastUpdated: number | null;
  error?: string;
}

const initial: NewsState = {
  status: "loading",
  articles: [],
  lastUpdated: null,
};

/**
 * Sports news feed backed by the NewsData.io proxy route. The route already
 * enforces sports-only content server-side; this hook just manages the
 * fetch lifecycle (loading → ready/unavailable) and exposes a retry.
 *
 * Follows the useCricketData convention: `load` returns the next state and
 * setState only ever runs inside promise callbacks — never synchronously
 * from the mount effect.
 */
export function useNews(): NewsFeed {
  const [state, setState] = useState<NewsState>(initial);
  const mounted = useRef(true);

  const load = useCallback(async (): Promise<NewsState | null> => {
    const res = await cachedFetch<NewsEnvelope>("/api/news", async () => {
      const r = await fetch("/api/news");
      if (!r.ok) throw new Error(`News API error: ${r.status}`);
      return r.json();
    });
    const articles = Array.isArray(res.data) ? res.data : [];
    if (articles.length === 0) {
      return {
        status: "unavailable",
        articles: [],
        dataSource: res.dataSource,
        lastUpdated: res.lastUpdated ?? null,
        error: "No sports articles available right now.",
      };
    }
    return {
      status: "ready",
      articles,
      dataSource: res.dataSource,
      lastUpdated: res.lastUpdated ?? null,
    };
  }, []);

  const apply = useCallback((next: NewsState | null) => {
    if (next && mounted.current) setState(next);
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "loading" }));
    load()
      .then(apply)
      .catch((e) =>
        apply({
          status: "unavailable",
          articles: [],
          lastUpdated: null,
          error: e instanceof Error ? e.message : "Failed to load news",
        })
      );
  }, [load, apply]);

  useEffect(() => {
    mounted.current = true;
    load()
      .then(apply)
      .catch((e) =>
        apply({
          status: "unavailable",
          articles: [],
          lastUpdated: null,
          error: e instanceof Error ? e.message : "Failed to load news",
        })
      );
    return () => {
      mounted.current = false;
    };
  }, [load, apply]);

  return { ...state, retry };
}
