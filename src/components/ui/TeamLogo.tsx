"use client";

import Image from "next/image";
import { useState } from "react";
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

function initials(name?: string): string {
  if (!name) return "?";
  return name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 3)
    .toUpperCase();
}

/**
 * Clean logo renderer.
 *
 * The logo image itself is the only visible graphic: no rings, circles,
 * background tiles, borders, shadows or decorative wrappers. Images use
 * object-contain so each logo keeps its natural shape and proportions
 * (shields stay shields, wide logos stay wide), centered within the
 * allocated square space.
 *
 * Provider logo URLs occasionally 404 (e.g. api-sports CDN links for
 * retired teams). When the image fails to load we fall back to a quiet
 * initials chip instead of surfacing a broken-image icon.
 */
export function TeamLogo({ logo, name, size = "md", className }: TeamLogoProps) {
  const [failed, setFailed] = useState(false);
  const isUrl = logo.startsWith("http") || logo.startsWith("/");

  if (isUrl && !failed) {
    return (
      <Image
        src={logo}
        alt={name ?? "Team logo"}
        width={96}
        height={96}
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className={cn("shrink-0 object-contain", sizes[size], className)}
      />
    );
  }

  // Fallback for teams without an image asset (or whose image failed to
  // load) — a quiet neutral chip, no ring/shadow.
  return (
    <div
      className={cn(
        "flex shrink-0 select-none items-center justify-center bg-blue/40",
        sizes[size],
        className
      )}
      aria-hidden
    >
      <span>{isUrl ? initials(name) : logo}</span>
    </div>
  );
}
