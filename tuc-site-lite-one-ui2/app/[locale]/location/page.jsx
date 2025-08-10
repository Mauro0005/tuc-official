
export default function Page({ params }) {
  const { locale } = params;
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{locale==='nl'?'Locatie':'Location'}</h1>
      <p className="mt-2 text-sm text-black/70 dark:text-white/70">
        {locale==='nl'
          ? 'Blue Court – Het Verzetje, Groningen. Dicht bij het centrum, perfect voor een avondtoernooi.'
          : 'Blue Court – Het Verzetje, Groningen. Close to the city centre, perfect for an evening tournament.'}
      </p>
      <img src="/blue-court.jpg" alt="Blue Court – Het Verzetje, Groningen" className="mt-6 aspect-video w-full rounded-xl object-cover border border-white/10" />
    </section>
  );
}
