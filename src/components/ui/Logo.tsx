import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
}

export function Logo({ className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center shrink-0", className)}>
      <Image
        src="/logo.png"
        alt="SportSphere Logo"
        width={175}
        height={50}
        className="h-10 w-auto object-contain"
        loading="eager"
        decoding="async"
      />
    </Link>
  );
}
