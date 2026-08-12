import { ExternalLink } from "lucide-react";
import { timeAgo } from "@/sports/cricket/utils/cricketFormat";

interface CricketSourceFooterProps {
  source?: string;
  sourceUrl?: string;
  lastUpdated?: string | null;
  className?: string;
}

/**
 * Data-freshness footer: names the connected provider and when the dataset was
 * last refreshed. Every statistics surface renders one so stale data is never
 * presented as current.
 */
export function CricketSourceFooter({
  source,
  sourceUrl,
  lastUpdated,
  className,
}: CricketSourceFooterProps) {
  if (!source && !lastUpdated) return null;
  return (
    <p
      className={`flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted ${className ?? ""}`}
    >
      {source && (
        <span className="inline-flex items-center gap-1">
          <span className="font-semibold text-muted-strong">{source}</span>
          {sourceUrl && (
            <a
              href={sourceUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-0.5 text-secondary transition-colors hover:text-foreground"
              aria-label={`${source} website`}
            >
              <ExternalLink className="h-3 w-3" />
            </a>
          )}
        </span>
      )}
      {lastUpdated && <span>Updated {timeAgo(lastUpdated)}</span>}
    </p>
  );
}
