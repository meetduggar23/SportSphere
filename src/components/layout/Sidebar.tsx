"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { sportsConfig } from "@/config/sports";
import { sportIcons } from "@/components/ui/icons/SportIcons";
import {
  homeSidebar,
  sportSidebars,
  sidebarIcons,
  type SidebarItem,
} from "@/config/sidebar";
import { followedTeams, allMatches } from "@/data/mock";
import { cn } from "@/lib/utils";
import { TeamLogo } from "@/components/ui/TeamLogo";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="flex items-center gap-1.5 px-3 pb-2 pt-6 text-[10px] font-semibold uppercase tracking-[0.16em] text-muted/60">
      {children}
    </h3>
  );
}

function SidebarLink({ item, active }: { item: SidebarItem; active: boolean }) {
  const Icon = sidebarIcons[item.icon];
  return (
    <Link
      href={item.href}
      className={cn(
        "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
        active
          ? "font-medium text-foreground"
          : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
      )}
    >
      {active && (
        <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
      )}
      {Icon && (
        <Icon
          className={cn(
            "h-[18px] w-[18px] shrink-0 transition-transform duration-200",
            !active && "group-hover:scale-105"
          )}
        />
      )}
      <span className="truncate">{item.label}</span>
    </Link>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const sport = sportsConfig.find((s) => pathname === s.href);
  const section = sport ? sportSidebars[sport.id] : null;
  const SportIcon = sport ? sportIcons[sport.id] : null;

  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-64px)] w-[264px] shrink-0 flex-col overflow-y-auto border-r border-border no-scrollbar lg:flex">
      <nav className="flex-1 px-3 pb-6">
        {section ? (
          <>
            <SectionLabel>
              {SportIcon && <SportIcon className="h-3.5 w-3.5" />}
              {section.label}
            </SectionLabel>
            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.label}>
                  <SidebarLink item={item} active={pathname === item.href} />
                </li>
              ))}
            </ul>
          </>
        ) : (
          <>
            <SectionLabel>{homeSidebar.label}</SectionLabel>
            <ul className="space-y-1">
              {homeSidebar.items.map((item) => (
                <li key={item.label}>
                  <SidebarLink item={item} active={pathname === item.href} />
                </li>
              ))}
            </ul>

            <SectionLabel>Recently Viewed</SectionLabel>
            <ul className="space-y-1">
              {followedTeams.slice(0, 4).map((team) => (
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

            <SectionLabel>Saved Matches</SectionLabel>
            <ul className="space-y-1">
              {allMatches.slice(0, 3).map((match) => (
                <li key={match.id}>
                  <Link
                    href={`/match/${match.id}`}
                    className="group flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-colors duration-200 hover:bg-muted/[0.06]"
                  >
                    <TeamLogo logo={match.homeTeam.logo} name={match.homeTeam.name} size="xs" />
                    <span className="min-w-0 flex-1 truncate">
                      <span className="font-medium">{match.homeTeam.shortName}</span>
                      <span className="text-muted"> vs </span>
                      <span className="font-medium">{match.awayTeam.shortName}</span>
                    </span>
                    <ChevronRight className="h-4 w-4 -translate-x-1 text-muted opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </nav>
    </aside>
  );
}
