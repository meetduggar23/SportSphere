"use client";

import { useState } from "react";
import Link from "next/link";
import { Bell, User, Menu, X, Moon, Sun } from "lucide-react";
import { navItems } from "@/data/mock";
import { useTheme } from "@/providers/ThemeProvider";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/ui/Logo";
import { SearchBar } from "@/components/layout/SearchBar";
import { usePathname } from "next/navigation";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="flex h-16 items-center gap-3 px-4 lg:px-6">
        <Logo className="mr-2" />

        <nav className="hidden xl:flex items-center gap-0.5 flex-1 overflow-hidden">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "px-3 py-2 text-sm font-medium rounded-lg transition-colors whitespace-nowrap",
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-muted hover:text-foreground hover:bg-muted/10"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <Link
            href="/sports"
            className="px-3 py-2 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-muted/10 whitespace-nowrap"
          >
            More Sports ▾
          </Link>
        </nav>

        <div className="flex-1 xl:hidden" />

        <div className="flex items-center gap-1.5">
          <div className="hidden md:block">
            <SearchBar />
          </div>

          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === "dark" ? <Sun className="h-5 w-5 text-muted" /> : <Moon className="h-5 w-5 text-muted" />}
          </button>

          <button className="relative p-2 rounded-lg hover:bg-muted/10 transition-colors" title="Notifications">
            <Bell className="h-5 w-5 text-muted" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full animate-pulse-live" />
          </button>

          <Link
            href="/profile"
            className="p-2 rounded-lg hover:bg-muted/10 transition-colors"
            title="Profile"
          >
            <User className="h-5 w-5 text-muted" />
          </Link>

          <button
            className="xl:hidden p-2 rounded-lg hover:bg-muted/10 transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-5 w-5 text-muted" /> : <Menu className="h-5 w-5 text-muted" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-border bg-card p-4 animate-slide-up">
          <div className="md:hidden mb-3">
            <SearchBar />
          </div>
          <nav className="flex flex-col gap-0.5">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={cn(
                    "px-3 py-2.5 text-sm font-medium rounded-lg transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted hover:text-foreground hover:bg-muted/10"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link
              href="/sports"
              className="px-3 py-2.5 text-sm font-medium text-muted hover:text-foreground rounded-lg hover:bg-muted/10"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Sports
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
