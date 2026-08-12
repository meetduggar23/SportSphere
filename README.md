<p align="center">
  <img src="public/logo.png" alt="SportSphere" width="180" />
</p>

# SportSphere

Live scores, match centres, and sports news across **13 sports** — Cricket, Football, Basketball, Baseball, Hockey, Volleyball, Rugby, Formula 1, MMA, NFL, NBA, Handball, and AFL.

Built with **Next.js (App Router) + TypeScript + Tailwind CSS v4**, with a full light/dark theme.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment Variables

Copy `.env.example` to `.env.local` and add API keys as needed. Never commit `.env*` files.

| Variable | Purpose |
|---|---|
| `FOOTBALL_API_KEY` | API-Football (football scores/fixtures) |
| `NEWS_API_KEY` | NewsData.io (sports news feed) |
| `CRICKET_API_KEY` / `CRICAPI_API_KEY` | Cricket data |
| `SPORTMONKS_API_TOKEN` | Player photos |
| `BASKETBALL_API_KEY` / `NBA_API_KEY` / `BALLDONTLIE_API_KEY` | Basketball / NBA data |
| `BASEBALL_API_KEY` / `HOCKEY_API_KEY` / `MMA_API_KEY` | Baseball, hockey, MMA data |
| `NFL_API_KEY` / `RUGBY_API_KEY` / `VOLLEYBALL_API_KEY` / `HANDBALL_API_KEY` / `AFL_API_KEY` | Remaining sports |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL |

Providers are optional. When no provider is connected, pages show an honest "Data currently unavailable" state with a retry action — **no fabricated scores**.

## Features

- **13-sport coverage** — live events, fixtures, results, standings, teams, and players
- **Live ticker** — broadcast-style marquee of real live events
- **Match centres** — timeline, statistics, head-to-head, and live chat
- **News** — live sports feed from NewsData.io, sports-only, with category tabs
- **AI Insights** — predictions and analysis
- **Fantasy, Predictions, Transfers, Calendar, Search, Favorites, My Teams**
- **Light / Dark theme** — toggle in the navbar, persisted to `localStorage`

## Project Structure

```
src/
  app/            # App Router pages (one per sport + platform pages)
  components/     # UI components (layout, sports, home, dashboard, ui)
  config/         # Sports configuration & navigation
  data/           # Mock data (used while no live provider is connected)
  lib/            # Providers, API clients, hooks, home feed
  providers/      # Theme provider
  sports/         # Sport-specific modules (e.g. cricket)
  types/          # Shared TypeScript types
```

## License

Private project. All rights reserved.

---

<p align="center">
  Made with ❤️ by <b>Meet</b>
</p>
