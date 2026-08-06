"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, ChevronDown, ChevronRight } from "lucide-react";
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
  align?: "left" | "right";
}

export function SportsDropdown({
  triggerClassName,
  align = "left",
}: SportsDropdownProps) {
  const [open, setOpen] = useState(false);
  const [closing, setClosing] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<Array<HTMLAnchorElement | null>>([]);
  const closeTimer = useRef<number | null>(null);
  const pathname = usePathname();
  const menuId = useId();

  const activeIndex = orderedSports.findIndex((s) => pathname === s.href);
  const itemCount = orderedSports.length + 1;

  const close = useCallback((restoreFocus = false) => {
    setClosing(true);
    closeTimer.current = window.setTimeout(() => {
      setOpen(false);
      setClosing(false);
      setFocusedIndex(-1);
      if (restoreFocus) buttonRef.current?.focus();
    }, 180);
  }, []);

  const openMenu = useCallback(() => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setClosing(false);
    setFocusedIndex(activeIndex >= 0 ? activeIndex : 0);
    setOpen(true);
  }, [activeIndex]);

  useEffect(() => {
    if (open && focusedIndex >= 0) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [open, focusedIndex]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: PointerEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        close();
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, [open, close]);

  useEffect(() => {
    return () => {
      if (closeTimer.current) window.clearTimeout(closeTimer.current);
    };
  }, []);

  const moveFocus = (delta: number) => {
    setFocusedIndex((i) => (i < 0 ? 0 : (i + delta + itemCount) % itemCount));
  };

  const handleButtonKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowUp":
        e.preventDefault();
        if (!open) openMenu();
        else moveFocus(e.key === "ArrowDown" ? 1 : -1);
        break;
      case "Enter":
      case " ":
        e.preventDefault();
        if (open) close(true);
        else openMenu();
        break;
      case "Escape":
        if (open) close(true);
        break;
    }
  };

  const handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    switch (e.key) {
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        moveFocus(1);
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        moveFocus(-1);
        break;
      case "Home":
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case "End":
        e.preventDefault();
        setFocusedIndex(itemCount - 1);
        break;
      case "Escape":
        e.preventDefault();
        close(true);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        ref={buttonRef}
        type="button"
        onClick={() => (open ? close(true) : openMenu())}
        onKeyDown={handleButtonKeyDown}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={menuId}
        className={cn("flex items-center gap-1.5", triggerClassName)}
      >
        All Sports
        <ChevronDown
          className={cn("h-3.5 w-3.5 transition-transform duration-300", open && "rotate-180")}
        />
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="All Sports"
          onKeyDown={handleMenuKeyDown}
          className={cn(
            "absolute top-full z-50 mt-3 w-[24rem] origin-top rounded-2xl border border-border bg-card p-2 shadow-pop",
            "transition-all duration-200 ease-out xl:w-[32rem] 2xl:w-[42rem]",
            align === "right" ? "right-0" : "left-0",
            closing
              ? "pointer-events-none scale-95 opacity-0"
              : "animate-slide-up scale-100 opacity-100"
          )}
        >
          <div className="grid grid-cols-2 gap-1 xl:grid-cols-3 2xl:grid-cols-4">
            {orderedSports.map((sport, i) => {
              const Icon = sportIcons[sport.id];
              const isActive = pathname === sport.href;
              return (
                <Link
                  key={sport.id}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  href={sport.href}
                  role="menuitem"
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => close()}
                  className={cn(
                    "flex animate-fade-up items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-muted/10 hover:text-foreground"
                  )}
                  style={{ animationDelay: `${i * 18}ms` }}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
                  <span className="truncate">{sportLabel(sport.id, sport.shortName)}</span>
                  {isActive && <Check className="ml-auto h-4 w-4 shrink-0 text-primary" />}
                </Link>
              );
            })}
          </div>
          <Link
            ref={(el) => {
              itemRefs.current[orderedSports.length] = el;
            }}
            href="/sports"
            role="menuitem"
            onClick={() => close()}
            className="mt-1 flex animate-fade-up items-center justify-between rounded-lg border-t border-border px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
            style={{ animationDelay: `${orderedSports.length * 18}ms` }}
          >
            Browse All Sports <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
      )}
    </div>
  );
}
