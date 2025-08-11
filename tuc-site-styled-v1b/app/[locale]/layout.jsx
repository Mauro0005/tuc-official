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
  if(t==='dark'){document.documentElement.classList.add('dark');}
  if(t==='light'){document.documentElement.classList.remove('dark');}
} catch(e) {}})();`}</Script>
      </head>
      <body className="body-wrap">
        <SiteBackground />
        <Navbar locale={locale} />
        {children}
      </body>
    </html>
  );
}
