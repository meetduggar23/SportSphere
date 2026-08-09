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

/**
 * Clean logo renderer.
 *
 * The logo image itself is the only visible graphic: no rings, circles,
 * background tiles, borders, shadows or decorative wrappers. Images use
 * object-contain so each logo keeps its natural shape and proportions
 * (shields stay shields, wide logos stay wide), centered within the
 * allocated square space.
 */
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
        className={cn("shrink-0 object-contain", sizes[size], className)}
      />
    );
  }

  // Fallback for teams without an image asset — a quiet neutral chip, no ring/shadow.
  return (
    <div
      className={cn(
        "flex shrink-0 select-none items-center justify-center rounded-lg bg-blue/40",
        sizes[size],
        className
      )}
      aria-hidden
    >
      <span>{logo}</span>
    </div>
  );
}
