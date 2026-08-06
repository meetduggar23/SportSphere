"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { CricketIcon } from "@/components/ui/icons/SportIcons";
import { cricketNavItems } from "@/data/mock";
import type { SidebarGroupItem } from "@/types";

interface CricketNavProps {
  items?: SidebarGroupItem[];
}

export function CricketNav({ items = cricketNavItems }: CricketNavProps) {
  const pathname = usePathname();
  const [openSection, setOpenSection] = useState<string | null>(null);

  const toggleSection = (label: string) =>
    setOpenSection((current) => (current === label ? null : label));

  return (
    <ul className="space-y-1">
      <li>
        <Link
          href="/cricket"
          className={cn(
            "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
            pathname === "/cricket"
              ? "font-medium text-foreground"
              : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
          )}
        >
          {pathname === "/cricket" && (
            <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
          )}
          <CricketIcon className="h-[18px] w-[18px] shrink-0" />
          <span className="truncate">Cricket</span>
        </Link>
      </li>
      {items.map((section) => {
        const isOpen = openSection === section.label;
        const hasActiveChild = section.children.some(
          (child) => pathname === child.href
        );
        return (
          <li key={section.label}>
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => toggleSection(section.label)}
              className={cn(
                "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors duration-200",
                isOpen
                  ? "text-foreground"
                  : hasActiveChild
                    ? "font-medium text-primary"
                    : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
              )}
            >
              <span className="truncate">{section.label}</span>
              <ChevronRight
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                  isOpen && "rotate-90"
                )}
              />
            </button>
            <div
              className={cn(
                "grid transition-all duration-300 ease-in-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <ul className="space-y-0.5 pb-1 pt-0.5">
                  {section.children.map((child) => {
                    const isActive = pathname === child.href;
                    return (
                      <li key={child.label}>
                        <Link
                          href={child.href}
                          className={cn(
                            "relative flex items-center gap-2 rounded-lg py-2 pl-10 pr-3 text-sm transition-colors duration-200",
                            isActive
                              ? "font-medium text-primary"
                              : "text-muted hover:bg-muted/[0.06] hover:text-foreground"
                          )}
                        >
                          {isActive && (
                            <span className="absolute left-6 top-1/2 h-3 w-[3px] -translate-y-1/2 rounded-full bg-primary" />
                          )}
                          <span className="truncate">{child.label}</span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
