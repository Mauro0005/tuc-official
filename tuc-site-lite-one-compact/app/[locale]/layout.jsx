// app/[locale]/layout.jsx
import './locale.css';
import Navbar from '../../components/Navbar';
import { ThemeProvider } from '../../components/ThemeProvider';

export default function LocaleLayout({ children, params }) {
  const { locale } = params;
  return (
    <ThemeProvider>
      <Navbar locale={locale} />
      <main>{children}</main>
    </ThemeProvider>
  );
}
