"use client";

import { useMemo, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { CricketFormatTabs } from "@/sports/cricket/components/CricketFormatTabs";
import { CricketRecordTable } from "@/sports/cricket/components/CricketRecordTable";
import { CricketFilterBar } from "@/sports/cricket/components/CricketFilterBar";
import { RecordsUnavailable } from "@/sports/cricket/components/RecordsUnavailable";
import { CricketSourceFooter } from "@/sports/cricket/components/CricketSourceFooter";
import { useCricketRecords } from "@/sports/cricket/hooks/useCricketRecords";
import { useCricketTeams } from "@/sports/cricket/hooks/useCricketTeams";
import { getRecordCatalog } from "@/sports/cricket/services/cricketRecords";
import { cricketFormat, IPL_TEAMS, recordCategory } from "@/sports/cricket/config/cricketConfig";
import { cn } from "@/lib/utils";
import type {
  CricketFormatId,
  CricketRecordCategory,
} from "@/sports/cricket/types/cricketTypes";

interface CricketRecordsProps {
  defaultFormat?: CricketFormatId;
  defaultCategory?: CricketRecordCategory;
  /** Preselected country/team filter (e.g. from ?team=india). */
  defaultTeam?: string;
  className?: string;
}

const PAGE_SIZE = 10;

/**
 * CRICKET RECORDS EXPLORER
 *
 *   [Test] [ODI] [T20I] [IPL]          ← format
 *   [Batting] [Bowling] [Fielding] …   ← category
 *   [Most career runs] [Most 100s] …   ← record type (data-driven)
 *
 * Filters appear only when a records-capable provider is connected — never
 * before, because unsupported filters would imply data that isn't there.
 */
export function CricketRecords({
  defaultFormat = "test",
  defaultCategory = "batting",
  defaultTeam,
  className,
}: CricketRecordsProps) {
  const [format, setFormat] = useState<CricketFormatId>(defaultFormat);
  const [category, setCategory] = useState<CricketRecordCategory>(defaultCategory);
  const [recordType, setRecordType] = useState<string | undefined>(undefined);
  const [season, setSeason] = useState<string | undefined>(undefined);
  const [team, setTeam] = useState<string | undefined>(defaultTeam);
  const [search, setSearch] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);

  // Local catalog (config) — renders record-type chips before data arrives.
  const catalog = useMemo(() => getRecordCatalog(format, category), [format, category]);
  const activeDefinition = useMemo(
    () => catalog.find((d) => d.key === recordType) ?? catalog[0],
    [catalog, recordType]
  );

  const { status, data, error, source, sourceUrl, lastUpdated } = useCricketRecords({
    format,
    category,
    recordType: activeDefinition?.key,
    season,
    team,
    search,
    page,
    pageSize: PAGE_SIZE,
  });

  const onFormat = (f: CricketFormatId) => {
    setFormat(f);
    setRecordType(undefined);
    setPage(1);
    setSeason(undefined);
  };
  const onCategory = (c: CricketRecordCategory) => {
    setCategory(c);
    setRecordType(undefined);
    setPage(1);
    setSeason(undefined);
  };

  const formatDef = cricketFormat(format);
  const totalPages = data && data.total > 0 ? Math.ceil(data.total / PAGE_SIZE) : 0;

  // Country filter options come from the global teams list (any nation), plus
  // IPL franchise names when the IPL format is selected.
  const { data: countries } = useCricketTeams();
  const teams = useMemo(() => {
    const names = new Set((countries ?? []).map((t) => t.name));
    if (format === "ipl") IPL_TEAMS.forEach((t) => names.add(t.name));
    return [...names].sort((a, b) => a.localeCompare(b));
  }, [countries, format]);

  return (
    <div className={cn("space-y-5", className)}>
      {/* Format */}
      <div>
        <p className="label mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Format
        </p>
        <CricketFormatTabs active={format} onChange={onFormat} />
      </div>

      {/* Category */}
      <div>
        <p className="label mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Category
        </p>
        <div className="no-scrollbar flex items-center gap-1 overflow-x-auto">
          {(["batting", "bowling", "fielding", "allround", "team", "captaincy", "partnership"] as const).map(
            (c) => {
              const def = recordCategory(c);
              const isActive = c === category;
              return (
                <button
                  key={c}
                  onClick={() => onCategory(c)}
                  className={cn(
                    "relative flex shrink-0 items-center whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-200",
                    isActive
                      ? "text-foreground"
                      : "text-muted hover:bg-blue/20 hover:text-foreground rounded-sm"
                  )}
                >
                  {def.label}
                  {isActive && <span className="absolute inset-x-2 bottom-0 h-0.5 bg-primary" />}
                </button>
              );
            }
          )}
        </div>
      </div>

      {/* Record type (data-driven chips) */}
      <div>
        <p className="label mb-2 text-[11px] font-semibold uppercase tracking-wider text-muted">
          Record
        </p>
        <div className="flex flex-wrap gap-2">
          {catalog.map((r) => {
            const isActive = activeDefinition?.key === r.key;
            return (
              <button
                key={r.key}
                onClick={() => {
                  setRecordType(r.key);
                  setPage(1);
                }}
                className={cn(
                  "  border px-3 py-1.5 text-sm font-medium transition-all duration-200 rounded-md",
                  isActive
                    ? "border-secondary bg-secondary/10 text-foreground"
                    : "border-border bg-blue/10 text-muted hover:border-border-strong hover:text-foreground"
                )}
              >
                {r.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters — only once a records-capable provider is connected */}
      {status === "ready" && (
        <CricketFilterBar
          format={format}
          season={season}
          team={team}
          search={search}
          teams={teams}
          onSeason={(s) => {
            setSeason(s || undefined);
            setPage(1);
          }}
          onTeam={(t) => {
            setTeam(t || undefined);
            setPage(1);
          }}
          onSearch={(s) => {
            setSearch(s || undefined);
            setPage(1);
          }}
          onReset={() => {
            setSeason(undefined);
            setTeam(undefined);
            setSearch(undefined);
            setPage(1);
          }}
        />
      )}

      {/* Results */}
      {status === "loading" && (
        <p className="  border border-border-navy bg-card/50 px-5 py-10 text-center text-sm text-muted rounded-md">
          Loading records…
        </p>
      )}

      {status === "unavailable" && activeDefinition && (
        <RecordsUnavailable
          title="Statistics currently unavailable"
          message={error ?? `"${activeDefinition.label}" (${formatDef.label} • ${recordCategory(category).label}) could not be loaded.`}
          source={source}
          sourceUrl={sourceUrl}
          lastUpdated={lastUpdated}
        />
      )}

      {status === "ready" && data && activeDefinition && (
        <>
          <CricketRecordTable
            definition={activeDefinition}
            records={data.records}
            offset={(data.page - 1) * PAGE_SIZE}
          />

          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <p className="text-xs text-muted">
                Page {data.page} of {totalPages} • {data.total} entries
              </p>
              <div className="flex items-center gap-1">
                <button
                  disabled={data.page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="  border border-border p-1.5 text-muted transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-40 rounded-md"
                  aria-label="Previous page"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  disabled={data.page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="  border border-border p-1.5 text-muted transition-colors hover:border-border-strong hover:text-foreground disabled:opacity-40 rounded-md"
                  aria-label="Next page"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          )}
        </>
      )}

      {activeDefinition && (
        <p className="text-xs leading-relaxed text-muted">
          {activeDefinition.description}
        </p>
      )}

      <CricketSourceFooter source={source} sourceUrl={sourceUrl} lastUpdated={lastUpdated} />
    </div>
  );
}
