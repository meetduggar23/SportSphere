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
      className={cn(
        "flex gap-1 overflow-x-auto rounded-2xl border border-border/60 bg-navy/50 p-1.5 no-scrollbar backdrop-blur",
        className
      )}
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
              "relative flex items-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-semibold transition-all duration-200",
              isActive
                ? "bg-blue/50 text-foreground"
                : "text-muted hover:bg-blue/30 hover:text-foreground"
            )}
          >
            {tab.label}
            {tab.count !== undefined && (
              <span
                className={cn(
                  "ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] font-bold tabular-nums",
                  isActive ? "bg-secondary/15 text-secondary" : "bg-muted/10 text-muted"
                )}
              >
                {tab.count}
              </span>
            )}
            {isActive && (
              <span className="absolute -bottom-[7px] left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-primary" />
            )}
          </button>
        );
      })}
    </div>
  );
}
