"use client";

import { cn } from "@/lib/utils";

interface SportTabsProps {
  tabs: { label: string; value: string; count?: number }[];
  active: string;
  onChange: (value: string) => void;
  className?: string;
}

export function SportTabs({ tabs, active, onChange, className }: SportTabsProps) {
  return (
    <div
      className={cn("no-scrollbar flex items-center gap-1 overflow-x-auto", className)}
      role="tablist"
    >
      {tabs.map((tab) => {
        const isActive = active === tab.value;
        return (
          <button
            key={tab.value}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.value)}
            className={cn(
              "relative flex shrink-0 items-center whitespace-nowrap px-3 py-2 text-sm font-semibold transition-colors duration-200",
              isActive
                ? "text-foreground"
                : "text-muted hover:bg-blue/20 hover:text-foreground rounded-sm"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-1.5 text-[10px] font-bold tabular-nums",
                  isActive ? "text-secondary" : "text-muted"
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute inset-x-2 bottom-0 h-0.5 bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
