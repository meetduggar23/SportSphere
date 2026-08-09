import { cn } from "@/lib/utils";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  kicker?: string;
  className?: string;
}

export function PageHeader({ title, subtitle, icon, actions, kicker, className }: PageHeaderProps) {
  return (
    <div
      className={cn(
        "mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between",
        className
      )}
    >
<div className="flex items-start gap-4">
        {icon && (
          <div className="flex h-14 w-14 shrink-0 items-center justify-center  border border-border-navy bg-blue/40 text-muted-strong rounded-md">
            {icon}
          </div>
        )}
        <div>
          {kicker && <p className="kicker mb-1.5 text-muted">{kicker}</p>}
          <h1 className="heading text-3xl text-foreground md:text-4xl">{title}</h1>
          {subtitle && <p className="mt-2 max-w-xl text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}
