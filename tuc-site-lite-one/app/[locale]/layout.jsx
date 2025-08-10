
import './locale.css';
import '../globals.css';
import Navbar from '@/components/Navbar';
import { ThemeProvider } from '@/components/ThemeProvider';

export default function RootLayout({ children, params }){
  const { locale } = params;
  return (
    <html lang={locale}>
      <body>
        <ThemeProvider>
          <Navbar locale={locale} />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
