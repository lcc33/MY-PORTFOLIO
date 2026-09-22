"use client";

import { useEffect, useState } from "react";

type Theme = "light" | "dark";

function getSystemTheme(): Theme {
  if (typeof window === "undefined") {
    return "light";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getStoredTheme(): Theme | null {
  if (typeof window === "undefined") {
    return null;
  }
  const stored = window.localStorage.getItem("theme");
  return stored === "dark" || stored === "light" ? stored : null;
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const stored = getStoredTheme();
    const currentDataset = document.documentElement.dataset.theme as
      | Theme
      | undefined;
    const initialTheme: Theme =
      stored ??
      (currentDataset === "dark" || currentDataset === "light"
        ? currentDataset
        : getSystemTheme());

    setTheme(initialTheme);
    document.documentElement.dataset.theme = initialTheme;

    // Listen to system theme changes until the visitor manually chooses a theme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const onSystemThemeChange = (e: MediaQueryListEvent) => {
      if (!getStoredTheme()) {
        const systemTheme: Theme = e.matches ? "dark" : "light";
        setTheme(systemTheme);
        document.documentElement.dataset.theme = systemTheme;
      }
    };

    mediaQuery.addEventListener("change", onSystemThemeChange);
    return () => {
      mediaQuery.removeEventListener("change", onSystemThemeChange);
    };
  }, []);

  function toggleTheme() {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
    // Persist visitor's explicit preference
    window.localStorage.setItem("theme", nextTheme);
  }

  const targetTheme = theme === "dark" ? "light" : "dark";

  return (
    <button
      type="button"
      className="header-control"
      onClick={toggleTheme}
      aria-pressed={theme === "dark"}
      aria-label={`Current theme is ${theme}. Switch to ${targetTheme} theme`}
      title={`Switch to ${targetTheme} theme`}
      suppressHydrationWarning
    >
      {mounted ? targetTheme : "dark"}
    </button>
  );
}

