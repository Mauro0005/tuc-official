
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
  return (
    <div className="h-full flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-5 min-h-[360px]">
      <h3 className="text-lg font-semibold">{title}</h3>
      <div className="mt-6 overflow-x-auto">
        <table className="w-full table-auto border-collapse min-w-[720px] text-[15px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
              <th className="w-[6%] px-1.5 py-1.5 text-left font-semibold text-black/80 dark:text-white/80 text-[15px]">#</th>
              <th className="w-[42%] px-1.5 py-1.5 text-left font-semibold text-black/80 dark:text-white/80 text-[15px]">Team</th>
              <th className="w-[12%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[15px]">W</th>
              <th className="w-[12%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[15px]">L</th>
              <th className="w-[14%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[15px]">{locale==='nl'?'Punten Gescoord':'Points Scored'}</th>
              <th className="w-[14%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[15px]">+/-</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((code, idx)=>(
              <tr key={code} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-1.5 py-1.5 text-left font-mono">{idx+1}.</td>
                <td className="px-1.5 py-1.5">
                  <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                    <img src={`/teams/${TEAM_MAP[code].slug}.png`} alt={TEAM_MAP[code].name} className="h-7 w-7 rounded object-cover" />
                    <span className="truncate max-w-[220px] font-medium">{TEAM_MAP[code].name}</span>
                  </div>
                </td>
                <td className="px-1.5 py-1.5 text-right font-mono">0</td>
                <td className="px-1.5 py-1.5 text-right font-mono">0</td>
                <td className="px-1.5 py-1.5 text-right font-mono">0</td>
                <td className="px-1.5 py-1.5 text-right font-mono">0</td>
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
      <div className="mt-6 grid items-stretch gap-6 md:grid-cols-2">
        <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' A'} teams={['A','B','C','D']} locale={locale} />
        <PoolCard title={(locale==='nl'?'Poule':'Pool') + ' B'} teams={['E','F','G','H']} locale={locale} />
      </div>
    </section>
  );
}
