"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Search, X, Mic, Clock, TrendingUp, ArrowRight } from "lucide-react";
import { recentSearches, trendingSearches } from "@/data/mock";
import { orderedSports, sportLabel, sportEmoji } from "@/config/sports";

interface SearchOverlayProps {
  onClose: () => void;
}

/**
 * Rendered only while open (the parent conditionally mounts it), so state
 * always starts fresh — no reset-on-close effect needed.
 */
export function SearchOverlay({ onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [listening, setListening] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    const t = window.setTimeout(() => inputRef.current?.focus(), 30);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  const submit = (q: string) => {
    const term = q.trim();
    if (!term) return;
    onClose();
    router.push(`/search?q=${encodeURIComponent(term)}`);
  };

  const startVoice = () => {
    if (!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) {
      return;
    }
    const SpeechRecognition =
      (window as unknown as Record<string, unknown>).webkitSpeechRecognition ??
      (window as unknown as Record<string, unknown>).SpeechRecognition;
    if (!SpeechRecognition || typeof SpeechRecognition !== "function") return;
    setListening(true);
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const rec = new (SpeechRecognition as any)();
      rec.lang = "en-US";
      rec.onresult = (e: { results: ArrayLike<ArrayLike<{ transcript: string }>> }) => {
        const transcript = e.results[0][0].transcript;
        setQuery(transcript);
        submit(transcript);
      };
      rec.onend = () => setListening(false);
      rec.onerror = () => setListening(false);
      rec.start();
    } catch {
      setListening(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[70]" role="dialog" aria-modal="true" aria-label="Search">
      <div className="absolute inset-0 bg-background/92 backdrop-blur-md" onClick={onClose} />

      <div className="relative mx-auto mt-[9vh] w-full max-w-2xl px-4">
        <div className="arena-card-premium border border-border-strong shadow-pop animate-scale-in">
          <div className="flex items-center gap-3 px-4 py-3">
            <Search className="h-5 w-5 shrink-0 text-muted" />
            <input
              ref={inputRef}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && submit(query)}
              placeholder="Search players, teams, leagues, matches…"
              className="h-10 flex-1 bg-transparent text-base text-foreground outline-none placeholder:text-muted"
            />
            <button
              onClick={startVoice}
              className={`p-1 transition-colors ${
                listening ? "animate-pulse text-secondary" : "text-muted hover:text-secondary"
              }`}
              title="Voice search"
            >
              <Mic className="h-4 w-4" />
            </button>
            {query && (
              <button
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="text-muted transition-colors hover:text-foreground"
                aria-label="Clear search"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button
              onClick={() => submit(query)}
              className="flex h-9 items-center gap-2 bg-primary px-4 text-sm font-bold text-navy transition-colors hover:bg-primary-hover rounded-md"
              aria-label="Submit search"
            >
              Search <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <div className="border-t border-border-navy px-4 py-4">
            {query ? (
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm text-muted">
                  Search for <span className="font-semibold text-foreground">&quot;{query}&quot;</span>
                </p>
                <button
                  onClick={() => submit(query)}
                  className="shrink-0 text-sm font-bold text-secondary transition-colors hover:text-secondary-hover"
                >
                  View all results →
                </button>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <p className="label mb-2 flex items-center gap-1.5 text-muted-strong">
                    <Clock className="h-3 w-3" /> Recent
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="border border-border bg-card-glass px-2.5 py-1 text-xs text-muted-strong transition-colors hover:bg-blue/40 hover:text-foreground rounded-full"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="label mb-2 flex items-center gap-1.5 text-muted-strong">
                    <TrendingUp className="h-3 w-3" /> Trending
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {trendingSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="border border-border-strong bg-blue/40 px-2.5 py-1 text-xs text-muted-strong transition-colors hover:border-border-strong hover:text-foreground rounded-full"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div className="mt-4 border-t border-border-navy pt-3">
              <p className="label mb-2 text-muted-strong">Sports</p>
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                {orderedSports.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    onClick={onClose}
                    className="flex shrink-0 items-center gap-1.5 border border-border bg-card-glass px-2.5 py-1.5 text-xs font-semibold text-muted-strong transition-colors hover:bg-blue/40 hover:text-foreground rounded-full"
                  >
                    <span>{sportEmoji(s.id)}</span> {sportLabel(s.id, s.shortName)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
        <p className="mt-3 text-center text-xs text-muted">
          Press <kbd className="border border-border bg-card-glass px-1.5 py-0.5 rounded-sm">Esc</kbd> to close
        </p>
      </div>
    </div>
  );
}
