
import Link from 'next/link';

export default function Page({ params }) {
  const { locale } = params;
  const t = {
    title: locale === 'nl' ? 'Torneo Urbis Cruoninga – 1e Editie' : 'Torneo Urbis Cruoninga – 1st Edition',
    subtitle: locale === 'nl' ? '8 teams • 3 avonden • 1 winnaar' : '8 teams • 3 nights • 1 champion',
    dates: locale === 'nl' ? '19–21 juni 2026 • Blue Court – Het Verzetje, Groningen' : 'June 19–21, 2026 • Blue Court – Het Verzetje, Groningen',
    cta: locale === 'nl' ? 'Bekijk speelschema' : 'See schedule',
    register: locale === 'nl' ? 'Aanmelden' : 'Sign up',
    links: [
      { href:`/${locale}/schedule`, label: locale==='nl'?'Speelschema':'Schedule' },
      { href:`/${locale}/rules`, label: locale==='nl'?'Regels':'Rules' },
      { href:`/${locale}/teams`, label: 'Teams' },
      { href:`/${locale}/pools`, label: locale==='nl'?'Poules':'Pools' },
      { href:`/${locale}/location`, label: locale==='nl'?'Locatie':'Location' },
      { href:`/${locale}/partners`, label: locale==='nl'?'Partners':'Partners' },
      { href:`/${locale}/media`, label: 'Media' },
    ],
  };

  return (
    <section className="relative overflow-hidden">
      {/* subtle gradient */}
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_0%,rgba(76,107,87,.20),transparent_60%)]" />

      {/* HERO */}
      <div className="container flex min-h-[58vh] flex-col items-center justify-center py-14 md:py-20">
        <img src="/logo.png" alt="TUC" className="mb-4 h-12 w-auto opacity-80" />
        <h1 className="text-center text-4xl font-extrabold leading-tight tracking-tight md:text-6xl">
          {t.title}
        </h1>
        <p className="mt-3 text-center text-lg text-black/80 dark:text-white/80">
          {t.subtitle}
        </p>
        <p className="mt-1 text-center text-sm text-black/60 dark:text-white/60">
          {t.dates}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link href={`/${locale}/schedule`} className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:opacity-90">
            {t.cta}
          </Link>
          <Link href={`/${locale}/signup`} className="rounded-2xl border border-black/15 dark:border-white/15 px-5 py-3 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10">
            {t.register}
          </Link>
        </div>
      </div>

      {/* QUICK LINKS GRID (wraps) */}
      <div className="container pb-16">
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4">
          {t.links.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 px-6 py-5 text-center font-medium hover:bg-black/5 dark:hover:bg-white/10"
            >
              {item.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
    
  );
}
