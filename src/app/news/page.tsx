"use client";

import { useMemo, useState } from "react";
import { Newspaper, RefreshCw } from "lucide-react";
import { AppShell } from "@/components/layout/AppShell";
import { PageHeader } from "@/components/ui/PageHeader";
import { SportTabs } from "@/components/ui/SportTabs";
import { DataStatus } from "@/components/ui/DataStatus";
import { NewsCard } from "@/components/sports/NewsCard";
import { useNews } from "@/lib/useNews";

const tabs = [
  { label: "All News", value: "all" },
  { label: "Football", value: "football" },
  { label: "Cricket", value: "cricket" },
  { label: "Basketball", value: "basketball" },
  { label: "Formula 1", value: "f1" },
  { label: "Transfers", value: "transfers" },
];

function SkeletonCard() {
  return (
    <div className="overflow-hidden arena-card p-0">
      <div className="h-44 animate-pulse bg-blue/25" />
      <div className="p-5 space-y-2.5">
        <div className="h-3.5 w-24 animate-pulse bg-blue/25 rounded-sm" />
        <div className="h-4 w-full animate-pulse bg-blue/25 rounded-sm" />
        <div className="h-4 w-3/4 animate-pulse bg-blue/25 rounded-sm" />
      </div>
    </div>
  );
}

export default function NewsPage() {
  const { articles, status, dataSource, lastUpdated, error, retry } = useNews();
  const [active, setActive] = useState("all");

  const filtered = useMemo(() => {
    if (active === "all") return articles;
    return articles.filter(
      (n) => n.sport === active || n.category.toLowerCase() === active
    );
  }, [articles, active]);

  return (
    <AppShell>
      <div className="max-w-7xl mx-auto">
        <PageHeader
          icon={<Newspaper className="h-5 w-5" />}
          title="Sports News"
          subtitle="Breaking news, match reports, and analysis from around the world of sports"
        />

        <SportTabs tabs={tabs} active={active} onChange={setActive} className="mb-6" />

        <DataStatus
          status={status}
          dataSource={dataSource}
          lastUpdated={lastUpdated}
          error={error}
          onRetry={retry}
        />

        {status === "loading" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {status === "unavailable" && (
          <div className="arena-card flex flex-col items-center justify-center py-16 text-center">
            <RefreshCw className="mb-3 h-7 w-7 text-muted" />
            <p className="heading text-lg text-foreground">News is unavailable right now</p>
            <p className="mt-1.5 max-w-sm text-sm text-muted">
              {error ?? "No sports articles could be loaded. Please try again later."}
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-5 inline-flex items-center gap-1.5 border border-border-strong px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/10 rounded-md"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          </div>
        )}

        {status === "ready" && (
          <>
            {filtered.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filtered.map((news) => (
                  <NewsCard key={news.id} news={news} />
                ))}
              </div>
            ) : (
              <div className="arena-card py-14 text-center">
                <p className="heading text-lg text-foreground">
                  No {tabs.find((t) => t.value === active)?.label} stories right now
                </p>
                <p className="mt-1.5 text-sm text-muted">
                  Try another category, or check back soon for fresh sports coverage.
                </p>
              </div>
            )}
          </>
        )}
      </div>
    </AppShell>
  );
}
