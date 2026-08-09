"use client";

import { DatabaseZap, Loader2, RefreshCw } from "lucide-react";
import type { SportDataStatus } from "@/lib/useSportData";

function timeAgo(ts: number): string {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 10) return "just now";
  if (s < 60) return `${s}s ago`;
  const m = Math.floor(s / 60);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  return `${h}h ago`;
}

interface DataStatusProps {
  status: SportDataStatus;
  dataSource?: string;
  lastUpdated?: number | null;
  error?: string;
  onRetry?: () => void;
}

export function DataStatus({
  status,
  dataSource,
  lastUpdated,
  error,
  onRetry,
}: DataStatusProps) {
  if (status === "loading") {
    return (
      <div className="mb-6 flex items-center gap-3  border border-border-navy bg-card/60 px-4 py-3 text-sm text-muted rounded-md">
        <Loader2 className="h-4 w-4 animate-spin text-secondary" />
        Loading live data…
      </div>
    );
  }

  if (status === "unavailable") {
    return (
      <div className="mb-6  border border-border-strong bg-card/60 p-5 rounded-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center  bg-secondary/10 text-secondary rounded-md">
              <DatabaseZap className="h-5 w-5" />
            </span>
            <div>
              <p className="font-bold">Data currently unavailable</p>
              <p className="mt-0.5 text-sm text-muted">
                {error ??
                  "No data provider could be reached. Please try again later."}
              </p>
            </div>
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              className="inline-flex shrink-0 items-center gap-1.5  border border-border-strong px-4 py-2 text-sm font-semibold transition-colors hover:bg-muted/10 rounded-md"
            >
              <RefreshCw className="h-3.5 w-3.5" /> Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  // ready
  if (lastUpdated) {
    return (
      <p className="mb-6 -mt-2 text-xs text-muted">
        {dataSource ? `${dataSource} • ` : ""}Updated {timeAgo(lastUpdated)}
      </p>
    );
  }
  return null;
}
