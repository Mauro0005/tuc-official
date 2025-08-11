import "./globals.css";
import "../styles/enhance.css";
import SiteBackground from "../components/SiteBackground";

export const metadata = {
  title: "Torneo Urbis Cruoninga",
  description: "Official outdoor 5v5 tournament in Groningen",
};

export default function RootLayout({ children }) {
  return (
    <html lang="nl" suppressHydrationWarning>
      <body className="body-wrap">
        <SiteBackground />
        <main className="container mx-auto max-w-6xl px-4 py-6 md:py-10">
          <div className="surface-soft elev-2 p-6 md:p-10">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
