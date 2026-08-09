import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
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
    { media: "(prefers-color-scheme: light)", color: "#fff8e6" },
    { media: "(prefers-color-scheme: dark)", color: "#8d0b41" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
