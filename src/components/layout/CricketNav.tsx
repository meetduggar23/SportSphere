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
    <ul className="space-y-0.5">
      <li>
        <Link
          href="/cricket"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
            pathname === "/cricket"
              ? "bg-primary/10 text-primary"
              : "text-muted hover:text-foreground hover:bg-muted/10"
          )}
        >
          <CricketIcon className="h-4 w-4 shrink-0" />
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
                "flex w-full items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                isOpen
                  ? "text-foreground bg-muted/10"
                  : hasActiveChild
                    ? "text-primary"
                    : "text-muted hover:text-foreground hover:bg-muted/10"
              )}
            >
              <span className="truncate">{section.label}</span>
              <ChevronRight
                className={cn(
                  "ml-auto h-4 w-4 shrink-0 text-muted transition-transform duration-300",
                  isOpen && "rotate-90 text-foreground"
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
                            "flex items-center gap-2 pl-10 pr-3 py-2 text-sm rounded-lg transition-colors",
                            isActive
                              ? "bg-primary/10 text-primary font-medium"
                              : "text-muted hover:text-foreground hover:bg-muted/10"
                          )}
                        >
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
