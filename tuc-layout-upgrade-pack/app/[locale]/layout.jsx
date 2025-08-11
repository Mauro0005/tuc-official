
import "../../styles/enhance.css";
import SiteBackground from "../../components/SiteBackground";
import Navbar from "../../components/Navbar";

export default function Layout({ children, params }) {
  const { locale } = params || { locale: "nl" };
  return (
    <html lang={locale} className="h-full">
      <body className="min-h-screen text-black dark:text-white">
        <Navbar locale={locale} />
        <SiteBackground />
        <main className="relative container py-8 md:py-12">
          {children}
        </main>
      </body>
    </html>
  );
}
