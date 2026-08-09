import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
  label?: string;
}

export function LiveBadge({ className, label = "LIVE" }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-brand/15 text-brand ring-1 ring-brand/30 text-[11px] font-bold tracking-wide",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full rounded-full bg-brand animate-ping-dot" />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
      </span>
      {label}
    </span>
  );
}
