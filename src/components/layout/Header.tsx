"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Bell, User, Menu, X, Moon, Sun, ChevronDown, ChevronRight } from "lucide-react";
import { navItems } from "@/data/mock";
import { sportsConfig } from "@/config/sports";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const sportsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (sportsRef.current && !sportsRef.current.contains(e.target as Node)) {
        setSportsOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="mx-auto max-w-[1440px] px-4 lg:px-6 pt-3">
        <div className="flex h-14 items-center gap-3 rounded-2xl border border-border bg-card/85 backdrop-blur-xl supports-[backdrop-filter]:bg-card/70 px-3 md:px-4 shadow-card">
          <Logo className="mr-1 md:mr-3" />

          <nav className="hidden lg:flex items-center gap-1 flex-1 overflow-hidden">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "relative px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap",
                    isActive
                      ? "text-foreground bg-primary/10"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                >
                  {item.label}
                </Link>
              );
            })}

            <div ref={sportsRef} className="relative">
              <button
                onClick={() => setSportsOpen((o) => !o)}
                aria-expanded={sportsOpen}
                className={cn(
                  "flex items-center gap-1 px-3 py-2 text-sm font-medium rounded-xl transition-all duration-200 whitespace-nowrap",
                  sportsOpen ? "text-foreground bg-muted/10" : "text-muted hover:text-foreground hover:bg-muted/10"
                )}
              >
                More Sports
                <ChevronDown
                  className={cn("h-3.5 w-3.5 transition-transform duration-200", sportsOpen && "rotate-180")}
                />
              </button>

              {sportsOpen && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-2xl border border-border bg-card p-2 shadow-pop animate-slide-up z-50">
                  <div className="grid grid-cols-2 gap-1">
                    {sportsConfig.map((sport) => {
                      const Icon = sportIcons[sport.id];
                      const href = sport.href;
                      const isActive = pathname === href;
                      return (
                        <Link
                          key={sport.id}
                          href={href}
                          onClick={() => setSportsOpen(false)}
                          className={cn(
                            "flex items-center gap-2.5 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                            isActive
                              ? "text-primary bg-primary/10"
                              : "text-muted hover:text-foreground hover:bg-muted/10"
                          )}
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" />}
                          <span className="truncate">{sport.shortName}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/sports"
                    onClick={() => setSportsOpen(false)}
                    className="mt-1 flex items-center justify-between px-3 py-2.5 text-sm font-semibold text-primary rounded-xl hover:bg-primary/10 transition-colors border-t border-border"
                  >
                    Browse All Sports <ChevronRight className="h-4 w-4" />
                  </Link>
                </div>
              )}
            </div>
          </nav>

          <div className="flex-1 lg:hidden" />

          <div className="flex items-center gap-1 md:gap-1.5">
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-muted/10 transition-colors"
              title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {theme === "dark" ? <Sun className="h-5 w-5 text-muted" /> : <Moon className="h-5 w-5 text-muted" />}
            </button>

            <button
              className="relative p-2.5 rounded-xl hover:bg-muted/10 transition-colors"
              title="Notifications"
            >
              <Bell className="h-5 w-5 text-muted" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-primary rounded-full ring-2 ring-card" />
            </button>

            <Link
              href="/profile"
              className="p-2.5 rounded-xl hover:bg-muted/10 transition-colors"
              title="Profile"
            >
              <User className="h-5 w-5 text-muted" />
            </Link>

            <button
              className="lg:hidden p-2.5 rounded-xl hover:bg-muted/10 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-5 w-5 text-muted" /> : <Menu className="h-5 w-5 text-muted" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden mx-4 mt-2 rounded-2xl border border-border bg-card p-4 shadow-pop animate-slide-up">
          <div className="md:hidden mb-3">
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
                    "px-3 py-2.5 text-sm font-medium rounded-xl transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/sports"
              className="px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-xl hover:bg-muted/10"
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
