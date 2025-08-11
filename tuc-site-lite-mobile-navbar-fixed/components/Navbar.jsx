
import Link from "next/link";

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

        {/* Optional: locale/theme controls could go here with className="ml-1 shrink-0" */}
      </div>
    </nav>
  );
}
