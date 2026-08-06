import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SportSphere - AI-Powered Sports Platform",
  description:
    "Your ultimate AI-powered sports ecosystem. Live scores, match centers, AI insights, fantasy sports, and more.",
  keywords: [
    "sports",
    "live scores",
    "football",
    "cricket",
    "basketball",
    "NFL",
    "hockey",
    "volleyball",
    "MMA",
    "Formula 1",
    "handball",
    "AFL",
    "NBA",
    "rugby",
    "baseball",
    "AI",
    "fantasy sports",
  ],
  icons: {
    icon: [
      { url: "/logobrowser.png", sizes: "any", type: "image/png" },
    ],
    apple: [
      { url: "/logobrowser.png", sizes: "180x180", type: "image/png" },
    ],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "SportSphere",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
