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
    <div className={cn("flex items-center justify-between mb-4", className)}>
      <div className="flex items-center gap-2">
        {icon}
        <h2 className="font-bold text-lg">{title}</h2>
      </div>
      {href && (
        <Link
          href={href}
          className="text-sm font-medium text-primary flex items-center gap-1 hover:text-primary-hover transition-colors"
        >
          {linkLabel} <ArrowRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  );
}
