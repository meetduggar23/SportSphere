"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, ChevronRight, Globe, TrendingUp } from "lucide-react";
import { sportsConfig } from "@/config/sports";
import { allSportsSidebarOrder } from "@/config/sidebar";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import { cn } from "@/lib/utils";

export const orderedSports = allSportsSidebarOrder
  .map((id) => sportsConfig.find((s) => s.id === id))
  .filter((s): s is (typeof sportsConfig)[number] => Boolean(s));

export function sportLabel(id: string, shortName: string) {
  return id === "formula-1" ? "Formula 1" : shortName;
}

interface SportsDropdownProps {
  triggerClassName?: string;
}

export function SportsDropdown({ triggerClassName }: SportsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const menuId = useId();

  const close = useCallback(() => {
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 160);
  }, []);

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => (open ? close() : setOpen(true))}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={cn("group", triggerClassName)}
      >
        <Globe className="h-4 w-4" />
        All Sports
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")} />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="All Sports"
          className={cn(
            "absolute left-0 top-full z-50 mt-2 w-[min(92vw,48rem)] origin-top overflow-hidden rounded-3xl border border-border-strong glass-strong shadow-pop",
            "transition-all duration-200 ease-out",
            closing ? "pointer-events-none scale-95 opacity-0" : "animate-scale-in scale-100 opacity-100"
          )}
        >
          <div className="grid gap-1 p-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {orderedSports.map((sport, i) => {
              const Icon = sportIcons[sport.id];
              const isActive = pathname === sport.href;
              return (
                <Link
                  key={sport.id}
                  href={sport.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => close()}
className={cn(
                    "group/row flex animate-fade-up items-start gap-3 rounded-2xl border px-3.5 py-3 transition-all duration-200",
                    isActive
                      ? "border-border-strong bg-blue/40"
                      : "border-transparent hover:border-border-strong hover:bg-blue/30"
                  )}
                  style={{ animationDelay: `${i * 22}ms` }}
                >
                  <span
                    className={cn(
                      "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border transition-all duration-200 group-hover/row:scale-110",
                      isActive
                        ? "border-border-strong bg-secondary/10 text-secondary"
                        : "border-border-navy bg-navy/50 text-muted group-hover/row:border-border-strong group-hover/row:text-foreground"
                    )}
                  >
                    {Icon && <Icon className="h-5 w-5" />}
                  </span>
                  <span className="min-w-0">
                    <span className="flex items-center gap-1.5 text-sm font-bold text-foreground-soft">
                      {sportLabel(sport.id, sport.shortName)}
                      {isActive && <Check className="h-3.5 w-3.5 text-secondary" />}
                    </span>
                    <span className="meta mt-0.5 block truncate">{sport.description}</span>
                  </span>
                </Link>
              );
            })}
          </div>

<div className="flex items-center justify-between gap-3 border-t border-border-navy px-5 py-3">
            <Link
              href="/sports"
              role="menuitem"
              onClick={() => close()}
              className="flex items-center gap-2 text-sm font-bold text-muted-strong transition-colors hover:text-foreground"
            >
              Browse all sports
              <ChevronRight className="h-4 w-4" />
            </Link>
            <span className="flex items-center gap-1.5 meta">
              <TrendingUp className="h-3.5 w-3.5 text-secondary" />
              Live across 13 sports
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
