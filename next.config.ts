import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  images: {
    // Team logos & chat avatars in demo data are dicebear SVGs; next/image
    // refuses to optimize SVG unless explicitly allowed.
    dangerouslyAllowSVG: true,
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "api.dicebear.com" },
      { protocol: "https", hostname: "media.api-sports.io" },
      { protocol: "https", hostname: "img.cricapi.com" },
      { protocol: "https", hostname: "h.cricapi.com" },
      // Approved player-image provider CDN (Sportmonks). Only this host is
      // allowed — arbitrary remote image domains are never added.
      { protocol: "https", hostname: "cdn.sportmonks.com" },
      // News articles are aggregated from many publishers; their CDNs are
      // unknown ahead of time, so any https image host is permitted here.
      // Images are only ever fetched by next/image from URLs that came back
      // from the NewsData.io API (https-only), not from user input.
      { protocol: "https", hostname: "**" },
    ],
  },
  // Legacy top-level sport routes → canonical /sports/<slug> module routes.
  async redirects() {
    return [
      { source: "/cricket", destination: "/sports/cricket", permanent: true },
      { source: "/football", destination: "/sports/football", permanent: true },
      { source: "/basketball", destination: "/sports/basketball", permanent: true },
      { source: "/baseball", destination: "/sports/baseball", permanent: true },
      { source: "/hockey", destination: "/sports/hockey", permanent: true },
      { source: "/volleyball", destination: "/sports/volleyball", permanent: true },
      { source: "/rugby", destination: "/sports/rugby", permanent: true },
      { source: "/f1", destination: "/sports/formula-1", permanent: true },
      { source: "/mma", destination: "/sports/mma", permanent: true },
      { source: "/nfl", destination: "/sports/nfl", permanent: true },
      { source: "/nba", destination: "/sports/nba", permanent: true },
      { source: "/handball", destination: "/sports/handball", permanent: true },
      { source: "/afl", destination: "/sports/afl", permanent: true },
    ];
  },
};

export default nextConfig;
