import { cn } from "@/lib/utils";

interface LiveBadgeProps {
  className?: string;
  label?: string;
}

export function LiveBadge({ className, label = "LIVE" }: LiveBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-[11px] font-bold",
        className
      )}
    >
      <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse-live" />
      {label}
    </span>
  );
}
