import { cn } from "@/lib/utils";

interface TeamLogoProps {
  logo: string;
  name?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  xs: "w-5 h-5 text-xs",
  sm: "w-7 h-7 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-14 h-14 text-lg",
  xl: "w-20 h-20 text-2xl",
};

export function TeamLogo({ logo, name, size = "md", className }: TeamLogoProps) {
  const isUrl = logo.startsWith("http") || logo.startsWith("/");

  if (isUrl) {
    return (
      <img
        src={logo}
        alt={name ?? "Team logo"}
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        className={cn(
          "rounded-full object-cover bg-muted/10 ring-1 ring-border shadow-card shrink-0",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-primary/25 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center shrink-0 select-none",
        sizes[size],
        className
      )}
      aria-hidden
    >
      <span>{logo}</span>
    </div>
  );
}
