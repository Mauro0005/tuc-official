
import Link from 'next/link';

const TEAMS = [
  { code:'A', name:'Blue Court Bandits', slug:'blue-court-bandits' },
  { code:'B', name:'Canal City Hoopers', slug:'canal-city-hoopers' },
  { code:'C', name:'Groningen Green Giants', slug:'groningen-green-giants' },
  { code:'D', name:'Martini Tower Rooks', slug:'martini-tower-rooks' },
  { code:'E', name:'Northside Nets', slug:'northside-nets' },
  { code:'F', name:'Ommeland Owls', slug:'ommeland-owls' },
  { code:'G', name:'Stad Storm', slug:'stad-storm' },
  { code:'H', name:'Verzetje Vipers', slug:'verzetje-vipers' },
];

export default function Page({ params }) {
  const { locale } = params;
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{locale==='nl'?'Teams':'Teams'}</h1>
      <div className="mt-6 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {TEAMS.map((t) => (
          <Link key={t.slug} href={`/${locale}/teams/${t.slug}`} className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-4 hover:shadow">
            <div className="flex items-center gap-3">
              <img src={`/teams/${t.slug}.png`} alt={t.name} className="h-12 w-12 rounded object-cover" />
              <div>
                <div className="font-semibold">{t.name}</div>
                <div className="text-xs text-black/60 dark:text-white/60">Poule {t.code}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
