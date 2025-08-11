
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/** Locale switch preserving the rest of the path. */
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
