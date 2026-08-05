import type { Metadata } from "next";
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
    "F1",
    "tennis",
    "AI",
    "fantasy sports",
  ],
  icons: {
    icon: "/logobrowser.png",
  },
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
