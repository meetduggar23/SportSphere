import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center shrink-0", className)}>
      <img
        src="/logo.png"
        alt="SportSphere Logo"
        width={140}
        height={42}
        className="h-12 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
