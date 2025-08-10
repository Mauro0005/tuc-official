
import Link from 'next/link';
const TEAMS=[
  {code:'A',name:'Blue Court Bandits',slug:'blue-court-bandits'},
  {code:'B',name:'Canal City Hoopers',slug:'canal-city-hoopers'},
  {code:'C',name:'Groningen Green Giants',slug:'groningen-green-giants'},
  {code:'D',name:'Martini Tower Rooks',slug:'martini-tower-rooks'},
  {code:'E',name:'Northside Nets',slug:'northside-nets'},
  {code:'F',name:'Ommeland Owls',slug:'ommeland-owls'},
  {code:'G',name:'Stad Storm',slug:'stad-storm'},
  {code:'H',name:'Verzetje Vipers',slug:'verzetje-vipers'},
];
export default function Page({ params }){
  const { locale } = params;
  const playersLabel = locale==='nl'?'8 spelers':'8 players';
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Teams</h1>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {TEAMS.map(t=>(
          <Link key={t.slug} href={`/${locale}/teams/${t.slug}`} className="group rounded-3xl border border-black/10 dark:border-white/10 bg-white/5 p-5 shadow-sm transition hover:shadow-lg">
            <div className="rounded-2xl border border-black/10 dark:border-white/10 bg-white/5 p-4">
              <div className="relative mx-auto aspect-square w-full max-w-[260px]">
                <img src={`/teams/${t.slug}.png`} alt={t.name} className="absolute inset-0 h-full w-full object-contain" />
              </div>
              <div className="mt-4">
                <div className="text-base font-semibold">{t.name}</div>
                <div className="text-sm text-black/60 dark:text-white/60">{playersLabel}</div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
