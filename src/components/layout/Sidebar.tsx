"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Zap,
  Star,
  Users,
  Calendar,
  Trophy,
  Newspaper,
  ArrowLeftRight,
  Video,
  Sparkles,
  Settings,
  ChevronRight,
  Flame,
} from "lucide-react";
import { sidebarNavItems, followedTeams } from "@/data/mock";
import { sportsConfig } from "@/config/sports";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import { cn } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/TeamLogo";
import { CricketNav } from "@/components/layout/CricketNav";

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  overview: LayoutDashboard,
  live: Zap,
  favorites: Star,
  teams: Users,
  calendar: Calendar,
  standings: Trophy,
  news: Newspaper,
  transfers: ArrowLeftRight,
  videos: Video,
  ai: Sparkles,
  settings: Settings,
};

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="px-3 pt-5 pb-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-muted/70">
      {children}
    </h3>
  );
}

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card/40 backdrop-blur-xl h-[calc(100vh-76px)] sticky top-[76px] overflow-y-auto no-scrollbar">
      <nav className="flex-1 px-3 pb-4">
        <SectionLabel>Menu</SectionLabel>
        <ul className="space-y-0.5">
          {sidebarNavItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "group relative flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-xl transition-all duration-200",
                    isActive
                      ? "text-primary bg-primary/10"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                >
                  {isActive && (
                    <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-1 rounded-full bg-primary" />
                  )}
                  {Icon && (
                    <Icon
                      className={cn(
                        "h-4 w-4 shrink-0 transition-transform duration-200",
                        !isActive && "group-hover:scale-110"
                      )}
                    />
                  )}
                  <span className="truncate">{item.label}</span>
                  {item.badge && (
                    <span className="ml-auto text-[10px] font-bold bg-primary text-white px-1.5 py-0.5 rounded-full shrink-0">
                      {item.badge}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        <SectionLabel>
          <span className="flex items-center gap-1.5">
            <Flame className="h-3 w-3 text-primary" /> Cricket
          </span>
        </SectionLabel>
        <CricketNav />

        <SectionLabel>More Sports</SectionLabel>
        <ul className="space-y-0.5">
          {sportsConfig
            .filter((s) => s.id !== "cricket")
            .map((sport) => {
              const Icon = sportIcons[sport.id];
              const isActive = pathname === sport.href;
              return (
                <li key={sport.id}>
                  <Link
                    href={sport.href}
                    className={cn(
                      "group flex items-center gap-3 px-3 py-2 text-sm rounded-xl transition-all duration-200",
                      isActive
                        ? "text-primary bg-primary/10 font-medium"
                        : "text-muted hover:text-foreground hover:bg-muted/10"
                    )}
                  >
                    {Icon && (
                      <Icon
                        className={cn(
                          "h-4 w-4 shrink-0 transition-transform duration-200",
                          !isActive && "group-hover:scale-110"
                        )}
                      />
                    )}
                    <span className="truncate">{sport.shortName}</span>
                  </Link>
                </li>
              );
            })}
        </ul>

        <SectionLabel>Followed Teams</SectionLabel>
        <ul className="space-y-0.5">
          {followedTeams.map((team) => (
            <li key={team.id}>
              <Link
                href={`/team/${team.id}`}
                className="group flex items-center gap-3 px-3 py-2 text-sm rounded-xl hover:bg-muted/10 transition-colors"
              >
                <TeamLogo logo={team.logo} name={team.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{team.name}</p>
                  <p className="text-xs text-muted">{team.sport}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/my-teams"
          className="mt-2 block w-full text-center text-sm font-medium text-primary hover:bg-primary/10 px-3 py-2 rounded-xl transition-colors"
        >
          Manage Teams
        </Link>
      </nav>
    </aside>
  );
}
