"use client";

import { useState } from "react";
import Image from "next/image";

interface CricketPlayerAvatarProps {
  name: string;
  /** Real photo URL (image provider / data provider). Absent → initials. */
  src?: string;
  /** Size class controlling the container, e.g. "h-10 w-10" or "h-full w-full". */
  className?: string;
  /** Aspect ratio container: "aspect-square" (default) or "aspect-[4/3]". */
  ratioClassName?: string;
  sizes?: string;
  loading?: "lazy" | "eager";
  /** Initials size for the fallback (default "text-sm"). */
  initialsClassName?: string;
}

/**
 * Player photo with a safe fallback chain:
 *   1. real photo (image provider or data provider)
 *   2. initials avatar (never a broken image, never a random photo)
 *
 * Clean, professional container — rounded corners, no ring, no glow, no
 * decorative gradient. Fixed aspect-ratio box prevents layout shift; images
 * below the fold load lazily.
 */
export function CricketPlayerAvatar({
  name,
  src,
  className = "h-10 w-10",
  ratioClassName = "aspect-square",
  sizes = "80px",
  loading = "lazy",
  initialsClassName = "text-sm",
}: CricketPlayerAvatarProps) {
  const [failed, setFailed] = useState(false);
  const initials = (name ?? "?").slice(0, 2).toUpperCase();

  const showImage = Boolean(src) && !failed;

  return (
    <div
      className={`relative shrink-0 overflow-hidden rounded-md bg-score-elevated ${ratioClassName} ${className}`}
    >
      {showImage ? (
        <Image
          src={src as string}
          alt={name}
          fill
          sizes={sizes}
          loading={loading}
          className="object-cover"
          onError={() => setFailed(true)}
        />
      ) : (
        <span
          aria-hidden="true"
          className={`absolute inset-0 flex items-center justify-center font-bold text-score-muted ${initialsClassName}`}
        >
          {initials}
        </span>
      )}
    </div>
  );
}
