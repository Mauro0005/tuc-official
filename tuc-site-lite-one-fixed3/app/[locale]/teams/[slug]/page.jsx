
const TEAMS = {
  'blue-court-bandits': { code:'A', name:'Blue Court Bandits' },
  'canal-city-hoopers': { code:'B', name:'Canal City Hoopers' },
  'groningen-green-giants': { code:'C', name:'Groningen Green Giants' },
  'martini-tower-rooks': { code:'D', name:'Martini Tower Rooks' },
  'northside-nets': { code:'E', name:'Northside Nets' },
  'ommeland-owls': { code:'F', name:'Ommeland Owls' },
  'stad-storm': { code:'G', name:'Stad Storm' },
  'verzetje-vipers': { code:'H', name:'Verzetje Vipers' },
};

function roster() {
  return Array.from({ length: 10 }).map((_,i)=>`John Doe ${i+1}`);
}

export default function Page({ params }) {
  const { slug, locale } = params;
  const team = TEAMS[slug];
  if (!team) return <div className="container py-12">Team not found</div>;
  return (
    <section className="container py-12 md:py-16">
      <div className="flex items-center gap-4">
        <img src={`/teams/${slug}.png`} alt={team.name} className="h-16 w-16 rounded object-cover" />
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{team.name}</h1>
          <p className="text-black/60 dark:text-white/60">{locale==='nl'?'Poule':'Pool'} {team.code}</p>
        </div>
      </div>

      <h2 className="mt-8 text-xl font-semibold">{locale==='nl'?'Selectie':'Roster'}</h2>
      <ul className="mt-3 grid grid-cols-1 gap-2 md:grid-cols-2">
        {roster().map((n, i)=>(<li key={i} className="rounded-xl border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/5 px-3 py-2">{n}</li>))}
      </ul>
    </section>
  );
}
