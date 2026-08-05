import Link from "next/link";
import { Twitter, Youtube, Instagram, Facebook, Github } from "lucide-react";

const footerLinks = [
  {
    title: "Sports",
    links: [
      { label: "Football", href: "/football" },
      { label: "Cricket", href: "/cricket" },
      { label: "Basketball", href: "/basketball" },
      { label: "Formula 1", href: "/f1" },
      { label: "Tennis", href: "/tennis" },
    ],
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
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
      { label: "Contact", href: "/contact" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-card mt-auto">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2">
            <h3 className="font-extrabold text-xl mb-3">
              SPORT<span className="text-primary">SPHERE</span>
            </h3>
            <p className="text-sm text-muted max-w-xs">
              The AI-powered sports ecosystem. Live scores, match centers, fantasy sports, and intelligent
              insights for every major sport on the planet.
            </p>
            <div className="flex gap-2 mt-4">
              {[Twitter, Youtube, Instagram, Facebook, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="p-2 rounded-lg border border-border hover:bg-muted/10 transition-colors"
                  aria-label="Social link"
                >
                  <Icon className="h-4 w-4 text-muted" />
                </a>
              ))}
            </div>
          </div>

          {footerLinks.map((col) => (
            <div key={col.title}>
              <h4 className="font-semibold text-sm mb-3">{col.title}</h4>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link href={link.href} className="text-sm text-muted hover:text-foreground transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} SportSphere. All rights reserved. Not affiliated with any league or team.
          </p>
          <p className="text-xs text-muted">
            Made with <span className="text-primary">♥</span> for sports fans worldwide
          </p>
        </div>
      </div>
    </footer>
  );
}
