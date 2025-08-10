'use client';
import { useMemo, useState } from 'react';

function TeamBadge({ code, team }) {
  if (!team) return <span className="font-medium">{code}</span>;
  return (
    <span className="inline-flex items-center gap-2 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2 py-1">
      <img src={`/teams/${team.slug}.png`} alt={team.name} className="h-6 w-6 rounded object-cover" />
      <span className="text-sm font-semibold">{team.name}</span>
      <span className="ml-1 rounded bg-black/10 dark:bg-white/10 px-1.5 py-0.5 text-[10px] text-black/70 dark:text-white/70">{code}</span>
    </span>
  );
}

export default function FullSchedule({ locale = 'nl' }) {
  const t = useMemo(() => ({
    title: locale==='nl' ? 'Volledig speelschema' : 'Full schedule',
    note: locale==='nl'
      ? 'De tijden zijn indicatief; wedstrijden volgen elkaar direct op. Houd de socials in de gaten voor updates.'
      : 'Times are indicative; games run back-to-back. Follow socials for updates.',
    days: locale==='nl' ? ['Vrijdag','Zaterdag','Zondag'] : ['Friday','Saturday','Sunday'],
    filterLabel: locale==='nl' ? 'Filter (A–H of naam)' : 'Filter (A–H or name)',
    filterPh: locale==='nl' ? 'bijv. A / Bandits' : 'e.g. A / Bandits',
    clear: locale==='nl' ? 'Wis' : 'Clear',
    legend: locale==='nl' ? 'QF = Kwartfinale, SF = Halve finale, W/LSF = Winnaar/Verliezer halve finale.' : 'QF = Quarter-final, SF = Semi-final, W/LSF = Winner/Loser semi-final.',
    result: locale==='nl' ? 'Uitslag' : 'Result',
    matchCol: locale==='nl' ? 'Wedstrijd' : 'Match',
    timeCol: locale==='nl' ? 'Tijd' : 'Time',
    eventLabel: locale==='nl' ? 'Event' : 'Event',
    dunk: locale==='nl' ? 'Dunkcontest + side events' : 'Dunk contest + side events',
  }), [locale]);

  const [activeDay, setActiveDay] = useState(t.days[0]);
  const [teamFilter, setTeamFilter] = useState('');

  const teamMap = useMemo(() => ({
    A: { name: 'Blue Court Bandits', slug: 'blue-court-bandits' },
    B: { name: 'Canal City Hoopers', slug: 'canal-city-hoopers' },
    C: { name: 'Groningen Green Giants', slug: 'groningen-green-giants' },
    D: { name: 'Martini Tower Rooks', slug: 'martini-tower-rooks' },
    E: { name: 'Northside Nets', slug: 'northside-nets' },
    F: { name: 'Ommeland Owls', slug: 'ommeland-owls' },
    G: { name: 'Stad Storm', slug: 'stad-storm' },
    H: { name: 'Verzetje Vipers', slug: 'verzetje-vipers' },
  }), []);

  const schedule = useMemo(() => ({
    Friday: [
      { time: '18:45 – 19:30', match: 'A vs B' },
      { time: '19:30 – 20:15', match: 'E vs F' },
      { time: '20:15 – 21:00', match: 'C vs D' },
      { time: '21:00 – 21:45', match: 'G vs H' },
      { time: '21:45 – 22:30', match: 'A vs C' },
      { time: '22:30 – 23:15', match: 'E vs G' },
    ],
    Saturday: [
      { time: '18:45 – 19:30', match: 'F vs H' },
      { time: '19:30 – 20:15', match: 'B vs D' },
      { time: '20:15 – 21:00', match: 'E vs H' },
      { time: '21:00 – 21:45', match: 'A vs C' },
      { time: '21:45 – 22:30', match: 'F vs G' },
      { time: '22:30 – 23:15', match: 'B vs C' },
    ],
    Sunday: [
      { time: '18:15 – 19:00', match: 'QF1 2B vs 3A' },
      { time: '19:00 – 19:45', match: 'QF2 2A vs 3B' },
      { time: '19:45 – 20:30', match: 'SF1 1A vs W-QF1' },
      { time: '20:30 – 21:15', match: 'SF2 1B vs W-QF2' },
      { time: '21:15 – 22:00', match: t.dunk, event: true },
      { time: '22:00 – 22:45', match: '3rd place LSF1 vs LSF2' },
      { time: '22:45 – 23:30', match: 'Final WSF1 vs WSF2' },
      { time: '23:30 – 00:00', match: locale==='nl' ? 'Prijsuitreiking + MVP' : 'Awards + MVP' },
    ],
  }), [t.dunk, locale]);

  const dayKeyFromLabel = (label) => {
    if (label === 'Vrijdag' || label === 'Friday') return 'Friday';
    if (label === 'Zaterdag' || label === 'Saturday') return 'Saturday';
    return 'Sunday';
  };

  function labelsFromMatch(match) {
    const m = match.match(/^([A-H])\s*vs\s*([A-H])$/i);
    if (!m) return null;
    const a = m[1].toUpperCase();
    const b = m[2].toUpperCase();
    return { a, b, A: teamMap[a], B: teamMap[b] };
  }

  const rowsActive = useMemo(() => schedule[dayKeyFromLabel(activeDay)] || [], [schedule, activeDay]);
  const filteredRows = useMemo(() => {
    if (!teamFilter) return rowsActive;
    const term = teamFilter.trim().toLowerCase();
    return rowsActive.filter((r) => {
      if (r.event) return t.dunk.toLowerCase().includes(term);
      const labels = labelsFromMatch(r.match);
      if (!labels) return r.match.toLowerCase().includes(term);
      const { a, b, A, B } = labels;
      return (
        a.toLowerCase().includes(term) ||
        b.toLowerCase().includes(term) ||
        (A?.name.toLowerCase().includes(term)) ||
        (B?.name.toLowerCase().includes(term))
      );
    });
  }, [rowsActive, teamFilter, teamMap, t.dunk]);

  function MatchCell({ match, event }) {
    if (event) {
      return (
        <span className="inline-flex items-center gap-2 rounded-full bg-black/10 dark:bg-white/10 px-3 py-1 text-sm">
          <span className="rounded bg-black/10 dark:bg-white/10 px-2 py-0.5 text-xs">{t.eventLabel}</span>
          <span>{match}</span>
        </span>
      );
    }
    const labels = labelsFromMatch(match);
    if (!labels) return <span className="font-medium">{match}</span>;
    const { a, b, A, B } = labels;
    return (
      <div className="flex flex-wrap items-center gap-3">
        <TeamBadge code={a} team={A} />
        <span className="text-black/60 dark:text-white/60">vs</span>
        <TeamBadge code={b} team={B} />
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(76,107,87,0.10),transparent_70%)] dark:bg-[radial-gradient(80%_80%_at_50%_0%,rgba(16,185,129,0.08),transparent_70%)]" />
      <div className="container">
        <header className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h2>
          <p className="mt-2 max-w-2xl text-sm muted">{t.note}</p>
        </header>

        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 p-1 backdrop-blur">
            {t.days.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setActiveDay(d)}
                className={
                  "relative rounded-xl px-4 py-2 text-sm font-medium transition " +
                  (activeDay === d ? "bg-accent text-white shadow-inner" : "text-black/70 dark:text-white/70 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10")
                }
                aria-pressed={activeDay === d}
              >
                {d}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <label htmlFor="teamFilter" className="text-sm muted">{t.filterLabel}</label>
            <input
              id="teamFilter"
              value={teamFilter}
              onChange={(e) => setTeamFilter(e.target.value.slice(0, 30))}
              placeholder={t.filterPh}
              className="w-44 rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2 text-sm placeholder-black/40 dark:placeholder-white/40 outline-none focus:ring-2 focus:ring-emerald-400/40"
            />
            {teamFilter && (
              <button type="button" onClick={() => setTeamFilter('')} className="rounded-lg px-2 py-2 text-xs text-black/70 dark:text-white/70 hover:text-black hover:dark:text-white">{t.clear}</button>
            )}
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl">
          {/* Mobile */}
          <div className="grid grid-cols-1 divide-y divide-black/10 dark:divide-white/10 md:hidden">
            {filteredRows.map((row, i) => (
              <div key={i} className="flex flex-col gap-2 px-4 py-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">{t.timeCol}</div>
                    <div className="text-base font-semibold">{row.time}</div>
                  </div>
                  {!row.event && (
                    <div className="text-right">
                      <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">{t.result}</div>
                      <div className="text-base font-semibold">0–0</div>
                    </div>
                  )}
                </div>
                <div>
                  <div className="text-xs uppercase tracking-wider text-black/50 dark:text-white/50">{t.matchCol}</div>
                  <div className="mt-1"><MatchCell match={row.match} event={row.event} /></div>
                </div>
              </div>
            ))}
          </div>

          {/* Desktop */}
          <table className="hidden w-full table-fixed md:table">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">#</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.timeCol}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.matchCol}</th>
                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.result}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr key={i} className="align-top hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="px-6 py-4 text-sm text-black/80 dark:text-white/80">{i + 1}</td>
                  <td className="px-6 py-4 font-medium">{row.time}</td>
                  <td className="px-6 py-4"><MatchCell match={row.match} event={row.event} /></td>
                  <td className="px-6 py-4 font-semibold">{row.event ? '—' : '0–0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="mt-6 text-sm muted">{t.legend}</p>
      </div>
    </section>
  );
}
