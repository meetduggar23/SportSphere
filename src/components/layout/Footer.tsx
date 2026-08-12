import Link from "next/link";
import Image from "next/image";
import { Radio, Trophy, Newspaper, Wand2, Sparkles, ArrowUpRight } from "lucide-react";
import { SPORTS } from "@/sports/registry";

const socials = [
  {
    label: "X (Twitter)",
    url: "https://x.com",
    path: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z",
  },
  {
    label: "YouTube",
    url: "https://youtube.com",
    path: "M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z",
  },
  {
    label: "Instagram",
    url: "https://instagram.com",
    path: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z",
  },
  {
    label: "Facebook",
    url: "https://facebook.com",
    path: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
  },
  {
    label: "GitHub",
    url: "https://github.com/meetduggar23/SportSphere",
    path: "M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12",
  },
];

const sports = SPORTS.filter((s) => s.enabled);

const footerLinks = [
  {
    title: "Sports",
    links: sports.map((s) => ({ label: s.shortName, href: s.route })),
    grid: true,
  },
  {
    title: "Platform",
    links: [
      { label: "Live Scores", href: "/live" },
      { label: "News", href: "/news" },
      { label: "Transfers", href: "/transfers" },
      { label: "Standings", href: "/standings" },
      { label: "Fantasy", href: "/fantasy" },
      { label: "AI Insights", href: "/ai-insights" },
    ],
  },
  {
    title: "Explore",
    links: [
      { label: "All Sports", href: "/sports" },
      { label: "Competitions", href: "/competitions" },
      { label: "Calendar", href: "/calendar" },
      { label: "Videos", href: "/videos" },
      { label: "Statistics", href: "/statistics" },
      { label: "Predictions", href: "/predictions" },
    ],
  },
];

const quickNav = [
  { label: "Live", href: "/live", icon: Radio },
  { label: "Standings", href: "/standings", icon: Trophy },
  { label: "News", href: "/news", icon: Newspaper },
  { label: "Fantasy", href: "/fantasy", icon: Wand2 },
  { label: "AI", href: "/ai-insights", icon: Sparkles },
];

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border bg-background">
      <div className="mx-auto max-w-[1440px] px-4 pt-14 lg:px-6">
        {/* Top band */}
        <div className="grid gap-12 md:grid-cols-12">
          {/* Brand */}
          <div className="md:col-span-4 lg:col-span-4">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <span className="flex h-10 w-10 items-center justify-center rounded-md border border-border-strong bg-blue/40 shadow-card">
                <Image
                  src="/logo.png"
                  alt="SportSphere Logo"
                  width={175}
                  height={50}
                  className="h-8 w-auto object-contain"
                />
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted">
              Live scores, match centres, fantasy and AI-powered insights across
              {sports.length} major sports — all in one arena.
            </p>
            <div className="mt-6 flex gap-2.5">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-card-glass text-muted transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/50 hover:bg-blue/40 hover:text-foreground hover:shadow-glow"
                >
                  <svg viewBox="0 0 24 24" className="h-4.5 w-4.5 fill-current" aria-hidden="true">
                    <path d={social.path} />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          <div className="md:col-span-8 lg:col-span-8">
            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              {footerLinks.map((col) => (
                <div key={col.title}>
                  <div className="flex items-center gap-2">
                    <span className="h-1 w-1 rounded-full bg-secondary" />
                    <h4 className="text-xs font-bold uppercase tracking-[0.22em] text-foreground-soft">
                      {col.title}
                    </h4>
                  </div>
                  <ul className={`mt-4 ${col.grid ? "grid grid-cols-2 gap-x-4 gap-y-2" : "space-y-2.5"}`}>
                    {col.links.map((link) => (
                      <li key={link.label}>
                        <Link
                          href={link.href}
                          className="group inline-flex items-center gap-1 text-sm text-muted transition-colors hover:text-foreground"
                        >
                          {link.label}
                          <ArrowUpRight className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick nav pill bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-2 border-t border-border pt-7">
          {quickNav.map((q) => (
            <Link
              key={q.label}
              href={q.href}
              className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card-glass px-3.5 py-1.5 text-xs font-semibold text-muted-strong transition-colors hover:border-secondary/50 hover:bg-blue/40 hover:text-foreground"
            >
              <q.icon className="h-3.5 w-3.5" /> {q.label}
            </Link>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-5 flex flex-col items-center justify-between gap-4 border-t border-border pb-8 pt-6 md:flex-row">
          <div className="flex flex-col items-center gap-1 md:items-start">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted">
              Made by <span className="text-secondary">Meet Duggar</span>
            </p>
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-strong">
              © 2026 Duggar PVT Ltd. All rights reserved.
            </p>
          </div>
          <p className="text-xs text-faint">SportSphere · The Sports Broadcast Arena</p>
        </div>
      </div>
    </footer>
  );
}