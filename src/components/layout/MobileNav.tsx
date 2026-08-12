"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Radio, Newspaper, Search, Home, Trophy } from "lucide-react";
import { cn } from "@/lib/utils";

const items = [
  { label: "Live", href: "/live", icon: Radio },
  { label: "Scores", href: "/standings", icon: Trophy },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Search", href: "/search", icon: Search },
  { label: "Home", href: "/", icon: Home },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-0 z-50 border-t border-border-strong bg-background/92 backdrop-blur-xl lg:hidden">
      <div className="mx-auto grid max-w-md grid-cols-5">
        {items.map((item) => {
          const active =
            pathname === item.href ||
            (item.href === "/live" && pathname.startsWith("/match"));
          const Icon = item.icon;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "relative flex flex-col items-center gap-1 py-2.5 text-[10px] font-bold transition-colors",
                active ? "text-secondary" : "text-muted hover:text-foreground"
              )}
            >
              {active && (
                <span className="absolute inset-x-4 top-0 h-0.5  bg-primary" />
              )}
              <Icon className="h-5 w-5" strokeWidth={active ? 2.4 : 2} />
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
