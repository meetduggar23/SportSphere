import { cn } from "@/lib/utils";

interface TeamLogoProps {
  logo: string;
  name?: string;
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes = {
  sm: "w-6 h-6 text-sm",
  md: "w-9 h-9 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-2xl",
};

export function TeamLogo({ logo, name, size = "md", className }: TeamLogoProps) {
  const isUrl = logo.startsWith("http") || logo.startsWith("/");

  if (isUrl) {
    return (
      <img
        src={logo}
        alt={name ?? "Team logo"}
        width={64}
        height={64}
        loading="lazy"
        decoding="async"
        className={cn(
          "rounded-full object-cover bg-muted/10 border border-border shrink-0",
          sizes[size],
          className
        )}
      />
    );
  }

  return (
    <div
      className={cn(
        "rounded-full bg-gradient-to-br from-primary/20 to-primary/10 border border-border flex items-center justify-center shrink-0",
        sizes[size],
        className
      )}
    >
      <span>{logo}</span>
    </div>
  );
}
