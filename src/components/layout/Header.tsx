"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, User, Menu, X, Moon, Sun, ChevronDown } from "lucide-react";
import { navItems } from "@/data/mock";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { SportsDropdown, orderedSports, sportLabel } from "@/components/layout/SportsDropdown";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSportsOpen, setMobileSportsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

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

        <nav className="hidden min-w-0 flex-1 items-center gap-6 2xl:gap-8 lg:flex">
          {navItems.map((item) => (
            <Link key={item.label} href={item.href} className={navLink(pathname === item.href)}>
              {item.label}
            </Link>
          ))}

          <SportsDropdown triggerClassName={navLink(false)} />
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

            <div className="mt-1 border-t border-border pt-1">
              <button
                type="button"
                aria-expanded={mobileSportsOpen}
                onClick={() => setMobileSportsOpen((o) => !o)}
                className={cn(
                  "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                  mobileSportsOpen
                    ? "text-foreground"
                    : "text-muted hover:bg-muted/10 hover:text-foreground"
                )}
              >
                All Sports
                <ChevronDown
                  className={cn("h-4 w-4 transition-transform duration-300", mobileSportsOpen && "rotate-180")}
                />
              </button>
              <div
                className={cn(
                  "grid transition-all duration-300 ease-in-out",
                  mobileSportsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                )}
              >
                <div className="overflow-hidden">
                  <div className="grid grid-cols-2 gap-1 pt-1">
                    {orderedSports.map((sport) => {
                      const Icon = sportIcons[sport.id];
                      const isActive = pathname === sport.href;
                      return (
                        <Link
                          key={sport.id}
                          href={sport.href}
                          className={cn(
                            "flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors duration-200",
                            isActive
                              ? "bg-primary/10 text-primary"
                              : "text-muted hover:bg-muted/10 hover:text-foreground"
                          )}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {Icon && <Icon className="h-4 w-4 shrink-0" />}
                          <span className="truncate">{sportLabel(sport.id, sport.shortName)}</span>
                        </Link>
                      );
                    })}
                  </div>
                  <Link
                    href="/sports"
                    className="mt-1 flex items-center justify-between rounded-lg border-t border-border px-3 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary/10"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Browse All Sports
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
