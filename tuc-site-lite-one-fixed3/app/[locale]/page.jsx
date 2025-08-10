
import Link from 'next/link';

const TEAM_MAP = {
  A: { name: 'Blue Court Bandits', slug: 'blue-court-bandits' },
  B: { name: 'Canal City Hoopers', slug: 'canal-city-hoopers' },
  C: { name: 'Groningen Green Giants', slug: 'groningen-green-giants' },
  D: { name: 'Martini Tower Rooks', slug: 'martini-tower-rooks' },
  E: { name: 'Northside Nets', slug: 'northside-nets' },
  F: { name: 'Ommeland Owls', slug: 'ommeland-owls' },
  G: { name: 'Stad Storm', slug: 'stad-storm' },
  H: { name: 'Verzetje Vipers', slug: 'verzetje-vipers' },
};

function PoolCard({ title, teams, locale }) {
  const headers = ['Team','W','L','PF','PA','+/-'];
  return (
    <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {teams.map((code) => (
          <div key={code} className="flex items-center gap-3 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-3">
            <img src={`/teams/${TEAM_MAP[code].slug}.png`} alt={TEAM_MAP[code].name} className="h-10 w-10 rounded object-cover" />
            <div className="flex flex-col">
              <span className="font-medium">{TEAM_MAP[code].name}</span>
              <span className="text-xs text-black/60 dark:text-white/60">{(locale==='nl'?'Poule':'Pool')+' '+code}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[560px] table-fixed text-sm">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
              {headers.map((h,i)=>(<th key={i} className="px-3 py-2 text-left font-semibold text-black/70 dark:text-white/70">{h}</th>))}
            </tr>
          </thead>
          <tbody>
            {teams.map((code)=>(
              <tr key={code} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-3 py-2">
                  <div className="flex items-center gap-2">
                    <img src={`/teams/${TEAM_MAP[code].slug}.png`} alt={TEAM_MAP[code].name} className="h-6 w-6 rounded object-cover" />
                    <span>{TEAM_MAP[code].name}</span>
                  </div>
                </td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">0</td>
                <td className="px-3 py-2">0</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default function Page({ params }) {
  const { locale } = params;
  const t = {
    title: locale === 'nl' ? 'Torneo Urbis Cruoninga – 1e Editie' : 'Torneo Urbis Cruoninga – 1st Edition',
    subtitle: locale === 'nl' ? '8 teams • 3 avonden • 1 winnaar' : '8 teams • 3 nights • 1 champion',
    dates: locale === 'nl' ? '19–21 juni 2026 • Blue Court – Het Verzetje, Groningen' : 'June 19–21, 2026 • Blue Court – Het Verzetje, Groningen',
    cta: locale === 'nl' ? 'Bekijk speelschema' : 'See schedule',
  };
  return (
    <section className="relative overflow-hidden border-b border-black/10 dark:border-white/10">
      <div className="container grid min-h-[60vh] grid-cols-1 place-items-center gap-10 py-16 md:py-24">
        <div className="text-center">
          <img src="/logo.png" alt="TUC" className="mx-auto mb-6 h-28 w-auto md:h-36" />
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">{t.title}</h1>
          <p className="mt-3 text-lg text-black/80 dark:text-white/80">{t.subtitle}</p>
          <p className="mt-1 text-sm text-black/60 dark:text-white/60">{t.dates}</p>
          <div className="mt-8 flex justify-center gap-3">
            <Link href={`/${locale}/schedule`} className="rounded-2xl bg-accent px-5 py-3 text-sm font-semibold text-white hover:opacity-90">{t.cta}</Link>
            <Link href={`/${locale}/signup`} className="rounded-2xl border border-black/15 dark:border-white/15 px-5 py-3 text-sm font-semibold hover:bg-black/5 dark:hover:bg-white/10">{locale==='nl'?'Aanmelden':'Sign up'}</Link>
          </div>
        </div>
      </div>

      <div className="container py-12">
        <h2 className="text-2xl md:text-3xl font-bold">{locale==='nl'?'Poules':'Pools'}</h2>
        <p className="mt-2 text-sm text-black/70 dark:text-white/70">
          {locale==='nl'
            ? 'Overzicht van de teams per poule en de (start)stand. Standen worden live bijgewerkt zodra resultaten binnenkomen.'
            : 'Overview of teams per pool and initial standings. Standings will update as results come in.'}
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' A'} teams={['A','B','C','D']} locale={locale} />
          <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' B'} teams={['E','F','G','H']} locale={locale} />
        </div>

        <div className="mt-4 text-xs text-black/60 dark:text-white/60">
          {locale==='nl'
            ? (<>
                <div>Als meerdere teams hetzelfde aantal W&apos;s hebben, wordt de eindstand van de poule bepaald op:</div>
                <div>1) Onderling resultaat</div>
                <div>2) Puntenverschil</div>
                <div>3) Gescoorde punten</div>
              </>)
            : (<>
                <div>If multiple teams have the same number of wins, the final pool standings are determined by:</div>
                <div>1) Head-to-head result</div>
                <div>2) Point differential</div>
                <div>3) Points scored</div>
              </>)}
        </div>

        <div className="mt-6 flex gap-3">
          <Link href={`/${locale}/schedule`} className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            {locale==='nl'?'Bekijk speelschema':'See schedule'}
          </Link>
          <Link href={`/${locale}/teams`} className="rounded-xl border border-black/10 dark:border-white/10 px-4 py-2 text-sm hover:bg-black/5 dark:hover:bg-white/10">
            Teams
          </Link>
        </div>
      </div>
    </section>
  );
}
