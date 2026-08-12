"use client";

import { use, useCallback, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ExternalLink, Loader2, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { NewsCard } from "@/components/sports/NewsCard";
import { cachedFetch } from "@/lib/requestCache";
import type { News } from "@/types";

type DetailStatus = "loading" | "ready" | "unavailable";

interface DetailResult {
  status: DetailStatus;
  news: News | null;
  related: News[];
}

export default function NewsDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [state, setState] = useState<DetailResult>({
    status: "loading",
    news: null,
    related: [],
  });
  const { status, news, related } = state;

  // Returns the next state; setState runs only inside promise callbacks.
  const load = useCallback(async (): Promise<DetailResult> => {
    // The shared list call goes through the same request cache as the news
    // page so both never duplicate the upstream fetch within the TTL.
    const [articleRes, listPayload] = await Promise.all([
      fetch(`/api/news?id=${encodeURIComponent(id)}`),
      cachedFetch<{ data?: News[] }>("/api/news", async () => {
        const r = await fetch("/api/news");
        if (!r.ok) throw new Error(`News API error: ${r.status}`);
        return r.json();
      }),
    ]);
    const articlePayload = await articleRes.json();

    if (!articleRes.ok) {
      throw new Error(articlePayload.error || "Failed to load article");
    }

    const article = articlePayload.data?.[0] ?? null;
    return {
      status: article ? "ready" : "unavailable",
      news: article,
      related: (Array.isArray(listPayload.data) ? listPayload.data : [])
        .filter((n: News) => n.id !== id)
        .slice(0, 3),
    };
  }, [id]);

  const apply = useCallback((next: DetailResult) => {
    setState(next);
  }, []);

  const retry = useCallback(() => {
    setState((s) => ({ ...s, status: "loading" }));
    load()
      .then(apply)
      .catch((e) => {
        console.error("News detail failed:", e);
        apply({ status: "unavailable", news: null, related: [] });
      });
  }, [load, apply]);

  useEffect(() => {
    load()
      .then(apply)
      .catch((e) => {
        console.error("News detail failed:", e);
        apply({ status: "unavailable", news: null, related: [] });
      });
  }, [load, apply]);

  if (status === "loading") {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3 text-sm text-muted py-20 justify-center">
            <Loader2 className="h-4 w-4 animate-spin text-secondary" />
            Loading article…
          </div>
        </div>
      </AppShell>
    );
  }

  if (status === "unavailable" || !news) {
    return (
      <AppShell>
        <div className="max-w-7xl mx-auto px-4 py-20 text-center">
          <h1 className="text-xl font-bold">Article not found</h1>
          <p className="text-sm text-muted mt-2 max-w-sm mx-auto">
            We couldn&apos;t load this article. It may have been removed by the
            publisher or is no longer in the sports feed.
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Link
              href="/news"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:underline"
            >
              <ArrowLeft className="h-4 w-4" /> Back to News
            </Link>
            <button
              type="button"
              onClick={retry}
              className="inline-flex items-center gap-1.5 border border-border-strong px-3 py-1.5 text-sm font-semibold transition-colors hover:bg-muted/10 rounded-md"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          </div>
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell>
      <div className="max-w-4xl mx-auto">
        <Link
          href="/news"
          className="inline-flex items-center gap-1.5 text-sm text-muted hover:text-foreground transition-colors mb-4"
        >
          <ArrowLeft className="h-4 w-4" /> Back to News
        </Link>

        <article className="arena-card overflow-hidden">
          <div className="relative h-64 md:h-80">
            <Image
              src={news.image}
              alt={news.title}
              fill
              priority
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/80 to-transparent" />
            <div className="absolute bottom-4 left-6 right-6">
              <span className="text-[11px] font-bold px-2.5 py-1 bg-primary text-navy rounded-full">
                {news.category}
              </span>
              <h1 className="text-xl md:text-2xl font-extrabold text-white mt-3 leading-snug">
                {news.title}
              </h1>
            </div>
          </div>

          <div className="p-6">
            <div className="flex items-center justify-between pb-5 border-b border-border mb-5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-secondary/10 text-secondary flex items-center justify-center font-bold rounded-full">
                  {news.source?.[0] ?? news.author?.[0] ?? "S"}
                </div>
                <div>
                  <p className="text-sm font-semibold">
                    {news.author ?? news.source ?? "SportSphere Desk"}
                  </p>
                  <p className="text-xs text-muted">
                    {news.timeAgo}
                    {news.source ? ` • ${news.source}` : ""}
                  </p>
                </div>
              </div>
              {news.url && (
                <a
                  href={news.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-primary px-4 py-2 text-sm font-bold text-navy transition-colors hover:bg-primary-hover rounded-md"
                >
                  Read full story <ExternalLink className="h-3.5 w-3.5" />
                </a>
              )}
            </div>

            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
              <p>{news.excerpt}</p>
              {news.url && (
                <p className="text-sm text-muted">
                  This article was aggregated from {news.source ?? "its publisher"}.
                  Head over to the original story for the complete report and updates.
                </p>
              )}
            </div>
          </div>
        </article>

        {related.length > 0 && (
          <div className="mt-10">
            <h2 className="font-bold text-lg mb-4">More Sports News</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {related.map((n) => (
                <NewsCard key={n.id} news={n} />
              ))}
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}
