
export default function Page({ params }) {
  const { locale } = params;
  const t = locale==='nl'
    ? {title:'Contact', email:'Mail naar', text:'Voor vragen over tickets, teams of sponsoring:'}
    : {title:'Contact', email:'Email', text:'For questions about tickets, teams or sponsoring:'};
  return (
    <section className="container py-12 md:py-16">
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{t.title}</h1>
      <p className="mt-2 text-black/70 dark:text-white/70">{t.text}</p>
      <a href="mailto:info@tuc.com" className="mt-6 inline-block rounded-xl border border-black/10 dark:border-white/10 px-4 py-2">✉ {t.email} info@tuc.com</a>
    </section>
  );
}
