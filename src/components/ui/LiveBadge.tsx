import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
  label?: string;
}

export function LiveBadge({ className, label = "LIVE" }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5  bg-primary px-2.5 py-1 text-[11px] font-bold tracking-wide text-navy rounded-full",
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className="absolute inline-flex h-full w-full  bg-navy animate-ping-ring" />
        <span className="relative inline-flex h-1.5 w-1.5  bg-navy" />
      </span>
      {label}
    </span>
  );
}
