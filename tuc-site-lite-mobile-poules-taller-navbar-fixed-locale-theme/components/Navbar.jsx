
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

/**
 * Lightweight theme toggle (no dependency on next-themes).
 * Persists in localStorage ("theme" = "light" | "dark").
 * Applies/removes the "dark" class on <html>.
 */
function ThemeToggle({ className = "" }) {
  const [theme, setTheme] = useState("system");

  useEffect(() => {
    // initialize
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const prefersDark = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initial = stored || (prefersDark ? "dark" : "light");
    setTheme(initial);
    applyTheme(initial);
  }, []);

  function applyTheme(next) {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (next === "dark") root.classList.add("dark");
    else root.classList.remove("dark");
    localStorage.setItem("theme", next);
  }

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    applyTheme(next);
  }

  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      className={"rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-1.5 text-sm hover:bg-white/90 dark:hover:bg-white/15 transition " + className}
    >
      {theme === "dark" ? (
        <span className="inline-flex items-center gap-1">
          {/* sun icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor"><circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
          Light
        </span>
      ) : (
        <span className="inline-flex items-center gap-1">
          {/* moon icon */}
          <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
          Dark
        </span>
      )}
    </button>
  );
}

/**
 * Locale switcher: links to the same path but with /nl or /en prefix.
 */
function LocaleSwitch({ locale, className = "" }) {
  const pathname = usePathname() || "/";
  const other = locale === "nl" ? "en" : "nl";
  // replace only the first segment if it matches known locales
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length && (segments[0] === "nl" || segments[0] === "en")) {
    segments[0] = other;
  } else {
    segments.unshift(other);
  }
  const hrefOther = "/" + segments.join("/");

  return (
    <div className={"inline-flex rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-0.5 " + className}>
      <Link
        href={pathname.startsWith("/nl") ? pathname : "/nl" + (pathname.startsWith("/") ? "" : "/") + pathname}
        className={"px-3 py-1.5 text-sm rounded-full " + (locale === "nl" ? "bg-emerald-600 text-white" : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")}
      >
        NL
      </Link>
      <Link
        href={hrefOther}
        className={"px-3 py-1.5 text-sm rounded-full " + (locale === "en" ? "bg-emerald-600 text-white" : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")}
      >
        EN
      </Link>
    </div>
  );
}

export default function Navbar({ locale = "nl" }) {
  const links = [
    { href: `/${locale}`, label: locale === "nl" ? "Home" : "Home" },
    { href: `/${locale}/schedule`, label: locale === "nl" ? "Speelschema" : "Schedule" },
    { href: `/${locale}/pools`, label: locale === "nl" ? "Poules" : "Pools" },
    { href: `/${locale}/rules`, label: locale === "nl" ? "Regels" : "Rules" },
    { href: `/${locale}/teams`, label: locale === "nl" ? "Teams" : "Teams" },
    { href: `/${locale}/location`, label: locale === "nl" ? "Locatie" : "Location" },
    { href: `/${locale}/partners`, label: locale === "nl" ? "Partners" : "Partners" },
    { href: `/${locale}/media`, label: locale === "nl" ? "Media" : "Media" },
    { href: `/${locale}/contact`, label: locale === "nl" ? "Contact" : "Contact" },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/75 dark:bg-black/70 backdrop-blur">
      <div className="container flex items-center gap-2 py-2">
        {/* Brand (logo + TUC) shouldn't shrink */}
        <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0 pr-1">
          <img src="/logo.png" alt="TUC" className="h-6 w-auto" />
          <span className="font-semibold tracking-tight">TUC</span>
        </Link>

        {/* Link row fills remaining space and can scroll horizontally on small screens */}
        <div className="flex-1 overflow-x-auto pl-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-4 whitespace-nowrap">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="shrink-0 hover:opacity-90">
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Controls on the right */}
        <div className="ml-1 flex items-center gap-2 shrink-0">
          <LocaleSwitch locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
