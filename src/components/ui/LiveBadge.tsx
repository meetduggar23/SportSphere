import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
  label?: string;
}

export function LiveBadge({ className, label = "LIVE" }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-500/15 text-red-500 ring-1 ring-red-500/30 text-[11px] font-bold tracking-wide",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-red-500 animate-ping-dot" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-red-500" />
      </span>
      {label}
    </span>
  );
}
