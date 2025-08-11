
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
      {btn("dark", "Dark")}
      {btn("system", "System")}
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



function MobileMenu({ open, onClose, links, locale }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] md:hidden">
      {/* Backdrop */}
      <button
        onClick={onClose}
        aria-label="Close menu backdrop"
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
      />
      {/* Bottom sheet */}
      <div className="absolute inset-x-0 bottom-0 rounded-t-3xl border-t border-black/10 dark:border-white/10 bg-white dark:bg-neutral-900 shadow-2xl">
        <div className="mx-auto w-full max-w-screen-sm p-5 pt-4">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img src="/logo.png" alt="TUC" className="h-6 w-auto" />
              <span className="font-semibold tracking-tight">Menu</span>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-black/10 dark:border-white/10 px-3 py-1.5 text-sm hover:bg-black/5 dark:hover:bg-white/10"
              aria-label="Close menu"
            >
              Close
            </button>
          </div>

          {/* Quick links grid */}
          <div className="grid grid-cols-2 gap-3">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="group rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 text-center hover:bg-white/80 dark:hover:bg-white/10"
              >
                <div className="text-sm font-medium">{l.label}</div>
                <div className="mt-1 text-xs text-black/60 dark:text-white/60 opacity-0 group-hover:opacity-100 transition">
                  {locale === "nl" ? "Open" : "Open"}
                </div>
              </a>
            ))}
          </div>

          {/* Controls row */}
          <div className="mt-4 flex items-center justify-between">
            <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-2 hover:bg-white/90 dark:hover:bg-white/15"
            aria-label="Open menu"
          >
            {/* burger icon */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <LocaleSwitch locale={locale} />
            <ThemeToggle />
          </div>

          <div className="mt-2 text-center text-xs text-black/60 dark:text-white/60">
            Swipe down or tap outside to close
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Navbar({ locale = "nl" }) {
  const [menuOpen, setMenuOpen] = useState(false);
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
          <button
            onClick={() => setMenuOpen(true)}
            className="md:hidden rounded-full border border-black/10 dark:border-white/10 bg-white/70 dark:bg-white/10 p-2 hover:bg-white/90 dark:hover:bg-white/15"
            aria-label="Open menu"
          >
            {/* burger icon */}
            <svg className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor" fill="none">
              <path d="M3 6h18M3 12h18M3 18h18" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
          <LocaleSwitch locale={locale} />
          <ThemeToggle />
        </div>
      </div>
    {/* Mobile bottom-sheet menu */}
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} links={links} locale={locale} />
    </nav>
  );
}
