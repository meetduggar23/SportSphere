"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { flushSync } from "react-dom";

type Theme = "light" | "dark";

interface ThemeContextValue {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: "light",
  toggleTheme: () => {},
  setTheme: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "light";
    const stored = localStorage.getItem("sportsphere-theme");
    if (stored === "light" || stored === "dark") return stored;
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("sportsphere-theme", theme);
    // Keep the browser chrome bar in sync with the active theme.
    const meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", theme === "dark" ? "#021526" : "#E3F2FD");
  }, [theme]);

  // Apply a theme change. When the browser supports the View Transitions API,
  // the switch is wrapped in startViewTransition so the entire page glides
  // from one theme to the other as a smooth cross-fade (see the
  // ::view-transition-* rules in globals.css). Older browsers simply apply
  // the change instantly and rely on the universal CSS transitions instead.
  const applyTheme = (next: Theme) => {
    if (typeof document !== "undefined" && "startViewTransition" in document) {
      document.startViewTransition(() => {
        flushSync(() => setThemeState(next));
      });
    } else {
      setThemeState(next);
    }
  };

  const setTheme = (t: Theme) => applyTheme(t);
  const toggleTheme = () => applyTheme(theme === "light" ? "dark" : "light");

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
