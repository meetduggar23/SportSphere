"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
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

const navGroups: { label: string; ids: string[] }[] = [
  { label: "Menu", ids: ["overview", "live", "favorites", "teams", "calendar"] },
  { label: "Explore", ids: ["standings", "news", "transfers", "videos", "ai"] },
];

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/60">
      {children}
    </h3>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(false);
  const isSportActive = sportsConfig.some((s) => pathname === s.href);

  useEffect(() => {
    if (isSportActive) setMoreOpen(true);
  }, [isSportActive]);

  const settingsItem = sidebarNavItems.find((i) => i.icon === "settings");
  const SettingsIcon = settingsItem ? iconMap[settingsItem.icon] : null;
  const settingsActive = settingsItem ? pathname === settingsItem.href : false;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-[264px] shrink-0 flex-col overflow-y-auto border-r border-border no-scrollbar lg:flex">
      <nav className="flex-1 px-3 pb-6">
        {navGroups.map((group) => (
          <div key={group.label}>
            <SectionLabel>{group.label}</SectionLabel>
            <ul className="space-y-1">
              {sidebarNavItems
                .filter((item) => group.ids.includes(item.icon))
                .map((item) => {
                  const Icon = iconMap[item.icon];
                  const isActive = pathname === item.href;
                  return (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
                          isActive
                            ? "font-medium text-foreground"
                            : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                        )}
                        {Icon && (
                          <Icon
                            className={cn(
                              "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                              !isActive && "group-hover:scale-105"
                            )}
                          />
                        )}
                        <span className="truncate">{item.label}</span>
                        {item.badge && (
                          <span className="ml-auto shrink-0 rounded-full bg-primary/10 px-1.5 py-0.5 text-[10px] font-bold text-primary">
                            {item.badge}
                          </span>
                        )}
                      </Link>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}

        <SectionLabel>Cricket</SectionLabel>
        <CricketNav />

        <SectionLabel>More Sports</SectionLabel>
        <div>
          <button
            type="button"
            aria-expanded={moreOpen}
            onClick={() => setMoreOpen((o) => !o)}
            className={cn(
              "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
              moreOpen || isSportActive
                ? "text-foreground"
                : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
            )}
          >
            <span className="truncate">All Sports</span>
            <ChevronRight
              className={cn(
                "ml-auto h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                moreOpen && "rotate-90"
              )}
            />
          </button>
          <div
            className={cn(
              "grid transition-all duration-300 ease-in-out",
              moreOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
            )}
          >
            <div className="overflow-hidden">
              <ul className="space-y-0.5 pb-1 pt-1">
                {sportsConfig.map((sport) => {
                  const Icon = sportIcons[sport.id];
                  const isActive = pathname === sport.href;
                  return (
                    <li key={sport.id}>
                      <Link
                        href={sport.href}
                        className={cn(
                          "group relative flex items-center gap-3 rounded-lg py-2 pl-6 pr-3 text-sm transition-colors duration-200",
                          isActive
                            ? "font-medium text-primary"
                            : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
                        )}
                      >
                        {isActive && (
                          <span className="absolute left-2.5 top-1/2 h-3 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                        )}
                        {Icon && (
                          <Icon
                            className={cn(
                              "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                              !isActive && "group-hover:scale-105"
                            )}
                          />
                        )}
                        <span className="truncate">{sport.shortName}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <SectionLabel>Followed Teams</SectionLabel>
        <ul className="space-y-1">
          {followedTeams.map((team) => (
            <li key={team.id}>
              <Link
                href={`/team/${team.id}`}
                className="group flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-muted/[0.06]"
              >
                <TeamLogo logo={team.logo} name={team.name} size="xs" />
                <span className="flex-1 truncate font-medium">{team.name}</span>
                <ChevronRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/my-teams"
          className="mt-2 block rounded-lg px-3 py-2 text-center text-xs font-medium text-muted transition-colors duration-200 hover:text-primary"
        >
          Manage Teams
        </Link>

        {settingsItem && SettingsIcon && (
          <div className="mt-4 border-t border-border pt-3">
            <Link
              href={settingsItem.href}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
                settingsActive
                  ? "font-medium text-foreground"
                  : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
              )}
            >
              {settingsActive && (
                <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
              )}
              <SettingsIcon
                className={cn(
                  "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
                  !settingsActive && "group-hover:scale-105"
                )}
              />
              <span className="truncate">{settingsItem.label}</span>
            </Link>
          </div>
        )}
      </nav>
    </aside>
  );
}
