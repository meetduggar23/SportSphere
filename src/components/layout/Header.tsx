"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Search, Bell, User, Menu, X } from "lucide-react";
import { navItems } from "@/data/mock";
import { cn } from "@/lib/utils";

export function Header() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card-bg/95 backdrop-blur supports-[backdrop-filter]:bg-card-bg/60">
      <div className="flex h-14 items-center px-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2 mr-6">
          <Image
            src="/logo.png"
            alt="SportSphere Logo"
            width={120}
            height={40}
            className="h-8 w-auto"
            priority
          />
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={cn(
                "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                item.active
                  ? "bg-primary/10 text-primary"
                  : "text-muted hover:text-foreground hover:bg-muted/10"
              )}
            >
              {item.label}
            </Link>
          ))}
          <button className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground rounded-md hover:bg-muted/10">
            More Sports ▾
          </button>
        </nav>

        <div className="flex-1" />

        <div className="flex items-center gap-2">
          <div className={cn(
            "hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-background",
            searchOpen ? "w-64" : "w-48"
          )}>
            <Search className="h-4 w-4 text-muted" />
            <input
              type="text"
              placeholder="Search players, teams, matches..."
              className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
              onFocus={() => setSearchOpen(true)}
              onBlur={() => setSearchOpen(false)}
            />
          </div>

          <button className="relative p-2 rounded-lg hover:bg-muted/10 transition-colors">
            <Bell className="h-5 w-5 text-muted" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
          </button>

          <button className="p-2 rounded-lg hover:bg-muted/10 transition-colors">
            <User className="h-5 w-5 text-muted" />
          </button>

          <button
            className="lg:hidden p-2 rounded-lg hover:bg-muted/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-border bg-card-bg p-4 animate-slide-up">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-md transition-colors",
                  item.active
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-foreground hover:bg-muted/10"
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
