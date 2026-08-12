import {
  CRICKET_API,
  RECORD_DEFINITIONS,
  recordsFor,
} from "@/sports/cricket/config/cricketConfig";
import type {
  CricketRecord,
  CricketRecordQuery,
  CricketRecordsResult,
  RecordDefinition,
} from "@/sports/cricket/types/cricketTypes";

/**
 * RECORDS ENGINE
 *
 * Data-driven: the record catalog comes from RECORD_DEFINITIONS in config, so
 * the UI never hardcodes a record. Results come from a pluggable list of
 * records-capable providers.
 *
 * ACCURACY RULE: SportsSphere never synthesizes records. When no configured
 * provider can supply verified historical records, the engine returns an
 * "unavailable" result — with the full supported catalog + source metadata —
 * and the UI shows "Statistics currently unavailable".
 */

export interface RecordsProvider {
  readonly name: string;
  /** Returns true when this provider can serve the given query. */
  supports(query: CricketRecordQuery): boolean;
  query(query: CricketRecordQuery): Promise<CricketRecord[]>;
}

/**
 * Provider registry for historical records. CricAPI supplies live matches,
 * players and points tables but not career aggregate records, so this list is
 * intentionally empty today. Connect a records-capable provider (e.g. a
 * licensed stats feed) here and records pages light up with zero UI changes.
 */
const recordProviders: RecordsProvider[] = [];

/** The record catalog for a format + category — always available (config). */
export function getRecordCatalog(
  format: CricketRecordQuery["format"],
  category: CricketRecordQuery["category"]
): RecordDefinition[] {
  return recordsFor(format, category);
}

/** Look up a record definition by key across the whole catalog. */
export function findRecordDefinition(key: string): RecordDefinition | undefined {
  return RECORD_DEFINITIONS.find((r) => r.key === key);
}

/**
 * Query records for a format + category (Statsguru-style filters accepted
 * where the provider supports them; unsupported filters are ignored rather
 * than guessed at). Pagination is applied here so providers can stream.
 */
export async function queryRecords(
  query: CricketRecordQuery
): Promise<CricketRecordsResult> {
  const catalog = getRecordCatalog(query.format, query.category);
  const specific = query.recordType
    ? catalog.find((r) => r.key === query.recordType)
    : catalog[0];

  // Try each records-capable provider in order.
  for (const provider of recordProviders) {
    if (!provider.supports(query)) continue;
    try {
      const all = await provider.query(query);
      const start = (query.page - 1) * query.pageSize;
      const page = all.slice(start, start + query.pageSize);
      return {
        status: "ready",
        records: page,
        total: all.length,
        page: query.page,
        pageSize: query.pageSize,
        catalog,
        source: provider.name,
        provider: provider.name,
        lastUpdated: new Date().toISOString(),
      };
    } catch (e) {
      // Fall through to the next provider / unavailable state.
      console.warn("[cricket] records provider failed", e);
    }
  }

  // Honest unavailable: the catalog is still delivered so users can see what
  // records the system supports for this format + category.
  return {
    status: "unavailable",
    records: [],
    total: 0,
    page: query.page,
    pageSize: query.pageSize,
    catalog,
    source: CRICKET_API.sourceName,
    sourceUrl: CRICKET_API.sourceUrl,
    provider: CRICKET_API.provider,
    lastUpdated: null,
    error: specific
      ? `"${specific.label}" is not available from the connected provider (${CRICKET_API.sourceName}). Career records require a records-capable data source.`
      : `Historical records are not available from the connected provider (${CRICKET_API.sourceName}).`,
  };
}
