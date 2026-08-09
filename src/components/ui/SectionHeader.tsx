import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  href?: string;
  linkLabel?: string;
  icon?: React.ReactNode;
  kicker?: string;
  className?: string;
}

export function SectionHeader({
  title,
  href,
  linkLabel = "View All",
  icon,
  kicker,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("mb-6 flex items-end justify-between gap-4", className)}>
<div className="min-w-0">
        {kicker && <p className="kicker mb-1.5 text-muted">{kicker}</p>}
        <div className="flex items-center gap-3">
          {icon && (
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-border-navy bg-blue/40 text-muted-strong">
              {icon}
            </span>
          )}
          <h2 className="heading text-xl md:text-2xl text-foreground">{title}</h2>
        </div>
      </div>
      {href && (
        <Link
          href={href}
          className="group inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border py-1.5 text-sm font-semibold text-muted-strong transition-colors hover:border-border-strong hover:text-foreground"
        >
          <span className="hidden sm:inline">{linkLabel}</span>
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
        </Link>
      )}
    </div>
  );
}
