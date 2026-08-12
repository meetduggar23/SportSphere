"use client";

import { DatabaseZap, ExternalLink } from "lucide-react";

interface RecordsUnavailableProps {
  title?: string;
  message: string;
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
}

/**
 * The honest empty state: "Statistics currently unavailable." SportsSphere
 * never fabricates cricket data — when the connected provider cannot supply a
 * dataset, this panel explains exactly why and shows the data's provenance.
 */
export function RecordsUnavailable({
  title = "Statistics currently unavailable",
  message,
  source,
  sourceUrl,
  lastUpdated,
}: RecordsUnavailableProps) {
  return (
    <div className="  border border-border-strong bg-card/60 p-6 rounded-md">
      <div className="flex items-start gap-4">
        <span className="flex h-11 w-11 shrink-0 items-center justify-center  bg-secondary/10 text-secondary rounded-md">
          <DatabaseZap className="h-5 w-5" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="heading text-base text-foreground">{title}</p>
          <p className="mt-1.5 text-sm leading-relaxed text-muted">{message}</p>
          {(source || lastUpdated) && (
            <p className="meta mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
              {source && (
                <span className="inline-flex items-center gap-1">
                  Source: <span className="font-semibold text-muted-strong">{source}</span>
                  {sourceUrl && (
                    <a
                      href={sourceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-0.5 text-secondary transition-colors hover:text-foreground"
                    >
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  )}
                </span>
              )}
              {lastUpdated && <span>Updated {lastUpdated}</span>}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
