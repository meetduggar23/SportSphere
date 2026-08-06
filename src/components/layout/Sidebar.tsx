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
} from "lucide-react";
import { sidebarNavItems, followedTeams } from "@/data/mock";
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

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-60 border-r border-border bg-card h-[calc(100vh-64px)] sticky top-16 overflow-y-auto">
      <nav className="flex-1 p-3">
        <ul className="space-y-0.5">
          {sidebarNavItems.map((item) => {
            const Icon = iconMap[item.icon];
            const isActive = pathname === item.href;
            return (
              <li key={item.label}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4 shrink-0" />}
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

        <div className="mt-4">
          <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-3">
            Cricket
          </h3>
          <CricketNav />
        </div>
      </nav>

      <div className="p-3 border-t border-border">
        <h3 className="text-xs font-semibold text-muted uppercase tracking-wider mb-3 px-3">
          FOLLOWED TEAMS
        </h3>
        <ul className="space-y-0.5">
          {followedTeams.map((team) => (
            <li key={team.id}>
              <Link
                href={`/team/${team.id}`}
                className="flex items-center gap-3 px-3 py-2 text-sm rounded-lg hover:bg-muted/10 transition-colors group"
              >
                <TeamLogo logo={team.logo} name={team.name} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{team.name}</p>
                  <p className="text-xs text-muted">{team.sport}</p>
                </div>
                <ChevronRight className="h-4 w-4 text-muted group-hover:text-foreground transition-colors" />
              </Link>
            </li>
          ))}
        </ul>
        <Link
          href="/my-teams"
          className="mt-3 block w-full text-center text-sm font-medium text-primary hover:bg-primary/10 px-3 py-2 rounded-lg transition-colors"
        >
          Manage Teams
        </Link>
      </div>
    </aside>
  );
}
