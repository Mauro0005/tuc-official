
export default function Page({ params }) {
  const { locale } = params;
  const t = locale==='nl'
    ? {title:'Partners', text:'Word partner of sponsor? Mail ons op info@tuc.com.', cta:'Mail ons'}
    : {title:'Partners', text:'Become a partner or sponsor? Email us at info@tuc.com.', cta:'Email us'};
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">{t.text}</p>
      <a href="mailto:info@tuc.com" className="mt-6 inline-block rounded-xl bg-accent px-5 py-3 text-white">{t.cta}</a>
      <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
        {Array.from({length:8}).map((_,i)=>(
          <div key={i} className="aspect-[3/2] rounded-xl border border-black/10 dark:border-white/10 bg-white/5" />
        ))}
      </div>
    </section>
  );
}
