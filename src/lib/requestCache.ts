/**
 * Minimal request cache with in-flight deduplication.
 *
 * The home feed, live page, live ticker and sport pages all fetch overlapping
 * API data. This module guarantees that identical requests within a short
 * window share a single network call (in-flight dedup) and that repeat calls
 * within the TTL resolve from memory instead of hitting the network again.
 *
 * Server-side fetches are intentionally NOT routed here — the API routes
 * already cache upstream calls with `next: { revalidate }`.
 */

interface CacheEntry<T> {
  value: T;
  expires: number;
}

const ttlStore = new Map<string, CacheEntry<unknown>>();
const inFlight = new Map<string, Promise<unknown>>();

const DEFAULT_TTL_MS = 60_000;

/** Evict expired entries so the store can't grow unbounded. */
function sweep() {
  const now = Date.now();
  for (const [key, entry] of ttlStore) {
    if (entry.expires <= now) ttlStore.delete(key);
  }
}

/**
 * Deduplicated fetch with TTL caching.
 *
 * - Concurrent calls with the same `key` share one in-flight request.
 * - Successful responses are cached for `ttlMs` (default 60s).
 * - Failures are never cached, so the next call retries naturally.
 *
 * IMPORTANT: returned values are shared by reference while cached — callers
 * must not mutate them in place (no `sort()`, `push()`, etc.). Consumers that
 * need to transform data should `slice`/`map`/`filter` into new arrays first.
 */
export async function cachedFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlMs: number = DEFAULT_TTL_MS
): Promise<T> {
  sweep();

  const cached = ttlStore.get(key);
  if (cached) return cached.value as T;

  const pending = inFlight.get(key);
  if (pending) return pending as Promise<T>;

  const request = fetcher()
    .then((value) => {
      inFlight.delete(key);
      ttlStore.set(key, { value, expires: Date.now() + ttlMs });
      return value;
    })
    .catch((error) => {
      inFlight.delete(key);
      throw error;
    });

  inFlight.set(key, request);
  return request;
}
