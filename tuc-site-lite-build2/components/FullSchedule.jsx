
'use client';
import { useMemo, useState } from 'react';

function TeamBadge({ code, team }) {
  if (!team) return <span className="font-medium">{code}</span>;
  return (
    <span className="inline-flex items-center gap-1 rounded-lg border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-2 py-1 whitespace-nowrap">
      <img src={`/teams/${team.slug}.png`} alt={team.name} className="h-5 w-5 rounded object-cover" />
      <span className="text-[13px] font-semibold">{team.name}</span>
    </span>
  );
}

export default function FullSchedule({ locale='nl' }) {
  const t = useMemo(() => ({
    title: locale==='nl' ? 'Volledig speelschema' : 'Full schedule',
    note: locale==='nl' ? 'De tijden zijn indicatief; wedstrijden volgen elkaar direct op.' : 'Times are indicative; games run back-to-back.',
    days: locale==='nl' ? ['Vrijdag','Zaterdag','Zondag'] : ['Friday','Saturday','Sunday'],
    filterLabel: locale==='nl' ? 'Filter (A–H of naam)' : 'Filter (A–H or name)',
    filterPh: locale==='nl' ? 'bijv. A / Bandits' : 'e.g. A / Bandits',
    clear: locale==='nl' ? 'Wis' : 'Clear',
    legend: locale==='nl' ? 'QF = Kwartfinale, SF = Halve finale, W/LSF = Winnaar/Verliezer halve finale.' : 'QF = Quarter-final, SF = Semi-final, W/LSF = Winner/Loser semi-final.',
    result: locale==='nl' ? 'Uitslag' : 'Result',
    matchCol: locale==='nl' ? 'Wedstrijd' : 'Match',
    timeCol: locale==='nl' ? 'Tijd' : 'Time',
    eventLabel: locale==='nl' ? 'Event' : 'Event',
    dunk: locale==='nl' ? 'Dunkcontest' : 'Dunk contest',
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
          <span className="rounded bg-black/10 dark:bg_white/10 px-2 py-0.5 text-xs">{t.eventLabel}</span>
          <span>{match}</span>
        </span>
      );
    }
    const labels = labelsFromMatch(match);
    if (!labels) return <span className="font-medium">{match}</span>;
    const { A, B } = labels;
    return (
      <div className="flex items-center gap-2 whitespace-nowrap">
        <TeamBadge team={A} />
        <span className="text-black/60 dark:text-white/60">vs</span>
        <TeamBadge team={B} />
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden py-12 md:py-16">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(76,107,87,0.10),transparent_70%)]" />
      <div className="container">
        <header className="mb-8 md:mb-10">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h2>
          <p className="mt-2 max-w-2xl text-sm muted">{t.note}</p>
        </header>
        <div className="overflow-x-auto rounded-2xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 shadow-xl">
          <table className="hidden w-full table-auto md:table min-w-[980px]">
            <thead>
              <tr className="border-b border-black/10 dark:border-white/10 bg-white/50 dark:bg-white/5">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">#</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.timeCol}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.matchCol}</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-black/60 dark:text-white/60">{t.result}</th>
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row, i) => (
                <tr key={i} className="align-top hover:bg-black/5 dark:hover:bg-white/5">
                  <td className="px-4 py-3 text-sm whitespace-nowrap text-black/80 dark:text-white/80">{i+1}</td>
                  <td className="px-4 py-3 font-medium whitespace-nowrap">{row.time}</td>
                  <td className="px-4 py-3 whitespace-nowrap"><MatchCell match={row.match} event={row.event} /></td>
                  <td className="px-4 py-3 font-semibold whitespace-nowrap">{row.event ? '—' : '0–0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
