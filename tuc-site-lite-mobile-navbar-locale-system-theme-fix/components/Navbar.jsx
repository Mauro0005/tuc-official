
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Theme toggle with Light / System / Dark (default = System). */
function ThemeToggle({ className = "" }) {
  const [mode, setMode] = useState("system"); // "light" | "dark" | "system"
  const mediaRef = useRef(null);

  // Apply the theme class to <html>
  const apply = (next) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;

    // Clean listeners
    if (mediaRef.current) {
      mediaRef.current.removeEventListener("change", handleSystemChange);
      mediaRef.current = null;
    }

    if (next === "system") {
      const mm = window.matchMedia("(prefers-color-scheme: dark)");
      mediaRef.current = mm;
      root.classList.toggle("dark", mm.matches);
      mm.addEventListener("change", handleSystemChange);
    } else {
      root.classList.toggle("dark", next === "dark");
    }
  };

  const handleSystemChange = (e) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", e.matches);
  };

  useEffect(() => {
    // Initialize from localStorage OR default to "system"
    const stored = typeof window !== "undefined" ? localStorage.getItem("theme") : null;
    const initial = stored || "system";
    setMode(initial);
    apply(initial);
    return () => {
      if (mediaRef.current) {
        mediaRef.current.removeEventListener("change", handleSystemChange);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAndApply = (next) => {
    setMode(next);
    if (typeof window !== "undefined") {
      localStorage.setItem("theme", next);
    }
    apply(next);
  };

  const btn = (value, label) => (
    <button
      key={value}
      onClick={() => setAndApply(value)}
      className={
        "px-3 py-1.5 text-sm rounded-full transition " +
        (mode === value
          ? "bg-emerald-600 text-white"
          : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")
      }
      aria-pressed={mode === value}
    >
      {label}
    </button>
  );

  return (
    <div className={"inline-flex rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-0.5 " + className}>
      {btn("light", "Light")}
      {btn("system", "System")}
      {btn("dark", "Dark")}
    </div>
  );
}

/** Locale switch that preserves the rest of the path. */
function LocaleSwitch({ locale, className = "" }) {
  const pathname = usePathname() || "/";
  const segments = pathname.split("/").filter(Boolean);

  const isLocale = (s) => s === "nl" || s === "en";

  const hrefFor = (target) => {
    const segs = [...segments];
    if (segs.length && isLocale(segs[0])) segs[0] = target;
    else segs.unshift(target);
    return "/" + segs.join("/");
  };

  const Btn = ({ target, label }) => (
    <Link
      href={hrefFor(target)}
      className={
        "px-3 py-1.5 text-sm rounded-full transition " +
        (locale === target
          ? "bg-emerald-600 text-white"
          : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")
      }
      aria-current={locale === target ? "page" : undefined}
    >
      {label}
    </Link>
  );

  return (
    <div className={"inline-flex rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-0.5 " + className}>
      <Btn target="nl" label="NL" />
      <Btn target="en" label="EN" />
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
