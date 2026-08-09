"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, User, Menu, X, ChevronRight, Home, Radio, Newspaper, Trophy, Wand2, Sparkles } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { SportsDropdown } from "@/components/layout/SportsDropdown";
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
  const [profileOpen, setProfileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50">
{/* Utility rail */}
      <div className="border-b border-border-navy bg-navy/85 backdrop-blur-xl">
        <div className="mx-auto flex h-11 max-w-[1440px] items-center gap-3 px-4 lg:px-6">
          <div className="hidden items-center text-xs text-muted md:flex">
            <span className="relative mr-2 flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-berry" />
            </span>
            <span className="label text-muted-strong">Sports Desk</span>
            <span className="mx-2 text-faint">•</span>
            <span className="meta">14 events updating now</span>
          </div>

          <div className="ml-auto flex items-center gap-1.5">
            <div className="hidden md:block">
              <SearchBar />
            </div>

            <button
              className="relative flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-blue/40 hover:text-foreground"
              title="Notifications"
            >
              <Bell className="h-[18px] w-[18px]" />
              <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-berry ring-2 ring-navy" />
            </button>

            <div className="relative">
              <button
                onClick={() => setProfileOpen((o) => !o)}
                className="flex h-9 items-center gap-2 rounded-full pl-1 pr-2 text-muted transition-colors hover:bg-blue/40 hover:text-foreground"
                aria-expanded={profileOpen}
              >
<span className="flex h-7 w-7 items-center justify-center rounded-full bg-blue/60 text-xs font-bold text-muted-strong ring-1 ring-border-navy">
                  MD
                </span>
                <span className="hidden text-sm font-semibold lg:block">Meet</span>
                <ChevronRight className={cn("h-4 w-4 transition-transform", profileOpen && "rotate-90")} />
              </button>

              {profileOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 overflow-hidden rounded-2xl border border-border-navy glass-strong shadow-pop animate-scale-in">
                  <div className="border-b border-border-navy px-4 py-3">
                    <p className="text-sm font-bold text-foreground">Meet Duggar</p>
                    <p className="meta">meet@example.com</p>
                  </div>
                  <div className="p-1.5">
                    {quickLinks.map((l) => (
                      <Link
                        key={l.href}
                        href={l.href}
                        onClick={() => setProfileOpen(false)}
                        className="flex items-center justify-between rounded-xl px-3 py-2 text-sm text-muted transition-colors hover:bg-blue/40 hover:text-foreground"
                      >
                        {l.label}
                        <ChevronRight className="h-3.5 w-3.5 text-faint" />
                      </Link>
                    ))}
                    <Link
                      href="/profile"
                      onClick={() => setProfileOpen(false)}
                      className="mt-1 flex items-center gap-2 rounded-xl border-t border-border-navy px-3 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-blue/40"
                    >
                      <User className="h-4 w-4" /> View Profile
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <button
              className="flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:bg-blue/40 hover:text-foreground lg:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Primary nav strip */}
      <div className="border-b border-border-navy bg-navy/92 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-4 px-4 lg:px-6">
          <Logo className="mr-2 shrink-0" />

          <nav className="hidden flex-1 items-center gap-1 lg:flex">
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
                    "relative flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors",
                    active
                      ? "text-foreground"
                      : "text-muted hover:bg-blue/40 hover:text-foreground"
                  )}
                >
                  <Icon
                    className={cn("h-4 w-4", active ? "text-berry" : "text-muted")}
                    strokeWidth={active ? 2.4 : 2}
                  />
                  {item.label}
                  {active && (
                    <span className="absolute -bottom-0.5 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
                  )}
                </Link>
              );
            })}

            <SportsDropdown triggerClassName="flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold text-muted transition-colors hover:bg-blue/40 hover:text-foreground" />
          </nav>

          <div className="flex-1 lg:hidden" />

          <div className="hidden items-center gap-2 lg:flex">
            <Link
              href="/live"
className="flex items-center gap-2 rounded-full bg-live-gradient px-4 py-2 text-sm font-bold text-berry transition-transform hover:scale-[1.03]"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-berry animate-ping-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-berry" />
              </span>
              Watch Live
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-b border-border-navy glass-strong shadow-pop lg:hidden">
          <div className="mx-auto max-w-md space-y-4 p-4">
            <div className="md:hidden">
              <SearchBar />
            </div>
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
                      "flex items-center gap-2.5 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors",
                      active
                        ? "border-border-strong bg-blue/40 text-foreground"
                        : "border-border-navy bg-navy/40 text-muted hover:text-foreground"
                    )}
                  >
                    <Icon className={cn("h-4 w-4", active && "text-berry")} />
                    {item.label}
                  </Link>
                );
              })}
            </nav>
            {quickLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between rounded-2xl border border-border-navy bg-navy/40 px-4 py-3 text-sm font-semibold text-muted transition-colors hover:text-foreground"
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
