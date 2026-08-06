"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, Clock, TrendingUp, X, Mic } from "lucide-react";
import { recentSearches, trendingSearches } from "@/data/mock";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const submit = (q: string) => {
    if (!q.trim()) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const startVoiceSearch = () => {
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
    <div ref={containerRef} className="relative">
      <div className="flex h-9 items-center gap-2 rounded-full border border-border bg-background/60 px-3.5 backdrop-blur transition-all w-48 focus-within:border-primary/50 focus-within:ring-2 focus-within:ring-primary/15 lg:w-56 xl:w-60">
        <Search className="h-4 w-4 text-muted shrink-0" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={(e) => e.key === "Enter" && submit(query)}
          placeholder="Search players, teams..."
          className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted min-w-0"
        />
        {query && (
          <button onClick={() => setQuery("")} className="text-muted hover:text-foreground">
            <X className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={startVoiceSearch}
          className={`p-0.5 rounded-md transition-colors ${
            listening ? "text-primary animate-pulse" : "text-muted hover:text-primary"
          }`}
          title="Voice search"
        >
          <Mic className="h-4 w-4" />
        </button>
      </div>

      {open && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-2xl shadow-pop z-50 overflow-hidden animate-slide-up">
          {query ? (
            <div className="p-2">
              <p className="text-xs text-muted px-3 py-2 font-medium">Search for &quot;{query}&quot;</p>
              <button
                onClick={() => submit(query)}
                className="w-full text-left px-3 py-2 text-sm rounded-lg hover:bg-muted/10 transition-colors flex items-center gap-2"
              >
                <Search className="h-4 w-4 text-muted" />
                {query}
              </button>
            </div>
          ) : (
            <>
              {recentSearches.length > 0 && (
                <div className="p-3 border-b border-border">
                  <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Clock className="h-3 w-3" /> Recent
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {recentSearches.map((s) => (
                      <button
                        key={s}
                        onClick={() => submit(s)}
                        className="text-xs px-2.5 py-1 rounded-full bg-muted/10 hover:bg-muted/20 transition-colors"
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>
              )}
              <div className="p-3">
                <p className="text-xs font-semibold text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-3 w-3" /> Trending
                </p>
                <div className="flex flex-wrap gap-2">
                  {trendingSearches.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary hover:bg-primary/20 transition-colors"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
