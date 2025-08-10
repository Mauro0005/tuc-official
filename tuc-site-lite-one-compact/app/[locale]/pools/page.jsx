
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
    <div className="h-full flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 min-h-[360px]">
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
                  <div className="flex items-center gap-2 whitespace-nowrap">
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
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{locale==='nl'?'Poules':'Pools'}</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">
        {locale==='nl'
          ? 'Beide poules staan hieronder in gelijke weergave. Standen zijn placeholders en worden later gevuld.'
          : 'Both pools are shown below with equal layout. Standings are placeholders for now.'}
      </p>
      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
        <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' A'} teams={['A','B','C','D']} locale={locale} />
        <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' B'} teams={['E','F','G','H']} locale={locale} />
      </div>
    </section>
  );
}
