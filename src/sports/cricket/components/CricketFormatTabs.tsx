"use client";

import { SportTabs } from "@/components/ui/SportTabs";
import { cricketFormat, CRICKET_FORMATS } from "@/sports/cricket/config/cricketConfig";
import type { CricketFormatId } from "@/sports/cricket/types/cricketTypes";

interface CricketFormatTabsProps {
  active: CricketFormatId;
  onChange: (format: CricketFormatId) => void;
  /** Restrict the tab bar to specific formats (default: Test/ODI/T20I/IPL). */
  formats?: CricketFormatId[];
  className?: string;
}

/**
 * Format tab bar — Test / ODI / T20I / IPL (the canonical records set).
 * The generic T20 format stays available in the data model but is not shown
 * here to keep the tab bar aligned with the Records page spec.
 */
export function CricketFormatTabs({
  active,
  onChange,
  formats = ["test", "odi", "t20i", "ipl"],
  className,
}: CricketFormatTabsProps) {
  const tabs = formats
    .map((id) => cricketFormat(id))
    .filter((f) => CRICKET_FORMATS.some((c) => c.id === f.id));

  return (
    <SportTabs
      tabs={tabs.map((f) => ({ label: f.label, value: f.id }))}
      active={active}
      onChange={(v) => onChange(v as CricketFormatId)}
      className={className}
    />
  );
}
