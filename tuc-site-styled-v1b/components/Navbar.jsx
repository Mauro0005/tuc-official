
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Theme toggle with Light / Dark / System (cookie-only, default = System) */
function ThemeToggle({ className = "" }) {
  const [mode, setMode] = useState("system"); // light | dark | system
  const mediaRef = useRef(null);

  const handleSystemChange = (e) => {
    if (typeof document === "undefined") return;
    document.documentElement.classList.toggle("dark", e.matches);
  };

  const apply = (next) => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    // cleanup old listener
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

  useEffect(() => {
    const readCookie = (name) => {
      if (typeof document === "undefined") return null;
      const m = document.cookie.match('(?:^|; )'+name+'=([^;]*)');
      return m ? decodeURIComponent(m[1]) : null;
    };
    const fromCookie = readCookie('theme');
    const initial = fromCookie || 'system';
    setMode(initial);
    apply(initial);
    // Ensure cookie set on first visit to keep consistent across routes/locales
    if (!fromCookie) {
      document.cookie = "theme=system; max-age=31536000; path=/";
    }
    return () => {
      if (mediaRef.current) mediaRef.current.removeEventListener("change", handleSystemChange);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setAndApply = (next) => {
    setMode(next);
    document.cookie = "theme=" + next + "; max-age=31536000; path=/";
    apply(next);
  };

  // Order: Light (left) · Dark (middle) · System (right)
  const Btn = ({ value, label }) => (
    <button
      onClick={() => setAndApply(value)}
      className={
        "px-3 py-1.5 text-sm rounded-full transition " +
        (mode === value ? "bg-emerald-600 text-white" : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")
      }
      aria-pressed={mode === value}
    >
      {label}
    </button>
  );

  return (
    <div className={"inline-flex rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-0.5 " + className}>
      <Btn value="light" label="Light" />
      <Btn value="dark" label="Dark" />
      <Btn value="system" label="System" />
    </div>
  );
}

/** Locale switch preserving route */
function LocaleSwitch({ locale, className = "" }) {
  const pathname = usePathname() || "/";
  const segs = pathname.split("/").filter(Boolean);
  const isLocale = (s) => s === "nl" || s === "en";

  const hrefFor = (target) => {
    const next = [...segs];
    if (next.length && isLocale(next[0])) next[0] = target;
    else next.unshift(target);
    return "/" + next.join("/");
  };

  const Pill = ({ target, label }) => (
    <Link
      href={hrefFor(target)}
      className={
        "px-3 py-1.5 text-sm rounded-full transition " +
        (locale === target ? "bg-emerald-600 text-white" : "text-black/70 dark:text-white/70 hover:bg-black/5 dark:hover:bg-white/10")
      }
      aria-current={locale === target ? "page" : undefined}
    >
      {label}
    </Link>
  );

  return (
    <div className={"inline-flex rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-0.5 " + className}>
      <Pill target="nl" label="NL" />
      <Pill target="en" label="EN" />
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
    <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/75 dark:bg-black/70 backdrop-blur pt-[env(safe-area-inset-top)]">
      <div className="container py-2">
        {/* One-row desktop (md+) & two-row mobile (sm) */}
        <div className="flex items-center gap-2 min-h-[56px]">
          {/* Brand */}
          <Link href={`/${locale}`} className="flex items-center gap-2 shrink-0 pr-1">
            <img src="/logo.png" alt="TUC" className="h-6 w-auto" />
            <span className="font-semibold tracking-tight">TUC</span>
          </Link>

        {/* Center link row (desktop only) */}
          <div className="hidden md:flex flex-1 items-center justify-center gap-4 px-4">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="hover:opacity-90">
                {l.label}
              </Link>
            ))}
          </div>

          {/* Right controls */}
          <div className="ml-auto flex items-center gap-2 shrink-0">
            <LocaleSwitch locale={locale} />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile second row: horizontal link pills */}
        <div className="mt-2 md:hidden overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex items-center gap-2 whitespace-nowrap pb-1">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="shrink-0 rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 px-3 py-1.5 text-sm hover:bg-white/90 dark:hover:bg-white/15"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
