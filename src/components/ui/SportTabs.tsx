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
        "flex gap-1 overflow-x-auto no-scrollbar rounded-xl bg-muted/10 p-1",
        className
      )}
      role="tablist"
    >
      {tabs.map((tab) => (
        <button
          key={tab.value}
          role="tab"
          aria-selected={active === tab.value}
          onClick={() => onChange(tab.value)}
          className={cn(
            "px-4 py-2 text-sm font-medium rounded-lg transition-all whitespace-nowrap",
            active === tab.value
              ? "bg-card shadow-sm text-foreground"
              : "text-muted hover:text-foreground"
          )}
        >
          {tab.label}
          {tab.count !== undefined && (
            <span
              className={cn(
                "ml-1.5 text-[10px] font-bold px-1.5 py-0.5 rounded-full",
                active === tab.value
                  ? "bg-primary text-white"
                  : "bg-muted/20 text-muted"
              )}
            >
              {tab.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
