import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  icon?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  linkLabel = "View All",
  icon,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-end justify-between gap-4 mb-6", className)}>
      <div className="flex items-center gap-3 min-w-0">
        {icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/20">
            {icon}
          </span>
        )}
        <h2 className="font-display text-xl md:text-2xl font-bold tracking-tight text-balance">
          {title}
        </h2>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:text-primary-hover transition-colors shrink-0 pb-0.5"
        >
          <span className="hidden sm:inline">{linkLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
