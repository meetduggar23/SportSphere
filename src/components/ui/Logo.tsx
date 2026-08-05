import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-2 shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="SportSphere Logo"
        width={140}
        height={42}
        className="h-9 w-auto object-contain"
        priority
      />
      {showText && (
        <span className="font-extrabold text-lg tracking-tight hidden sm:inline-block">
          SPORT<span className="text-primary">SPHERE</span>
        </span>
      )}
    </Link>
  );
}
