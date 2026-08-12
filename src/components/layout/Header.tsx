"use client";

import { useCallback, useRef, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  ChevronRight,
  Home,
  Radio,
  Newspaper,
  Trophy,
  Wand2,
  Sparkles,
  Search,
  Sun,
  Moon,
} from "lucide-react";
import { useTheme } from "@/providers/ThemeProvider";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { SearchOverlay } from "@/components/layout/SearchOverlay";
import { orderedSports, sportLabel } from "@/config/sports";
import { cn } from "@/lib/utils";

const primaryNav = [
  { label: "Home", href: "/", icon: Home },
  { label: "Live", href: "/live", icon: Radio },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Standings", href: "/standings", icon: Trophy },
  { label: "Fantasy", href: "/fantasy", icon: Wand2 },
  { label: "AI Insights", href: "/ai-insights", icon: Sparkles },
];

const quickLinks = [
  { label: "Favorites", href: "/favorites" },
  { label: "My Teams", href: "/my-teams" },
  { label: "Calendar", href: "/calendar" },
  { label: "Settings", href: "/settings" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const searchBtnRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  // Client-only flag (no effect): server & first hydration render both show
  // the placeholder, then the correct Sun/Moon icon appears — zero mismatch.
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  // Stable callback so the overlay's effect doesn't re-subscribe on every
  // header render; returns focus to the search trigger on close.
  const closeSearch = useCallback(() => {
    setSearchOpen(false);
    searchBtnRef.current?.focus();
  }, []);

  return (
    <header className="sticky top-0 z-50">
      <div className="border-b border-border bg-background/92 backdrop-blur-xl">
        {/* Primary row — logo left, all 13 sports centered, controls right */}
        <div className="relative mx-auto flex h-14 max-w-[1440px] items-center gap-3 px-4 lg:px-6">
          {/* Logo — left corner */}
          <Logo className="shrink-0" />

          {/* Sports nav — centered. The auto-margin trick (first-child ml-auto /
              last-child mr-auto) keeps the row centered when it fits and lets it
              scroll from both edges when it overflows. */}
          <nav className="no-scrollbar mx-auto flex h-full min-w-0 flex-1 items-center overflow-x-auto [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
            {orderedSports.map((sport) => {
              const active =
                pathname === sport.href || pathname.startsWith(`${sport.href}/`);
              return (
                <Link
                  key={sport.id}
                  href={sport.href}
                  className={cn(
                    "relative flex h-full shrink-0 items-center px-2.5 text-[13px] font-semibold transition-colors lg:px-3",
                    active
                      ? "text-foreground"
                      : "text-foreground/75 hover:bg-blue/40 hover:text-foreground"
                  )}
                >
                  {sportLabel(sport.id, sport.shortName)}
                  {active && (
                    <span className="absolute inset-x-2.5 bottom-0 h-0.5 bg-primary lg:inset-x-3" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Controls — theme + menu + search pinned to the right corner */}
          <div className="flex shrink-0 items-center gap-1.5">
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center text-foreground/75 transition-colors hover:bg-blue/40 hover:text-foreground rounded-md"
              // The stored theme is client-only, so server HTML and the first
              // hydration render must show a stable label — the theme-specific
              // one appears only after mount (same guard as the icon below).
              aria-label={
                mounted
                  ? isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
              title={
                mounted
                  ? isDark
                    ? "Switch to light mode"
                    : "Switch to dark mode"
                  : "Toggle theme"
              }
            >
              {mounted ? (
                isDark ? (
                  <Moon key="moon" className="h-[18px] w-[18px] animate-theme-spin" />
                ) : (
                  <Sun key="sun" className="h-[18px] w-[18px] animate-theme-spin" />
                )
              ) : (
                <span className="h-[18px] w-[18px]" aria-hidden />
              )}
            </button>

            <button
              className="flex h-9 w-9 items-center justify-center text-foreground/75 transition-colors hover:bg-blue/40 hover:text-foreground rounded-md lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            <button
              ref={searchBtnRef}
              onClick={() => setSearchOpen(true)}
              className="flex h-9 w-9 items-center justify-center text-foreground/75 transition-colors hover:bg-blue/40 hover:text-foreground rounded-md"
              aria-label="Search"
              title="Search players, teams, leagues"
            >
              <Search className="h-[18px] w-[18px]" />
            </button>
          </div>
        </div>

        {/* Secondary strip — primary pages (Home, Live, News...), centered */}
        <div className="border-t border-border bg-background/55">
          <div className="mx-auto flex max-w-[1440px] items-center px-1.5 lg:px-4">
            <div className="no-scrollbar flex flex-1 items-center gap-0.5 overflow-x-auto [&>*:first-child]:ml-auto [&>*:last-child]:mr-auto">
              {primaryNav.map((item) => {
                const active =
                  pathname === item.href ||
                  (item.href === "/live" && pathname.startsWith("/match"));
                const Icon = item.icon;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "relative flex h-9 shrink-0 items-center gap-1.5 px-3 text-[13px] font-semibold transition-colors",
                      active
                        ? "text-secondary"
                        : "text-muted hover:bg-blue/40 hover:text-foreground"
                    )}
                  >
                    <Icon
                      className={cn("h-4 w-4", active ? "text-secondary" : "text-foreground/60")}
                      strokeWidth={active ? 2.4 : 2}
                    />
                    {item.label}
                    {active && (
                      <span className="absolute inset-x-3 bottom-0 h-0.5 bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Premium search overlay — mounted only while open */}
      {searchOpen && <SearchOverlay onClose={closeSearch} />}

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="border-b border-border-navy glass-strong shadow-pop lg:hidden">
          <div className="mx-auto max-w-md space-y-4 p-4">
            <SearchBar />
            <nav className="grid grid-cols-2 gap-2">
              {primaryNav.map((item) => {
                const Icon = item.icon;
                const active = pathname === item.href;
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center gap-2.5 border px-4 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "border-border-strong bg-blue/40 text-foreground"
                        : "border-border bg-card-glass text-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active && "text-secondary")} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>

            <div>
              <p className="label mb-2 text-muted-strong">Sports</p>
              <div className="no-scrollbar flex gap-1.5 overflow-x-auto pb-1">
                {orderedSports.map((sport) => {
                  const active = pathname === sport.href;
                  return (
                    <Link
                      key={sport.id}
                      href={sport.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex shrink-0 items-center border px-3 py-2 text-xs font-semibold transition-colors",
                        active
                          ? "border-border-strong bg-blue/40 text-secondary"
                          : "border-border bg-card-glass text-muted hover:text-foreground"
                      )}
                    >
                      {sportLabel(sport.id, sport.shortName)}
                    </Link>
                  );
                })}
              </div>
            </div>

            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between border border-border bg-card-glass px-4 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
              >
                {l.label}
                <ChevronRight className="h-4 w-4 text-faint" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
