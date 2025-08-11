
import Script from "next/script";
import "../../styles/enhance.css";
import SiteBackground from "../../components/SiteBackground";
import Navbar from "../../components/Navbar";

export default function Layout({ children, params }) {
  const { locale = "nl" } = params || {};
  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <Script id="theme-init" strategy="beforeInteractive">{`(function(){try{
  function readCookie(name){return (document.cookie.match('(?:^|; )'+name+'=([^;]*)')||[])[1]||null;}
  var t = readCookie('theme') || 'system';
  var mm = window.matchMedia('(prefers-color-scheme: dark)');
  var isDark = (t==='dark') || (t==='system' && mm.matches);
  var c = document.documentElement.classList;
  if(isDark){c.add('dark');} else {c.remove('dark');}
  // Live update only in system mode
  if (t==='system') {
    var set = function(e){ document.documentElement.classList.toggle('dark', e.matches); };
    try {
      if (mm.addEventListener) mm.addEventListener('change', set);
      else if (mm.addListener) mm.addListener(set);
    } catch(e){}
  }
} catch(e) {}})();`}</Script>
      </head>
      <body className="min-h-screen pt-[env(safe-area-inset-top)] text-black dark:text-white">
        <Navbar locale={locale} />
        <SiteBackground />
        <main className="relative container py-8 md:py-12">{children}</main>
      </body>
    </html>
  );
}
