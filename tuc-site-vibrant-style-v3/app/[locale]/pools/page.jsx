
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
    <div className="h-full flex flex-col rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-7 md:p-8 min-h-[460px] shadow-lg">
      <div className="mb-4">
  <div className="w-full rounded-2xl border border-black/10 dark:border-white/10 bg-accent/90 px-6 py-3.5 text-center text-xl md:text-2xl font-semibold text-white shadow">
    {title}
  </div>
</div>

      {/* Mobile list (md:hidden) */}
      <div className="mt-6 md:hidden">
        <ul className="divide-y divide-black/10 dark:divide-white/10 rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5">
          {teams.map((code, idx) => (
            <li key={code} className="px-4 py-4">
              <div className="flex items-start justify-between gap-1">
                <div className="flex min-w-0 items-start gap-2 flex-1">
                  <span className="w-6 text-left font-mono text-base">{idx + 1}.</span>
                  <img
                    src={`/teams/${TEAM_MAP[code].slug}.png`}
                    alt={TEAM_MAP[code].name}
                    className="h-9 w-9 rounded object-cover"
                  />
                  <span className="font-semibold whitespace-normal break-words leading-snug text-base">{TEAM_MAP[code].name}</span>
                </div>
                <div className="shrink-0 text-right text-base leading-snug">
                  <div>W–L: <span className="font-mono">0–0</span></div>
                  <div>{'PPG'}: <span className="font-mono">0</span></div>
                  <div>+/-: <span className="font-mono">0</span></div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Desktop table (md:block) */}
      <div className="mt-6 overflow-x-auto hidden md:block">
        <table className="w-full table-auto border-collapse min-w-[760px] text-[16px]">
          <thead>
            <tr className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
              <th className="w-[6%] px-1.5 py-1.5 text-left font-semibold text-black/80 dark:text-white/80 text-[16px]">#</th>
              <th className="w-[42%] px-1.5 py-1.5 text-left font-semibold text-black/80 dark:text-white/80 text-[16px]">Team</th>
              <th className="w-[12%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[16px]">W</th>
              <th className="w-[12%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[16px]">L</th>
              <th className="w-[14%] px-1.5 py-1.5 text-right font-semibold text-black/80 dark:text-white/80 text-[15px]">{'PPG'}</th>
              <th className="w-[14%] px-2 py-2 text-right font-semibold text-black/80 dark:text-white/80 text-[16px]">+/-</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((code, idx) => (
              <tr key={code} className="hover:bg-black/5 dark:hover:bg-white/5">
                <td className="px-2 py-2 text-left font-mono">{idx + 1}.</td>
                <td className="px-2 py-2">
                  <div className="flex items-center gap-1 whitespace-nowrap overflow-hidden">
                    <img
                      src={`/teams/${TEAM_MAP[code].slug}.png`}
                      alt={TEAM_MAP[code].name}
                      className="h-9 w-9 rounded object-cover"
                    />
                    <span className="truncate max-w-[260px] font-semibold text-[16px]">{TEAM_MAP[code].name}</span>
                  </div>
                </td>
                <td className="px-2 py-2 text-right font-mono">0</td>
                <td className="px-2 py-2 text-right font-mono">0</td>
                <td className="px-2 py-2 text-right font-mono">0</td>
                <td className="px-2 py-2 text-right font-mono">0</td>
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
    <section className="container pt-4 pb-12 md:py-16">
      <div className="pools-subheader-spacer pointer-events-none -mt-2 mb-3 h-3 bg-gradient-to-b from-black/10 to-transparent dark:from-white/10 dark:to-transparent rounded-b-2xl md:hidden" />
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{'PPG'}</h1>
      <div className="mt-6 space-y-6">
        <PoolCard title={(locale === 'nl' ? 'Poule' : 'Pool') + ' A'} teams={['A', 'B', 'C', 'D']} locale={locale} />
        <PoolCard title={(locale === 'nl' ? 'Poule' : 'Pool') + ' B'} teams={['E', 'F', 'G', 'H']} locale={locale} />
      </div>
    </section>
  );
}
