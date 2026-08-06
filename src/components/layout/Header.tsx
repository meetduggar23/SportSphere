"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, User, Menu, X, Moon, Sun, ChevronDown, ChevronRight } from "lucide-react";
import { navItems } from "@/data/mock";
import { sportsConfig } from "@/config/sports";
import { allSportsSidebarOrder } from "@/config/sidebar";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { usePathname } from "next/navigation";

const orderedSports = allSportsSidebarOrder
  .map((id) => sportsConfig.find((s) => s.id === id))
  .filter((s): s is (typeof sportsConfig)[number] => Boolean(s));

const sportLabel = (id: string, shortName: string) =>
  id === "formula-1" ? "Formula 1" : shortName;

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [sportsClosing, setSportsClosing] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const sportsRef = useRef<HTMLDivElement>(null);
  const sportsTimeout = useRef<number | null>(null);

  const closeSports = () => {
    setSportsClosing(true);
    sportsTimeout.current = window.setTimeout(() => {
      setSportsOpen(false);
      setSportsClosing(false);
    }, 200);
  };

  const toggleSports = () => {
    if (sportsOpen) {
      closeSports();
    } else {
      if (sportsTimeout.current) window.clearTimeout(sportsTimeout.current);
      setSportsClosing(false);
      setSportsOpen(true);
    }
  };

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sportsRef.current && !sportsRef.current.contains(e.target as Node)) {
        closeSports();
      }
    };
    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
      if (sportsTimeout.current) window.clearTimeout(sportsTimeout.current);
    };
  }, []);

  const navLink = (active: boolean) =>
    cn(
      "relative flex h-9 items-center text-sm font-medium whitespace-nowrap transition-colors duration-200",
      "after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:rounded-full after:bg-primary",
      "after:origin-left after:scale-x-0 after:transition-transform after:duration-300 after:ease-out",
      active ? "text-foreground after:scale-x-100" : "text-muted hover:text-foreground hover:after:scale-x-100"
    );

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-6 px-4 lg:px-6 2xl:gap-8">
        <Logo className="mr-1 shrink-0" />

        <nav className="hidden min-w-0 flex-1 items-center gap-6 2xl:gap-8 overflow-hidden lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLink(pathname === item.href)}>
              {item.label}
            </Link>
          ))}

          <div ref={sportsRef} className="relative">
            <button
              onClick={toggleSports}
              aria-expanded={sportsOpen}
              className={cn(navLink(sportsOpen), "flex items-center gap-1.5")}
            >
              All Sports
              <ChevronDown
                className={cn("h-3.5 w-3.5 transition-transform duration-300", sportsOpen && "rotate-180")}
              />
            </button>

            {sportsOpen && (
              <div
                className={cn(
                  "absolute left-0 top-full z-50 mt-3 w-[24rem] origin-top rounded-2xl border border-border bg-card p-2 shadow-pop",
                  "animate-slide-up transition-all duration-200 ease-out",
                  "xl:w-[32rem] 2xl:w-[42rem]",
                  sportsClosing && "pointer-events-none scale-95 opacity-0"
                )}
              >
                <div className="grid grid-cols-2 gap-1 xl:grid-cols-3 2xl:grid-cols-4">
                  {orderedSports.map((sport) => {
                    const Icon = sportIcons[sport.id];
                    const href = sport.href;
                    const isActive = pathname === href;
                    return (
                      <Link
                        key={sport.id}
                        href={href}
                        onClick={closeSports}
                        className={cn(
                          "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                          isActive
                            ? "bg-primary/10 text-primary"
                            : "text-muted hover:bg-muted/10 hover:text-foreground"
                        )}
                      >
                        {Icon && <Icon className="h-4 w-4 shrink-0" />}
                        <span className="truncate">{sportLabel(sport.id, sport.shortName)}</span>
                      </Link>
                    );
                  })}
                </div>
                <Link
                  href="/sports"
                  onClick={closeSports}
                  className="mt-1 flex items-center justify-between rounded-lg border-t border-border px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                >
                  Browse All Sports <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            )}
          </div>
        </nav>

        <div className="flex-1 lg:hidden" />

        <div className="flex items-center gap-1.5">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            onClick={toggleTheme}
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-muted/10 hover:text-foreground"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? (
              <Sun className="h-[18px] w-[18px] transition-transform duration-300 hover:rotate-45" />
            ) : (
              <Moon className="h-[18px] w-[18px] transition-transform duration-300 hover:scale-110" />
            )}
          </button>

          <button
            className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-muted/10 hover:text-foreground"
            title="Notifications"
          >
            <Bell className="h-[18px] w-[18px]" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-primary ring-2 ring-background" />
          </button>

          <Link
            href="/profile"
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-muted/10 hover:text-foreground"
            title="Profile"
          >
            <User className="h-[18px] w-[18px]" />
          </Link>

          <button
            className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-all duration-200 hover:bg-muted/10 hover:text-foreground lg:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            title="Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="mx-4 mt-3 animate-slide-up rounded-2xl border border-border bg-card p-3 shadow-pop lg:hidden">
          <div className="mb-2 md:hidden">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:bg-muted/10 hover:text-foreground"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/sports"
              className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted transition-colors duration-200 hover:bg-muted/10 hover:text-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Sports
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
