# SportSphere — AI-Powered Sports Platform

Live scores, cinematic match centres, fantasy sports, and intelligent AI insights across **13 major sports** — Cricket, Football, Basketball, Baseball, Hockey, Volleyball, Rugby, Formula 1, MMA, NFL, NBA, Handball and AFL.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, SportSphere is a premium sports-broadcast-style platform with a full **Light / Dark theme system**.

---

## ✨ Features

- **13-sport coverage** — dedicated pages for every supported sport with live events, fixtures, results, standings, teams and players
- **Sport-agnostic Home feed** — the homepage reflects what is actually happening right now across all sports (live-first, never hardcoded to one sport)
- **Live ticker** — a compact broadcast-style marquee of real live events, polling the sport providers every 60s
- **Match centres** — timeline, statistics, head-to-head, lineups and live chat per match
- **AI Insights** — an AI assistant, predictions, and analysis surfaces
- **Fantasy, Predictions, Transfers, Calendar, News, Search, Favorites, My Teams** and more
- **Light / Dark theme** — icon toggle in the top-right navbar, persisted to `localStorage`, system-preference default

## 🎨 Theming

The entire design system is token-driven from `src/app/globals.css`:

| | Light (default) | Dark |
|---|---|---|
| Background | `#E3F2FD` | `#021526` (deep navy) |
| Surfaces | `#90CAF9`-derived | `#03346E` (primary blue) |
| Accent | `#90CAF9` | `#6EACDA` (sky blue) |
| Ink / text | `#0B2C4E` | `#E2E2B6` (warm cream) |

Every surface, border, shadow and gradient is derived from these tokens via `color-mix()` and opacity, so switching themes updates the entire UI — navbar, hero, scoreboards, standings, news, sport pages, dropdowns, modals and all 13 sports — without a page reload.

## 🚀 Getting Started

```bash
npm install
npm run dev
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server (Turbopack) |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## 🔌 Real Sports Data (optional)

SportSphere ships with a provider-based data architecture (`src/lib/`) designed to be wired to real sports APIs. API keys live **only** in environment variables — see `.env.example` for the variable names. Never commit `.env*` files.

When a provider is connected, real data takes priority; when unavailable, the UI shows a clear "Data currently unavailable" state with a retry action — **no fabricated scores or fixtures**.

## 📁 Project Structure

```
src/
  app/            # App Router pages (one per sport + platform pages)
  components/     # UI components (layout, sports, home, dashboard, ui)
  config/         # Sports configuration & navigation
  data/           # Mock data (used while no live provider is connected)
  lib/            # Providers, API clients, hooks, home feed
  providers/      # Theme provider
  types/          # Shared TypeScript types
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feat/my-feature`)
3. Commit your changes (keep messages concise and descriptive)
4. Push and open a Pull Request

## 📄 License

Private project. All rights reserved.
