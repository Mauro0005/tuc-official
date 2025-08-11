
'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import ThemeToggle from './ThemeToggle';
export default function Navbar({ locale='nl' }){
  const pathname = usePathname();
  const switchLocale = locale==='nl'?'en':'nl';
  const switched = pathname ? '/'+switchLocale + pathname.slice(3) : '/'+switchLocale;
  const t = locale==='nl'
    ? {home:'Home', schedule:'Speelschema', pools:'Poules', rules:'Regels', teams:'Teams', location:'Locatie', partners:'Partners', media:'Media', contact:'Contact'}
    : {home:'Home', schedule:'Schedule', pools:'Pools', rules:'Rules', teams:'Teams', location:'Location', partners:'Partners', media:'Media', contact:'Contact'};
  return (
    <nav className="sticky top-0 z-50 border-b border-black/10 dark:border-white/10 bg-white/75 dark:bg-black/70 backdrop-blur shadow-sm mb-3 sm:mb-4 min-h-[56px]">
      <div className="container flex items-center justify-between py-3">
        <Link href={'/'+locale} className="flex items-center gap-2">
          <img src="/logo.png" alt="TUC" className="h-8 w-auto" /><span className="font-bold">TUC</span>
        </Link>
        <div className="flex items-center gap-4 overflow-x-auto whitespace-nowrap [&::-webkit-scrollbar]:hidden scroll-smooth">
          <Link href={'/'+locale} className="hover:underline">{t.home}</Link>
          <Link href={'/'+locale+'/schedule'} className="hover:underline">{t.schedule}</Link>
          <Link href={'/'+locale+'/pools'} className="hover:underline">{t.pools}</Link>
          <Link href={'/'+locale+'/rules'} className="hover:underline">{t.rules}</Link>
          <Link href={'/'+locale+'/teams'} className="hover:underline">{t.teams}</Link>
          <Link href={'/'+locale+'/location'} className="hover:underline">{t.location}</Link>
          <Link href={'/'+locale+'/partners'} className="hover:underline">{t.partners}</Link>
          <Link href={'/'+locale+'/media'} className="hover:underline">{t.media}</Link>
          <Link href={'/'+locale+'/contact'} className="hover:underline">{t.contact}</Link>
          <a href={switched} className="rounded-lg border border-black/10 dark:border-white/10 px-2 py-1 text-xs">{switchLocale.toUpperCase()}</a>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
